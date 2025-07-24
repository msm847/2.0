import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Info,
  X,
  Maximize2,
} from "lucide-react";

// Mathematical Operator Weights (configurable for v2)
const OPERATOR_WEIGHTS = {
  A: 0.7,
  R: 0.1,
  V: 0.0,
  ε: 1.0,
  O: 0.0,
};

// System State Layers
const SYSTEM_LAYERS = {
  L: { name: "Legal constraints and clause logic", symbol: "L" },
  P: { name: "Procedural structures and escalation paths", symbol: "P" },
  A: { name: "Actor configuration and legal identity", symbol: "A" },
  R: { name: "Reflex maps (allowed institutional behaviors)", symbol: "R" },
  V: { name: "Visibility logic (who perceives what)", symbol: "V" },
  ε: { name: "Environmental distortion and temporal compression", symbol: "ε" },
};

// Five Atomic Semantic Operators with Mathematical Definitions
const OPERATORS = [
  {
    id: "O",
    name: "Override",
    fullName: "Override Functions and Nullification Logic",
    weight: 0.34,
    symbol: "O",
    glyph: "⊗",
    affects: ["L", "P", "V"],
    position_sensitive: true,
    override_targets: ["A", "R"],
    color: "#10B981", // Vigilum mint
    description:
      "Override operators forcibly reset or override prior safeguards. Risk spikes when used late in a chain or immediately after ambiguous operators. Maximum risk if O follows Masking (M), Masking → Override (M→O): simulated transparency, hidden extraction. Minimum risk if O opens a sequence and is followed by White/Hard (O→A): visible reset, no stealth.",
    calculation: {
      formula:
        "ϕ(O) = 0.34·H + 0.05·S + 0.17·B + 0.04·W + γ(Seq,𝓔)",
      weights: { w1: 0.34, w2: 0.05, w3: 0.17, w4: 0.04 },
      variables: {
        H: "Hard operator intensity coefficient",
        S: "Soft operator configuration depth",
        B: "Black operator masking strength",
        W: "White operator transparency level",
        gamma: "If O follows Masking or Soft actor split, γ = +0.11; if O follows Audit or Disclosure, γ = –0.07"
      },
    },
    impact:
      "Explicit clause or mechanism nullifying existing constraint or escalation.",
  },
  {
    id: "L",
    name: "Liability Shift",
    fullName: "Liability Transfer and Responsibility Displacement",
    weight: 0.24,
    symbol: "L",
    glyph: "⧨",
    affects: ["R", "P", "V"],
    position_sensitive: true,
    override_targets: ["ε"],
    color: "#EF4444", // Vigilum red
    description:
      "Risk emerges when surface accountability is separated from actual execution logic. L placed before or after an Audit reduces risk; L embedded between Masking or Proxy actors increases exposure.",
    calculation: {
      formula:
        "R = w₁ �� pattern_strength + w₂ × automation_depth + w₃ × override_resistance",
      weights: { w1: 0.4, w2: 0.3, w3: 0.3 },
      variables: {
        pattern_strength: "Degree of institutionalized response patterns",
        automation_depth: "Level of automated compliance mechanisms",
        override_resistance: "Structural resistance to external modification",
      },
    },
    impact:
      "Increasing 'R' constrains variability and enforces systematic behavioral patterns.",
  },
  {
    id: "P",
    name: "Proxy Actor",
    fullName: "Proxy Actor Intermediation",
    weight: 0.13,
    symbol: "P",
    glyph: "⧬",
    affects: ["A", "R", "L"],
    position_sensitive: true,
    override_targets: ["V"],
    color: "#8B5CF6", // Vigilum purple
    description:
      "Proxy logic is low to moderate risk on its own, but forms hazardous channels when combined with liability shifts or soft operators. Proxy → Masking → Liability Shift = classic laundering pattern.",
    calculation: {
      formula:
        "ϕ(P) = 0.13·H + 0.16·S + 0.20·B + 0.07·W + γ(Seq,𝓔)",
      weights: { w1: 0.13, w2: 0.16, w3: 0.20, w4: 0.07 },
      variables: {
        H: "Hard operator intensity coefficient",
        S: "Soft operator configuration depth",
        B: "Black operator masking strength",
        W: "White operator transparency level",
        gamma: "If Proxy is sandwiched by Soft/Black operators, γ = +0.14; if Proxy precedes Audit, γ = –0.04"
      },
    },
    impact:
      "Inserts an intermediary or delegated actor to perform/absorb institutional functions.",
  },
  {
    id: "A",
    name: "Audit/Disclosure",
    fullName: "Audit and Disclosure Mechanisms",
    weight: 0.09,
    symbol: "A",
    glyph: "⚬",
    affects: ["ε", "P", "A"],
    position_sensitive: true,
    override_targets: ["R"],
    color: "#8B5CF6", // Vigilum purple
    description:
      "This operator quantifies environmental pressure effects and temporal distortions that compress decision timeframes and alter system responses under stress conditions.",
    calculation: {
      formula:
        "ε = w₁ × pressure_coefficient + w��� × temporal_compression + w₃ × distortion_amplitude",
      weights: { w1: 0.4, w2: 0.3, w3: 0.3 },
      variables: {
        pressure_coefficient: "Environmental pressure intensity on system",
        temporal_compression: "Degree of accelerated decision requirements",
        distortion_amplitude: "Magnitude of environmental signal distortion",
      },
    },
    impact:
      "Elevating 'ε' introduces systematic instabilities and compressed response windows.",
  },
  {
    id: "R",
    name: "Reflex",
    fullName: "Reflex and Automatic Response",
    weight: 0.22,
    symbol: "R",
    glyph: "���",
    affects: ["L", "P", "V"],
    position_sensitive: true,
    override_targets: ["A", "R"],
    color: "#EF4444", // Vigilum red
    description:
      "Reflex risk is contextual: reduces actor discretion, but can be weaponized if environment operator (𝓔) is high entropy/disordered.",
    calculation: {
      formula:
        "O = w₁ × bypass_strength + w₂ × nullification_depth + w₃ × constraint_override",
      weights: { w1: 0.4, w2: 0.3, w3: 0.3 },
      variables: {
        bypass_strength: "Capacity to circumvent standard procedures",
        nullification_depth: "Degree of constraint neutralization capability",
        constraint_override: "Direct override authority level",
      },
    },
    impact:
      "Increasing 'O' enables systematic constraint bypass and procedural nullification.",
  },
];

// Five Additional Semantic Operators - V2
const OPERATORS_V2 = [
  {
    id: "V",
    name: "Visibility Constraint",
    fullName: "Visibility Constraint and Traceability Binding",
    weight: 0.10,
    symbol: "V",
    glyph: "⟐",
    affects: ["V", "L", "ε"],
    position_sensitive: true,
    override_targets: ["A"],
    color: "#06B6D4", // Cyan
    description:
      "Highly stabilizing—risk sinks as W increases, but if sandwiched by Black/Soft operators, V becomes 'ritual visibility' (simulated audit).",
    calculation: {
      formula:
        "ϕ(V) = 0.10·H + 0.02·S + 0.02·B + 0.30·W + γ(Seq,𝓔)",
      weights: { w1: 0.10, w2: 0.02, w3: 0.02, w4: 0.30 },
      variables: {
        H: "Hard operator intensity coefficient",
        S: "Soft operator configuration depth",
        B: "Black operator masking strength",
        W: "White operator transparency level",
        gamma: "If V is last or paired with Masking, γ = –0.08"
      },
    },
    impact:
      "Binds discretionary acts to traceability/observation.",
  },
  {
    id: "M",
    name: "Masking",
    fullName: "Masking and Semantic Opacity",
    weight: 0.05,
    symbol: "M",
    glyph: "⧨",
    affects: ["L", "A", "P"],
    position_sensitive: true,
    override_targets: ["R"],
    color: "#F97316", // Orange
    description:
      "High-risk, especially if adjacent to Proxy, Liability Shift, or used late. Masking → Override: most hazardous pattern.",
    calculation: {
      formula:
        "ϕ(M) = 0.05·H + 0.25·S + 0.33·B + 0.02·W + γ(Seq,𝓔)",
      weights: { w1: 0.05, w2: 0.25, w3: 0.33, w4: 0.02 },
      variables: {
        H: "Hard operator intensity coefficient",
        S: "Soft operator configuration depth",
        B: "Black operator masking strength",
        W: "White operator transparency level",
        gamma: "If Masking is paired or sequenced with Soft/Black, γ = +0.13; if immediately followed by Audit, γ = –0.07"
      },
    },
    impact:
      "Creates ambiguity, semantic opacity, or off-ledger status (deliberate or emergent).",
  },
  {
    id: "ε",
    name: "Environmental Operator",
    fullName: "Environmental Operator and External Disruption",
    weight: 0.25,
    symbol: "ε",
    glyph: "⟡",
    affects: ["ε", "P", "A"],
    position_sensitive: true,
    override_targets: ["R"],
    color: "#EC4899", // Pink
    description:
      "Not an actor; amplifies or absorbs risk for all operators within its effective window. Example: Procurement under 'state of emergency' has ε = 0.41; all Soft/Black operators compound.",
    calculation: {
      formula:
        "ϕ(ε) = ε_env (scalable, typically 0.10–0.45 based on real scenario, can be 0.0 for neutral)",
      weights: { w1: 1.0 },
      variables: {
        ε_env: "Environmental disruption coefficient",
        gamma: "Multiplies risk of adjacent Black/Soft by 1.25–1.45 if high disruption; divides by 0.7 if stabilizing"
      },
    },
    impact:
      "External, exogenous, or ambient environmental shift (legal crisis, emergency, war, etc).",
  },
  {
    id: "S",
    name: "Soft Actor Split",
    fullName: "Soft Actor Split and Ambiguous Configuration",
    weight: 0.08,
    symbol: "S",
    glyph: "⧬",
    affects: ["A", "R", "P"],
    position_sensitive: true,
    override_targets: ["O"],
    color: "#84CC16", // Lime
    description:
      "This operator maps the relational networks and dependency structures between system actors. Values determine the density and influence of relationship networks.",
    calculation: {
      formula:
        "N = w₁ × network_density + w₂ × influence_centrality + w�� × dependency_depth",
      weights: { w1: 0.3, w2: 0.4, w3: 0.3 },
      variables: {
        network_density: "Concentration of actor relationships",
        influence_centrality: "Degree of centralized influence distribution",
        dependency_depth: "Structural dependency complexity",
      },
    },
    impact:
      "Increasing 'N' amplifies network effects and relationship-based influence mechanisms.",
  },
  {
    id: "PM",
    name: "Perception Management",
    fullName: "Perception Management and Narrative Control",
    weight: 0.05,
    symbol: "PM",
    glyph: "⧪",
    affects: ["R", "L", "V"],
    position_sensitive: true,
    override_targets: ["T"],
    color: "#A855F7", // Violet
    description:
      "Often the closing move in risk chains—dangerous if last, less so if opening and subject to Audit/Visibility.",
    calculation: {
      formula:
        "ϕ(PM) = 0.05·H + 0.28·S + 0.29·B + 0.01·W + γ(Seq,𝓔)",
      weights: { w1: 0.05, w2: 0.28, w3: 0.29, w4: 0.01 },
      variables: {
        H: "Hard operator intensity coefficient",
        S: "Soft operator configuration depth",
        B: "Black operator masking strength",
        W: "White operator transparency level",
        gamma: "If PM is last in chain, γ = +0.10 (risk masked); if first, γ = –0.05"
      },
    },
    impact:
      "Operators targeting narrative, optics, or 'surface' compliance (media, PR, simulated transparency).",
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

// Override resolution matrix with enhanced logic
const OVERRIDE_MATRIX = [
  {
    from: "O",
    to: "A",
    effect:
      "Nullifies actor discretionary space through direct constraint override",
    type: "NULLIFICATION",
    strength: 0.9,
  },
  {
    from: "O",
    to: "R",
    effect: "Bypasses institutional reflex patterns via systematic override",
    type: "BYPASS",
    strength: 0.8,
  },
  {
    from: "A",
    to: "V",
    effect: "Actor configuration masks visibility through liability transfer",
    type: "MASKING",
    strength: 0.7,
  },
  {
    from: "R",
    to: "ε",
    effect: "Reflex patterns compress environmental response timeframes",
    type: "COMPRESSION",
    strength: 0.6,
  },
  {
    from: "V",
    to: "A",
    effect: "Visibility logic constrains actor discretionary boundaries",
    type: "CONSTRAINT",
    strength: 0.5,
  },
  {
    from: "ε",
    to: "R",
    effect:
      "Environmental distortion destabilizes institutional reflex structures",
    type: "DESTABILIZATION",
    strength: 0.7,
  },
];

const SemanticPermutationEngine = () => {
  const [operatorVersion, setOperatorVersion] = useState<"v1" | "v2">("v1");
  const [operatorSequence, setOperatorSequence] = useState([
    "O",
    "L",
    "P",
    "A",
    "R",
  ]);
  const [operatorSequenceV2, setOperatorSequenceV2] = useState([
    "V",
    "M",
    "ε",
    "S",
    "PM",
  ]);
  const [draggedOperator, setDraggedOperator] = useState<string | null>(null);
  const [executionTrace, setExecutionTrace] = useState<any[]>([]);
  const [finalState, setFinalState] = useState(INITIAL_STATE);
  const [matrixData, setMatrixData] = useState<any[][]>([]);
  const [showTrace, setShowTrace] = useState(false);
  const [showJSON, setShowJSON] = useState(false);
  const [showFullCalculation, setShowFullCalculation] = useState(false);
  const [permutationResult, setPermutationResult] = useState<any>(null);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [calculationBreakdowns, setCalculationBreakdowns] = useState<any>({});

  // Get current operators based on version
  const getCurrentOperators = () => {
    return operatorVersion === "v1" ? OPERATORS : OPERATORS_V2;
  };

  const getCurrentSequence = () => {
    return operatorVersion === "v1" ? operatorSequence : operatorSequenceV2;
  };

  const setCurrentSequence = (sequence: string[]) => {
    if (operatorVersion === "v1") {
      setOperatorSequence(sequence);
    } else {
      setOperatorSequenceV2(sequence);
    }
  };

  // Toggle card flip
  const toggleCard = (operatorId: string) => {
    const newFlipped = new Set(flippedCards);
    if (newFlipped.has(operatorId)) {
      newFlipped.delete(operatorId);
    } else {
      newFlipped.add(operatorId);
    }
    setFlippedCards(newFlipped);
  };

  // Calculate mathematical operator values
  const calculateOperatorValue = useCallback(
    (operator: any, environmentGradient: number = 0.1) => {
      const { calculation } = operator;
      let total = 0;
      let breakdown = [];

      // Simulate variable values based on operator weight and environmental factors
      Object.entries(calculation.weights).forEach(([key, weight]) => {
        const variableName = key.replace("w", "");
        const variableKey = Object.keys(calculation.variables)[
          parseInt(variableName) - 1
        ];
        // Simulate realistic variable values influenced by environmental gradient
        const baseValue = 0.5 + Math.sin(operator.weight * Math.PI) * 0.3;
        const environmentalInfluence =
          environmentGradient * (Math.random() * 0.4 - 0.2);
        const variableValue = Math.max(
          0,
          Math.min(1, baseValue + environmentalInfluence),
        );

        const contribution = (weight as number) * variableValue;
        total += contribution;

        breakdown.push({
          weight: weight,
          variable: variableKey,
          value: variableValue,
          contribution: contribution,
        });
      });

      return { value: total, breakdown };
    },
    [],
  );

  // Enhanced formula calculation
  const calculatePermutationFormula = useCallback(
    (sequence: string[]) => {
      const environmentGradient = 0.15; // ∇𝓔 base value
      let phi = 0;
      let formulaTerms: string[] = [];
      let calculationDetails: any = {};

      sequence.forEach((opId) => {
        const operator = getCurrentOperators().find((op) => op.id === opId);
        if (!operator) return;

        const { value, breakdown } = calculateOperatorValue(
          operator,
          environmentGradient,
        );

        phi += operator.weight * value;
        formulaTerms.push(`${operator.weight.toFixed(1)}${opId}`);
        calculationDetails[opId] = {
          value,
          breakdown,
          weight: operator.weight,
        };
      });

      phi += environmentGradient;
      formulaTerms.push(`∇𝓔`);

      return {
        phi,
        formula: `ϕ(c,𝓔) = ${formulaTerms.join(" + ")} = ${phi.toFixed(3)}`,
        details: calculationDetails,
        environmentGradient,
      };
    },
    [calculateOperatorValue, operatorVersion],
  );

  // Calculate tensor effects based on operator sequence
  const calculateTensorEffects = useCallback((sequence: string[]) => {
    let currentState = { ...INITIAL_STATE };
    const trace: any[] = [];

    sequence.forEach((opId, index) => {
      const operator = getCurrentOperators().find((op) => op.id === opId);
      if (!operator) return;

      const inputState = { ...currentState };

      // Apply positional modifiers
      const positionMultiplier = index === 0 ? 1.3 : 1.0;

      // Check for overrides
      const activeOverrides = checkActiveOverrides(opId, sequence, index);
      const isNullified = activeOverrides.length > 0;

      if (!isNullified) {
        // Apply effects based on operator's mathematical properties
        operator.affects.forEach((layer) => {
          const currentValue =
            currentState[layer as keyof typeof currentState] || 0;
          const operatorInfluence = operator.weight * positionMultiplier * 0.3;

          // Apply operator-specific transformations
          switch (operator.id) {
            case "A":
              currentState[layer as keyof typeof currentState] = Math.min(
                1,
                currentValue + operatorInfluence,
              );
              break;
            case "R":
              currentState[layer as keyof typeof currentState] = Math.max(
                0,
                currentValue - operatorInfluence * 0.5,
              );
              break;
            case "V":
              currentState[layer as keyof typeof currentState] = Math.abs(
                currentValue - operatorInfluence * 0.7,
              );
              break;
            case "ε":
              currentState[layer as keyof typeof currentState] = Math.min(
                1,
                currentValue + operatorInfluence * 1.2,
              );
              break;
            case "O":
              currentState[layer as keyof typeof currentState] = Math.max(
                0,
                currentValue - operatorInfluence * 0.8,
              );
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
        active_overrides: activeOverrides,
      });
    });

    return { finalState: currentState, trace };
  }, [operatorVersion]);

  // Check active overrides for operator
  const checkActiveOverrides = (
    opId: string,
    sequence: string[],
    currentIndex: number,
  ) => {
    const earlierOps = sequence.slice(0, currentIndex);
    return OVERRIDE_MATRIX.filter(
      (override) => override.to === opId && earlierOps.includes(override.from),
    );
  };

  // Generate matrix visualization data
  const generateMatrixData = useCallback(
    (trace: any[]) => {
      return getCurrentSequence().map((opId, rowIndex) => {
        const operator = getCurrentOperators().find((op) => op.id === opId);
        if (!operator) return [];

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
    [operatorSequence, operatorSequenceV2, operatorVersion],
  );

  // Generate final permutation result
  const generatePermutationResult = useCallback(
    (sequence: string[], finalState: any, trace: any[]) => {
      const formulaResult = calculatePermutationFormula(sequence);

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
        mathematical_result: formulaResult,
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
    [calculatePermutationFormula, operatorVersion],
  );

  // Execute permutation calculation
  useEffect(() => {
    const currentSeq = getCurrentSequence();
    const { finalState: newFinalState, trace } =
      calculateTensorEffects(currentSeq);
    setFinalState(newFinalState);
    setExecutionTrace(trace);
    setMatrixData(generateMatrixData(trace));

    const result = generatePermutationResult(
      currentSeq,
      newFinalState,
      trace,
    );
    setPermutationResult(result);
    setCalculationBreakdowns(result.mathematical_result.details);
  }, [
    operatorSequence,
    operatorSequenceV2,
    operatorVersion,
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

    const newSequence = [...getCurrentSequence()];
    const draggedIndex = newSequence.indexOf(draggedOperator);

    newSequence.splice(draggedIndex, 1);
    newSequence.splice(targetIndex, 0, draggedOperator);

    setCurrentSequence(newSequence);
    setDraggedOperator(null);
  };

  const shuffleOperators = () => {
    const currentSeq = getCurrentSequence();
    const shuffled = [...currentSeq];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setCurrentSequence(shuffled);
  };

  const resetToDefault = () => {
    if (operatorVersion === "v1") {
      setOperatorSequence(["O", "L", "P", "A", "R"]);
    } else {
      setOperatorSequenceV2(["V", "M", "ε", "S", "PM"]);
    }
    setFlippedCards(new Set());
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
    <div
      className="py-20 px-4"
      style={{
        background: "linear-gradient(90deg, #213829 0%, #23272b 100%)",
        backgroundColor: "#213829",
      }}
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 mt-8">
          <motion.h2
            className="mb-8 font-semibold leading-tight"
            style={{
              fontFamily: "IBM Plex Sans, sans-serif",
              fontSize: "clamp(2.4rem, 3.4vw, 3rem)",
              color: "#E5F3ED",
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Semantic Permutation Engine
          </motion.h2>
          <p className="text-xl text-gray-400 font-mono max-w-4xl mx-auto leading-relaxed">
            Mathematical operators governing structural logic permutation
            through non-commutative semantic transformation. Each operator
            applies deterministic effects calculated via explicit mathematical
            formulation.
          </p>
        </div>

        {/* Interactive Operator Cards */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="flex gap-2">
                <button
                  onClick={() => setOperatorVersion("v1")}
                  className={`px-4 py-2 rounded border font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 ${
                    operatorVersion === "v1"
                      ? "border-green-400 bg-green-400/20 text-green-400"
                      : "border-gray-600 bg-gray-800/50 text-gray-400"
                  }`}
                >
                  OPERATOR SEQUENCE V1
                </button>
                <button
                  onClick={() => setOperatorVersion("v2")}
                  className={`px-4 py-2 rounded border font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 ${
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
              const operator = getCurrentOperators().find((op) => op.id === opId)!;
              const isFlipped = flippedCards.has(opId);
              const calculationData = calculationBreakdowns[opId];
              const isNullified =
                checkActiveOverrides(opId, getCurrentSequence(), index).length > 0;

              return (
                <div
                  key={`${opId}-${index}`}
                  className="relative h-64 cursor-pointer"
                  style={{ perspective: "1000px" }}
                  onClick={() => toggleCard(opId)}
                  draggable
                  onDragStart={(e) => handleDragStart(e, opId)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  <motion.div
                    className="relative w-full h-full transition-transform duration-600"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isFlipped
                        ? "rotateY(180deg)"
                        : "rotateY(0deg)",
                    }}
                  >
                    {/* Front Face */}
                    <div
                      className={`absolute w-full h-full rounded-lg border-2 p-4 flex flex-col justify-center items-center ${
                        isNullified ? "opacity-50" : ""
                      }`}
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

                      {/* Nullified indicator */}
                      {isNullified && (
                        <div className="absolute top-2 right-2 text-red-400 text-xs font-mono">
                          NULL
                        </div>
                      )}

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

                      {/* Weight Value */}
                      <div
                        className="text-2xl font-mono font-bold"
                        style={{ color: operator.color }}
                      >
                        {operator.weight.toFixed(3)}
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

                        {/* Operator Full Name */}
                        <div
                          className="text-sm font-bold font-mono mb-2 flex-shrink-0"
                          style={{ color: operator.color }}
                        >
                          {operator.symbol} — {operator.fullName}
                        </div>

                        {/* Description */}
                        <p className="text-xs text-gray-300 font-mono leading-relaxed mb-3">
                          {operator.description}
                        </p>

                        {/* Mathematical Representation */}
                        <div className="mb-3">
                          <div className="text-xs text-gray-400 font-mono mb-1">
                            Mathematical Representation:
                          </div>
                          <div className="text-xs text-white font-mono bg-gray-800 p-2 rounded">
                            {operator.calculation.formula}
                          </div>
                        </div>

                        {/* Impact Statement */}
                        <div className="text-xs text-gray-300 font-mono">
                          <span className="text-gray-400">Impact:</span>{" "}
                          {operator.impact}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Live Formula */}
          <div className="text-center">
            <div className="text-sm font-mono text-gray-400 mb-2">
              LIVE MATHEMATICAL FORMULA
            </div>
            {permutationResult && (
              <div className="text-lg font-mono text-white">
                ϕ(c,𝓔) ={" "}
                {getCurrentSequence().map((op, i) => (
                  <span key={i}>
                    {i > 0 && " + "}
                    <span
                      style={{
                        color: getCurrentOperators().find((o) => o.id === op)?.color,
                      }}
                    >
                      {getCurrentOperators().find((o) => o.id === op)?.weight?.toFixed(1) || "0.0"}
                      {op}
                    </span>
                  </span>
                ))}{" "}
                + ∇𝓔 ={" "}
                <span className="text-green-400">
                  {permutationResult.mathematical_result.phi.toFixed(3)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Analysis Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Matrix Visualizer */}
          <div
            className="rounded-lg p-6 border h-full flex flex-col"
            style={{
              backgroundColor: "rgba(16, 44, 34, 0.7)",
              borderColor: "rgba(34, 68, 54, 0.8)",
            }}
          >
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <h3 className="text-lg font-bold text-white font-mono">
                EXECUTION MATRIX
              </h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>

            <div className="flex flex-col flex-1 min-h-0">
              {/* Layer headers */}
              <div className="grid grid-cols-7 gap-2 text-xs font-mono text-gray-400 mb-3 flex-shrink-0">
                <div className="h-10 flex items-center justify-center"></div>
                {Object.keys(SYSTEM_LAYERS).map((layer) => (
                  <div
                    key={layer}
                    className="h-10 text-center px-1 rounded flex items-center justify-center border transition-all duration-200 hover:scale-105"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    {layer}
                  </div>
                ))}
              </div>

              {/* Matrix rows - flex to fill remaining space */}
              <div className="flex-1 flex flex-col justify-between gap-2">
                {matrixData.map((row, rowIndex) => (
                  <div key={rowIndex} className="grid grid-cols-7 gap-2 flex-1">
                    <div
                      className="text-xs font-mono text-gray-300 flex items-center justify-center px-1 rounded border transition-all duration-200 hover:scale-105"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        minHeight: "3rem",
                      }}
                    >
                      {getCurrentSequence()[rowIndex]}
                    </div>
                    {row.map((cell, colIndex) => (
                      <div
                        key={colIndex}
                        className="rounded-md flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 hover:scale-105 border"
                        style={{
                          backgroundColor: cell.nullified
                            ? "rgba(55, 65, 81, 0.8)"
                            : cell.type === "positive"
                              ? `rgba(16, 185, 129, ${Math.max(0.2, cell.strength)})`
                              : cell.type === "destructive"
                                ? `rgba(239, 68, 68, ${Math.max(0.2, cell.strength)})`
                                : "rgba(107, 114, 128, 0.4)",
                          color: cell.strength > 0.4 ? "white" : "#f3f4f6",
                          borderColor: cell.nullified
                            ? "rgba(107, 114, 128, 0.3)"
                            : cell.type === "positive"
                              ? "rgba(16, 185, 129, 0.5)"
                              : cell.type === "destructive"
                                ? "rgba(239, 68, 68, 0.5)"
                                : "rgba(107, 114, 128, 0.3)",
                          boxShadow:
                            cell.strength > 0.7
                              ? "0 0 8px rgba(16, 185, 129, 0.3)"
                              : "none",
                          minHeight: "3rem",
                        }}
                      >
                        {cell.nullified ? "×" : cell.delta.toFixed(1)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Override Resolution Path */}
          <div
            className="rounded-lg p-6 border"
            style={{
              backgroundColor: "rgba(16, 44, 34, 0.7)",
              borderColor: "rgba(34, 68, 54, 0.8)",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div
                  className="w-1 h-6 rounded"
                  style={{ backgroundColor: "#10b981" }}
                />
                <h3 className="text-lg font-bold text-white font-mono">
                  OVERRIDE RESOLUTION PATH
                </h3>
              </div>
              <Network className="w-5 h-5 text-gray-400" />
            </div>

            {/* Status Summary */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {["ACTIVE", "NULLIFIED", "BYPASS", "CONSTRAINT"].map((status) => {
                const count = OVERRIDE_MATRIX.filter((override) => {
                  const isActive =
                    operatorSequence.indexOf(override.from) <
                    operatorSequence.indexOf(override.to);
                  return status === "ACTIVE"
                    ? isActive
                    : status === "NULLIFIED"
                      ? !isActive
                      : status === override.type;
                }).length;

                return (
                  <div
                    key={status}
                    className="text-center p-2 rounded border transition-all duration-200 hover:scale-105"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <div
                      className="text-lg font-bold font-mono"
                      style={{
                        color:
                          status === "ACTIVE"
                            ? "#ef4444"
                            : status === "NULLIFIED"
                              ? "#6b7280"
                              : "#10b981",
                      }}
                    >
                      {count}
                    </div>
                    <div className="text-xs text-gray-400 font-mono">
                      {status}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Override Graph Visualization - Compact */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {OVERRIDE_MATRIX.filter(override =>
                getCurrentSequence().includes(override.from) && getCurrentSequence().includes(override.to)
              ).map((override, index) => {
                const fromOp = getCurrentOperators().find((op) => op.id === override.from);
                const toOp = getCurrentOperators().find((op) => op.id === override.to);
                if (!fromOp || !toOp) return null;
                const fromIndex = getCurrentSequence().indexOf(override.from);
                const toIndex = getCurrentSequence().indexOf(override.to);
                const isActive =
                  fromIndex < toIndex && fromIndex !== -1 && toIndex !== -1;

                return (
                  <motion.div
                    key={index}
                    className={`p-3 rounded border transition-all duration-300 ${
                      isActive
                        ? "border-red-500 bg-red-900/20"
                        : "border-gray-600 bg-gray-800/20"
                    }`}
                    animate={{
                      boxShadow: isActive
                        ? `0 0 15px rgba(239, 68, 68, 0.2)`
                        : "none",
                    }}
                  >
                    {/* Node Connection */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div
                          className="text-xs font-mono font-bold px-2 py-1 rounded"
                          style={{
                            backgroundColor: `${fromOp.color}30`,
                            color: fromOp.color,
                          }}
                        >
                          {override.from}
                        </div>
                        <div className="text-xs text-gray-400">→</div>
                        <div
                          className="text-xs font-mono font-bold px-2 py-1 rounded"
                          style={{
                            backgroundColor: `${toOp.color}30`,
                            color: toOp.color,
                          }}
                        >
                          {override.to}
                        </div>
                      </div>

                      {/* Status Indicator */}
                      {isActive && (
                        <motion.div
                          className="w-2 h-2 rounded-full bg-red-400"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </div>

                    {/* Override Description */}
                    <div className="text-xs text-gray-300 font-mono leading-relaxed">
                      {override.effect}
                    </div>

                    {/* Type Badge */}
                    <div className="flex justify-between items-center mt-2">
                      <div
                        className="text-xs font-mono px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: isActive
                            ? "rgba(239, 68, 68, 0.2)"
                            : "rgba(107, 114, 128, 0.2)",
                          color: isActive ? "#fca5a5" : "#9ca3af",
                        }}
                      >
                        {override.type}
                      </div>

                      {isActive && (
                        <div className="text-xs text-red-400 font-mono font-bold">
                          ACTIVE
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Permutation Results */}
        {permutationResult && (
          <div className="mb-12">
            <div
              className="rounded-lg p-4 border"
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

              {/* Compact Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                <div
                  className="text-center p-3 rounded-lg border transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div className="text-sm font-bold text-white font-mono">
                    {permutationResult.mathematical_result.phi.toFixed(3)}
                  </div>
                  <div className="text-xs text-gray-400">ϕ RESULT</div>
                </div>
                <div
                  className="text-center p-3 rounded-lg border transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div className="text-sm font-bold text-white font-mono">
                    {permutationResult.decoherence_score.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-400">DECOHERENCE</div>
                </div>
                <div
                  className="text-center p-3 rounded-lg border transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div className="text-sm font-bold text-white font-mono">
                    {permutationResult.final_state.compliance_illusion_depth.toFixed(
                      3,
                    )}
                  </div>
                  <div className="text-xs text-gray-400">ILLUSION DEPTH</div>
                </div>
                <div
                  className="text-center p-3 rounded-lg border transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div className="text-sm font-bold text-white font-mono">
                    {permutationResult.final_state.dominant_typology}
                  </div>
                  <div className="text-xs text-gray-400">TYPOLOGY</div>
                </div>
                <div
                  className="text-center p-3 rounded-lg border transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div
                    className={`text-sm font-bold font-mono ${permutationResult.final_state.legal_validity ? "text-green-400" : "text-red-400"}`}
                  >
                    {permutationResult.final_state.legal_validity
                      ? "VALID"
                      : "INVALID"}
                  </div>
                  <div className="text-xs text-gray-400">LEGAL STATUS</div>
                </div>
              </div>

              {/* Compact Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowTrace(!showTrace)}
                  className="w-full p-3 rounded-xl font-mono text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                  style={{
                    backgroundColor: showTrace
                      ? "rgba(52, 211, 153, 0.15)"
                      : "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(20px)",
                    border: `1px solid ${showTrace ? "rgba(52, 211, 153, 0.3)" : "rgba(255, 255, 255, 0.1)"}`,
                    color: showTrace ? "#10b981" : "#ffffff",
                  }}
                  onMouseEnter={(e) => {
                    if (!showTrace) {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255, 255, 255, 0.08)";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!showTrace) {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.transform = "translateY(0px)";
                    }
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
                      backdropFilter: "blur(20px)",
                      border: `1px solid ${showJSON ? "rgba(52, 211, 153, 0.3)" : "rgba(255, 255, 255, 0.1)"}`,
                      color: showJSON ? "#10b981" : "#ffffff",
                    }}
                    onMouseEnter={(e) => {
                      if (!showJSON) {
                        e.currentTarget.style.backgroundColor =
                          "rgba(255, 255, 255, 0.08)";
                        e.currentTarget.style.transform = "translateY(-1px)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!showJSON) {
                        e.currentTarget.style.backgroundColor =
                          "rgba(255, 255, 255, 0.05)";
                        e.currentTarget.style.transform = "translateY(0px)";
                      }
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
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      color: "#ffffff",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(52, 211, 153, 0.1)";
                      e.currentTarget.style.borderColor =
                        "rgba(52, 211, 153, 0.3)";
                      e.currentTarget.style.color = "#10b981";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.borderColor =
                        "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.transform = "translateY(0px)";
                    }}
                  >
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Expandable Content */}
        {(showTrace || showJSON) && (
          <div
            className="rounded-lg p-6 border"
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
                    TEMPORAL EXECUTION TRACE (t��� → t₅)
                  </h4>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {executionTrace.map((step, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded border ${
                          step.nullified
                            ? "border-red-700 bg-red-900/20"
                            : "border-gray-600 bg-gray-800/30"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-mono text-white">
                            t{step.t + 1}: {step.operator} -{" "}
                            {step.operator_name}
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
                                <div
                                  key={layer}
                                  className="flex justify-between"
                                >
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
                    {JSON.stringify(permutationResult, null, 2)}
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

export default SemanticPermutationEngine;
