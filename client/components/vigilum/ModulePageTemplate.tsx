import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GlobalCorruptionDisplay from "./GlobalCorruptionDisplay";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Play,
  BarChart3,
  Activity,
  Archive,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "./Navigation";

interface ModuleData {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  color: string;
  secondaryColor: string;
  textColor: string;
  accentColor: string;
  glyph: string;
  status: string;
  typologyFocus: string[];
  riskFingerprint: number;
  longDescription: string;
  capabilities: string[];
  exampleInputs: { name: string; description: string; risk: number }[];
  patternArchive: {
    id: string;
    name: string;
    triggers: string[];
    frequency: string;
  }[];
}

interface ModulePageTemplateProps {
  moduleData: ModuleData;
  children?: React.ReactNode;
}

const modules = [
  "clavis",
  "obscura",
  "nullum",
  "nexus-potentia",
  "vigilo-core",
  "veris",
  "sentium",
];

const moduleColors = {
  clavis: { accent: "#60a5fa", color: "#1a3d82", text: "#dce3f7" },
  obscura: { accent: "#f87171", color: "#941b1b", text: "#f1d1d1" },
  nullum: { accent: "#9ca3af", color: "#1e232b", text: "#9ca3af" },
  "nexus-potentia": { accent: "#a78bfa", color: "#4e27a6", text: "#ded1f7" },
  "vigilo-core": { accent: "#34d399", color: "#035e4a", text: "#c0f1e4" },
  veris: { accent: "#fbbf24", color: "#a65800", text: "#f5d199" },
  sentium: { accent: "#22d3ee", color: "#036373", text: "#a2e9f5" },
};

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
    default:
      return "#9ca3af";
  }
};

const ModulePageTemplate = ({
  moduleData,
  children,
}: ModulePageTemplateProps) => {
  const [activeSimulation, setActiveSimulation] = useState<number | null>(null);
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
  const navigate = useNavigate();

  const currentModuleIndex = modules.indexOf(moduleData.id);
  const prevModule = modules[currentModuleIndex - 1];
  const nextModule = modules[currentModuleIndex + 1];

  useEffect(() => {
    // Scroll to top when module page loads
    window.scrollTo(0, 0);
  }, [moduleData.id]);

  useEffect(() => {
    // Auto-cycle through pattern archive
    const interval = setInterval(() => {
      setCurrentPatternIndex(
        (prev) => (prev + 1) % moduleData.patternArchive.length,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [moduleData.patternArchive.length]);



  const runSimulation = (index: number) => {
    setActiveSimulation(index);
    setTimeout(() => setActiveSimulation(null), 3000);
  };

  return (
    <div
      className="min-h-screen text-gray-100 font-mono relative"
      style={{
        backgroundColor: "#0B1E16",
      }}
    >
      {/* Left Side Ambient Light */}
      <div
        className="absolute left-0 top-0 w-32 h-full pointer-events-none z-0"
        style={{
          background: `linear-gradient(to right, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 50%, transparent 100%)`,
        }}
      />

      {/* Right Side Ambient Light */}
      <div
        className="absolute right-0 top-0 w-32 h-full pointer-events-none z-0"
        style={{
          background: `linear-gradient(to left, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 50%, transparent 100%)`,
        }}
      />

      <div className="relative z-10">
        <Navigation />

        {/* Module Header */}
        <div className="pt-24 pb-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <Link
                to="/vigilum#modules"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-mono text-sm">BACK TO MODULES</span>
              </Link>

              {/* Module Navigation */}
              <div className="flex items-center gap-4">
                {prevModule && (
                  <Link to={`/module/${prevModule}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent border-gray-600 text-gray-400 hover:bg-gray-800"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                  </Link>
                )}

                <span className="text-gray-500 text-sm font-mono">
                  {currentModuleIndex + 1} / {modules.length}
                </span>

                {nextModule && (
                  <Link to={`/module/${nextModule}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent border-gray-600 text-gray-400 hover:bg-gray-800"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Module Summary */}
            <div className="mb-16">
              {/* Main Info */}
              <div>
                <div className="flex items-start gap-6 mb-6">
                  <div
                    className="text-6xl font-bold"
                    style={{
                      color: moduleData.accentColor,
                      textShadow: `0 0 30px ${moduleData.accentColor}50`,
                    }}
                  >
                    {moduleData.glyph}
                  </div>
                  <div>
                    <h1
                      className="text-4xl font-bold mb-2"
                      style={{ color: moduleData.textColor }}
                    >
                      {moduleData.name}
                    </h1>
                    <p
                      className="text-lg mb-3 opacity-80"
                      style={{ color: moduleData.textColor }}
                    >
                      {moduleData.subtitle}
                    </p>
                    <p
                      className="text-sm italic font-mono"
                      style={{ color: moduleData.accentColor }}
                    >
                      "{moduleData.tagline}"
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed mb-6">
                  {moduleData.longDescription}
                </p>

                {/* Capabilities */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white font-mono">
                    CORE CAPABILITIES
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {moduleData.capabilities.map((capability, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg border"
                        style={{
                          backgroundColor: `${moduleData.color}20`,
                          borderColor: `${moduleData.accentColor}30`,
                        }}
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: moduleData.accentColor }}
                        />
                        <span
                          className="text-sm"
                          style={{ color: moduleData.textColor }}
                        >
                          {capability}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>


            </div>

            {/* Semantic Interface Background */}
            <div className="mb-16">
              <div
                className="relative p-8 rounded-xl border backdrop-blur-lg overflow-hidden"
                style={{
                  backgroundColor: `${moduleData.color}10`,
                  borderColor: `${moduleData.accentColor}30`,
                }}
              >
                {/* Animated Logic Background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 rounded-full animate-pulse"
                      style={{
                        backgroundColor: moduleData.accentColor,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${2 + Math.random() * 2}s`,
                      }}
                    />
                  ))}
                </div>

                <div className="relative">
                  <h3 className="text-2xl font-bold text-white font-mono mb-4">
                    SEMANTIC INTERFACE
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Real-time cognitive processing environment for{" "}
                    {moduleData.name.toLowerCase()} analysis
                  </p>

                  {/* Custom module content */}
                  {children}
                </div>
              </div>
            </div>



            {/* Cross-Module Switch Panel */}
            <div className="text-center mb-16">
              <div className="flex flex-wrap justify-center gap-3">
                {modules
                  .filter((id) => id !== moduleData.id)
                  .map((moduleId) => {
                    const moduleColor = moduleColors[moduleId];
                    return (
                      <Link key={moduleId} to={`/module/${moduleId}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent border-gray-600 text-gray-400 font-mono transition-all duration-300"
                          style={{
                            borderColor: "rgba(75, 85, 99, 0.5)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor =
                              moduleColor.accent;
                            e.currentTarget.style.color = moduleColor.text;
                            e.currentTarget.style.backgroundColor = `${moduleColor.color}20`;
                            e.currentTarget.style.boxShadow = `0 0 15px ${moduleColor.accent}40`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor =
                              "rgba(75, 85, 99, 0.5)";
                            e.currentTarget.style.color = "#9ca3af";
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        >
                          {moduleId.toUpperCase().replace("-", " ")}
                        </Button>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Corruption Count - managed globally */}
      <GlobalCorruptionDisplay />
    </div>
  );
};

export default ModulePageTemplate;
