import { useState, useEffect } from "react";
import {
  Search,
  Database,
  Gavel,
  BarChart3,
  Activity,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";

const ModulesGrid = () => {
  const [activeModule, setActiveModule] = useState(0);
  const [failureMode, setFailureMode] = useState(false);

  const modules = [
    {
      id: "CLAVIS",
      name: "Clause Intelligence",
      icon: Search,
      color: "blue",
      bgColor: "bg-blue-900/20",
      borderColor: "border-blue-500",
      textColor: "text-blue-400",
      description:
        "Input → Analysis → Override → Risk projection through semantic vector mapping",
      capabilities: [
        "Clause vector decomposition",
        "Semantic override detection",
        "Risk fingerprint generation",
        "Legal simulation modeling",
      ],
      riskLevel: 0.91,
      status: "OPERATIONAL",
    },
    {
      id: "OBSCURA",
      name: "Timeline Compression",
      icon: Database,
      color: "yellow",
      bgColor: "bg-yellow-900/20",
      borderColor: "border-yellow-500",
      textColor: "text-yellow-400",
      description:
        "Frictionless procurement detection through temporal sequence analysis",
      capabilities: [
        "Timeline sequence mapping",
        "Procedural compression analysis",
        "Administrative drift detection",
        "Temporal risk accumulation",
      ],
      riskLevel: 0.74,
      status: "ACTIVE",
    },
    {
      id: "NULLUM",
      name: "Delay Mapping",
      icon: Gavel,
      color: "red",
      bgColor: "bg-red-900/20",
      borderColor: "border-red-500",
      textColor: "text-red-400",
      description:
        "Risk accumulation through user non-interaction and procedural drift",
      capabilities: [
        "Non-interaction tracking",
        "Systemic delay analysis",
        "Institutional route mapping",
        "Passive risk accumulation",
      ],
      riskLevel: 0.22,
      status: "MONITORING",
    },
  ];

  // Simulate failure behavior
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveModule((prev) => (prev + 1) % modules.length);
    }, 3000);

    const failureInterval = setInterval(() => {
      setFailureMode(true);
      setTimeout(() => setFailureMode(false), 500);
    }, 8000);

    return () => {
      clearInterval(interval);
      clearInterval(failureInterval);
    };
  }, []);

  return (
    <div className="py-20" style={{ backgroundColor: "#0B1E16" }}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded-full border border-gray-700 mb-4">
              <Activity className="w-3 h-3 text-green-400" />
              <span className="text-xs text-gray-300 font-mono uppercase tracking-wider">
                Module Architecture
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-100 mb-4 font-mono tracking-tight">
              SEMANTIC INTELLIGENCE MODULES
            </h2>
            <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto">
              Modular risk detection machine. Each module simulates specific
              failure behaviors in legal structure.
            </p>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {modules.map((module, index) => {
              const Icon = module.icon;
              const isActive = activeModule === index;
              const isFailure = failureMode && isActive;

              return (
                <div
                  key={module.id}
                  className={`group relative ${module.bgColor} backdrop-blur-sm border-2 ${
                    isActive ? module.borderColor : "border-gray-700"
                  } rounded-lg p-6 transition-all duration-500 cursor-pointer ${
                    isActive ? "scale-105 shadow-2xl" : "hover:scale-102"
                  } ${isFailure ? "animate-pulse border-red-500" : ""}`}
                >
                  {/* Failure Alert */}
                  {isFailure && (
                    <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1">
                      <AlertTriangle className="w-4 h-4 text-white" />
                    </div>
                  )}

                  {/* Module Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-12 h-12 ${
                          module.color === "blue"
                            ? "bg-blue-600"
                            : module.color === "yellow"
                              ? "bg-yellow-600"
                              : "bg-red-600"
                        } rounded-lg flex items-center justify-center`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3
                          className={`text-lg font-bold font-mono ${module.textColor}`}
                        >
                          {module.id}
                        </h3>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">
                          {module.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono text-gray-400">
                        {module.riskLevel.toFixed(2)}
                      </div>
                      <div
                        className={`text-xs ${
                          isFailure ? "text-red-400" : "text-green-400"
                        } font-mono`}
                      >
                        {isFailure ? "FAILURE" : module.status}
                      </div>
                    </div>
                  </div>

                  {/* Module Description */}
                  <p className="text-sm text-gray-300 leading-relaxed mb-6">
                    {module.description}
                  </p>

                  {/* Capabilities */}
                  <div className="space-y-2 mb-6">
                    {module.capabilities.map((capability, capIndex) => (
                      <div
                        key={capIndex}
                        className={`text-xs text-gray-400 transition-all duration-300 ${
                          isActive
                            ? "opacity-100 translate-x-0"
                            : "opacity-70 translate-x-2"
                        }`}
                        style={{ transitionDelay: `${capIndex * 100}ms` }}
                      >
                        → {capability}
                      </div>
                    ))}
                  </div>

                  {/* Risk Level Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500 font-mono">
                        RISK LEVEL
                      </span>
                      <span className="text-xs text-gray-400 font-mono">
                        {(module.riskLevel * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          module.color === "blue"
                            ? "bg-blue-400"
                            : module.color === "yellow"
                              ? "bg-yellow-400"
                              : "bg-red-400"
                        }`}
                        style={{
                          width: `${
                            isActive
                              ? module.riskLevel * 100
                              : module.riskLevel * 50
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    className={`w-full py-2 px-4 rounded-lg border transition-all duration-300 font-mono text-sm ${
                      isActive
                        ? `${module.borderColor} ${module.textColor} bg-gray-800`
                        : "border-gray-700 text-gray-400 hover:border-gray-600"
                    }`}
                  >
                    ANALYZE MODULE
                    <ArrowRight className="inline w-4 h-4 ml-2" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* System Integration Status */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <BarChart3 className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-lg font-bold text-white font-mono">
                  VECTOR SPACE
                </div>
                <div className="text-sm text-gray-400">
                  Multi-dimensional semantic analysis
                </div>
              </div>
              <div className="text-center">
                <Activity className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <div className="text-lg font-bold text-white font-mono">
                  REAL-TIME
                </div>
                <div className="text-sm text-gray-400">
                  Continuous structural monitoring
                </div>
              </div>
              <div className="text-center">
                <Database
                  className="w-8 h-8 mx-auto mb-3"
                  style={{ color: "rgb(248,113,113)" }}
                />
                <div className="text-lg font-bold text-white font-mono">
                  <p>REASONING</p>
                </div>
                <div className="text-sm text-gray-400">
                  Legal behavior simulation engine
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModulesGrid;
