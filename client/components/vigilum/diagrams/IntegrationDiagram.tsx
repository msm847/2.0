import { useEffect, useState } from "react";

const IntegrationDiagram = () => {
  const [connectionStatus, setConnectionStatus] = useState(0);
  const [dataFlow, setDataFlow] = useState(false);

  const systems = [
    { name: "Legal Mgmt", x: 65, y: 60, color: "#ff6b6b" },
    { name: "Compliance", x: 235, y: 60, color: "#ffd93d" },
    { name: "Risk Assess", x: 65, y: 190, color: "#6bcf7f" },
    { name: "Audit Trail", x: 235, y: 190, color: "#4ecdc4" },
  ];

  const vigilumCore = { x: 150, y: 125 };

  useEffect(() => {
    const interval = setInterval(() => {
      setConnectionStatus((prev) => (prev + 1) % 5); // 0-4: 0 = none, 4 = all connected
      setDataFlow((prev) => !prev);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const isSystemConnected = (index: number) => {
    return connectionStatus > index;
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
      <svg width="300" height="250" style={{ position: "absolute" }}>
        {/* Connection Lines */}
        {systems.map((system, index) => {
          const connected = isSystemConnected(index);
          return (
            <line
              key={`connection-${index}`}
              x1={system.x}
              y1={system.y}
              x2={vigilumCore.x}
              y2={vigilumCore.y}
              stroke={connected ? system.color : "rgba(255, 255, 255, 0.2)"}
              strokeWidth={connected ? "3" : "1"}
              strokeDasharray={connected ? "none" : "5,5"}
              opacity={connected ? "1" : "0.5"}
            >
              {connected && dataFlow && (
                <animate
                  attributeName="stroke-opacity"
                  values="1;0.3;1"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              )}
            </line>
          );
        })}

        {/* Data Flow Particles */}
        {systems.map((system, index) => {
          if (!isSystemConnected(index) || !dataFlow) return null;

          return (
            <circle
              key={`particle-${index}`}
              r="3"
              fill={system.color}
              opacity="0.8"
            >
              <animateMotion
                dur="2s"
                repeatCount="indefinite"
                path={`M ${system.x} ${system.y} L ${vigilumCore.x} ${vigilumCore.y}`}
              />
            </circle>
          );
        })}

        {/* External Systems */}
        {systems.map((system, index) => {
          const connected = isSystemConnected(index);
          return (
            <g key={`system-${index}`}>
              <rect
                x={system.x - 40}
                y={system.y - 30}
                width="80"
                height="60"
                fill={connected ? system.color : "rgba(255, 255, 255, 0.1)"}
                stroke={connected ? system.color : "rgba(255, 255, 255, 0.3)"}
                strokeWidth="2"
                rx="8"
                opacity={connected ? "0.8" : "0.5"}
              />
              <text
                x={system.x}
                y={system.y + 6}
                textAnchor="middle"
                fill={connected ? "#000000" : "#ffffff"}
                fontSize="12"
                fontFamily="monospace"
                fontWeight="bold"
              >
                {system.name}
              </text>
              {/* Connection Status */}
              <circle
                cx={system.x + 36}
                cy={system.y - 24}
                r="5"
                fill={connected ? "#00ff00" : "#ff0000"}
              >
                {connected && (
                  <animate
                    attributeName="opacity"
                    values="1;0.3;1"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                )}
              </circle>
            </g>
          );
        })}

        {/* Vigilum Core */}
        <g>
          <circle
            cx={vigilumCore.x}
            cy={vigilumCore.y}
            r="50"
            fill="rgba(0, 255, 255, 0.2)"
            stroke="#00ffff"
            strokeWidth="3"
          >
            <animate
              attributeName="r"
              values="50;56;50"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <text
            x={vigilumCore.x}
            y={vigilumCore.y - 6}
            textAnchor="middle"
            fill="#00ffff"
            fontSize="16"
            fontFamily="monospace"
            fontWeight="bold"
          >
            VIGILUM
          </text>
          <text
            x={vigilumCore.x}
            y={vigilumCore.y + 12}
            textAnchor="middle"
            fill="#00ffff"
            fontSize="14"
            fontFamily="monospace"
          >
            CORE
          </text>
        </g>

        {/* Integration Progress Indicator */}
        <rect
          x="10"
          y="10"
          width="60"
          height="8"
          fill="rgba(255, 255, 255, 0.1)"
          stroke="rgba(0, 255, 255, 0.3)"
          strokeWidth="1"
          rx="4"
        />
        <rect
          x="10"
          y="10"
          width={`${(connectionStatus / 4) * 60}`}
          height="8"
          fill="#00ffff"
          rx="4"
        />
        <text x="75" y="17" fill="#00ffff" fontSize="10" fontFamily="monospace">
          {Math.round((connectionStatus / 4) * 100)}%
        </text>
      </svg>

      {/* Status Panel */}
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
        <div style={{ marginBottom: "5px" }}>INTEGRATION STATUS</div>
        <div style={{ color: "#ffffff" }}>Connected: {connectionStatus}/4</div>
        <div style={{ color: "#ffffff" }}>
          Data Flow: {dataFlow ? "ACTIVE" : "IDLE"}
        </div>
        <div style={{ color: "#ffffff" }}>API Status: ONLINE</div>
      </div>

      {/* Deployment Steps */}
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
        <div style={{ marginBottom: "5px" }}>DEPLOYMENT PHASE</div>
        {[
          "System Discovery",
          "API Integration",
          "Data Validation",
          "Full Deployment",
        ].map((step, index) => (
          <div
            key={step}
            style={{
              color:
                connectionStatus > index
                  ? "#00ff00"
                  : connectionStatus === index
                    ? "#ffd93d"
                    : "#666666",
              fontSize: "8px",
              marginBottom: "2px",
            }}
          >
            {connectionStatus > index
              ? "✓"
              : connectionStatus === index
                ? "►"
                : "○"}{" "}
            {step}
          </div>
        ))}
      </div>

      {/* Feature List */}
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
        <div style={{ color: "#6bcf7f" }}>• API Integration</div>
        <div style={{ color: "#ffd93d" }}>• Real-time Monitoring</div>
        <div style={{ color: "#4ecdc4" }}>• Minimal Disruption</div>
        <div style={{ color: "#ff6b6b" }}>• Secure Deployment</div>
      </div>
    </div>
  );
};

export default IntegrationDiagram;
