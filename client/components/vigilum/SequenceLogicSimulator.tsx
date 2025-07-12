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
  const [isAutoCycling, setIsAutoCycling] = useState(false);
  const [systemMorph, setSystemMorph] = useState(false);
  const [sequenceTimeline, setSequenceTimeline] = useState(0);
  const [previewOverride, setPreviewOverride] = useState<string | null>(null);

  const headerControls = useAnimation();
  const canvasControls = useAnimation();
  const perceptionRipple = useRef<HTMLDivElement>(null);

  // Stutter glitch effect for header
  const stutterVariants = {
    initial: { opacity: 1, x: 0, filter: "blur(0px)" },
    glitch: {
      opacity: [1, 0.3, 1, 0.7, 1],
      x: [0, -2, 2, -1, 0],
      filter: [
        "blur(0px)",
        "blur(1px)",
        "blur(0px)",
        "blur(0.5px)",
        "blur(0px)",
      ],
      transition: { duration: 0.3, times: [0, 0.2, 0.4, 0.7, 1] },
    },
  };

  // Environment system morph trigger
  const handleEnvironmentToggle = useCallback(
    (envId: string) => {
      setSystemMorph(true);
      setActiveEnvironment(activeEnvironment === envId ? null : envId);

      // Flash system-wide morph
      canvasControls.start({
        scale: [1, 1.02, 0.98, 1],
        filter: [
          "brightness(1)",
          "brightness(1.2)",
          "brightness(0.8)",
          "brightness(1)",
        ],
        transition: { duration: 0.8 },
      });

      setTimeout(() => setSystemMorph(false), 800);
    },
    [activeEnvironment, canvasControls],
  );

  // Drag handlers with preview override
  const handleDragStart = useCallback((clause: ClauseData) => {
    setDraggedClause(clause);
    setPreviewOverride(`${clause.id} → preview path`);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, slotIndex?: number) => {
      e.preventDefault();
      if (draggedClause) {
        if (slotIndex !== undefined) {
          // Drop in specific slot
          setCurrentSequence((prev) => {
            const newSequence = [...prev];
            newSequence[slotIndex] = draggedClause;
            return newSequence;
          });
        } else if (currentSequence.length < 3) {
          // Add to end
          setCurrentSequence((prev) => [...prev, draggedClause]);
        }
        setDraggedClause(null);
        setPreviewOverride(null);
        setSequenceTimeline((prev) => prev + 1);

        // Trigger staggered horizontal collapse
        canvasControls.start({
          x: [-5, 5, -2, 0],
          transition: { duration: 0.6, staggerChildren: 0.1 },
        });
      }
    },
    [draggedClause, currentSequence.length, canvasControls],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const removeFromSequence = useCallback((index: number) => {
    setCurrentSequence((prev) => prev.filter((_, i) => i !== index));
    setSequenceTimeline((prev) => prev + 1);
  }, []);

  // Auto-cycling through all permutations
  const beginFullLoop = useCallback(() => {
    setIsAutoCycling(true);
    const allPermutations = [
      ["C3.2", "C5.1", "C2.7"],
      ["C3.2", "C2.7", "C5.1"],
      ["C5.1", "C3.2", "C2.7"],
      ["C5.1", "C2.7", "C3.2"],
      ["C2.7", "C3.2", "C5.1"],
      ["C2.7", "C5.1", "C3.2"],
    ];

    let currentIndex = 0;
    const cycleInterval = setInterval(() => {
      const currentPerm = allPermutations[currentIndex];
      const clauses = currentPerm.map(
        (id) => liveClauseChips.find((c) => c.id === id)!,
      );
      setCurrentSequence(clauses);
      setSequenceTimeline((prev) => prev + 1);

      currentIndex++;
      if (currentIndex >= allPermutations.length) {
        clearInterval(cycleInterval);
        setIsAutoCycling(false);
      }
    }, 2000);
  }, []);

  const getCurrentReality = useCallback(() => {
    const sequenceIds = currentSequence.map((c) => c.id);
    return realityPanels.find(
      (panel) =>
        panel.sequence.length === sequenceIds.length &&
        panel.sequence.every((id, idx) => id === sequenceIds[idx]),
    );
  }, [currentSequence]);

  const getClauseVisualEffect = (clause: ClauseData) => {
    const effects = {
      "GlitchRed + PulseGlowEdge": {
        backgroundColor: "#DB4F4F20",
        borderColor: "#DB4F4F",
        boxShadow: "0 0 20px rgba(219, 79, 79, 0.6)",
        animation: "pulse 2s infinite",
      },
      "GhostViolet + DelayBlur": {
        backgroundColor: "#9F77C920",
        borderColor: "#9F77C9",
        filter: "blur(0.5px)",
        opacity: 0.8,
      },
      "ObscuraFog + FadeOpacity": {
        backgroundColor: "#E1D16D20",
        borderColor: "#E1D16D",
        opacity: 0.6,
        filter: "blur(1px)",
      },
    };
    return effects[clause.visual as keyof typeof effects] || {};
  };

  const currentReality = getCurrentReality();

  // Trigger header stutter effect periodically
  useEffect(() => {
    const interval = setInterval(() => {
      headerControls.start("glitch");
    }, 8000);
    return () => clearInterval(interval);
  }, [headerControls]);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: "96vh",
        background: "linear-gradient(135deg, #0C2118 0%, #08150E 100%)",
        scrollSnapAlign: "start",
      }}
    >
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Environment Modulators */}
        <div className="flex justify-center space-x-4 mb-12">
          {environmentModulators.map((env) => (
            <motion.button
              key={env.id}
              onClick={() => handleEnvironmentToggle(env.id)}
              className={`px-6 py-3 rounded-lg border transition-all font-mono text-sm relative overflow-hidden ${
                activeEnvironment === env.id
                  ? "border-[#17B58F] bg-[#17B58F]/20 text-white"
                  : "border-gray-600 bg-[#13271D] text-[#17B58F] hover:border-[#17B58F]/50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={
                systemMorph
                  ? {
                      boxShadow: [
                        "0 0 0px rgba(23, 181, 143, 0)",
                        "0 0 20px rgba(23, 181, 143, 0.8)",
                        "0 0 0px rgba(23, 181, 143, 0)",
                      ],
                      transition: { duration: 0.8 },
                    }
                  : {}
              }
            >
              {env.label}
              {activeEnvironment === env.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#17B58F]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Interactive Clause Board (DragSynthZone) */}
        <motion.div
          className="flex justify-center mb-12"
          animate={canvasControls}
        >
          <div
            className="relative p-6 rounded-lg border-2 border-dashed min-h-24 bg-gradient-to-r from-[#08150E] to-[#0A1A0F]"
            style={{
              borderColor: "#9DE6C6",
              minWidth: "500px",
              boxShadow: previewOverride
                ? "0 0 30px rgba(157, 230, 198, 0.3)"
                : "none",
            }}
            onDrop={(e) => handleDrop(e)}
            onDragOver={handleDragOver}
          >
            <div className="text-center text-[#9DE6C6] font-mono text-sm mb-4">
              CLAUSE STAGING FIELD
            </div>

            <div className="flex justify-center space-x-4">
              {[0, 1, 2].map((slotIndex) => (
                <div
                  key={slotIndex}
                  className="relative w-20 h-20 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center"
                  onDrop={(e) => handleDrop(e, slotIndex)}
                  onDragOver={handleDragOver}
                >
                  {currentSequence[slotIndex] ? (
                    <motion.div
                      className="w-full h-full rounded border-2 flex flex-col items-center justify-center cursor-pointer"
                      style={{
                        ...getClauseVisualEffect(currentSequence[slotIndex]),
                      }}
                      onClick={() => removeFromSequence(slotIndex)}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-lg">
                        {liveClauseChips
                          .find((c) => c.id === currentSequence[slotIndex].id)
                          ?.visual.includes("PulseGlowEdge")
                          ? "⚠️"
                          : currentSequence[slotIndex].id === "C5.1"
                            ? "🔄"
                            : "⏱️"}
                      </div>
                      <div className="text-xs font-mono text-white">
                        {currentSequence[slotIndex].id}
                      </div>
                    </motion.div>
                  ) : (
                    <span className="text-gray-500 text-xs font-mono">
                      Slot {slotIndex + 1}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {previewOverride && (
              <motion.div
                className="absolute top-2 right-2 text-xs font-mono text-[#17B58F] bg-black/50 px-2 py-1 rounded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {previewOverride}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Live Clause Chips */}
        <div className="flex justify-center space-x-6 mb-12">
          {liveClauseChips.map((clause) => (
            <motion.div
              key={clause.id}
              className="cursor-grab active:cursor-grabbing group"
              draggable
              onDragStart={() => handleDragStart(clause)}
              onMouseEnter={() => setHoveredClause(clause.id)}
              onMouseLeave={() => setHoveredClause(null)}
              whileHover={{ scale: 1.08, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="w-24 h-24 rounded-lg border-2 flex flex-col items-center justify-center p-3 transition-all relative overflow-hidden"
                style={{
                  ...getClauseVisualEffect(clause),
                }}
              >
                <div className="text-2xl mb-1">
                  {clause.visual.includes("PulseGlowEdge")
                    ? "⚠️"
                    : clause.id === "C5.1"
                      ? "🔄"
                      : "⏱️"}
                </div>
                <div className="text-xs font-mono text-white font-bold">
                  {clause.id}
                </div>
                <div className="text-xs text-gray-300 text-center mt-1">
                  {clause.name}
                </div>
              </div>

              {/* Enhanced Tooltip */}
              <AnimatePresence>
                {hoveredClause === clause.id && (
                  <motion.div
                    className="absolute z-50 bg-gray-900 text-white p-4 rounded shadow-2xl mt-2 text-sm max-w-xs border border-[#17B58F]"
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  >
                    <div className="font-mono font-bold mb-2 text-[#17B58F]">
                      {clause.name}
                    </div>
                    <div className="text-xs text-gray-300 mb-2">
                      {clause.description}
                    </div>
                    <div className="text-xs text-gray-400">
                      ϕ:{" "}
                      {Object.entries(clause.ϕ_base).map(([key, value]) => (
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

        {/* Three Reality Canvas */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
          animate={canvasControls}
        >
          {realityPanels.map((panel, index) => (
            <motion.div
              key={panel.id}
              className="relative rounded-lg border p-6 cursor-pointer overflow-hidden"
              style={{
                backgroundColor: panel.visuals.fog_overlay
                  ? "#0A1A0F"
                  : "#0F1F15",
                filter: panel.visuals.blur_lines ? "blur(0.5px)" : "none",
                borderColor:
                  currentReality?.id === panel.id ? "#17B58F" : "#4B5563",
              }}
              onMouseEnter={() => setHoveredReality(panel.id)}
              onMouseLeave={() => setHoveredReality(null)}
              whileHover={{ scale: 1.02, y: -5 }}
              animate={{
                boxShadow:
                  currentReality?.id === panel.id
                    ? "0 0 30px rgba(23, 181, 143, 0.4)"
                    : "0 0 10px rgba(0, 0, 0, 0.2)",
              }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Visual Distortion Layers */}
              {panel.visuals.glitch_effect && (
                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={{
                    background: [
                      "linear-gradient(45deg, transparent, #DB4F4F, transparent)",
                      "linear-gradient(135deg, transparent, #E1D16D, transparent)",
                      "linear-gradient(45deg, transparent, #DB4F4F, transparent)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              <h3 className="text-lg font-mono font-bold text-white mb-4 relative z-10">
                {panel.title}
              </h3>

              {/* Live Semantic Pulse Bar */}
              <div className="flex space-x-2 mb-4">
                {panel.sequence.map((clauseId, idx) => {
                  const clause = liveClauseChips.find((c) => c.id === clauseId);
                  return (
                    <motion.div
                      key={clauseId}
                      className="w-8 h-8 rounded border flex items-center justify-center text-xs relative"
                      style={{
                        backgroundColor: clause
                          ? getClauseVisualEffect(clause).backgroundColor
                          : "#666",
                        borderColor: clause
                          ? getClauseVisualEffect(clause).borderColor
                          : "#666",
                      }}
                      animate={{
                        scale:
                          currentReality?.id === panel.id ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: idx * 0.2,
                      }}
                    >
                      {clause?.visual.includes("PulseGlowEdge")
                        ? "⚠️"
                        : clauseId === "C5.1"
                          ? "🔄"
                          : "⏱️"}
                    </motion.div>
                  );
                })}
              </div>

              {/* ϕ Projection with 4D Arc */}
              <div className="space-y-2 mb-4">
                {Object.entries(panel.ϕ).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center text-xs"
                  >
                    <span className="text-gray-400 font-mono">{key}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-[#17B58F] rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${value * 100}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                      <span className="text-white font-mono w-8">
                        {value.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actor Cognition Strip */}
              <motion.div
                className="space-y-1 mb-4"
                animate={
                  hoveredReality === panel.id
                    ? {
                        backgroundColor: "rgba(23, 181, 143, 0.1)",
                        padding: "8px",
                        borderRadius: "4px",
                      }
                    : {}
                }
              >
                {Object.entries(panel.actors).map(([actor, status]) => (
                  <div key={actor} className="text-xs flex justify-between">
                    <span className="text-gray-400 font-mono">{actor}:</span>
                    <span className="text-gray-200">{status}</span>
                  </div>
                ))}
              </motion.div>

              {/* Outcome Tag */}
              <motion.div
                className="text-center py-2 px-3 rounded font-mono font-bold text-sm relative"
                style={{
                  backgroundColor:
                    panel.outcome === "Public Disillusionment"
                      ? "#DB4F4F20"
                      : panel.outcome === "Simulated Constraint"
                        ? "#E1D16D20"
                        : "#9F77C920",
                  color:
                    panel.outcome === "Public Disillusionment"
                      ? "#DB4F4F"
                      : panel.outcome === "Simulated Constraint"
                        ? "#E1D16D"
                        : "#9F77C9",
                }}
                whileHover={{ scale: 1.05 }}
              >
                {panel.outcome}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Instruction Module */}
        <motion.div
          className="max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-gray-600">
            <div className="space-y-3 text-center">
              {[
                "Clauses do not define legality. They sequence perception.",
                "Some orders allow investigation. Others erase the window.",
                "Drag. Reorder. Observe how truth changes form.",
              ].map((text, index) => (
                <motion.p
                  key={index}
                  className="text-sm font-mono italic"
                  style={{ color: "#9DE6C6" }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 + index * 0.3 }}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Perceptual Echo Layer */}
        <div
          ref={perceptionRipple}
          className="relative h-20 mb-8 overflow-hidden rounded-lg"
          style={{ backgroundColor: "#08150E" }}
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              background: currentReality
                ? `radial-gradient(circle, rgba(23, 181, 143, 0.2) 0%, transparent 70%)`
                : "transparent",
            }}
          >
            <motion.div
              className="text-center font-mono text-sm"
              style={{ color: "#B8D0C9" }}
              animate={
                currentReality
                  ? {
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.02, 1],
                    }
                  : { opacity: 0.3 }
              }
              transition={{ duration: 2, repeat: Infinity }}
            >
              {currentReality
                ? `Civic Signal: ${currentReality.outcome}`
                : "Configure sequence to observe civic perception field"}
            </motion.div>
          </motion.div>
        </div>

        {/* Footer Closure */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p
            className="italic mb-8"
            style={{
              fontFamily: "Inter, serif",
              color: "#B8D0C9",
              fontSize: "16px",
              paddingTop: "64px",
            }}
          >
            Governance does not happen. It is sequenced.
          </p>

          <motion.button
            onClick={beginFullLoop}
            disabled={isAutoCycling}
            className="px-8 py-3 rounded-lg font-mono font-bold transition-all relative overflow-hidden"
            style={{
              backgroundColor: "#17B58F",
              color: "#0C2118",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(23, 181, 143, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            animate={
              isAutoCycling
                ? {
                    backgroundColor: ["#17B58F", "#0C2118", "#17B58F"],
                    color: ["#0C2118", "#17B58F", "#0C2118"],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: isAutoCycling ? Infinity : 0 }}
          >
            {isAutoCycling ? "Auto-Cycling..." : "Begin Full Loop"}
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-lg"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{
                scale: [1, 1.2, 1],
                opacity: [0, 0.3, 0],
              }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          </motion.button>

          <p className="text-xs text-gray-400 mt-4 font-mono">
            Try all 6 permutations. Which ones produce silence? Which ones
            produce scandal?
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SequenceLogicSimulator;
