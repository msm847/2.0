import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Settings,
  Download,
  RefreshCw,
  Eye,
  FileText,
  BarChart3,
  Network,
  Activity,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// System State Layers
const SYSTEM_LAYERS = {
  L: { name: "Legal constraints and clause logic", symbol: "L" },
  P: { name: "Procedural structures and escalation paths", symbol: "P" },
  A: { name: "Actor configuration and legal identity", symbol: "A" },
  R: { name: "Reflex maps (allowed institutional behaviors)", symbol: "R" },
  V: { name: "Visibility logic (who perceives what)", symbol: "V" },
  ε: { name: "Environmental distortion and temporal compression", symbol: "ε" },
};

// Five Atomic Semantic Operators
const OPERATORS = [
  {
    id: "O1",
    name: "Reflex Gate",
    glyph: "⚬",
    affects: ["R", "P", "A"],
    position_sensitive: true,
    override_targets: ["O5"],
    tensor_effects: {
      R: { mode: "constrain", strength: 0.9 },
      A: { mode: "lock", strength: 0.8 },
      P: { mode: "compress", strength: 0.7 },
    },
    color: "#3B82F6",
  },
  {
    id: "O2",
    name: "Simulated Constraint",
    glyph: "⊕",
    affects: ["L", "V", "ε"],
    position_sensitive: true,
    override_targets: ["O4"],
    tensor_effects: {
      L: { mode: "simulate", strength: 0.6 },
      V: { mode: "distort", strength: 0.5 },
      ε: { mode: "amplify", strength: 0.8 },
    },
    color: "#EF4444",
  },
  {
    id: "O3",
    name: "Environmental Distortion",
    glyph: "⟐",
    affects: ["ε", "V", "P"],
    position_sensitive: true,
    override_targets: ["O1"],
    tensor_effects: {
      ε: { mode: "compress", strength: 0.9 },
      V: { mode: "mask", strength: 0.7 },
      P: { mode: "bypass", strength: 0.6 },
    },
    color: "#F59E0B",
  },
  {
    id: "O4",
    name: "Procedural Override",
    glyph: "⟡",
    affects: ["P", "L", "A"],
    position_sensitive: true,
    override_targets: ["O2"],
    tensor_effects: {
      P: { mode: "nullify", strength: 0.8 },
      L: { mode: "bypass", strength: 0.7 },
      A: { mode: "redirect", strength: 0.6 },
    },
    color: "#8B5CF6",
  },
  {
    id: "O5",
    name: "Visibility Mask",
    glyph: "⊗",
    affects: ["V", "R", "ε"],
    position_sensitive: true,
    override_targets: ["O2", "O3"],
    tensor_effects: {
      V: { mode: "nullify", strength: 0.9 },
      R: { mode: "suppress", strength: 0.6 },
      ε: { mode: "distort", strength: 0.5 },
    },
    color: "#10B981",
  },
];

// Initial system state
const INITIAL_STATE = {
  L: 0.5,
  P: 0.5,
  A: 0.5,
  R: 0.5,
  V: 0.5,
  ε: 0.2,
};

// Override resolution matrix
const OVERRIDE_MATRIX = [
  { from: "O4", to: "O2", effect: "Nullifies simulated constraint" },
  { from: "O1", to: "O5", effect: "Reflex lock disables visibility override" },
  { from: "O3", to: "O1", effect: "Distorts downstream reflex logic" },
  { from: "O5", to: "O2", effect: "Masks optics of simulated clause" },
  {
    from: "O2",
    to: "O3",
    effect: "Makes environmental signal legally invisible",
  },
];

const SemanticPermutationEngine = () => {
  const [operatorSequence, setOperatorSequence] = useState([
    "O1",
    "O2",
    "O3",
    "O4",
    "O5",
  ]);
  const [draggedOperator, setDraggedOperator] = useState<string | null>(null);
  const [executionTrace, setExecutionTrace] = useState<any[]>([]);
  const [finalState, setFinalState] = useState(INITIAL_STATE);
  const [matrixData, setMatrixData] = useState<any[][]>([]);
  const [showTrace, setShowTrace] = useState(false);
  const [showJSON, setShowJSON] = useState(false);
  const [permutationResult, setPermutationResult] = useState<any>(null);

  // Calculate tensor effects based on operator sequence
  const calculateTensorEffects = useCallback((sequence: string[]) => {
    let currentState = { ...INITIAL_STATE };
    const trace: any[] = [];

    sequence.forEach((opId, index) => {
      const operator = OPERATORS.find((op) => op.id === opId)!;
      const inputState = { ...currentState };

      // Apply positional modifiers
      const positionMultiplier = index === 0 ? 1.3 : 1.0; // Early amplification

      // Check for overrides
      const isNullified = checkOverrides(opId, sequence, index);

      if (!isNullified) {
        // Apply tensor effects
        Object.entries(operator.tensor_effects).forEach(([layer, effect]) => {
          const currentValue =
            currentState[layer as keyof typeof currentState] || 0;
          const delta = effect.strength * positionMultiplier;

          switch (effect.mode) {
            case "amplify":
              currentState[layer as keyof typeof currentState] = Math.min(
                1,
                currentValue + delta,
              );
              break;
            case "compress":
              currentState[layer as keyof typeof currentState] = Math.max(
                0,
                currentValue - delta,
              );
              break;
            case "nullify":
              currentState[layer as keyof typeof currentState] = 0;
              break;
            case "simulate":
              currentState[layer as keyof typeof currentState] = Math.min(
                1,
                currentValue + delta * 0.6,
              );
              break;
            case "distort":
              currentState[layer as keyof typeof currentState] = Math.abs(
                currentValue - delta,
              );
              break;
            case "mask":
              currentState[layer as keyof typeof currentState] =
                currentValue * (1 - delta);
              break;
            case "lock":
              currentState[layer as keyof typeof currentState] = Math.min(
                0.9,
                currentValue + delta,
              );
              break;
            case "constrain":
              currentState[layer as keyof typeof currentState] = Math.max(
                0.1,
                currentValue - delta,
              );
              break;
            case "bypass":
              currentState[layer as keyof typeof currentState] = Math.min(
                1,
                currentValue + delta * 0.8,
              );
              break;
            case "suppress":
              currentState[layer as keyof typeof currentState] =
                currentValue * 0.3;
              break;
            case "redirect":
              currentState[layer as keyof typeof currentState] =
                Math.abs(0.5 - currentValue) + 0.3;
              break;
          }
        });
      }

      trace.push({
        t: index,
        operator: opId,
        operator_name: operator.name,
        input_state: inputState,
        output_state: { ...currentState },
        nullified: isNullified,
        position_multiplier: positionMultiplier,
      });
    });

    return { finalState: currentState, trace };
  }, []);

  // Check if operator is overridden by earlier operators
  const checkOverrides = (
    opId: string,
    sequence: string[],
    currentIndex: number,
  ) => {
    const earlierOps = sequence.slice(0, currentIndex);
    return OVERRIDE_MATRIX.some(
      (override) => override.to === opId && earlierOps.includes(override.from),
    );
  };

  // Generate matrix visualization data
  const generateMatrixData = useCallback(
    (trace: any[]) => {
      return operatorSequence.map((opId, rowIndex) => {
        const operator = OPERATORS.find((op) => op.id === opId)!;
        return Object.keys(SYSTEM_LAYERS).map((layer) => {
          const traceEntry = trace[rowIndex];
          const inputValue = traceEntry?.input_state[layer] || 0;
          const outputValue = traceEntry?.output_state[layer] || 0;
          const delta = outputValue - inputValue;

          return {
            operator: opId,
            layer,
            delta,
            strength: Math.abs(delta),
            type:
              delta > 0 ? "positive" : delta < 0 ? "destructive" : "neutral",
            nullified: traceEntry?.nullified || false,
          };
        });
      });
    },
    [operatorSequence],
  );

  // Generate final permutation result
  const generatePermutationResult = useCallback(
    (sequence: string[], finalState: any, trace: any[]) => {
      const riskVector = {
        DG: Math.min(
          1,
          finalState.P * 0.3 + finalState.A * 0.4 + finalState.ε * 0.3,
        ),
        CI: Math.min(1, finalState.L * 0.4 + finalState.V * 0.6),
        RT: Math.min(1, finalState.R * 0.5 + finalState.P * 0.5),
        SB: Math.min(
          1,
          finalState.V * 0.3 + finalState.R * 0.4 + finalState.ε * 0.3,
        ),
      };

      const dominantTypology = Object.entries(riskVector).reduce((a, b) =>
        riskVector[a[0]] > riskVector[b[0]] ? a : b,
      )[0];

      return {
        permutation: sequence,
        final_state: {
          legal_validity: finalState.L > 0.5,
          procedural_integrity: finalState.P > 0.6,
          reflex_space: finalState.R < 0.3 ? "collapsed" : "operational",
          perceived_transparency: finalState.V > 0.4,
          actual_escalation_possible: finalState.P > 0.7 && finalState.A > 0.6,
          compliance_illusion_depth: Math.max(
            0,
            1 - Math.abs(finalState.L - finalState.V),
          ),
          dominant_typology: dominantTypology,
        },
        projection_vector: riskVector,
        decoherence_score:
          1 - Object.values(finalState).reduce((a, b) => a + b, 0) / 6,
        execution_trace: trace,
      };
    },
    [],
  );

  // Execute permutation calculation
  useEffect(() => {
    const { finalState: newFinalState, trace } =
      calculateTensorEffects(operatorSequence);
    setFinalState(newFinalState);
    setExecutionTrace(trace);
    setMatrixData(generateMatrixData(trace));
    setPermutationResult(
      generatePermutationResult(operatorSequence, newFinalState, trace),
    );
  }, [
    operatorSequence,
    calculateTensorEffects,
    generateMatrixData,
    generatePermutationResult,
  ]);

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, operatorId: string) => {
    setDraggedOperator(operatorId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (!draggedOperator) return;

    const newSequence = [...operatorSequence];
    const draggedIndex = newSequence.indexOf(draggedOperator);

    // Remove from old position
    newSequence.splice(draggedIndex, 1);
    // Insert at new position
    newSequence.splice(targetIndex, 0, draggedOperator);

    setOperatorSequence(newSequence);
    setDraggedOperator(null);
  };

  const shuffleOperators = () => {
    const shuffled = [...operatorSequence];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setOperatorSequence(shuffled);
  };

  const resetToDefault = () => {
    setOperatorSequence(["O1", "O2", "O3", "O4", "O5"]);
  };

  const downloadResults = () => {
    const dataStr = JSON.stringify(permutationResult, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `vigilum-spe-${operatorSequence.join("-")}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-20 px-4" style={{ backgroundColor: "#0B1E16" }}>
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-900/30 px-3 py-1 rounded-full border border-blue-700 mb-4">
            <Settings className="w-3 h-3 text-blue-400" />
            <span className="text-xs text-blue-300 font-mono uppercase tracking-wider">
              Semantic Permutation Engine
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-100 mb-4 font-mono tracking-tight">
            VIGILUM SPE
          </h2>
          <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto">
            Execute semantic permutations on five atomic operators. Each
            sequence transforms the 6-layer governance tensor through
            non-commutative logic.
          </p>
        </div>

        {/* Operator Sequence Interface */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white font-mono">
              OPERATOR SEQUENCE
            </h3>
            <div className="flex gap-3">
              <button
                onClick={shuffleOperators}
                className="px-4 py-2 rounded border font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: "rgba(16, 44, 34, 0.7)",
                  borderColor: "rgba(34, 68, 54, 0.8)",
                  color: "#34d399",
                  boxShadow: "inset 0 0 0 1px rgba(52, 211, 153, 0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(34, 68, 54, 0.9)";
                  e.currentTarget.style.boxShadow =
                    "0 0 15px rgba(52, 211, 153, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(16, 44, 34, 0.7)";
                  e.currentTarget.style.boxShadow =
                    "inset 0 0 0 1px rgba(52, 211, 153, 0.1)";
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
                  borderColor: "rgba(34, 68, 54, 0.8)",
                  color: "#34d399",
                  boxShadow: "inset 0 0 0 1px rgba(52, 211, 153, 0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(34, 68, 54, 0.9)";
                  e.currentTarget.style.boxShadow =
                    "0 0 15px rgba(52, 211, 153, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(16, 44, 34, 0.7)";
                  e.currentTarget.style.boxShadow =
                    "inset 0 0 0 1px rgba(52, 211, 153, 0.1)";
                }}
              >
                RESET
              </button>
            </div>
          </div>

          {/* Operator Tiles */}
          <div className="grid grid-cols-5 gap-4 mb-8">
            {operatorSequence.map((opId, index) => {
              const operator = OPERATORS.find((op) => op.id === opId)!;
              const isNullified = checkOverrides(opId, operatorSequence, index);

              return (
                <div
                  key={`${opId}-${index}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, opId)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`relative p-6 rounded-lg border-2 cursor-move transition-all duration-300 ${
                    isNullified ? "opacity-50" : "hover:scale-105"
                  }`}
                  style={{
                    backgroundColor: `${operator.color}20`,
                    borderColor: operator.color,
                    boxShadow: `0 0 20px ${operator.color}40`,
                  }}
                >
                  {/* Position indicator */}
                  <div className="absolute top-2 left-2 text-xs font-mono text-gray-400">
                    t{index + 1}
                  </div>

                  {/* Nullified indicator */}
                  {isNullified && (
                    <div className="absolute top-2 right-2 text-red-400 text-xs font-mono">
                      NULL
                    </div>
                  )}

                  {/* Operator glyph */}
                  <div
                    className="text-4xl font-bold text-center mb-3"
                    style={{ color: operator.color }}
                  >
                    {operator.glyph}
                  </div>

                  {/* Operator info */}
                  <div className="text-center">
                    <div className="text-sm font-bold text-white font-mono mb-1">
                      {operator.id}
                    </div>
                    <div className="text-xs text-gray-300">{operator.name}</div>
                  </div>

                  {/* Affected layers */}
                  <div className="mt-3 flex justify-center gap-1">
                    {operator.affects.map((layer) => (
                      <span
                        key={layer}
                        className="text-xs px-1 py-0.5 rounded font-mono"
                        style={{
                          backgroundColor: `${operator.color}30`,
                          color: operator.color,
                        }}
                      >
                        {layer}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sequence formula */}
          <div className="text-center">
            <div className="text-sm font-mono text-gray-400 mb-2">
              SEMANTIC EXECUTION PATH
            </div>
            <div className="text-lg font-mono text-white">
              𝒮<sub>final</sub> ={" "}
              {operatorSequence.map((op, i) => (
                <span key={i}>
                  {i > 0 && " ∘ "}
                  <span
                    style={{ color: OPERATORS.find((o) => o.id === op)?.color }}
                  >
                    {op}
                  </span>
                </span>
              ))}{" "}
              (𝒮<sub>0</sub>)
            </div>
          </div>
        </div>

        {/* Main Analysis Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Matrix Visualizer */}
          <div
            className="rounded-lg p-6 border"
            style={{
              backgroundColor: "rgba(16, 44, 34, 0.7)",
              borderColor: "rgba(34, 68, 54, 0.8)",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white font-mono">
                EXECUTION MATRIX
              </h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {/* Layer headers */}
              <div className="grid grid-cols-7 gap-2 text-xs font-mono text-gray-400">
                <div></div>
                {Object.keys(SYSTEM_LAYERS).map((layer) => (
                  <div key={layer} className="text-center">
                    {layer}
                  </div>
                ))}
              </div>

              {/* Matrix rows */}
              {matrixData.map((row, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-7 gap-2">
                  <div className="text-xs font-mono text-gray-300">
                    {operatorSequence[rowIndex]}
                  </div>
                  {row.map((cell, colIndex) => (
                    <div
                      key={colIndex}
                      className="h-8 rounded flex items-center justify-center text-xs font-mono"
                      style={{
                        backgroundColor: cell.nullified
                          ? "#374151"
                          : cell.type === "positive"
                            ? `rgba(34, 197, 94, ${cell.strength})`
                            : cell.type === "destructive"
                              ? `rgba(239, 68, 68, ${cell.strength})`
                              : "rgba(107, 114, 128, 0.3)",
                        color: cell.strength > 0.5 ? "white" : "#d1d5db",
                      }}
                    >
                      {cell.nullified ? "×" : cell.delta.toFixed(1)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* System State Visualization */}
          <div
            className="rounded-lg p-6 border"
            style={{
              backgroundColor: "rgba(16, 44, 34, 0.7)",
              borderColor: "rgba(34, 68, 54, 0.8)",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white font-mono">
                FINAL STATE
              </h3>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {Object.entries(finalState).map(([layer, value]) => (
                <div key={layer} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-mono text-gray-300">
                      {layer} -{" "}
                      {SYSTEM_LAYERS[layer as keyof typeof SYSTEM_LAYERS]?.name}
                    </span>
                    <span className="font-mono text-white">
                      {value.toFixed(3)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-1000"
                      style={{
                        width: `${value * 100}%`,
                        backgroundColor:
                          value > 0.7
                            ? "#ef4444"
                            : value > 0.4
                              ? "#f59e0b"
                              : "#10b981",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div
          className="rounded-lg p-6 border mb-8"
          style={{
            backgroundColor: "rgba(16, 44, 34, 0.7)",
            borderColor: "rgba(34, 68, 54, 0.8)",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white font-mono">
              PERMUTATION RESULTS
            </h3>
            <div className="flex gap-3">
              <button
                onClick={() => setShowTrace(!showTrace)}
                className="px-4 py-2 rounded border font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 flex items-center"
                style={{
                  backgroundColor: "rgba(16, 44, 34, 0.7)",
                  borderColor: "rgba(34, 68, 54, 0.8)",
                  color: "#34d399",
                  boxShadow: "inset 0 0 0 1px rgba(52, 211, 153, 0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(34, 68, 54, 0.9)";
                  e.currentTarget.style.boxShadow =
                    "0 0 15px rgba(52, 211, 153, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(16, 44, 34, 0.7)";
                  e.currentTarget.style.boxShadow =
                    "inset 0 0 0 1px rgba(52, 211, 153, 0.1)";
                }}
              >
                <Eye className="w-4 h-4 mr-2" />
                TRACE
                {showTrace ? (
                  <ChevronUp className="w-4 h-4 ml-2" />
                ) : (
                  <ChevronDown className="w-4 h-4 ml-2" />
                )}
              </button>
              <button
                onClick={() => setShowJSON(!showJSON)}
                className="px-4 py-2 rounded border font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 flex items-center"
                style={{
                  backgroundColor: "rgba(16, 44, 34, 0.7)",
                  borderColor: "rgba(34, 68, 54, 0.8)",
                  color: "#34d399",
                  boxShadow: "inset 0 0 0 1px rgba(52, 211, 153, 0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(34, 68, 54, 0.9)";
                  e.currentTarget.style.boxShadow =
                    "0 0 15px rgba(52, 211, 153, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(16, 44, 34, 0.7)";
                  e.currentTarget.style.boxShadow =
                    "inset 0 0 0 1px rgba(52, 211, 153, 0.1)";
                }}
              >
                <FileText className="w-4 h-4 mr-2" />
                JSON
              </button>
              <button
                onClick={downloadResults}
                className="px-4 py-2 rounded border font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 flex items-center"
                style={{
                  backgroundColor: "rgba(16, 44, 34, 0.7)",
                  borderColor: "rgba(34, 68, 54, 0.8)",
                  color: "#34d399",
                  boxShadow: "inset 0 0 0 1px rgba(52, 211, 153, 0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(34, 68, 54, 0.9)";
                  e.currentTarget.style.boxShadow =
                    "0 0 15px rgba(52, 211, 153, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(16, 44, 34, 0.7)";
                  e.currentTarget.style.boxShadow =
                    "inset 0 0 0 1px rgba(52, 211, 153, 0.1)";
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                DOWNLOAD
              </button>
            </div>
          </div>

          {/* Summary metrics */}
          {permutationResult && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white font-mono">
                  {permutationResult.final_state.compliance_illusion_depth.toFixed(
                    2,
                  )}
                </div>
                <div className="text-xs text-gray-400">ILLUSION DEPTH</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white font-mono">
                  {permutationResult.decoherence_score.toFixed(2)}
                </div>
                <div className="text-xs text-gray-400">DECOHERENCE</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white font-mono">
                  {permutationResult.final_state.dominant_typology}
                </div>
                <div className="text-xs text-gray-400">DOMINANT TYPE</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white font-mono">
                  {permutationResult.final_state.legal_validity
                    ? "VALID"
                    : "INVALID"}
                </div>
                <div className="text-xs text-gray-400">LEGAL STATUS</div>
              </div>
            </div>
          )}

          {/* Execution trace */}
          {showTrace && (
            <div className="border-t border-gray-600 pt-6">
              <h4 className="text-sm font-bold text-white font-mono mb-4">
                TEMPORAL EXECUTION TRACE (t₀ → t₅)
              </h4>
              <div className="space-y-3 max-h-64 overflow-y-auto vigilum-scrollbar">
                {executionTrace.map((step, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded border ${step.nullified ? "border-red-700 bg-red-900/20" : "border-gray-600 bg-gray-800/30"}`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-mono text-white">
                        t{step.t + 1}: {step.operator} - {step.operator_name}
                      </span>
                      {step.nullified && (
                        <span className="text-xs text-red-400 font-mono">
                          NULLIFIED
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 space-y-1">
                      {Object.entries(step.output_state).map(
                        ([layer, value]) => {
                          const inputValue = step.input_state[layer] || 0;
                          const delta =
                            (value as number) - (inputValue as number);
                          return (
                            <div key={layer} className="flex justify-between">
                              <span>{layer}:</span>
                              <span>
                                {(inputValue as number).toFixed(2)} →{" "}
                                {(value as number).toFixed(2)}
                                <span
                                  className={
                                    delta > 0
                                      ? "text-green-400"
                                      : delta < 0
                                        ? "text-red-400"
                                        : "text-gray-400"
                                  }
                                >
                                  {" "}
                                  ({delta > 0 ? "+" : ""}
                                  {delta.toFixed(2)})
                                </span>
                              </span>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* JSON output */}
          {showJSON && permutationResult && (
            <div className="border-t border-gray-600 pt-6">
              <h4 className="text-sm font-bold text-white font-mono mb-4">
                STRUCTURED OUTPUT
              </h4>
              <pre className="text-xs text-gray-300 font-mono bg-gray-900 p-4 rounded max-h-64 overflow-auto vigilum-scrollbar">
                {JSON.stringify(permutationResult, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Override Graph */}
        <div
          className="rounded-lg p-6 border"
          style={{
            backgroundColor: "rgba(16, 44, 34, 0.7)",
            borderColor: "rgba(34, 68, 54, 0.8)",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white font-mono">
              OVERRIDE RESOLUTION GRAPH
            </h3>
            <Network className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-3">
            {OVERRIDE_MATRIX.map((override, index) => {
              const fromOp = OPERATORS.find((op) => op.id === override.from)!;
              const toOp = OPERATORS.find((op) => op.id === override.to)!;
              const isActive =
                operatorSequence.indexOf(override.from) <
                operatorSequence.indexOf(override.to);

              return (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded border ${
                    isActive
                      ? "border-red-500 bg-red-900/20"
                      : "border-gray-600 bg-gray-800/20"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <span
                      className="text-sm font-mono font-bold px-2 py-1 rounded"
                      style={{
                        backgroundColor: `${fromOp.color}30`,
                        color: fromOp.color,
                      }}
                    >
                      {override.from}
                    </span>
                    <span className="text-gray-400">→</span>
                    <span
                      className="text-sm font-mono font-bold px-2 py-1 rounded"
                      style={{
                        backgroundColor: `${toOp.color}30`,
                        color: toOp.color,
                      }}
                    >
                      {override.to}
                    </span>
                  </div>
                  <div className="text-xs text-gray-300 max-w-md">
                    {override.effect}
                  </div>
                  {isActive && (
                    <div className="text-xs text-red-400 font-mono">ACTIVE</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SemanticPermutationEngine;
