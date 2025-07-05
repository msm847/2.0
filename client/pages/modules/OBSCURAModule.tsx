import ModulePageTemplate from "@/components/vigilum/ModulePageTemplate";
import { Eye, Clock, Target, TrendingDown } from "lucide-react";

const moduleData = {
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
  glyph: "⊗",
  status: "ACTIVE",
  typologyFocus: ["RT", "SB"],
  riskFingerprint: 0.74,
  longDescription:
    "OBSCURA specializes in detecting procurement processes designed to limit competition and ensure predetermined outcomes. By analyzing temporal patterns, bidder behavior, and procedural anomalies, it identifies tenders structured for capture before they officially close. The system excels at recognizing sophisticated distortion techniques that appear legitimate while fundamentally undermining competitive processes.",
  capabilities: [
    "Timeline compression analysis for artificial urgency detection",
    "Bidder participation pattern analysis and dominance mapping",
    "Emergency justification authenticity verification",
    "Technical specification targeting and barrier analysis",
    "Market concentration risk assessment and collusion indicators",
  ],
  exampleInputs: [
    {
      name: "48-Hour Emergency Tender",
      description:
        "Infrastructure tender with compressed timeline and single response",
      risk: 0.89,
    },
    {
      name: "Technical Specification Lock",
      description: "Requirements tailored to exclude all but preferred vendors",
      risk: 0.76,
    },
    {
      name: "Repeat Winner Pattern",
      description:
        "Same contractor winning 85% of related tenders over 24 months",
      risk: 0.92,
    },
  ],
  patternArchive: [
    {
      id: "temporal-compression",
      name: "Temporal Compression",
      triggers: [
        "Timeline < 72 hours for non-emergency",
        "Publication timing outside business hours",
        "Deadline during holidays or weekends",
      ],
      frequency: "DETECTED DAILY",
    },
    {
      id: "specification-targeting",
      name: "Specification Targeting",
      triggers: [
        "Requirements matching single vendor capabilities",
        "Obscure certification requirements",
        "Geographic restrictions without justification",
      ],
      frequency: "DETECTED WEEKLY",
    },
    {
      id: "bid-suppression",
      name: "Bid Suppression",
      triggers: [
        "Information access barriers",
        "Complex pre-qualification requirements",
        "Unclear evaluation criteria",
      ],
      frequency: "DETECTED WEEKLY",
    },
  ],
};

const OBSCURAModulePage = () => {
  return (
    <ModulePageTemplate moduleData={moduleData}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Procurement Analysis Interface */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-5 h-5 text-red-400" />
            <h4 className="font-mono font-bold text-white">
              PROCUREMENT SCANNER ACTIVE
            </h4>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded bg-red-500/20 border border-red-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-red-400" />
                <span className="text-sm font-mono text-red-300">
                  Timeline: 48h Emergency
                </span>
              </div>
              <div className="text-xs text-gray-300 font-mono">
                Artificial urgency detected - no genuine emergency justification
              </div>
            </div>

            <div className="p-3 rounded bg-orange-500/20 border border-orange-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-mono text-orange-300">
                  Bidders: 1 Response
                </span>
              </div>
              <div className="text-xs text-gray-300 font-mono">
                Competition suppression via specification targeting
              </div>
            </div>

            <div className="p-3 rounded bg-yellow-500/20 border border-yellow-500/30">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-mono text-yellow-300">
                  Historical Pattern: 89% Same Winner
                </span>
              </div>
              <div className="text-xs text-gray-300 font-mono">
                Systematic market dominance confirmed
              </div>
            </div>
          </div>
        </div>

        {/* Distortion Metrics */}
        <div className="space-y-4">
          <h4 className="font-mono font-bold text-white mb-4">
            DISTORTION METRICS
          </h4>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Competition Index", value: "0.12", color: "#f87171" },
              { label: "Timeline Ratio", value: "0.08", color: "#fb923c" },
              { label: "Barrier Score", value: "0.91", color: "#fbbf24" },
              { label: "Market Health", value: "0.23", color: "#f87171" },
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
              DISTORTION VECTOR
            </div>
            <div className="text-sm font-mono text-red-300">
              ⊗(Timeline × Barriers × Competition) → RT Risk Projection
            </div>
          </div>
        </div>
      </div>
    </ModulePageTemplate>
  );
};

export default OBSCURAModulePage;
