import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  const [animationPlayed, setAnimationPlayed] = useState(false);

  useEffect(() => {
    // Set up animation trigger after component mounts
    setupAnimationTrigger();
  }, []);

  const setupAnimationTrigger = () => {
    const triggerAnimation = () => {
      if (!animationPlayed) {
        setAnimationPlayed(true);
        playParticleToButtonAnimation();
      }
    };

    // Trigger after 1 second
    setTimeout(triggerAnimation, 1000);
  };

  const playParticleToButtonAnimation = async () => {
    try {
      // Import GSAP dynamically
      const gsap = await import("https://unpkg.com/gsap@3.12.5/index.js").then(
        (module) => module.gsap,
      );

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
          color: #17B58F;
          font-size: 18px;
          font-weight: bold;
          letter-spacing: 2px;
          opacity: 0;
          transform: scale(0);
          text-shadow: 0 0 10px #17B58F;
          font-family: var(--font-ui);
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
        0.5,
      );

      // Add pulsing effect
      timeline.to(
        textElements,
        {
          textShadow: "0 0 20px #17B58F, 0 0 30px #17B58F, 0 0 40px #17B58F",
          duration: 1,
          yoyo: true,
          repeat: -1,
          ease: "power2.inOut",
        },
        1,
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
      {/* Spline Brain Animation Background - Using iframe (working approach) */}
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
        <iframe
          src="https://my.spline.design/particleaibrain-adL2AYtD8H0GnWtw2HEEOGVO/?controls=false&logo=false&branding=false"
          frameBorder="0"
          width="100%"
          height="100%"
          style={{
            border: "none",
            background: "transparent",
            display: "block",
          }}
          title="Vigilum AI Brain Animation"
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
        {/* Main Text - Moved to top */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            color: "white",
            pointerEvents: "none",
            zIndex: 3,
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "3rem",
              fontWeight: "bold",
              margin: 0,
              letterSpacing: "2px",
              color: "#9DE6C6",
              textShadow: "0 0 20px rgba(157, 230, 198, 0.3)",
            }}
          >
            Observe. Compute. Expose.
          </h1>
        </div>

        {/* Button Container - Moved 150px lower */}
        <div
          id="button-container"
          style={{
            position: "absolute",
            top: "calc(50% + 175px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: "300px",
            height: "60px",
          }}
        >
          {/* Clickable Button */}
          <button
            id="enter-button"
            onClick={handleButtonClick}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "transparent",
              border: "none",
              color: "transparent",
              fontSize: "18px",
              fontWeight: "bold",
              letterSpacing: "2px",
              cursor: "pointer",
              pointerEvents: "auto",
              zIndex: 10,
              opacity: 0,
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
