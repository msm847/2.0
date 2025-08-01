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
    subtitle: "Clause Intelligence",
    tagline:
      "Each clause is abstracted into a typology-projected structural operator sequence.",
    description:
      "Decomposes contract syntax into risk operators, mapping override chains and embedding discretionary vector fields for logic-based risk detection.",
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
    subtitle: "Procurement Distortion",
    tagline:
      "Procurement is computed as a sequence of pre-encoded capture formats.",
    description:
      "Projects procedural flows as capture operators, rendering compression, exclusivity, and emergency logic as pre-structured nullification paths.",
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
    subtitle: "Judicial Stalling",
    tagline:
      "Delay is registered as an override-capable temporal suppression function.",
    description:
      "Vectorizes delay as an override mechanism, identifying temporal collapse and procedural bypass as latent constraint erasure.",
    color: "#1e232b",
    secondaryColor: "#1f2937",
    textColor: "#d1d5db",
    accentColor: "#e5e7eb",
    icon: Shield,
    glyph: "Δ",
    status: "MONITORING",
    typologyFocus: ["OD", "RT"],
    riskFingerprint: 0.22,
  },
  {
    id: "nexus-potentia",
    name: "NEXUS POTENTIA",
    subtitle: "Influence Network",
    tagline:
      "Relational continuity is parsed into indirect control and override vectors.",
    description:
      "Infers indirect control by reconstructing override topologies through relational propagation, revealing hidden operators embedded in institutional continuity.",
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
    subtitle: "Intelligence Synthesis",
    tagline:
      "System-wide resonance is processed into a structured escalation condition.",
    description:
      "Aggregates all module outputs into a dynamic risk lattice, triggering escalation when structural resonance achieves system-level coherence.",
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
    subtitle: "Risk Index",
    tagline:
      "Typological distortion is computed as weighted structural exposure intensity.",
    description:
      "Aggregates projection vectors across modules, measuring structural misalignment and collapsing semantic drift into a unified risk lattice.",
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
    subtitle: "Civic Signal",
    tagline:
      "Testimonial input is structurally encoded as a vector for typology alignment.",
    description:
      "Vectorizes testimonial input by aligning perception with typology fields, triangulating public resonance with system outputs for recursive validation.",
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
    subtitle: "Reserved Operator",
    tagline: "",
    description:
      "Semantic placeholder for emergent detection logic; system extensibility is encoded as constraint in reserve.",
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
    <div
      className="pt-20 pb-32 px-4"
      style={{ background: "linear-gradient(180deg, #121B17, #121B17)" }}
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 mt-8">
          <h2
            className="mb-8 font-semibold leading-tight"
            style={{
              fontFamily: "IBM Plex Sans, sans-serif",
              fontSize: "clamp(2.4rem, 3.4vw, 3rem)",
              color: "#E5F3ED",
            }}
          >
            Semantic Operators
          </h2>
          <p className="text-xl text-gray-400 font-light leading-relaxed text-center max-w-4xl mx-auto mb-8">
            Each engine is an operator in Vigilum's risk calculus.
            <br />
            Together, they render systemic risk as a visible and actionable
            system output.
          </p>
        </div>

        {/* Module Grid - 2x4 responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 mb-8">
          {modules.map((module) => {
            const IconComponent = module.icon;
            const isHovered = hoveredModule === module.id;
            const isPhantom = module.isPhantom;

            return (
              <div
                key={module.id}
                className={`relative group transition-all duration-300 ease-out ${
                  isHovered && !isPhantom
                    ? "scale-110 z-20"
                    : isHovered && isPhantom
                      ? "scale-105 z-10"
                      : ""
                }`}
                style={{
                  transform:
                    isHovered && !isPhantom
                      ? "scale(1.1) translateZ(20px)"
                      : isHovered && isPhantom
                        ? "scale(1.05) translateZ(10px)"
                        : "scale(1) translateZ(0px)",
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                  boxShadow:
                    isHovered && !isPhantom
                      ? "0 20px 40px rgba(0,0,0,0.3), 0 10px 20px rgba(0,0,0,0.2)"
                      : isHovered && isPhantom
                        ? "0 10px 20px rgba(0,0,0,0.2)"
                        : "none",
                }}
                onMouseEnter={() => setHoveredModule(module.id)}
                onMouseLeave={() => setHoveredModule(null)}
              >
                {/* Module Card */}
                <div
                  className={`relative backdrop-blur-lg border rounded-2xl p-6 h-full min-h-[420px] flex flex-col transition-all duration-300 ${
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
                        isPhantom ? "opacity-70" : ""
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
                        isPhantom ? "opacity-90" : ""
                      }`}
                      style={{ color: module.textColor }}
                    >
                      {module.name}
                    </h3>
                    <p
                      className={`text-sm mb-3 ${isPhantom ? "opacity-80" : "opacity-80"}`}
                      style={{ color: module.textColor }}
                    >
                      {module.subtitle}
                    </p>
                    <p
                      className={`text-sm leading-relaxed mb-4 ${
                        isPhantom ? "opacity-70" : "opacity-70"
                      }`}
                      style={{ color: module.textColor }}
                    >
                      {module.description}
                    </p>

                    {/* Tagline */}
                    {module.tagline && (
                      <p
                        className={`text-xs italic font-mono mb-4 ${
                          isPhantom ? "opacity-60" : ""
                        }`}
                        style={{ color: module.accentColor }}
                      >
                        "{module.tagline}"
                      </p>
                    )}
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
                      <span className="flex items-center justify-center">
                        RESERVED
                      </span>
                    </Button>
                  ) : (
                    <Link to={`/module/${module.id}`}>
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
                          {module.id === "clavis" && "CLAUSE ENGINE"}
                          {module.id === "obscura" && "PROCEDURE ENGINE"}
                          {module.id === "nullum" && "TEMPORAL ENGINE"}
                          {module.id === "nexus-potentia" && "CONTROL ENGINE"}
                          {module.id === "vigilo-core" && "SYNTHESIS ENGINE"}
                          {module.id === "veris" && "EXPOSURE ENGINE"}
                          {module.id === "sentium" && "SIGNAL ENGINE"}
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </Button>
                    </Link>
                  )}
                </div>

                {/* Hover Glow Effect */}
                {isHovered && !isPhantom && (
                  <div
                    className="absolute inset-0 rounded-2xl -z-10 blur-xl opacity-[0.375] transition-opacity duration-300"
                    style={{
                      backgroundColor: module.accentColor,
                    }}
                  />
                )}

                {/* Phantom Module Corner Pulse */}
                {isPhantom && isHovered && (
                  <div className="absolute inset-0 rounded-2xl -z-10 transition-opacity duration-300">
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
      </div>
    </div>
  );
};

export default ModuleGrid;
