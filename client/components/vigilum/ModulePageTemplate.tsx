import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {/* Main Info */}
              <div className="lg:col-span-2">
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

              {/* Status Panel */}
              <div>
                <div
                  className="backdrop-blur-lg border rounded-xl p-6"
                  style={{
                    backgroundColor: `${moduleData.color}30`,
                    borderColor: `${moduleData.accentColor}30`,
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-white font-mono">
                      MODULE STATUS
                    </h3>
                    <Activity className="w-5 h-5 text-gray-400" />
                  </div>

                  {/* Status Badge */}
                  <div
                    className="px-3 py-2 rounded-full text-sm font-mono font-bold border mb-6 text-center"
                    style={{
                      backgroundColor: `${getStatusColor(moduleData.status)}20`,
                      borderColor: getStatusColor(moduleData.status),
                      color: getStatusColor(moduleData.status),
                    }}
                  >
                    {moduleData.status}
                  </div>

                  {/* Risk Fingerprint */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm font-mono mb-2">
                      <span className="text-gray-400">RISK FINGERPRINT</span>
                      <span style={{ color: moduleData.accentColor }}>
                        {moduleData.riskFingerprint.toFixed(2)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all duration-1000"
                        style={{
                          width: `${moduleData.riskFingerprint * 100}%`,
                          backgroundColor: moduleData.accentColor,
                          boxShadow: `0 0 10px ${moduleData.accentColor}`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Typology Focus */}
                  <div>
                    <div className="text-sm text-gray-400 mb-3 font-mono">
                      TYPOLOGY FOCUS
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {moduleData.typologyFocus.map((type) => (
                        <span
                          key={type}
                          className="px-2 py-1 rounded text-xs font-mono"
                          style={{
                            backgroundColor: `${moduleData.accentColor}20`,
                            color: moduleData.accentColor,
                            border: `1px solid ${moduleData.accentColor}40`,
                          }}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
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

            {/* Example Simulations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {/* Run Simulation */}
              <div>
                <h3 className="text-2xl font-bold text-white font-mono mb-6 flex items-center gap-3">
                  <Play
                    className="w-6 h-6"
                    style={{ color: moduleData.accentColor }}
                  />
                  RUN SIMULATION
                </h3>

                <div className="space-y-4">
                  {moduleData.exampleInputs.map((input, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                        activeSimulation === index ? "scale-105" : ""
                      }`}
                      style={{
                        backgroundColor:
                          activeSimulation === index
                            ? `${moduleData.accentColor}20`
                            : `${moduleData.color}20`,
                        borderColor:
                          activeSimulation === index
                            ? moduleData.accentColor
                            : `${moduleData.accentColor}30`,
                        boxShadow:
                          activeSimulation === index
                            ? `0 0 20px ${moduleData.accentColor}40`
                            : "none",
                      }}
                      onClick={() => runSimulation(index)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4
                          className="font-mono font-bold"
                          style={{ color: moduleData.textColor }}
                        >
                          {input.name}
                        </h4>
                        <span
                          className="text-sm font-mono"
                          style={{ color: moduleData.accentColor }}
                        >
                          Risk: {input.risk.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">
                        {input.description}
                      </p>

                      {activeSimulation === index && (
                        <div className="mt-3 pt-3 border-t border-gray-600">
                          <div className="flex items-center gap-2 text-sm text-green-400 font-mono">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            SIMULATION ACTIVE
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Pattern Archive */}
              <div>
                <h3 className="text-2xl font-bold text-white font-mono mb-6 flex items-center gap-3">
                  <Archive
                    className="w-6 h-6"
                    style={{ color: moduleData.accentColor }}
                  />
                  PATTERN ARCHIVE
                </h3>

                {moduleData.patternArchive.length > 0 && (
                  <div
                    className="p-6 rounded-lg border"
                    style={{
                      backgroundColor: `${moduleData.color}20`,
                      borderColor: `${moduleData.accentColor}30`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4
                        className="font-mono font-bold"
                        style={{ color: moduleData.textColor }}
                      >
                        {moduleData.patternArchive[currentPatternIndex].name}
                      </h4>
                      <span className="text-xs text-gray-400 font-mono">
                        {
                          moduleData.patternArchive[currentPatternIndex]
                            .frequency
                        }
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm text-gray-400 font-mono">
                        TRIGGERS:
                      </div>
                      {moduleData.patternArchive[
                        currentPatternIndex
                      ].triggers.map((trigger, triggerIndex) => (
                        <div
                          key={triggerIndex}
                          className="flex items-center gap-2 text-sm"
                          style={{ color: moduleData.textColor }}
                        >
                          <div
                            className="w-1 h-1 rounded-full"
                            style={{ backgroundColor: moduleData.accentColor }}
                          />
                          {trigger}
                        </div>
                      ))}
                    </div>

                    {/* Pattern indicator dots */}
                    <div className="flex justify-center gap-2 mt-4 pt-4 border-t border-gray-600">
                      {moduleData.patternArchive.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentPatternIndex ? "scale-125" : ""
                          }`}
                          style={{
                            backgroundColor:
                              index === currentPatternIndex
                                ? moduleData.accentColor
                                : `${moduleData.accentColor}40`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
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
    </div>
  );
};

export default ModulePageTemplate;
