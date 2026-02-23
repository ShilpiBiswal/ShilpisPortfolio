import uuid
from fastapi import APIRouter, HTTPException
from database import (
    create_conversation,
    get_all_conversations,
    save_message,
    get_messages,
    delete_conversation,
)
from models import MessageIn, MessageOut, ConversationOut

router = APIRouter(prefix="/api/chat", tags=["chat"])


@router.post("/conversations", response_model=ConversationOut)
def new_conversation():
    conversation_id = str(uuid.uuid4())
    create_conversation(conversation_id)
    conversations = get_all_conversations()
    match = next(c for c in conversations if c["id"] == conversation_id)
    return match

@router.get("/conversations", response_model=list[ConversationOut])
def list_conversations():
    return get_all_conversations()

@router.get(
    "/conversations/{conversation_id}/messages",
    response_model=list[MessageOut],
)
def fetch_messages(conversation_id: str):
    messages = get_messages(conversation_id)
    if messages is None:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return messages

@router.post(
    "/conversations/{conversation_id}/messages",
    response_model=MessageOut,
)
def add_message(conversation_id: str, body: MessageIn):
    create_conversation(conversation_id)
    msg_id = save_message(conversation_id, body.role, body.content)
    messages = get_messages(conversation_id)
    match = next(m for m in messages if m["id"] == msg_id)
    return match


@router.delete("/conversations/{conversation_id}", status_code=204)
def remove_conversation(conversation_id: str):
    delete_conversation(conversation_id)