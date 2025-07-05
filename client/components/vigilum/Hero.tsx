import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, BarChart3 } from "lucide-react";

const Hero = () => {
  const [activeRisk, setActiveRisk] = useState(0);

  const riskTypologies = [
    {
      code: "DG",
      name: "Discretionary Gap",
      color: "text-yellow-400",
      description: "Administrative override potential",
      value: 0.91,
    },
    {
      code: "RT",
      name: "Regulatory Tunneling",
      color: "text-orange-400",
      description: "Compliance pathway deviation",
      value: 0.74,
    },
    {
      code: "CI",
      name: "Clause Interference",
      color: "text-blue-400",
      description: "Semantic contradiction matrix",
      value: 0.22,
    },
    {
      code: "SB",
      name: "Structural Bypass",
      color: "text-red-400",
      description: "Institutional route nullification",
      value: 0.05,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRisk((prev) => (prev + 1) % riskTypologies.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative pt-24 pb-16 overflow-hidden"
      style={{ backgroundColor: "#0B1E16" }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-yellow-500/20" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent)] animate-pulse" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              <div className="mb-6">
                <h1 className="text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6">
                  LEGAL BEHAVIOR
                  <span className="block text-blue-400">SIMULATION</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed font-light mb-8">
                  Vigilum detects embedded governance risk through semantic
                  analysis of legal structure. Not corruption detection —{" "}
                  <span className="text-yellow-400 font-medium">
                    corruption prediction
                  </span>
                  .
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="#modules">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-500 text-white font-mono px-8 py-4 border border-blue-500"
                  >
                    VIEW MODULES
                  </Button>
                </a>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 font-mono">
                    200+
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">
                    Known Evasions
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400 font-mono">
                    4
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">
                    Risk Typologies
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400 font-mono">
                    €2B+
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">
                    Structural Risk
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Risk Typology Visualization */}
            <div className="relative">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white font-mono">
                    RISK TYPOLOGY MATRIX
                  </h3>
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                </div>

                <div className="space-y-4">
                  {riskTypologies.map((risk, index) => (
                    <div
                      key={risk.code}
                      className={`transition-all duration-500 ${
                        activeRisk === index
                          ? "scale-105 bg-gray-700/50"
                          : "bg-gray-800/30"
                      } border border-gray-700 rounded-lg p-4`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`text-sm font-bold font-mono ${risk.color}`}
                          >
                            {risk.code}
                          </div>
                          <div className="text-sm text-white font-medium">
                            {risk.name}
                          </div>
                        </div>
                        <div className="text-sm font-mono text-gray-400">
                          {risk.value.toFixed(2)}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 mb-2">
                        {risk.description}
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            risk.code === "DG"
                              ? "bg-yellow-400"
                              : risk.code === "RT"
                                ? "bg-orange-400"
                                : risk.code === "CI"
                                  ? "bg-blue-400"
                                  : "bg-red-400"
                          }`}
                          style={{
                            width: `${
                              activeRisk === index ? risk.value * 100 : 0
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-700">
                  <div className="text-xs text-gray-500 font-mono">
                    SEMANTIC VECTOR PROJECTION
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Real-time structural risk assessment
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
