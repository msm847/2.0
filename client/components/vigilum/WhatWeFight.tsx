import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import RotatingText from "@/components/ui/RotatingText";
import DecryptedText from "@/components/ui/DecryptedText";
import SplitText from "@/components/ui/SplitText";
import TrueFocus from "@/components/ui/TrueFocus";
import FuzzyText from "@/components/ui/FuzzyText";
import GlitchText from "@/components/ui/GlitchText";

interface Tier {
  id: number;
  title: string;
  titleComponent?: React.ReactNode;
  header: string;
  summary: string;
  description: string;
  highlightColor?: string;
}

const tiers: Tier[] = [
  {
    id: 1,
    title: "Perception Perspective",
    header: "Scandal, Outrage, Visibility",
    summary:
      "Public sees corruption when visible through media, arrests, abuses. Surface expression, not source.",
    description:
      "The public sees corruption when it becomes visible — through media leaks, arrests, or blatant abuses. But this is not where corruption begins. This is its surface expression, not its structural source.",
    highlightColor: "#9DE6C6", // Perception Light Green
  },
  {
    id: 2,
    title: "Format",
    header: "Ritual, Simulation, Override",
    summary:
      "Legality interpreted syntactically. Signed clause = passes. Law is an operator, not constraint.",
    description:
      "Legality is interpreted syntactically. If a clause is signed and conforms to the rules of procurement law, then it passes. But law is not constraint — it is an operator. And it can be used to construct evasion.",
    highlightColor: "#DB4F4F", // CI — Compliance Illusion
  },
  {
    id: 3,
    title: "Law",
    header: "Design, Override, Simulation",
    summary:
      "Corruption happens when systems simulate legality while rerouting accountability.",
    description:
      "Corruption happens not when rules are broken, but when systems are designed to simulate legality while rerouting accountability. This is structural corruption. It is executed in logic, not in scandal.",
    highlightColor: "#9F77C9", // SB — Structural Blindspot
  },
  {
    id: 4,
    title: "Outcome ≠ Consequence",
    header: "Closure, Containment, Misdirection",
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
      className="relative p-6 rounded-2xl cursor-pointer transition-all duration-500 group overflow-hidden"
      style={{
        background: tier.highlightColor
          ? `linear-gradient(135deg,
               rgba(255, 255, 255, 0.03) 0%,
               rgba(255, 255, 255, 0.01) 30%,
               ${tier.highlightColor}08 70%,
               ${tier.highlightColor}12 100%)`
          : `linear-gradient(135deg,
               rgba(255, 255, 255, 0.03) 0%,
               rgba(255, 255, 255, 0.01) 100%)`,
        backdropFilter: "blur(40px) saturate(1.8)",
        WebkitBackdropFilter: "blur(40px) saturate(1.8)",
        border: `1px solid ${tier.highlightColor ? `${tier.highlightColor}25` : "rgba(255, 255, 255, 0.15)"}`,
        borderTop: `1px solid ${tier.highlightColor ? `${tier.highlightColor}40` : "rgba(255, 255, 255, 0.25)"}`,
        borderLeft: `1px solid ${tier.highlightColor ? `${tier.highlightColor}30` : "rgba(255, 255, 255, 0.2)"}`,
        boxShadow: tier.highlightColor
          ? `
            0 12px 40px ${tier.highlightColor}08,
            0 4px 16px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.15),
            inset 0 0 0 1px ${tier.highlightColor}12,
            inset 0 -1px 0 rgba(0, 0, 0, 0.1)
          `
          : `
            0 12px 40px rgba(0, 0, 0, 0.15),
            0 4px 16px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            inset 0 0 0 1px rgba(255, 255, 255, 0.08),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1)
          `,
        height: isExpanded ? "auto" : "160px",
        minHeight: isExpanded ? "auto" : "160px",
        maxHeight: isExpanded ? "none" : "160px",
        opacity: 1,
        transform: "translateY(0px) rotateX(0deg) rotateY(0deg)",
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-6px) rotateX(3deg) rotateY(1deg)";
        e.currentTarget.style.boxShadow = tier.highlightColor
          ? `
            0 25px 60px ${tier.highlightColor}12,
            0 8px 30px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.25),
            inset 0 0 0 1px ${tier.highlightColor}20,
            inset 0 -1px 0 rgba(0, 0, 0, 0.15)
          `
          : `
            0 25px 60px rgba(0, 0, 0, 0.2),
            0 8px 30px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            inset 0 0 0 1px rgba(255, 255, 255, 0.12),
            inset 0 -1px 0 rgba(0, 0, 0, 0.15)
          `;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0px) rotateX(0deg) rotateY(0deg)";
        e.currentTarget.style.boxShadow = tier.highlightColor
          ? `
            0 12px 40px ${tier.highlightColor}08,
            0 4px 16px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.15),
            inset 0 0 0 1px ${tier.highlightColor}12,
            inset 0 -1px 0 rgba(0, 0, 0, 0.1)
          `
          : `
            0 12px 40px rgba(0, 0, 0, 0.15),
            0 4px 16px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            inset 0 0 0 1px rgba(255, 255, 255, 0.08),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1)
          `;
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
        {tier.id === 1 ? (
          <TrueFocus
            sentence={tier.title}
            manualMode={false}
            blurAmount={3}
            borderColor="#9DE6C6"
            glowColor="rgba(157, 230, 198, 0.6)"
            animationDuration={1.2}
            pauseBetweenAnimations={2}
          />
        ) : tier.id === 3 ? (
          <span style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span>Outcome ≠ </span>
            <GlitchText speed={0.6} enableShadows={true} enableOnHover={true}>
              Consequence
            </GlitchText>
          </span>
        ) : tier.id === 4 ? (
          <span>{tier.title}</span>
        ) : (
          <span className="flex items-center gap-3">
            <span>{tier.title}</span>
            <span className="text-gray-400" style={{ fontSize: "1.2em" }}>
              →
            </span>
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
        )}
      </h3>

      {/* Summary or Description */}
      <div>
        {isExpanded ? (
          <p
            className="text-body leading-relaxed"
            style={{
              color: "#e5e5e5",
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              lineHeight: "1.6",
              marginTop: "8px",
            }}
          >
            {tier.description}
          </p>
        ) : (
          <p
            className="text-body leading-relaxed"
            style={{
              color: isInView ? "#e5e5e5" : "#aaa",
            }}
          >
            {tier.summary}
          </p>
        )}
      </div>

      {/* Expand indicator */}
      <div
        className="absolute top-4 right-4 text-gray-400 cursor-pointer transition-all duration-300"
        style={{
          fontSize: "18px",
          fontWeight: "bold",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = tier.highlightColor || "#ffffff";
          e.currentTarget.style.textShadow = `0 0 10px ${tier.highlightColor || "#ffffff"}80, 0 0 20px ${tier.highlightColor || "#ffffff"}40`;
          e.currentTarget.style.transform = "scale(1.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#9ca3af";
          e.currentTarget.style.textShadow = "none";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            display: "inline-block",
            fontWeight: "bold",
          }}
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
        <div
          className="mb-16 pl-6"
          style={{
            color: "#DAD7C7",
          }}
        >
          <SplitText
            text="What We Fight"
            className="text-left text-display-xl tracking-tight"
            splitType="chars"
            delay={50}
            duration={0.8}
            ease="power2.out"
            from={{ opacity: 0, y: 60, rotationX: -90 }}
            to={{ opacity: 1, y: 0, rotationX: 0 }}
            textAlign="left"
            threshold={0.2}
            rootMargin="-50px"
          />
        </div>

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
