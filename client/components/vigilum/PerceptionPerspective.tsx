import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import SplitText from "@/components/ui/SplitText";

import CorruptionDefinitions from "./CorruptionDefinitions";
import StructuralImpactMap from "./StructuralImpactMap";
import LightRays from "./LightRays";
import "./TrueFocus.css";

// Add CSS-in-JS for 3D pulsating button animations
const buttonPulseStyles = `
  @keyframes pulse-cultural {
    0%, 100% {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0px 0px 12px rgba(72, 110, 96, 0.6), 0px 4px 12px rgba(0, 0, 0, 0.2);
    }
    50% {
      transform: translateY(-4px) scale(1.04);
      box-shadow: 0px 0px 16px rgba(72, 110, 96, 0.8), 0px 6px 16px rgba(0, 0, 0, 0.3);
    }
  }



  @keyframes pulse-social {
    0%, 100% {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0px 0px 12px rgba(139, 92, 87, 0.6), 0px 4px 12px rgba(0, 0, 0, 0.2);
    }
    50% {
      transform: translateY(-4px) scale(1.04);
      box-shadow: 0px 0px 16px rgba(139, 92, 87, 0.8), 0px 6px 16px rgba(0, 0, 0, 0.3);
    }
  }
`;

// Inject the styles into the head
if (typeof document !== "undefined") {
  const existingStyle = document.getElementById("button-pulse-styles");
  if (!existingStyle) {
    const style = document.createElement("style");
    style.id = "button-pulse-styles";
    style.textContent = buttonPulseStyles;
    document.head.appendChild(style);
  }
}

const ClickableTrueFocus = ({
  sentence = "True Focus",
  manualMode = false,
  blurAmount = 5,
  borderColor = "green",
  glowColor = "rgba(0, 255, 0, 0.6)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  onWordClick = () => {},
  activeSection = null,
}) => {
  const words = sentence.split(" ");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState(null);
  const [hoveredWord, setHoveredWord] = useState(null);
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const [focusRect, setFocusRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  // Disable automatic animation - only respond to clicks
  useEffect(() => {
    // No automatic animation
  }, []);

  useEffect(() => {
    // Only show focus frame when a section is actively selected
    const activeWordIndex =
      activeSection === "perception"
        ? 0
        : activeSection === "perspective"
          ? 1
          : -1;

    if (
      activeWordIndex === -1 ||
      !wordRefs.current[activeWordIndex] ||
      !containerRef.current
    ) {
      setFocusRect({ x: 0, y: 0, width: 0, height: 0 });
      return;
    }

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect =
      wordRefs.current[activeWordIndex].getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
  }, [activeSection]);

  // Disable mouse hover effects - only respond to clicks
  const handleMouseEnter = (index) => {
    // No hover effects
  };

  const handleMouseLeave = () => {
    // No hover effects
  };

  const handleWordClick = (index) => {
    onWordClick(index);
  };

  return (
    <div className="focus-container" ref={containerRef}>
      {words.map((word, index) => {
        const isSelectedSection =
          (index === 0 && activeSection === "perception") ||
          (index === 1 && activeSection === "perspective");

        // If something is being hovered, only the hovered word should be unblurred
        // If nothing is hovered, use the original selected section logic
        const shouldBlur =
          hoveredWord !== null ? hoveredWord !== index : !isSelectedSection;

        return (
          <span
            key={index}
            ref={(el) => (wordRefs.current[index] = el)}
            className="focus-word manual"
            style={{
              filter: shouldBlur ? `blur(${blurAmount}px)` : "blur(0px)",
              "--border-color": borderColor,
              "--glow-color": glowColor,
              transition: `filter ${animationDuration}s ease, color 0.6s ease`,
              cursor: "pointer",
              opacity: isSelectedSection ? 1 : 0.7,
              color: isSelectedSection
                ? index === 0
                  ? "#E5F3ED"
                  : "#F1FBF5" // Use specific text colors for each word
                : "inherit",
              fontWeight: isSelectedSection ? "600" : "inherit", // Semibold when selected
            }}
            onClick={() => handleWordClick(index)}
            onMouseEnter={(e) => {
              setHoveredWord(index);
              if (!isSelectedSection) {
                e.target.style.transition =
                  "filter 0.15s ease, color 0.15s ease, text-shadow 0.15s ease";
                e.target.style.color = "#FFFFFF";
                e.target.style.textShadow = "0 0 20px rgba(255, 255, 255, 0.8)";
              }
            }}
            onMouseLeave={(e) => {
              setHoveredWord(null);
              if (!isSelectedSection) {
                e.target.style.transition =
                  "filter 0.2s ease, color 0.2s ease, text-shadow 0.2s ease";
                e.target.style.color = "inherit";
                e.target.style.textShadow = "none";
              }
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

const PerceptionPerspective = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(null); // Start with no section selected
  const [selectedButton, setSelectedButton] = useState("Cultural"); // Auto-select Cultural
  const [visitedSections, setVisitedSections] = useState(new Set(["Cultural"])); // Track visited sections
  const [showFloatingNav, setShowFloatingNav] = useState(false); // Control floating nav visibility
  const [isMainNavOpen, setIsMainNavOpen] = useState(false); // Track main navigation state
  const [globalLoss, setGlobalLoss] = useState(0);

  // Simple step navigation for perspective section
  const perspectiveSteps = ["Cultural", "Social"];
  const currentStepIndex = perspectiveSteps.indexOf(selectedButton);

  const canGoNext = currentStepIndex < perspectiveSteps.length - 1;
  const canGoPrevious = currentStepIndex > 0;

  const goToNextStep = () => {
    if (canGoNext) {
      setSelectedButton(perspectiveSteps[currentStepIndex + 1]);
    }
  };

  const goToPreviousStep = () => {
    if (canGoPrevious) {
      setSelectedButton(perspectiveSteps[currentStepIndex - 1]);
    }
  };

  // Ensure the instruction section always loads first
  useEffect(() => {
    setActiveSection(null);
  }, []);

  // Global corruption loss counter - always runs except on home page
  useEffect(() => {
    let interval;
    if (location.pathname !== "/") {
      // Run on all pages except home page
      interval = setInterval(() => {
        setGlobalLoss((prev) => prev + 114169);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [location.pathname]);

  // Reset to instruction section when navigating via hash to this section
  useEffect(() => {
    if (location.hash === "#perception-perspective") {
      setActiveSection(null);
    }
  }, [location.hash]);

  // Control floating navigation visibility
  useEffect(() => {
    // Always show floating nav when in perception-perspective section
    const timer = setTimeout(() => setShowFloatingNav(true), 200);
    return () => clearTimeout(timer);
  }, [activeSection, selectedButton]);

  // Hide floating nav when navigating away from this component
  useEffect(() => {
    // Hide when not on the vigilum page or when navigating to other sections
    if (
      !location.pathname.includes("vigilum") ||
      location.hash.includes("core-modules")
    ) {
      setShowFloatingNav(false);
    }
  }, [location]);

  // Hide floating nav when scrolling away from perception/perspective section
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const perceptionSection = document.getElementById(
            "perception-perspective",
          );
          if (perceptionSection) {
            const rect = perceptionSection.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Hide when scrolling towards corruption definitions (less than 60% visible)
            const visibleHeight =
              Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
            const sectionHeight = rect.height;
            const visibilityRatio = Math.max(0, visibleHeight / sectionHeight);

            // Check if section is in viewport
            const isInViewport = rect.top < viewportHeight && rect.bottom > 0;

            if (isInViewport && visibilityRatio > 0.3) {
              setShowFloatingNav(true);
            } else if (!isInViewport || visibilityRatio < 0.2) {
              setShowFloatingNav(false);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  // Monitor main navigation dropdown state
  useEffect(() => {
    const handleMouseEvents = () => {
      const navDropdown = document.querySelector(".group");
      if (navDropdown) {
        const handleMouseEnter = () => setIsMainNavOpen(true);
        const handleMouseLeave = () => setIsMainNavOpen(false);

        navDropdown.addEventListener("mouseenter", handleMouseEnter);
        navDropdown.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          navDropdown.removeEventListener("mouseenter", handleMouseEnter);
          navDropdown.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    };

    const cleanup = handleMouseEvents();
    return cleanup;
  }, []);

  // Theme configurations
  const themes = {
    perception: {
      backgroundColor: "linear-gradient(135deg, #04110D, #0B231A)", // Root perception with deepening gradient
      borderColor: "#E5F3ED", // Same as text color
      glowColor: "rgba(229, 243, 237, 0.6)", // Same as text color with opacity
      accentColor: "#34D399",
      textColor: "#E5F3ED", // Off-white green, sharp against black
    },
    perspective: {
      backgroundColor:
        "radial-gradient(ellipse at center, #2F4D3F 0%, #1D3328 100%)", // Semantic refraction with lateral shift
      borderColor: "#E5F3ED", // Same white as perception TrueFocus box
      glowColor: "rgba(229, 243, 237, 0.6)", // Same white with opacity as perception
      accentColor: "#60A5FA",
      textColor: "#EAE2CC", // Bone/linen contrast for structural tone
    },
    default: {
      backgroundColor: "#0D1510",
      borderColor: "#17B58F",
      glowColor: "rgba(23, 181, 143, 0.6)",
      accentColor: "#17B58F",
      textColor: "#F5F5F5",
    },
  };

  // Content for each section
  const content = {
    perception: {
      title: "PERCEPTION",
      description:
        "What is visible is not always actionable.\nPerception without structure leads nowhere.",
      details: [],
    },
    perspective: {
      title: "PERSPECTIVE",
      description:
        "What is legible is not always true.\nPerspective reflects the system, not the facts.",
      details: [],
    },
    default: {
      title: "PERCEPTION PERSPECTIVE",
      description:
        "Choose your approach: Click either PERCEPTION or PERSPECTIVE to explore how institutional structures reveal their vulnerabilities through different analytical frameworks.",
      details: [],
    },
  };

  const currentTheme = activeSection ? themes[activeSection] : themes.default;
  const currentContent = activeSection
    ? content[activeSection]
    : content.default;

  const handleWordClick = (wordIndex) => {
    if (wordIndex === 0) {
      // Only switch to perception, never back to null
      if (activeSection !== "perception") {
        setActiveSection("perception");
      }
    } else if (wordIndex === 1) {
      // Only switch to perspective, never back to null
      if (activeSection !== "perspective") {
        setActiveSection("perspective");
        setSelectedButton("Cultural");
      }
    }
  };

  return (
    <section
      id="perception-perspective"
      className="min-h-screen pt-20 pb-20 pl-12 pr-12"
      style={{
        background: currentTheme.backgroundColor,
        transition: "background 0.9s cubic-bezier(0.42, 0, 0.58, 1)",
        border: "none",
        outline: "none",
        boxShadow: "none",
        overflow: "hidden",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-16 mt-20">
          <motion.div
            className="mb-8 transition-colors duration-1000 font-semibold leading-tight"
            style={{
              fontFamily: "IBM Plex Sans, sans-serif",
              fontSize: "clamp(2.4rem, 3.4vw, 3rem)",
              color: currentTheme.textColor,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Only show ClickableTrueFocus when a section is active */}
            {activeSection && (
              <ClickableTrueFocus
                sentence="Perception Perspective"
                manualMode={true}
                blurAmount={3}
                borderColor={currentTheme.borderColor}
                glowColor={currentTheme.glowColor}
                animationDuration={0.8}
                pauseBetweenAnimations={2}
                onWordClick={handleWordClick}
                activeSection={activeSection}
              />
            )}
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            key={activeSection} // Force re-render when section changes
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {!activeSection && (
              <div className="text-center flex items-center justify-center min-h-[60vh]">
                {/* Light Rays Animation */}
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    zIndex: 0,
                    pointerEvents: "none",
                  }}
                >
                  <LightRays
                    raysOrigin="top-center"
                    raysColor="#E8F5E8"
                    raysSpeed={1.2}
                    lightSpread={0.6}
                    rayLength={1.0}
                    followMouse={true}
                    mouseInfluence={0.05}
                    noiseAmount={0.05}
                    distortion={0.02}
                    className="custom-rays"
                  />
                </div>

                {/* Instruction text */}
                <div
                  className="max-w-2xl mx-auto"
                  style={{ position: "relative", zIndex: 1 }}
                >
                  {/* Original Perception Perspective words positioned above instruction */}
                  <div
                    className="mb-12 transition-colors duration-1000 font-semibold leading-tight"
                    style={{
                      fontFamily: "IBM Plex Sans, sans-serif",
                      fontSize: "clamp(2.4rem, 3.4vw, 3rem)",
                      color: currentTheme.textColor,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <style>{`
                        .instruction-section .focus-word {
                          margin-right: 4rem !important;
                        }
                        .instruction-section .focus-word:last-child {
                          margin-right: 0 !important;
                        }
                      `}</style>
                      <div className="instruction-section">
                        <ClickableTrueFocus
                          sentence="Perception Perspective"
                          manualMode={true}
                          blurAmount={3}
                          borderColor={currentTheme.borderColor}
                          glowColor={currentTheme.glowColor}
                          animationDuration={0.8}
                          pauseBetweenAnimations={2}
                          onWordClick={handleWordClick}
                          activeSection={activeSection}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="text-lg font-semibold mb-6 transition-colors duration-1000"
                    style={{ color: currentTheme.textColor }}
                  >
                    Choose Your Lens.
                  </div>
                  <div
                    className="text-base leading-relaxed transition-colors duration-1000"
                    style={{ color: currentTheme.textColor, opacity: 0.9 }}
                  >
                    Click either lens above to see how risk and meaning realign.
                  </div>
                </div>
              </div>
            )}

            {activeSection && (
              <div
                className="text-body-lg mb-6 leading-relaxed transition-colors duration-1000 text-center"
                style={{ color: currentTheme.textColor }}
              >
                {currentContent.description.replace("\n", " ")}
              </div>
            )}

            {activeSection === "perspective" && (
              <>
                {/* Show Cultural content by default */}
                {selectedButton === "Cultural" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mt-2 -mx-32 max-w-none"
                  >
                    <CorruptionDefinitions onNavigate={setSelectedButton} />
                  </motion.div>
                )}

                {/* Social section */}
                {selectedButton === "Social" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mt-8 -mx-32 max-w-none"
                  >
                    <StructuralImpactMap onNavigate={setSelectedButton} />
                  </motion.div>
                )}

                {/* Floating Contextual Navigation - Only show when in perception/perspective sections and main nav is closed */}
                {showFloatingNav && !isMainNavOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute top-24 right-8 z-30 flex flex-col gap-3"
                  >
                    <motion.button
                      onClick={() => {
                        if (selectedButton === "Cultural") {
                          setSelectedButton("Social");
                          setVisitedSections(
                            (prev) => new Set([...prev, "Cultural", "Social"]),
                          );
                        } else {
                          setSelectedButton("Cultural");
                          setVisitedSections(
                            (prev) => new Set([...prev, "Cultural"]),
                          );
                        }
                      }}
                      className="px-5 py-3 rounded-xl font-medium transition-all duration-300 text-sm"
                      style={{
                        background: "rgba(16, 185, 129, 0.15)",
                        color: "#9DE6C6",
                        border: "1px solid rgba(157, 230, 198, 0.4)",
                        backdropFilter: "blur(15px)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                        fontFamily: "var(--font-display)",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                      whileTap={{ scale: 0.98 }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(16, 185, 129, 0.25)";
                        e.currentTarget.style.boxShadow =
                          "0 0 25px rgba(16, 185, 129, 0.6)";
                        e.currentTarget.style.borderColor =
                          "rgba(16, 185, 129, 0.8)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "rgba(16, 185, 129, 0.15)";
                        e.currentTarget.style.boxShadow =
                          "0 8px 32px rgba(0,0,0,0.2)";
                        e.currentTarget.style.borderColor =
                          "rgba(157, 230, 198, 0.4)";
                      }}
                    >
                      {selectedButton === "Cultural" ? (
                        <>→ Consequences of Corruption</>
                      ) : (
                        <>
                          What is Corruption?{" "}
                          <span
                            style={{
                              transform: "rotate(180deg)",
                              display: "inline-block",
                            }}
                          >
                            →
                          </span>
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Global Corruption Count - shown on all pages including home */}
      {
        createPortal(
          <div
            style={{
              position: "fixed",
              top: "80px",
              left: "20px",
              backdropFilter: "blur(8px)",
              background: "rgba(0, 0, 0, 0.3)", // More transparent
              border: "1px solid rgba(157, 230, 198, 0.2)", // More transparent border
              borderRadius: "8px",
              padding: "12px 16px",
              color: "white",
              fontFamily: "var(--font-display)",
              zIndex: 1000,
              minWidth: "180px",
              opacity: 0.8, // Additional transparency
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "#9DE6C6",
                marginBottom: "4px",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontWeight: "500",
              }}
            >
              Global Corruption Loss
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#FFFFFF",
                fontFamily: "monospace",
                marginBottom: "2px",
              }}
            >
              ${globalLoss.toLocaleString()}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#9CA3AF",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#9DE6C6",
                  animation: "pulse 2s infinite",
                }}
              />
              Live since you started exploring
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
};

export default PerceptionPerspective;
