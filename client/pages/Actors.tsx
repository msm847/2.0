import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Icon components for different actor types
const ShieldIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const DocumentIcon = () => (
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
  </svg>
);

const CodeIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="16,18 22,12 16,6" />
    <polyline points="8,6 2,12 8,18" />
  </svg>
);

const GraduationIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const UsersIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ScaleIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M16 11c0-2.5-2-4.5-4.5-4.5S7 8.5 7 11h9z" />
    <path d="M12 17v5" />
    <path d="M8 21h8" />
    <path d="M12 6V2" />
    <path d="M7 11l-3 3 3 3" />
    <path d="M17 11l3 3-3 3" />
  </svg>
);

const TrendingIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
    <polyline points="17,6 23,6 23,12" />
  </svg>
);

const BuildingIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
    <path d="M6 12H4a2 2 0 0 0-2 2v8h4" />
    <path d="M18 9h2a2 2 0 0 1 2 2v11h-4" />
    <path d="M10 6h4" />
    <path d="M10 10h4" />
    <path d="M10 14h4" />
    <path d="M10 18h4" />
  </svg>
);

const StarIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

const actors = [
  {
    id: 1,
    title: "Institutional Auditors",
    description:
      "Risk assessment professionals analyzing governance structures",
    icon: <ShieldIcon />,
  },
  {
    id: 2,
    title: "Development Organizations",
    description: "Funding bodies requiring governance risk assessment",
    icon: <DocumentIcon />,
  },
  {
    id: 3,
    title: "Civic AI Developers",
    description: "Technology teams building governance intelligence systems",
    icon: <CodeIcon />,
  },
  {
    id: 4,
    title: "Students & Researchers",
    description:
      "Academic researchers studying governance patterns and structural risk detection",
    icon: <GraduationIcon />,
  },
  {
    id: 5,
    title: "Academic Faculty",
    description:
      "Professors in public policy, law, and governance seeking research collaboration",
    icon: <UsersIcon />,
  },
  {
    id: 6,
    title: "Regulatory Agencies",
    description:
      "Government oversight bodies requiring pre-award structural intelligence",
    icon: <ScaleIcon />,
  },
  {
    id: 7,
    title: "ESG & Compliance Analysts",
    description:
      "Investment firms screening for institutional exposure and political risk",
    icon: <TrendingIcon />,
  },
  {
    id: 8,
    title: "International Finance",
    description:
      "World Bank, EBRD, and multilateral institutions conducting integrity assessments",
    icon: <BuildingIcon />,
  },
  {
    id: 9,
    title: "Other Parties of Interest",
    description:
      "Additional stakeholders seeking structural governance intelligence collaboration",
    icon: <StarIcon />,
  },
];

const Actors: React.FC = () => {
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
            Collaboration Actors
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
            Key stakeholders and partners who can benefit from structural
            governance intelligence and contribute to institutional
            transparency.
          </p>
        </div>

        {/* Actors Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "30px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {actors.map((actor) => (
            <div
              key={actor.id}
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
                {actor.icon}
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
                {actor.title}
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
                {actor.description}
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
            "Vigilum's mission succeeds through collaborative
            intelligence—bringing together diverse expertise to create
            transparency that serves the public interest."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Actors;
