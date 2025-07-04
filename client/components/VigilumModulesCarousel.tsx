import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Search,
  Shield,
  Network,
  Activity,
  BarChart3,
  MessageCircle,
} from "lucide-react";

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
  },
  {
    id: "nexus",
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
  },
  {
    id: "vigilo",
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
    glyph: "��",
  },
];

interface VigilumModulesCarouselProps {
  autoRotate?: boolean;
  rotationInterval?: number;
}

export default function VigilumModulesCarousel({
  autoRotate = true,
  rotationInterval = 4500,
}: VigilumModulesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextModule = () => {
    setCurrentIndex((prev) => (prev + 1) % modules.length);
  };

  const prevModule = () => {
    setCurrentIndex((prev) => (prev - 1 + modules.length) % modules.length);
  };

  const goToModule = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (autoRotate && !isHovered) {
      intervalRef.current = setInterval(nextModule, rotationInterval);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoRotate, isHovered, rotationInterval]);

  const currentModule = modules[currentIndex];
  const Icon = currentModule.icon;

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Semantic Processor Wire - Vertical Connection Line */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-white opacity-[0.04] pointer-events-none z-10" />

      {/* Module Display */}
      <div
        className="relative overflow-hidden rounded-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Connection Lines Animation */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full">
            <defs>
              <linearGradient
                id="connectionGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor={currentModule.color}
                  stopOpacity="0.3"
                />
                <stop
                  offset="100%"
                  stopColor={currentModule.accentColor}
                  stopOpacity="0.1"
                />
              </linearGradient>
            </defs>
            <path
              d="M0,50 Q150,20 300,50 T600,50"
              stroke="url(#connectionGradient)"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
            />
            <path
              d="M0,100 Q200,80 400,100 T800,100"
              stroke="url(#connectionGradient)"
              strokeWidth="1"
              fill="none"
              className="animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </svg>
        </div>

        {/* Main Module Card */}
        <div
          className="relative transition-all duration-700 ease-in-out transform scale-100"
          style={{
            backgroundColor: isHovered
              ? currentModule.secondaryColor
              : currentModule.color,
            borderLeft: `2px solid ${currentModule.accentColor}`,
          }}
        >
          <div className="relative p-8 md:p-12">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-12 gap-2 h-full">
                {Array.from({ length: 144 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-current rounded-sm animate-pulse"
                    style={{
                      animationDelay: `${(i * 50) % 3000}ms`,
                      animationDuration: "3s",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Module Content */}
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: currentModule.accentColor }}
                  >
                    <Icon
                      className="w-8 h-8"
                      style={{ color: currentModule.color }}
                    />
                  </div>
                  <div>
                    <h2
                      className="text-3xl font-bold font-mono tracking-wider"
                      style={{ color: currentModule.textColor }}
                    >
                      {currentModule.name}
                    </h2>
                    <p
                      className="text-sm uppercase tracking-wider opacity-80"
                      style={{ color: currentModule.textColor }}
                    >
                      {currentModule.subtitle}
                    </p>
                  </div>
                </div>

                {/* Module Counter */}
                <div
                  className="text-sm font-mono opacity-60"
                  style={{ color: currentModule.textColor }}
                >
                  {String(currentIndex + 1).padStart(2, "0")} /{" "}
                  {String(modules.length).padStart(2, "0")}
                </div>
              </div>

              {/* Tagline */}
              <div className="mb-6">
                <p
                  className="text-xl font-bold italic"
                  style={{ color: currentModule.accentColor }}
                >
                  "{currentModule.tagline}"
                </p>
              </div>

              {/* Description */}
              <div className="transition-all duration-500 overflow-hidden max-h-40 opacity-100">
                <p
                  className="text-base leading-relaxed"
                  style={{ color: currentModule.textColor }}
                >
                  {currentModule.description}
                </p>
              </div>
            </div>

            {/* Semantic Glyph */}
            <div
              className="absolute bottom-2 right-3 text-2xl opacity-20 pointer-events-none font-serif"
              style={{
                fontSize: "1.6rem",
                color: currentModule.accentColor,
                textShadow: `0 0 8px ${currentModule.accentColor}40`,
              }}
            >
              {currentModule.glyph}
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1">
              <div
                className="h-full transition-all duration-300"
                style={{
                  backgroundColor: currentModule.accentColor,
                  width: `${((currentIndex + 1) / modules.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevModule}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-all duration-200 z-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextModule}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-all duration-200 z-20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Module Network Indicators */}
      <div className="flex justify-center mt-6 space-x-3">
        {modules.map((module, index) => (
          <button
            key={module.id}
            onClick={() => goToModule(index)}
            className={`text-sm font-mono font-bold transition-all duration-300 cursor-pointer hover:opacity-80 ${
              index === currentIndex
                ? "opacity-100 scale-110"
                : "opacity-50 scale-90"
            }`}
            style={{
              color: index === currentIndex ? module.accentColor : "#6B7280",
              textShadow:
                index === currentIndex
                  ? `0 0 8px ${module.accentColor}80, 0 0 16px ${module.accentColor}40`
                  : "none",
            }}
          >
            {module.name}
          </button>
        ))}
      </div>
    </div>
  );
}
