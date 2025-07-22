import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SplitText from "@/components/ui/SplitText";
import LegalStructuralSimulator from "./LegalStructuralSimulator";
import "./TrueFocus.css";

// Add CSS-in-JS for 3D pulsating button animations
const buttonPulseStyles = `
  @keyframes pulse-cultural {
    0%, 100% {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0px 0px 60px rgba(72, 110, 96, 0.9), 0px 0px 40px rgba(72, 110, 96, 0.7), 0px 12px 40px rgba(0, 0, 0, 0.2), rgba(255, 255, 255, 0.3) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset;
    }
    50% {
      transform: translateY(-4px) scale(1.04);
      box-shadow: 0px 0px 80px rgba(72, 110, 96, 1), 0px 0px 60px rgba(72, 110, 96, 0.8), 0px 16px 50px rgba(0, 0, 0, 0.3), rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.2) 0px -1px 0px 0px inset;
    }
  }

  @keyframes pulse-economic {
    0%, 100% {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0px 0px 60px rgba(123, 116, 85, 0.9), 0px 0px 40px rgba(123, 116, 85, 0.7), 0px 12px 40px rgba(0, 0, 0, 0.2), rgba(255, 255, 255, 0.3) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset;
    }
    50% {
      transform: translateY(-4px) scale(1.04);
      box-shadow: 0px 0px 80px rgba(123, 116, 85, 1), 0px 0px 60px rgba(123, 116, 85, 0.8), 0px 16px 50px rgba(0, 0, 0, 0.3), rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.2) 0px -1px 0px 0px inset;
    }
  }

  @keyframes pulse-social {
    0%, 100% {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0px 0px 60px rgba(139, 92, 87, 0.9), 0px 0px 40px rgba(139, 92, 87, 0.7), 0px 12px 40px rgba(0, 0, 0, 0.2), rgba(255, 255, 255, 0.3) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset;
    }
    50% {
      transform: translateY(-4px) scale(1.04);
      box-shadow: 0px 0px 80px rgba(139, 92, 87, 1), 0px 0px 60px rgba(139, 92, 87, 0.8), 0px 16px 50px rgba(0, 0, 0, 0.3), rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.2) 0px -1px 0px 0px inset;
    }
  }
`;

// Inject the styles into the head
if (typeof document !== 'undefined') {
  const existingStyle = document.getElementById('button-pulse-styles');
  if (!existingStyle) {
    const style = document.createElement('style');
    style.id = 'button-pulse-styles';
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
        return (
          <span
            key={index}
            ref={(el) => (wordRefs.current[index] = el)}
            className="focus-word manual"
            style={{
              filter: isSelectedSection ? "blur(0px)" : `blur(${blurAmount}px)`,
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
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="focus-frame"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: activeSection ? 0.4 : 0,
        }}
        transition={{
          duration: animationDuration,
        }}
        style={{
          "--border-color": borderColor,
          "--glow-color": glowColor,
        }}
      >
        <span className="corner top-left"></span>
        <span className="corner top-right"></span>
        <span className="corner bottom-left"></span>
        <span className="corner bottom-right"></span>
      </motion.div>
    </div>
  );
};

const PerceptionPerspective = () => {
  const [activeSection, setActiveSection] = useState("perception"); // Start with perception selected
  const [selectedButton, setSelectedButton] = useState("Economic"); // Auto-select Economic

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
        "Understanding begins with recognizing the lens through which we observe institutional structures and their embedded vulnerabilities.",
      details: [],
    },
  };

  const currentTheme = activeSection ? themes[activeSection] : themes.default;
  const currentContent = activeSection
    ? content[activeSection]
    : content.default;

  const handleWordClick = (wordIndex) => {
    if (wordIndex === 0) {
      setActiveSection(activeSection === "perception" ? null : "perception");
    } else if (wordIndex === 1) {
      const newPerspectiveState = activeSection === "perspective" ? null : "perspective";
      setActiveSection(newPerspectiveState);
      // Auto-select Economic when perspective is clicked
      if (newPerspectiveState === "perspective") {
        setSelectedButton("Economic");
      }
    }
  };

  return (
    <section
      className="min-h-screen pt-32 pb-20 pl-12 pr-12"
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
        <div className="text-center mb-16">
          <div
            className="text-display-lg mb-8 transition-colors duration-1000"
            style={{
              fontSize: "clamp(2.2rem, 6.5vw, 3rem)",
              lineHeight: "1.25",
              fontWeight: "600",
              fontFamily: "var(--font-display)",
              color: currentTheme.textColor,
            }}
          >
            <ClickableTrueFocus
              sentence="PERCEPTION PERSPECTIVE"
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

          <motion.div
            className="max-w-4xl mx-auto"
            key={activeSection} // Force re-render when section changes
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="text-body-lg mb-6 leading-relaxed transition-colors duration-1000"
              style={{ color: currentTheme.textColor }}
            >
              <SplitText
                text={currentContent.description}
                delay={30}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
              />
            </div>

            {activeSection === "perspective" && (
              <>
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  {["Cultural", "Economic", "Social"].map((label, index) => {
                    // Define specific gradients for each button
                    const getButtonBackground = (buttonLabel) => {
                      switch (buttonLabel) {
                        case "Cultural":
                          return "linear-gradient(135deg, #1a2e27, #2b4a3b, #486e60)";
                        case "Economic":
                          return "linear-gradient(135deg, #1e1f1c, #4d4b38, #7b7455)";
                        case "Social":
                          return "linear-gradient(135deg, #261f1e, #543d38, #8b5c57)";
                        default:
                          return "transparent";
                      }
                    };

                    const buttonBackground = getButtonBackground(label);
                    const isSelected = selectedButton === label;

                    return (
                      <button
                        key={label}
                        className="glass-button"
                        onClick={() => setSelectedButton(label)}
                        style={{
                          display: "inline-block",
                          backdropFilter: "blur(20px) saturate(180%)",
                          background: buttonBackground,
                          borderColor: isSelected ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.1)",
                          borderRadius: "25px",
                          borderWidth: "1px",
                          boxShadow: isSelected
                            ? `0px 0px 30px ${label === "Cultural" ? "rgba(72, 110, 96, 0.6)" : label === "Economic" ? "rgba(123, 116, 85, 0.6)" : "rgba(139, 92, 87, 0.6)"}, 0px 12px 40px rgba(0, 0, 0, 0.2), rgba(255, 255, 255, 0.3) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset`
                            : "rgba(0, 0, 0, 0.1) 0px 8px 32px 0px, rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset",
                          color: isSelected ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.8)",
                          fontFamily: "var(--font-display)",
                          fontWeight: isSelected ? "600" : "500",
                          letterSpacing: "1.5px",
                          textShadow: "rgba(0, 0, 0, 0.3) 0px 1px 2px",
                          transitionDuration: "0.3s",
                          transitionTimingFunction:
                            "cubic-bezier(0.4, 0, 0.2, 1)",
                          padding: "12px 24px",
                          cursor: "pointer",
                          position: "relative",
                          overflow: "hidden",
                          transform: isSelected ? "translateY(-2px) scale(1.02)" : "translateY(0px) scale(1)",
                          animation: isSelected ? `pulse-${label.toLowerCase()} 2s ease-in-out infinite` : "none",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform =
                            "translateY(-2px) scale(1.02)";
                          e.currentTarget.style.background = buttonBackground;
                          e.currentTarget.style.borderColor =
                            "rgba(255, 255, 255, 0.2)";
                          e.currentTarget.style.boxShadow =
                            "rgba(0, 0, 0, 0.15) 0px 12px 40px 0px, rgba(255, 255, 255, 0.3) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset";
                          e.currentTarget.style.color = "rgba(255, 255, 255, 1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform =
                            "translateY(0px) scale(1)";
                          e.currentTarget.style.background = buttonBackground;
                          e.currentTarget.style.borderColor =
                            "rgba(255, 255, 255, 0.1)";
                          e.currentTarget.style.boxShadow =
                            "rgba(0, 0, 0, 0.1) 0px 8px 32px 0px, rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset";
                          e.currentTarget.style.color =
                            "rgba(255, 255, 255, 0.8)";
                        }}
                      >
                        {label.toUpperCase()}
                      </button>
                    );
                  })}
                </div>

                {/* Structural Cognition Chamber integrated below the buttons */}
                {selectedButton === "Economic" && (
                  <div className="mt-8 -mx-32 max-w-none">
                    <LegalStructuralSimulator embedded={true} />
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PerceptionPerspective;
