from pydantic import BaseModel
from typing import Literal


class MessageIn(BaseModel):
    """Payload to save a single message."""
    role: Literal["user", "assistant"]
    content: str


class MessageOut(BaseModel):
    """A message returned from the DB."""
    id: int
    role: str
    content: str
    created_at: str


class ConversationOut(BaseModel):
    """A conversation row returned from the DB."""
    id: str
    created_at: str