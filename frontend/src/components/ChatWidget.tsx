import { useState } from "react";
import ChatBox from "./ChatBox";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: "50%",
          backgroundColor: "#111",
          color: "#fff",
          border: "none",
          fontSize: 24,
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        💬
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 90,
            right: 20,
            width: 360,
            height: 480,
            backgroundColor: "#fff",
            borderRadius: 12,
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            zIndex: 1000,
            overflow: "hidden",
          }}
        >

          <ChatBox onClose={() => setOpen(false)} />
        </div>
      )}
    </>
  );
};

export default ChatWidget;
