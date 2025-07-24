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

  useEffect(() => {
    // Play the robot voice when component mounts (robot appears)
    const timer = setTimeout(() => {
      setRobotLoaded(true);
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().catch(console.error);
        setIsPlaying(true);
      }
    }, 2000); // Delay to let robot animation load

    return () => clearTimeout(timer);
  }, [isPlaying]);

  const handleIframeLoad = () => {
    setRobotLoaded(true);
  };

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "#10201C",
    overflow: "hidden",
  };

  const iframeStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    border: "none",
    display: "block",
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

  return (
    <div style={containerStyle} className={className}>
      {/* Robot Animation */}
      <iframe
        src="https://my.spline.design/nexbotrobotcharacterconcept-w4s24MAIQS4z8NrM3EJCw0RZ/"
        style={iframeStyle}
        onLoad={handleIframeLoad}
        title="Robot Animation"
      />
      
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

      {/* Vignette overlays */}
      {outerVignette && <div style={outerVignetteStyle}></div>}
      {centerVignette && <div style={centerVignetteStyle}></div>}
    </div>
  );
};

export default LetterGlitch;
