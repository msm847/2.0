import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FileText,
  AlertTriangle,
  TrendingUp,
  Eye,
  EyeOff,
  ArrowRight,
  Calendar,
  DollarSign,
} from "lucide-react";

const UseCases = () => {
  const [selectedCase, setSelectedCase] = useState(0);

  const cases = [];

  const currentCase = cases[selectedCase];

  return (
    <div className="py-20" style={{ backgroundColor: "#0B1E16" }}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-orange-900/30 px-3 py-1 rounded-full border border-orange-700 mb-4">
              <FileText className="w-3 h-3 text-orange-400" />
              <span className="text-xs text-orange-300 font-mono uppercase tracking-wider">
                Structural Retrospectives
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-100 mb-4 font-mono tracking-tight">
              Library
            </h2>
            <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto">
              Structural analysis of EU procurement directive clauses revealing
              embedded loopholes and override paths that enable systematic
              competition bypass.
            </p>
          </div>

          {cases.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-500 text-xl font-mono">
                Library content is currently being updated
              </div>
              <div className="text-gray-400 text-sm mt-2">
                Case studies will be available soon
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Case Selection */}
            <div className="lg:col-span-1">
              <div
                className="rounded-lg p-6 border"
                style={{
                  backgroundColor: "rgba(16, 44, 34, 0.7)",
                  borderColor: "rgba(34, 68, 54, 0.8)",
                }}
              >
                <h3 className="text-lg font-bold text-white font-mono mb-6">
                  CLAUSE LIBRARY
                </h3>
                <div className="relative">
                  <div
                    className="space-y-3 max-h-96 overflow-y-auto vigilum-scrollbar pr-2"
                    style={{
                      scrollbarTrackColor: "rgba(12, 35, 28, 0.75)",
                      scrollbarThumbColor: "rgba(0,255,204,0.2)",
                    }}
                  >
                    {cases.map((caseItem, index) => (
                      <button
                        key={caseItem.id}
                        onClick={() => setSelectedCase(index)}
                        className="w-full text-left p-4 rounded-lg border transition-all duration-300"
                        style={{
                          backgroundColor:
                            selectedCase === index
                              ? "#1a3c2f"
                              : "rgba(12, 35, 28, 0.85)",
                          borderColor:
                            selectedCase === index
                              ? "rgba(0,255,204,0.3)"
                              : "rgba(0,255,204,0.06)",
                          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)",
                        }}
                        onMouseEnter={(e) => {
                          if (selectedCase !== index) {
                            e.target.style.backgroundColor = "#1a3c2f";
                            e.target.style.borderColor = "rgba(0,255,204,0.15)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedCase !== index) {
                            e.target.style.backgroundColor =
                              "rgba(12, 35, 28, 0.85)";
                            e.target.style.borderColor = "rgba(0,255,204,0.06)";
                          }
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-mono text-orange-400">
                            {caseItem.id}
                          </div>
                          <div className="text-xs text-gray-500">
                            Risk: {caseItem.riskLevel.toFixed(1)}
                          </div>
                        </div>
                        <div className="text-sm text-white font-medium mb-1">
                          {caseItem.title}
                        </div>
                        <div className="text-xs text-gray-400">
                          {caseItem.sector}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="text-xs font-mono text-blue-400">
                            {caseItem.duration}
                          </div>
                          <div className="text-xs text-gray-500">
                            {caseItem.typology}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  {/* Fade effect to indicate scrollable content */}
                  <div
                    className="absolute bottom-0 left-0 right-2 h-8 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(16, 44, 34, 0.7) 0%, transparent 100%)",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Case Details */}
            <div className="lg:col-span-3 space-y-6">
              {/* Case Header */}
              <div
                className="rounded-lg p-6 border"
                style={{
                  backgroundColor: "#102c22",
                  borderColor: "rgba(0,255,204,0.06)",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="text-lg font-bold text-orange-400 font-mono">
                        {currentCase.id}
                      </div>
                      <div className="text-sm font-mono text-red-400">
                        {currentCase.typology}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {currentCase.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{currentCase.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{currentCase.amount}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-red-400 font-mono">
                      {currentCase.riskLevel.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">RISK LEVEL</div>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {currentCase.description}
                </p>
              </div>

              {/* Original Clause and Risk Indicators Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Original Clause */}
                <div
                  className="rounded-lg p-6 border"
                  style={{
                    backgroundColor: "#102c22",
                    borderColor: "rgba(0,255,204,0.06)",
                  }}
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <h4 className="text-lg font-bold text-white font-mono">
                      ORIGINAL CLAUSE
                    </h4>
                  </div>
                  <div className="bg-gray-900 border border-gray-600 rounded-lg p-4">
                    <div className="text-sm text-gray-300 font-mono italic leading-relaxed">
                      {currentCase.originalClause}
                    </div>
                  </div>
                </div>

                {/* Risk Indicators */}
                <div
                  className="rounded-lg p-6 border"
                  style={{
                    backgroundColor: "#102c22",
                    borderColor: "rgba(0,255,204,0.06)",
                  }}
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h4 className="text-lg font-bold text-white font-mono">
                      RISK INDICATORS
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {currentCase.riskIndicators.map((indicator, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                        <div className="text-sm text-gray-300">{indicator}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Structural Outcome */}
              <div className="bg-red-900/20 border border-red-700 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <EyeOff className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-bold text-red-400 font-mono mb-3">
                      STRUCTURAL OUTCOME
                    </h4>
                    <p className="text-sm text-gray-300 leading-relaxed mb-4">
                      {currentCase.outcome}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Eye
                        className={`w-4 h-4 ${currentCase.preventable ? "text-green-400" : "text-yellow-400"} mt-1 flex-shrink-0`}
                      />
                      <span
                        className={`text-sm ${currentCase.preventable ? "text-green-400" : "text-yellow-400"} font-mono`}
                      >
                        {currentCase.detection}
                      </span>
                    </div>
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

export default UseCases;