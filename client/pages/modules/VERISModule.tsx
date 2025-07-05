import ModulePageTemplate from "@/components/vigilum/ModulePageTemplate";
import {
  BarChart3,
  TrendingDown,
  AlertTriangle,
  Calculator,
} from "lucide-react";

const moduleData = {
  id: "veris",
  name: "VERIS",
  subtitle: "Structural Risk Index",
  tagline: "Integrity becomes quantifiable.",
  description:
    "Aggregates all risk vectors into a composite signal score—quantifying governance fragility across entities, tenders, and time.",
  color: "#a65800",
  secondaryColor: "#b45309",
  textColor: "#f5d199",
  accentColor: "#fbbf24",
  glyph: "τ",
  status: "ESCALATED",
  typologyFocus: ["ALL"],
  riskFingerprint: 0.92,
  longDescription:
    "VERIS transforms qualitative governance risks into quantitative intelligence through sophisticated scoring algorithms that aggregate multi-dimensional risk vectors. It creates standardized risk indices that enable comparison across entities, time periods, and governance domains, providing crucial metrics for policy intervention and institutional reform decisions.",
  capabilities: [
    "Multi-dimensional risk vector aggregation and standardization",
    "Temporal risk evolution tracking and degradation pattern analysis",
    "Comparative risk indexing across entities and institutional contexts",
    "Predictive risk modeling using historical pattern analysis",
    "Policy impact assessment through risk score trajectory analysis",
  ],
  exampleInputs: [
    {
      name: "Entity Composite Score",
      description:
        "Municipal procurement authority with 847-day risk accumulation",
      risk: 0.92,
    },
    {
      name: "Sectoral Risk Index",
      description:
        "Infrastructure sector showing systematic degradation over 18 months",
      risk: 0.89,
    },
    {
      name: "Temporal Risk Trajectory",
      description:
        "Accelerating risk accumulation indicating imminent governance failure",
      risk: 0.94,
    },
  ],
  patternArchive: [
    {
      id: "risk-accumulation",
      name: "Risk Accumulation",
      triggers: [
        "Steady score increase over 6+ month periods",
        "Multiple risk vector convergence on single entity",
        "Cross-typology correlation exceeding normal variance",
      ],
      frequency: "DETECTED WEEKLY",
    },
    {
      id: "systemic-degradation",
      name: "Systemic Degradation",
      triggers: [
        "Sector-wide risk score increases beyond normal fluctuation",
        "Institutional score correlation indicating network effects",
        "Policy implementation failure reflected in aggregate metrics",
      ],
      frequency: "DETECTED MONTHLY",
    },
    {
      id: "governance-collapse",
      name: "Governance Collapse",
      triggers: [
        "Composite scores exceeding critical thresholds",
        "Rapid score acceleration indicating systemic failure",
        "Multi-entity score synchronization suggesting coordinated risk",
      ],
      frequency: "DETECTED QUARTERLY",
    },
  ],
};

const VERISModulePage = () => {
  return (
    <ModulePageTemplate moduleData={moduleData}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Scoring Engine */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-5 h-5 text-yellow-400" />
            <h4 className="font-mono font-bold text-white">
              RISK SCORING ENGINE ACTIVE
            </h4>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded bg-yellow-500/20 border border-yellow-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-mono text-yellow-300">
                  Composite Score: 0.92/1.00
                </span>
              </div>
              <div className="text-xs text-gray-300 font-mono">
                Risk aggregation across 7 modules and 4 typologies
              </div>
            </div>

            <div className="p-3 rounded bg-orange-500/20 border border-orange-500/30">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-mono text-orange-300">
                  Trajectory: Accelerating degradation
                </span>
              </div>
              <div className="text-xs text-gray-300 font-mono">
                18-month trend indicates systematic governance failure
              </div>
            </div>

            <div className="p-3 rounded bg-red-500/20 border border-red-500/30">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-sm font-mono text-red-300">
                  Status: ESCALATED intervention required
                </span>
              </div>
              <div className="text-xs text-gray-300 font-mono">
                Score exceeds intervention threshold - immediate action needed
              </div>
            </div>
          </div>
        </div>

        {/* Risk Index Components */}
        <div className="space-y-4">
          <h4 className="font-mono font-bold text-white mb-4">
            RISK INDEX COMPONENTS
          </h4>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "DG Score", value: "0.91", color: "#fbbf24" },
              { label: "RT Score", value: "0.74", color: "#fb7185" },
              { label: "CI Score", value: "0.88", color: "#a78bfa" },
              { label: "SB Score", value: "0.95", color: "#f87171" },
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
              COMPOSITE FORMULA
            </div>
            <div className="text-sm font-mono text-yellow-300">
              τ(DG × RT × CI × SB) → Σ(Weighted Risk Vector) → Governance Index
            </div>
          </div>
        </div>
      </div>
    </ModulePageTemplate>
  );
};

export default VERISModulePage;
