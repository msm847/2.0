import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Tier {
  id: number;
  title: string;
  header: string;
  description: string;
  highlightColor?: string;
}

const tiers: Tier[] = [
  {
    id: 1,
    title: "TIER 1 — PERCEPTION",
    header: "Scandal, Outrage, Visibility",
    description:
      "The public sees corruption when it becomes visible — through media leaks, arrests, or blatant abuses. But this is not where corruption begins. This is its surface expression, not its structural source.",
  },
  {
    id: 2,
    title: "TIER 2 — FORMAT",
    header: "Procedure, Checklist, Documentation",
    description:
      "Institutions recognize corruption only when it deviates from protocol. If the contract is signed, the documents filed, and procedures followed — then legality is assumed. This is where simulation begins.",
    highlightColor: "#E27E3C", // RT — Risk Transfer
  },
  {
    id: 3,
    title: "TIER 3 — LAW",
    header: "Validity, Clause, Signature",
    description:
      "Legality is interpreted syntactically. If a clause is signed and conforms to the rules of procurement law, then it passes. But law is not constraint — it is an operator. And it can be used to construct evasion.",
    highlightColor: "#DB4F4F", // CI — Compliance Illusion
  },
  {
    id: 4,
    title: "TIER 4 — STRUCTURE",
    header: "Design, Override, Simulation",
    description:
      "Corruption happens not when rules are broken, but when systems are designed to simulate legality while rerouting accountability. This is structural corruption. It is executed in logic, not in scandal.",
    highlightColor: "#9F77C9", // SB — Structural Blindspot
  },
];

const WhatWeFight: React.FC = () => {
  const [visibleTiers, setVisibleTiers] = useState<number[]>([]);
  const [showFinalStatement, setShowFinalStatement] = useState(false);
  const [backgroundDark, setBackgroundDark] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      // Tier visibility logic
      if (progress > 0.1 && !visibleTiers.includes(1)) {
        setVisibleTiers([1]);
      }
      if (progress > 0.3 && !visibleTiers.includes(2)) {
        setVisibleTiers([1, 2]);
      }
      if (progress > 0.5 && !visibleTiers.includes(3)) {
        setVisibleTiers([1, 2, 3]);
      }
      if (progress > 0.7 && !visibleTiers.includes(4)) {
        setVisibleTiers([1, 2, 3, 4]);
        setBackgroundDark(true);
      }
      if (progress > 0.8) {
        setShowFinalStatement(true);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, visibleTiers]);

  return (
    <section
      ref={containerRef}
      className="min-h-screen pt-20 pb-20 pl-12 pr-12 transition-all duration-700"
      style={
        {
          backgroundColor: backgroundDark ? "#0D1510" : "#151A13",
          "--color-bg-base": "#151A13",
          "--color-text-primary": "#DAD7C7",
          "--color-highlight-rt": "#E27E3C",
          "--color-highlight-ci": "#DB4F4F",
          "--color-highlight-sb": "#9F77C9",
          "--color-structural-glow": "#17B58F",
          "--color-final-quote": "#E1D16D",
        } as React.CSSProperties
      }
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Section Title */}
        <motion.h1
          className="text-center mb-16 font-semibold text-5xl uppercase tracking-tight"
          style={{
            color: "#DAD7C7",
            fontFamily: "Inter, sans-serif",
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          WHAT WE FIGHT
        </motion.h1>

        {/* Tier Pyramid */}
        <div className="flex flex-col gap-12">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              className="relative"
              initial={{ opacity: 0, y: 100 }}
              animate={{
                opacity: visibleTiers.includes(tier.id) ? 1 : 0,
                y: visibleTiers.includes(tier.id) ? 0 : 100,
                scale: visibleTiers.includes(tier.id) ? 1 : 0.9,
              }}
              transition={{
                duration: 0.7,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
              style={{
                boxShadow: tier.highlightColor
                  ? `0 0 30px ${tier.highlightColor}20`
                  : "none",
              }}
            >
              {/* Tier Title */}
              <p
                className="text-sm uppercase tracking-wider mb-3"
                style={{
                  color: "#DAD7C7",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {tier.title}
              </p>

              {/* Tier Header */}
              <h2
                className="text-4xl font-semibold mb-6"
                style={{
                  color: "#DAD7C7",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {tier.header}
              </h2>

              {/* Description */}
              <p
                className="text-lg leading-relaxed max-w-3xl"
                style={{
                  color: "#B7B4AC",
                  fontFamily: "Inter, sans-serif",
                  lineHeight: 1.6,
                }}
              >
                {tier.description}
              </p>

              {/* Highlight Border */}
              {tier.highlightColor && (
                <motion.div
                  className="absolute inset-0 rounded-lg border-2 opacity-20"
                  style={{
                    borderColor: tier.highlightColor,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: visibleTiers.includes(tier.id) ? 0.2 : 0,
                  }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Final Statement */}
        <motion.div
          className="sticky bottom-1/3 text-center pt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: showFinalStatement ? 1 : 0,
            y: showFinalStatement ? 0 : 50,
          }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-2xl font-semibold tracking-tight"
            style={{
              color: "#E1D16D",
              fontFamily: "Inter, sans-serif",
            }}
            whileHover={{
              textShadow: "0 0 20px #E1D16D60",
            }}
          >
            "This system isn't broken. It's working as simulated."
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeFight;
