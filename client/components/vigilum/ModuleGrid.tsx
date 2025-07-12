import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye,
  Search,
  Shield,
  Network,
  Activity,
  BarChart3,
  MessageCircle,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DecryptedText from "../ui/DecryptedText";

const modules = [
  {
    id: "clavis",
    name: "CLAVIS",
    subtitle: "Clause Intelligence Engine",
    tagline: "Structure discloses intent.",
    description:
      "Parses legal clauses to detect embedded risk logic, exposing how contracts simulate legality while shifting liability.",
    color: "#1a3d82",
    secondaryColor: "#1e40af",
    textColor: "#dce3f7",
    accentColor: "#60a5fa",
    icon: Search,
    glyph: "ϕ",
    status: "OPERATIONAL",
    typologyFocus: ["DG", "CI"],
    riskFingerprint: 0.91,
  },
  {
    id: "obscura",
    name: "OBSCURA",
    subtitle: "Procurement Distortion Detector",
    tagline: "Procedures conceal design.",
    description:
      "Flags tenders pre-structured for capture—compressed timelines, single-bid dominance, or emergency justification misuse.",
    color: "#941b1b",
    secondaryColor: "#b91c1c",
    textColor: "#f1d1d1",
    accentColor: "#f87171",
    icon: Eye,
    glyph: "⊗",
    status: "ACTIVE",
    typologyFocus: ["RT", "SB"],
    riskFingerprint: 0.74,
  },
  {
    id: "nullum",
    name: "NULLUM",
    subtitle: "Judicial Stalling Detector",
    tagline: "Delay disarms enforcement.",
    description:
      "Detects legal stalling patterns—timeline collapse, expiration clustering, and procedural bypass that dissolve accountability.",
    color: "#1e232b",
    secondaryColor: "#1f2937",
    textColor: "#9ca3af",
    accentColor: "#9ca3af",
    icon: Shield,
    glyph: "Δ",
    status: "MONITORING",
    typologyFocus: ["OD", "RT"],
    riskFingerprint: 0.22,
  },
  {
    id: "nexus-potentia",
    name: "NEXUS POTENTIA",
    subtitle: "Political Graph Mapper",
    tagline: "Influence is relational.",
    description:
      "Maps hidden networks, revolving doors, and control clusters behind awards using recursive relationship inference.",
    color: "#4e27a6",
    secondaryColor: "#6d28d9",
    textColor: "#ded1f7",
    accentColor: "#a78bfa",
    icon: Network,
    glyph: "λ",
    status: "OPERATIONAL",
    typologyFocus: ["DG", "SB"],
    riskFingerprint: 0.85,
  },
  {
    id: "vigilo-core",
    name: "VIGILO CORE",
    subtitle: "Signal Integrator",
    tagline: "Exposure emerges in pattern.",
    description:
      "Unifies all module outputs into a structural risk map. Triggers escalation when latent design risk reaches systemic visibility.",
    color: "#035e4a",
    secondaryColor: "#047857",
    textColor: "#c0f1e4",
    accentColor: "#34d399",
    icon: Activity,
    glyph: "Σ",
    status: "OPERATIONAL",
    typologyFocus: ["ALL"],
    riskFingerprint: 0.96,
  },
  {
    id: "veris",
    name: "VERIS",
    subtitle: "Structural Risk Index",
    tagline: "Integrity becomes quantifiable.",
    description:
      "Aggregates all risk vectors into a composite signal score—quantifying governance fragility across entities, tenders, and time.",
    color: "#a65800",
    secondaryColor: "#b45309",
    textColor: "#f5d199",
    accentColor: "#fbbf24",
    icon: BarChart3,
    glyph: "τ",
    status: "ESCALATED",
    typologyFocus: ["ALL"],
    riskFingerprint: 0.92,
  },
  {
    id: "sentium",
    name: "SENTIUM",
    subtitle: "Civic Signal Channel",
    tagline: "Witness becomes signal.",
    description:
      "Encrypts civic reporting and cross-validates with AI-detected risks. Turns whistleblower input into structural triangulation.",
    color: "#036373",
    secondaryColor: "#0e7490",
    textColor: "#a2e9f5",
    accentColor: "#22d3ee",
    icon: MessageCircle,
    glyph: "Ω",
    status: "MONITORING",
    typologyFocus: ["CI", "OD"],
    riskFingerprint: 0.67,
  },
  {
    id: "unallocated",
    name: "UNALLOCATED MODULE",
    subtitle: "Awaiting activation",
    tagline: "Future cognition reserved.",
    description:
      "Semantic engine slot reserved for future pattern detection system. Vigilum expansion capacity maintained.",
    color: "#1c1c1c",
    secondaryColor: "#2a2a2a",
    textColor: "#6b7280",
    accentColor: "#4b5563",
    icon: HelpCircle,
    glyph: "∅",
    status: "OFFLINE",
    typologyFocus: ["RESERVED"],
    riskFingerprint: 0,
    isPhantom: true,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "OPERATIONAL":
      return "#34d399";
    case "MONITORING":
      return "#facc15";
    case "ACTIVE":
      return "#3b82f6";
    case "ESCALATED":
      return "#f87171";
    case "OFFLINE":
      return "#374151";
    default:
      return "#9ca3af";
  }
};

const ModuleGrid = () => {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  return (
    <div className="py-20 px-4" style={{ backgroundColor: "#0E261D" }}>
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 mt-8">
          <motion.h2
            className="text-4xl lg:text-5xl font-bold mb-8 font-mono tracking-tight uppercase"
            style={{ color: "#B8D0C9" }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            CORE MODULES OVERVIEW
          </motion.h2>
        </div>

        {/* Module Grid - 2x4 responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {modules.map((module) => {
            const IconComponent = module.icon;
            const isHovered = hoveredModule === module.id;
            const isPhantom = module.isPhantom;

            return (
              <div
                key={module.id}
                className={`relative group transition-all duration-500 ease-out ${
                  isHovered && !isPhantom
                    ? "scale-105 z-10"
                    : isHovered && isPhantom
                      ? "scale-102"
                      : ""
                }`}
                onMouseEnter={() => setHoveredModule(module.id)}
                onMouseLeave={() => setHoveredModule(null)}
              >
                {/* Module Card */}
                <div
                  className={`relative backdrop-blur-lg border rounded-2xl p-6 h-full min-h-[420px] flex flex-col transition-all duration-500 ${
                    isPhantom ? "border-dashed" : ""
                  }`}
                  style={{
                    backgroundColor: isPhantom
                      ? "rgba(255,255,255,0.03)"
                      : `${module.color}20`,
                    borderColor:
                      isHovered && !isPhantom
                        ? module.accentColor
                        : isPhantom
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(255,255,255,0.1)",
                    boxShadow:
                      isHovered && !isPhantom
                        ? `inset 0 0 15px rgba(255,255,255,0.03), 0 0 6px ${module.accentColor}`
                        : isHovered && isPhantom
                          ? "inset 0 0 10px rgba(255,255,255,0.02)"
                          : "inset 0 0 0 1px rgba(255,255,255,0.05)",
                    background:
                      isHovered && !isPhantom
                        ? `radial-gradient(circle at top left, rgba(255,255,255,0.05), transparent),
                         radial-gradient(circle at bottom right, rgba(255,255,255,0.04), transparent),
                         ${module.color}20`
                        : isPhantom && isHovered
                          ? `radial-gradient(circle at top left, rgba(15,61,42,0.3), transparent),
                           radial-gradient(circle at bottom right, rgba(15,61,42,0.2), transparent),
                           rgba(255,255,255,0.03)`
                          : isPhantom
                            ? "rgba(255,255,255,0.03)"
                            : `${module.color}20`,
                  }}
                >
                  {/* Glyph */}
                  <div className="mb-4">
                    <div
                      className={`text-4xl font-bold transition-all duration-300 ${
                        isPhantom ? "opacity-50" : ""
                      }`}
                      style={{
                        color: module.accentColor,
                        textShadow:
                          isHovered && !isPhantom
                            ? `0 0 20px ${module.accentColor}`
                            : "none",
                      }}
                    >
                      {module.glyph}
                    </div>
                  </div>

                  {/* Module Info */}
                  <div className="flex-1 mb-6">
                    <h3
                      className={`text-xl font-bold mb-2 font-mono ${
                        isPhantom ? "opacity-70" : ""
                      }`}
                      style={{ color: module.textColor }}
                    >
                      {module.name}
                    </h3>
                    <p
                      className={`text-sm mb-3 ${isPhantom ? "opacity-60" : "opacity-80"}`}
                      style={{ color: module.textColor }}
                    >
                      {module.subtitle}
                    </p>
                    <p
                      className={`text-xs leading-relaxed mb-4 ${
                        isPhantom ? "opacity-50" : "opacity-70"
                      }`}
                      style={{ color: module.textColor }}
                    >
                      {module.description}
                    </p>

                    {/* Tagline */}
                    <p
                      className={`text-xs italic font-mono mb-4 ${
                        isPhantom ? "opacity-40" : ""
                      }`}
                      style={{ color: module.accentColor }}
                    >
                      "{module.tagline}"
                    </p>
                  </div>

                  {/* Analyze Button */}
                  {isPhantom ? (
                    <Button
                      disabled
                      className="w-full font-mono text-sm opacity-40 cursor-not-allowed"
                      style={{
                        backgroundColor: "#1f2937",
                        borderColor: "#374151",
                        color: "#6b7280",
                      }}
                    >
                      <span className="flex items-center justify-center gap-2">
                        COMING SOON
                        <HelpCircle className="w-4 h-4" />
                      </span>
                    </Button>
                  ) : (
                    <Link
                      to={`/module/${module.id}`}
                      onClick={() => {
                        // Scroll to top when navigating to module page
                        setTimeout(() => {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }, 100);
                      }}
                    >
                      <Button
                        className="w-full font-mono text-sm transition-all duration-300 group"
                        style={{
                          backgroundColor: module.color,
                          borderColor: module.accentColor,
                          color: module.textColor,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            module.secondaryColor;
                          e.currentTarget.style.boxShadow = `0 0 15px ${module.accentColor}40`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = module.color;
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <span className="flex items-center justify-center gap-2">
                          ANALYZE MODULE
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </Button>
                    </Link>
                  )}
                </div>

                {/* Hover Glow Effect */}
                {isHovered && !isPhantom && (
                  <div
                    className="absolute inset-0 rounded-2xl -z-10 blur-xl opacity-[0.375] transition-opacity duration-500"
                    style={{
                      backgroundColor: module.accentColor,
                    }}
                  />
                )}

                {/* Phantom Module Corner Pulse */}
                {isPhantom && isHovered && (
                  <div className="absolute inset-0 rounded-2xl -z-10 transition-opacity duration-500">
                    <div
                      className="absolute top-0 left-0 w-4 h-4 rounded-full blur-sm opacity-30 animate-pulse"
                      style={{ backgroundColor: "#0f3d2a" }}
                    />
                    <div
                      className="absolute bottom-0 right-0 w-4 h-4 rounded-full blur-sm opacity-20 animate-pulse"
                      style={{
                        backgroundColor: "#0f3d2a",
                        animationDelay: "0.5s",
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Navigation */}
        <div className="text-center">
          <p className="text-sm text-gray-400 font-mono">
            Each module operates as an autonomous semantic processor within the
            Vigilum cognitive environment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModuleGrid;
