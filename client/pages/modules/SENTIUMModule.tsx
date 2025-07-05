import ModulePageTemplate from "@/components/vigilum/ModulePageTemplate";
import { MessageCircle, Shield, Eye, Users } from "lucide-react";

const moduleData = {
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
  glyph: "Ω",
  status: "MONITORING",
  typologyFocus: ["CI", "OD"],
  riskFingerprint: 0.67,
  longDescription:
    "SENTIUM bridges human intelligence with automated risk detection by creating secure channels for civic reporting while cross-validating witness accounts against AI-detected patterns. It transforms subjective observations into quantified risk signals, enabling triangulation between human insight and computational analysis to identify governance risks that neither could detect alone.",
  capabilities: [
    "Encrypted civic reporting with identity protection protocols",
    "Cross-validation between human reports and AI pattern detection",
    "Signal triangulation combining witness accounts with structural analysis",
    "Credibility assessment using corroboration algorithms",
    "Real-time alert generation for corroborated high-risk situations",
  ],
  exampleInputs: [
    {
      name: "Whistleblower Report + AI Correlation",
      description:
        "Insider account of bid-rigging confirmed by OBSCURA pattern detection",
      risk: 0.89,
    },
    {
      name: "Citizen Observation Network",
      description:
        "Multiple independent reports of procurement timeline manipulation",
      risk: 0.72,
    },
    {
      name: "Cross-Platform Signal Fusion",
      description:
        "Social media, official reports, and witness accounts converging",
      risk: 0.81,
    },
  ],
  patternArchive: [
    {
      id: "signal-triangulation",
      name: "Signal Triangulation",
      triggers: [
        "Human report correlation with AI pattern detection",
        "Multiple independent sources confirming same risk pattern",
        "Cross-validation success rate exceeding 0.75 threshold",
      ],
      frequency: "DETECTED WEEKLY",
    },
    {
      id: "witness-protection",
      name: "Witness Protection",
      triggers: [
        "High-risk reporting requiring enhanced anonymity protocols",
        "Retaliation indicators detected in source environment",
        "Source verification required for critical governance alerts",
      ],
      frequency: "DETECTED MONTHLY",
    },
    {
      id: "civic-amplification",
      name: "Civic Amplification",
      triggers: [
        "Distributed reporting network activation for single event",
        "Social verification exceeding normal engagement patterns",
        "Community-scale governance concern requiring escalation",
      ],
      frequency: "DETECTED WEEKLY",
    },
  ],
};

const SENTIUMModulePage = () => {
  return (
    <ModulePageTemplate moduleData={moduleData}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Civic Signal Monitor */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-5 h-5 text-cyan-400" />
            <h4 className="font-mono font-bold text-white">
              CIVIC SIGNAL MONITOR ACTIVE
            </h4>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded bg-cyan-500/20 border border-cyan-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-mono text-cyan-300">
                  Active Reports: 23 encrypted channels
                </span>
              </div>
              <div className="text-xs text-gray-300 font-mono">
                Identity protection active | Triangulation protocols enabled
              </div>
            </div>

            <div className="p-3 rounded bg-blue-500/20 border border-blue-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-mono text-blue-300">
                  Cross-Validation: 89% correlation with AI patterns
                </span>
              </div>
              <div className="text-xs text-gray-300 font-mono">
                Human intelligence confirming computational risk detection
              </div>
            </div>

            <div className="p-3 rounded bg-green-500/20 border border-green-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-green-400" />
                <span className="text-sm font-mono text-green-300">
                  Network Effect: 347 civic sensors online
                </span>
              </div>
              <div className="text-xs text-gray-300 font-mono">
                Distributed observation network providing real-time coverage
              </div>
            </div>
          </div>
        </div>

        {/* Signal Fusion Metrics */}
        <div className="space-y-4">
          <h4 className="font-mono font-bold text-white mb-4">
            SIGNAL FUSION METRICS
          </h4>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Report Validity", value: "0.89", color: "#22d3ee" },
              { label: "AI Correlation", value: "0.76", color: "#3b82f6" },
              { label: "Network Coverage", value: "347", color: "#10b981" },
              { label: "Protection Level", value: "MAX", color: "#f59e0b" },
            ].map((metric, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border text-center"
                style={{
                  backgroundColor: `${metric.color}20`,
                  borderColor: `${metric.color}30`,
                }}
              >
                <div
                  className="text-lg font-mono font-bold"
                  style={{ color: metric.color }}
                >
                  {metric.value}
                </div>
                <div className="text-xs text-gray-400 mt-1">{metric.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded bg-gray-800/50 border border-gray-600">
            <div className="text-xs font-mono text-gray-400 mb-2">
              CIVIC FUSION VECTOR
            </div>
            <div className="text-sm font-mono text-cyan-300">
              Ω(Human Reports × AI Patterns × Network Effect) → Triangulated
              Truth
            </div>
          </div>
        </div>
      </div>
    </ModulePageTemplate>
  );
};

export default SENTIUMModulePage;
