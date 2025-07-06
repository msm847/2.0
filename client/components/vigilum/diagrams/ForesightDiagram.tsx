import { useEffect, useState } from "react";

interface Threat {
  id: string;
  label: string;
  x: number;
  y: number;
  angle: number;
  radius: number;
  detected: boolean;
}

const ForesightDiagram = () => {
  const [scanProgress, setScanProgress] = useState(0);
  const [allThreats, setAllThreats] = useState<Threat[]>([]);

  useEffect(() => {
    // Always generate all 6 threats
    const numThreats = 6;
    const threats: Threat[] = [];

    for (let i = 0; i < numThreats; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.random() * 100;
      const centerX = 125;
      const centerY = 125;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      threats.push({
        id: `threat-${i}`,
        label: `L00${i + 1}`,
        x: x - 4,
        y: y - 4,
        angle: angle,
        radius: radius,
        detected: false,
      });
    }
    setAllThreats(threats);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        const newProgress = (prev + 6) % 361; // Full 360 degree cycle
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Reset all threats to undetected when scan cycle completes
  useEffect(() => {
    if (scanProgress === 0) {
      setAllThreats((prevThreats) =>
        prevThreats.map((threat) => ({ ...threat, detected: false })),
      );
    }
  }, [scanProgress]);

  // Check for threat detection
  useEffect(() => {
    const currentBeamAngle = (scanProgress * Math.PI) / 180; // Convert to radians

    setAllThreats((prevThreats) =>
      prevThreats.map((threat) => {
        // If already detected, keep it detected
        if (threat.detected) return threat;

        // Calculate angular difference between beam and threat
        let angleDiff = Math.abs(currentBeamAngle - threat.angle);
        if (angleDiff > Math.PI) {
          angleDiff = 2 * Math.PI - angleDiff; // Handle wraparound
        }

        // Detect if beam is within 15 degrees (0.26 radians) of threat
        const detectionRange = 0.26;
        if (angleDiff <= detectionRange) {
          return { ...threat, detected: true };
        }

        return threat;
      }),
    );
  }, [scanProgress]);

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
      {/* Radar Background */}
      <div
        style={{
          width: "250px",
          height: "250px",
          border: "1px solid rgba(0, 255, 255, 0.3)",
          borderRadius: "50%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Concentric Circles */}
        {[1, 2, 3].map((ring) => (
          <div
            key={ring}
            style={{
              position: "absolute",
              width: `${ring * 80}px`,
              height: `${ring * 80}px`,
              border: "1px solid rgba(0, 255, 255, 0.2)",
              borderRadius: "50%",
            }}
          />
        ))}

        {/* Cross Lines */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "1px",
            background: "rgba(0, 255, 255, 0.2)",
            top: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: "1px",
            background: "rgba(0, 255, 255, 0.2)",
            left: "50%",
          }}
        />

        {/* Scanning Beam */}
        <div
          style={{
            position: "absolute",
            width: "125px",
            height: "2px",
            background: `linear-gradient(90deg, rgba(0, 255, 255, 0.8), transparent)`,
            transformOrigin: "0 50%",
            transform: `rotate(${scanProgress}deg)`, // Direct degree mapping
            top: "50%",
            left: "50%",
            marginTop: "-1px",
            boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
            transition: "transform 0.1s linear",
          }}
        />

        {/* Center Core */}
        <div
          style={{
            width: "20px",
            height: "20px",
            background: "#00ffff",
            borderRadius: "50%",
            boxShadow: "0 0 15px rgba(0, 255, 255, 0.8)",
            zIndex: 2,
          }}
        />

        {/* Detected Vulnerabilities */}
        {allThreats.map((threat) => (
          <div
            key={threat.id}
            style={{
              position: "absolute",
              top: `${threat.y}px`,
              left: `${threat.x}px`,
              opacity: threat.detected ? 1 : 0,
              transition: "opacity 0.2s ease-in",
              zIndex: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Threat Dot */}
            <div
              style={{
                width: "10px",
                height: "10px",
                background: "#ff6b6b",
                borderRadius: "50%",
                boxShadow: "0 0 8px rgba(255, 107, 107, 0.8)",
                animation: threat.detected ? "pulse 1s infinite" : "none",
                marginBottom: "2px",
              }}
            />
            {/* Threat Label */}
            <div
              style={{
                fontSize: "8px",
                fontFamily: "monospace",
                color: "#ff6b6b",
                fontWeight: "bold",
                textAlign: "center",
                background: "rgba(0, 0, 0, 0.8)",
                padding: "1px 3px",
                borderRadius: "2px",
                border: "1px solid rgba(255, 107, 107, 0.5)",
              }}
            >
              {threat.label}
            </div>
          </div>
        ))}

        {/* Scan Label */}
        <div
          style={{
            position: "absolute",
            top: "-30px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#00ffff",
            fontSize: "12px",
            fontFamily: "monospace",
            textAlign: "center",
          }}
        >
          STRUCTURAL SCAN
        </div>

        {/* Prediction Labels */}
        <div
          style={{
            position: "absolute",
            bottom: "-40px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#00ffff",
            fontSize: "10px",
            fontFamily: "monospace",
            textAlign: "center",
          }}
        >
          Predictive Risk Assessment
        </div>
      </div>

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
        <div style={{ marginBottom: "5px" }}>FORESIGHT ENGINE</div>
        <div style={{ color: "#ffffff" }}>
          Threats: {allThreats.filter((t) => t.detected).length}
        </div>
        <div style={{ color: "#ffffff" }}>Status: ACTIVE</div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.2); }
          }
        `}
      </style>
    </div>
  );
};

export default ForesightDiagram;
