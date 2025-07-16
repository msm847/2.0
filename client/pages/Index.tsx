import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const splineAppRef = useRef<any>(null);
  const particlesRef = useRef<any[]>([]);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Dynamically import Spline runtime
      const { Application } = await import(
        "https://unpkg.com/@splinetool/runtime@1.0.62/build/runtime.js"
      );

      if (!canvasRef.current) return;

      // Create Spline application
      splineAppRef.current = new Application(canvasRef.current);

      // Load the scene
      await splineAppRef.current.load(
        "https://my.spline.design/particleaibrain-adL2AYtD8H0GnWtw2HEEOGVO/scene.splinecode",
      );

      setIsLoading(false);

      // Find brain particles
      const brainParticles =
        splineAppRef.current.findObjectByName("BrainParticles");
      if (brainParticles && brainParticles.emitter) {
        particlesRef.current = brainParticles.emitter.particles || [];
      }

      // Set up animation trigger
      setupAnimationTrigger();
    } catch (error) {
      console.error("Error loading Spline scene:", error);
      setIsLoading(false);
    }
  };

  const setupAnimationTrigger = () => {
    const triggerAnimation = () => {
      if (!animationPlayed) {
        setAnimationPlayed(true);
        playParticleToButtonAnimation();
      }
    };

    // Trigger after 3 seconds
    setTimeout(triggerAnimation, 3000);
  };

  const playParticleToButtonAnimation = async () => {
    try {
      const { gsap } = await import("https://unpkg.com/gsap@3.12.5/index.js");

      const particleTextContainer = document.getElementById(
        "particle-text-container",
      );
      if (!particleTextContainer) return;

      const text = "ENTER SIMULATION";
      const textElements: HTMLElement[] = [];

      // Clear existing text
      particleTextContainer.innerHTML = "";

      // Create letter elements
      text.split("").forEach((letter, index) => {
        const span = document.createElement("span");
        span.textContent = letter === " " ? "\u00A0" : letter;
        span.style.cssText = `
          position: absolute;
          color: #00ffff;
          font-size: 18px;
          font-weight: bold;
          letter-spacing: 2px;
          opacity: 0;
          transform: scale(0);
          text-shadow: 0 0 10px #00ffff;
        `;
        particleTextContainer.appendChild(span);
        textElements.push(span);
      });

      // Position letters
      const containerWidth = 300;
      const letterSpacing = containerWidth / text.length;

      textElements.forEach((element, index) => {
        const x =
          index * letterSpacing - containerWidth / 2 + letterSpacing / 2;
        element.style.left = `calc(50% + ${x}px)`;
        element.style.top = "50%";
        element.style.transform = "translate(-50%, -50%) scale(0)";
      });

      // Create timeline
      const timeline = gsap.timeline();

      // Animate particles if available
      if (particlesRef.current.length > 0) {
        const selectedParticles = particlesRef.current.filter(
          (_, index) => index % 2 === 0,
        );

        selectedParticles.forEach((particle) => {
          if (particle.position) {
            timeline.to(
              particle.position,
              {
                x: (Math.random() - 0.5) * 2,
                y: -2,
                z: 0,
                duration: 4,
                ease: "power2.inOut",
              },
              0,
            );
          }
        });
      }

      // Animate text appearance
      timeline.to(
        textElements,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        3.5,
      );

      // Add pulsing effect
      timeline.to(
        textElements,
        {
          textShadow: "0 0 20px #00ffff, 0 0 30px #00ffff, 0 0 40px #00ffff",
          duration: 0.5,
          yoyo: true,
          repeat: -1,
          ease: "power2.inOut",
        },
        4,
      );
    } catch (error) {
      console.error("Error in particle animation:", error);
    }
  };

  const handleButtonClick = () => {
    navigate("/vigilum#engines");
  };

  return (
    <div
      id="hero-section"
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Spline Canvas Container */}
      <div
        id="spline-container"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      >
        <canvas
          ref={canvasRef}
          id="canvas3d"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            background: "transparent",
          }}
        />
      </div>

      {/* Content Overlay */}
      <div
        id="content-overlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 2,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Main Text */}
        <div
          style={{
            textAlign: "center",
            color: "white",
            marginBottom: "2rem",
            pointerEvents: "none",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "3rem",
              fontWeight: "bold",
              margin: "0 0 1rem 0",
              letterSpacing: "2px",
              color: "#9DE6C6",
              textShadow: "0 0 20px rgba(157, 230, 198, 0.3)",
            }}
          >
            Observe. Compute. Expose.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.2rem",
              opacity: 0.8,
              margin: 0,
              color: "#B8D0C9",
            }}
          >
            Vigilum AI Corruption Detection System
          </p>
        </div>

        {/* Button Container */}
        <div
          id="button-container"
          style={{
            position: "relative",
            width: "300px",
            height: "60px",
            marginTop: "3rem",
          }}
        >
          {/* Clickable Button */}
          <button
            id="enter-button"
            onClick={handleButtonClick}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 0 20px rgba(255, 255, 255, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "0.7";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "transparent",
              border: "2px solid rgba(255,255,255,0.3)",
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
              letterSpacing: "2px",
              cursor: "pointer",
              pointerEvents: "auto",
              zIndex: 10,
              opacity: 0.7,
              transition: "all 0.3s ease",
              fontFamily: "var(--font-ui)",
              textTransform: "uppercase",
            }}
          >
            ENTER SIMULATION
          </button>

          {/* Particle Text Container */}
          <div
            id="particle-text-container"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              zIndex: 5,
            }}
          />
        </div>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div
          id="loading-indicator"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "1.2rem",
            zIndex: 20,
            fontFamily: "var(--font-body)",
          }}
        >
          Loading 3D Scene...
        </div>
      )}

      <style>{`
        #enter-button:active {
          transform: scale(0.95) !important;
        }

        @media (max-width: 768px) {
          #content-overlay h1 {
            font-size: 2rem !important;
          }

          #button-container {
            width: 250px !important;
            height: 50px !important;
          }

          #enter-button {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
