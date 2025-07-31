import { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Download,
  RefreshCw,
  Eye,
  FileText,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Info,
  X,
} from "lucide-react";

// V1 Operators - Pure UI/UX data (no mathematics)
const OPERATORS_V1 = [
  {
    id: "H",
    name: "Unbreakable Constraint",
    fullName: "Unbreakable Constraint",
    symbol: "H",
    glyph: "⬛",
    color: "#10B981",
    description:
      "Unbreakable Constraint defines a boundary that cannot be crossed or dissolved from within the system, no matter what other operators are invoked. It requires an external, independent actor—often a regulator, court, or sovereign authority—to permit an exception or breach, and even then only under conditions that are hard-coded and immutable. This operator represents true structural friction: it is the only reliable defense against capture or override, because it is designed to be non-negotiable and to survive attempts at internal nullification or simulation. In institutional logic, genuine unbreakable constraints are rare and valuable, marking the difference between simulated compliance and actual legal or operational immovability. Where most controls can be circumvented through sophisticated clause sequencing or discretionary override, an unbreakable constraint draws an absolute line, forcing all actors to operate within its bounds or face existential system breakdown.",
    impact:
      "Creates immutable structural boundaries that resist all override attempts.",
  },
  {
    id: "O",
    name: "Override",
    fullName: "Override",
    symbol: "O",
    glyph: "⊗",
    color: "#EF4444",
    description:
      "Override is a structural operator that allows any previously established rule, safeguard, or procedure to be suspended or bypassed at a single decision point, typically by an actor granted exceptional authority or via a clause that explicitly nullifies prior constraints. When present, this operator acts as the system's escape valve—turning hard rules into soft preferences by permitting discretionary exceptions regardless of the surrounding structure. In practice, overrides are often embedded as \"notwithstanding\" clauses, emergency provisions, or catch-all authorizations, making them the prime mechanism for legal extraction, regulatory evasion, or late-stage risk injection. The presence of an override transforms the entire risk profile of a system: it signals that no matter how many controls are built in, a single invocation can route around them, erasing the boundary between compliance and discretionary power. This operator is the true test of whether a system's constraints are real or merely provisional.",
    impact:
      "Enables systematic bypass of established constraints and procedures.",
  },
  {
    id: "XT",
    name: "Extraction/Transfer",
    fullName: "Extraction/Transfer",
    symbol: "XT",
    glyph: "⧨",
    color: "#8B5CF6",
    description:
      "Extraction/Transfer is the core operator through which value, risk, decision rights, or liability are structurally moved out of the originating system, either to external entities, hidden intermediaries, or parallel structures. It operates regardless of surface compliance: whenever a contract, statute, or policy grants the right to shift money, responsibility, or control beyond the oversight boundary, this operator is in play. Extraction may be explicit (fees to an offshore partner, liability shifted to a subcontractor) or disguised (service flows through opaque SPVs), but in every case it severs the internal chain of accountability. This operator is what transforms system resilience into system exposure: once activated, internal safeguards, audits, or rules have no purchase over the extracted asset or risk. In governance and procurement, repeated application of extraction/transfer is the primary channel for laundering, asset flight, or regulatory arbitrage.",
    impact:
      "Moves value and responsibility outside system oversight boundaries.",
  },
  {
    id: "F",
    name: "Fracture",
    fullName: "Fracture",
    symbol: "F",
    glyph: "⚬",
    color: "#F59E0B",
    description:
      'Fracture atomizes accountability by distributing critical process steps, approvals, or decision points across multiple actors, departments, or legal entities in such a way that no one node has full visibility or control. The result is structural ambiguity: each participant can plausibly deny knowledge or responsibility for the system\'s outcomes, while risk or value moves seamlessly through the gaps. This operator is not simply about "multiple signatures" or "distributed roles"—it is about the deliberate engineering of blind spots, so that failure, loss, or extraction cannot be traced to a single decision or clause. Fracture is the backbone of modern institutional evasion: it enables complex laundering, diffuses blame, and makes audit trails meaningless unless re-aggregated with forensic effort. Where fracture is present, even the best oversight bodies are forced to reconstruct the puzzle after the fact, often too late for remediation.',
    impact:
      "Distributes accountability across multiple actors to create blind spots.",
  },
  {
    id: "I",
    name: "Indirection",
    fullName: "Indirection",
    symbol: "I",
    glyph: "⦿",
    color: "#06B6D4",
    description:
      "Indirection routes control, decision-making, or value through a chain of proxies, affiliates, or off-ledger vehicles to obscure the true path and ultimate beneficiary. Unlike masking, which operates through ambiguity or complexity, indirection creates a formally correct but substantively misleading sequence of actors or steps. Its essence is to break the link between apparent and real control: what appears as an arms-length transaction or compliant process is, in fact, a channel for concealed influence or extraction. Indirection is the favored tool of those seeking to avoid scrutiny—political actors, oligarchic networks, or multinationals structuring around sanctions or procurement caps. Its detection requires not just reading the contract, but reconstructing the real-world flow of authority, money, or risk through layered intermediaries that are often outside standard audit reach.",
    impact:
      "Routes control through intermediaries to obscure true beneficiaries.",
  },
];

// V2 Operators - Pure UI/UX data (no mathematics)
const OPERATORS_V2 = [
  {
    id: "S",
    name: "Simulation",
    fullName: "Simulation",
    symbol: "S",
    glyph: "⟐",
    color: "#06B6D4",
    description:
      'Simulation transforms structural risk by replicating the surface appearance of compliance, oversight, or procedural integrity without enforcing any actual constraint. This operator is executed through symbolic actions—non-binding audits, advisory committees, or reviews whose outcomes do not alter the system\'s real operation. In effect, simulation "fools" both internal and external observers: it provides the audit trail, the ritual, and the reporting, yet all actors know the process is performative. Simulation is not mere theater; it is the central defense of advanced captured systems, absorbing pressure from regulators, the public, or oversight bodies while ensuring that true power dynamics remain untouched. When simulation dominates, the system becomes audit-proof and sanction-resistant—not because it is safe, but because it is semantically and operationally insulated from intervention.',
    impact: "Creates performative compliance without real constraint.",
  },
  {
    id: "M",
    name: "Masking",
    fullName: "Masking and Semantic Opacity",
    symbol: "M",
    glyph: "⧨",
    color: "#F97316",
    description:
      'Masking is the deliberate obscuring of risk, intent, or extraction logic through layers of legal complexity, ambiguous terminology, or non-transparent structures. Unlike simulation (which creates the appearance of constraint), masking ensures that the system\'s real operation cannot be reconstructed without insider knowledge or deep forensic analysis. Masking can be achieved via undefined "strategic partnerships," complex cross-border arrangements, or simply by using language that is so broad or nuanced that it resists interpretation. This operator is the engine of legal opacity: it allows extraction or evasion to occur in plain sight, safe behind procedural or technical camouflage. When masking is deployed, even a diligent regulator or auditor may certify compliance while missing the core transformation taking place beneath the legal surface.',
    impact: "Obscures real operations through legal and procedural complexity.",
  },
  {
    id: "C",
    name: "Compression",
    fullName: "Compression",
    symbol: "C",
    glyph: "⊞",
    color: "#8B5CF6",
    description:
      'Compression accelerates or condenses decision cycles, procedural stages, or review windows to such a degree that meaningful oversight, contestation, or deliberation becomes structurally impossible. This operator is activated through emergency timelines, stacked deadlines, or forced simultaneity of process—tools that create an artificial sense of urgency or inevitability. Compression disables the normal operation of checks and balances: by forcing actors to choose or sign off with minimal information and no time for scrutiny, it maximizes the probability of error, oversight, or opportunistic capture. In procurement, policy, or regulation, compression is how "urgent" contracts are awarded, how complex reforms are rushed through, and how backdoor risk is laundered into official decisions without opposition.',
    impact: "Compresses decision timeframes to prevent meaningful oversight.",
  },
  {
    id: "R",
    name: "Reinjection",
    fullName: "Reinjection",
    symbol: "R",
    glyph: "⟲",
    color: "#EF4444",
    description:
      'Reinjection brings previously excluded, neutralized, or extracted risk, value, or process back into the system through a new channel, often after surface closure or apparent remediation. This operator allows systems to "recycle" loopholes, funds, or structural exposures by rebranding, repackaging, or relaunching them under a different guise. Reinjection is critical in systems with dynamic oversight: whenever a risk pathway appears to have been blocked, but later resurfaces via a different actor, fund, or clause, reinjection is at work. It is the structural answer to "loophole whack-a-mole"—no matter how many times a vulnerability is closed, the logic of reinjection guarantees its return unless the system is hardened at the root.',
    impact: "Reintroduces previously neutralized risks through new channels.",
  },
  {
    id: "A",
    name: "Aggregation",
    fullName: "Aggregation",
    symbol: "A",
    glyph: "⊕",
    color: "#10B981",
    description:
      'Aggregation combines multiple minor actions, decisions, or actors—each innocuous or low-risk in isolation—into an emergent, cumulative exposure that becomes significant only in aggregate. The operator functions invisibly when oversight focuses on thresholds, single transactions, or compartmentalized decisions: by splitting large risk or extraction pathways into a series of small, authorized steps, aggregation achieves the same structural outcome as a single, high-risk move but with none of the visibility or friction. This is the engine of "smurfing" in money laundering, serial contract splitting in procurement, or repetitive low-level approvals that bypass systemic limits. Aggregation is difficult to detect except through systemic analysis: it thrives in systems where rules are local, but extraction is global.',
    impact: "Combines minor actions into significant cumulative exposure.",
  },
];

const SemanticPermutationEngine = () => {
  const [operatorVersion, setOperatorVersion] = useState<"v1" | "v2">("v1");
  const [operatorSequenceV1, setOperatorSequenceV1] = useState([
    "H",
    "O",
    "XT",
    "F",
    "I",
  ]);
  const [operatorSequenceV2, setOperatorSequenceV2] = useState([
    "S",
    "M",
    "C",
    "R",
    "A",
  ]);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [showTrace, setShowTrace] = useState(false);
  const [showJSON, setShowJSON] = useState(false);

  // Get current operators and sequence
  const getCurrentOperators = () => {
    return operatorVersion === "v1" ? OPERATORS_V1 : OPERATORS_V2;
  };

  const getCurrentSequence = () => {
    return operatorVersion === "v1" ? operatorSequenceV1 : operatorSequenceV2;
  };

  const setCurrentSequence = (sequence: string[]) => {
    if (operatorVersion === "v1") {
      setOperatorSequenceV1(sequence);
    } else {
      setOperatorSequenceV2(sequence);
    }
  };

  // Toggle card flip
  const toggleCard = useCallback((operatorId: string) => {
    setFlippedCards((prev) => {
      const newFlipped = new Set(prev);
      if (newFlipped.has(operatorId)) {
        newFlipped.delete(operatorId);
      } else {
        newFlipped.add(operatorId);
      }
      return newFlipped;
    });
  }, []);

  // Shuffle operators
  const shuffleOperators = useCallback(() => {
    const currentSeq = getCurrentSequence();
    const shuffled = [...currentSeq];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setCurrentSequence(shuffled);
  }, [operatorVersion, operatorSequenceV1, operatorSequenceV2]);

  // Reset to default
  const resetToDefault = useCallback(() => {
    if (operatorVersion === "v1") {
      setOperatorSequenceV1(["H", "O", "XT", "F", "I"]);
    } else {
      setOperatorSequenceV2(["S", "M", "C", "R", "A"]);
    }
    setFlippedCards(new Set());
  }, [operatorVersion]);

  // Download results (just downloads current sequence info)
  const downloadResults = useCallback(() => {
    const mockResult = {
      permutation: getCurrentSequence(),
      operatorVersion: operatorVersion,
      timestamp: new Date().toISOString(),
      note: "Visual interface data - no mathematical calculations performed",
    };
    const dataStr = JSON.stringify(mockResult, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `vigilum-spe-${getCurrentSequence().join("-")}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [operatorVersion, operatorSequenceV1, operatorSequenceV2]);

  return (
    <div
      className="py-20 px-4"
      style={{
        background: "linear-gradient(90deg, #1e2d26 0%, #1f2225 100%)",
        backgroundColor: "#1e2d26",
      }}
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 mt-8">
          <h2
            className="mb-8 font-semibold leading-tight"
            style={{
              fontFamily: "IBM Plex Sans, sans-serif",
              fontSize: "clamp(2.4rem, 3.4vw, 3rem)",
              color: "#E5F3ED",
            }}
          >
            Semantic Permutation State Rendering
          </h2>
          <div className="text-xl text-gray-400 font-light leading-relaxed text-center max-w-4xl mx-auto">
            <p>
              No abstraction. Contract logic and operational context rendered as
              quantifiable outcome.
            </p>
          </div>
        </div>

        {/* Interactive Operator Cards */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    if (operatorVersion === "v1") return;
                    setOperatorVersion("v1");
                    setFlippedCards(new Set());
                  }}
                  disabled={operatorVersion === "v1"}
                  className={`px-4 py-2 rounded border font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                    operatorVersion === "v1"
                      ? "border-green-400 bg-green-400/20 text-green-400"
                      : "border-gray-600 bg-gray-800/50 text-gray-400"
                  }`}
                >
                  OPERATOR SEQUENCE V1
                </button>
                <button
                  onClick={() => {
                    if (operatorVersion === "v2") return;
                    setOperatorVersion("v2");
                    setFlippedCards(new Set());
                  }}
                  disabled={operatorVersion === "v2"}
                  className={`px-4 py-2 rounded border font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                    operatorVersion === "v2"
                      ? "border-green-400 bg-green-400/20 text-green-400"
                      : "border-gray-600 bg-gray-800/50 text-gray-400"
                  }`}
                >
                  OPERATOR SEQUENCE V2
                </button>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={shuffleOperators}
                className="px-4 py-2 rounded border font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: "rgba(16, 44, 34, 0.7)",
                  borderColor: "rgba(52, 211, 153, 0.3)",
                  color: "#10b981",
                }}
              >
                <RefreshCw className="w-4 h-4 mr-2 inline" />
                SHUFFLE
              </button>
              <button
                onClick={resetToDefault}
                className="px-4 py-2 rounded border font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: "rgba(16, 44, 34, 0.7)",
                  borderColor: "rgba(52, 211, 153, 0.3)",
                  color: "#10b981",
                }}
              >
                RESET
              </button>
            </div>
          </div>

          {/* Operator Cards with Flip Animation */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {getCurrentSequence().map((opId, index) => {
              const operator = getCurrentOperators().find(
                (op) => op.id === opId,
              )!;
              const isFlipped = flippedCards.has(opId);

              return (
                <div
                  key={`${opId}-${index}`}
                  className="relative h-64 cursor-pointer"
                  style={{ perspective: "1000px" }}
                  onClick={() => toggleCard(opId)}
                >
                  <motion.div
                    className="relative w-full h-full transition-transform duration-700 ease-out"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isFlipped
                        ? "rotateY(180deg)"
                        : "rotateY(0deg)",
                    }}
                    transition={{
                      duration: 0.7,
                      ease: "easeOut",
                    }}
                  >
                    {/* Front Face */}
                    <div
                      className="absolute w-full h-full rounded-lg border-2 p-4 flex flex-col justify-center items-center"
                      style={{
                        backgroundColor: `${operator.color}15`,
                        borderColor: operator.color,
                        backfaceVisibility: "hidden",
                        boxShadow: `0 4px 20px ${operator.color}30`,
                      }}
                    >
                      {/* Position indicator */}
                      <div className="absolute top-2 left-2 text-xs font-mono text-gray-400">
                        t{index + 1}
                      </div>

                      {/* Operator Symbol */}
                      <div
                        className="text-4xl font-bold mb-3"
                        style={{ color: operator.color }}
                      >
                        {operator.symbol}
                      </div>

                      {/* Operator Name */}
                      <div className="text-center mb-3">
                        <div className="text-sm font-bold text-white font-mono">
                          {operator.name}
                        </div>
                      </div>

                      {/* Display value (always 0.000) */}
                      <div
                        className="text-2xl font-mono font-bold"
                        style={{ color: operator.color }}
                      >
                        0.000
                      </div>

                      {/* Position indicator */}
                      <div className="text-xs font-mono text-gray-300 mt-2 text-center">
                        <div className="text-gray-400">Position:</div>
                        <div className="font-medium text-gray-500">0.00</div>
                      </div>

                      {/* Info hint */}
                      <div className="absolute bottom-2 right-2">
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    {/* Back Face */}
                    <div
                      className="absolute w-full h-full rounded-lg border-2 p-4 flex flex-col"
                      style={{
                        backgroundColor: "rgba(16, 44, 34, 0.95)",
                        borderColor: operator.color,
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        boxShadow: `0 8px 32px ${operator.color}40`,
                      }}
                    >
                      {/* Close button */}
                      <button
                        className="absolute top-2 right-2 text-gray-400 hover:text-white z-10"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCard(opId);
                        }}
                      >
                        <X className="w-4 h-4" />
                      </button>

                      {/* Scrollable Content */}
                      <div
                        className="overflow-y-auto flex-1 pr-2 mt-2"
                        style={{ maxHeight: "calc(100% - 1rem)" }}
                      >
                        {/* Scroll hint */}
                        <div className="text-xs text-gray-500 font-mono mb-2">
                          <span className="text-lg">↓</span> Scroll for more
                          details
                        </div>

                        {/* Description */}
                        <p className="text-xs text-gray-300 font-mono leading-relaxed mb-3">
                          {operator.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Live Formula Display (shows no mathematical content) */}
          <div className="text-center">
            <div className="text-sm font-mono text-gray-400 mb-2">
              LIVE MATHEMATICAL FORMULA
            </div>
            <div className="text-lg font-mono text-white">
              φ(c,𝓔) ={" "}
              {getCurrentSequence().map((op, i) => (
                <span key={`${operatorVersion}-${op}-${i}`}>
                  {i > 0 && " + "}
                  <span
                    style={{
                      color: getCurrentOperators().find((o) => o.id === op)
                        ?.color,
                    }}
                  >
                    0.0{op}
                  </span>
                </span>
              ))}{" "}
              + ∇𝓔 = <span className="text-green-400">0.000</span>
            </div>
          </div>
        </div>

        {/* Analysis Grid - Matrix and Override sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* V1×V2 Interaction Matrix */}
          <div
            className="rounded-lg p-6 border h-full flex flex-col relative"
            style={{
              backgroundColor: "rgba(16, 44, 34, 0.7)",
              borderColor: "rgba(34, 68, 54, 0.8)",
            }}
          >
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <h3 className="text-lg font-bold text-white font-mono">
                V1×V2 INTERACTION MATRIX
              </h3>
              <div className="w-6 h-6 text-gray-400 relative">
                <div className="grid grid-cols-3 gap-0.5 w-full h-full">
                  <div className="bg-current opacity-40 rounded-sm"></div>
                  <div className="bg-current opacity-60 rounded-sm"></div>
                  <div className="bg-current opacity-30 rounded-sm"></div>
                  <div className="bg-current opacity-70 rounded-sm"></div>
                  <div className="bg-current opacity-50 rounded-sm"></div>
                  <div className="bg-current opacity-80 rounded-sm"></div>
                  <div className="bg-current opacity-35 rounded-sm"></div>
                  <div className="bg-current opacity-65 rounded-sm"></div>
                  <div className="bg-current opacity-45 rounded-sm"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-current opacity-10 rounded"></div>
              </div>
            </div>

            <div className="flex flex-col flex-1 min-h-0">
              {/* V2 Column Headers */}
              <div className="grid grid-cols-6 gap-2 text-xs font-mono text-gray-400 mb-3 flex-shrink-0">
                <div className="h-8 flex items-center justify-center relative bg-gradient-to-br from-green-900/40 to-gray-900/60 rounded-lg border border-green-500/30 backdrop-blur-sm">
                  <div className="absolute left-1 top-1/2 transform -translate-y-1/2 flex items-center text-green-400">
                    <span className="text-xs font-mono mr-0.5">V1</span>
                    <span className="text-sm">↓</span>
                  </div>
                  <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex items-center text-green-400">
                    <span className="text-xs font-mono mr-0.5">V2</span>
                    <span className="text-sm">→</span>
                  </div>
                  <div className="text-lg font-mono text-green-400 font-bold">
                    ⊗
                  </div>
                </div>
                {OPERATORS_V2.slice(0, 5).map((op) => (
                  <div
                    key={op.id}
                    className="h-8 text-center px-1 rounded flex items-center justify-center border transition-all duration-200 hover:scale-105"
                    style={{
                      backgroundColor: `${op.color}20`,
                      borderColor: `${op.color}40`,
                      color: op.color,
                    }}
                  >
                    {op.id}
                  </div>
                ))}
              </div>

              {/* Matrix rows - V1 operators as rows */}
              <div className="flex-1 flex flex-col justify-between gap-2">
                {OPERATORS_V1.slice(0, 5).map((v1Op, rowIndex) => (
                  <div key={v1Op.id} className="grid grid-cols-6 gap-2 flex-1">
                    {/* V1 Row Header */}
                    <div
                      className="text-xs font-mono flex items-center justify-center px-1 rounded border transition-all duration-200 hover:scale-105"
                      style={{
                        backgroundColor: `${v1Op.color}20`,
                        borderColor: `${v1Op.color}40`,
                        color: v1Op.color,
                        minHeight: "3rem",
                      }}
                    >
                      {v1Op.id}
                    </div>

                    {/* Matrix cells - all showing 0.00 */}
                    {OPERATORS_V2.slice(0, 5).map((v2Op, colIndex) => {
                      return (
                        <motion.div
                          key={`${v1Op.id}-${v2Op.id}`}
                          className="rounded-md flex flex-col items-center justify-center text-xs font-mono font-bold transition-all duration-300 hover:scale-105 border cursor-pointer group relative"
                          style={{
                            backgroundColor: "rgba(55, 65, 81, 0.8)",
                            color: "#f3f4f6",
                            borderColor: "rgba(107, 114, 128, 0.3)",
                            minHeight: "3rem",
                          }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className="text-center leading-tight">0.00</span>

                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 pointer-events-none">
                            <div className="bg-gray-900 border border-gray-600 rounded-lg p-3 text-xs font-mono whitespace-nowrap shadow-lg">
                              <div className="text-white font-bold mb-1">
                                {v1Op.id} × {v2Op.id}
                              </div>
                              <div className="text-gray-300">
                                Base: 0.000
                                <br />
                                Resonance: 0.000
                                <br />
                                Kernel: 0.000
                                <br />
                                <span className="text-green-400">
                                  Final: 0.000
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Matrix Summary */}
              <div className="mt-4 pt-4 border-t border-gray-600 flex-shrink-0">
                <div className="flex items-center text-xs font-mono">
                  <span className="text-gray-400">Matrix Sum:&nbsp;</span>
                  <span className="text-green-400 font-bold">0.000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Override Resolution Path */}
          <div
            className="rounded-lg p-6 border relative"
            style={{
              backgroundColor: "rgba(16, 44, 34, 0.7)",
              borderColor: "rgba(34, 68, 54, 0.8)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white font-mono">
                OVERRIDE RESOLUTION PATH
              </h3>
              <div className="w-5 h-5 text-gray-400">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10 9 10s9-4.45 9-10V7l-10-5z"/>
                </svg>
              </div>
            </div>


          </div>
        </div>

        {/* Simple Results Display */}
        <div className="mb-12">
          <div
            className="rounded-lg p-4 border relative"
            style={{
              backgroundColor: "rgba(16, 44, 34, 0.7)",
              borderColor: "rgba(34, 68, 54, 0.8)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white font-mono">
                PERMUTATION RESULTS
              </h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>

            {/* Simple metrics (all zeros) */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
              <div
                className="text-center p-3 rounded-lg border transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div className="text-sm font-bold text-white font-mono">
                  0.000
                </div>
                <div className="text-xs text-gray-400">φ RESULT</div>
              </div>
              <div
                className="text-center p-3 rounded-lg border transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div className="text-sm font-bold text-white font-mono">
                  0.00
                </div>
                <div className="text-xs text-gray-400">DECOHERENCE</div>
              </div>
              <div
                className="text-center p-3 rounded-lg border transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div className="text-sm font-bold text-white font-mono">
                  0.000
                </div>
                <div className="text-xs text-gray-400">ILLUSION DEPTH</div>
              </div>
              <div
                className="text-center p-3 rounded-lg border transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div className="text-sm font-bold text-white font-mono">
                  NEUTRAL
                </div>
                <div className="text-xs text-gray-400">TYPOLOGY</div>
              </div>
              <div
                className="text-center p-3 rounded-lg border transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div className="text-sm font-bold font-mono text-red-400">
                  INACTIVE
                </div>
                <div className="text-xs text-gray-400">LEGAL STATUS</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowTrace(!showTrace)}
                className="w-full p-3 rounded-xl font-mono text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                style={{
                  backgroundColor: showTrace
                    ? "rgba(52, 211, 153, 0.15)"
                    : "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(8px)",
                  border: `1px solid ${showTrace ? "rgba(52, 211, 153, 0.3)" : "rgba(255, 255, 255, 0.1)"}`,
                  color: showTrace ? "#10b981" : "#ffffff",
                }}
              >
                <Eye className="w-4 h-4" />
                <span>View Execution Trace</span>
                {showTrace ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setShowJSON(!showJSON)}
                  className="p-3 rounded-xl font-mono text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                  style={{
                    backgroundColor: showJSON
                      ? "rgba(52, 211, 153, 0.15)"
                      : "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(8px)",
                    border: `1px solid ${showJSON ? "rgba(52, 211, 153, 0.3)" : "rgba(255, 255, 255, 0.1)"}`,
                    color: showJSON ? "#10b981" : "#ffffff",
                  }}
                >
                  <FileText className="w-4 h-4" />
                  <span>JSON</span>
                </button>

                <button
                  onClick={downloadResults}
                  className="p-3 rounded-xl font-mono text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#ffffff",
                  }}
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Content */}
        {(showTrace || showJSON) && (
          <div
            className="rounded-lg p-6 border relative"
            style={{
              backgroundColor: "rgba(16, 44, 34, 0.7)",
              borderColor: "rgba(34, 68, 54, 0.8)",
            }}
          >
            {/* Execution trace */}
            <AnimatePresence>
              {showTrace && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6"
                >
                  <h4 className="text-sm font-bold text-white font-mono mb-4">
                    TEMPORAL EXECUTION TRACE (t₁ → t₅)
                  </h4>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {getCurrentSequence().map((opId, index) => {
                      const operator = getCurrentOperators().find(
                        (op) => op.id === opId,
                      );
                      return (
                        <div
                          key={index}
                          className="p-3 rounded border border-gray-600 bg-gray-800/30"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-mono text-white">
                              t{index + 1}: {opId} - {operator?.name}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400">
                            No mathematical operations performed - visual interface only
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* JSON output */}
            <AnimatePresence>
              {showJSON && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={showTrace ? "border-t border-gray-600 pt-6" : ""}
                >
                  <h4 className="text-sm font-bold text-white font-mono mb-4">
                    STRUCTURED OUTPUT
                  </h4>
                  <pre className="text-xs text-gray-300 font-mono bg-gray-900 p-4 rounded max-h-64 overflow-auto">
                    {JSON.stringify(
                      {
                        permutation: getCurrentSequence(),
                        operatorVersion: operatorVersion,
                        result: "0.000",
                        note: "Visual interface - no mathematical calculations performed",
                        timestamp: new Date().toISOString(),
                      },
                      null,
                      2,
                    )}
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(SemanticPermutationEngine);
