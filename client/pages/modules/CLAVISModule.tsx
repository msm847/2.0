import ModulePageTemplate from "@/components/vigilum/ModulePageTemplate";
import { Search, FileText, AlertTriangle, Activity } from "lucide-react";

const moduleData = {
  id: "clavis",
  name: "CLAVIS",
  subtitle: "Semantic Permutation Engine",
  tagline: "Structure discloses intent.",
  description:
    "Executes semantic permutations on atomic governance operators through non-commutative sequence logic to simulate institutional failure under formal compliance.",
  color: "#1a3d82",
  secondaryColor: "#1e40af",
  textColor: "#dce3f7",
  accentColor: "#60a5fa",
  glyph: "ϕ",
  status: "OPERATIONAL",
  typologyFocus: ["DG", "CI"],
  riskFingerprint: 0.91,
  longDescription:
    "CLAVIS operates as Vigilum's semantic execution engine, transforming legal structure analysis into a governance compiler. Through five atomic operators (O1-O5) acting on a 6-layer system tensor, it simulates how operator sequences create institutional realities. This is not corruption detection—it is corruption prediction through structural simulation. Each permutation represents a different legal machine, proving that meaning is compiled by order, not content.",
  capabilities: [
    "Five atomic semantic operators with non-commutative execution logic",
    "6-layer system tensor transformation (L, P, A, R, V, ε)",
    "Real-time override resolution matrix with typed suppression",
    "Temporal state propagation tracking (t₀ → t₅)",
    "Governance failure simulation under formal compliance conditions",
  ],
  exampleInputs: [
    {
      name: "O1→O2→O3→O4→O5 Default",
      description: "Standard operator sequence with reflex gate prioritization",
      risk: 0.73,
    },
    {
      name: "O5→O2→O4→O1→O3 Override",
      description: "Visibility mask first creates maximum compliance illusion",
      risk: 0.94,
    },
    {
      name: "O4→O5→O1→O3→O2 Procedural",
      description: "Procedural override cascade with environmental distortion",
      risk: 0.87,
    },
  ],
  patternArchive: [
    {
      id: "semantic-execution",
      name: "Semantic Execution Path",
      triggers: [
        "Non-commutative operator sequences",
        "Override resolution matrix activation",
        "Tensor state transformation cascade",
      ],
      frequency: "EXECUTED REAL-TIME",
    },
    {
      id: "compliance-illusion",
      name: "Compliance Illusion Generation",
      triggers: [
        "Visibility mask + simulated constraint",
        "Legal validity with procedural nullification",
        "Reflex space collapse under formal compliance",
      ],
      frequency: "DETECTED PER PERMUTATION",
    },
    {
      id: "institutional-failure",
      name: "Institutional Failure Modes",
      triggers: [
        "System decoherence > 0.8",
        "Dominant typology projection",
        "Governance tensor collapse patterns",
      ],
      frequency: "SIMULATED CONTINUOUSLY",
    },
  ],
};

const CLAVISModulePage = () => {
  return (
    <ModulePageTemplate moduleData={moduleData}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Semantic Engine Interface */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-5 h-5 text-blue-400" />
            <h4 className="font-mono font-bold text-white">
              SEMANTIC ENGINE ACTIVE
            </h4>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded bg-blue-500/20 border border-blue-500/30">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-mono text-blue-300">
                  Sequence: O1→O2→O3→O4→O5
                </span>
              </div>
              <div className="text-xs text-gray-300 font-mono">
                Executing non-commutative operator transformation...
              </div>
            </div>

            <div className="p-3 rounded bg-yellow-500/20 border border-yellow-500/30">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-mono text-yellow-300">
                  Override: O4 → O2 Active
                </span>
              </div>
              <div className="text-xs text-gray-300 font-mono">
                Procedural override nullifies simulated constraint
              </div>
            </div>

            <div className="p-3 rounded bg-red-500/20 border border-red-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-red-400" />
                <span className="text-sm font-mono text-red-300">
                  Decoherence: 0.87
                </span>
              </div>
              <div className="text-xs text-gray-300 font-mono">
                Institutional failure simulation complete
              </div>
            </div>
          </div>
        </div>

        {/* System Tensor Display */}
        <div className="space-y-4">
          <h4 className="font-mono font-bold text-white mb-4">
            SYSTEM TENSOR STATE
          </h4>

          <div className="grid grid-cols-3 gap-3">
            {[
              { layer: "L", name: "Legal", value: "0.52", color: "#60a5fa" },
              {
                layer: "P",
                name: "Procedural",
                value: "0.18",
                color: "#f87171",
              },
              { layer: "A", name: "Actor", value: "0.73", color: "#34d399" },
              { layer: "R", name: "Reflex", value: "0.29", color: "#fbbf24" },
              {
                layer: "V",
                name: "Visibility",
                value: "0.41",
                color: "#a78bfa",
              },
              {
                layer: "ε",
                name: "Environmental",
                value: "0.86",
                color: "#fb923c",
              },
            ].map((tensor, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border text-center"
                style={{
                  backgroundColor: `${tensor.color}20`,
                  borderColor: `${tensor.color}30`,
                }}
              >
                <div className="text-sm font-mono font-bold text-white">
                  {tensor.layer}
                </div>
                <div
                  className="text-lg font-mono font-bold"
                  style={{ color: tensor.color }}
                >
                  {tensor.value}
                </div>
                <div className="text-xs text-gray-400 mt-1">{tensor.name}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded bg-gray-800/50 border border-gray-600">
            <div className="text-xs font-mono text-gray-400 mb-2">
              SEMANTIC EXECUTION
            </div>
            <div className="text-sm font-mono text-blue-300">
              𝒮<sub>final</sub> = O5 ∘ O4 ∘ O3 ∘ O2 ∘ O1 (𝒮<sub>0</sub>)
            </div>
          </div>
        </div>
      </div>
    </ModulePageTemplate>
  );
};

export default CLAVISModulePage;
