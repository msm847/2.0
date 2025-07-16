import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  Target,
  Eye,
  User,
  Brain,
  Zap,
  Gavel,
  Network,
  Globe,
  ChevronDown,
} from "lucide-react";
import "./MagicBento.css";

const MagicBentoTeamGrid = () => {
  const gridRef = useRef(null);
  const [expandedCard, setExpandedCard] = useState(null);

  const corePrinciples = [
    {
      title: "Preemption over Reaction",
      description:
        "Identify structural risks before they manifest, not after damage is done.",
      icon: Target,
    },
    {
      title: "Transparency in Analysis",
      description:
        "Explainable AI that shows how conclusions are reached, not black box predictions.",
      icon: Eye,
    },
    {
      title: "Civic Collaboration",
      description:
        "Working with journalists, whistleblowers, and civic actors to strengthen accountability.",
      icon: User,
    },
    {
      title: "Structural Intelligence",
      description:
        "Detect design-level vulnerabilities within compliance frameworks before they calcify.",
      icon: Brain,
    },
    {
      title: "Real-time Detection",
      description:
        "Convert institutional data into actionable risk signals before execution, not after loss.",
      icon: Zap,
    },
    {
      title: "Legal Architecture Analysis",
      description:
        "Parse contract language to expose embedded risk configurations and asymmetric clauses.",
      icon: Gavel,
    },
    {
      title: "Political Network Mapping",
      description:
        "Trace relational proximity and influence patterns across institutional actors using graph AI.",
      icon: Network,
    },
    {
      title: "System-wide Integration",
      description:
        "Modular signal engines that operate independently but integrate through unified risk logic.",
      icon: Globe,
    },
  ];

  const teamSections = [
    {
      id: "founder",
      title: "Founder's Note",
      description:
        "Personal message from the founder about Vigilum's mission and vision.",
      label: "Leadership",
      content: {
        main: `During my research in the MARS-REERS program at Columbia University, I discovered a fundamental gap in how we approach corruption. We often react to scandals rather than predict them. Traditional tools detect issues after rules are broken, but what if we could identify the structural flaws that enable corruption before any funds are spent or contracts signed?`,
        additional: `Vigilum emerged from this insight. Our mission is to render institutional structure legible before it breaks, to spotlight design flaws that breed corruption so they can be fixed in time. This isn't just detection — this is preemption.`,
        signature: "— Adam Kovarskas, Founder",
      },
    },
    {
      id: "origin",
      title: "Origin Story",
      description:
        "How Vigilum evolved from academic research to a transformative platform.",
      label: "History",
      content: {
        main: `Vigilum began as a research thesis in the MARS-REERS program at Columbia University, exploring quantum logic in legal clauses. The findings crystallized into the Vigilum Codex — an evolving compendium of risk patterns.`,
        additional: `Through analysis of real-world cases like the ill-fated Vilnius National Stadium project and energy contracts at Ignitis, we discovered how sequences of legal clauses can create escape logic and procedural dead-ends while remaining formally compliant. What started as academic research evolved into a platform with the potential to transform how institutions approach governance risk — from reactive compliance to proactive structural intelligence.`,
      },
    },
    {
      id: "vision",
      title: "Vision Statement",
      description:
        "Our commitment to structural transparency and accountability by design.",
      label: "Future",
      content: {
        quote:
          "Vigilum aims to empower societies with structural transparency — where laws and contracts carry traceable logic, and loopholes have nowhere to hide.",
        main: `We believe in augmenting human oversight with AI to achieve accountability by design, transforming governance from reactive to predictive.`,
        additional: `Our vision extends beyond mere detection to prevention, creating systems where corruption becomes structurally impossible rather than just detectable.`,
      },
    },
    {
      id: "principles",
      title: "Core Principles",
      description:
        "The fundamental beliefs that guide our approach to governance transparency.",
      label: "Philosophy",
      content: {
        principles: corePrinciples,
      },
    },
  ];

  const handleCardClick = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".magic-team-card");

    cards.forEach((card) => {
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        gsap.to(card, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, [expandedCard]);

  return (
    <div className="mb-16">
      <div className="card-grid" ref={gridRef}>
        {teamSections.map((section) => (
          <div
            key={section.id}
            className={`card magic-team-card card--border-glow ${
              expandedCard === section.id ? "expanded" : ""
            }`}
            onClick={() => handleCardClick(section.id)}
            style={{
              "--glow-color": "0, 255, 204",
            }}
          >
            <div className="card__header">
              <div className="card__label">{section.label}</div>
              <ChevronDown className="card__expand-icon w-5 h-5" />
            </div>
            <div className="card__content">
              <h2 className="card__title">{section.title}</h2>
              <p className="card__description">{section.description}</p>

              <div className="card__expanded-content">
                {section.id === "founder" && (
                  <div>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {section.content.main}
                    </p>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {section.content.additional}
                    </p>
                    <p className="text-green-400 font-mono text-sm italic">
                      {section.content.signature}
                    </p>
                  </div>
                )}

                {section.id === "origin" && (
                  <div>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {section.content.main}
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      {section.content.additional}
                    </p>
                  </div>
                )}

                {section.id === "vision" && (
                  <div>
                    <blockquote className="text-green-300 font-mono text-lg leading-relaxed mb-4 border-l-2 border-green-400 pl-4 italic">
                      "{section.content.quote}"
                    </blockquote>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {section.content.main}
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      {section.content.additional}
                    </p>
                  </div>
                )}

                {section.id === "principles" && (
                  <div className="principles-grid">
                    {section.content.principles.map((principle, index) => {
                      const Icon = principle.icon;
                      return (
                        <div key={index} className="principle-item">
                          <div className="principle-icon">
                            <Icon className="w-6 h-6 text-black" />
                          </div>
                          <h4 className="principle-title">{principle.title}</h4>
                          <p className="principle-description">
                            {principle.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MagicBentoTeamGrid;
