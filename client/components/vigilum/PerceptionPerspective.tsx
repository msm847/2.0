import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SplitText from "@/components/ui/SplitText";
import "./TrueFocus.css";

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
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  // Disable automatic animation - only respond to clicks
  useEffect(() => {
    // No automatic animation
  }, []);

  useEffect(() => {
    // Only show focus frame when a section is actively selected
    const activeWordIndex = activeSection === 'perception' ? 0 : activeSection === 'perspective' ? 1 : -1;

    if (activeWordIndex === -1 || !wordRefs.current[activeWordIndex] || !containerRef.current) {
      setFocusRect({ x: 0, y: 0, width: 0, height: 0 });
      return;
    }

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[activeWordIndex].getBoundingClientRect();

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
        const isSelectedSection = (index === 0 && activeSection === 'perception') ||
                                 (index === 1 && activeSection === 'perspective');
        return (
          <span
            key={index}
            ref={(el) => (wordRefs.current[index] = el)}
            className="focus-word manual"
            style={{
              filter: isSelectedSection ? 'blur(0px)' : `blur(${blurAmount}px)`,
              "--border-color": borderColor,
              "--glow-color": glowColor,
              transition: `filter ${animationDuration}s ease, color 0.6s ease`,
              cursor: 'pointer',
              opacity: isSelectedSection ? 1 : 0.7,
              color: isSelectedSection ?
                (index === 0 ? '#E5F3ED' : '#F1FBF5') : // Use specific text colors for each word
                'inherit',
              fontWeight: isSelectedSection ? '600' : 'inherit', // Semibold when selected
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
          opacity: activeSection ? 1 : 0,
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
  const [activeSection, setActiveSection] = useState('perception'); // Start with perception selected

  // Theme configurations
  const themes = {
    perception: {
      backgroundColor: "#04110D", // Surface Black Green
      borderColor: "#E5F3ED", // Same as text color
      glowColor: "rgba(229, 243, 237, 0.6)", // Same as text color with opacity
      accentColor: "#34D399",
      textColor: "#E5F3ED" // Off-white green, sharp against black
    },
    perspective: {
      backgroundColor: "#1B352A", // Structured Green Depth
      borderColor: "#142820", // Darker than background (#1B352A)
      glowColor: "rgba(20, 40, 32, 0.6)", // Darker than background with opacity
      accentColor: "#60A5FA",
      textColor: "#F1FBF5" // Slightly cleaner white to increase cognitive edge
    },
    default: {
      backgroundColor: "#0D1510",
      borderColor: "#17B58F",
      glowColor: "rgba(23, 181, 143, 0.6)",
      accentColor: "#17B58F",
      textColor: "#F5F5F5"
    }
  };

  // Content for each section
  const content = {
    perception: {
      title: "PERCEPTION",
      description: "What is visible is not always actionable.\nPerception without structure leads nowhere.",
      details: []
    },
    perspective: {
      title: "PERSPECTIVE",
      description: "What is legible is not always true.\nPerspective reflects the system, not the facts.",
      details: []
    },
    default: {
      title: "PERCEPTION PERSPECTIVE",
      description: "Understanding begins with recognizing the lens through which we observe institutional structures and their embedded vulnerabilities.",
      details: []
    }
  };

  const currentTheme = activeSection ? themes[activeSection] : themes.default;
  const currentContent = activeSection ? content[activeSection] : content.default;

  const handleWordClick = (wordIndex) => {
    if (wordIndex === 0) {
      setActiveSection(activeSection === 'perception' ? null : 'perception');
    } else if (wordIndex === 1) {
      setActiveSection(activeSection === 'perspective' ? null : 'perspective');
    }
  };

  return (
    <section
      className="min-h-screen pt-32 pb-20 pl-12 pr-12 transition-all duration-1000"
      style={{ backgroundColor: currentTheme.backgroundColor }}
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
              color: currentTheme.textColor
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PerceptionPerspective;
