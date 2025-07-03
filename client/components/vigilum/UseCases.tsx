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

  const cases = [
    {
      id: "L002",
      title: "Article 72 Procurement Override",
      sector: "Public Infrastructure",
      amount: "€847M",
      date: "2019-2022",
      status: "Structural Bypass Detected",
      riskLevel: 0.91,
      typology: "DG + RT",
      description:
        "Emergency procurement clause allowed systematic bypass of competitive bidding through temporal administrative compression.",
      originalClause:
        '"In cases of urgent operational necessity, the contracting authority may proceed with direct procurement procedures, subject to post-hoc administrative review."',
      riskIndicators: [
        "Unbounded emergency definition",
        "Post-hoc review mechanism",
        "Direct procurement pathway",
        "Administrative self-determination",
      ],
      overridePath: [
        "Emergency declaration",
        "Direct procurement activation",
        "Administrative review bypass",
        "Structural completion",
      ],
      outcome:
        "€847M in contracts awarded without competition. Administrative review never conducted. Structural override became institutional norm.",
      preventable: true,
    },
    {
      id: "L017",
      title: "Discretionary Grant Allocation",
      sector: "Regional Development",
      amount: "€312M",
      date: "2020-2021",
      status: "Timeline Compression",
      riskLevel: 0.74,
      typology: "DG + CI",
      description:
        "Grant eligibility criteria contained semantic contradictions enabling administrative discretion expansion.",
      originalClause:
        '"Grant recipients must demonstrate both innovation capacity and established operational history, with final determination at administrative discretion."',
      riskIndicators: [
        "Contradictory qualification requirements",
        "Administrative discretion clause",
        "Undefined determination criteria",
        "Temporal pressure mechanisms",
      ],
      overridePath: [
        "Contradiction exploitation",
        "Discretion amplification",
        "Criteria nullification",
        "Selective application",
      ],
      outcome:
        "€312M allocated to predetermined recipients. Contradiction used to justify any decision. Eligibility became meaningless.",
      preventable: true,
    },
    {
      id: "L023",
      title: "Regulatory Exemption Cascade",
      sector: "Financial Services",
      amount: "€1.2B",
      date: "2018-2020",
      status: "Clause Interference",
      riskLevel: 0.88,
      typology: "RT + SB",
      description:
        "Regulatory exemption for 'innovative financial products' created systematic oversight bypass through definitional ambiguity.",
      originalClause:
        '"Innovative financial products may be exempted from standard regulatory requirements pending comprehensive assessment, with interim operational approval."',
      riskIndicators: [
        "Innovation definition ambiguity",
        "Pending assessment loophole",
        "Interim approval mechanism",
        "Standard requirement bypass",
      ],
      overridePath: [
        "Innovation claim",
        "Interim approval",
        "Assessment delay",
        "Exemption normalization",
      ],
      outcome:
        "€1.2B in products operated without oversight. Assessment perpetually delayed. Exemption became permanent operational state.",
      preventable: true,
    },
  ];

  const currentCase = cases[selectedCase];

  return (
    <div className="bg-gray-900 py-20">
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
              ENCODED RISK CASE STUDIES
            </h2>
            <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto">
              Simulated retrospectives showing how structural risk was embedded
              in design and systematically overlooked until institutional
              failure.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Case Selection */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-bold text-white font-mono mb-6">
                  CASE LIBRARY
                </h3>
                <div className="space-y-3">
                  {cases.map((caseItem, index) => (
                    <button
                      key={caseItem.id}
                      onClick={() => setSelectedCase(index)}
                      className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                        selectedCase === index
                          ? "border-orange-500 bg-orange-900/20"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-mono text-orange-400">
                          {caseItem.id}
                        </div>
                        <div className="text-xs text-gray-500">
                          {caseItem.date}
                        </div>
                      </div>
                      <div className="text-sm text-white font-medium mb-1">
                        {caseItem.title}
                      </div>
                      <div className="text-xs text-gray-400">
                        {caseItem.sector}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="text-xs font-mono text-red-400">
                          {caseItem.amount}
                        </div>
                        <div className="text-xs text-gray-500">
                          Risk: {caseItem.riskLevel.toFixed(2)}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Case Details */}
            <div className="lg:col-span-3 space-y-6">
              {/* Case Header */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
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
                        <span>{currentCase.date}</span>
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

              {/* Original Clause */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
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

              {/* Risk Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Risk Indicators */}
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
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

                {/* Override Path */}
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-red-400" />
                    <h4 className="text-lg font-bold text-white font-mono">
                      OVERRIDE PATH
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {currentCase.overridePath.map((step, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-white font-mono">
                            {index + 1}
                          </span>
                        </div>
                        <div className="text-sm text-gray-300">{step}</div>
                        {index < currentCase.overridePath.length - 1 && (
                          <ArrowRight className="w-4 h-4 text-gray-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Outcome */}
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
                      <Eye className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-400 font-mono">
                        VIGILUM DETECTION: PREVENTABLE
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="text-center">
                <Button className="bg-orange-600 hover:bg-orange-500 text-white font-mono px-8">
                  ANALYZE SIMILAR STRUCTURES
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-red-400 font-mono mb-2">
                €2.4B
              </div>
              <div className="text-sm text-gray-400">
                Total structural exposure analyzed
              </div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-yellow-400 font-mono mb-2">
                100%
              </div>
              <div className="text-sm text-gray-400">
                Cases preventable through structural analysis
              </div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 font-mono mb-2">
                4
              </div>
              <div className="text-sm text-gray-400">
                Primary risk typologies identified
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCases;
