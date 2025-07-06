import { useState } from "react";
import { Link } from "react-router-dom";

interface InteractiveCardProps {
  icon: string;
  name: string;
  href: string;
  delay?: number;
}

const InteractiveCard = ({
  icon,
  name,
  href,
  delay = 0,
}: InteractiveCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Feather icons mapping
  const featherIcons: { [key: string]: JSX.Element } = {
    "alert-circle": (
      <svg
        className="icon-svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    ),
    target: (
      <svg
        className="icon-svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="6"></circle>
        <circle cx="12" cy="12" r="2"></circle>
      </svg>
    ),
    code: (
      <svg
        className="icon-svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16,18 22,12 16,6"></polyline>
        <polyline points="8,6 2,12 8,18"></polyline>
      </svg>
    ),
    cpu: (
      <svg
        className="icon-svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="4" width="16" height="16" rx="2"></rect>
        <rect x="9" y="9" width="6" height="6"></rect>
        <line x1="9" y1="1" x2="9" y2="4"></line>
        <line x1="15" y1="1" x2="15" y2="4"></line>
        <line x1="9" y1="20" x2="9" y2="23"></line>
        <line x1="20" y1="9" x2="23" y2="9"></line>
        <line x1="20" y1="14" x2="23" y2="14"></line>
        <line x1="1" y1="9" x2="4" y2="9"></line>
        <line x1="1" y1="14" x2="4" y2="14"></line>
        <line x1="15" y1="20" x2="15" y2="23"></line>
      </svg>
    ),
    activity: (
      <svg
        className="icon-svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
      </svg>
    ),
    cloud: (
      <svg
        className="icon-svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
      </svg>
    ),
  };

  const cardStyle = {
    display: "block",
    background: "#0a0a0a",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    padding: "2rem",
    textDecoration: "none",
    color: "inherit",
    transition: "all 400ms ease-out",
    position: "relative" as const,
    overflow: "hidden" as const,
    animationDelay: `${delay}ms`,
    opacity: 0,
    transform: "translateY(60px)",
    animation: "cardEntrance 800ms ease-out forwards",
  };

  const cardHoverStyle = {
    transform: "translateY(-6px) scale(1.02)",
    boxShadow: "0 14px 30px rgba(0, 255, 255, 0.12)",
    border: "1px solid rgba(0, 255, 255, 0.2)",
  };

  const iconStyle = {
    color: isHovered ? "#00ffff" : "#ffffff",
    transition: "color 300ms ease-out",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const buttonStyle = {
    fontFamily: '"Courier New", monospace',
    fontSize: "0.875rem",
    fontWeight: 500,
    padding: "0.75rem 1.5rem",
    border: `1px solid ${isHovered ? "#00ffff" : "rgba(255, 255, 255, 0.2)"}`,
    borderRadius: "6px",
    background: isHovered ? "rgba(0, 255, 255, 0.1)" : "transparent",
    cursor: "pointer",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    color: isHovered ? "#00ffff" : "#ffffff",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    transition: "all 300ms ease-out",
  };

  return (
    <>
      <style>
        {`
          @keyframes cardEntrance {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      <Link
        to={href}
        className="ci-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          ...cardStyle,
          ...(isHovered ? cardHoverStyle : {}),
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "1.5rem",
          }}
        >
          <div style={iconStyle}>
            {featherIcons[icon] || featherIcons["alert-circle"]}
          </div>
          <h3
            style={{
              fontFamily: '"Courier New", monospace',
              fontSize: "1.25rem",
              fontWeight: 600,
              margin: 0,
              color: "#ffffff",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {name}
          </h3>
          <button style={buttonStyle}>Learn More</button>
        </div>
      </Link>
    </>
  );
};

export default InteractiveCard;
