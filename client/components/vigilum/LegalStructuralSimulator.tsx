import React, { useState } from "react";
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
    <section className="pt-20 px-4" style={{ backgroundColor: "#081A0E" }}>
      <div className="container mx-auto max-w-7xl">
        {/* Core Premise */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-display-lg text-white mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            CLAUSE SIMULATOR
          </motion.h2>

          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-body-lg text-gray-300 mb-6 leading-relaxed">
              This is not an "interface" in the conventional sense.
              <br />
              <span className="text-green-400 font-medium">
                It is a legal-structural simulation engine in UI form.
              </span>
            </p>
          </div>
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
                AVAILABLE CLAUSES
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
                      className="h-24 p-3 rounded-2xl border border-gray-600 bg-gray-800/50 cursor-pointer hover:border-green-400/50 transition-all"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: `0 0 20px ${clause.color}40`,
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
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono text-gray-400">
                          {clause.id}
                        </span>
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: clause.color }}
                        />
                      </div>
                      <h4 className="text-sm font-medium text-white mb-1">
                        {clause.title}
                      </h4>
                      <div className="text-xs text-gray-400 space-y-1">
                        <div>
                          DG {clause.riskVector.DG.toFixed(2)} | RT{" "}
                          {clause.riskVector.RT.toFixed(2)} | CI{" "}
                          {clause.riskVector.CI.toFixed(2)} | SB{" "}
                          {clause.riskVector.SB.toFixed(2)}
                        </div>
                        <div className="text-green-400">
                          {clause.overrideFlags}
                        </div>
                      </div>
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

                {/* Simulate Button - exactly 24px below slot 3 */}
                <motion.button
                  onClick={simulateSequence}
                  disabled={
                    selectedClauses.every((c) => c === null) || isSimulating
                  }
                  className="w-full py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-ui font-bold rounded-2xl transition-colors"
                  style={{ marginTop: "24px" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSimulating ? "SIMULATING..." : "SIMULATE SEQUENCE"}
                </motion.button>
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
                ENVIRONMENT OPERATOR
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
                <div>
                  {environmentOperators.map((env, index) => (
                    <motion.button
                      key={env.id}
                      onClick={() =>
                        setActiveEnvironment(
                          activeEnvironment === env.id ? null : env.id,
                        )
                      }
                      className={`w-full text-left h-24 p-3 rounded-2xl border transition-all ${
                        activeEnvironment === env.id
                          ? "border-green-400 bg-green-400/10 text-white"
                          : "border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500"
                      }`}
                      style={{
                        marginBottom:
                          index === environmentOperators.length - 1
                            ? "0"
                            : "4px",
                        marginTop: index === 0 ? "0" : "12px",
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{env.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium text-base">
                            <p>{env.name}</p>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {env.description}
                          </div>
                          <div className="text-xs text-green-400 mt-1">
                            {env.specialEffects}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Full-Width Simulation Output */}
        <div className="w-full" style={{ transform: "translateY(-100px)" }}>
          <h3 className="text-2xl font-bold text-green-400 font-mono mb-8 text-center">
            SIMULATION OUTPUT
          </h3>

          <AnimatePresence>
            {simulationResult && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Vector Projection */}
                <div className="p-6 rounded-2xl border border-gray-600 bg-gray-800/50">
                  <h4 className="text-green-400 font-mono mb-4 text-lg">
                    VECTOR PROJECTION ϕ(c,𝓔)
                  </h4>
                  <div className="space-y-4">
                    {Object.entries(simulationResult.vector).map(
                      ([key, value]) => (
                        <div key={key}>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-300 font-mono">
                              {key}
                            </span>
                            <span className="text-white font-bold">
                              {(value as number).toFixed(3)}
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-3">
                            <motion.div
                              className="bg-green-400 h-3 rounded-full"
                              initial={{ width: 0 }}
                              animate={{
                                width: `${(value as number) * 100}%`,
                              }}
                              transition={{ duration: 1, delay: 0.2 }}
                            />
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Structural Outcome */}
                <div className="p-6 rounded-2xl border border-gray-600 bg-gray-800/50">
                  <h4 className="text-green-400 font-mono mb-4 text-lg">
                    STRUCTURAL OUTCOME
                  </h4>
                  <div className="bg-yellow-400/20 border border-yellow-400 rounded-lg px-4 py-6 text-center">
                    <span className="text-yellow-400 font-mono font-bold text-xl">
                      {simulationResult.outcome}
                    </span>
                  </div>
                  <div className="mt-4 text-gray-300 text-sm">
                    Classification based on dominant risk vector component
                  </div>
                </div>

                {/* Loophole Profile */}
                {simulationResult.loopholeProfile && (
                  <div className="p-6 rounded-2xl border border-gray-600 bg-gray-800/50">
                    <h4 className="text-green-400 font-mono mb-4 text-lg">
                      LOOPHOLE PROFILE
                    </h4>
                    <div className="space-y-4">
                      <div className="text-white font-medium text-lg">
                        {simulationResult.loopholeProfile.class}
                      </div>
                      <div className="text-gray-300 text-sm leading-relaxed">
                        {simulationResult.loopholeProfile.description}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {!simulationResult && !isSimulating && (
            <div className="text-center text-gray-500 py-16">
              <div className="text-6xl mb-6">⚡</div>
              <div className="text-xl font-mono">
                Configure sequence and simulate to see results
              </div>
              <div className="text-sm text-gray-400 mt-2">
                Add clauses to staging field and select environment operator
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
