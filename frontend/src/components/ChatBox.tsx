import { useState, useEffect } from "react";
import { sendMessage, createConversation, saveMessage } from "../services/chatApi";

type Message = {
  role: "user" | "ai";
  text: string;
};

type Props = {
  onClose?: () => void;
};

const ChatBox = ({ onClose }: Props) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  useEffect(() => {
    createConversation()
      .then((convo) => setConversationId(convo.id))
      .catch(() => {
        console.warn("Could not create conversation in DB. Chat will work without history.");
      });
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
    const userMessage: Message = { role: "user", text: userText };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      if (conversationId) {
        await saveMessage(conversationId, "user", userText).catch(() => null);
      }

      const res = await sendMessage(userText);
      const aiMessage: Message = { role: "ai", text: res.answer };
      setMessages((prev) => [...prev, aiMessage]);

      if (conversationId) {
        await saveMessage(conversationId, "assistant", res.answer).catch(() => null);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Error talking to server." },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>

      {onClose && (
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            background: "transparent",
            border: "none",
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          ✕
        </button>
      )}

      <h3 style={{ margin: "8px 12px" }}>Chat with my Resume</h3>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 12,
          borderTop: "1px solid #eee",
          borderBottom: "1px solid #eee",
        }}
      >
        {messages.map((msg, i) => (
          <p key={i}>
            <strong>{msg.role === "user" ? "You" : "AI"}:</strong>{" "}
            {msg.text}
          </p>
        ))}
        {loading && <p><em>AI is thinking…</em></p>}
      </div>

      <div style={{ display: "flex", padding: 8, borderTop: "1px solid #ddd" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          style={{ flex: 1, padding: 8 }}
          placeholder="Ask about my experience, projects, skills…"
        />
        <button onClick={handleSend} style={{ padding: "8px 12px", marginLeft: 8 }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;