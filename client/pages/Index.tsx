import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GradientText from "@/components/ui/GradientText";
import Orb from "@/components/ui/Orb";
import Aurora from "@/components/ui/Aurora";
import LetterGlitch from "@/components/LetterGlitch";

export default function Index() {
  const navigate = useNavigate();
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [robotAnimationFinished, setRobotAnimationFinished] = useState(false);

  useEffect(() => {
    // Reset states when component mounts (including when returning from other pages)
    setAnimationPlayed(false);
    setRobotAnimationFinished(false);
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

      timeline.to(textElements, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });

      timeline.to(textElements, {
        textShadow: "0 0 20px #17B58F, 0 0 30px #17B58F, 0 0 40px #17B58F",
        duration: 1,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut",
      });
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
        backgroundColor: "#0a0f0d",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Interactive AI Website Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          backgroundColor: "#0a0f0d",
        }}
      >
        <iframe
          key="home-spline-animation"
          src="https://my.spline.design/interactiveaiwebsite-d8mT2b5DLHsgWMmgJ26aRFqj/"
          frameBorder="0"
          width="100%"
          height="100%"
          allow="accelerometer; autoplay; camera; clipboard-write; encrypted-media; fullscreen; gyroscope; magnetometer; microphone; midi; payment; picture-in-picture; publickey-credentials-get; sync-xhr; usb; web-share; xr-spatial-tracking"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation"
          style={{
            border: "none",
            display: "block",
            width: "100%",
            height: "100%",
            pointerEvents: "auto",
          }}
          onLoad={() => setRobotAnimationFinished(true)}
        />
      </div>



      {/* Content Overlay */}
      <div
        id="content-overlay"
        style={{
          position: "absolute",
          top: "50%",
          left: "35%",
          transform: "translate(-50%, -50%)",
          textAlign: "left",
          color: "white",
          pointerEvents: "none",
          zIndex: 3,
          background: "transparent",
          padding: "40px 60px",
        }}
      >
        <GradientText
          colors={["#1a3d2e", "#2d6b4f", "#61dca3", "#2d6b4f", "#1a3d2e"]}
          animationSpeed={6}
          className="font-black"
          style={{ fontWeight: "900" }}
        >
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "3rem",
              fontWeight: "950",
              margin: 0,
              letterSpacing: "2px",
              lineHeight: 1.1,
              display: "block",
              width: "100%",
            }}
          >
            Semantic Foresight<br />Intelligence
          </h1>
        </GradientText>

        <div style={{ display: "block", width: "100%", marginTop: "1rem" }}>
          <GradientText
            colors={["#61dca3", "#7dd4ba", "#61b3dc", "#7dd4ba", "#61dca3"]}
            animationSpeed={8}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.1rem",
                fontWeight: "700",
                margin: "0 0 1.5rem 0",
                letterSpacing: "0.5px",
                lineHeight: 1.4,
                display: "block",
              }}
            >
              Truth is not fixed.<br />It is rendered by the logic that observes it.
            </p>
          </GradientText>
        </div>

        {/* Buttons Container - Inside content overlay */}
        <div
          id="buttons-container"
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "flex-start",
            pointerEvents: "auto",
            marginTop: "0.2rem",
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
              border: "2px solid #61dca3",
              borderRadius: "25px",
              fontSize: "16px",
              fontWeight: "700",
              letterSpacing: "1px",
              cursor: "pointer",
              fontFamily: "var(--font-ui)",
              textTransform: "uppercase",
              transition: "all 0.3s ease",
              pointerEvents: "auto",
              padding: "0",
              color: "#61dca3",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(97, 220, 163, 0.1)";
              e.target.style.borderColor = "#61dca3";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.borderColor = "#61dca3";
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
            id="connect-button"
            onClick={(e) => {
              console.log(
                "Connect button clicked - navigating to stakeholders section",
              );
              e.preventDefault();
              e.stopPropagation();
              navigate("/vigilum#stakeholders");
            }}
            style={{
              width: "180px",
              height: "50px",
              background: "transparent",
              border: "2px solid #61b3dc",
              borderRadius: "25px",
              fontSize: "16px",
              fontWeight: "700",
              letterSpacing: "1px",
              cursor: "pointer",
              fontFamily: "var(--font-ui)",
              textTransform: "uppercase",
              transition: "all 0.3s ease",
              pointerEvents: "auto",
              padding: "0",
              color: "#61b3dc",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(97, 179, 220, 0.1)";
              e.target.style.borderColor = "#61b3dc";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.borderColor = "#61b3dc";
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
            CONNECT
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
