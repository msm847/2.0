import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GradientText from "@/components/ui/GradientText";
import Orb from "@/components/ui/Orb";
import Aurora from "@/components/ui/Aurora";
import LetterGlitch from "@/components/LetterGlitch";

export default function Index() {
  const navigate = useNavigate();
  const [animationPlayed, setAnimationPlayed] = useState(false);

  useEffect(() => {
    setupAnimationTrigger();
  }, []);

  const setupAnimationTrigger = () => {
    const triggerAnimation = () => {
      if (!animationPlayed) {
        setAnimationPlayed(true);
        playParticleToButtonAnimation();
      }
    };

    setTimeout(triggerAnimation, 1000);
  };

  const playParticleToButtonAnimation = async () => {
    try {
      const text = "ENTER SIMULATION";
      const textElements: HTMLElement[] = [];

      // Create timeline for animation
      const timeline = { to: () => {} }; // Simplified for syntax fix

      timeline.to(
        textElements,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
      );

      timeline.to(
        textElements,
        {
          textShadow: "0 0 20px #17B58F, 0 0 30px #17B58F, 0 0 40px #17B58F",
          duration: 1,
          yoyo: true,
          repeat: -1,
          ease: "power2.inOut",
        },
      );
    } catch (error) {
      console.error("Error in particle animation:", error);
    }
  };

  const handleButtonClick = () => {
    console.log("Button clicked - navigating to /vigilum");
    navigate("/vigilum");
  };

  return (
    <div
      id="hero-section"
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#10201C",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* LetterGlitch Background */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}>
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
      </div>

      {/* VIGILUM.AI Logo - Top Left */}
      <div
        id="logo-container"
        style={{
          position: "absolute",
          top: "24px",
          left: "24px",
          fontSize: "1.5rem",
          fontWeight: "700",
          color: "#40FFAA",
          zIndex: 3,
          pointerEvents: "none",
          fontFamily: "var(--font-display)",
          letterSpacing: "1px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "1.5rem",
            fontWeight: "700",
          }}
        >
          VIGILUM.AI
        </h1>
      </div>

      {/* Content Overlay */}
      <div
        id="content-overlay"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
          pointerEvents: "none",
          zIndex: 3,
          background: "rgba(16, 32, 28, 0.85)",
          padding: "60px 80px",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <GradientText
          colors={["#E5F3ED", "#9DE6C6", "#40FFAA", "#9DE6C6", "#E5F3ED"]}
          animationSpeed={6}
          className="font-black"
          style={{ fontWeight: "900" }}
        >
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "3rem",
              fontWeight: "900",
              margin: 0,
              letterSpacing: "2px",
              whiteSpace: "nowrap",
              textShadow: `
                0 0 30px rgba(64, 255, 170, 0.8),
                0 0 60px rgba(64, 255, 170, 0.4),
                0 2px 4px rgba(0, 0, 0, 0.8)
              `,
              filter: "brightness(1.2) contrast(1.1)",
            }}
          >
            Semantic Foresight Intelligence
          </h1>
        </GradientText>
        <GradientText
          colors={["#E5F3ED", "#9DE6C6", "#40FFAA", "#9DE6C6", "#E5F3ED"]}
          animationSpeed={8}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.1rem",
              fontWeight: "600",
              margin: "1rem 0 1.5rem 0",
              letterSpacing: "0.5px",
              lineHeight: 1.4,
              textShadow: `
                0 0 20px rgba(64, 255, 170, 0.6),
                0 0 40px rgba(64, 255, 170, 0.3),
                0 1px 2px rgba(0, 0, 0, 0.8)
              `,
              filter: "brightness(1.1) contrast(1.05)",
            }}
          >
            Truth is not fixed. It is rendered by the logic that observes it.
          </p>
        </GradientText>

        {/* Buttons Container - Inside content overlay */}
        <div
          id="buttons-container"
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            pointerEvents: "auto",
            marginTop: "1rem",
          }}
        >
          {/* Enter Simulation Button */}
          <button
            id="enter-button"
            onClick={(e) => {
              console.log("Button click event triggered");
              e.preventDefault();
              e.stopPropagation();
              handleButtonClick();
            }}
            style={{
              width: "220px",
              height: "50px",
              background: "transparent",
              border: "2px solid rgba(97, 220, 163, 0.6)",
              borderRadius: "25px",
              fontSize: "16px",
              fontWeight: "500",
              letterSpacing: "1px",
              cursor: "pointer",
              fontFamily: "var(--font-ui)",
              textTransform: "uppercase",
              transition: "all 0.3s ease",
              pointerEvents: "auto",
              padding: "0",
              color: "#61dca3",
              textShadow: "0 0 10px rgba(97, 220, 163, 0.5)",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(97, 220, 163, 0.1)";
              e.target.style.borderColor = "rgba(97, 220, 163, 0.8)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.borderColor = "rgba(97, 220, 163, 0.6)";
            }}
          >
            ENTER SIMULATION
          </button>

          {/* Team Button */}
          <button
            id="team-button"
            onClick={(e) => {
              console.log("Team button clicked - navigating to team page");
              e.preventDefault();
              e.stopPropagation();
              navigate("/vigilum#team");
            }}
            style={{
              width: "180px",
              height: "50px",
              background: "transparent",
              border: "2px solid rgba(97, 179, 220, 0.6)",
              borderRadius: "25px",
              color: "#61b3dc",
              fontSize: "16px",
              fontWeight: "500",
              letterSpacing: "1px",
              cursor: "pointer",
              fontFamily: "var(--font-ui)",
              textTransform: "uppercase",
              transition: "all 0.3s ease",
              pointerEvents: "auto",
              padding: "0",
              textShadow: "0 0 10px rgba(97, 179, 220, 0.5)",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(97, 179, 220, 0.1)";
              e.target.style.borderColor = "rgba(97, 179, 220, 0.8)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.borderColor = "rgba(97, 179, 220, 0.6)";
            }}
          >
            TEAM
          </button>
        </div>
      </div>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

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
