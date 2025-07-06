import { useEffect, useState } from "react";

const BlindspotDiagram = () => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 4);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "300px",
        background: "#0a0a0a",
        border: "1px solid rgba(0, 255, 255, 0.2)",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Grid */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
          opacity: 0.3,
        }}
      />

      {/* Central Institution */}
      <div
        style={{
          width: "180px",
          height: "180px",
          background: "rgba(0, 255, 255, 0.1)",
          border: "3px solid #00ffff",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            color: "#00ffff",
            fontSize: "14px",
            fontFamily: "monospace",
            textAlign: "center",
            textTransform: "uppercase",
            lineHeight: "1.2",
          }}
        >
          Traditional
          <br />
          Institution
        </div>

        {/* Blindspot Areas */}
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              width: "50px",
              height: "50px",
              background:
                animationStep === index
                  ? "rgba(255, 0, 0, 0.3)"
                  : "rgba(255, 255, 255, 0.05)",
              border:
                animationStep === index
                  ? "3px solid #ff0000"
                  : "2px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "50%",
              top: index === 0 || index === 1 ? "-25px" : "155px",
              left: index === 0 || index === 3 ? "-25px" : "155px",
              transition: "all 0.5s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                color: animationStep === index ? "#ff0000" : "#ffffff",
                fontSize: "14px",
                fontFamily: "monospace",
                transition: "color 0.5s ease",
                fontWeight: "bold",
              }}
            >
              ?
            </div>
          </div>
        ))}
      </div>

      {/* Detection Rays (Traditional Oversight) */}
      {[45, 135, 225, 315].map((angle, index) => (
        <div
          key={angle}
          style={{
            position: "absolute",
            width: "140px",
            height: "3px",
            background: `linear-gradient(90deg, rgba(0, 255, 255, 0.4), transparent)`,
            transformOrigin: "0 50%",
            transform: `rotate(${angle}deg)`,
            top: "50%",
            left: "50%",
            marginTop: "-1.5px",
            opacity: animationStep === 3 ? 1 : 0.3,
            transition: "opacity 0.5s ease",
            zIndex: 1,
            boxShadow:
              animationStep === 3 ? "0 0 8px rgba(0, 255, 255, 0.6)" : "none",
          }}
        />
      ))}

      {/* Warning Text */}
      <div
        style={{
          position: "absolute",
          bottom: "14px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "#ff6b6b",
          fontSize: "12px",
          fontFamily: "monospace",
          textAlign: "center",
          opacity: animationStep >= 2 ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        Structural vulnerabilities remain invisible
      </div>

      {/* Legend */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "15px",
          fontSize: "10px",
          fontFamily: "monospace",
          color: "#a0a0a0",
        }}
      >
        <div style={{ marginBottom: "5px" }}>
          <span style={{ color: "#00ffff" }}>●</span> Traditional Detection
        </div>
        <div>
          <span style={{ color: "#ff0000" }}>●</span> Hidden Vulnerabilities
        </div>
      </div>
    </div>
  );
};

export default BlindspotDiagram;
