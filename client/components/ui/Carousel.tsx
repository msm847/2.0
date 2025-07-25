import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
// replace icons with your own if needed
import { FiCircle, FiCode, FiFileText, FiLayers, FiLayout } from "react-icons/fi";

import "./Carousel.css";

const DEFAULT_ITEMS = [
  {
    title: "Text Animations",
    description: "Cool text animations for your projects.",
    id: 1,
    icon: <FiFileText className="carousel-icon" />,
  },
  {
    title: "Animations",
    description: "Smooth animations for your projects.",
    id: 2,
    icon: <FiCircle className="carousel-icon" />,
  },
  {
    title: "Components",
    description: "Reusable components for your projects.",
    id: 3,
    icon: <FiLayers className="carousel-icon" />,
  },
  {
    title: "Backgrounds",
    description: "Beautiful backgrounds and patterns for your projects.",
    id: 4,
    icon: <FiLayout className="carousel-icon" />,
  },
  {
    title: "Common UI",
    description: "Common UI components are coming soon!",
    id: 5,
    icon: <FiCode className="carousel-icon" />,
  },
];

const DRAG_BUFFER = 50;
const VELOCITY_THRESHOLD = 300;
const GAP = 16;
const SPRING_OPTIONS = {
  type: "tween",
  duration: 0.6,
  ease: [0.25, 0.46, 0.45, 0.94] // Smooth easing curve
};

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
  customRender = null,
  onCycleComplete = null,
}) {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  // Create extended array for infinite loop
  const carouselItems = loop ? [...items, ...items, ...items] : items;
  const [currentIndex, setCurrentIndex] = useState(loop ? items.length : 0);
  const [cycleCompleted, setCycleCompleted] = useState(false);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const containerRef = useRef(null);

  // Handle cycle completion callback
  useEffect(() => {
    if (cycleCompleted && onCycleComplete) {
      onCycleComplete();
      setCycleCompleted(false); // Reset the flag
    }
  }, [cycleCompleted, onCycleComplete]);

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          const nextIndex = prev + 1;

          // Handle cycle completion for non-loop mode
          if (!loop && nextIndex >= items.length) {
            if (onCycleComplete) {
              onCycleComplete();
            }
            return 0; // Return to first item after completing cycle
          }

          // Handle loop mode
          if (loop && nextIndex >= items.length * 2) {
            return items.length;
          }

          return nextIndex;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    pauseOnHover,
    loop,
    items.length,
    onCycleComplete,
  ]);

  const effectiveTransition = SPRING_OPTIONS; // Always use smooth transitions

  const handleAnimationComplete = () => {
    if (loop) {
      // Seamless reset without animation when reaching boundaries
      if (currentIndex >= items.length * 2) {
        // Reset to equivalent position in middle section
        const equivalentIndex = items.length;
        x.set(-(equivalentIndex * trackItemOffset));
        setCurrentIndex(equivalentIndex);
      } else if (currentIndex < 0) {
        // Reset to equivalent position in middle section
        const equivalentIndex = items.length - 1;
        x.set(-(equivalentIndex * trackItemOffset));
        setCurrentIndex(equivalentIndex);
      }
    }
  };

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      // Moving right (next item)
      setCurrentIndex((prev) => {
        if (loop) {
          const nextIndex = prev + 1;
          // Prevent going past second set
          if (nextIndex >= items.length * 2) {
            return items.length;
          }
          return nextIndex;
        } else {
          return Math.min(prev + 1, items.length - 1);
        }
      });
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      // Moving left (previous item)
      setCurrentIndex((prev) => {
        if (loop) {
          const prevIndex = prev - 1;
          // Prevent going before first set
          if (prevIndex < 0) {
            return items.length - 1;
          }
          return prevIndex;
        } else {
          return Math.max(prev - 1, 0);
        }
      });
    }
  };

  const dragProps = loop
    ? {} // No constraints for infinite loop
    : {
      dragConstraints: {
        left: -trackItemOffset * (items.length - 1),
        right: 0,
      },
    };

  return (
    <div
      ref={containerRef}
      className={`carousel-container ${round ? "round" : ""}`}
      style={{
        width: `${baseWidth}px`,
        ...(round && { height: `${baseWidth}px`, borderRadius: "50%" }),
      }}
    >
      <motion.div
        className="carousel-track"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => {
          const range = [
            -(index + 1) * trackItemOffset,
            -index * trackItemOffset,
            -(index - 1) * trackItemOffset,
          ];
          const outputRange = [15, 0, -15]; // Much more subtle rotation
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const rotateY = useTransform(x, range, outputRange, { clamp: false });
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const opacity = useTransform(x, range, [0.6, 1, 0.6], { clamp: false });
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const scale = useTransform(x, range, [0.95, 1, 0.95], { clamp: false });
          return (
            <motion.div
              key={index}
              className={`carousel-item ${round ? "round" : ""}`}
              style={{
                width: itemWidth,
                height: round ? itemWidth : "100%",
                rotateY: rotateY,
                opacity: opacity,
                scale: scale,
                ...(round && { borderRadius: "50%" }),
              }}
              transition={effectiveTransition}
            >
              {customRender ? (
                customRender(item)
              ) : (
                <>
                  <div className={`carousel-item-header ${round ? "round" : ""}`}>
                    <span className="carousel-icon-container">
                      {item.icon}
                    </span>
                  </div>
                  <div className="carousel-item-content">
                    <div className="carousel-item-title">{item.title}</div>
                    <p className="carousel-item-description">{item.description}</p>
                  </div>
                </>
              )}
            </motion.div>
          );
        })}
      </motion.div>
      <div className={`carousel-indicators-container ${round ? "round" : ""}`}>
        <div className="carousel-indicators">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`carousel-indicator ${(loop ? (currentIndex % items.length) : currentIndex) === index ? "active" : "inactive"
                }`}
              animate={{
                scale: (loop ? (currentIndex % items.length) : currentIndex) === index ? 1.2 : 1,
              }}
              onClick={() => setCurrentIndex(loop ? items.length + index : index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
