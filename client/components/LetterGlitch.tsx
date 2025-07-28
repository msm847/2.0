import { useRef, useEffect, useState } from "react";

interface LetterGlitchProps {
  glitchColors?: string[];
  className?: string;
  glitchSpeed?: number;
  centerVignette?: boolean;
  outerVignette?: boolean;
  smooth?: boolean;
  onAnimationFinished?: () => void;
}

const LetterGlitch = ({
  glitchColors = ["#2b4539", "#61dca3", "#61b3dc"],
  className = "",
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  onAnimationFinished,
}: LetterGlitchProps) => {
  const [robotLoaded, setRobotLoaded] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);

  const handleIframeLoad = () => {
    setRobotLoaded(true);
    // Wait for robot animation to fully finish
    setTimeout(() => {
      setAnimationFinished(true);
      onAnimationFinished?.(); // Notify parent component that animation is finished
    }, 4000); // Wait 4 seconds for animation to complete
  };



  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "#10201C",
    overflow: "hidden",
  };

  const iframeStyle: React.CSSProperties = {
    border: "none",
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
  };

  const outerVignetteStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    background:
      "radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(16,32,28,1) 100%)",
    zIndex: 1,
  };

  const centerVignetteStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    background:
      "radial-gradient(circle, rgba(16,32,28,0.8) 0%, rgba(0,0,0,0) 60%)",
    zIndex: 1,
  };

  const audioButtonStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "20px",
    right: "20px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: isPlaying
      ? "rgba(64, 255, 170, 0.2)"
      : "rgba(64, 255, 170, 0.1)",
    border: `2px solid ${isPlaying ? "rgba(64, 255, 170, 0.6)" : "rgba(64, 255, 170, 0.3)"}`,
    color: "#40FFAA",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    zIndex: 2,
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
    boxShadow: isPlaying ? "0 0 20px rgba(64, 255, 170, 0.4)" : "none",
    animation: isPlaying ? "pulse 1.5s ease-in-out infinite" : "none",
  };

  const soundWaveStyle: React.CSSProperties = {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    alignItems: "center",
    gap: "3px",
    zIndex: 2,
  };

  return (
    <div style={containerStyle} className={className}>
      {/* Green background layer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#10201C",
          zIndex: -1,
        }}
      />

      {/* Robot Animation with background replacement */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "#10201C",
          zIndex: 0,
        }}
      >
        <iframe
          src="https://my.spline.design/nexbotrobotcharacterconcept-w4s24MAIQS4z8NrM3EJCw0RZ/"
          frameBorder="0"
          width="100%"
          height="100%"
          style={{
            ...iframeStyle,
            marginTop: "200px",
            height: "calc(100% - 200px)",
            mixBlendMode: "multiply",
            filter: "contrast(1.2) brightness(1.1)",
            pointerEvents: "none", // Disable all mouse interactions
          }}
          onLoad={handleIframeLoad}
        />
        {/* Green overlay to replace white background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#10201C",
            mixBlendMode: "screen",
            opacity: 0.7,
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Invisible overlay to block head interactions */}
        <div
          style={{
            position: "absolute",
            top: "250px", // Adjust based on robot head position
            left: "50%",
            transform: "translateX(-50%)",
            width: "150px", // Approximate head width
            height: "150px", // Approximate head height
            pointerEvents: "auto", // Block mouse interactions for this area
            zIndex: 3,
            backgroundColor: "transparent", // Invisible but blocks interactions
            cursor: "default",
          }}
        />
      </div>



      {/* Vignette overlays */}
      {outerVignette && <div style={outerVignetteStyle}></div>}
      {centerVignette && <div style={centerVignetteStyle}></div>}

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default LetterGlitch;
