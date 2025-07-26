import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced data model for the structural impact map
const impactNetworkData = {
  nodes: [
    {
      id: "economy",
      label: "Economy",
      position: { x: 50, y: 50 }, // Center node
      headline: "Every minute, corruption drains $1.9 million from the global economy.",
      live_counter: {
        start_value: 0,
        rate_per_second: 31666,
        unit: "USD",
        display_format: "currency"
      },
      facts: [
        { text: "Over $1 trillion lost annually", source: "World Bank", icon: "💰" },
        { text: "GDP growth up to 2% lower", source: "IMF", icon: "📉" },
        { text: "Investment falls by 20%", source: "WEF", icon: "📊" }
      ],
      case_timeline: [
        { title: "Bribe Paid", description: "Funds diverted from national budget", icon: "💸" },
        { title: "Project Collapses", description: "Infrastructure fails, jobs lost", icon: "🏗��" },
        { title: "Recession", description: "National growth stalls; recovery delayed", icon: "📉" }
      ],
      connections: ["inequality", "markets"],
      color: "#DC2626"
    },
    {
      id: "institutions",
      label: "Institutions",
      position: { x: 20, y: 20 },
      headline: "Corruption weakens law, derails justice, and erodes public legitimacy.",
      facts: [
        { text: "Law enforcement weakens, impunity rises", source: "UNODC", icon: "⚖️" },
        { text: "Trust in institutions 2–3x lower", source: "OECD", icon: "🏛️" }
      ],
      case_timeline: [
        { title: "Judge Bribed", description: "Legal system compromised", icon: "⚖️" },
        { title: "Reforms Blocked", description: "Progress stalls", icon: "🚫" },
        { title: "Rights Unprotected", description: "Citizens lose legal recourse", icon: "🛡️" }
      ],
      connections: ["trust", "inequality"],
      color: "#7C3AED"
    },
    {
      id: "inequality",
      label: "Inequality",
      position: { x: 80, y: 20 },
      headline: "Corruption widens the gap between rich and poor, excluding millions from essential services.",
      facts: [
        { text: "Public services cost up to 30% more", source: "Transparency International", icon: "💊" },
        { text: "Petty corruption hurts the poor most", source: "UNDP", icon: "👥" }
      ],
      case_timeline: [
        { title: "Health Bribe Demanded", description: "Payment required for basic care", icon: "🏥" },
        { title: "Patient Excluded", description: "Cannot afford treatment", icon: "❌" },
        { title: "Poverty Deepens", description: "Long-term exclusion from services", icon: "📉" }
      ],
      connections: ["economy", "institutions"],
      color: "#EA580C"
    },
    {
      id: "markets",
      label: "Markets",
      position: { x: 80, y: 80 },
      headline: "Corruption distorts markets, blocks fair competition, and repels honest business.",
      facts: [
        { text: "Business costs rise 10%", source: "OECD", icon: "💼" },
        { text: "1 in 3 firms lose to bribing competitors", source: "World Bank", icon: "🤝" }
      ],
      case_timeline: [
        { title: "Tender Rigged", description: "Contracts awarded illegally", icon: "📋" },
        { title: "Unqualified Winner", description: "Project given to incapable bidder", icon: "⚠️" },
        { title: "Market Failure", description: "System loses integrity", icon: "💔" }
      ],
      connections: ["economy", "trust"],
      color: "#059669"
    },
    {
      id: "environment",
      label: "Environment",
      position: { x: 20, y: 80 },
      headline: "Corruption undermines environmental protection and fuels human suffering.",
      facts: [
        { text: "50% of illegal logging enabled by corruption", source: "UNODC", icon: "🌳" },
        { text: "Disaster relief funds diverted", source: "World Bank", icon: "🌪️" }
      ],
      case_timeline: [
        { title: "Permit Bought", description: "Illegal logging authorized", icon: "📄" },
        { title: "Forest Destroyed", description: "Biodiversity lost", icon: "🌲" },
        { title: "Climate Impact", description: "Global consequences", icon: "🌍" }
      ],
      connections: ["trust", "economy"],
      color: "#16A34A"
    },
    {
      id: "trust",
      label: "Trust & Security",
      position: { x: 50, y: 10 },
      headline: "Corruption fuels distrust, migration, and global security threats.",
      facts: [
        { text: "Corruption predicts willingness to migrate", source: "Gallup", icon: "🚶" },
        { text: "Enables crime, laundering, terrorism", source: "FATF", icon: "🔒" }
      ],
      case_timeline: [
        { title: "Security Sector Bribed", description: "Protection compromised", icon: "🛡️" },
        { title: "Border Control Fails", description: "Illegal activity increases", icon: "🚪" },
        { title: "Instability", description: "Organized crime, social breakdown", icon: "⚡" }
      ],
      connections: ["institutions", "economy"],
      color: "#DC2626"
    }
  ]
};

const NetworkNode = ({ node, isActive, isVisited, onActivate, scale = 1 }) => {
  const [isHovered, setIsHovered] = useState(false);

  const nodeStyle = {
    position: "absolute" as const,
    left: `${node.position.x}%`,
    top: `${node.position.y}%`,
    transform: `translate(-50%, -50%) scale(${scale})`,
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    background: isActive
      ? `radial-gradient(circle, ${node.color}40, ${node.color}20)`
      : isVisited
        ? `radial-gradient(circle, ${node.color}20, ${node.color}10)`
        : "rgba(255, 255, 255, 0.05)",
    border: `2px solid ${isActive ? node.color : isVisited ? `${node.color}80` : "rgba(255, 255, 255, 0.1)"}`,
    cursor: "pointer",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
    boxShadow: isActive
      ? `0 0 30px ${node.color}60, 0 8px 32px rgba(0, 0, 0, 0.2)`
      : isHovered
        ? `0 0 20px ${node.color}40, 0 4px 16px rgba(0, 0, 0, 0.1)`
        : "0 4px 16px rgba(0, 0, 0, 0.1)",
    zIndex: isActive ? 20 : isHovered ? 15 : 10
  };

  return (
    <motion.div
      style={nodeStyle}
      onClick={() => onActivate(node.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        scale: isActive ? 1.2 : isHovered ? 1.1 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <div style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        textAlign: "center"
      }}>
        <div style={{
          fontSize: "18px",
          fontWeight: "600",
          color: "#FFFFFF",
          marginBottom: "4px",
          fontFamily: "var(--font-display)"
        }}>
          {node.label}
        </div>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              marginTop: "8px",
              padding: "4px 8px",
              background: "rgba(0, 0, 0, 0.8)",
              borderRadius: "4px",
              fontSize: "10px",
              color: "#FFFFFF",
              whiteSpace: "nowrap"
            }}
          >
            Click to explore
          </motion.div>
        )}
      </div>

      {/* Pulsing animation for active nodes */}
      {isActive && (
        <motion.div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: `1px solid ${node.color}`,
            pointerEvents: "none"
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 0, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  );
};

const ConnectionLine = ({ fromNode, toNode, isActive, visited }) => {
  const fromX = fromNode.position.x;
  const fromY = fromNode.position.y;
  const toX = toNode.position.x;
  const toY = toNode.position.y;

  const length = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
  const angle = Math.atan2(toY - fromY, toX - fromX) * 180 / Math.PI;

  return (
    <div
      style={{
        position: "absolute",
        left: `${fromX}%`,
        top: `${fromY}%`,
        width: `${length}%`,
        height: "2px",
        background: isActive
          ? `linear-gradient(90deg, ${fromNode.color}80, ${toNode.color}80)`
          : visited
            ? `linear-gradient(90deg, ${fromNode.color}40, ${toNode.color}40)`
            : "rgba(255, 255, 255, 0.1)",
        transformOrigin: "0 50%",
        transform: `rotate(${angle}deg)`,
        transition: "all 0.5s ease",
        zIndex: 5
      }}
    >
      {isActive && (
        <motion.div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: fromNode.color,
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)"
          }}
          animate={{
            left: ["0%", "100%", "0%"]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </div>
  );
};

const NodeDetailModal = ({ node, onClose }) => {
  const [currentCounter, setCurrentCounter] = useState(0);

  useEffect(() => {
    if (node?.live_counter) {
      const interval = setInterval(() => {
        setCurrentCounter(prev => prev + node.live_counter.rate_per_second);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [node]);

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
          background: "rgba(0, 0, 0, 0.9)",
          backdropFilter: "blur(10px)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px"
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            padding: "40px",
            maxWidth: "600px",
            width: "100%",
            maxHeight: "80vh",
            overflow: "auto"
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "transparent",
              border: "none",
              color: "#FFFFFF",
              fontSize: "24px",
              cursor: "pointer"
            }}
          >
            ✕
          </button>

          {/* Header */}
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{
              fontSize: "28px",
              fontWeight: "700",
              color: node.color,
              margin: "0 0 16px 0",
              fontFamily: "var(--font-display)"
            }}>
              {node.label}
            </h2>
            <p style={{
              fontSize: "18px",
              color: "#FFFFFF",
              fontWeight: "600",
              lineHeight: "1.4",
              margin: "0"
            }}>
              {node.headline}
            </p>
          </div>

          {/* Live Counter */}
          {node.live_counter && (
            <div style={{
              background: `${node.color}20`,
              border: `1px solid ${node.color}40`,
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "24px",
              textAlign: "center"
            }}>
              <div style={{
                fontSize: "32px",
                fontWeight: "700",
                color: node.color,
                fontFamily: "monospace"
              }}>
                ${currentCounter.toLocaleString()}
              </div>
              <div style={{
                fontSize: "14px",
                color: "#E5E5E5",
                marginTop: "4px"
              }}>
                Lost since you started exploring
              </div>
            </div>
          )}

          {/* Facts */}
          <div style={{ marginBottom: "24px" }}>
            {node.facts.map((fact, idx) => (
              <div key={idx} style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                marginBottom: "16px"
              }}>
                <div style={{
                  fontSize: "20px",
                  marginTop: "2px"
                }}>
                  {fact.icon}
                </div>
                <div>
                  <span style={{
                    fontSize: "16px",
                    color: "#E5E5E5",
                    fontWeight: "500"
                  }}>
                    {fact.text}
                  </span>
                  <span style={{
                    fontSize: "14px",
                    color: "#9CA3AF",
                    marginLeft: "8px",
                    fontStyle: "italic"
                  }}>
                    [{fact.source}]
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Case Timeline */}
          <div style={{
            background: "rgba(255, 255, 255, 0.02)",
            borderRadius: "12px",
            padding: "20px"
          }}>
            <h3 style={{
              fontSize: "18px",
              color: "#9DE6C6",
              margin: "0 0 16px 0",
              fontWeight: "600"
            }}>
              How Damage Spreads
            </h3>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative"
            }}>
              {node.case_timeline.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    flex: 1,
                    position: "relative"
                  }}
                >
                  <div style={{
                    fontSize: "24px",
                    marginBottom: "8px"
                  }}>
                    {step.icon}
                  </div>
                  <div style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#FFFFFF",
                    marginBottom: "4px"
                  }}>
                    {step.title}
                  </div>
                  <div style={{
                    fontSize: "12px",
                    color: "#9CA3AF",
                    lineHeight: "1.3"
                  }}>
                    {step.description}
                  </div>

                  {/* Arrow to next step */}
                  {idx < node.case_timeline.length - 1 && (
                    <div style={{
                      position: "absolute",
                      right: "-20px",
                      top: "20px",
                      fontSize: "16px",
                      color: node.color
                    }}>
                      →
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const CumulativeTally = ({ visitedNodes, totalLoss }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: visitedNodes > 0 ? 1 : 0, y: 0 }}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(157, 230, 198, 0.3)",
        borderRadius: "12px",
        padding: "16px 20px",
        zIndex: 100
      }}
    >
      <div style={{
        fontSize: "14px",
        color: "#9DE6C6",
        marginBottom: "4px"
      }}>
        While you explored
      </div>
      <div style={{
        fontSize: "20px",
        fontWeight: "700",
        color: "#FFFFFF",
        fontFamily: "monospace"
      }}>
        ${totalLoss.toLocaleString()}
      </div>
      <div style={{
        fontSize: "12px",
        color: "#9CA3AF"
      }}>
        lost to corruption
      </div>
    </motion.div>
  );
};

const StructuralImpactMap = () => {
  const [activeNode, setActiveNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState(new Set());
  const [selectedNode, setSelectedNode] = useState(null);
  const [globalLoss, setGlobalLoss] = useState(0);
  const [isIntroVisible, setIsIntroVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalLoss(prev => prev + 31666); // $1.9M per minute = ~$31,666 per second
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNodeActivate = (nodeId) => {
    const node = impactNetworkData.nodes.find(n => n.id === nodeId);
    setActiveNode(nodeId);
    setSelectedNode(node);
    setVisitedNodes(prev => new Set([...prev, nodeId]));
  };

  const nodes = impactNetworkData.nodes;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        position: "relative",
        background: "radial-gradient(circle at 50% 50%, #0F2F1F 0%, #0A1A0F 100%)",
        overflow: "hidden"
      }}
    >
      {/* Animated Background */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(157, 230, 198, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(157, 230, 198, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(157, 230, 198, 0.03) 0%, transparent 50%)
        `,
        animation: "float 20s ease-in-out infinite"
      }} />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "60px", position: "relative", zIndex: 10 }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: "700",
            color: "#9DE6C6",
            margin: "0 0 16px 0",
            fontFamily: "var(--font-display)",
            textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)"
          }}
        >
          Structural Impact Map
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: "18px",
            color: "#E5E5E5",
            maxWidth: "600px",
            margin: "0 auto 24px",
            lineHeight: "1.6"
          }}
        >
          Corruption is not isolated incidents—it's a living system of cascading harms.
          Explore how damage propagates across domains.
        </motion.p>

        {isIntroVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              background: "rgba(157, 230, 198, 0.1)",
              border: "1px solid rgba(157, 230, 198, 0.3)",
              borderRadius: "12px",
              padding: "16px 24px",
              display: "inline-block",
              fontSize: "14px",
              color: "#9DE6C6"
            }}
          >
            Click any node to explore its impacts and connections
            <button
              onClick={() => setIsIntroVisible(false)}
              style={{
                marginLeft: "12px",
                background: "transparent",
                border: "none",
                color: "#9DE6C6",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              ✕
            </button>
          </motion.div>
        )}
      </div>

      {/* Network Visualization */}
      <div style={{
        position: "relative",
        width: "100%",
        height: "500px",
        maxWidth: "800px",
        margin: "0 auto",
        background: "rgba(255, 255, 255, 0.02)",
        borderRadius: "20px",
        border: "1px solid rgba(255, 255, 255, 0.1)"
      }}>
        {/* Connection Lines */}
        {nodes.map(fromNode =>
          fromNode.connections.map(toNodeId => {
            const toNode = nodes.find(n => n.id === toNodeId);
            if (!toNode) return null;

            const isActive = activeNode === fromNode.id || activeNode === toNodeId;
            const visited = visitedNodes.has(fromNode.id) && visitedNodes.has(toNodeId);

            return (
              <ConnectionLine
                key={`${fromNode.id}-${toNodeId}`}
                fromNode={fromNode}
                toNode={toNode}
                isActive={isActive}
                visited={visited}
              />
            );
          })
        )}

        {/* Nodes */}
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <NetworkNode
              node={node}
              isActive={activeNode === node.id}
              isVisited={visitedNodes.has(node.id)}
              onActivate={handleNodeActivate}
            />
          </motion.div>
        ))}
      </div>

      {/* Cumulative Tally */}
      <CumulativeTally
        visitedNodes={visitedNodes.size}
        totalLoss={globalLoss}
      />

      {/* Node Detail Modal */}
      <NodeDetailModal
        node={selectedNode}
        onClose={() => {
          setSelectedNode(null);
          setActiveNode(null);
        }}
      />

      {/* Closing Statement */}
      {visitedNodes.size >= 6 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            textAlign: "center",
            marginTop: "80px",
            padding: "40px",
            background: "rgba(157, 230, 198, 0.05)",
            borderRadius: "20px",
            border: "1px solid rgba(157, 230, 198, 0.2)",
            maxWidth: "800px",
            margin: "80px auto 0"
          }}
        >
          <h3 style={{
            fontSize: "24px",
            color: "#9DE6C6",
            margin: "0 0 16px 0",
            fontWeight: "600"
          }}>
            This is not a list. It is a map of extraction.
          </h3>
          <p style={{
            fontSize: "18px",
            color: "#E5E5E5",
            lineHeight: "1.6",
            margin: "0"
          }}>
            Corruption's damage is never isolated—it is cumulative, structural, and always systemic.
            While you explored, the world lost ${globalLoss.toLocaleString()} to corruption.
          </p>
        </motion.div>
      )}


    </motion.div>
  );
};

export default StructuralImpactMap;
