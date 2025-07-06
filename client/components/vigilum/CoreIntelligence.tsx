import { useEffect, useRef } from "react";
import InteractiveCard from "./InteractiveCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const CoreIntelligence = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const cardData = [
    {
      id: "problem",
      icon: "alert-circle",
      name: "Trillion+ Blindspot",
      href: "/core-intelligence/problem",
    },
    {
      id: "solution",
      icon: "target",
      name: "Structural Foresight",
      href: "/core-intelligence/solution",
    },
    {
      id: "method",
      icon: "code",
      name: "Matrix Mechanics",
      href: "/core-intelligence/method",
    },
    {
      id: "system",
      icon: "cpu",
      name: "Seven AI Engines",
      href: "/core-intelligence/system",
    },
    {
      id: "impact",
      icon: "activity",
      name: "Prevention Timeline",
      href: "/core-intelligence/impact",
    },
    {
      id: "deploy",
      icon: "cloud",
      name: "Integration Ready",
      href: "/core-intelligence/deployment",
    },
  ];

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!prefersReducedMotion && sectionRef.current) {
      // Create the GSAP animation with ScrollTrigger
      const cards = cardsRef.current?.querySelectorAll(".ci-card");

      if (cards) {
        gsap.set(cards, {
          opacity: 0,
          y: 60,
        });

        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Animate section title and subtitle
      const title = sectionRef.current.querySelector(".section-title");
      const subtitle = sectionRef.current.querySelector(".subtitle");

      if (title && subtitle) {
        gsap.set([title, subtitle], {
          opacity: 0,
          y: 30,
        });

        gsap.to([title, subtitle], {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      id="core-intelligence"
      className="py-20"
      style={{ backgroundColor: "#0B1E16" }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2
              className="section-title text-4xl font-bold text-white mb-4 font-mono tracking-tight"
              style={{
                color: "#ffffff",
                textShadow: "0 0 20px rgba(0, 255, 255, 0.15)",
              }}
            >
              CORE INTELLIGENCE
            </h2>
            <p
              className="subtitle text-xl text-gray-300 font-light max-w-3xl mx-auto"
              style={{
                color: "#a0a0a0",
                textShadow: "0 0 10px rgba(255, 255, 255, 0.1)",
              }}
            >
              Seven AI engines. One structural foresight system.
            </p>
          </div>

          {/* Interactive Cards Grid */}
          <div
            ref={cardsRef}
            className="card-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "2rem",
            }}
          >
            {cardData.map((card, index) => (
              <InteractiveCard
                key={card.id}
                icon={card.icon}
                name={card.name}
                href={card.href}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @media (max-width: 480px) {
            .card-grid {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 768px) {
            .card-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default CoreIntelligence;
