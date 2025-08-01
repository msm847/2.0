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
  const [splineLoaded, setSplineLoaded] = useState(false);

  useEffect(() => {
    // Reset states for clean navigation
    setSplineLoaded(false);
    setRobotAnimationFinished(false);
    setAnimationPlayed(false);

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
        }}
      >
        <iframe
          src="https://my.spline.design/interactiveaiwebsite-d8mT2b5DLHsgWMmgJ26aRFqj/"
          frameBorder="0"
          width="100%"
          height="100%"
          onLoad={() => {
            // Add smooth timing for better UX
            setTimeout(() => {
              setSplineLoaded(true);
              setTimeout(() => {
                setRobotAnimationFinished(true);
              }, 300);
            }, 200);
          }}
        />
      </div>

      {/* Top Navigation Buttons */}
      {splineLoaded && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "48px",
            zIndex: 4,
          }}
        >
          {["About", "Journal", "Whitepaper"].map((label) => (
            <button
              key={label}
              className="relative bg-transparent border-none cursor-pointer text-lg font-light tracking-wide transition-all duration-300 group"
              style={{
                fontFamily: "var(--font-display)",
                padding: "12px 0",
                background: "none",
              }}
            >
              <GradientText
                colors={["#61dca3", "#7dd4ba", "#61b3dc", "#7dd4ba", "#61dca3"]}
                animationSpeed={8}
                className="font-light"
                style={{ fontWeight: "300", fontSize: "18px", letterSpacing: "0.05em" }}
              >
                {label}
              </GradientText>
              {/* Hover underline */}
              <span
                className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                style={{
                  backgroundColor: "#61dca3",
                }}
              />
            </button>
          ))}
        </div>
      )}



      {/* Content Overlay - Only show when Spline is loaded */}
      {splineLoaded && (
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
              Semantic Foresight
              <br />
              Intelligence
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
                Truth is not fixed.
                <br />
                It is rendered by the logic that observes it.
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
                borderRadius: "8px",
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
                borderRadius: "8px",
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
      )}

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

      {/* Social Media Handles - Bottom Right */}
      {splineLoaded && (
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "40px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            zIndex: 4,
            alignItems: "flex-start",
          }}
        >
          {[
            {
              platform: "Instagram",
              handle: "@vigilum.ai",
              url: "#",
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              )
            },
            {
              platform: "LinkedIn",
              handle: "@vigilum.ai",
              url: "#",
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              )
            },
            {
              platform: "X",
              handle: "@vigilum.ai",
              url: "#",
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                </svg>
              )
            },
          ].map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 transition-all duration-300"
              style={{
                textDecoration: "none",
                pointerEvents: "auto",
              }}
            >
              <div
                className="transition-colors duration-300"
                style={{
                  color: "#61dca3",
                  opacity: "0.7",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.color = "#7dd4ba";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "0.7";
                  e.currentTarget.style.color = "#61dca3";
                }}
              >
                {social.icon}
              </div>
              <span
                className="text-sm font-light tracking-wide transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "#61dca3",
                  opacity: "0.7",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.color = "#7dd4ba";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "0.7";
                  e.currentTarget.style.color = "#61dca3";
                }}
              >
                {social.handle}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
