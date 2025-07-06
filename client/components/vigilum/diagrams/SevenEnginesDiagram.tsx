import { useEffect, useState } from "react";

const SevenEnginesDiagram = () => {
  const [activeEngine, setActiveEngine] = useState(0);
  const [dataFlow, setDataFlow] = useState<number[]>([]);

  const engines = [
    { name: "SPE", fullName: "Semantic Permutation", color: "#ff6b6b" },
    { name: "CLAVIS", fullName: "Clause Analysis", color: "#ffd93d" },
    { name: "OBSCURA", fullName: "Opacity Behavioral", color: "#6bcf7f" },
    { name: "NULLUM", fullName: "Null Vector Logic", color: "#4ecdc4" },
    { name: "NEXUS", fullName: "Network Execution", color: "#95e1d3" },
    { name: "VIGILO", fullName: "Vigilance Integration", color: "#a8e6cf" },
    { name: "VERIS", fullName: "Vector Extraction", color: "#c7ceea" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEngine((prev) => (prev + 1) % 7);
      setDataFlow((prev) => [...prev.slice(-10), Math.random()]);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const getEnginePosition = (index: number) => {
    const angle = (index * 2 * Math.PI) / 7 - Math.PI / 2; // Start from top
    const radius = 80;
    const centerX = 150;
    const centerY = 150;

    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

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
      <svg width="300" height="300" style={{ position: "absolute" }}>
        {/* Background connections */}
        {engines.map((_, fromIndex) =>
          engines.map((_, toIndex) => {
            if (fromIndex === toIndex) return null;
            const from = getEnginePosition(fromIndex);
            const to = getEnginePosition(toIndex);

            return (
              <line
                key={`${fromIndex}-${toIndex}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="rgba(0, 255, 255, 0.1)"
                strokeWidth="1"
              />
            );
          }),
        )}

        {/* Active connections */}
        {engines.map((_, toIndex) => {
          if (toIndex === activeEngine) return null;
          const from = getEnginePosition(activeEngine);
          const to = getEnginePosition(toIndex);

          return (
            <line
              key={`active-${activeEngine}-${toIndex}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={engines[activeEngine].color}
              strokeWidth="2"
              opacity="0.8"
            >
              <animate
                attributeName="opacity"
                values="0.8;0.3;0.8"
                dur="1s"
                repeatCount="indefinite"
              />
            </line>
          );
        })}

        {/* Central Hub */}
        <circle
          cx="150"
          cy="150"
          r="25"
          fill="rgba(0, 255, 255, 0.2)"
          stroke="#00ffff"
          strokeWidth="2"
        />
        <text
          x="150"
          y="155"
          textAnchor="middle"
          fill="#00ffff"
          fontSize="10"
          fontFamily="monospace"
        >
          CORE
        </text>

        {/* Engine Nodes */}
        {engines.map((engine, index) => {
          const pos = getEnginePosition(index);
          const isActive = index === activeEngine;

          return (
            <g key={engine.name}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isActive ? "20" : "15"}
                fill={isActive ? engine.color : "rgba(255, 255, 255, 0.1)"}
                stroke={engine.color}
                strokeWidth={isActive ? "3" : "2"}
                opacity={isActive ? "1" : "0.7"}
              >
                {isActive && (
                  <animate
                    attributeName="r"
                    values="15;22;15"
                    dur="1.2s"
                    repeatCount="indefinite"
                  />
                )}
              </circle>
              <text
                x={pos.x}
                y={pos.y + 3}
                textAnchor="middle"
                fill={isActive ? "#000000" : "#ffffff"}
                fontSize="8"
                fontFamily="monospace"
                fontWeight="bold"
              >
                {engine.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Active Engine Info */}
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
          width: "120px",
        }}
      >
        <div style={{ marginBottom: "5px" }}>ACTIVE ENGINE</div>
        <div
          style={{
            color: engines[activeEngine].color,
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {engines[activeEngine].name}
        </div>
        <div style={{ color: "#ffffff", fontSize: "9px" }}>
          {engines[activeEngine].fullName}
        </div>
        <div style={{ color: "#ffffff", marginTop: "5px" }}>
          Status: ANALYZING
        </div>
      </div>

      {/* Data Flow Indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "15px",
          left: "15px",
          background: "rgba(0, 0, 0, 0.8)",
          border: "1px solid rgba(0, 255, 255, 0.3)",
          borderRadius: "8px",
          padding: "10px",
          fontSize: "9px",
          fontFamily: "monospace",
          color: "#00ffff",
        }}
      >
        <div style={{ marginBottom: "5px" }}>DATA FLOW</div>
        <div style={{ display: "flex", gap: "2px", alignItems: "end" }}>
          {dataFlow.slice(-8).map((value, index) => (
            <div
              key={index}
              style={{
                width: "3px",
                height: `${value * 20 + 5}px`,
                background: "#00ffff",
                opacity: 0.3 + (index / 8) * 0.7,
              }}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
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
        <div>• Distributed Intelligence</div>
        <div>• Semantic Interoperability</div>
        <div>• Real-time Analysis</div>
      </div>
    </div>
  );
};

export default SevenEnginesDiagram;
