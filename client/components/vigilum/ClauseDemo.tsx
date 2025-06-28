import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

const presetExamples = [
  {
    id: "emergency",
    title: "Emergency Procurement",
    text: "In cases of extreme urgency, procurement procedures may be bypassed when the contracting authority determines immediate action is necessary.",
    analysis: {
      score: 85,
      typologies: ["DG", "SB"],
      explanation:
        "High discretionary gap due to undefined 'extreme urgency' and authority determining necessity. Creates structural blindspot in oversight.",
    },
  },
  {
    id: "modification",
    title: "Contract Modification",
    text: "Contract modifications are permitted when unforeseen circumstances arise that could not have been anticipated during the original tender process.",
    analysis: {
      score: 72,
      typologies: ["RT", "DG"],
      explanation:
        "Risk transfer to public party through 'unforeseen circumstances' clause. Discretionary interpretation of what constitutes 'unforeseen'.",
    },
  },
  {
    id: "inhouse",
    title: "In-House Exception",
    text: "Public entities may award contracts directly to entities over which they exercise control similar to that exercised over their own departments.",
    analysis: {
      score: 45,
      typologies: ["CI"],
      explanation:
        "Potential conflict of interest through unclear definition of 'control similar'. Otherwise structured with reasonable safeguards.",
    },
  },
];

const ClauseDemo = () => {
  const [inputText, setInputText] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeClause = async (text: string) => {
    setIsAnalyzing(true);

    // Simulate analysis delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simple heuristic analysis for demo
    const words = text.toLowerCase();
    let score = 0;
    const detectedTypologies = [];

    // Check for discretionary language
    if (
      words.includes("may") ||
      words.includes("discretion") ||
      words.includes("determine")
    ) {
      score += 30;
      detectedTypologies.push("DG");
    }

    // Check for emergency/urgency
    if (
      words.includes("emergency") ||
      words.includes("urgent") ||
      words.includes("immediate")
    ) {
      score += 25;
      detectedTypologies.push("SB");
    }

    // Check for risk transfer language
    if (
      words.includes("unforeseen") ||
      words.includes("circumstances") ||
      words.includes("modify")
    ) {
      score += 20;
      detectedTypologies.push("RT");
    }

    // Check for conflict potential
    if (
      words.includes("control") ||
      words.includes("direct") ||
      words.includes("related")
    ) {
      score += 15;
      detectedTypologies.push("CI");
    }

    const explanation = generateExplanation(detectedTypologies, score);

    setAnalysis({
      score: Math.min(score, 100),
      typologies: [...new Set(detectedTypologies)],
      explanation,
    });

    setIsAnalyzing(false);
  };

  const generateExplanation = (typologies: string[], score: number) => {
    const typologyDescriptions = {
      DG: "discretionary authority without clear constraints",
      SB: "procedural gaps that could obscure accountability",
      RT: "potential for shifting risk from private to public parties",
      CI: "relationships that could create conflicts of interest",
    };

    if (typologies.length === 0) {
      return "No significant structural risks detected in this clause.";
    }

    const descriptions = typologies.map(
      (t) => typologyDescriptions[t as keyof typeof typologyDescriptions],
    );
    return `Detected ${descriptions.join(", ")}. Risk level: ${score > 70 ? "High" : score > 40 ? "Medium" : "Low"}.`;
  };

  const loadExample = (example: any) => {
    setInputText(example.text);
    setAnalysis(example.analysis);
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return "text-red-600";
    if (score >= 40) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Try the System
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Paste a legal clause or contract snippet to see how Vigilum analyzes
            structural risks. This is a simplified demonstration of the full
            platform.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Side */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Legal Text Input
                </label>
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste a clause or legal text here..."
                  className="min-h-32"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => analyzeClause(inputText)}
                  disabled={!inputText.trim() || isAnalyzing}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Clause"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setInputText("");
                    setAnalysis(null);
                  }}
                >
                  Clear
                </Button>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  Try Examples:
                </h3>
                <div className="space-y-2">
                  {presetExamples.map((example) => (
                    <button
                      key={example.id}
                      onClick={() => loadExample(example)}
                      className="block w-full text-left p-3 border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-colors"
                    >
                      <div className="font-medium text-slate-900">
                        {example.title}
                      </div>
                      <div className="text-sm text-slate-600 truncate">
                        {example.text}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Analysis Side */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Analysis Result
                </label>

                {isAnalyzing ? (
                  <div className="border border-slate-200 rounded-lg p-6">
                    <div className="flex items-center justify-center space-x-3">
                      <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                      <span className="text-slate-600">
                        Analyzing structure...
                      </span>
                    </div>
                  </div>
                ) : analysis ? (
                  <div className="border border-slate-200 rounded-lg p-6 space-y-4">
                    {/* Risk Score */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">
                        Structural Risk Score
                      </span>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-2xl font-bold ${getRiskColor(analysis.score)}`}
                        >
                          {analysis.score}
                        </span>
                        <span className="text-slate-500">/100</span>
                      </div>
                    </div>

                    {/* Risk Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          analysis.score >= 70
                            ? "bg-red-500"
                            : analysis.score >= 40
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                        style={{ width: `${analysis.score}%` }}
                      ></div>
                    </div>

                    {/* Typologies */}
                    {analysis.typologies.length > 0 && (
                      <div>
                        <div className="text-sm font-medium text-slate-700 mb-2">
                          Detected Risk Typologies:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {analysis.typologies.map((type: string) => (
                            <span
                              key={type}
                              className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm font-medium"
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Explanation */}
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <Info
                          size={16}
                          className="text-slate-500 mt-0.5 flex-shrink-0"
                        />
                        <p className="text-sm text-slate-700">
                          {analysis.explanation}
                        </p>
                      </div>
                    </div>

                    <div className="text-xs text-slate-500">
                      Risk computed from clause interaction and semantic
                      patterns, not just keywords.
                    </div>
                  </div>
                ) : (
                  <div className="border border-slate-200 rounded-lg p-6 text-center text-slate-500">
                    Enter text above and click "Analyze Clause" to see results
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-12 bg-blue-50 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Info className="text-blue-600 mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">
                  Demo Limitations
                </h4>
                <p className="text-blue-800 text-sm">
                  This is a simplified demonstration. The full Vigilum platform
                  uses advanced AI models, comprehensive legal databases, and
                  cross-module analysis to provide more accurate and detailed
                  structural risk assessments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClauseDemo;
