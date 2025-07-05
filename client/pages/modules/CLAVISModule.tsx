import ModulePageTemplate from "@/components/vigilum/ModulePageTemplate";
import { Search, FileText, AlertTriangle } from "lucide-react";

const moduleData = {
  id: "clavis",
  name: "CLAVIS",
  subtitle: "Clause Intelligence Engine",
  tagline: "Structure discloses intent.",
  description:
    "Parses legal clauses to detect embedded risk logic, exposing how contracts simulate legality while shifting liability.",
  color: "#1a3d82",
  secondaryColor: "#1e40af",
  textColor: "#dce3f7",
  accentColor: "#60a5fa",
  glyph: "ϕ",
  status: "OPERATIONAL",
  typologyFocus: ["DG", "CI"],
  riskFingerprint: 0.91,
  longDescription:
    "CLAVIS operates as Vigilum's primary cognition module for legal structure analysis. Through deep semantic parsing, it identifies clause sequences that create governance vulnerabilities—not through what contracts say, but through what their structure permits. The system excels at detecting liability displacement mechanisms, administrative override pathways, and semantic contradictions that render enforcement impossible.",
  capabilities: [
    "Semantic clause vector analysis and structural risk mapping",
    "Non-commutative clause sequence modeling for vulnerability detection",
    "Override graph construction revealing structural bypass mechanisms",
    "Pattern recognition for known evasion architectures",
    "Real-time risk projection through clause combination analysis",
  ],
  exampleInputs: [
    {
      name: "L001→L002→L003 Sequence",
      description:
        "Standard EU procurement directive with emergency bypass clause",
      risk: 0.91,
    },
    {
      name: "Article 32.4 Override Pattern",
      description:
        "Administrative discretion clause with compliance waiver logic",
      risk: 0.74,
    },
    {
      name: "Force Majeure Cascade",
      description:
        "Emergency justification with retroactive approval mechanism",
      risk: 0.86,
    },
  ],
  patternArchive: [
    {
      id: "override-by-design",
      name: "Override by Design",
      triggers: [
        "Emergency justification + retroactive approval",
        "Administrative discretion exceeding 30%",
        "Compliance waiver in base contract",
      ],
      frequency: "DETECTED DAILY",
    },
    {
      id: "liability-displacement",
      name: "Liability Displacement",
      triggers: [
        "Third-party liability transfer",
        "Force majeure scope expansion",
        "Indemnification clause clustering",
      ],
      frequency: "DETECTED WEEKLY",
    },
    {
      id: "semantic-contradiction",
      name: "Semantic Contradiction",
      triggers: [
        "Conflicting clause precedence",
        "Circular reference logic",
        "Undefined term exploitation",
      ],
      frequency: "DETECTED MONTHLY",
    },
  ],
};

const CLAVISModulePage = () => {
  return (
    <ModulePageTemplate moduleData={moduleData}>
      {/* CLAVIS-specific semantic interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clause Parser Interface */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-5 h-5 text-blue-400" />
            <h4 className="font-mono font-bold text-white">
              CLAUSE PARSER ACTIVE
            </h4>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded bg-blue-500/20 border border-blue-500/30">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-mono text-blue-300">
                  Input: L001→L002→L003
                </span>
              </div>
              <div className="text-xs text-gray-300 font-mono">
                Analyzing procurement directive clause sequence...
              </div>
            </div>

            <div className="p-3 rounded bg-yellow-500/20 border border-yellow-500/30">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-mono text-yellow-300">
                  Override Pattern Detected
                </span>
              </div>
              <div className="text-xs text-gray-300 font-mono">
                L002 structural override → L001 compliance bypass
              </div>
            </div>

            <div className="p-3 rounded bg-red-500/20 border border-red-500/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full bg-red-400 animate-pulse" />
                <span className="text-sm font-mono text-red-300">
                  Risk Projection: 0.91
                </span>
              </div>
              <div className="text-xs text-gray-300 font-mono">
                Governance vulnerability confirmed
              </div>
            </div>
          </div>
        </div>

        {/* Semantic Vector Display */}
        <div className="space-y-4">
          <h4 className="font-mono font-bold text-white mb-4">
            SEMANTIC VECTORS
          </h4>

          <div className="grid grid-cols-3 gap-3">
            {["ϕ(L001)", "ϕ(L002)", "ϕ(L003)"].map((vector, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border text-center"
                style={{
                  backgroundColor: "#60a5fa20",
                  borderColor: "#60a5fa30",
                }}
              >
                <div className="text-sm font-mono text-blue-300">{vector}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {(0.8 + Math.random() * 0.2).toFixed(3)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded bg-gray-800/50 border border-gray-600">
            <div className="text-xs font-mono text-gray-400 mb-2">
              SEMANTIC PROJECTION
            </div>
            <div className="text-sm font-mono text-blue-300">
              ϕ(c₁…c₃) → ⊗(sequence logic) → G(override graph) → τ(risk
              projection)
            </div>
          </div>
        </div>
      </div>
    </ModulePageTemplate>
  );
};

export default CLAVISModulePage;
