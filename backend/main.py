from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel
from pathlib import Path
import sqlite3
import uuid
import json
import os
import requests
from dotenv import load_dotenv


load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://splendid-healing-production.up.railway.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).parent
STATIC_DIR = BASE_DIR / "static"
DB_PATH = BASE_DIR / "chat_history.db"



def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@app.on_event("startup")
def init_db():
    with get_db() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS conversations (
                id TEXT PRIMARY KEY,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                conversation_id TEXT,
                role TEXT,
                content TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.commit()



class ChatRequest(BaseModel):
    question: str

class MessageIn(BaseModel):
    role: str
    content: str


SYSTEM_PROMPT = """You are an AI assistant for my portfolio website."""

def call_openrouter(prompt: str):
    api_key = os.getenv("OPENROUTER_API_KEY")

    print("OPENROUTER_API_KEY =", repr(api_key))

    if not api_key:
        return "OpenRouter API key missing."

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        json={
            "model": "mistralai/mistral-7b-instruct",
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt},
            ],
        },
        timeout=30,
    )

    data = response.json()

    if "choices" not in data:
        return f"OpenRouter error: {data}"

    return data["choices"][0]["message"]["content"]


@app.post("/chat")
def chat(req: ChatRequest):
    resume = json.load(open(BASE_DIR / "resume.json"))
    prompt = f"Resume:\n{resume}\n\nQuestion:\n{req.question}"
    answer = call_openrouter(prompt)
    return {"answer": answer}

@app.post("/conversations")
def new_conversation():
    cid = str(uuid.uuid4())
    with get_db() as conn:
        conn.execute("INSERT INTO conversations (id) VALUES (?)", (cid,))
        conn.commit()
    return {"id": cid}

@app.get("/conversations")
def list_conversations():
    with get_db() as conn:
        rows = conn.execute("SELECT * FROM conversations").fetchall()
    return [dict(r) for r in rows]


if (STATIC_DIR / "static").exists():
    app.mount(
        "/static",
        StaticFiles(directory=str(STATIC_DIR / "static")),
        name="static",
    )


@app.get("/")
def serve_frontend():
    return FileResponse(STATIC_DIR / "index.html")



@app.middleware("http")
async def spa_fallback(request: Request, call_next):
    response = await call_next(request)

    if (
        response.status_code == 404
        and request.method == "GET"
        and not request.url.path.startswith(("/chat", "/conversations", "/docs", "/openapi.json", "/static"))
    ):
        return FileResponse(STATIC_DIR / "index.html")

    return response

@app.get("/openrouter-test")
def openrouter_test():
    return call_openrouter("Say only the word OK")