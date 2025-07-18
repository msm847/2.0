import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GradientText from "@/components/ui/GradientText";
import Orb from "@/components/ui/Orb";

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
        background:
          "linear-gradient(180deg, #25443B 0%, #1A2F29 50%, #10201C 100%)",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Orb Background */}
      <div
        id="orb-background"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          height: "400px",
          zIndex: 5,
          opacity: 0.6,
          pointerEvents: "auto",
        }}
      >
        <Orb
          hue={160}
          hoverIntensity={0.2}
          rotateOnHover={true}
          forceHoverState={false}
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
        {/* VIGILUM.AI Logo - Top Left */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "50px",
            zIndex: 3,
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "1.1rem",
              fontWeight: "700",
              margin: 0,
              letterSpacing: "1px",
              color: "#F8F6F4",
              textShadow: `
                0 1px 1px rgba(0, 0, 0, 0.2),
                0 2px 2px rgba(0, 0, 0, 0.15),
                0 3px 4px rgba(0, 0, 0, 0.12),
                0 4px 6px rgba(0, 0, 0, 0.08),
                0 6px 12px rgba(0, 0, 0, 0.05)
              `,
              transform: "translateZ(0)",
            }}
          >
            VIGILUM.AI
          </h1>
        </div>
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
      </div>

      {/* Button Container - Static Button - Outside content overlay */}
      <div
        id="button-container"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "220px",
          height: "50px",
          zIndex: 10,
          pointerEvents: "auto",
        }}
      >
        {/* 3D Glass Mirror Button */}
        <button
          id="enter-button"
          onClick={(e) => {
            console.log("Button click event triggered");
            e.preventDefault();
            e.stopPropagation();
            handleButtonClick();
          }}
          style={{
            width: "100%",
            height: "100%",
            background: `
              linear-gradient(135deg,
                rgba(255, 255, 255, 0.02) 0%,
                rgba(255, 255, 255, 0.01) 25%,
                rgba(255, 255, 255, 0.005) 50%,
                rgba(255, 255, 255, 0.01) 75%,
                rgba(255, 255, 255, 0.02) 100%)
            `,
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            borderLeft: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "25px",
            color: "rgba(255, 255, 255, 0.9)",
            fontSize: "16px",
            fontWeight: "500",
            letterSpacing: "1.5px",
            cursor: "pointer",
            fontFamily: "var(--font-ui)",
            textTransform: "uppercase",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            backdropFilter: "blur(40px) saturate(1.8)",
            WebkitBackdropFilter: "blur(40px) saturate(1.8)",
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.1),
              0 2px 8px rgba(0, 0, 0, 0.05),
              inset 0 1px 0 rgba(255, 255, 255, 0.1),
              inset 0 0 0 1px rgba(255, 255, 255, 0.05),
              inset 0 -1px 0 rgba(0, 0, 0, 0.05)
            `,
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
            position: "relative",
            overflow: "hidden",
            pointerEvents: "auto",
            zIndex: 1000,
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            e.currentTarget.style.background = `
              radial-gradient(circle at ${x}% ${y}%,
                rgba(255, 255, 255, 0.08) 0%,
                rgba(255, 255, 255, 0.03) 30%,
                rgba(255, 255, 255, 0.01) 60%,
                rgba(255, 255, 255, 0.005) 100%),
              linear-gradient(135deg,
                rgba(255, 255, 255, 0.02) 0%,
                rgba(255, 255, 255, 0.005) 50%,
                rgba(255, 255, 255, 0.02) 100%)
            `;

            e.currentTarget.style.transform = `
              perspective(1000px)
              rotateX(${(y - 50) * 0.1}deg)
              rotateY(${(x - 50) * 0.1}deg)
              translateZ(2px)
            `;

            e.currentTarget.style.boxShadow = `
              0 12px 40px rgba(0, 0, 0, 0.15),
              0 4px 16px rgba(0, 0, 0, 0.08),
              inset 0 1px 0 rgba(255, 255, 255, 0.15),
              inset 0 0 0 1px rgba(255, 255, 255, 0.08),
              inset 0 -1px 0 rgba(0, 0, 0, 0.08),
              0 0 20px rgba(255, 255, 255, 0.1)
            `;
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderTop =
              "1px solid rgba(255, 255, 255, 0.3)";
            e.currentTarget.style.borderLeft =
              "1px solid rgba(255, 255, 255, 0.25)";
            e.currentTarget.style.color = "rgba(255, 255, 255, 1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = `
              linear-gradient(135deg,
                rgba(255, 255, 255, 0.02) 0%,
                rgba(255, 255, 255, 0.01) 25%,
                rgba(255, 255, 255, 0.005) 50%,
                rgba(255, 255, 255, 0.01) 75%,
                rgba(255, 255, 255, 0.02) 100%)
            `;
            e.currentTarget.style.transform =
              "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
            e.currentTarget.style.boxShadow = `
              0 8px 32px rgba(0, 0, 0, 0.1),
              0 2px 8px rgba(0, 0, 0, 0.05),
              inset 0 1px 0 rgba(255, 255, 255, 0.1),
              inset 0 0 0 1px rgba(255, 255, 255, 0.05),
              inset 0 -1px 0 rgba(0, 0, 0, 0.05)
            `;
            e.currentTarget.style.borderTop =
              "1px solid rgba(255, 255, 255, 0.2)";
            e.currentTarget.style.borderLeft =
              "1px solid rgba(255, 255, 255, 0.15)";
            e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform =
              "perspective(1000px) scale(0.98) translateZ(-2px)";
          }}
          onMouseUp={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            e.currentTarget.style.transform = `
              perspective(1000px)
              rotateX(${(y - 50) * 0.1}deg)
              rotateY(${(x - 50) * 0.1}deg)
              translateZ(2px)
            `;
          }}
        >
          ENTER SIMULATION
        </button>
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
