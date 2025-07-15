import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Type definitions
interface ClauseData {
  id: string;
  title: string;
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

// Clause data based on specifications
const availableClauses: ClauseData[] = [
  {
    id: "C1.4",
    title: "Price Adjustment Over 5%",
    riskVector: { DG: 0.51, RT: 0.76, CI: 0.34, SB: 0.2 },
    overrideFlags: "overrides if last",
    typology: "RT",
    color: "#E27E3C",
    description: "Allows price adjustments exceeding threshold limits",
  },
  {
    id: "C3.2",
    title: "Emergency Procurement Trigger",
    riskVector: { DG: 0.88, RT: 0.45, CI: 0.64, SB: 0.3 },
    overrideFlags: "overrides any C5",
    typology: "DG",
    color: "#17B58F",
    description: "Bypasses standard procurement procedures",
  },
  {
    id: "C5.1",
    title: "Re-Tendering Exception",
    riskVector: { DG: 0.3, RT: 0.2, CI: 0.79, SB: 0.4 },
    overrideFlags: "overridden by C3.2",
    typology: "CI",
    color: "#DB4F4F",
    description: "Scope match exemption from competitive bidding",
  },
  {
    id: "C2.7",
    title: "Notification Suspension",
    riskVector: { DG: 0.45, RT: 0.3, CI: 0.21, SB: 0.78 },
    overrideFlags: "overrides escalation logic",
    typology: "SB",
    color: "#9F77C9",
    description: "Delays or prevents transparency requirements",
  },
  {
    id: "C4.9",
    title: "Repetition of Services Clause",
    riskVector: { DG: 0.35, RT: 0.65, CI: 0.39, SB: 0.25 },
    overrideFlags: "no override, amplifies RT",
    typology: "RT",
    color: "#E27E3C",
    description: "Enables contract extensions without rebidding",
  },
  {
    id: "C6.3",
    title: "Technical Dialogue Expansion",
    riskVector: { DG: 0.61, RT: 0.3, CI: 0.2, SB: 0.43 },
    overrideFlags: "delay-based operator",
    typology: "DG",
    color: "#17B58F",
    description: "Extends negotiation timeframes beyond limits",
  },
];

const environmentOperators: EnvironmentOperator[] = [
  {
    id: "election",
    name: "Election-Year Context",
    icon: "🗳️",
    description: "Political pressure environment",
    modifiers: { DG: 0.1, RT: 0.2, CI: 0, SB: 0 },
    specialEffects: "makes Clause 3.2 override any clause",
  },
  {
    id: "loan",
    name: "Foreign Loan Agreement",
    icon: "🌍",
    description: "International funding constraints",
    modifiers: { DG: 0, RT: 0.15, CI: 0, SB: -0.1 },
    specialEffects: "disables visibility of Clause 6.3",
  },
  {
    id: "timeline",
    name: "Compressed Timeline",
    icon: "⏱️",
    description: "Emergency authority activation",
    modifiers: { DG: 0.15, RT: 0, CI: 0.1, SB: 0 },
    specialEffects: "activates passive override in C5.1",
  },
];

const LegalStructuralSimulator: React.FC = () => {
  const [selectedClauses, setSelectedClauses] = useState<(ClauseData | null)[]>(
    [null, null, null],
  );
  const [activeEnvironment, setActiveEnvironment] = useState<string | null>(
    null,
  );
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
      const env = environmentOperators.find((e) => e.id === activeEnvironment);

      // Calculate vector composition
      let totalVector = { DG: 0, RT: 0, CI: 0, SB: 0 };

      validClauses.forEach((clause) => {
        totalVector.DG += clause.riskVector.DG + (env?.modifiers.DG || 0);
        totalVector.RT += clause.riskVector.RT + (env?.modifiers.RT || 0);
        totalVector.CI += clause.riskVector.CI + (env?.modifiers.CI || 0);
        totalVector.SB += clause.riskVector.SB + (env?.modifiers.SB || 0);
      });

      // Normalize to 0-1 range
      Object.keys(totalVector).forEach((key) => {
        totalVector[key as keyof typeof totalVector] = Math.min(
          1,
          Math.max(0, totalVector[key as keyof typeof totalVector]),
        );
      });

      // Determine outcome
      const maxVector = Object.entries(totalVector).reduce((a, b) =>
        a[1] > b[1] ? a : b,
      );
      const outcomeMap: { [key: string]: string } = {
        DG: "Discretionary Breach",
        RT: "Risk Transfer",
        CI: "Simulated Legality",
        SB: "Nullified Oversight",
      };

      setSimulationResult({
        vector: totalVector,
        outcome: outcomeMap[maxVector[0]],
        loopholeProfile: generateLoopholeProfile(validClauses, env),
        overridePattern: generateOverridePattern(validClauses),
      });

      setIsSimulating(false);
    }, 2000);
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
    <section className="py-20 px-4" style={{ backgroundColor: "#0B1E16" }}>
      <div className="container mx-auto max-w-7xl">
        {/* Core Premise */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-display-xl text-white mb-8"
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
