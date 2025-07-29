import { useRef } from "react";
import "./LightRays.css";

const DEFAULT_COLOR = "#ffffff";

const LightRays = ({
  raysOrigin = "top-center",
  raysColor = DEFAULT_COLOR,
  raysSpeed = 1,
  lightSpread = 3.5,
  rayLength = 4.5,
  pulsating = false,
  fadeDistance = 0.3,
  saturation = 2.5,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0.0,
  distortion = 0.0,
  className = "",
}) => {
  const containerRef = useRef(null);

  // Simplified fallback component without WebGL functionality
  // This provides basic styling without OGL dependency

  return (
    <div
      ref={containerRef}
      className={`light-rays-container ${className}`.trim()}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        background: `radial-gradient(ellipse at center, ${raysColor}20 0%, transparent 50%)`,
        opacity: pulsating ? 0.5 : 0.3,
        animation: pulsating ? 'pulse 2s infinite' : 'none',
      }}
    />
  );
};

export default LightRays;
