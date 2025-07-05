import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Upload,
  Search,
  Download,
  Activity,
  AlertTriangle,
  BarChart3,
  FileText,
} from "lucide-react";

const ClauseDemo = () => {
  const [inputText, setInputText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [showGraph, setShowGraph] = useState(false);

  // Sample clause for demonstration
  const sampleClause = `"The contracting authority may, at its sole discretion and without prior notice, modify the terms of this agreement where such modifications are deemed necessary for operational efficiency, subject to internal administrative procedures that shall be determined separately."`;

  // Simulate clause analysis
  const analyzeClause = async () => {
    if (!inputText.trim()) return;

    setIsAnalyzing(true);
    setAnalysis(null);
    setShowGraph(false);

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate analysis results
    const analysisResult = {
      clause_id: "Clause 3.4.2",
      risk_typology: ["DG", "RT"],
      override_path: ["3.4.2 → 3.5.1"],
      semantic_vector: {
        DG: 0.91,
        RT: 0.74,
        CI: 0.22,
        SB: 0.05,
      },
      similar_loophole: "L002",
      inference_flag: "OverrideByDesign",
      risk_indicators: [
        "Discretionary authority without bounds",
        "Procedural ambiguity mechanism",
        "Unilateral modification rights",
        "Administrative self-determination",
      ],
      override_mechanisms: [
        "Sole discretion clause",
        "Operational efficiency exception",
        "Internal procedure determination",
      ],
    };

    setAnalysis(analysisResult);
    setIsAnalyzing(false);

    // Show graph after analysis
    setTimeout(() => setShowGraph(true), 500);
  };

  const downloadResults = () => {
    if (!analysis) return;

    const dataStr = JSON.stringify(analysis, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `vigilum-analysis-${Date.now()}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="bg-gray-800 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-900/30 px-3 py-1 rounded-full border border-blue-700 mb-4">
              <Search className="w-3 h-3 text-blue-400" />
              <span className="text-xs text-blue-300 font-mono uppercase tracking-wider">
                CLAVIS - Clause Intelligence
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-100 mb-4 font-mono tracking-tight">
              PRIMARY COGNITION TEST
            </h2>
            <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto">
              ϕ(c₁…cₙ) ⇨ ⊗(sequence logic) ⇨ G(override graph) ⇨ τ(typology
              projection) ⇨ Λ(pattern flag). Real-time structural analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white font-mono">
                    CLAUSE INPUT
                  </h3>
                  <Button
                    onClick={() => setInputText(sampleClause)}
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-400 hover:bg-gray-800 font-mono text-xs"
                  >
                    LOAD SAMPLE
                  </Button>
                </div>

                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste legal clause for structural analysis..."
                  className="w-full h-40 bg-gray-800 border border-gray-600 rounded-lg p-4 text-gray-300 font-mono text-sm resize-none focus:outline-none focus:border-blue-500"
                />

                <div className="flex items-center justify-between mt-4">
                  <div className="text-xs text-gray-500 font-mono">
                    {inputText.length} characters
                  </div>
                  <Button
                    onClick={analyzeClause}
                    disabled={!inputText.trim() || isAnalyzing}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-mono px-6"
                  >
                    {isAnalyzing ? (
                      <>
                        <Activity className="w-4 h-4 mr-2 animate-spin" />
                        ANALYZING
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        ANALYZE
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Processing Status */}
              {isAnalyzing && (
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Activity className="w-5 h-5 text-blue-400 animate-spin" />
                    <span className="text-sm font-mono text-blue-400">
                      STRUCTURAL ANALYSIS IN PROGRESS
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-400">
                      → Semantic vector decomposition
                    </div>
                    <div className="text-xs text-gray-400">
                      → Override pathway mapping
                    </div>
                    <div className="text-xs text-gray-400">
                      → Risk typology projection
                    </div>
                    <div className="text-xs text-gray-400">
                      → Behavioral simulation
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {analysis && (
                <>
                  {/* JSON Output */}
                  <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white font-mono">
                        RISK REPORT
                      </h3>
                      <Button
                        onClick={downloadResults}
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-400 hover:bg-gray-800 font-mono text-xs"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        JSON
                      </Button>
                    </div>

                    <pre className="text-xs text-gray-300 font-mono bg-gray-800 border border-gray-600 rounded p-4 overflow-auto max-h-60">
                      {JSON.stringify(analysis, null, 2)}
                    </pre>
                  </div>

                  {/* Visual Analysis */}
                  <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-white font-mono mb-4">
                      VECTOR ANALYSIS
                    </h3>

                    <div className="space-y-4">
                      {Object.entries(analysis.semantic_vector).map(
                        ([key, value]) => (
                          <div key={key}>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <div
                                  className={`w-3 h-3 rounded-full ${
                                    key === "DG"
                                      ? "bg-yellow-400"
                                      : key === "RT"
                                        ? "bg-orange-400"
                                        : key === "CI"
                                          ? "bg-blue-400"
                                          : "bg-red-400"
                                  }`}
                                />
                                <span className="text-sm font-mono text-gray-300">
                                  {key}
                                </span>
                              </div>
                              <span className="text-sm font-mono text-gray-400">
                                {value.toFixed(2)}
                              </span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all duration-1000 ${
                                  key === "DG"
                                    ? "bg-yellow-400"
                                    : key === "RT"
                                      ? "bg-orange-400"
                                      : key === "CI"
                                        ? "bg-blue-400"
                                        : "bg-red-400"
                                }`}
                                style={{
                                  width: `${showGraph ? value * 100 : 0}%`,
                                }}
                              />
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Risk Indicators */}
                  <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <AlertTriangle className="w-5 h-5 text-orange-400" />
                      <h3 className="text-lg font-bold text-white font-mono">
                        RISK INDICATORS
                      </h3>
                    </div>

                    <div className="space-y-2">
                      {analysis.risk_indicators.map((indicator, index) => (
                        <div
                          key={index}
                          className="text-xs text-gray-400 border-l-2 border-orange-400 pl-3"
                        >
                          → {indicator}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-700">
                      <div className="text-xs text-orange-400 font-mono mb-2">
                        INFERENCE FLAG: {analysis.inference_flag}
                      </div>
                      <div className="text-xs text-gray-500">
                        Similar loophole pattern: {analysis.similar_loophole}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Default State */}
              {!analysis && !isAnalyzing && (
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-12 text-center">
                  <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <div className="text-lg font-mono text-gray-500 mb-2">
                    AWAITING INPUT
                  </div>
                  <div className="text-sm text-gray-600">
                    Enter legal clause for structural analysis
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Methodology Note */}
          <div className="mt-16 bg-blue-900/20 border border-blue-700 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <BarChart3 className="w-5 h-5 text-blue-400 mt-1" />
              <div>
                <div className="text-sm font-bold text-blue-400 font-mono mb-2">
                  SEMANTIC ANALYSIS METHODOLOGY
                </div>
                <div className="text-sm text-gray-300 leading-relaxed">
                  <p>
                    CLAVIS employs semantic vector decomposition to identify
                    embedded override mechanisms in legal text. Risk typologies
                    represent different vectors of institutional failure. Output
                    includes override pathways, similar loophole patterns, and
                    behavioral simulation parameters.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClauseDemo;
