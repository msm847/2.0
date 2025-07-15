import React from "react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        margin: 0,
        padding: 0,
        position: "relative",
        backgroundColor: "#0E1A17",
      }}
    >
      {/* New Brain Animation Background */}
      <iframe
        src="https://my.spline.design/particleaibrain-adL2AYtD8H0GnWtw2HEEOGVO/?controls=false&logo=false&branding=false"
        frameBorder="0"
        width="100%"
        height="100%"
        style={{
          border: "none",
          backgroundColor: "#0E1A17",
        }}
      />

      {/* Observe. Compute. Expose. Text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 8vw, 4rem)",
            fontWeight: "700",
            lineHeight: "1.1",
            color: "#9DE6C6",
            margin: 0,
            textShadow: "0 0 20px rgba(157, 230, 198, 0.3)",
            letterSpacing: "0.02em",
          }}
        >
          Observe. Compute. Expose.
        </h1>
      </div>

      {/* CTA Button */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
      >
        <Link
          to="/vigilum#engines"
          style={{
            display: "inline-block",
            padding: "12px 32px",
            fontFamily: "var(--font-ui)",
            fontSize: "16px",
            fontWeight: "600",
            color: "#9DE6C6",
            background: "transparent",
            border: "2px solid #17B58F",
            textDecoration: "none",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            transition: "all 0.3s ease",
            textShadow: "0 0 8px #17B58F40",
            boxShadow: "0 0 20px #17B58F30",
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow =
              "0 0 30px #17B58F60, inset 0 0 20px #17B58F20";
            e.target.style.textShadow = "0 0 12px #17B58F80";
            e.target.style.borderColor = "#9DE6C6";
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = "0 0 20px #17B58F30";
            e.target.style.textShadow = "0 0 8px #17B58F40";
            e.target.style.borderColor = "#17B58F";
          }}
        >
          Enter Simulation
        </Link>
      </div>
    </div>
  );
}
