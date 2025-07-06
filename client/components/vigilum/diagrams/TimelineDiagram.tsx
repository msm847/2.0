import { useEffect, useState } from "react";

const TimelineDiagram = () => {
  const [progress, setProgress] = useState(0);
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    {
      name: "Assessment",
      duration: "0-30 Days",
      impact: "85%",
      color: "#ff6b6b",
      description: "Vulnerability Mapping",
    },
    {
      name: "Implementation",
      duration: "1-3 Months",
      impact: "92%",
      color: "#ffd93d",
      description: "System Integration",
    },
    {
      name: "Optimization",
      duration: "3-6 Months",
      impact: "73%",
      color: "#6bcf7f",
      description: "Process Refinement",
    },
    {
      name: "Transformation",
      duration: "6+ Months",
      impact: "67%",
      color: "#4ecdc4",
      description: "Structural Immunity",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = (prev + 1) % 101;
        setActivePhase(Math.floor((newProgress / 100) * phases.length));
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [phases.length]);

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
        padding: "20px",
      }}
    >
      {/* Timeline Base */}
      <div
        style={{
          width: "80%",
          height: "4px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "2px",
          position: "relative",
          margin: "0 auto",
        }}
      >
        {/* Progress Bar */}
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: `linear-gradient(90deg, #ff6b6b, #ffd93d, #6bcf7f, #4ecdc4)`,
            borderRadius: "2px",
            transition: "width 0.1s linear",
            boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
          }}
        />

        {/* Phase Markers */}
        {phases.map((phase, index) => {
          const position = (index / (phases.length - 1)) * 100;
          const isActive = index === activePhase;

          return (
            <div
              key={phase.name}
              style={{
                position: "absolute",
                left: `${position}%`,
                top: "-20px",
                transform: "translateX(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Marker Dot */}
              <div
                style={{
                  width: isActive ? "16px" : "12px",
                  height: isActive ? "16px" : "12px",
                  background: isActive
                    ? phase.color
                    : "rgba(255, 255, 255, 0.3)",
                  border: `2px solid ${phase.color}`,
                  borderRadius: "50%",
                  marginBottom: "8px",
                  transition: "all 0.3s ease",
                  boxShadow: isActive ? `0 0 15px ${phase.color}` : "none",
                }}
              />

              {/* Phase Info */}
              <div
                style={{
                  background: isActive
                    ? "rgba(0, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.8)",
                  border: `1px solid ${isActive ? "#00ffff" : "rgba(255, 255, 255, 0.2)"}`,
                  borderRadius: "8px",
                  padding: "8px",
                  fontSize: "10px",
                  fontFamily: "monospace",
                  color: isActive ? "#00ffff" : "#ffffff",
                  textAlign: "center",
                  minWidth: "80px",
                  opacity: isActive ? 1 : 0.7,
                  transition: "all 0.3s ease",
                }}
              >
                <div style={{ fontWeight: "bold", marginBottom: "2px" }}>
                  {phase.name}
                </div>
                <div style={{ fontSize: "8px", marginBottom: "2px" }}>
                  {phase.duration}
                </div>
                <div style={{ fontSize: "8px", color: phase.color }}>
                  {phase.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Impact Metrics */}
      <div
        style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          background: "rgba(0, 255, 255, 0.1)",
          border: "1px solid rgba(0, 255, 255, 0.3)",
          borderRadius: "8px",
          padding: "10px",
          fontSize: "10px",
          fontFamily: "monospace",
          color: "#00ffff",
        }}
      >
        <div style={{ marginBottom: "5px" }}>IMPACT METRICS</div>
        {phases.map((phase, index) => (
          <div
            key={phase.name}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "3px",
              opacity: index === activePhase ? 1 : 0.5,
              transition: "opacity 0.3s ease",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                background: phase.color,
                marginRight: "5px",
                borderRadius: "50%",
              }}
            />
            <span style={{ color: "#ffffff", fontSize: "9px" }}>
              {phase.impact}
            </span>
          </div>
        ))}
      </div>

      {/* Current Status */}
      <div
        style={{
          position: "absolute",
          bottom: "15px",
          left: "15px",
          background: "rgba(0, 0, 0, 0.8)",
          border: "1px solid rgba(0, 255, 255, 0.3)",
          borderRadius: "8px",
          padding: "10px",
          fontSize: "10px",
          fontFamily: "monospace",
          color: "#00ffff",
        }}
      >
        <div style={{ marginBottom: "5px" }}>CURRENT PHASE</div>
        <div
          style={{
            color: phases[activePhase]?.color || "#ffffff",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {phases[activePhase]?.name || "INITIALIZING"}
        </div>
        <div style={{ color: "#ffffff", fontSize: "9px" }}>
          Progress: {progress}%
        </div>
      </div>

      {/* Future Benefits */}
      <div
        style={{
          position: "absolute",
          bottom: "15px",
          right: "15px",
          fontSize: "9px",
          fontFamily: "monospace",
          color: "#a0a0a0",
          textAlign: "right",
        }}
      >
        <div style={{ color: "#6bcf7f" }}>✓ Risk Reduction</div>
        <div style={{ color: "#ffd93d" }}>✓ Process Integrity</div>
        <div style={{ color: "#4ecdc4" }}>✓ Predictive Prevention</div>
      </div>

      {/* Progress Indicator */}
      <div
        style={{
          position: "absolute",
          top: "15px",
          left: "15px",
          fontSize: "12px",
          fontFamily: "monospace",
          color: "#00ffff",
          fontWeight: "bold",
        }}
      >
        PREVENTION TIMELINE
      </div>
    </div>
  );
};

export default TimelineDiagram;
