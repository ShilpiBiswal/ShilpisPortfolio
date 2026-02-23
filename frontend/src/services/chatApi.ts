const BASE = "http://127.0.0.1:8000";


export async function sendMessage(question: string) {
  const response = await fetch(`${BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch response from backend");
  }

  return response.json(); // { answer: string }
}

export interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export async function createConversation(): Promise<{ id: string }> {
  const res = await fetch(`${BASE}/conversations`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to create conversation");
  return res.json();
}

export async function loadMessages(conversationId: string): Promise<ChatMessage[]> {
  const res = await fetch(`${BASE}/conversations/${conversationId}/messages`);
  if (!res.ok) throw new Error("Failed to load messages");
  return res.json();
}

export async function saveMessage(
  conversationId: string,
  role: "user" | "assistant",
  content: string
): Promise<ChatMessage> {
  const res = await fetch(`${BASE}/conversations/${conversationId}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role, content }),
  });
  if (!res.ok) throw new Error("Failed to save message");
  return res.json();
}