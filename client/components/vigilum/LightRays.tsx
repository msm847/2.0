import { useRef, useEffect, useState } from "react";
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
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isVisible, setIsVisible] = useState(false);

  // Convert hex color to rgb values for gradients
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 255, g: 255, b: 255 };
  };

  const rgb = hexToRgb(raysColor);
  const colorString = `${rgb.r}, ${rgb.g}, ${rgb.b}`;

  // Handle mouse movement for interactive rays
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current || !followMouse) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePos({ x, y });
    };

    if (followMouse) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [followMouse]);

  // Intersection observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Generate ray positions based on origin
  const getRayStyles = () => {
    const rays = [];
    const numRays = 12;
    const baseOpacity = 0.6;
    
    for (let i = 0; i < numRays; i++) {
      const angle = (i / numRays) * 360;
      const delay = i * 0.2;
      const opacity = baseOpacity * (0.5 + Math.random() * 0.5);
      
      rays.push({
        background: `linear-gradient(${angle}deg, 
          rgba(${colorString}, ${opacity}) 0%, 
          rgba(${colorString}, ${opacity * 0.7}) 20%, 
          rgba(${colorString}, ${opacity * 0.3}) 40%, 
          transparent 70%)`,
        transform: `rotate(${angle}deg) scaleY(${rayLength})`,
        animationDelay: `${delay}s`,
        animationDuration: `${3 / raysSpeed}s`,
      });
    }
    
    return rays;
  };

  const rayStyles = getRayStyles();

  return (
    <div
      ref={containerRef}
      className={`light-rays-container ${className}`.trim()}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "hidden",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    >
      {/* Central glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "400px",
          height: "400px",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, rgba(${colorString}, 0.4) 0%, rgba(${colorString}, 0.2) 30%, transparent 70%)`,
          borderRadius: "50%",
          animation: pulsating ? `lightPulse ${2 / raysSpeed}s ease-in-out infinite alternate` : "none",
        }}
      />

      {/* Animated rays */}
      {rayStyles.map((rayStyle, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "2px",
            height: "50%",
            transformOrigin: "0 0",
            opacity: 0.8,
            animation: `rayFlicker ${3 / raysSpeed}s ease-in-out infinite`,
            ...rayStyle,
          }}
        />
      ))}

      {/* Additional light beams for depth */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `conic-gradient(from 0deg, 
            transparent 0deg, 
            rgba(${colorString}, 0.15) 45deg, 
            transparent 90deg, 
            rgba(${colorString}, 0.1) 135deg, 
            transparent 180deg,
            rgba(${colorString}, 0.2) 225deg,
            transparent 270deg,
            rgba(${colorString}, 0.1) 315deg,
            transparent 360deg)`,
          animation: `slowRotate ${10 / raysSpeed}s linear infinite`,
          transformOrigin: "center center",
        }}
      />

      {/* Mouse-influenced overlay if enabled */}
      {followMouse && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, 
              rgba(${colorString}, ${0.3 * mouseInfluence}) 0%, 
              rgba(${colorString}, ${0.1 * mouseInfluence}) 30%, 
              transparent 60%)`,
            transition: "background 0.3s ease",
          }}
        />
      )}

      {/* CSS Keyframes */}
      <style>{`
        @keyframes rayFlicker {
          0%, 100% { opacity: 0.6; transform: scaleY(${rayLength}) scaleX(1); }
          50% { opacity: 0.9; transform: scaleY(${rayLength * 1.2}) scaleX(1.5); }
        }
        
        @keyframes lightPulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
          100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.7; }
        }
        
        @keyframes slowRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LightRays;
