import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import RotatingText from "@/components/ui/RotatingText";

interface Tier {
  id: number;
  title: string;
  header: string;
  summary: string;
  description: string;
  highlightColor?: string;
}

const tiers: Tier[] = [
  {
    id: 1,
    title: "Perception",
    header: "Scandal, Outrage, Visibility",
    summary:
      "Public sees corruption when visible through media, arrests, abuses. Surface expression, not source.",
    description:
      "The public sees corruption when it becomes visible — through media leaks, arrests, or blatant abuses. But this is not where corruption begins. This is its surface expression, not its structural source.",
  },
  {
    id: 2,
    title: "Format",
    header: "Procedure, Checklist, Documentation",
    summary:
      "Institutions only see corruption when protocol is broken. Documents filed = legality assumed.",
    description:
      "Institutions recognize corruption only when it deviates from protocol. If the contract is signed, the documents filed, and procedures followed — then legality is assumed. This is where simulation begins.",
    highlightColor: "#E27E3C", // RT — Risk Transfer
  },
  {
    id: 3,
    title: "Law",
    header: "Validity, Clause, Signature",
    summary:
      "Legality interpreted syntactically. Signed clause = passes. Law is an operator, not constraint.",
    description:
      "Legality is interpreted syntactically. If a clause is signed and conforms to the rules of procurement law, then it passes. But law is not constraint — it is an operator. And it can be used to construct evasion.",
    highlightColor: "#DB4F4F", // CI — Compliance Illusion
  },
  {
    id: 4,
    title: "Structure",
    header: "Design, Override, Simulation",
    summary:
      "Corruption happens when systems simulate legality while rerouting accountability.",
    description:
      "Corruption happens not when rules are broken, but when systems are designed to simulate legality while rerouting accountability. This is structural corruption. It is executed in logic, not in scandal.",
    highlightColor: "#9F77C9", // SB — Structural Blindspot
  },
  {
    id: 5,
    title: "Implementation",
    header: "Execute, Deploy, Monitor",
    summary:
      "Systems operationalize corruption through automated processes and algorithmic oversight.",
    description:
      "Once structural corruption is designed, it must be implemented through operational frameworks. This involves deploying automated systems that execute corrupt logic while maintaining plausible deniability through technical complexity and distributed responsibility.",
    highlightColor: "#17B58F", // Implementation Green
  },
  {
    id: 6,
    title: "Evolution",
    header: "Adapt, Mutate, Persist",
    summary:
      "Corrupt systems evolve to counter detection, becoming more sophisticated over time.",
    description:
      "The final stage is systemic adaptation. As detection methods improve, corrupt systems evolve new forms of evasion. They mutate their operational signatures, adapt their legal frameworks, and persist through institutional memory and embedded processes.",
    highlightColor: "#40FFAA", // Evolution Bright Green
  },
];

const TierComponent: React.FC<{
  tier: Tier;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ tier, index, isExpanded, onToggle }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    threshold: 0.2,
    margin: "-10% 0px -10% 0px",
  });

  return (
    <div
      ref={ref}
      className="relative p-6 rounded-lg cursor-pointer transition-all duration-300"
      style={{
        boxShadow: tier.highlightColor
          ? `0 0 30px ${tier.highlightColor}20, 0 0 10px ${tier.highlightColor}10`
          : "none",
        backgroundColor: tier.highlightColor
          ? `${tier.highlightColor}05`
          : "transparent",
        minHeight: isExpanded ? "auto" : "120px",
        opacity: 1,
      }}
      onClick={onToggle}
    >
      {/* Header */}
      <h3
        className="text-section-lg font-medium text-white mb-4"
        style={{
          color: isInView ? "white" : "#ccc",
        }}
      >
        <span className="flex items-center gap-3">
          <span>{tier.title}</span>
          <RotatingText
            texts={tier.header.split(", ")}
            rotationInterval={2500}
            splitBy="characters"
            staggerDuration={0.05}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 400,
            }}
          />
        </span>
      </h3>

      {/* Summary or Description */}
      <div>
        <p
          className="text-body leading-relaxed"
          style={{
            color: isInView ? "#e5e5e5" : "#aaa",
          }}
        >
          {isExpanded ? tier.description : tier.summary}
        </p>
      </div>

      {/* Expand indicator */}
      <div className="absolute top-4 right-4 text-gray-400">
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ↓
        </motion.span>
      </div>

      {/* Highlight Border */}
      {tier.highlightColor && (
        <div
          className="absolute inset-0 rounded-lg border-2 opacity-20"
          style={{
            borderColor: tier.highlightColor,
          }}
        />
      )}
    </div>
  );
};

const WhatWeFight: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const finalStatementRef = useRef<HTMLParagraphElement>(null);
  const tier4Ref = useRef<HTMLDivElement>(null);
  const [expandedTiers, setExpandedTiers] = useState<number[]>([]);

  const isTier4InView = useInView(tier4Ref, {
    threshold: 0.3,
    margin: "-20% 0px -20% 0px",
  });

  const isInViewFinal = useInView(finalStatementRef, {
    threshold: 0.3,
    margin: "0px 0px -20% 0px",
  });

  return (
    <section
      ref={containerRef}
      className="min-h-screen pt-32 pb-20 pl-12 pr-12 transition-colors duration-1000"
      style={
        {
          backgroundColor: isTier4InView ? "#0D1510" : "#151A13",
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
          className="text-left mb-16 text-display-xl uppercase tracking-tight pl-6"
          style={{
            color: "#DAD7C7",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-20%" }}
        >
          What we're fighting
        </motion.h1>

        {/* Tier Pyramid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tiers.map((tier, index) => (
            <div key={tier.id} ref={tier.id === 4 ? tier4Ref : undefined}>
              <TierComponent
                tier={tier}
                index={index}
                isExpanded={expandedTiers.includes(tier.id)}
                onToggle={() => {
                  setExpandedTiers((prev) =>
                    prev.includes(tier.id)
                      ? prev.filter((id) => id !== tier.id)
                      : [...prev, tier.id],
                  );
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeFight;
