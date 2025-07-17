import { useState, useEffect } from "react";

interface PerformantRotatingTextProps {
  texts: string[];
  rotationInterval?: number;
  className?: string;
  paused?: boolean;
}

const PerformantRotatingText: React.FC<PerformantRotatingTextProps> = ({
  texts,
  rotationInterval = 2500,
  className = "",
  paused = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts.length, rotationInterval, paused]);

  return (
    <span className={`text-rotate ${className}`}>
      <span className="text-rotate-sr-only">{texts.join(", ")}</span>
      <span
        key={currentIndex}
        className="text-rotate-word"
        style={{
          animationDelay: "0s",
        }}
      >
        {texts[currentIndex]}
      </span>
    </span>
  );
};

export default PerformantRotatingText;
