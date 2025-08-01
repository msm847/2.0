import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

// Structural type color mapping
const getStructuralTypeColor = (type) => {
  const colors = {
    extraction: "#B91C1C", // Red - Extraction type
    simulation: "#3B82F6", // Institutional blue - Simulation type
    shadow: "#6B7280", // Grey/Black - Shadow type
    drift: "#EA580C", // Orange - Drift type
    collapse: "#7C3AED", // Purple - Trust Collapse type
  };
  return colors[type] || "#9CA3AF";
};

// Enhanced data model for the immersive structural impact map
const impactNetworkData = {
  nodes: [
    {
      id: "economy",
      label: "Economy",
      axisTitle: "Extraction Multipliers",
      position: { x: 8, y: 15 }, // 1st in line
      structuralLogic:
        "Corruption is not a single event—it is a multiplier embedded in design, compounding leakage across budgets, deals, and time.",
      shockingFact:
        "In major infrastructure projects, compliant extraction channels often outpace criminal theft 2:1, draining billions through 'legal' structures.",
      dataPoint:
        "Countries in the top decile of procurement loophole density lose up to 25% of project value to legal but extractive intermediaries—triple the OECD average.",
      actionableOutput:
        "Flag contracts where clause sequencing produces risk vectors above threshold; simulate extraction velocity over time.",
      headline:
        "Corruption is not just leakage; it is a systemic multiplier—compounding over every contract, every cycle, and every loophole.",
      domainCounter: {
        ratePerSecond: 31666,
        unit: "USD",
        displayFormat: "currency",
      },
      facts: [
        {
          text: "Over $1 trillion lost annually",
          source: "World Bank",
          icon: "💰",
        },
        { text: "GDP growth up to 2% lower", source: "IMF", icon: "📉" },
        { text: "Investment falls by 20%", source: "WEF", icon: "📊" },
      ],
      timeline: [
        {
          step: "Bribe paid",
          description: "Funds diverted from national budget",
          icon: "💸",
        },
        {
          step: "Funds lost",
          description: "Investment capital disappears",
          icon: "🕳️",
        },
        {
          step: "Growth slows",
          description: "National productivity stagnates",
          icon: "📉",
        },
      ],
      microCase: {
        text: "Petrobras: $8B lost, national recession triggered.",
        source: "World Bank",
      },
      propagation: [
        {
          toNode: "markets",
          effect: "Feeds shadow market creation",
          intensity: 0.8,
        },
        {
          toNode: "institutions",
          effect: "Enables compliance inversion",
          intensity: 0.7,
        },
        {
          toNode: "inequality",
          effect: "Multiplies extraction effects",
          intensity: 0.9,
        },
      ],
      color: "#10B981",
      structuralType: "extraction",
    },
    {
      id: "institutions",
      label: "Institutions",
      axisTitle: "Compliance Inversion",
      position: { x: 24, y: 15 }, // 2nd in line
      structuralLogic:
        "When compliance systems are engineered for appearance, not substance, oversight becomes a simulacrum—reforms actually drive new extraction logics.",
      shockingFact:
        "EU countries with the fastest uptick in anti-corruption laws saw no drop in procurement anomalies—just a shift in method.",
      dataPoint:
        "Following major anti-corruption 'reforms,' enforcement actions may drop 30%—not because risk fell, but because simulation logic absorbed real oversight (see Romania, 2016–2019).",
      actionableOutput:
        "Surface clusters where legal change correlates with increased uninvestigated procurement anomalies.",
      headline:
        "When systems reward simulation over substance, reforms create new loopholes faster than old ones close.",
      domainCounter: {
        ratePerSecond: 8400,
        unit: "Trust Points",
        displayFormat: "number",
      },
      facts: [
        {
          text: "Law enforcement weakens, impunity rises",
          source: "UNODC",
          icon: "⚖️",
        },
        {
          text: "Trust in institutions 2–3x lower",
          source: "OECD",
          icon: "🏛️",
        },
        {
          text: "Democratic processes undermined",
          source: "Freedom House",
          icon: "🗳️",
        },
      ],
      timeline: [
        {
          step: "Judge bribed",
          description: "Legal system compromised",
          icon: "⚖️",
        },
        {
          step: "Reforms blocked",
          description: "Progress stalls indefinitely",
          icon: "🚫",
        },
        {
          step: "Rights unprotected",
          description: "Citizens lose legal recourse",
          icon: "🛡️",
        },
      ],
      microCase: {
        text: "Eastern Europe: Judicial bribery stalled legal reforms for decades.",
        source: "GRECO",
      },
      propagation: [
        {
          toNode: "environment",
          effect: "Enables oversight simulation",
          intensity: 0.9,
        },
        {
          toNode: "inequality",
          effect: "Drives behavioral drift",
          intensity: 0.6,
        },
        {
          toNode: "trust",
          effect: "Accelerates legitimacy crisis",
          intensity: 0.8,
        },
      ],
      color: "#06B6D4",
      structuralType: "simulation",
    },
    {
      id: "inequality",
      label: "Inequality",
      axisTitle: "Behavioral Drift & Reflexive Erosion",
      position: { x: 40, y: 15 }, // 3rd in line
      structuralLogic:
        "Repeated exposure to non-binding reforms and simulated accountability compresses cognitive reflexes—normalizing evasion and teaching actors that structural outcomes are predetermined.",
      shockingFact:
        "Nearly 80% of public servants in high-simulation countries say 'everyone adapts the rules'—twice the global average.",
      dataPoint:
        "In post-reform Lithuania, 74% of surveyed officials agreed that 'rules are changed to fit decisions,' not the reverse—a reversal from pre-reform attitudes.",
      actionableOutput:
        "Detect system states where procedural adaptation outpaces formal regulation (e.g., sudden changes in tendering logic, spike in legal amendments post-scandal).",
      headline:
        "Surface reforms mask deeper structural drift—teaching actors to adapt, evade, and accept simulation as the new normal.",
      domainCounter: {
        ratePerSecond: 15200,
        unit: "People Affected",
        displayFormat: "number",
      },
      facts: [
        {
          text: "Public services cost up to 30% more",
          source: "Transparency International",
          icon: "����",
        },
        {
          text: "Petty corruption hurts the poor most",
          source: "UNDP",
          icon: "👥",
        },
        {
          text: "Educational access reduced by 25%",
          source: "UNESCO",
          icon: "🎓",
        },
      ],
      timeline: [
        {
          step: "Health bribe demanded",
          description: "Payment required for basic care",
          icon: "🏥",
        },
        {
          step: "Patient excluded",
          description: "Cannot afford treatment",
          icon: "❌",
        },
        {
          step: "Poverty entrenched",
          description: "Long-term exclusion cycle begins",
          icon: "🔄",
        },
      ],
      microCase: {
        text: "South Asia: Informal fees for medical care deepen inequality gaps.",
        source: "WHO",
      },
      propagation: [
        {
          toNode: "trust",
          effect: "Accelerates trust collapse",
          intensity: 0.95,
        },
        {
          toNode: "economy",
          effect: "Feeds extraction multipliers",
          intensity: 0.7,
        },
        {
          toNode: "institutions",
          effect: "Erodes reform capacity",
          intensity: 0.6,
        },
      ],
      color: "#F59E0B",
      structuralType: "drift",
    },
    {
      id: "markets",
      label: "Markets",
      axisTitle: "Shadow Market Creation",
      position: { x: 56, y: 15 }, // 4th in line
      structuralLogic:
        "Simulated constraint in formal systems shifts activity to semi-legal or off-ledger markets—fueling parallel economies and distorting true market signals.",
      shockingFact:
        "In the wake of SOE procurement simulation, shadow banking ballooned to 3x formal lending in Eastern Europe—mostly via shell vehicles.",
      dataPoint:
        "In environments with high regulatory arbitrage, shadow banking assets can reach 40% of GDP—up to 4x higher than reported official sector credit.",
      actionableOutput:
        "Map clause-induced shadow activity (e.g., shell company use); simulate scale of untraceable flows for each sector.",
      headline:
        "Structural corruption warps the playing field—creating shadow markets and parallel finance invisible to standard oversight.",
      domainCounter: {
        ratePerSecond: 12800,
        unit: "Business Deals Lost",
        displayFormat: "number",
      },
      facts: [
        { text: "Business costs rise 10%", source: "OECD", icon: "💼" },
        {
          text: "1 in 3 firms lose to bribing competitors",
          source: "World Bank",
          icon: "🤝",
        },
        { text: "Foreign investment drops 40%", source: "IMF", icon: "🌍" },
      ],
      timeline: [
        {
          step: "Tender rigged",
          description: "Contracts awarded illegally",
          icon: "📋",
        },
        {
          step: "Unqualified winner",
          description: "Project given to incapable bidder",
          icon: "⚠️",
        },
        {
          step: "Project fails",
          description: "Infrastructure collapses, jobs lost",
          icon: "���",
        },
      ],
      microCase: {
        text: "Southeast Asia: Infrastructure collapse due to corrupt tenders, 1M jobs lost.",
        source: "ADB",
      },
      propagation: [
        {
          toNode: "economy",
          effect: "Distorts market signals",
          intensity: 0.8,
        },
        {
          toNode: "trust",
          effect: "Undermines market confidence",
          intensity: 0.7,
        },
        {
          toNode: "institutions",
          effect: "Bypasses formal systems",
          intensity: 0.9,
        },
      ],
      color: "#3B82F6",
      structuralType: "shadow",
    },
    {
      id: "environment",
      label: "Environment",
      axisTitle: "Oversight Simulation & Evasion",
      position: { x: 72, y: 15 }, // 5th in line
      structuralLogic:
        "Superficial transparency and audit processes simulate control but function as self-cancelling rituals, enabling 'clean' compliance data to mask structural rot.",
      shockingFact:
        "Over 90% of ESG funds reviewed by Vigilum passed formal screens—while 1 in 4 failed independent conflict-of-interest checks.",
      dataPoint:
        "95% of EU in-house procurement contracts that failed external audit had passed internal compliance review with no flags.",
      actionableOutput:
        "Model overlap between compliance optics and actual risk; surface nodes with repeated 'clean' audit cycles but unresolved financial anomalies.",
      headline:
        "'Green' or 'ethical' oversight is often formatted to deflect scrutiny, not enforce constraint.",
      domainCounter: {
        ratePerSecond: 950,
        unit: "Hectares Destroyed",
        displayFormat: "number",
      },
      facts: [
        {
          text: "50% of illegal logging enabled by corruption",
          source: "UNODC",
          icon: "🌳",
        },
        {
          text: "Disaster relief funds diverted",
          source: "World Bank",
          icon: "🌪️",
        },
        { text: "Climate targets missed by 60%", source: "UNEP", icon: "🌡️" },
      ],
      timeline: [
        {
          step: "Permit bought",
          description: "Illegal logging authorized",
          icon: "📄",
        },
        {
          step: "Forest destroyed",
          description: "Biodiversity lost forever",
          icon: "🌲",
        },
        {
          step: "Climate impact",
          description: "Global consequences accelerate",
          icon: "🌍",
        },
      ],
      microCase: {
        text: "Indonesia: Corrupt permitting led to massive rainforest destruction.",
        source: "Global Forest Watch",
      },
      propagation: [
        {
          toNode: "institutions",
          effect: "Reinforces compliance inversion",
          intensity: 0.85,
        },
        {
          toNode: "trust",
          effect: "Erodes environmental trust",
          intensity: 0.6,
        },
        { toNode: "markets", effect: "Enables shadow flows", intensity: 0.7 },
      ],
      color: "#8B5CF6",
      structuralType: "simulation",
    },
    {
      id: "trust",
      label: "Trust & Security",
      axisTitle: "Systemic Trust Collapse",
      position: { x: 80, y: 15 }, // 6th in line
      structuralLogic:
        "As extraction, simulation, and behavioral drift reinforce each other, trust becomes structurally uncomputable—leading to capital flight, governance disintegration, or legitimacy crises.",
      shockingFact:
        "In markets where anti-corruption action was purely symbolic, FDI inflows collapsed by 67% in 24 months following a major scandal.",
      dataPoint:
        "After repeated corruption scandals with no high-level convictions, Lithuania's public trust in national government dropped from 56% to 21% in four years—mirrored by a 5x increase in non-performing loans and youth emigration.",
      actionableOutput:
        "Surface early-warning signals for systemic collapse: simultaneous audit failures, market outflows, and rising regulatory amendments in a 12-month period.",
      headline:
        "Trust isn't just perception—it's a structural property that can be modeled and lost.",
      domainCounter: {
        ratePerSecond: 240,
        unit: "Refugees Created",
        displayFormat: "number",
      },
      facts: [
        {
          text: "Corruption predicts willingness to migrate",
          source: "UNDP",
          icon: "🚶",
        },
        { text: "Security forces compromised", source: "UNODC", icon: "🛡️" },
        {
          text: "Civil conflict risk doubles",
          source: "World Bank",
          icon: "⚔️",
        },
      ],
      timeline: [
        {
          step: "Security bribed",
          description: "Border control fails",
          icon: "🚨",
        },
        {
          step: "Control lost",
          description: "Institutional collapse begins",
          icon: "🏗️",
        },
        {
          step: "Instability spreads",
          description: "Regional consequences cascade",
          icon: "🌊",
        },
      ],
      microCase: {
        text: "Afghanistan: Systemic corruption led to institutional collapse.",
        source: "SIGAR",
      },
      propagation: [
        {
          toNode: "economy",
          effect: "Triggers capital flight",
          intensity: 0.9,
        },
        {
          toNode: "institutions",
          effect: "Accelerates legitimacy crisis",
          intensity: 0.95,
        },
        {
          toNode: "inequality",
          effect: "Deepens social breakdown",
          intensity: 0.8,
        },
        {
          toNode: "markets",
          effect: "Collapses market confidence",
          intensity: 0.85,
        },
      ],
      color: "#EF4444",
      structuralType: "collapse",
    },
  ],
};

// Enhanced connection line with propagation animations
const ConnectionLine = ({
  fromNode,
  toNode,
  isActive,
  visited,
  isPropagating,
}) => {
  const fromX = fromNode.position.x;
  const fromY = fromNode.position.y;
  const toX = toNode.position.x;
  const toY = toNode.position.y;

  // Calculate the actual distance in percentage units
  const deltaX = toX - fromX;
  const deltaY = toY - fromY;
  const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;

  return (
    <div
      style={{
        position: "absolute",
        left: `${fromX}%`,
        top: `${fromY}%`,
        width: `${length}%`,
        height: "2px",
        background: isPropagating
          ? `linear-gradient(90deg, ${fromNode.color}, ${toNode.color})`
          : isActive
            ? `linear-gradient(90deg, ${fromNode.color}60, ${toNode.color}60)`
            : visited
              ? `linear-gradient(90deg, ${fromNode.color}30, ${toNode.color}30)`
              : "rgba(157, 230, 198, 0.2)",
        transformOrigin: "0 50%",
        transform: `rotate(${angle}deg)`,
        transition: "all 0.6s ease",
        zIndex: 5,
        borderRadius: "1px",
        boxShadow: isPropagating ? `0 0 8px ${fromNode.color}40` : "none",
      }}
    >
      {isPropagating && (
        <motion.div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: fromNode.color,
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            boxShadow: `0 0 8px ${fromNode.color}`,
          }}
          animate={{
            left: ["0%", "100%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
};

// Enhanced network node with full container functionality
const NetworkNode = ({
  node,
  isActive,
  isVisited,
  onActivate,
  isPropagationTarget,
  userPath,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [nodeCounter, setNodeCounter] = useState(0);

  useEffect(() => {
    if (node.domainCounter && isActive) {
      const interval = setInterval(() => {
        setNodeCounter((prev) => prev + node.domainCounter.ratePerSecond);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isActive, node.domainCounter]);

  const nodeStyle = {
    position: "absolute" as const,
    left: `${node.position.x}%`,
    top: `${node.position.y}%`,
    transform: "translate(-50%, -50%)",
    width: isActive ? "160px" : "120px",
    height: isActive ? "160px" : "120px",
    borderRadius: "50%",
    background: isActive
      ? `radial-gradient(circle at 30% 30%, ${node.color}70, ${node.color}40, ${node.color}20)`
      : isVisited
        ? `radial-gradient(circle at 30% 30%, ${node.color}50, ${node.color}30, ${node.color}15)`
        : isPropagationTarget
          ? `radial-gradient(circle at 30% 30%, ${node.color}45, ${node.color}25, ${node.color}12)`
          : `radial-gradient(circle at 30% 30%, ${node.color}40, ${node.color}25, ${node.color}10)`,
    border: `2px solid ${node.color}40`,
    cursor: "pointer",
    backdropFilter: "blur(10px)",
    animation: isActive
      ? "sphereGlow 2s ease-in-out infinite"
      : isPropagationTarget
        ? "sphereGlow 3s ease-in-out infinite"
        : "sphereGlow 4s ease-in-out infinite",
    boxShadow: isActive
      ? `0 0 60px ${node.color}80,
         0 0 120px ${node.color}60,
         0 0 180px ${node.color}40,
         0 8px 16px rgba(0, 0, 0, 0.3),
         inset 0 1px 0 rgba(255, 255, 255, 0.3)`
      : isHovered
        ? `0 0 40px ${node.color}70,
          0 0 80px ${node.color}50,
          0 0 120px ${node.color}30,
          0 12px 48px rgba(0, 0, 0, 0.3),
          0 6px 24px rgba(0, 0, 0, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.25),
          inset 0 -1px 0 rgba(0, 0, 0, 0.15)
        `
        : isPropagationTarget
          ? `
            0 0 50px ${node.color}60,
            0 0 100px ${node.color}40,
            0 0 150px ${node.color}25,
            0 8px 32px rgba(0, 0, 0, 0.25),
            0 4px 16px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1)
          `
          : `
            0 0 30px ${node.color}50,
            0 0 60px ${node.color}30,
            0 0 90px ${node.color}20,
            0 6px 24px rgba(0, 0, 0, 0.2),
            0 3px 12px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.15),
            inset 0 -1px 0 rgba(0, 0, 0, 0.05)
          `,
    zIndex: isActive ? 30 : isHovered ? 25 : isPropagationTarget ? 20 : 15,
  };

  const pathIndex = userPath.indexOf(node.id);
  const showPathNumber = pathIndex !== -1;

  return (
    <motion.div
      style={nodeStyle}
      onClick={() => onActivate(node.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        scale: isActive
          ? 1.15
          : isHovered
            ? 1.08
            : isPropagationTarget
              ? 1.03
              : 1,
        rotateY: isHovered ? 2 : 0,
        rotateX: isActive ? -2 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.8,
        duration: 0.6,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          textAlign: "center",
          position: "relative",
        }}
      >
        {showPathNumber && (
          <div
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: node.color,
              color: "#FFFFFF",
              fontSize: "12px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 12px ${node.color}60`,
            }}
          >
            {pathIndex + 1}
          </div>
        )}

        <div
          style={{
            fontSize: isActive ? "14px" : "12px",
            fontWeight: "600",
            color: "#FFFFFF",
            marginBottom: isActive ? "4px" : "2px",
            fontFamily: "var(--font-display)",
            lineHeight: "1.1",
            textAlign: "center",
          }}
        >
          {node.axisTitle || node.label}
        </div>

        {isActive && node.domainCounter && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              fontSize: "12px",
              color: node.color,
              fontFamily: "monospace",
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            {node.domainCounter.displayFormat === "currency"
              ? `$${nodeCounter.toLocaleString()}`
              : `${nodeCounter.toLocaleString()} ${node.domainCounter.unit}`}
          </motion.div>
        )}

        {isPropagationTarget && !isActive && (
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              fontSize: "12px",
              color: node.color,
              fontWeight: "500",
              marginTop: "4px",
            }}
          >
            Explore
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// Node detail modal with timeline and micro-case
const NodeDetailModal = ({ node, onClose, userPath }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [nodeCounter, setNodeCounter] = useState(0);

  useEffect(() => {
    if (node?.domainCounter) {
      const interval = setInterval(() => {
        setNodeCounter((prev) => prev + node.domainCounter.ratePerSecond);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [node]);

  useEffect(() => {
    if (node?.timeline) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => (prev + 1) % node.timeline.length);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, node]);

  if (!node) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(8px)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "rgba(0, 0, 0, 0.95)",
            backdropFilter: "blur(20px)",
            border: `2px solid ${node.color}40`,
            borderRadius: "24px",
            padding: "32px",
            maxWidth: "600px",
            width: "100%",
            maxHeight: "80vh",
            overflowY: "auto",
            position: "relative",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "transparent",
              border: "none",
              color: "#9CA3AF",
              cursor: "pointer",
              fontSize: "20px",
              padding: "8px",
            }}
          >
            ✕
          </button>

          {/* Header */}
          <div style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "700",
                color: node.color,
                margin: "0 0 20px 0",
                fontFamily: "var(--font-display)",
                textAlign: "left",
                letterSpacing: "0.5px",
              }}
            >
              {node.axisTitle}
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#E5E5E5",
                fontWeight: "400",
                lineHeight: "1.5",
                margin: "0 0 16px 0",
              }}
            >
              {node.structuralLogic}
            </p>
            <div
              style={{
                padding: "12px 16px",
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "8px",
                borderLeft: `4px solid ${node.color}`,
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  color: "#FFFFFF",
                  fontWeight: "500",
                  margin: "0",
                  fontStyle: "italic",
                }}
              >
                💥 {node.shockingFact}
              </p>
            </div>
          </div>

          {/* Live Counter */}
          {node.domainCounter && (
            <div
              style={{
                background: `${node.color}20`,
                border: `1px solid ${node.color}40`,
                borderRadius: "16px",
                padding: "24px",
                marginBottom: "32px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: "700",
                  color: node.color,
                  fontFamily: "monospace",
                  marginBottom: "8px",
                }}
              >
                {node.domainCounter.displayFormat === "currency"
                  ? `$${nodeCounter.toLocaleString()}`
                  : `${nodeCounter.toLocaleString()}`}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#E5E5E5",
                  fontWeight: "500",
                }}
              >
                {node.domainCounter.label || node.domainCounter.unit} since you
                started exploring
              </div>
            </div>
          )}

          {/* Sample Data Point */}
          {node.dataPoint && (
            <div
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: `1px solid ${node.color}30`,
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "24px",
              }}
            >
              <h4
                style={{
                  fontSize: "14px",
                  color: node.color,
                  margin: "0 0 8px 0",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                📊 Sample Data Point
              </h4>
              <p
                style={{
                  fontSize: "14px",
                  color: "#E5E5E5",
                  margin: "0",
                  lineHeight: "1.4",
                }}
              >
                {node.dataPoint}
              </p>
            </div>
          )}

          {/* Actionable Output */}
          {node.actionableOutput && (
            <div
              style={{
                background: `${node.color}08`,
                border: `1px solid ${node.color}25`,
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "32px",
              }}
            >
              <h4
                style={{
                  fontSize: "14px",
                  color: node.color,
                  margin: "0 0 8px 0",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                🎯 Vigilum Output
              </h4>
              <p
                style={{
                  fontSize: "14px",
                  color: "#FFFFFF",
                  margin: "0",
                  lineHeight: "1.4",
                  fontWeight: "500",
                }}
              >
                {node.actionableOutput}
              </p>
            </div>
          )}

          {/* Timeline Animation */}
          <div
            style={{
              marginBottom: "32px",
              background: "rgba(255, 255, 255, 0.02)",
              borderRadius: "16px",
              padding: "24px",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                color: "#9DE6C6",
                margin: "0 0 20px 0",
                fontWeight: "600",
              }}
            >
              Process Timeline
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
              }}
            >
              {node.timeline.map((step, index) => (
                <motion.div
                  key={index}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    opacity: index <= currentStep ? 1 : 0.3,
                    transform: index <= currentStep ? "scale(1)" : "scale(0.9)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      fontSize: "24px",
                      marginBottom: "8px",
                    }}
                  >
                    {step.icon}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: index <= currentStep ? node.color : "#9CA3AF",
                      marginBottom: "4px",
                    }}
                  >
                    {step.step}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#9CA3AF",
                      lineHeight: "1.3",
                    }}
                  >
                    {step.description}
                  </div>
                  {index < node.timeline.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        right: "-12px",
                        top: "20px",
                        fontSize: "16px",
                        color: index < currentStep ? node.color : "#9CA3AF",
                      }}
                    >
                      →
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Facts */}
          <div style={{ marginBottom: "32px" }}>
            <h3
              style={{
                fontSize: "18px",
                color: "#9DE6C6",
                margin: "0 0 16px 0",
                fontWeight: "600",
              }}
            >
              Key Facts
            </h3>
            {node.facts.map((fact, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  marginBottom: "16px",
                  padding: "12px",
                  background: "rgba(255, 255, 255, 0.02)",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                    marginTop: "2px",
                  }}
                >
                  {fact.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <span
                    style={{
                      fontSize: "16px",
                      color: "#E5E5E5",
                      fontWeight: "500",
                      lineHeight: "1.4",
                    }}
                  >
                    {fact.text}
                  </span>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#9CA3AF",
                      marginTop: "4px",
                      fontStyle: "italic",
                    }}
                  >
                    Source: {fact.source}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Micro-case */}
          <div
            style={{
              background: `${node.color}10`,
              border: `1px solid ${node.color}30`,
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "24px",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                color: node.color,
                margin: "0 0 12px 0",
                fontWeight: "600",
              }}
            >
              Real-World Case
            </h3>
            <p
              style={{
                fontSize: "16px",
                color: "#E5E5E5",
                lineHeight: "1.5",
                margin: "0 0 8px 0",
              }}
            >
              {node.microCase.text}
            </p>
            <div
              style={{
                fontSize: "12px",
                color: "#9CA3AF",
                fontStyle: "italic",
              }}
            >
              Source: {node.microCase.source}
            </div>
          </div>

          {/* Propagation Effects */}
          <div>
            <h3
              style={{
                fontSize: "16px",
                color: "#9DE6C6",
                margin: "0 0 16px 0",
                fontWeight: "600",
              }}
            >
              This Leads To
            </h3>
            {node.propagation.map((prop, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "12px",
                  padding: "12px",
                  background: "rgba(157, 230, 198, 0.05)",
                  borderRadius: "8px",
                  border: "1px solid rgba(157, 230, 198, 0.1)",
                }}
              >
                <div
                  style={{
                    fontSize: "16px",
                    color: "#9DE6C6",
                  }}
                >
                  →
                </div>
                <div>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#9DE6C6",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {
                      impactNetworkData.nodes.find((n) => n.id === prop.toNode)
                        ?.label
                    }
                    :
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#E5E5E5",
                      marginLeft: "8px",
                    }}
                  >
                    {prop.effect}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Path visualization component
const UserPathVisualization = ({ userPath, nodes }) => {
  if (userPath.length < 2) return null;

  return (
    <>
      {userPath.slice(0, -1).map((nodeId, index) => {
        const fromNode = nodes.find((n) => n.id === nodeId);
        const toNode = nodes.find((n) => n.id === userPath[index + 1]);
        if (!fromNode || !toNode) return null;

        const fromX = fromNode.position.x;
        const fromY = fromNode.position.y;
        const toX = toNode.position.x;
        const toY = toNode.position.y;

        const length = Math.sqrt(
          Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2),
        );
        const angle = (Math.atan2(toY - fromY, toX - fromX) * 180) / Math.PI;

        return (
          <motion.div
            key={`path-${index}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            style={{
              position: "absolute",
              left: `${fromX}%`,
              top: `${fromY}%`,
              width: `${length}%`,
              height: "4px",
              background: `linear-gradient(90deg, ${fromNode.color}, ${toNode.color})`,
              transformOrigin: "0 50%",
              transform: `rotate(${angle}deg)`,
              zIndex: 25,
              borderRadius: "2px",
              boxShadow: `0 0 16px ${fromNode.color}60`,
            }}
          />
        );
      })}
    </>
  );
};

// System shockwave component
const SystemShockwave = ({ nodes, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <>
      {nodes.map((node, index) => (
        <motion.div
          key={`shockwave-${node.id}`}
          style={{
            position: "absolute",
            left: `${node.position.x}%`,
            top: `${node.position.y}%`,
            transform: "translate(-50%, -50%)",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            border: `3px solid ${node.color}`,
            pointerEvents: "none",
            zIndex: 40,
          }}
          animate={{
            scale: [1, 3, 1],
            opacity: [0.8, 0.2, 0.8],
          }}
          transition={{
            duration: 1,
            delay: index * 0.1,
            repeat: 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
};

// Final summary overlay
const FinalSummaryOverlay = ({ totalLoss, userPath, onClose }) => {
  const pathNames = userPath
    .map(
      (nodeId) => impactNetworkData.nodes.find((n) => n.id === nodeId)?.label,
    )
    .join(" → ");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.95)",
        backdropFilter: "blur(12px)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "rgba(0, 0, 0, 0.9)",
          border: "2px solid rgba(157, 230, 198, 0.3)",
          borderRadius: "24px",
          padding: "48px",
          maxWidth: "800px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "36px",
            fontWeight: "700",
            color: "#9DE6C6",
            margin: "0 0 24px 0",
            fontFamily: "var(--font-display)",
          }}
        >
          System Analysis Complete
        </h2>

        <div
          style={{
            fontSize: "48px",
            fontWeight: "700",
            color: "#DC2626",
            fontFamily: "monospace",
            marginBottom: "16px",
          }}
        >
          ${totalLoss.toLocaleString()}
        </div>

        <p
          style={{
            fontSize: "18px",
            color: "#E5E5E5",
            marginBottom: "32px",
            lineHeight: "1.6",
          }}
        >
          Lost to corruption while you explored the network.
        </p>

        <div
          style={{
            background: "rgba(157, 230, 198, 0.1)",
            border: "1px solid rgba(157, 230, 198, 0.2)",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "32px",
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              color: "#9DE6C6",
              margin: "0 0 16px 0",
              fontWeight: "600",
            }}
          >
            Your Path Through the System
          </h3>
          <p
            style={{
              fontSize: "16px",
              color: "#E5E5E5",
              margin: "0 0 16px 0",
            }}
          >
            {pathNames}
          </p>
          <p
            style={{
              fontSize: "14px",
              color: "#9CA3AF",
              margin: "0",
              fontStyle: "italic",
            }}
          >
            This sequence reflects real patterns of structural damage worldwide.
          </p>
        </div>

        <div
          style={{
            background: "rgba(220, 38, 38, 0.1)",
            border: "1px solid rgba(220, 38, 38, 0.2)",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "32px",
          }}
        >
          <h3
            style={{
              fontSize: "24px",
              color: "#DC2626",
              margin: "0 0 16px 0",
              fontWeight: "600",
            }}
          >
            This is not a list. It is a map of extraction.
          </h3>
          <p
            style={{
              fontSize: "18px",
              color: "#E5E5E5",
              lineHeight: "1.6",
              margin: "0",
            }}
          >
            Corruption's damage is never isolated—it is cumulative, structural,
            and always systemic. Every node you explored is both a source and an
            effect in the recursive system of harm.
          </p>
        </div>

        <button
          onClick={onClose}
          style={{
            background: "linear-gradient(135deg, #9DE6C6, #059669)",
            border: "none",
            borderRadius: "12px",
            padding: "16px 32px",
            fontSize: "16px",
            fontWeight: "600",
            color: "#000",
            cursor: "pointer",
            textTransform: "uppercase",
            letterSpacing: "1px",
            transition: "all 0.3s ease",
          }}
        >
          Simulate the Clauses that Produce These Outcomes
        </button>
      </motion.div>
    </motion.div>
  );
};

// Main component
const StructuralImpactMap = ({
  onNavigate,
  showGlobalCount = false,
  showFloatingNav,
  isMainNavOpen,
  selectedButton,
  setSelectedButton,
  setVisitedSections,
}) => {
  const [activeNode, setActiveNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState(new Set());
  const [selectedNode, setSelectedNode] = useState(null);
  const [globalLoss, setGlobalLoss] = useState(0);
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const [userPath, setUserPath] = useState([]);
  const [propagatingConnections, setPropagatingConnections] = useState(
    new Set(),
  );
  const [propagationTargets, setPropagationTargets] = useState(new Set());
  const [showSystemShockwave, setShowSystemShockwave] = useState(false);
  const [showFinalSummary, setShowFinalSummary] = useState(false);

  const nodes = impactNetworkData.nodes;

  // Global loss counter
  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalLoss((prev) => prev + 31666); // $1.9M per minute = ~$31,666 per second
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle node activation
  const handleNodeActivate = (nodeId) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;

    setActiveNode(nodeId);
    setSelectedNode(node);
    setVisitedNodes((prev) => new Set([...prev, nodeId]));
    setUserPath((prev) => [...prev, nodeId]);

    // Clear previous propagation state
    setPropagatingConnections(new Set());
    setPropagationTargets(new Set());

    // Set up propagation effects
    const newPropagatingConnections = new Set();
    const newPropagationTargets = new Set();

    node.propagation.forEach((prop) => {
      newPropagatingConnections.add(`${nodeId}-${prop.toNode}`);
      newPropagationTargets.add(prop.toNode);
    });

    // Animate propagation with delay
    setTimeout(() => {
      setPropagatingConnections(newPropagatingConnections);
      setPropagationTargets(newPropagationTargets);
    }, 500);
  };

  // Check if all nodes have been visited
  useEffect(() => {
    if (visitedNodes.size === nodes.length && !showSystemShockwave) {
      setShowSystemShockwave(true);
    }
  }, [visitedNodes, nodes.length, showSystemShockwave]);

  const handleShockwaveComplete = () => {
    setShowSystemShockwave(false);
    setShowFinalSummary(true);
  };

  // Generate all possible connections (full mesh)
  const allConnections = [];
  nodes.forEach((fromNode, i) => {
    nodes.slice(i + 1).forEach((toNode) => {
      allConnections.push({ fromNode, toNode });
    });
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          @keyframes sphereGlow {
            0%, 100% {
              filter: brightness(1) saturate(1);
            }
            50% {
              filter: brightness(1.1) saturate(1.2);
            }
          }
        `}</style>

      {/* Header */}
      <div
        style={{
          textAlign: "left",
          marginBottom: "60px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "12px",
          }}
        >
          <div style={{ maxWidth: "70%" }}>
            <h2 className="text-4xl font-semibold text-green-400 mb-3 font-display">
              Corruption Impact Topology
            </h2>
            <p className="text-lg text-white mb-2 italic font-light">
              What appears as isolated harm is, in fact, systemic propagation.
            </p>
            <p className="text-base text-gray-300 mb-0 leading-relaxed">
              Examine how design-level risk migrates across the economy,
              institutions, and public trust,
              <br />
              producing consequences that outpace any single event.
            </p>
          </div>

          {/* Navigation Button - positioned on right side next to heading */}
          {showFloatingNav && !isMainNavOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginTop: "8px",
              }}
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
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 border"
                style={{
                  backgroundColor: "transparent",
                  color: "#9DE6C6",
                  borderColor: "rgba(157, 230, 198, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(157, 230, 198, 0.1)";
                  e.currentTarget.style.borderColor = "#9DE6C6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor =
                    "rgba(157, 230, 198, 0.3)";
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
        </div>

        {/* Global Live Ticker - rendered via portal for immediate positioning */}
        {showGlobalCount &&
          createPortal(
            <div
              style={{
                position: "fixed",
                top: "80px",
                right: "20px",
                backdropFilter: "blur(20px) saturate(180%)",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "4px",
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 2px 8px 0px, rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset",
                padding: "8px 12px",
                zIndex: 1000,
                minWidth: "200px",
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
      </div>

      {/* Network Visualization */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "450px",
          maxWidth: "1000px",
          margin: "20px auto 0 auto",
          padding: "40px",
          boxSizing: "border-box",
        }}
      >

        {/* Nodes */}
        {nodes.map((node) => (
          <NetworkNode
            key={node.id}
            node={node}
            isActive={activeNode === node.id}
            isVisited={visitedNodes.has(node.id)}
            onActivate={handleNodeActivate}
            isPropagationTarget={propagationTargets.has(node.id)}
            userPath={userPath}
          />
        ))}

        {/* System Shockwave */}
        {showSystemShockwave && (
          <SystemShockwave nodes={nodes} onComplete={handleShockwaveComplete} />
        )}
      </div>

      {/* Node Detail Modal */}
      <NodeDetailModal
        node={selectedNode}
        onClose={() => {
          setSelectedNode(null);
          setActiveNode(null);
          setPropagatingConnections(new Set());
          setPropagationTargets(new Set());
        }}
        userPath={userPath}
      />

      {/* Final Summary Overlay */}
      {showFinalSummary && (
        <FinalSummaryOverlay
          totalLoss={globalLoss}
          userPath={userPath}
          onClose={() => setShowFinalSummary(false)}
        />
      )}
    </div>
  );
};

export default StructuralImpactMap;
