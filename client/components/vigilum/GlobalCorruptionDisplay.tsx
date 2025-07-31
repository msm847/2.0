import { createPortal } from "react-dom";
import { useGlobalCorruptionCounter } from "@/contexts/GlobalCorruptionCounter";

const GlobalCorruptionDisplay = () => {
  const { globalLoss } = useGlobalCorruptionCounter();

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: "80px",
        left: "20px",
        backdropFilter: "blur(8px)",
        background: "rgba(0, 0, 0, 0.3)",
        border: "1px solid rgba(157, 230, 198, 0.2)",
        borderRadius: "8px",
        padding: "12px 16px",
        color: "white",
        fontFamily: "var(--font-display)",
        zIndex: 1000,
        minWidth: "180px",
        opacity: 0.8,
      }}
    >
      <div
        style={{
          fontSize: "12px",
          color: "#9DE6C6",
          marginBottom: "4px",
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontWeight: "500",
        }}
      >
        Global Corruption Loss
      </div>
      <div
        style={{
          fontSize: "24px",
          fontWeight: "700",
          color: "#FFFFFF",
          fontFamily: "monospace",
          marginBottom: "2px",
        }}
      >
        ${globalLoss.toLocaleString()}
      </div>
      <div
        style={{
          fontSize: "11px",
          color: "#9CA3AF",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#9DE6C6",
            animation: "pulse 2s infinite",
          }}
        />
        Live since you started exploring
      </div>
    </div>,
    document.body,
  );
};

export default GlobalCorruptionDisplay;
