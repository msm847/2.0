import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Icon components matching the screenshots
const TargetIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const EyeIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const UserIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const StructuralIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
    <polygon points="12,7 18,10.5 18,13.5 12,17 6,13.5 6,10.5" />
    <circle cx="12" cy="12" r="2" />
    <line x1="12" y1="2" x2="12" y2="7" />
    <line x1="12" y1="17" x2="12" y2="22" />
    <line x1="2" y1="8.5" x2="6" y2="10.5" />
    <line x1="18" y1="10.5" x2="22" y2="8.5" />
    <line x1="2" y1="15.5" x2="6" y2="13.5" />
    <line x1="18" y1="13.5" x2="22" y2="15.5" />
  </svg>
);

const BoltIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
  </svg>
);

const RulerIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10,9 9,9 8,9" />
  </svg>
);

const NetworkIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5z" />
    <path d="m12 2 3.5 3.5L12 9 8.5 5.5 12 2z" />
    <path d="M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5z" />
    <path d="m12 15 3.5 3.5L12 22l-3.5-3.5L12 15z" />
  </svg>
);

const GlobeIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const principles = [
  {
    id: 1,
    title: "Preemption over Reaction",
    description:
      "Identify structural risks before they manifest, not after damage is done.",
    icon: <TargetIcon />,
  },
  {
    id: 2,
    title: "Transparency in Analysis",
    description:
      "Explainable AI that shows how conclusions are reached, not black box predictions.",
    icon: <EyeIcon />,
  },
  {
    id: 3,
    title: "Civic Collaboration",
    description:
      "Working with journalists, whistleblowers, and civic actors to strengthen accountability.",
    icon: <UserIcon />,
  },
  {
    id: 4,
    title: "Structural Intelligence",
    description:
      "Detect design-level vulnerabilities within compliance frameworks before they calcify.",
    icon: <GearIcon />,
  },
  {
    id: 5,
    title: "Real-time Detection",
    description:
      "Convert institutional data into actionable risk signals before execution, not after loss.",
    icon: <BoltIcon />,
  },
  {
    id: 6,
    title: "Legal Architecture Analysis",
    description:
      "Parse contract language to expose embedded risk configurations and asymmetric clauses.",
    icon: <RulerIcon />,
  },
  {
    id: 7,
    title: "Political Network Mapping",
    description:
      "Trace relational proximity and influence patterns across institutional actors using graph AI.",
    icon: <NetworkIcon />,
  },
  {
    id: 8,
    title: "System-wide Integration",
    description:
      "Modular signal engines that operate independently but integrate through unified risk logic.",
    icon: <GlobeIcon />,
  },
];

const CorePrinciples: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Smooth scroll to top when page loads
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleReturn = () => {
    navigate("/vigilum");

    // Small delay to allow navigation to complete
    setTimeout(() => {
      const teamSection = document.getElementById("team-section");
      if (teamSection) {
        teamSection.scrollIntoView({ behavior: "instant" });
      }
    }, 100);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #25443B 0%, #1A2F29 50%, #10201C 100%)",
        color: "#DAD7C7",
        padding: "40px 20px",
      }}
    >
      {/* Return Button */}
      <button
        onClick={handleReturn}
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          backdropFilter: "blur(20px) saturate(1.8)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "12px",
          boxShadow:
            "0 12px 40px rgba(0, 0, 0, 0.15), 0 2px 0 rgba(255, 255, 255, 0.5) inset, 0 -1px 0 rgba(0, 0, 0, 0.3) inset, 0 0 20px rgba(64, 255, 170, 0.2)",
          color: "rgba(255, 255, 255, 0.9)",
          cursor: "pointer",
          fontSize: "11px",
          fontWeight: "600",
          letterSpacing: "0.275px",
          lineHeight: "17.6px",
          padding: "8px 16px",
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        ← Return
      </button>

      <div style={{ maxWidth: "1200px", margin: "0 auto", paddingTop: "80px" }}>
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "60px",
          }}
        >
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "700",
              color: "#40FFAA",
              marginBottom: "16px",
              textShadow: "0 0 30px rgba(64, 255, 170, 0.3)",
            }}
          >
            Core Principles
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#9DE6C6",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            The foundational principles that guide Vigilum's approach to
            structural transparency and corruption prevention.
          </p>
        </div>

        {/* Principles Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "30px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {principles.map((principle) => (
            <div
              key={principle.id}
              style={{
                background:
                  "linear-gradient(135deg, rgba(16, 32, 28, 0.9) 0%, rgba(12, 25, 22, 0.9) 100%)",
                backdropFilter: "blur(20px) saturate(1.8)",
                border: "1px solid rgba(64, 255, 170, 0.2)",
                borderRadius: "20px",
                padding: "32px",
                textAlign: "center",
                transition: "all 0.3s ease",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 50px rgba(64, 255, 170, 0.15)";
                e.currentTarget.style.borderColor = "rgba(64, 255, 170, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 32px rgba(0, 0, 0, 0.3)";
                e.currentTarget.style.borderColor = "rgba(64, 255, 170, 0.2)";
              }}
            >
              {/* Icon */}
              <div
                style={{
                  color: "#40FFAA",
                  marginBottom: "20px",
                  display: "flex",
                  justifyContent: "center",
                  filter: "drop-shadow(0 0 10px rgba(64, 255, 170, 0.3))",
                }}
              >
                {principle.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#40FFAA",
                  marginBottom: "16px",
                  lineHeight: "1.3",
                }}
              >
                {principle.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: "14px",
                  color: "#DAD7C7",
                  lineHeight: "1.6",
                  opacity: 0.9,
                }}
              >
                {principle.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div
          style={{
            textAlign: "center",
            marginTop: "80px",
            padding: "40px",
            background: "rgba(64, 255, 170, 0.05)",
            border: "1px solid rgba(64, 255, 170, 0.1)",
            borderRadius: "20px",
          }}
        >
          <p
            style={{
              fontSize: "16px",
              color: "#9DE6C6",
              fontStyle: "italic",
              lineHeight: "1.6",
            }}
          >
            "These principles form the backbone of Vigilum's mission to create
            institutional transparency through predictive analysis and
            structural intelligence."
          </p>
        </div>
      </div>
    </div>
  );
};

export default CorePrinciples;
