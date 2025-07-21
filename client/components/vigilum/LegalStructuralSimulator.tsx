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
    weight: 0.46,
    description: "Simulates multi-stage, opaquely routed funding flows. Triggers cross-discipline risk thresholds.",
    tags: ["#multi-stage", "#opacity", "#cross-discipline"],
    professionalInsight: {
      economist: "Creates liquidity fragmentation across temporal boundaries",
      auditor: "Trail becomes discontinuous at routing junctions",
      engineer: "Parallel pathways enable load balancing but reduce traceability"
    }
  },
  {
    id: "S2",
    title: "Incentive-Driven Compliance",
    weight: 0.52,
    description: "Obedience logic only triggers on downstream reward. Models performance-tied compliance elasticity.",
    tags: ["#incentive", "#compliance", "#elasticity"],
    professionalInsight: {
      economist: "Behavior becomes reward-dependent rather than rule-dependent",
      auditor: "Compliance gaps emerge during reward delays",
      engineer: "System state depends on feedback loop timing"
    }
  },
  {
    id: "S3",
    title: "Persistence Injection",
    weight: 0.49,
    description: "Scenario repeats or loops system behavior without explicit re-authorization. Tests for undetected inertia.",
    tags: ["#persistence", "#inertia", "#loop"],
    professionalInsight: {
      economist: "Creates momentum beyond initial resource allocation",
      auditor: "Authorization chain becomes unclear after first cycle",
      engineer: "Self-sustaining processes reduce external control"
    }
  },
  {
    id: "S4",
    title: "Latency Differential",
    weight: 0.44,
    description: "Systemic delays intentionally decouple resource release and recognition. Surfaces hidden liquidity and power shifts.",
    tags: ["#latency", "#liquidity", "#power-shift"],
    professionalInsight: {
      economist: "Temporal arbitrage opportunities emerge from timing gaps",
      auditor: "Recognition lag creates accountability windows",
      engineer: "Asynchronous processing enables state manipulation"
    }
  },
  {
    id: "S5",
    title: "External Logic Overwrite",
    weight: 0.58,
    description: "Foreign or donor logic dominates internal decision vectors. Probes dependency and agency displacement.",
    tags: ["#dependency", "#agency", "#external"],
    professionalInsight: {
      economist: "Decision autonomy transfers to external stakeholders",
      auditor: "Authority chain becomes externally determined",
      engineer: "Control system architecture inverts"
    }
  },
  {
    id: "S6",
    title: "Quantization Gate Fragmentation",
    weight: 0.36,
    description: "Splits authorizations into subunits to bypass scrutiny. Examines distributed threshold evasion.",
    tags: ["#fragmentation", "#threshold", "#distributed"],
    professionalInsight: {
      economist: "Atomic transactions fall below oversight resolution",
      auditor: "Individual approvals seem reasonable, aggregate does not",
      engineer: "Distributed logic prevents holistic system visibility"
    }
  }
];

// Environment Operators data
const environmentOperators: EnvironmentOperator[] = [
  {
    id: "E1",
    name: "Vector Path Inversion",
    weight: 0.34,
    description: "Inverts directionality between inputs. Early-stage actions echo in late outcomes and vice versa.",
    transformEffect: "Temporal causality reversal affects all module interactions"
  },
  {
    id: "E2",
    name: "Constraint Masking",
    weight: 0.41,
    description: "Conceals mutual thresholds; modules become \"blind\" to each other's logic.",
    transformEffect: "Information isolation between selected modules"
  },
  {
    id: "E3",
    name: "Temporal Normalization Collapse",
    weight: 0.38,
    description: "Flattens process sequencing, forcing all modules to resolve simultaneously.",
    transformEffect: "Sequential processing becomes parallel execution"
  }
];

// Example scenarios for loader
const exampleScenarios = [
  {
    inputs: ["S1", "S3", "S5"],
    operators: ["E2", "E3"],
    name: "Distributed Persistence with External Override"
  },
  {
    inputs: ["S2", "S4", "S6"],
    operators: ["E1"],
    name: "Fragmented Incentive Cascade"
  },
  {
    inputs: ["S1", "S4", "S5"],
    operators: ["E2"],
    name: "Temporal Displacement Network"
  }
];

const StructuralCognitionChamber: React.FC = () => {
  const [selectedInputs, setSelectedInputs] = useState<(StructuralInput | null)[]>([null, null, null]);
  const [selectedOperators, setSelectedOperators] = useState<string[]>([]);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [simulationHistory, setSimulationHistory] = useState<SimulationResult[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showHints, setShowHints] = useState(true);
  const [professionalView, setProfessionalView] = useState<'economist' | 'auditor' | 'engineer'>('economist');
  const [showComparison, setShowComparison] = useState(false);
  const [ellipsisCount, setEllipsisCount] = useState(0);

  // Animated ellipsis effect
  useEffect(() => {
    const interval = setInterval(() => {
      setEllipsisCount(prev => prev === 3 ? 0 : prev + 1);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const selectInput = (input: StructuralInput, slotIndex: number) => {
    // Check if this input is already selected in any slot
    const isAlreadySelected = selectedInputs.some(selectedInput =>
      selectedInput && selectedInput.id === input.id
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
      setSelectedOperators(selectedOperators.filter(id => id !== operatorId));
    } else if (selectedOperators.length < 2) {
      setSelectedOperators([...selectedOperators, operatorId]);
    }
  };

  const executeSimulation = () => {
    setIsSimulating(true);

    setTimeout(() => {
      const validInputs = selectedInputs.filter(input => input !== null) as StructuralInput[];
      const operators = environmentOperators.filter(op => selectedOperators.includes(op.id));

      // Mathematical computation
      let phi = 0;
      let computationDetails: string[] = [];

      validInputs.forEach((input, i) => {
        let weight = input.weight;
        let positionalModifier = 1.0;
        let interactionCoeff = 1.0;

        // Apply environmental transformations
        operators.forEach(op => {
          if (i === 0) {
            positionalModifier *= 1.0;
          } else {
            positionalModifier *= (1 + op.weight * 0.3);
          }
        });

        // Interaction coefficients
        validInputs.forEach((otherInput, j) => {
          if (i !== j) {
            interactionCoeff += Math.abs(input.weight - otherInput.weight) * 0.1;
          }
        });

        const contribution = weight * positionalModifier * interactionCoeff;
        phi += contribution;
        computationDetails.push(`(${weight.toFixed(2)} × ${positionalModifier.toFixed(2)} × ${interactionCoeff.toFixed(2)})`);
      });

      // Generate configuration outcomes
      const configurations = [
        "Distributed Inertia Cascade with Fragmented Gate Logic",
        "Temporal Displacement Network with External Override",
        "Multi-Vector Persistence Under Constraint Masking",
        "Incentive-Driven Threshold Evasion Pattern",
        "Latency-Amplified Authority Displacement"
      ];

      const fractureVectors = [
        "DG + RT via masked latency",
        "CI + SB through temporal inversion",
        "RT + OD via fragmentation cascade",
        "DG + CI through persistence loop",
        "SB + RT via external override"
      ];

      const result: SimulationResult = {
        phi: phi,
        configurationName: configurations[Math.floor(phi * 5) % configurations.length],
        fractureVector: fractureVectors[Math.floor(phi * 5) % fractureVectors.length],
        typologyDrift: Math.floor(phi * 25) % 30,
        overrideChainDepth: Math.floor(phi * 3) % 5 + 1,
        detectionProbability: phi > 1.5 ? "Recognition possible only via cross-field audit" : "Detectable through standard review",
        computationDetails: computationDetails,
        professionalDiagnostics: {
          economist: `System simulates temporal dependency inversion — ${phi > 1.0 ? 'late volatility becomes early instability' : 'stable equilibrium maintained'}.`,
          auditor: `Module fragmentation ${phi > 1.2 ? 'reduces visibility below minimum audit resolution' : 'remains within acceptable monitoring thresholds'}.`,
          engineer: `Distributed thresholds create ${phi > 1.1 ? 'sharded logic; no single node signals full risk' : 'manageable system complexity'}.`
        }
      };

      setSimulationResult(result);
      setSimulationHistory(prev => [result, ...prev].slice(0, 5));
      setIsSimulating(false);
    }, 2000);
  };

  const loadExampleScenario = () => {
    const scenario = exampleScenarios[Math.floor(Math.random() * exampleScenarios.length)];

    // Load inputs
    const newInputs: (StructuralInput | null)[] = [null, null, null];
    scenario.inputs.forEach((inputId, index) => {
      const input = structuralInputs.find(s => s.id === inputId);
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

  return (
    <section className="pt-20 px-4" style={{ backgroundColor: "#102B21" }}>
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <motion.h3
            className="text-heading-md text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            STRUCTURAL COGNITION CHAMBER
          </motion.h3>

          {/* Hint Bar */}
          {showHints && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-gray-800/50 rounded-lg p-3 mb-6 flex items-center justify-between"
            >
              <span className="text-gray-300 text-sm">
                Assemble scenario modules. Adjust environmental pressure. Observe structural configuration.
              </span>
              <button
                onClick={() => setShowHints(false)}
                className="text-gray-400 hover:text-white ml-4"
              >
                ×
              </button>
            </motion.div>
          )}

          {!showHints && (
            <button
              onClick={() => setShowHints(true)}
              className="text-green-400 hover:text-green-300 text-sm mb-6"
            >
              ? Show hints
            </button>
          )}
        </div>

        {/* Main Interface */}
        <div className="flex flex-col lg:flex-row gap-8 min-h-[600px] mb-16">
          {/* Structural Input Library */}
          <div className="flex-1 flex flex-col">
            <div className="text-center p-4 border-b border-white/10 h-[120px] flex flex-col justify-center">
              <h4 className="text-xl text-green-400 font-display uppercase tracking-wide">
                Structural Input Library
              </h4>
              <p className="text-gray-400 text-sm mt-2">
                Select up to 3 scenario modules — each a fictionalized economic logic fragment shaping system behavior.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 max-h-[400px]">
              <div className="space-y-3">
                {structuralInputs.map((input) => {
                  const isAlreadySelected = selectedInputs.some(selectedInput =>
                    selectedInput && selectedInput.id === input.id
                  );

                  return (
                    <motion.div
                      key={input.id}
                      className={`p-3 rounded-lg border transition-all group ${
                        isAlreadySelected
                          ? "border-green-400 cursor-not-allowed opacity-60"
                          : "border-gray-600 cursor-pointer hover:border-green-400/50"
                      }`}
                      style={{
                        backgroundColor: isAlreadySelected ? "#2a4a32" : "#1f2e28",
                        borderColor: isAlreadySelected ? "#d4c69b" : "rgba(255,255,255,0.1)"
                      }}
                      whileHover={!isAlreadySelected ? { scale: 1.02, backgroundColor: "#2a3a32" } : {}}
                      onClick={() => {
                        if (!isAlreadySelected) {
                          const emptySlot = selectedInputs.findIndex(s => s === null);
                          if (emptySlot !== -1) {
                            selectInput(input, emptySlot);
                          }
                        }
                      }}
                    >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-mono text-white flex-1 pr-2" style={{ color: "#eae2cc" }}>
                        {input.title}
                      </h4>
                      <span className="text-xs font-mono text-gray-400 whitespace-nowrap">
                        w = {input.weight.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">
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
              <h4 className="text-xl text-green-400 font-display uppercase tracking-wide">
                Input Sequencer
              </h4>
              <p className="text-gray-400 text-sm mt-2">
                Sequence changes emergent outcome.
              </p>
              <div className="text-sm text-gray-500 mt-2">
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
                      backgroundColor: input ? "#1f2e28" : "transparent",
                      borderColor: input ? "#d4c69b" : "rgba(255,255,255,0.1)"
                    }}
                  >
                    {input ? (
                      <div className="w-full">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-sm font-mono text-white">{input.title}</h5>
                          <button
                            onClick={() => removeInput(index)}
                            className="text-red-400 hover:text-red-300 text-xs"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="text-xs text-gray-400">
                          Position {index + 1} • w = {input.weight.toFixed(2)}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-500 text-sm">Position {index + 1}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  onClick={executeSimulation}
                  disabled={selectedInputs.every(s => s === null) || isSimulating}
                  className="flex-1 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-ui font-bold rounded-2xl transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSimulating ? "PROCESSING..." : "EXECUTE SIMULATION"}
                </motion.button>

                {(selectedInputs.some(s => s !== null) || selectedOperators.length > 0 || simulationResult) && (
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
              <h4 className="text-xl text-green-400 font-display uppercase tracking-wide">
                Environment Operators
              </h4>
              <p className="text-gray-400 text-sm mt-2">
                Select up to 2. Each transforms module interactions — structurally, not visually.
              </p>
            </div>

            <div className="flex-1 p-4">
              <div className="space-y-4">
                <p className="text-xs text-gray-400 mb-4">Select up to 2 operators</p>
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
                      <div className="flex items-center justify-between">
                        <h4
                          className="font-mono text-sm flex-1 pr-2"
                          style={{ color: "#cab27f" }}
                        >
                          {operator.name}
                        </h4>
                        <span className="text-xs font-mono text-gray-400 whitespace-nowrap">
                          w = {operator.weight.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {operator.description}
                      </p>
                      <div className="text-xs text-green-400/70 pt-1 border-t border-gray-700/50">
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
                <div className="p-8 rounded-lg border border-gray-600 bg-gradient-to-br from-gray-900 to-gray-800">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-green-400 font-mono text-lg">SIMULATION OUTPUT</h4>
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
                    <h5 className="text-green-400 font-mono mb-4 text-md">MATHEMATICAL TRACE</h5>
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
                        ϕ = {simulationResult.computationDetails.join(" + ")} = {simulationResult.phi.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-400">
                        Where environment and position have modified original weights.
                      </div>
                    </div>
                  </div>

                  {/* Structural Outcome */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h5 className="text-green-400 font-mono mb-4 text-md">STRUCTURAL OUTCOME</h5>
                      <div className="space-y-3 font-mono" style={{ color: "#cab27f" }}>
                        <div className="text-lg">
                          <span className="text-gray-400">Configuration Identified:</span><br/>
                          "{simulationResult.configurationName}"
                        </div>
                        <div className="text-lg">
                          <span className="text-gray-400">Fracture Vector:</span><br/>
                          {simulationResult.fractureVector}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-green-400 font-mono mb-4 text-md">EMERGENT RISK INDICES</h5>
                      <div className="space-y-3 font-mono text-sm" style={{ color: "#cab27f" }}>
                        <div>
                          <span className="text-gray-400">Typology Drift (Δv):</span><br/>
                          {simulationResult.typologyDrift}° off compliance baseline
                        </div>
                        <div>
                          <span className="text-gray-400">Override Chain Depth (Ω):</span><br/>
                          {simulationResult.overrideChainDepth} recursive redirections detected
                        </div>
                        <div>
                          <span className="text-gray-400">Detection Probability (ρ):</span><br/>
                          {simulationResult.detectionProbability}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Professional Diagnostics */}
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <h5 className="text-green-400 font-mono text-md">PROFESSIONAL DIAGNOSTICS</h5>
                      <div className="flex gap-2">
                        {(['economist', 'auditor', 'engineer'] as const).map((profession) => (
                          <button
                            key={profession}
                            onClick={() => setProfessionalView(profession)}
                            className={`px-3 py-1 text-xs rounded ${
                              professionalView === profession
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            } transition-colors`}
                          >
                            {profession.charAt(0).toUpperCase() + profession.slice(1)}
                          </button>
                        ))}
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
                        <span className="text-gray-400">View As {professionalView.charAt(0).toUpperCase() + professionalView.slice(1)}:</span>
                      </div>
                      <div>
                        "{simulationResult.professionalDiagnostics[professionalView]}"
                      </div>
                    </div>
                  </div>

                  {/* Comparison Panel */}
                  {showComparison && simulationHistory.length > 1 && (
                    <div className="mt-8 pt-8 border-t border-gray-600">
                      <h5 className="text-green-400 font-mono mb-4 text-md">SIMULATION COMPARISON</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {simulationHistory.slice(0, 2).map((result, index) => (
                          <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                            <div className="text-sm font-mono text-gray-400 mb-2">
                              Simulation {index === 0 ? 'Current' : 'Previous'}
                            </div>
                            <div className="text-xs font-mono space-y-1" style={{ color: "#cab27f" }}>
                              <div>ϕ = {result.phi.toFixed(2)}</div>
                              <div>Drift: {result.typologyDrift}��</div>
                              <div>Depth: {result.overrideChainDepth}</div>
                              <div className="text-gray-400">{result.configurationName}</div>
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
            <div className="text-center text-gray-500 py-16">
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

        {/* Epistemic Footer */}
        <div className="text-center py-8 border-t border-gray-600 mt-16">
          <p className="text-gray-400 text-sm font-mono leading-relaxed">
            This simulation does not reveal intention or error.<br/>
            It renders structural consequence — a logic state in the space between law and reality.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StructuralCognitionChamber;
