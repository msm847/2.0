import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Type definitions
interface StructuralInput {
  id: string;
  title: string;
  weight: number;
  description: string;
  tags: string[];
  professionalInsight: {
    economist: string;
    auditor: string;
    engineer: string;
  };
}

interface EnvironmentOperator {
  id: string;
  name: string;
  weight: number;
  description: string;
  transformEffect: string;
}

interface SimulationResult {
  phi: number;
  configurationName: string;
  fractureVector: string;
  typologyDrift: number;
  overrideChainDepth: number;
  detectionProbability: string;
  computationDetails: string[];
  professionalDiagnostics: {
    economist: string;
    auditor: string;
    engineer: string;
  };
}

// Structural Input data
const structuralInputs: StructuralInput[] = [
  {
    id: "S1",
    title: "Revenue Path Splitting",
    weight: 0.6,
    description:
      "Simulates multi-stage, opaquely routed funding flows. Triggers cross-discipline risk thresholds.",
    tags: ["#multi-stage", "#opacity", "#cross-discipline"],
    professionalInsight: {
      economist: "Creates liquidity fragmentation across temporal boundaries",
      auditor: "Trail becomes discontinuous at routing junctions",
      engineer:
        "Parallel pathways enable load balancing but reduce traceability",
    },
  },
  {
    id: "S2",
    title: "Segmented Authorization Drift",
    weight: 0.44,
    description:
      "Splits authorizations into subunits to bypass scrutiny. Examines distributed threshold evasion.",
    tags: ["#fragmentation", "#threshold", "#distributed"],
    professionalInsight: {
      economist: "Atomic transactions fall below oversight resolution",
      auditor: "Individual approvals seem reasonable, aggregate does not",
      engineer: "Distributed logic prevents holistic system visibility",
    },
  },
  {
    id: "S3",
    title: "Persistence Injection",
    weight: 0.71,
    description:
      "Scenario repeats or loops system behavior without explicit re-authorization. Tests for undetected inertia.",
    tags: ["#persistence", "#inertia", "#loop"],
    professionalInsight: {
      economist: "Creates momentum beyond initial resource allocation",
      auditor: "Authorization chain becomes unclear after first cycle",
      engineer: "Self-sustaining processes reduce external control",
    },
  },
  {
    id: "S4",
    title: "Latency Differential",
    weight: 0.49,
    description:
      "Systemic delays intentionally decouple resource release and recognition. Surfaces hidden liquidity and power shifts.",
    tags: ["#latency", "#liquidity", "#power-shift"],
    professionalInsight: {
      economist: "Temporal arbitrage opportunities emerge from timing gaps",
      auditor: "Recognition lag creates accountability windows",
      engineer: "Asynchronous processing enables state manipulation",
    },
  },
  {
    id: "S5",
    title: "External Logic Overwrite",
    weight: 0.68,
    description:
      "Foreign or donor logic dominates internal decision vectors. Probes dependency and agency displacement.",
    tags: ["#dependency", "#agency", "#external"],
    professionalInsight: {
      economist: "Decision autonomy transfers to external stakeholders",
      auditor: "Authority chain becomes externally determined",
      engineer: "Control system architecture inverts",
    },
  },
  {
    id: "S6",
    title: "Incentive-Driven Compliance",
    weight: 0.54,
    description:
      "Obedience logic only triggers on downstream reward. Models performance-tied compliance elasticity.",
    tags: ["#incentive", "#compliance", "#elasticity"],
    professionalInsight: {
      economist: "Behavior becomes reward-dependent rather than rule-dependent",
      auditor: "Compliance gaps emerge during reward delays",
      engineer: "System state depends on feedback loop timing",
    },
  },
];

// Environment Operators data
const environmentOperators: EnvironmentOperator[] = [
  {
    id: "E1",
    name: "Systemic Liquidity Squeeze",
    weight: 0.64,
    description:
      "Constrains available cashflow and accelerates funding bottlenecks. Delays, splits, and fragmented authorizations intensify; hidden deficits become more likely.",
    transformEffect:
      "Amplifies the impact of Latency Differential, Revenue Path Splitting, and Segmented Authorization Drift",
  },
  {
    id: "E2",
    name: "Authority Feedback\nLoop",
    weight: 0.67,
    description:
      "Creates overlapping, circular chains of responsibility. Compliance and oversight reference each other recursively, making structural ambiguity persistent and difficult to resolve.",
    transformEffect:
      "Entangles Incentive-Driven Compliance and Persistence Injection, increasing recursion and persistence of ambiguous authority",
  },
  {
    id: "E3",
    name: "Audit Signal Degradation",
    weight: 0.6,
    description:
      "Weakens all transparency and monitoring channels. Flow paths, triggers, and module effects become harder to distinguish, raising detection thresholds and audit risk.",
    transformEffect:
      "Obscures flows in Revenue Path Splitting and Segmented Authorization Drift",
  },
  {
    id: "E4",
    name: "Exogenous Override Event",
    weight: 0.72,
    description:
      "Imposes sudden external requirements, policy constraints, or donor logic on all modules. Internal logic adapts or is bypassed to meet outside demands.",
    transformEffect:
      "Distorts External Logic Overwrite and any module with conditional triggers",
  },
];

// Example scenarios for loader
const exampleScenarios = [
  {
    inputs: ["S1", "S3", "S5"],
    operators: ["E2", "E4"],
    name: "Recursive Persistence with Exogenous Override",
  },
  {
    inputs: ["S2", "S4", "S6"],
    operators: ["E1", "E3"],
    name: "Liquidity-Constrained Fragmentation Network",
  },
  {
    inputs: ["S1", "S4", "S5"],
    operators: ["E2", "E3"],
    name: "Authority-Coupled Signal Degradation",
  },
  {
    inputs: ["S2", "S3", "S6"],
    operators: ["E1", "E4"],
    name: "Exogenous Liquidity Persistence Loop",
  },
];

interface StructuralCognitionChamberProps {
  embedded?: boolean;
}

const StructuralCognitionChamber: React.FC<StructuralCognitionChamberProps> = ({
  embedded = false,
}) => {
  const [selectedInputs, setSelectedInputs] = useState<
    (StructuralInput | null)[]
  >([null, null, null]);
  const [selectedOperators, setSelectedOperators] = useState<string[]>([]);
  const [simulationResult, setSimulationResult] =
    useState<SimulationResult | null>(null);
  const [simulationHistory, setSimulationHistory] = useState<
    SimulationResult[]
  >([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [professionalView, setProfessionalView] = useState<
    "economist" | "auditor" | "engineer"
  >("economist");
  const [showComparison, setShowComparison] = useState(false);
  const [ellipsisCount, setEllipsisCount] = useState(0);

  // Animated ellipsis effect
  useEffect(() => {
    const interval = setInterval(() => {
      setEllipsisCount((prev) => (prev === 3 ? 0 : prev + 1));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const selectInput = (input: StructuralInput, slotIndex: number) => {
    // Check if this input is already selected in any slot
    const isAlreadySelected = selectedInputs.some(
      (selectedInput) => selectedInput && selectedInput.id === input.id,
    );

    if (!isAlreadySelected) {
      const newSelected = [...selectedInputs];
      newSelected[slotIndex] = input;
      setSelectedInputs(newSelected);
    }
  };

  const removeInput = (slotIndex: number) => {
    const newSelected = [...selectedInputs];
    newSelected[slotIndex] = null;
    setSelectedInputs(newSelected);
  };

  const toggleOperator = (operatorId: string) => {
    if (selectedOperators.includes(operatorId)) {
      setSelectedOperators(selectedOperators.filter((id) => id !== operatorId));
    } else if (selectedOperators.length < 2) {
      setSelectedOperators([...selectedOperators, operatorId]);
    }
  };

  const executeSimulation = () => {
    setIsSimulating(true);

    setTimeout(() => {
      const validInputs = selectedInputs.filter(
        (input) => input !== null,
      ) as StructuralInput[];
      const operators = environmentOperators.filter((op) =>
        selectedOperators.includes(op.id),
      );

      // Mathematical computation
      let phi = 0;
      let computationDetails: string[] = [];

      validInputs.forEach((input, i) => {
        let weight = input.weight;
        let positionalModifier = 1.0;
        let interactionCoeff = 1.0;

        // Apply environmental transformations
        operators.forEach((op) => {
          if (i === 0) {
            positionalModifier *= 1.0;
          } else {
            positionalModifier *= 1 + op.weight * 0.3;
          }
        });

        // Interaction coefficients
        validInputs.forEach((otherInput, j) => {
          if (i !== j) {
            interactionCoeff +=
              Math.abs(input.weight - otherInput.weight) * 0.1;
          }
        });

        const contribution = weight * positionalModifier * interactionCoeff;
        phi += contribution;
        computationDetails.push(
          `(${weight.toFixed(2)} × ${positionalModifier.toFixed(2)} × ${interactionCoeff.toFixed(2)})`,
        );
      });

      // Generate configuration outcomes
      const configurations = [
        "Distributed Inertia Cascade with Fragmented Gate Logic",
        "Temporal Displacement Network with External Override",
        "Multi-Vector Persistence Under Constraint Masking",
        "Incentive-Driven Threshold Evasion Pattern",
        "Latency-Amplified Authority Displacement",
      ];

      const fractureVectors = [
        "DG + RT via masked latency",
        "CI + SB through temporal inversion",
        "RT + OD via fragmentation cascade",
        "DG + CI through persistence loop",
        "SB + RT via external override",
      ];

      const result: SimulationResult = {
        phi: phi,
        configurationName:
          configurations[Math.floor(phi * 5) % configurations.length],
        fractureVector:
          fractureVectors[Math.floor(phi * 5) % fractureVectors.length],
        typologyDrift: Math.floor(phi * 25) % 30,
        overrideChainDepth: (Math.floor(phi * 3) % 5) + 1,
        detectionProbability:
          phi > 1.5
            ? "Recognition possible only via cross-field audit"
            : "Detectable through standard review",
        computationDetails: computationDetails,
        professionalDiagnostics: {
          economist: `System simulates temporal dependency inversion — ${phi > 1.0 ? "late volatility becomes early instability" : "stable equilibrium maintained"}.`,
          auditor: `Module fragmentation ${phi > 1.2 ? "reduces visibility below minimum audit resolution" : "remains within acceptable monitoring thresholds"}.`,
          engineer: `Distributed thresholds create ${phi > 1.1 ? "sharded logic; no single node signals full risk" : "manageable system complexity"}.`,
        },
      };

      setSimulationResult(result);
      setSimulationHistory((prev) => [result, ...prev].slice(0, 5));
      setIsSimulating(false);
    }, 2000);
  };

  const loadExampleScenario = () => {
    const scenario =
      exampleScenarios[Math.floor(Math.random() * exampleScenarios.length)];

    // Load inputs
    const newInputs: (StructuralInput | null)[] = [null, null, null];
    scenario.inputs.forEach((inputId, index) => {
      const input = structuralInputs.find((s) => s.id === inputId);
      if (input && index < 3) {
        newInputs[index] = input;
      }
    });

    setSelectedInputs(newInputs);
    setSelectedOperators(scenario.operators);

    // Auto-execute
    setTimeout(() => executeSimulation(), 500);
  };

  const resetSimulation = () => {
    setSelectedInputs([null, null, null]);
    setSelectedOperators([]);
    setSimulationResult(null);
    setIsSimulating(false);
  };

  const getTotalWeight = () => {
    return selectedInputs.reduce((sum, input) => sum + (input?.weight || 0), 0);
  };

  // Main content JSX
  const mainContent = (
    <div
      className={
        embedded ? "mx-auto max-w-[1600px] px-8" : "container mx-auto max-w-7xl"
      }
    >
      {/* Header */}
      <div className="mb-8 mt-16 text-left">
        <h3 className="text-heading-md text-white mb-4">
          STRUCTURAL COGNITION CHAMBER
        </h3>

        {/* Epistemic Statement */}
        <div className="mb-6">
          <p className="text-gray-400 text-sm font-mono leading-relaxed">
            This is a logic environment.
            <br />
            Structural consequence: the space between law and reality.
          </p>
        </div>
      </div>

      {/* Main Interface */}
      <div className="flex flex-col lg:flex-row gap-8 min-h-[600px] mb-24">
        {/* Structural Input Library */}
        <div className="flex-1 flex flex-col">
          <div className="text-center p-4 border-b border-white/10 h-[120px] flex flex-col justify-center">
            <h4 className="text-xl text-white font-display uppercase tracking-wide">
              Structural Motifs
            </h4>
            <p className="text-gray-400 text-sm mt-2">
              Assemble up to three synthetic logic fragments:
              <br />
              each introduces a new axis of economic friction, dependency, or
              recursion...
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 max-h-[400px]">
            <div className="space-y-3">
              {structuralInputs.map((input) => {
                const isAlreadySelected = selectedInputs.some(
                  (selectedInput) =>
                    selectedInput && selectedInput.id === input.id,
                );

                return (
                  <motion.div
                    key={input.id}
                    className={`p-3 rounded-lg border transition-all duration-300 group ${
                      isAlreadySelected
                        ? "cursor-not-allowed opacity-60"
                        : "cursor-pointer"
                    }`}
                    style={{
                      backgroundColor: "transparent",
                      borderColor: isAlreadySelected
                        ? "#7B7455"
                        : "rgba(123, 116, 85, 0.3)",
                      borderWidth: "1px",
                      boxShadow: isAlreadySelected
                        ? "0px 0px 15px rgba(123, 116, 85, 0.4), rgba(123, 116, 85, 0.1) 0px 1px 0px 0px inset"
                        : "rgba(123, 116, 85, 0.1) 0px 2px 8px 0px",
                    }}
                    whileHover={
                      !isAlreadySelected
                        ? {
                            scale: 1.05,
                            y: -4,
                            transition: { duration: 0.3, ease: "easeOut" }
                          }
                        : {}
                    }
                    onHoverStart={() => {
                      if (!isAlreadySelected) {
                        // Additional hover styling via direct DOM manipulation for smooth effect
                        const element = document.querySelector(`[data-input-id="${input.id}"]`);
                        if (element) {
                          element.style.borderColor = "rgba(123, 116, 85, 0.8)";
                          element.style.boxShadow = "0px 0px 25px rgba(123, 116, 85, 0.6), 0px 8px 25px rgba(0, 0, 0, 0.2), rgba(123, 116, 85, 0.2) 0px 1px 0px 0px inset";
                        }
                      }
                    }}
                    onHoverEnd={() => {
                      if (!isAlreadySelected) {
                        const element = document.querySelector(`[data-input-id="${input.id}"]`);
                        if (element) {
                          element.style.borderColor = "rgba(123, 116, 85, 0.3)";
                          element.style.boxShadow = "rgba(123, 116, 85, 0.1) 0px 2px 8px 0px";
                        }
                      }
                    }}
                    data-input-id={input.id}
                    onClick={() => {
                      if (!isAlreadySelected) {
                        const emptySlot = selectedInputs.findIndex(
                          (s) => s === null,
                        );
                        if (emptySlot !== -1) {
                          selectInput(input, emptySlot);
                        }
                      }
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4
                        className="text-sm font-mono text-white flex-1 pr-2 text-left"
                        style={{ color: "#eae2cc", textAlign: "left" }}
                      >
                        {input.title}
                      </h4>
                      <span className="text-xs font-mono text-gray-400 whitespace-nowrap">
                        w = {input.weight.toFixed(2)}
                      </span>
                    </div>
                    <p
                      className="text-xs text-gray-400 leading-relaxed text-left"
                      style={{ textAlign: "left" }}
                    >
                      {input.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Input Sequencer */}
        <div className="flex-1 flex flex-col">
          <div className="text-center p-4 border-b border-white/10 h-[120px] flex flex-col justify-center">
            <h4 className="text-xl text-white font-display uppercase tracking-wide">
              Logic Configuration
            </h4>
            <p className="text-gray-400 text-sm mt-2">
              Order is not cosmetic: each position reshapes the simulation's
              internal vector landscape...
            </p>
            <div className="text-sm mt-2" style={{ color: "#7B7455" }}>
              Σw = {getTotalWeight().toFixed(2)}
            </div>
          </div>

          <div className="flex-1 p-4">
            <div className="space-y-4 mb-6">
              {selectedInputs.map((input, index) => (
                <div
                  key={index}
                  className="min-h-[80px] border-2 border-dashed border-gray-600 rounded-lg p-4 flex items-center justify-center relative"
                  style={{
                    background: input ? "linear-gradient(135deg, #1e1f1c, #4d4b38, #7b7455)" : "transparent",
                    borderColor: input ? "#7b7455" : "rgba(123, 116, 85, 0.3)",
                  }}
                >
                  {input ? (
                    <div className="w-full text-center">
                      <div className="flex items-center justify-center mb-2 relative">
                        <h5 className="text-sm font-mono text-white text-center">
                          {input.title}
                        </h5>
                        <button
                          onClick={() => removeInput(index)}
                          className="text-red-400 hover:text-red-300 text-xs absolute top-0 right-0"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="text-xs text-gray-400 text-center">
                        Position {index + 1} • w = {input.weight.toFixed(2)}
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-500 text-sm text-center">
                      Position {index + 1}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.button
                onClick={executeSimulation}
                disabled={
                  selectedInputs.every((s) => s === null) || isSimulating
                }
                className="flex-1 py-4 disabled:bg-gray-600 text-white font-ui font-bold rounded-2xl transition-all duration-300"
                style={{
                  background: selectedInputs.every((s) => s === null) || isSimulating
                    ? "#4b5563"
                    : "linear-gradient(135deg, #1e1f1c, #4d4b38, #7b7455)",
                  cursor: selectedInputs.every((s) => s === null) || isSimulating ? "not-allowed" : "pointer"
                }}
                whileHover={{
                  scale: selectedInputs.every((s) => s === null) || isSimulating ? 1 : 1.02,
                  background: selectedInputs.every((s) => s === null) || isSimulating
                    ? "#4b5563"
                    : "linear-gradient(135deg, #2a2b28, #5d5748, #8b8465)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                {isSimulating ? "PROCESSING..." : "EXECUTE SIMULATION"}
              </motion.button>

              {(selectedInputs.some((s) => s !== null) ||
                selectedOperators.length > 0 ||
                simulationResult) && (
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

            {/* Example Loader */}
            <div className="mt-4">
              <button
                onClick={loadExampleScenario}
                className="w-full py-2 bg-blue-900/30 hover:bg-blue-900/50 text-blue-400 border border-blue-700 rounded-lg transition-colors text-sm"
              >
                Load Example Scenario
              </button>
            </div>
          </div>
        </div>

        {/* Environment Operators */}
        <div className="flex-1 flex flex-col">
          <div className="text-center p-4 border-b border-white/10 h-[120px] flex flex-col justify-center">
            <h4 className="text-xl text-white font-display uppercase tracking-wide">
              Environment Operators
            </h4>
            <p className="text-gray-400 text-sm mt-2">
              Superimpose up to two systemic constraints. Each operator alters
              internal alignments, forcing logics to compete, overlap, or
              dissolve.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 max-h-[400px]">
            <div className="space-y-4">
              <p className="text-xs text-gray-400 mb-4">
                Select up to 2 operators
              </p>
              {environmentOperators.map((operator) => (
                <motion.button
                  key={operator.id}
                  onClick={() => toggleOperator(operator.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedOperators.includes(operator.id)
                      ? "border-green-400 bg-green-400/10 text-white"
                      : "border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500"
                  }`}
                  style={{
                    background: selectedOperators.includes(operator.id)
                      ? "linear-gradient(135deg, #2a3a32, #1f2e28)"
                      : "#202d29",
                    borderColor: selectedOperators.includes(operator.id)
                      ? "#d4c69b"
                      : "rgba(255,255,255,0.1)",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={
                    !selectedOperators.includes(operator.id) &&
                    selectedOperators.length >= 2
                  }
                >
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-start justify-between">
                      <h4
                        className="font-mono text-sm flex-1 pr-2"
                        style={{
                          color: "#cab27f",
                          textTransform: "none",
                          textAlign: "left",
                        }}
                      >
                        {operator.name.split("\n").map((line, index) => (
                          <div key={index}>{line}</div>
                        ))}
                      </h4>
                      <span
                        className="text-xs font-mono text-gray-400 whitespace-nowrap"
                        style={{ textTransform: "none", textAlign: "left" }}
                      >
                        w = {operator.weight.toFixed(2)}
                      </span>
                    </div>
                    <p
                      className="text-xs text-gray-400 leading-relaxed"
                      style={{ textTransform: "none", textAlign: "left" }}
                    >
                      {operator.description}
                    </p>
                    <div
                      className="text-xs text-green-400/70 pt-1 border-t border-gray-700/50"
                      style={{ textTransform: "none", textAlign: "left" }}
                    >
                      {operator.transformEffect}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Simulation Output */}
      <div className="w-full" style={{ transform: "translateY(-60px)" }}>
        <AnimatePresence>
          {simulationResult && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="max-w-6xl mx-auto"
            >
              <div className="p-10 rounded-lg border border-gray-600 bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-green-400 font-mono text-lg">
                    SIMULATION OUTPUT
                  </h4>
                  {simulationHistory.length > 1 && (
                    <button
                      onClick={() => setShowComparison(!showComparison)}
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      Compare Simulations
                    </button>
                  )}
                </div>

                {/* Mathematical Trace */}
                <div className="mb-8">
                  <h5 className="text-green-400 font-mono mb-4 text-md">
                    MATHEMATICAL TRACE
                  </h5>
                  <div
                    className="p-6 rounded-lg font-mono text-lg leading-relaxed"
                    style={{
                      backgroundColor: "#0e1e1a",
                      color: "#cab27f",
                      border: "1px solid rgba(202, 178, 127, 0.3)",
                    }}
                  >
                    <div className="mb-4">
                      ϕ(inputs, 𝓔) = ∑ wᵢ × Pᵢ(𝓔) × Mᵢⱼ
                    </div>
                    <div className="mb-4">
                      ϕ = {simulationResult.computationDetails.join(" + ")} ={" "}
                      {simulationResult.phi.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-400">
                      Where environment and position have modified original
                      weights.
                    </div>
                  </div>
                </div>

                {/* Structural Outcome */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h5 className="text-green-400 font-mono mb-4 text-md">
                      STRUCTURAL OUTCOME
                    </h5>
                    <div
                      className="space-y-3 font-mono"
                      style={{ color: "#cab27f" }}
                    >
                      <div className="text-lg">
                        <span className="text-gray-400">
                          Configuration Identified:
                        </span>
                        <br />"{simulationResult.configurationName}"
                      </div>
                      <div className="text-lg">
                        <span className="text-gray-400">Fracture Vector:</span>
                        <br />
                        {simulationResult.fractureVector}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-green-400 font-mono mb-4 text-md">
                      EMERGENT RISK INDICES
                    </h5>
                    <div
                      className="space-y-3 font-mono text-sm"
                      style={{ color: "#cab27f" }}
                    >
                      <div>
                        <span className="text-gray-400">
                          Typology Drift (Δv):
                        </span>
                        <br />
                        {simulationResult.typologyDrift}° off compliance
                        baseline
                      </div>
                      <div>
                        <span className="text-gray-400">
                          Override Chain Depth (Ω):
                        </span>
                        <br />
                        {simulationResult.overrideChainDepth} recursive
                        redirections detected
                      </div>
                      <div>
                        <span className="text-gray-400">
                          Detection Probability (ρ):
                        </span>
                        <br />
                        {simulationResult.detectionProbability}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Diagnostics */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <h5 className="text-green-400 font-mono text-md">
                      PROFESSIONAL DIAGNOSTICS
                    </h5>
                    <div className="flex gap-2">
                      {(["economist", "auditor", "engineer"] as const).map(
                        (profession) => (
                          <button
                            key={profession}
                            onClick={() => setProfessionalView(profession)}
                            className={`px-3 py-1 text-xs rounded ${
                              professionalView === profession
                                ? "bg-green-600 text-white"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            } transition-colors`}
                          >
                            {profession.charAt(0).toUpperCase() +
                              profession.slice(1)}
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  <div
                    className="p-4 rounded-lg font-mono text-sm leading-relaxed"
                    style={{
                      backgroundColor: "#0e1e1a",
                      color: "#cab27f",
                      border: "1px solid rgba(202, 178, 127, 0.3)",
                    }}
                  >
                    <div className="mb-2">
                      <span className="text-gray-400">
                        View As{" "}
                        {professionalView.charAt(0).toUpperCase() +
                          professionalView.slice(1)}
                        :
                      </span>
                    </div>
                    <div>
                      "
                      {
                        simulationResult.professionalDiagnostics[
                          professionalView
                        ]
                      }
                      "
                    </div>
                  </div>
                </div>

                {/* Comparison Panel */}
                {showComparison && simulationHistory.length > 1 && (
                  <div className="mt-8 pt-8 border-t border-gray-600">
                    <h5 className="text-green-400 font-mono mb-4 text-md">
                      SIMULATION COMPARISON
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {simulationHistory.slice(0, 2).map((result, index) => (
                        <div
                          key={index}
                          className="p-4 bg-gray-800/50 rounded-lg"
                        >
                          <div className="text-sm font-mono text-gray-400 mb-2">
                            Simulation {index === 0 ? "Current" : "Previous"}
                          </div>
                          <div
                            className="text-xs font-mono space-y-1"
                            style={{ color: "#cab27f" }}
                          >
                            <div>ϕ = {result.phi.toFixed(2)}</div>
                            <div>Drift: {result.typologyDrift}°</div>
                            <div>Depth: {result.overrideChainDepth}</div>
                            <div className="text-gray-400">
                              {result.configurationName}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!simulationResult && !isSimulating && (
          <div className="text-center pt-2 pb-16">
            <div
              className="text-2xl font-mono mb-4"
              style={{ color: "#cab27f" }}
            >
              ϕ(c, 𝓔) = ∑ wᵢ × Pᵢ(𝓔) × Mᵢⱼ
            </div>
            <div className="text-lg font-mono text-gray-400">
              Simulation inactive — structural input incomplete
              {".".repeat(ellipsisCount)}
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
              ⚡
            </motion.div>
            <div className="text-xl font-mono">
              Executing structural cognition...
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Return appropriate wrapper based on embedded state
  if (embedded) {
    return mainContent;
  }

  return (
    <section
      className="pt-20 px-4 pb-16"
      style={{ backgroundColor: "#102B21" }}
    >
      {mainContent}
    </section>
  );
};

export default StructuralCognitionChamber;
