import { useRef, useEffect, useState } from "react";

interface LetterGlitchProps {
  glitchColors?: string[];
  className?: string;
  glitchSpeed?: number;
  centerVignette?: boolean;
  outerVignette?: boolean;
  smooth?: boolean;
}

const LetterGlitch = ({
  glitchColors = ["#2b4539", "#61dca3", "#61b3dc"],
  className = "",
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
}: LetterGlitchProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [robotLoaded, setRobotLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  const handleIframeLoad = () => {
    setRobotLoaded(true);
    // Play audio once when robot animation fully finishes (longer delay)
    if (audioRef.current && !hasPlayedOnce) {
      // Longer delay to ensure animation sequence completes
      setTimeout(() => {
        audioRef.current?.play().then(() => {
          setIsPlaying(true);
          setHasPlayedOnce(true);
        }).catch(() => {
          // If autoplay fails, user can still click button
          console.log("Autoplay prevented - user can click audio button");
        });
      }, 4000); // Increased from 1000ms to 4000ms for animation completion
    }
  };

  const handleAudioClick = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(console.error);
        setIsPlaying(true);
      }
    }
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
    backgroundColor: "rgba(64, 255, 170, 0.1)",
    border: "2px solid rgba(64, 255, 170, 0.3)",
    color: "#40FFAA",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    zIndex: 2,
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
  };

  return (
    <div style={containerStyle} className={className}>
      {/* Green background layer */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#10201C",
        zIndex: -1,
      }} />

      {/* Robot Animation with background replacement */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "#10201C",
        zIndex: 0,
      }}>
        <iframe
          src="https://my.spline.design/nexbotrobotcharacterconcept-w4s24MAIQS4z8NrM3EJCw0RZ/"
          frameBorder="0"
          width="100%"
          height="100%"
          style={{
            ...iframeStyle,
            mixBlendMode: "multiply",
            filter: "contrast(1.2) brightness(1.1)",
          }}
          onLoad={handleIframeLoad}
        />
        {/* Green overlay to replace white background */}
        <div style={{
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
        }} />
      </div>

      {/* Audio for robot voice */}
      <audio
        ref={audioRef}
        preload="auto"
        onEnded={() => setIsPlaying(false)}
      >
        <source
          src="https://cdn.builder.io/o/assets%2F41e98af6d24e4f21a2289029be813332%2F8e84c7ac708b412881d0ea909addd048?alt=media&token=8e2a75df-3e11-4f03-9345-e6d6a9e37bdf&apiKey=41e98af6d24e4f21a2289029be813332"
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>

      {/* Audio Control Button */}
      {robotLoaded && (
        <button
          onClick={handleAudioClick}
          style={audioButtonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(64, 255, 170, 0.2)";
            e.currentTarget.style.borderColor = "rgba(64, 255, 170, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(64, 255, 170, 0.1)";
            e.currentTarget.style.borderColor = "rgba(64, 255, 170, 0.3)";
          }}
          title={isPlaying ? "Stop robot voice" : "Play robot voice"}
        >
          {isPlaying ? "⏸" : "🔊"}
        </button>
      )}

      {/* Vignette overlays */}
      {outerVignette && <div style={outerVignetteStyle}></div>}
      {centerVignette && <div style={centerVignetteStyle}></div>}
    </div>
  );
};

export default LetterGlitch;
