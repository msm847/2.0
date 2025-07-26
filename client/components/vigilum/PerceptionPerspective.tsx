import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import SplitText from "@/components/ui/SplitText";
import LegalStructuralSimulator from "./LegalStructuralSimulator";
import CorruptionDefinitions from "./CorruptionDefinitions";
import StructuralImpactMap from "./StructuralImpactMap";
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

// Progress Bar Component
const ProgressBar = ({ steps, currentStep, completedSteps, onStepClick }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.has(step.key);
          const isCurrent = index === currentStep;
          const isAccessible = index === 0 || completedSteps.has(steps[index - 1].key);

          return (
            <div key={step.key} className="flex items-center">
              {/* Step Circle */}
              <div
                className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 cursor-pointer transition-all duration-300 ${
                  isCompleted
                    ? "bg-green-500 border-green-500 text-white"
                    : isCurrent
                    ? "bg-blue-500 border-blue-500 text-white animate-pulse"
                    : isAccessible
                    ? "bg-gray-600 border-gray-400 text-gray-200 hover:bg-gray-500"
                    : "bg-gray-800 border-gray-600 text-gray-500 cursor-not-allowed"
                }`}
                onClick={() => isAccessible && onStepClick(index)}
              >
                {isCompleted ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
              </div>

              {/* Step Label */}
              <div className="ml-3 min-w-0">
                <p className={`text-sm font-medium ${
                  isCompleted ? "text-green-400" : isCurrent ? "text-blue-400" : isAccessible ? "text-gray-300" : "text-gray-500"
                }`}>
                  Step {index + 1}
                </p>
                <p className={`text-xs ${
                  isCompleted ? "text-green-300" : isCurrent ? "text-blue-300" : isAccessible ? "text-gray-400" : "text-gray-600"
                }`}>
                  {step.title}
                </p>
              </div>

              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  completedSteps.has(step.key) ? "bg-green-500" : "bg-gray-600"
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

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

  // Progress tracking for Perspective section
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [currentStep, setCurrentStep] = useState(0);

  const perspectiveSteps = [
    { key: "Cultural", title: "What is Corruption", component: "CorruptionDefinitions" },
    { key: "Social", title: "Structural Impact", component: "StructuralImpactMap" },
    { key: "Economic", title: "Cognition Chamber", component: "LegalStructuralSimulator" }
  ];

  // Ensure the instruction section always loads first
  useEffect(() => {
    setActiveSection(null);
  }, []);

  // Reset to instruction section when navigating via hash to this section
  useEffect(() => {
    if (location.hash === "#perception-perspective") {
      setActiveSection(null);
      setCompletedSteps(new Set());
      setCurrentStep(0);
    }
  }, [location.hash]);

  // Scroll detection for section completion
  useEffect(() => {
    if (activeSection !== "perspective") return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (scrollPosition / documentHeight) * 100;

      // Mark current step as complete when user scrolls 80% through the section
      if (scrollPercentage > 80 && !completedSteps.has(perspectiveSteps[currentStep].key)) {
        setCompletedSteps(prev => new Set([...prev, perspectiveSteps[currentStep].key]));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, currentStep, completedSteps, perspectiveSteps]);

  // Navigation functions
  const canNavigateToStep = (stepIndex) => {
    if (stepIndex === 0) return true; // First step always available
    return completedSteps.has(perspectiveSteps[stepIndex - 1].key); // Can access if previous step is complete
  };

  const navigateToStep = (stepIndex) => {
    if (canNavigateToStep(stepIndex)) {
      setCurrentStep(stepIndex);
      setSelectedButton(perspectiveSteps[stepIndex].key);
    }
  };

  const goToNextStep = () => {
    if (currentStep < perspectiveSteps.length - 1 && completedSteps.has(perspectiveSteps[currentStep].key)) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setSelectedButton(perspectiveSteps[nextStep].key);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      setSelectedButton(perspectiveSteps[prevStep].key);
    }
  };

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
        <div className="text-center mb-16 mt-8">
          <motion.div
            className="mb-8 transition-colors duration-1000 font-semibold leading-tight"
            style={{
              fontFamily: "IBM Plex Sans, sans-serif",
              fontSize: "clamp(2.4rem, 3.4vw, 3rem)",
              color: currentTheme.textColor,
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {!activeSection && (
              <div className="text-center flex items-center justify-center min-h-[60vh]">
                {/* Instruction text */}
                <div className="max-w-2xl mx-auto">
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
                    Click either lens above to observe risk, meaning, and
                    'truth' in motion.
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
                    className="mt-8 -mx-32 max-w-none"
                  >
                    <CorruptionDefinitions onNavigate={setSelectedButton} />
                  </motion.div>
                )}

                {/* Economic section */}
                {selectedButton === "Economic" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mt-8 -mx-32 max-w-none"
                  >
                    <LegalStructuralSimulator embedded={true} />
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
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PerceptionPerspective;
