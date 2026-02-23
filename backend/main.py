from fastapi import FastAPI
from pydantic import BaseModel
import json
import os
import uuid
import sqlite3
import requests
from pathlib import Path
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://splendid-healing-production.up.railway.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



DB_PATH = Path(__file__).parent / "chat_history.db"

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with get_db() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS conversations (
                id         TEXT PRIMARY KEY,
                created_at DATETIME DEFAULT (datetime('now'))
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS messages (
                id              INTEGER PRIMARY KEY AUTOINCREMENT,
                conversation_id TEXT NOT NULL,
                role            TEXT NOT NULL,
                content         TEXT NOT NULL,
                created_at      DATETIME DEFAULT (datetime('now')),
                FOREIGN KEY (conversation_id) REFERENCES conversations(id)
            )
        """)
        conn.commit()

@app.on_event("startup")
def startup():
    init_db()


class ChatRequest(BaseModel):
    question: str

class MessageIn(BaseModel):
    role: str      # "user" or "assistant"
    content: str


def load_resume():
    with open("resume.json", "r", encoding="utf-8") as f:
        return json.load(f)

SYSTEM_PROMPT = """
You are an AI assistant for my portfolio website.

Rules:
- Answer questions using ONLY the information present in the resume.
- You MAY infer skills or experience if they are clearly demonstrated by actions in the resume
  (e.g., "developed using Flutter" implies "Flutter experience").
- Understand different phrasings of the same intent.
- Do NOT invent new skills, roles, timelines, or experiences.

If the resume does not contain enough information to answer confidently, reply exactly:
"I don't have that information in the resume."
"""

def call_openrouter(prompt: str):
    headers = {
        "Authorization": f"Bearer {os.getenv('OPENROUTER_API_KEY')}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "mistralai/mistral-7b-instruct",
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt}
        ]
    }
    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers=headers,
        json=payload
    )
    return response.json()["choices"][0]["message"]["content"]





@app.get("/")
def root():
    return {"status": "Backend is running"}

@app.post("/chat")
def chat(req: ChatRequest):
    resume = load_resume()
    prompt = f"Resume:\n{resume}\n\nQuestion:\n{req.question}"
    answer = call_openrouter(prompt)
    return {"answer": answer}



@app.post("/conversations")
def new_conversation():
    """Start a new conversation, returns its id."""
    cid = str(uuid.uuid4())
    with get_db() as conn:
        conn.execute("INSERT INTO conversations (id) VALUES (?)", (cid,))
        conn.commit()
    return {"id": cid}


@app.get("/conversations/{conversation_id}/messages")
def get_messages(conversation_id: str):
    """Load all messages for a conversation."""
    with get_db() as conn:
        rows = conn.execute(
            "SELECT id, role, content, created_at FROM messages "
            "WHERE conversation_id = ? ORDER BY created_at ASC",
            (conversation_id,)
        ).fetchall()
    return [dict(row) for row in rows]


@app.post("/conversations/{conversation_id}/messages")
def save_message(conversation_id: str, body: MessageIn):
    """Save a single message to a conversation."""
    with get_db() as conn:
        conn.execute(
            "INSERT OR IGNORE INTO conversations (id) VALUES (?)",
            (conversation_id,)
        )
        cursor = conn.execute(
            "INSERT INTO messages (conversation_id, role, content) VALUES (?, ?, ?)",
            (conversation_id, body.role, body.content)
        )
        conn.commit()
        msg_id = cursor.lastrowid

    with get_db() as conn:
        row = conn.execute(
            "SELECT id, role, content, created_at FROM messages WHERE id = ?",
            (msg_id,)
        ).fetchone()
    return dict(row)


@app.delete("/conversations/{conversation_id}")
def delete_conversation(conversation_id: str):
    """Delete a conversation and all its messages."""
    with get_db() as conn:
        conn.execute("DELETE FROM messages WHERE conversation_id = ?", (conversation_id,))
        conn.execute("DELETE FROM conversations WHERE id = ?", (conversation_id,))
        conn.commit()
    return {"deleted": conversation_id}

@app.get("/conversations")
def list_conversations():
    with get_db() as conn:
        rows = conn.execute(
            "SELECT * FROM conversations ORDER BY created_at DESC"
        ).fetchall()
    return [dict(row) for row in rows]

@app.get("/conversations/all-messages")
def all_messages():
    with get_db() as conn:
        rows = conn.execute(
            """
            SELECT m.id, m.conversation_id, m.role, m.content, m.created_at
            FROM messages m
            ORDER BY m.created_at ASC
            """
        ).fetchall()
    return [dict(row) for row in rows]

if os.path.exists("static"):
    app.mount("/", StaticFiles(directory="static", html=True), name="static")