import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).parent / "chat_history.db"


def get_connection() -> sqlite3.Connection:
    """Return a SQLite connection with row_factory for dict-like rows."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    """Create tables if they don't exist. Call once on app startup."""
    with get_connection() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS conversations (
                id          TEXT PRIMARY KEY,
                created_at  DATETIME DEFAULT (datetime('now'))
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS messages (
                id              INTEGER PRIMARY KEY AUTOINCREMENT,
                conversation_id TEXT NOT NULL,
                role            TEXT NOT NULL CHECK(role IN ('user', 'assistant')),
                content         TEXT NOT NULL,
                created_at      DATETIME DEFAULT (datetime('now')),
                FOREIGN KEY (conversation_id) REFERENCES conversations(id)
            )
        """)
        conn.commit()


def create_conversation(conversation_id: str) -> None:
    """Insert a new conversation row."""
    with get_connection() as conn:
        conn.execute(
            "INSERT OR IGNORE INTO conversations (id) VALUES (?)",
            (conversation_id,),
        )
        conn.commit()


def get_all_conversations() -> list[dict]:
    """Return all conversations ordered by most recent."""
    with get_connection() as conn:
        rows = conn.execute(
            "SELECT * FROM conversations ORDER BY created_at DESC"
        ).fetchall()
    return [dict(row) for row in rows]


def save_message(conversation_id: str, role: str, content: str) -> int:
    """Insert a message and return its new id."""
    with get_connection() as conn:
        cursor = conn.execute(
            """
            INSERT INTO messages (conversation_id, role, content)
            VALUES (?, ?, ?)
            """,
            (conversation_id, role, content),
        )
        conn.commit()
        return cursor.lastrowid


def get_messages(conversation_id: str) -> list[dict]:
    """Return all messages for a conversation in chronological order."""
    with get_connection() as conn:
        rows = conn.execute(
            """
            SELECT id, role, content, created_at
            FROM messages
            WHERE conversation_id = ?
            ORDER BY created_at ASC
            """,
            (conversation_id,),
        ).fetchall()
    return [dict(row) for row in rows]


def delete_conversation(conversation_id: str) -> None:
    """Delete a conversation and all its messages."""
    with get_connection() as conn:
        conn.execute(
            "DELETE FROM messages WHERE conversation_id = ?",
            (conversation_id,),
        )
        conn.execute(
            "DELETE FROM conversations WHERE id = ?",
            (conversation_id,),
        )
        conn.commit()