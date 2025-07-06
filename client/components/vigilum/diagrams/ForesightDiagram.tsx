import { useEffect, useState } from "react";

interface Threat {
  id: number;
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
    // Pre-generate threat positions
    const threats: Threat[] = [];
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.random() * 100;
      const centerX = 125;
      const centerY = 125;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      threats.push({
        id: Date.now() + Math.random() + i,
        x: x - 4,
        y: y - 4,
        angle: angle,
        radius: radius,
        detected: false,
      });
    }
    setAllThreats(threats);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        const newProgress = (prev + 6) % 401; // 3x faster (was +2, now +6)

        // Reset detection when cycle restarts
        if (newProgress === 0) {
          setAllThreats((prevThreats) =>
            prevThreats.map((threat) => ({ ...threat, detected: false })),
          );
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
            transform: `rotate(${scanProgress * 0.9}deg)`, // Adjusted for longer cycle (0.9 = 360/400)
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
        {allThreats.map((threat) => {
          // Calculate current beam angle in radians
          const beamAngle = (scanProgress * 0.9 * Math.PI) / 180;

          // Normalize angles to 0-2π range
          const normalizedBeamAngle =
            ((beamAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
          const normalizedThreatAngle =
            ((threat.angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

          // Check if beam is near this threat (within ~15 degrees)
          const angleDiff = Math.abs(
            normalizedBeamAngle - normalizedThreatAngle,
          );
          const isNearBeam = angleDiff < 0.26 || angleDiff > 2 * Math.PI - 0.26; // 0.26 radians ≈ 15 degrees

          // Update detected status
          if (isNearBeam && !threat.detected) {
            threat.detected = true;
          }

          return (
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
                opacity: threat.detected ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            />
          );
        })}

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
