interface AccordionItemProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  content: string;
  style?: React.CSSProperties;
}

export default function AccordionItem({
  label,
  isOpen,
  onToggle,
  content,
  style = {},
}: AccordionItemProps) {
  return (
    <div style={{ marginBottom: 10, ...style }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "none",
          border: "1px solid #fff",
          color: "#fff",
          padding: "11px 16px",
          fontSize: 15,
          fontWeight: 600,
          cursor: "pointer",
          textAlign: "left",
          borderRadius: isOpen ? "5px 5px 0 0" : 5,
          letterSpacing: "-0.01em",
          fontFamily: "inherit",
        }}
      >
        <span style={{ fontSize: 17, lineHeight: 1 }}>↘</span>
        {label}
      </button>

      {isOpen && (
        <div
          style={{
            background: "#2e2e2e",
            border: "1px solid #fff",
            borderTop: "none",
            borderRadius: "0 0 5px 5px",
            padding: "16px 18px",
            fontSize: 15,
            lineHeight: 1.7,
            color: "#ddd",
            fontWeight: 500,
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
}