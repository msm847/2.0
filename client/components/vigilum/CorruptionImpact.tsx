import { useState } from "react";
import { motion } from "framer-motion";

// Data model for impact panels
const impactData = {
  panels: [
    {
      id: "economic-loss",
      title: "Economic Loss & Growth Suppression",
      headline:
        "Corruption drains trillions from the global economy every year.",
      icon: "📉",
      data_points: [
        {
          text: "Over $1 trillion paid in bribes annually",
          source: "World Bank",
        },
        {
          text: "GDP growth is up to 2% lower in corrupt countries",
          source: "IMF",
        },
        {
          text: "Investment is 20% lower in high-corruption states",
          source: "World Economic Forum",
        },
      ],
      example:
        "Brazil's Petrobras scandal led to $8 billion in losses and triggered a national recession.",
      learn_more:
        "https://www.worldbank.org/en/topic/governance/brief/anti-corruption",
    },
    {
      id: "weakened-institutions",
      title: "Weakened Institutions & Rule of Law",
      headline:
        "Corruption erodes the effectiveness and legitimacy of governments and courts.",
      icon: "⚖️",
      data_points: [
        {
          text: "Corrupt countries have weaker law enforcement and higher impunity",
          source: "UNODC",
        },
        {
          text: "Public trust in institutions is 2–3x lower in high-corruption states",
          source: "OECD",
        },
      ],
      example:
        "Judicial bribery scandals in Eastern Europe have stalled legal reforms and delayed justice for years.",
      learn_more: "https://www.unodc.org/unodc/en/corruption/index.html",
    },
    {
      id: "social-inequality",
      title: "Social Inequality & Exclusion",
      headline: "Corruption widens the gap between rich and poor.",
      icon: "⚖️",
      data_points: [
        {
          text: "Public services cost up to 30% more in high-corruption settings",
          source: "Transparency International",
        },
        {
          text: "Petty corruption takes a larger share of income from the poor",
          source: "UNDP",
        },
      ],
      example:
        "In parts of Africa and South Asia, patients report paying informal 'fees' for basic medical care—deepening inequality.",
      learn_more:
        "https://www.transparency.org/en/topics/corruption-and-inequality",
    },
    {
      id: "distorted-markets",
      title: "Distorted Markets & Unfair Competition",
      headline:
        "Corruption distorts markets, blocks fair competition, and repels honest business.",
      icon: "🤝",
      data_points: [
        {
          text: "Corruption increases the cost of doing business by up to 10%",
          source: "OECD",
        },
        {
          text: "1 in 3 companies lose deals to competitors who pay bribes",
          source: "World Bank Enterprise Survey",
        },
      ],
      example:
        "Major infrastructure tenders in Southeast Asia have been awarded to unqualified companies due to hidden payments, resulting in failed projects.",
      learn_more: "https://www.oecd.org/corruption/",
    },
    {
      id: "environmental-cost",
      title: "Environmental and Human Cost",
      headline:
        "Corruption undermines environmental protection and fuels human suffering.",
      icon: "🌍",
      data_points: [
        {
          text: "Up to 50% of illegal logging and mining is enabled by corruption",
          source: "UNODC",
        },
        {
          text: "Disaster relief funds are often diverted or misused, costing lives",
          source: "World Bank",
        },
      ],
      example:
        "Illegal logging in Indonesia's rainforests, abetted by corrupt permitting, contributes directly to global biodiversity loss.",
      learn_more: "https://www.unodc.org/unodc/en/environment/",
    },
    {
      id: "trust-security",
      title: "Lost Trust & Security Risks",
      headline:
        "Corruption fuels distrust, migration, and global security threats.",
      icon: "🛡️",
      data_points: [
        {
          text: "Corruption predicts willingness to migrate",
          source: "Gallup",
        },
        {
          text: "Enables organized crime, money laundering, and terrorism",
          source: "FATF, UNODC",
        },
      ],
      example:
        "Widespread corruption in Afghanistan contributed to institutional collapse and instability.",
      learn_more: "https://www.fatf-gafi.org/en/topics/corruption.html",
    },
  ],
};

const ImpactPanel = ({ panel, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="impact-panel"
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "16px",
        padding: "32px",
        marginBottom: "24px",
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 12px 40px rgba(0, 0, 0, 0.15), 0 2px 0 rgba(255, 255, 255, 0.2) inset"
          : "0 8px 32px rgba(0, 0, 0, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Panel Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "20px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            fontSize: "48px",
            width: "64px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(157, 230, 198, 0.1)",
            borderRadius: "12px",
            flexShrink: 0,
          }}
        >
          {panel.icon}
        </div>
        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#9DE6C6",
              margin: "0 0 8px 0",
              fontFamily: "var(--font-display)",
            }}
          >
            {panel.title}
          </h3>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#FFFFFF",
              margin: "0",
              lineHeight: "1.4",
            }}
          >
            {panel.headline}
          </p>
        </div>
      </div>

      {/* Data Points */}
      <div style={{ marginBottom: "20px" }}>
        {panel.data_points.map((point, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#9DE6C6",
                marginTop: "8px",
                flexShrink: 0,
              }}
            />
            <div>
              <span
                style={{
                  fontSize: "15px",
                  color: "#E5E5E5",
                  fontWeight: "500",
                }}
              >
                {point.text}
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: "#9CA3AF",
                  marginLeft: "8px",
                  fontStyle: "italic",
                }}
              >
                [{point.source}]
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Example */}
      <div
        style={{
          padding: "16px",
          backgroundColor: "rgba(157, 230, 198, 0.05)",
          borderLeft: "3px solid #9DE6C6",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            color: "#E5E5E5",
            fontStyle: "italic",
            margin: "0",
            lineHeight: "1.5",
          }}
        >
          "{panel.example}"
        </p>
      </div>

      {/* Learn More Button */}
      <button
        onClick={() => window.open(panel.learn_more, "_blank")}
        style={{
          backgroundColor: "rgba(157, 230, 198, 0.1)",
          border: "1px solid rgba(157, 230, 198, 0.3)",
          borderRadius: "8px",
          padding: "10px 20px",
          color: "#9DE6C6",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "rgba(157, 230, 198, 0.2)";
          e.target.style.borderColor = "rgba(157, 230, 198, 0.6)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "rgba(157, 230, 198, 0.1)";
          e.target.style.borderColor = "rgba(157, 230, 198, 0.3)";
        }}
      >
        Learn More
      </button>
    </motion.div>
  );
};

const CorruptionImpact = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        padding: "40px 32px",
        marginTop: "32px",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "left", marginBottom: "48px" }}>
        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 2.5rem)",
            fontWeight: "600",
            color: "#9DE6C6",
            margin: "0 0 16px 0",
            fontFamily: "var(--font-display)",
          }}
        >
          The Impact of Corruption
        </h2>
        <p
          style={{
            fontSize: "18px",
            color: "#9DE6C6",
            margin: "0 0 8px 0",
            fontStyle: "italic",
          }}
        >
          Damage Across Society, Economy, and Institutions
        </p>
        <p
          style={{
            fontSize: "16px",
            color: "#E5E5E5",
            maxWidth: "800px",
            margin: "0",
            lineHeight: "1.6",
          }}
        >
          Corruption is more than a legal or ethical question. Its consequences
          ripple across economies, institutions, markets, the environment, and
          society. Explore the evidence—by the numbers and through real cases.
        </p>
      </div>

      {/* Impact Panels Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "32px",
          maxWidth: "1200px",
        }}
      >
        {impactData.panels.map((panel, index) => (
          <ImpactPanel key={panel.id} panel={panel} index={index} />
        ))}
      </div>

      {/* Closing Statement */}
      <div
        style={{
          textAlign: "center",
          marginTop: "64px",
          paddingTop: "32px",
          borderTop: "1px solid rgba(157, 230, 198, 0.2)",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            color: "#E5E5E5",
            fontWeight: "600",
            lineHeight: "1.6",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          Corruption is not a private act—it is a structural force leaving a
          mark on economies, societies, and the future. Its damage is measured
          in lost opportunity, weakened trust, and unrealized potential.
        </p>
      </div>
    </motion.div>
  );
};

export default CorruptionImpact;
