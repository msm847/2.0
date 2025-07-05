import ModulePageTemplate from "@/components/vigilum/ModulePageTemplate";
import { Network, Users, GitBranch, Zap } from "lucide-react";

const moduleData = {
  id: "nexus-potentia",
  name: "NEXUS POTENTIA",
  subtitle: "Political Graph Mapper",
  tagline: "Influence is relational.",
  description:
    "Maps hidden networks, revolving doors, and control clusters behind awards using recursive relationship inference.",
  color: "#4e27a6",
  secondaryColor: "#6d28d9",
  textColor: "#ded1f7",
  accentColor: "#a78bfa",
  glyph: "λ",
  status: "OPERATIONAL",
  typologyFocus: ["DG", "SB"],
  riskFingerprint: 0.85,
  longDescription:
    "NEXUS POTENTIA constructs comprehensive influence maps by analyzing relationship networks between decision-makers, contractors, and intermediaries. Using recursive inference algorithms, it identifies hidden connections that create systematic bias in procurement and governance processes. The system excels at detecting revolving door patterns, family connections, and institutional capture mechanisms that operate below traditional disclosure thresholds.",
  capabilities: [
    "Multi-layer relationship network mapping and influence flow analysis",
    "Revolving door pattern detection across time and institutional boundaries",
    "Hidden connection inference through intermediate relationship analysis",
    "Power cluster identification and control mechanism mapping",
    "Dynamic network evolution tracking and intervention point analysis",
  ],
  exampleInputs: [
    {
      name: "Revolving Door Network",
      description:
        "Former regulator now contractor representative with active decision influence",
      risk: 0.87,
    },
    {
      name: "Family Connection Web",
      description:
        "Procurement officer's spouse owns winning contractor subsidiary",
      risk: 0.92,
    },
    {
      name: "Institutional Capture Cluster",
      description:
        "Board members across 6 entities creating systematic award bias",
      risk: 0.89,
    },
  ],
  patternArchive: [
    {
      id: "revolving-door",
      name: "Revolving Door",
      triggers: [
        "Career transitions between regulator and regulated entities",
        "Cooling-off period violations or circumvention",
        "Advisory role establishment maintaining influence channels",
      ],
      frequency: "DETECTED WEEKLY",
    },
    {
      id: "control-cluster",
      name: "Control Cluster",
      triggers: [
        "Overlapping board memberships across competitive entities",
        "Shared ownership structures in competing contractors",
        "Common advisors influencing multiple bid evaluations",
      ],
      frequency: "DETECTED MONTHLY",
    },
    {
      id: "influence-laundering",
      name: "Influence Laundering",
      triggers: [
        "Multi-hop relationship paths bypassing disclosure requirements",
        "Intermediary entities obscuring direct connections",
        "Temporal separation strategies to avoid connection detection",
      ],
      frequency: "DETECTED MONTHLY",
    },
  ],
};

const NEXUSPOTENTIAModulePage = () => {
  return (
    <ModulePageTemplate moduleData={moduleData}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Network Analysis Interface */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Network className="w-5 h-5 text-purple-400" />
            <h4 className="font-mono font-bold text-white">
              NETWORK MAPPER ACTIVE
            </h4>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded bg-purple-500/20 border border-purple-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-mono text-purple-300">
                  Nodes: 347 entities mapped
                </span>
              </div>
              <div className="text-xs text-gray-300 font-mono">
                Network density: 0.73 | Clustering coefficient: 0.91
              </div>
            </div>

            <div className="p-3 rounded bg-indigo-500/20 border border-indigo-500/30">
              <div className="flex items-center gap-2 mb-2">
                <GitBranch className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-mono text-indigo-300">
                  Hidden Paths: 23 discovered
                </span>
              </div>
              <div className="text-xs text-gray-300 font-mono">
                Average separation: 2.1 degrees | Influence flow: 0.85
              </div>
            </div>

            <div className="p-3 rounded bg-pink-500/20 border border-pink-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-pink-400" />
                <span className="text-sm font-mono text-pink-300">
                  Control Clusters: 4 identified
                </span>
              </div>
              <div className="text-xs text-gray-300 font-mono">
                Systematic bias probability: 0.89 | Capture score: HIGH
              </div>
            </div>
          </div>
        </div>

        {/* Influence Vectors */}
        <div className="space-y-4">
          <h4 className="font-mono font-bold text-white mb-4">
            INFLUENCE VECTORS
          </h4>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Network Density", value: "0.73", color: "#a78bfa" },
              { label: "Hidden Paths", value: "23", color: "#c084fc" },
              { label: "Control Score", value: "0.91", color: "#f0abfc" },
              { label: "Capture Risk", value: "0.85", color: "#fbbf24" },
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
              INFLUENCE PROJECTION
            </div>
            <div className="text-sm font-mono text-purple-300">
              λ(Network × Paths × Control) → Systemic Bias Vector
            </div>
          </div>
        </div>
      </div>
    </ModulePageTemplate>
  );
};

export default NEXUSPOTENTIAModulePage;
