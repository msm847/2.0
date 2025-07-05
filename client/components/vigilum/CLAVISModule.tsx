import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  FileText,
  BarChart3,
  ArrowRight,
  Search,
  AlertTriangle,
  Activity,
  DragHandleHorizontal,
  Target,
  Eye,
  Shuffle,
} from "lucide-react";

// Risk Typologies
const RISK_TYPOLOGIES = {
  RT: { name: "Risk Transfer", color: "#3B82F6", glyph: "τ" },
  DG: { name: "Discretionary Gap", color: "#F59E0B", glyph: "δ" },
  CI: { name: "Compliance Illusion", color: "#EF4444", glyph: "φ" },
  SB: { name: "Structural Blindspot", color: "#8B5CF6", glyph: "β" },
  OD: { name: "Override/Design", color: "#10B981", glyph: "ω" },
};

// Clause Library Data
const CLAUSE_LIBRARY = [
  {
    id: "L001",
    title: "Article 32(2)(a) – Negotiated procedure without prior publication",
    shortTitle: "Negotiated Procedure",
    description: "Allows direct contracting after failed tender processes",
    originalText:
      '"(a) where no tenders or no suitable tenders... have been submitted in response to an open procedure..."',
    typologies: ["DG", "RT"],
    riskLevel: 0.7,
    strictness: "SOFT",
    transparency: "BLACK",
    sector: "Cross-sector",
  },
  {
    id: "L002",
    title: "Article 32(2)(c) – Extreme urgency due to unforeseeable events",
    shortTitle: "Emergency Procurement",
    description: "Enables sole-source awards in crisis situations",
    originalText:
      '"(c) in so far as is strictly necessary where, for reasons of extreme urgency..."',
    typologies: ["DG", "SB"],
    riskLevel: 0.9,
    strictness: "SOFT",
    transparency: "BLACK",
    sector: "Emergency",
  },
  {
    id: "L003",
    title:
      "Article 72(1)(c) – Contract modifications due to unforeseen circumstances",
    shortTitle: "Contract Modifications",
    description:
      "Allows substantial contract expansions under unforeseeability",
    originalText:
      '"Contracts... may be modified without a new procedure... unforeseen circumstances..."',
    typologies: ["CI", "RT"],
    riskLevel: 0.5,
    strictness: "HARD",
    transparency: "WHITE",
    sector: "Long-term",
  },
  {
    id: "L004",
    title:
      "Article 12 – Public contracts between entities within the public sector",
    shortTitle: "In-house Awards",
    description: "Formalizes Teckal exemption for internal contracting",
    originalText:
      '"A public contract awarded by a contracting authority to a legal person..."',
    typologies: ["SB", "OD"],
    riskLevel: 0.8,
    strictness: "HARD",
    transparency: "BLACK",
    sector: "Public sector",
  },
  {
    id: "L005",
    title: "Article 42 & 43 – Subcontracting in concessions",
    shortTitle: "Concession Subcontracting",
    description: "Creates shadow procurement layer in concessions",
    originalText:
      '"Member States may provide for more stringent liability rules..."',
    typologies: ["SB", "CI"],
    riskLevel: 0.7,
    strictness: "SOFT",
    transparency: "BLACK",
    sector: "Concessions/PPP",
  },
  {
    id: "L006",
    title: "Article 30 – Contracts awarded to a joint venture",
    shortTitle: "Joint Venture Awards",
    description: "Enables internal contracts among cooperating utilities",
    originalText:
      '"this Directive shall not apply to contracts awarded by any of the following..."',
    typologies: ["OD", "SB"],
    riskLevel: 0.8,
    strictness: "HARD",
    transparency: "BLACK",
    sector: "Utilities",
  },
];

// Pattern Library for flagging
const PATTERN_LIBRARY = [
  {
    id: "OverrideByDesign",
    name: "Override by Design",
    description: "Discretionary exception nullifying a requirement",
    triggers: (sequence) => {
      const hasConstraint = sequence.some((c) => c && c.strictness === "HARD");
      const hasOverride = sequence.some(
        (c) => c && c.typologies.includes("DG"),
      );
      return hasConstraint && hasOverride;
    },
  },
  {
    id: "ComplianceIllusion",
    name: "Compliance Illusion",
    description: "Appearance of strict rules but allows broad discretion",
    triggers: (sequence) => {
      const hasCIClause = sequence.some(
        (c) => c && c.typologies.includes("CI"),
      );
      const hasBlackClause = sequence.some(
        (c) => c && c.transparency === "BLACK",
      );
      return hasCIClause && hasBlackClause;
    },
  },
  {
    id: "RiskCascade",
    name: "Risk Cascade",
    description: "Sequential risk transfer creating accountability gaps",
    triggers: (sequence) => {
      const rtCount = sequence.filter(
        (c) => c && c.typologies.includes("RT"),
      ).length;
      return rtCount >= 2;
    },
  },
];

const CLAVISModule = () => {
  const [selectedClauses, setSelectedClauses] = useState([null, null, null]);
  const [simulationResult, setSimulationResult] = useState(null);
  const [filteredClauses, setFilteredClauses] = useState(CLAUSE_LIBRARY);
  const [selectedTypologyFilter, setSelectedTypologyFilter] = useState("ALL");

  // Filter clauses by typology
  useEffect(() => {
    if (selectedTypologyFilter === "ALL") {
      setFilteredClauses(CLAUSE_LIBRARY);
    } else {
      setFilteredClauses(
        CLAUSE_LIBRARY.filter((clause) =>
          clause.typologies.includes(selectedTypologyFilter),
        ),
      );
    }
  }, [selectedTypologyFilter]);

  // Run simulation when sequence changes
  useEffect(() => {
    if (selectedClauses.some((c) => c !== null)) {
      runSimulation(selectedClauses);
    } else {
      setSimulationResult(null);
    }
  }, [selectedClauses]);

  const runSimulation = (sequence) => {
    // Semantic Simulation Pipeline: ϕ(c₁…c₃) → ⊗ → G → τ → Λ

    // 1. Clause Vector Assembly (ϕ)
    const clauseVector = sequence.filter((c) => c !== null);

    // 2. Sequence Logic Computation (⊗)
    const sequenceLogic = computeSequenceLogic(clauseVector);

    // 3. Override Graph Generation (G)
    const overrideGraph = generateOverrideGraph(clauseVector);

    // 4. Risk Projection (τ)
    const riskProjection = projectRiskTypologies(clauseVector);

    // 5. Pattern Flagging (Λ)
    const patternFlags = flagPatterns(sequence);

    // Generate narrative interpretation
    const narrative = generateNarrative(
      clauseVector,
      overrideGraph,
      riskProjection,
    );

    setSimulationResult({
      clauseVector,
      sequenceLogic,
      overrideGraph,
      riskProjection,
      patternFlags,
      narrative,
    });
  };

  const computeSequenceLogic = (clauses) => {
    // Analyze how clauses interact in sequence
    const interactions = [];

    for (let i = 0; i < clauses.length - 1; i++) {
      const current = clauses[i];
      const next = clauses[i + 1];

      if (current && next) {
        // Check for overrides
        if (current.strictness === "HARD" && next.strictness === "SOFT") {
          interactions.push({
            from: current.id,
            to: next.id,
            type: "weakens",
            description: `${next.shortTitle} weakens ${current.shortTitle}`,
          });
        }

        if (next.typologies.includes("DG") && current.strictness === "HARD") {
          interactions.push({
            from: next.id,
            to: current.id,
            type: "overrides",
            description: `${next.shortTitle} creates discretionary override of ${current.shortTitle}`,
          });
        }
      }
    }

    return interactions;
  };

  const generateOverrideGraph = (clauses) => {
    const nodes = clauses.map((clause) => ({
      id: clause.id,
      label: clause.shortTitle,
      typologies: clause.typologies,
      strictness: clause.strictness,
      transparency: clause.transparency,
    }));

    const edges = [];

    // Detect override relationships
    for (let i = 0; i < clauses.length; i++) {
      for (let j = 0; j < clauses.length; j++) {
        if (i !== j) {
          const source = clauses[i];
          const target = clauses[j];

          // DG clauses can override HARD clauses
          if (
            source.typologies.includes("DG") &&
            target.strictness === "HARD"
          ) {
            edges.push({
              source: source.id,
              target: target.id,
              type: "override",
              strength: 0.8,
            });
          }

          // Later clauses can modify earlier ones
          if (
            i > j &&
            source.typologies.some((t) => ["RT", "CI"].includes(t))
          ) {
            edges.push({
              source: source.id,
              target: target.id,
              type: "modifies",
              strength: 0.6,
            });
          }
        }
      }
    }

    return { nodes, edges };
  };

  const projectRiskTypologies = (clauses) => {
    const typologyScores = {};

    Object.keys(RISK_TYPOLOGIES).forEach((type) => {
      typologyScores[type] = 0;
    });

    clauses.forEach((clause) => {
      clause.typologies.forEach((type) => {
        typologyScores[type] += clause.riskLevel;
      });
    });

    // Normalize scores
    const maxScore = Math.max(...Object.values(typologyScores));
    if (maxScore > 0) {
      Object.keys(typologyScores).forEach((type) => {
        typologyScores[type] = typologyScores[type] / maxScore;
      });
    }

    return typologyScores;
  };

  const flagPatterns = (sequence) => {
    return PATTERN_LIBRARY.filter((pattern) => pattern.triggers(sequence));
  };

  const generateNarrative = (clauses, overrideGraph, riskProjection) => {
    if (clauses.length === 0) return "";

    // Special handling for L001→L002→L003 sequence
    const clauseIds = clauses.map((c) => c.id);
    if (clauseIds.join("→") === "L001→L002→L003") {
      return `The sequence L001→L002→L003 creates a layered escape hatch in procurement. Clause L001 (Art.32(2)(a)) allows a negotiated award after an open tender fails. Clause L002 (Art.32(2)(c)) then lets the authority skip any competition outright under an "extreme urgency". In practice this means the authority could either engineer a no-bid situation or simply declare an emergency to justify a direct award. Finally, L003 (Art.72(1)(c)) permits the contract to be inflated or altered (up to +50%) post-award due to "unforeseeable" events. The combined effect is a compliance illusion: formal rules (tendering, oversight) remain on the books, but enforcement is nullified by these operator clauses. Notably, because Vigilum treats clauses as non-commutative operators, this exact order matters – swapping L002 and L001, for example, would yield a different structural outcome. Structure, not wording, drives the system's meaning here.`;
    }

    let narrative = `Sequence Analysis (ϕ(${clauses.map((c) => c.id).join(",")})): `;

    if (clauses.length === 1) {
      narrative += `Single clause ${clauses[0].shortTitle} establishes ${clauses[0].strictness.toLowerCase()} governance constraint with ${clauses[0].transparency.toLowerCase()} transparency.`;
    } else {
      narrative += `Clause sequence creates `;

      const hasOverrides = overrideGraph.edges.length > 0;
      if (hasOverrides) {
        narrative += `structural override pattern where `;
        overrideGraph.edges.forEach((edge, i) => {
          const sourceClause = clauses.find((c) => c.id === edge.source);
          const targetClause = clauses.find((c) => c.id === edge.target);
          if (i > 0) narrative += ` and `;
          narrative += `${sourceClause.shortTitle} ${edge.type}s ${targetClause.shortTitle}`;
        });
        narrative += `. `;
      } else {
        narrative += `sequential governance structure without direct overrides. `;
      }

      // Risk assessment
      const dominantRisk = Object.entries(riskProjection).reduce((a, b) =>
        riskProjection[a[0]] > riskProjection[b[0]] ? a : b,
      );

      if (dominantRisk[1] > 0.5) {
        narrative += `Primary risk vector: ${RISK_TYPOLOGIES[dominantRisk[0]].name} (${dominantRisk[1].toFixed(2)}). `;
      }
    }

    return narrative;
  };

  const assignClauseToSlot = (clause, slotIndex) => {
    const newSequence = [...selectedClauses];
    newSequence[slotIndex] = clause;
    setSelectedClauses(newSequence);
  };

  const clearSlot = (slotIndex) => {
    const newSequence = [...selectedClauses];
    newSequence[slotIndex] = null;
    setSelectedClauses(newSequence);
  };

  const clearAllSlots = () => {
    setSelectedClauses([null, null, null]);
  };

  return (
    <div className="bg-gray-900 py-20" id="clavis-module">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-blue-900/30 px-3 py-1 rounded-full border border-blue-700 mb-4">
              <Activity className="w-3 h-3 text-blue-400" />
              <span className="text-xs text-blue-300 font-mono uppercase tracking-wider">
                Primary Cognition Module
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-100 mb-4 font-mono tracking-tight">
              CLAVIS CLAUSE INTELLIGENCE
            </h2>
            <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto">
              Semantic simulation tool for modeling how sequences of legal
              clauses produce structural risk. Compose clause operators and
              observe non-commutative governance effects.
            </p>
          </div>

          {/* Main Interface Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Clause Library Panel */}
            <div className="lg:col-span-3">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 h-fit">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white font-mono">
                    CLAUSE LIBRARY
                  </h3>
                  <FileText className="w-5 h-5 text-gray-400" />
                </div>

                {/* Typology Filter */}
                <div className="mb-6">
                  <div className="text-sm text-gray-400 mb-2">
                    Filter by Typology:
                  </div>
                  <select
                    value={selectedTypologyFilter}
                    onChange={(e) => setSelectedTypologyFilter(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm"
                  >
                    <option value="ALL">All Typologies</option>
                    {Object.entries(RISK_TYPOLOGIES).map(([key, value]) => (
                      <option key={key} value={key}>
                        {key} - {value.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clause List */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredClauses.map((clause) => (
                    <div
                      key={clause.id}
                      className="bg-gray-700 border border-gray-600 rounded-lg p-4 cursor-pointer hover:bg-gray-600 transition-colors"
                      onClick={() => {
                        // Auto-assign to first empty slot
                        const emptySlot = selectedClauses.findIndex(
                          (c) => c === null,
                        );
                        if (emptySlot !== -1) {
                          assignClauseToSlot(clause, emptySlot);
                        }
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-mono text-blue-400">
                          {clause.id}
                        </div>
                        <div className="text-xs text-gray-400">
                          Risk: {clause.riskLevel.toFixed(1)}
                        </div>
                      </div>

                      <div className="text-sm text-white font-medium mb-2">
                        {clause.shortTitle}
                      </div>

                      <div className="text-xs text-gray-300 mb-3 leading-relaxed">
                        {clause.description}
                      </div>

                      {/* Typology Glyphs */}
                      <div className="flex items-center space-x-2">
                        {clause.typologies.map((type) => (
                          <span
                            key={type}
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-mono"
                            style={{
                              backgroundColor:
                                RISK_TYPOLOGIES[type].color + "20",
                              color: RISK_TYPOLOGIES[type].color,
                              border: `1px solid ${RISK_TYPOLOGIES[type].color}40`,
                            }}
                          >
                            {type}
                          </span>
                        ))}
                        <div className="text-xs text-gray-500">
                          {clause.strictness}/{clause.transparency}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sequence Builder */}
            <div className="lg:col-span-4">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white font-mono">
                    SEQUENCE BUILDER
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Shuffle className="w-4 h-4 text-gray-400" />
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      onClick={clearAllSlots}
                    >
                      Clear All
                    </Button>
                  </div>
                </div>

                <div className="text-sm text-gray-400 mb-6">
                  ϕ(c₁, c₂, c₃) - Non-commutative clause sequence
                </div>

                {/* Sequence Slots */}
                <div className="space-y-4">
                  {selectedClauses.map((clause, index) => (
                    <div
                      key={index}
                      className={`border-2 border-dashed rounded-lg p-6 min-h-24 transition-colors ${
                        clause
                          ? "border-blue-500 bg-blue-900/20"
                          : "border-gray-600 bg-gray-700/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-mono text-gray-400">
                          Slot {index + 1} (c₁{index > 0 ? "₊" + index : ""})
                        </div>
                        {clause && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-400 hover:text-white"
                            onClick={() => clearSlot(index)}
                          >
                            ✕
                          </Button>
                        )}
                      </div>

                      {clause ? (
                        <div>
                          <div className="text-white font-medium mb-1">
                            {clause.shortTitle}
                          </div>
                          <div className="text-xs text-gray-300 mb-2">
                            {clause.id} - Risk: {clause.riskLevel.toFixed(1)}
                          </div>
                          <div className="flex items-center space-x-2">
                            {clause.typologies.map((type) => (
                              <span
                                key={type}
                                className="text-xs font-mono px-2 py-1 rounded"
                                style={{
                                  backgroundColor:
                                    RISK_TYPOLOGIES[type].color + "20",
                                  color: RISK_TYPOLOGIES[type].color,
                                }}
                              >
                                {RISK_TYPOLOGIES[type].glyph}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center text-gray-500">
                          <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <div className="text-sm">
                            Click a clause from the library to assign
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Pipeline Visualization */}
                {simulationResult && (
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <div className="text-sm text-gray-400 mb-3">
                      Simulation Pipeline:
                    </div>
                    <div className="flex items-center space-x-2 text-xs font-mono text-gray-500">
                      <span>ϕ</span>
                      <ArrowRight className="w-3 h-3" />
                      <span>⊗</span>
                      <ArrowRight className="w-3 h-3" />
                      <span>G</span>
                      <ArrowRight className="w-3 h-3" />
                      <span>τ</span>
                      <ArrowRight className="w-3 h-3" />
                      <span>Λ</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Output Panel */}
            <div className="lg:col-span-5">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white font-mono">
                    SIMULATION OUTPUT
                  </h3>
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                </div>

                {simulationResult ? (
                  <div className="space-y-6">
                    {/* Narrative Interpretation */}
                    <div>
                      <div className="text-sm font-bold text-blue-400 font-mono mb-3">
                        STRUCTURAL INTERPRETATION
                      </div>
                      <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {simulationResult.narrative}
                        </p>
                      </div>
                    </div>

                    {/* Risk Typology Glyphs */}
                    <div>
                      <div className="text-sm font-bold text-yellow-400 font-mono mb-3">
                        RISK TYPOLOGY PROJECTION (τ)
                      </div>
                      <div className="grid grid-cols-5 gap-3">
                        {Object.entries(simulationResult.riskProjection).map(
                          ([type, score]) => (
                            <div
                              key={type}
                              className={`text-center p-3 rounded-lg border ${
                                score > 0.3
                                  ? "border-yellow-500 bg-yellow-900/20"
                                  : "border-gray-600 bg-gray-700/30"
                              }`}
                            >
                              <div
                                className="text-2xl font-mono mb-1"
                                style={{ color: RISK_TYPOLOGIES[type].color }}
                              >
                                {RISK_TYPOLOGIES[type].glyph}
                              </div>
                              <div className="text-xs text-gray-400">
                                {type}
                              </div>
                              <div className="text-xs font-mono text-white">
                                {score.toFixed(2)}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    {/* Override Graph */}
                    {simulationResult.overrideGraph.edges.length > 0 && (
                      <div>
                        <div className="text-sm font-bold text-red-400 font-mono mb-3">
                          OVERRIDE GRAPH (G)
                        </div>
                        <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                          <div className="space-y-2">
                            {simulationResult.overrideGraph.edges.map(
                              (edge, index) => {
                                const sourceNode =
                                  simulationResult.overrideGraph.nodes.find(
                                    (n) => n.id === edge.source,
                                  );
                                const targetNode =
                                  simulationResult.overrideGraph.nodes.find(
                                    (n) => n.id === edge.target,
                                  );
                                return (
                                  <div
                                    key={index}
                                    className="flex items-center space-x-3 text-sm"
                                  >
                                    <span className="text-blue-400 font-mono">
                                      {sourceNode?.label}
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-red-400" />
                                    <span className="text-blue-400 font-mono">
                                      {targetNode?.label}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                      ({edge.type})
                                    </span>
                                  </div>
                                );
                              },
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Pattern Flags */}
                    {simulationResult.patternFlags.length > 0 && (
                      <div>
                        <div className="text-sm font-bold text-red-400 font-mono mb-3">
                          PATTERN TRIGGERS (Λ)
                        </div>
                        <div className="space-y-2">
                          {simulationResult.patternFlags.map(
                            (pattern, index) => (
                              <div
                                key={index}
                                className="bg-red-900/20 border border-red-700 rounded-lg p-3"
                              >
                                <div className="flex items-center space-x-2 mb-1">
                                  <AlertTriangle className="w-4 h-4 text-red-400" />
                                  <span className="text-red-400 font-mono text-sm font-bold">
                                    λ: {pattern.name}
                                  </span>
                                </div>
                                <div className="text-xs text-gray-300">
                                  {pattern.description}
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                    {/* Formal Notation */}
                    <div className="pt-4 border-t border-gray-700">
                      <div className="text-sm font-bold text-gray-400 font-mono mb-2">
                        CLAUSE VECTOR NOTATION (ϕ)
                      </div>
                      <div className="text-xs font-mono text-gray-500">
                        ϕ(
                        {simulationResult.clauseVector
                          .map((c) => c.id)
                          .join(", ")}
                        ) = [
                        {simulationResult.clauseVector
                          .map((c) => `${c.strictness}_${c.transparency}`)
                          .join(", ")}
                        ]
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Eye className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                    <div className="text-gray-500">
                      Select clauses in the sequence builder to begin simulation
                    </div>
                    <div className="text-xs text-gray-600 mt-2">
                      ϕ(c₁…c₃) ⇨ ⊗(sequence logic) ⇨ G(override graph) ⇨
                      τ(typology projection) ⇨ Λ(pattern flag)
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Methodology Note */}
          <div className="mt-12 bg-blue-900/20 border border-blue-700 rounded-lg p-6">
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

export default CLAVISModule;
