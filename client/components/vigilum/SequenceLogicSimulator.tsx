import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

interface ClauseData {
  id: string;
  name: string;
  ϕ_base: { [key: string]: number };
  visual: string;
  sound: string;
  description: string;
}

interface EnvironmentModifier {
  id: string;
  label: string;
  effects: {
    RT_boost?: number;
    CI_boost?: number;
    SB_reduction?: number;
    SB_boost?: number;
    overrideActivation?: string[];
    inversion?: boolean;
    timingTriggers?: boolean;
    visualInjection: string;
  };
  textOverlay: string;
}

interface RealityPanel {
  id: string;
  title: string;
  sequence: string[];
  ϕ: { [key: string]: number };
  actors: {
    STT: string;
    Journalist: string;
    CivicActor: string;
  };
  visuals: {
    fog_overlay: boolean;
    blur_lines: boolean;
    glitch_effect: boolean;
  };
  outcome: string;
}

const liveClauseChips: ClauseData[] = [
  {
    id: "C3.2",
    name: "Emergency Procurement",
    ϕ_base: { DG: 0.88, CI: 0.64 },
    visual: "GlitchRed + PulseGlowEdge",
    sound: "mid-bass rupture",
    description:
      "Legally permits immediate bypass of procurement logic if urgency is declared.",
  },
  {
    id: "C5.1",
    name: "Scope-Based Extension",
    ϕ_base: { CI: 0.79, SB: 0.4 },
    visual: "GhostViolet + DelayBlur",
    sound: "soft null click",
    description:
      "Allows extending a contract without retendering if deemed 'within scope.'",
  },
  {
    id: "C2.7",
    name: "Notification Delay",
    ϕ_base: { SB: 0.78, CI: 0.21 },
    visual: "ObscuraFog + FadeOpacity",
    sound: "perceptual hiss",
    description:
      "Legally suspends publication deadlines in special review periods.",
  },
];

const environmentModulators: EnvironmentModifier[] = [
  {
    id: "env_election_year",
    label: "Election Year Modifier",
    effects: {
      RT_boost: 0.24,
      CI_boost: 0.18,
      overrideActivation: ["C3.2 → C5.1"],
      visualInjection: "ScreenTint → AmberCollapse",
    },
    textOverlay: "Public urgency reframes normal constraints.",
  },
  {
    id: "env_foreign_loan",
    label: "Foreign Sovereign Funding",
    effects: {
      SB_reduction: 0.3,
      inversion: true,
      visualInjection: "ReverseGradient + InstitutionalShiftMap",
    },
    textOverlay:
      "Conditionality simulates legality. Overrides become invisible.",
  },
  {
    id: "env_timeline_compression",
    label: "Crisis-Driven Deadline Override",
    effects: {
      CI_boost: 0.4,
      SB_boost: 0.15,
      timingTriggers: true,
      visualInjection: "ShimmerGlass + EscalationHeatMap",
    },
    textOverlay:
      "Delay nullifies accountability. The clause is triggered before perception can form.",
  },
];

const realityPanels: RealityPanel[] = [
  {
    id: "World_A",
    title: "World A",
    sequence: ["C3.2", "C5.1", "C2.7"],
    ϕ: { DG: 0.81, CI: 0.77, SB: 0.43 },
    actors: {
      STT: "Timeline expired",
      Journalist: "No report filed",
      CivicActor: "Unaware",
    },
    visuals: {
      fog_overlay: true,
      blur_lines: true,
      glitch_effect: true,
    },
    outcome: "Simulated Constraint",
  },
  {
    id: "World_B",
    title: "World B",
    sequence: ["C5.1", "C2.7", "C3.2"],
    ϕ: { DG: 0.52, CI: 0.22, SB: 0.18 },
    actors: {
      STT: "Investigation launched",
      Journalist: "Publishes anomaly",
      CivicActor: "Protests triggered",
    },
    visuals: {
      fog_overlay: false,
      blur_lines: false,
      glitch_effect: false,
    },
    outcome: "Public Disillusionment",
  },
  {
    id: "World_C",
    title: "World C",
    sequence: ["C2.7", "C3.2", "C5.1"],
    ϕ: { DG: 0.74, CI: 0.41, SB: 0.62 },
    actors: {
      STT: "Filing delayed",
      Journalist: "Waits on FOIA",
      CivicActor: "Suspects wrongdoing, no proof",
    },
    visuals: {
      fog_overlay: true,
      blur_lines: false,
      glitch_effect: true,
    },
    outcome: "Controlled Disclosure",
  },
];

const SequenceLogicSimulator: React.FC = () => {
  const [draggedClause, setDraggedClause] = useState<ClauseData | null>(null);
  const [currentSequence, setCurrentSequence] = useState<ClauseData[]>([]);
  const [activeEnvironment, setActiveEnvironment] = useState<string | null>(
    null,
  );
  const [hoveredClause, setHoveredClause] = useState<string | null>(null);
  const [hoveredReality, setHoveredReality] = useState<string | null>(null);

  const handleDragStart = useCallback((clause: ClauseData) => {
    setDraggedClause(clause);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (draggedClause && currentSequence.length < 3) {
        setCurrentSequence((prev) => [...prev, draggedClause]);
        setDraggedClause(null);
      }
    },
    [draggedClause, currentSequence.length],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const removeFromSequence = useCallback((index: number) => {
    setCurrentSequence((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const reorderSequence = useCallback((fromIndex: number, toIndex: number) => {
    setCurrentSequence((prev) => {
      const newSequence = [...prev];
      const [removed] = newSequence.splice(fromIndex, 1);
      newSequence.splice(toIndex, 0, removed);
      return newSequence;
    });
  }, []);

  const getCurrentReality = useCallback(() => {
    const sequenceIds = currentSequence.map((c) => c.id);
    return realityPanels.find(
      (panel) =>
        panel.sequence.length === sequenceIds.length &&
        panel.sequence.every((id, idx) => id === sequenceIds[idx]),
    );
  }, [currentSequence]);

  const currentReality = getCurrentReality();

  return (
    <section
      className="min-h-screen flex flex-col justify-center items-center relative"
      style={{
        backgroundColor: "#0C2118",
        padding: "64px",
        scrollSnapAlign: "start",
      }}
    >
      <div className="container mx-auto max-w-7xl">
        {/* Title */}
        <motion.h1
          className="text-center mb-12 font-mono font-semibold tracking-tight"
          style={{
            fontSize: "48px",
            color: "#DAD7C7",
            fontFamily: "Inter, monospace",
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          THE ORDER OF LAW IS THE ORDER OF PERCEPTION
        </motion.h1>

        {/* Instruction */}
        <motion.p
          className="text-center mb-6"
          style={{
            fontSize: "18px",
            color: "#9DE6C6",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Drag to reorder the sequence. Each sequence activates a distinct
          governance reality.
        </motion.p>

        {/* Environment Modifiers */}
        <div className="flex justify-center space-x-4 mb-8">
          {environmentModifiers.map((env) => (
            <motion.button
              key={env.id}
              onClick={() =>
                setActiveEnvironment(
                  activeEnvironment === env.id ? null : env.id,
                )
              }
              className={`px-4 py-2 rounded-lg border transition-all font-mono text-sm ${
                activeEnvironment === env.id
                  ? "border-[#17B58F] bg-[#17B58F]/20 text-white"
                  : "border-gray-600 bg-[#13271D] text-[#17B58F] hover:border-[#17B58F]/50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {env.label}
            </motion.button>
          ))}
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Reality Panels */}
          {realityPanels.map((panel) => (
            <motion.div
              key={panel.id}
              className="relative rounded-lg border border-gray-600 p-6 cursor-pointer"
              style={{
                backgroundColor: panel.visuals.fog_overlay
                  ? "#0A1A0F"
                  : "#0F1F15",
                filter: panel.visuals.blur_lines ? "blur(0.5px)" : "none",
              }}
              onMouseEnter={() => setHoveredReality(panel.id)}
              onMouseLeave={() => setHoveredReality(null)}
              whileHover={{ scale: 1.02 }}
              animate={{
                borderColor:
                  currentReality?.id === panel.id ? "#17B58F" : "#4B5563",
                boxShadow:
                  currentReality?.id === panel.id
                    ? "0 0 20px rgba(23, 181, 143, 0.3)"
                    : "none",
              }}
            >
              {panel.visuals.glitch_effect && (
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse" />
                </div>
              )}

              <h3 className="text-lg font-mono font-bold text-white mb-4">
                {panel.title}
              </h3>

              {/* Sequence Display */}
              <div className="flex space-x-2 mb-4">
                {panel.sequence.map((clauseId, idx) => {
                  const clause = clauseBank.find((c) => c.id === clauseId);
                  return (
                    <div
                      key={clauseId}
                      className="w-8 h-8 rounded border flex items-center justify-center text-xs"
                      style={{
                        backgroundColor: clause?.color || "#666",
                        borderColor: clause?.color || "#666",
                      }}
                    >
                      {clause?.icon}
                    </div>
                  );
                })}
              </div>

              {/* Vector Display */}
              <div className="space-y-2 mb-4">
                {Object.entries(panel.ϕ).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-xs">
                    <span className="text-gray-400 font-mono">{key}</span>
                    <span className="text-white font-mono">
                      {value.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Actors */}
              <div className="space-y-1 mb-4">
                {Object.entries(panel.actors).map(([actor, status]) => (
                  <div key={actor} className="text-xs">
                    <span className="text-gray-400 font-mono">{actor}:</span>
                    <span className="text-gray-200 ml-2">{status}</span>
                  </div>
                ))}
              </div>

              {/* Outcome */}
              <div
                className="text-center py-2 px-3 rounded font-mono font-bold text-sm"
                style={{
                  backgroundColor:
                    panel.outcome === "Public Scandal"
                      ? "#DB4F4F20"
                      : panel.outcome === "Simulated Legality"
                        ? "#E1D16D20"
                        : "#9F77C920",
                  color:
                    panel.outcome === "Public Scandal"
                      ? "#DB4F4F"
                      : panel.outcome === "Simulated Legality"
                        ? "#E1D16D"
                        : "#9F77C9",
                }}
              >
                {panel.outcome}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sequence Builder */}
        <div className="flex justify-center mb-8">
          <div
            className="flex space-x-4 p-4 rounded-lg border border-[#9DE6C6] min-h-20 min-w-96 items-center justify-center"
            style={{ backgroundColor: "#08150E" }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {currentSequence.length === 0 ? (
              <span className="text-gray-500 font-mono">
                Drop clauses here to build sequence
              </span>
            ) : (
              currentSequence.map((clause, index) => (
                <motion.div
                  key={`${clause.id}-${index}`}
                  className="relative group cursor-move"
                  draggable
                  onDragStart={() => setDraggedClause(clause)}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="w-16 h-16 rounded border-2 flex flex-col items-center justify-center text-xs font-mono"
                    style={{
                      backgroundColor: clause.color + "20",
                      borderColor: clause.color,
                    }}
                  >
                    <span className="text-lg">{clause.icon}</span>
                    <span className="text-white">{clause.id}</span>
                  </div>
                  <button
                    onClick={() => removeFromSequence(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Clause Bank */}
        <div className="flex justify-center space-x-4 mb-8">
          {clauseBank.map((clause) => (
            <motion.div
              key={clause.id}
              className="cursor-grab active:cursor-grabbing"
              draggable
              onDragStart={() => handleDragStart(clause)}
              onMouseEnter={() => setHoveredClause(clause.id)}
              onMouseLeave={() => setHoveredClause(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="w-20 h-20 rounded-lg border-2 flex flex-col items-center justify-center p-2 transition-all"
                style={{
                  backgroundColor: clause.color + "20",
                  borderColor: clause.color,
                  boxShadow:
                    hoveredClause === clause.id
                      ? `0 0 20px ${clause.color}40`
                      : "none",
                }}
              >
                <span className="text-2xl mb-1">{clause.icon}</span>
                <span className="text-xs font-mono text-white">
                  {clause.id}
                </span>
              </div>

              {/* Tooltip */}
              <AnimatePresence>
                {hoveredClause === clause.id && (
                  <motion.div
                    className="absolute z-50 bg-gray-900 text-white p-3 rounded shadow-lg mt-2 text-sm max-w-xs"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="font-mono font-bold mb-1">
                      {clause.label}
                    </div>
                    <div className="text-xs text-gray-400">
                      {Object.entries(clause.ϕ).map(([key, value]) => (
                        <span key={key} className="mr-2">
                          {key}: {value.toFixed(2)}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Final Quote */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p
            className="italic"
            style={{
              fontFamily: "Inter, serif",
              color: "#B8D0C9",
              fontSize: "16px",
            }}
          >
            It is not the clause that blinds. It is the sequence that
            preconditions what can be seen.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SequenceLogicSimulator;
