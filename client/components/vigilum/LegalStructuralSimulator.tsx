import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Type definitions
interface ClauseData {
  id: string;
  title: string;
  weight: number;
  riskVector: {
    DG: number;
    RT: number;
    CI: number;
    SB: number;
  };
  overrideFlags: string;
  typology: string;
  color: string;
  description: string;
}

interface EnvironmentOperator {
  id: string;
  name: string;
  weight: number;
  icon: string;
  description: string;
  modifiers: {
    DG: number;
    RT: number;
    CI: number;
    SB: number;
  };
  specialEffects: string;
}

// Clause data based on specifications - 6 Structural Economic Modules
const availableClauses: ClauseData[] = [
  {
    id: "E1",
    title: "Deferred Allocation Logic",
    weight: 0.42,
    riskVector: { DG: 0.42, RT: 0.2, CI: 0.15, SB: 0.18 },
    overrideFlags: "delays deployment",
    typology: "RT",
    color: "#1f2e28",
    description: "Delays budget deployment, shifts control into next cycle",
  },
  {
    id: "E2",
    title: "Threshold Conditionality",
    weight: 0.37,
    riskVector: { DG: 0.37, RT: 0.25, CI: 0.12, SB: 0.21 },
    overrideFlags: "metric gated",
    typology: "CI",
    color: "#1f2e28",
    description: "Resources unlocked only if external metrics hit",
  },
  {
    id: "E3",
    title: "Donor-Tied Budgeting",
    weight: 0.53,
    riskVector: { DG: 0.53, RT: 0.18, CI: 0.22, SB: 0.15 },
    overrideFlags: "external alignment",
    typology: "DG",
    color: "#1f2e28",
    description: "Line items must match external funding logic",
  },
  {
    id: "E4",
    title: "Multi-Level Disbursement",
    weight: 0.48,
    riskVector: { DG: 0.48, RT: 0.16, CI: 0.19, SB: 0.23 },
    overrideFlags: "layer approval",
    typology: "SB",
    color: "#1f2e28",
    description: "Requires approval through 3 governance layers",
  },
  {
    id: "E5",
    title: "Performance-Gated Release",
    weight: 0.45,
    riskVector: { DG: 0.45, RT: 0.21, CI: 0.17, SB: 0.19 },
    overrideFlags: "KPI triggered",
    typology: "RT",
    color: "#1f2e28",
    description: "Funds gated behind KPIs; triggered in waves",
  },
  {
    id: "E6",
    title: "Asset-Backed Procurement",
    weight: 0.51,
    riskVector: { DG: 0.51, RT: 0.14, CI: 0.24, SB: 0.16 },
    overrideFlags: "asset offset",
    typology: "CI",
    color: "#1f2e28",
    description: "Public spending offset by state-owned assets",
  },
];

const environmentOperators: EnvironmentOperator[] = [
  {
    id: "temporal",
    name: "Temporal Compression (𝓔₁)",
    weight: 0.32,
    icon: "",
    description: "All clause latency functions are reduced",
    modifiers: { DG: 0.32, RT: -0.08, CI: -0.12, SB: -0.05 },
    specialEffects: "Reduces clause latency by 22%",
  },
  {
    id: "narrative",
    name: "Narrative Overwriting (𝓔₂)",
    weight: 0.41,
    icon: "",
    description: "Control inversion vectors are masked in output sequence",
    modifiers: { DG: 0.41, RT: -0.15, CI: 0.18, SB: -0.22 },
    specialEffects: "Masks control inversion vectors",
  },
  {
    id: "recognition",
    name: "Recognition Fog (𝓔₃)",
    weight: 0.29,
    icon: "",
    description: "Clauses lose override visibility to one another",
    modifiers: { DG: 0.29, RT: -0.11, CI: -0.18, SB: 0.15 },
    specialEffects: "Clauses lose mutual override visibility",
  },
];

const LegalStructuralSimulator: React.FC = () => {
  const [selectedClauses, setSelectedClauses] = useState<(ClauseData | null)[]>(
    [null, null, null],
  );
  const [activeEnvironments, setActiveEnvironments] = useState<string[]>([]);
  const [simulationResult, setSimulationResult] = useState<any>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [ellipsisCount, setEllipsisCount] = useState(0);

  // Animated ellipsis effect
  useEffect(() => {
    const interval = setInterval(() => {
      setEllipsisCount(prev => prev === 3 ? 0 : prev + 1);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const selectClause = (clause: ClauseData, slotIndex: number) => {
    const newSelected = [...selectedClauses];
    newSelected[slotIndex] = clause;
    setSelectedClauses(newSelected);
  };

  const removeClause = (slotIndex: number) => {
    const newSelected = [...selectedClauses];
    newSelected[slotIndex] = null;
    setSelectedClauses(newSelected);
  };

  const resetSimulation = () => {
    setSelectedClauses([null, null, null]);
    setActiveEnvironments([]);
    setSimulationResult(null);
    setIsSimulating(false);
  };

  const toggleEnvironment = (envId: string) => {
    if (activeEnvironments.includes(envId)) {
      setActiveEnvironments(activeEnvironments.filter(id => id !== envId));
    } else if (activeEnvironments.length < 2) {
      setActiveEnvironments([...activeEnvironments, envId]);
    }
  };

  const simulateSequence = () => {
    setIsSimulating(true);

    // Simulate processing delay
    setTimeout(() => {
      const validClauses = selectedClauses.filter(
        (clause) => clause !== null,
      ) as ClauseData[];
      const envs = activeEnvironments.map(id =>
        environmentOperators.find(op => op.id === id)
      ).filter(Boolean) as EnvironmentOperator[];

      // New mathematical computation: ϕ(c₁, c₂, c₃; 𝓔₁, 𝓔₂) = Σ [ wᵢ * Pᵢ(𝓔) * Mᵢⱼ ]
      let phi = 0;
      let computationDetails: string[] = [];

      validClauses.forEach((clause, i) => {
        // Base weight
        let weight = clause.weight;

        // Apply positional environmental modifiers P_i(E)
        let positionalModifier = 1.0;
        envs.forEach((env, envIndex) => {
          // Position 1 receives uncompressed logic, others get modified
          if (i === 0) {
            positionalModifier *= 1.0; // Uncompressed
          } else {
            positionalModifier *= (1 + env.weight * 0.3); // Environmental effect
          }
        });

        // Interaction coefficient M_ij (simplified)
        let interactionCoeff = 1.0;
        validClauses.forEach((otherClause, j) => {
          if (i !== j) {
            interactionCoeff += Math.abs(clause.weight - otherClause.weight) * 0.1;
          }
        });

        const clauseContribution = weight * positionalModifier * interactionCoeff;
        phi += clauseContribution;

        computationDetails.push(`(${weight.toFixed(2)} * ${positionalModifier.toFixed(2)})`);
      });

      // Add interaction matrix sum (simplified)
      const matrixSum = validClauses.length > 1 ? 0.12 : 0;
      phi += matrixSum;

      // Determine structural outcome
      const outcomes = [
        "Legally Compliant Cascade with Masked Discretion Surge",
        "Structural Bypass via Sequential Inversion",
        "Controlled Fragmentation Pattern",
        "Stealth Allocation Redirect"
      ];

      const fractureVectors = ["RT + CI", "DG + SB", "RT + DG", "CI + SB"];
      const selectedOutcome = outcomes[Math.floor(phi * 2) % outcomes.length];
      const selectedVector = fractureVectors[Math.floor(phi * 3) % fractureVectors.length];

      setSimulationResult({
        phi: phi,
        computationDetails: computationDetails,
        matrixSum: matrixSum,
        structuralOutcome: selectedOutcome,
        fractureVector: selectedVector,
        clauses: validClauses,
        environments: envs
      });

      setIsSimulating(false);
    }, 1200); // Thread weave animation time
  };

  const generateLoopholeProfile = (
    clauses: ClauseData[],
    env: EnvironmentOperator | undefined,
  ) => {
    if (clauses.length === 0) return null;

    return {
      class: "Simulated Constraint via Sequence Inversion",
      description: `This clause order results in ${clauses[0]?.title.toLowerCase()} being amplified by ${env?.name || "standard environment"}, creating a structural bypass mechanism.`,
    };
  };

  const generateOverridePattern = (clauses: ClauseData[]) => {
    return clauses.map((clause, index) => ({
      id: clause.id,
      position: index,
      overrides: [],
      overriddenBy: [],
    }));
  };

  return (
    <section className="pt-20 px-4" style={{ backgroundColor: "#102B21" }}>
      <div className="container mx-auto max-w-7xl">
        {/* Core Premise */}
        <div className="text-left mb-8">
          <motion.h3
            className="text-heading-md text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            STRUCTURAL COGNITION CHAMBER
          </motion.h3>
        </div>

        <div
          className="clause-simulator-wrapper"
          style={{
            display: "flex",
            alignItems: "stretch",
            justifyContent: "space-between",
            gap: "2rem",
            width: "100%",
            minHeight: "600px",
          }}
        >
          {/* Left: Available Clauses - Scrollable */}
          <div
            className="clause-column available-clauses-column"
            style={{
              flex: "1 1 0",
              display: "flex",
              flexDirection: "column",
              background: "inherit",
              borderRadius: "inherit",
              position: "relative",
            }}
          >
            <div
              className="clause-column-header"
              style={{
                flexShrink: 0,
                padding: "1rem",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <h3 className="text-section text-green-400 font-ui uppercase tracking-wider text-center">
                CLAUSE BANK
              </h3>
            </div>
            <div
              className="clause-column-content"
              style={{
                flex: "1 1 auto",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                className="available-clauses-content"
                style={{
                  overflowY: "auto",
                  flex: "none",
                  padding: "1rem",
                  height: "340px",
                  maxHeight: "340px",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#17B58F #0B1E16",
                }}
                css={{
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "#0B1E16",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#17B58F",
                    borderRadius: "4px",
                    border: "1px solid #0E261D",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    background: "#9DE6C6",
                  },
                }}
              >
                <div className="space-y-3">
                  {availableClauses.map((clause) => (
                    <motion.div
                      key={clause.id}
                      className="p-4 rounded-lg border border-gray-600 cursor-pointer hover:border-green-400/50 transition-all"
                      style={{
                        backgroundColor: "#1f2e28",
                        borderColor: "rgba(255,255,255,0.1)",
                      }}
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: "#2a3a32",
                      }}
                      onClick={() => {
                        // Find first empty slot
                        const emptySlot = selectedClauses.findIndex(
                          (c) => c === null,
                        );
                        if (emptySlot !== -1) {
                          selectClause(clause, emptySlot);
                        }
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-mono text-white" style={{ color: "#eae2cc" }}>
                          {clause.title}
                        </h4>
                        <span className="text-xs font-mono text-gray-400">
                          w = {clause.weight.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {clause.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Center: Staging Field */}
          <div
            className="clause-column staging-field-column"
            style={{
              flex: "1 1 0",
              display: "flex",
              flexDirection: "column",
              background: "inherit",
              borderRadius: "inherit",
              position: "relative",
            }}
          >
            <div
              className="clause-column-header"
              style={{
                flexShrink: 0,
                padding: "1rem",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <h3 className="text-section text-green-400 font-ui text-center uppercase tracking-wider">
                CLAUSE STAGING FIELD
              </h3>
            </div>
            <div
              className="clause-column-content"
              style={{
                flex: "1 1 auto",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                className="staging-field-content"
                style={{
                  padding: "1rem",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                {/* Staging Slots */}
                <div className="space-y-4">
                  {[0, 1, 2].map((slotIndex) => (
                    <div
                      key={slotIndex}
                      className="h-24 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center"
                    >
                      {selectedClauses[slotIndex] ? (
                        <motion.div
                          className="w-full h-full p-3 bg-gray-800 rounded border border-gray-600 cursor-pointer"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          onClick={() => removeClause(slotIndex)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-mono text-gray-400">
                              {selectedClauses[slotIndex]!.id}
                            </span>
                            <div className="flex items-center space-x-2">
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{
                                  backgroundColor:
                                    selectedClauses[slotIndex]!.color,
                                }}
                              />
                              <span className="text-xs text-red-400">✕</span>
                            </div>
                          </div>
                          <div className="text-sm text-white">
                            {selectedClauses[slotIndex]!.title}
                          </div>
                        </motion.div>
                      ) : (
                        <span className="text-gray-500 text-sm">
                          Slot {slotIndex + 1} - Click clause to add
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Action Buttons - positioned below slot 3 with natural spacing */}
                <div className="flex gap-3" style={{ marginTop: "40px" }}>
                  <motion.button
                    onClick={simulateSequence}
                    disabled={
                      selectedClauses.every((c) => c === null) || isSimulating
                    }
                    className="flex-1 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-ui font-bold rounded-2xl transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSimulating ? "PROCESSING..." : "EXECUTE COGNITION"}
                  </motion.button>

                  {(selectedClauses.some(c => c !== null) || activeEnvironments.length > 0 || simulationResult) && (
                    <motion.button
                      onClick={resetSimulation}
                      className="px-6 py-4 bg-gray-700 hover:bg-gray-600 text-white font-ui font-medium rounded-2xl transition-colors border border-gray-500"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      RESET
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Environment Operators */}
          <div
            className="clause-column environment-operator-column"
            style={{
              flex: "1 1 0",
              display: "flex",
              flexDirection: "column",
              background: "inherit",
              borderRadius: "inherit",
              position: "relative",
            }}
          >
            <div
              className="clause-column-header"
              style={{
                flexShrink: 0,
                padding: "1rem",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <h3 className="text-section text-green-400 font-ui uppercase tracking-wider text-center">
                ENVIRONMENT OPS
              </h3>
            </div>
            <div
              className="clause-column-content"
              style={{
                flex: "1 1 auto",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                className="environment-operator-content"
                style={{
                  padding: "1rem",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <div className="space-y-4">
                  <p className="text-xs text-gray-400 mb-4">Select up to 2 operators</p>
                  {environmentOperators.map((env, index) => (
                    <motion.button
                      key={env.id}
                      onClick={() => toggleEnvironment(env.id)}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        activeEnvironments.includes(env.id)
                          ? "border-green-400 bg-green-400/10 text-white"
                          : "border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500"
                      }`}
                      style={{
                        background: activeEnvironments.includes(env.id)
                          ? "linear-gradient(135deg, #2a3a32, #1f2e28)"
                          : "#202d29",
                        borderColor: activeEnvironments.includes(env.id) ? "#d4c69b" : "rgba(255,255,255,0.1)"
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={!activeEnvironments.includes(env.id) && activeEnvironments.length >= 2}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-mono text-sm" style={{ color: "#cab27f" }}>
                            {env.name}
                          </h4>
                          <span className="text-xs font-mono text-gray-400">
                            w = {env.weight.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {env.specialEffects}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Full-Width Simulation Output */}
        <div className="w-full" style={{ transform: "translateY(-60px)" }}>

          <AnimatePresence>
            {simulationResult && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="max-w-4xl mx-auto"
              >
                {/* Combined Output Box */}
                <div className="p-8 rounded-lg border border-gray-600 bg-gradient-to-br from-gray-900 to-gray-800">
                  {/* Mathematical Output Section */}
                  <div className="mb-8">
                    <h4 className="text-green-400 font-mono mb-6 text-lg">
                      MATHEMATICAL OUTPUT
                    </h4>
                    <div
                      className="p-6 rounded-lg font-mono text-lg leading-relaxed"
                      style={{
                        backgroundColor: "#0e1e1a",
                        color: "#cab27f",
                        border: "1px solid rgba(202, 178, 127, 0.3)"
                      }}
                    >
                      <div className="mb-4">
                        ϕ = {simulationResult.computationDetails.join(" + ")} + ΣM<sub>ij</sub> = {simulationResult.phi.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-400">
                        Where environment and position have modified original weights.
                      </div>
                    </div>
                  </div>

                  {/* Structural Interpretation Section */}
                  <div>
                    <h4 className="text-green-400 font-mono mb-6 text-lg">
                      STRUCTURAL INTERPRETATION
                    </h4>
                    <div
                      className="space-y-3 font-mono"
                      style={{ color: "#cab27f" }}
                    >
                      <div className="text-lg">
                        <span className="text-gray-400">Structural Outcome:</span> {simulationResult.structuralOutcome}
                      </div>
                      <div className="text-lg">
                        <span className="text-gray-400">Fracture Vector:</span> {simulationResult.fractureVector} (interacting via P2 inversion)
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!simulationResult && !isSimulating && (
            <div className="text-center text-gray-500 py-16">
              <div className="text-2xl font-mono mb-4" style={{ color: "#cab27f" }}>
                ϕ(c, 𝓔) = ∑ wᵢ × Pᵢ(𝓔) × Mᵢⱼ
              </div>
              <div className="text-lg font-mono text-gray-400">
                Simulation inactive — structural input incomplete{".".repeat(ellipsisCount)}
              </div>
            </div>
          )}

          {isSimulating && (
            <div className="text-center text-green-400 py-16">
              <motion.div
                className="text-6xl mb-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                ⚙️
              </motion.div>
              <div className="font-mono text-xl">
                Processing legal sequence...
              </div>
              <div className="text-sm text-gray-400 mt-2">
                Analyzing clause interactions and environmental modifiers
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LegalStructuralSimulator;
