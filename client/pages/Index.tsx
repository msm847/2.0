import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GradientText from "@/components/ui/GradientText";

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
          "linear-gradient(180deg, #25443B 0%, #1A2F29 50%, #10201C 100%)",
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
          <GradientText
            colors={["#9DE6C6", "#17B58F", "#40ffaa", "#17B58F", "#9DE6C6"]}
            animationSpeed={6}
          >
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "3rem",
                fontWeight: "bold",
                margin: 0,
                letterSpacing: "2px",
              }}
            >
              Observe. Compute. Expose.
            </h1>
          </GradientText>
          <GradientText
            colors={["#B8D0C9", "#9DE6C6", "#17B58F", "#9DE6C6", "#B8D0C9"]}
            animationSpeed={8}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.1rem",
                fontWeight: "400",
                margin: "1rem 0 0 0",
                letterSpacing: "0.5px",
                lineHeight: 1.4,
              }}
            >
              Truth is not fixed. It is rendered by the logic that observes it.
            </p>
          </GradientText>
        </div>

        {/* Button Container - Static Button */}
        <div
          id="button-container"
          style={{
            position: "absolute",
            top: "calc(50% + 220px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: "220px",
            height: "50px",
          }}
        >
          {/* Static Button */}
          <button
            id="enter-button"
            onClick={handleButtonClick}
            style={{
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(135deg, rgba(23, 181, 143, 0.8) 0%, rgba(23, 181, 143, 0.6) 100%)",
              border: "1px solid rgba(23, 181, 143, 0.3)",
              borderRadius: "25px",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "600",
              letterSpacing: "1px",
              cursor: "pointer",
              fontFamily: "var(--font-ui)",
              textTransform: "uppercase",
              transition: "all 0.2s ease",
              backdropFilter: "blur(20px)",
              boxShadow:
                "0 4px 20px rgba(23, 181, 143, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(23, 181, 143, 0.9) 0%, rgba(23, 181, 143, 0.7) 100%)";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 6px 25px rgba(23, 181, 143, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(23, 181, 143, 0.8) 0%, rgba(23, 181, 143, 0.6) 100%)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 20px rgba(23, 181, 143, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "translateY(1px)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
          >
            ENTER SIMULATION
          </button>
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
