import { useEffect, useState } from "react";

interface Threat {
  id: number;
  x: number;
  y: number;
}

const ForesightDiagram = () => {
  const [scanProgress, setScanProgress] = useState(0);
  const [detectedThreats, setDetectedThreats] = useState<Threat[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        const newProgress = (prev + 2) % 101;
        if (newProgress === 0) {
          setDetectedThreats([]);
        } else if (newProgress > 20 && newProgress % 25 === 0) {
          // Generate static position for new threat
          const angle = Math.random() * 2 * Math.PI;
          const radius = Math.random() * 100;
          const centerX = 125;
          const centerY = 125;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;

          setDetectedThreats((threats) => [
            ...threats,
            {
              id: Date.now() + Math.random(),
              x: x - 4, // Center the dot
              y: y - 4, // Center the dot
            },
          ]);
        }
        return newProgress;
      });
    }, 100);

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
            transform: `rotate(${scanProgress * 3.6}deg)`,
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
        {detectedThreats.map((threat) => (
          <div
            key={threat.id}
            style={{
              position: "absolute",
              width: "8px",
              height: "8px",
              background: "#ff6b6b",
              borderRadius: "50%",
              top: `${threat.y}px`,
              left: `${threat.x}px`,
              boxShadow: "0 0 8px rgba(255, 107, 107, 0.8)",
              animation: "pulse 1s infinite",
              zIndex: 3,
            }}
          />
        ))}

        {/* Progress Indicator */}
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
          STRUCTURAL SCAN: {scanProgress}%
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
          Threats: {detectedThreats.length}
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
