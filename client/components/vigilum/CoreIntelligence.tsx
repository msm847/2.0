import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface CircleData {
  id: string;
  title: string;
  definition: string;
  rule: string;
  example: string;
  animationType: string;
  position: { x: number; y: number };
}

const StructuralInterpretationMode = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const interpretiveZoneRef = useRef<HTMLDivElement>(null);
  const [hoveredCircle, setHoveredCircle] = useState<string | null>(null);
  const [selectedCircle, setSelectedCircle] = useState<CircleData | null>(null);
  const [interactionCount, setInteractionCount] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  const navigate = useNavigate();

  const circleData: CircleData[] = [
    {
      id: "constraint",
      title: "Constraint Simulation",
      definition:
        "Rules may perform restriction while preserving override. Vigilum detects simulated constraint.",
      rule: "A constraint is real only if it binds across actors and time without dependent trigger. Otherwise, it simulates legality.",
      example:
        "Clause: 'All deviations shall be reviewed within a reasonable timeframe.' — No timeframe, no escalation rule, no breach definition. Structurally open. Appears restrictive. Actually null.",
      animationType: "pulse",
      position: { x: 20, y: 25 },
    },
    {
      id: "sequence",
      title: "Sequence Dependency",
      definition:
        "Clause order is not neutral. A → B ≠ B → A. Sequence determines structural output.",
      rule: "Structural output depends on clause order. Reversing order can transform legality into exposure.",
      example:
        "Clause 3.2: 'No contract shall be awarded without public tender.' Clause 3.5: 'In emergencies, tender may be bypassed.' — B following A = restriction nullified.",
      animationType: "orbital",
      position: { x: 75, y: 15 },
    },
    {
      id: "discretion",
      title: "Discretion Encoding",
      definition:
        "Legal texts often encode zones of human override. Vigilum scores such embedded discretion.",
      rule: "Discretion embedded without parameters encodes pre-structured collapse.",
      example:
        "'Unless deemed unnecessary by the Minister.' → Appears functional. Actually routes authority to a non-verifiable override. No logic path to escalate refusal.",
      animationType: "flicker",
      position: { x: 15, y: 70 },
    },
    {
      id: "override",
      title: "Override Pathways",
      definition:
        "Some clauses nullify others silently through reference, exemption, or procedural precedence.",
      rule: "Control is overwritten not by breach — but by structural exemption chains.",
      example:
        "Clause 2.1: 'Contracting shall occur through public process.' Clause 2.9: 'This requirement may be waived under Article 9.' → Three-hop override. Fully legal. Structurally exposed.",
      animationType: "override",
      position: { x: 80, y: 65 },
    },
    {
      id: "typological",
      title: "Typological Projection",
      definition:
        "Each clause is embedded in a multidimensional risk space: DG, RT, CI, SB.",
      rule: "Clauses are not types. They are vectors with structural behavior across systems.",
      example:
        "Clause: 'Payments indexed to inflation, adjusted quarterly by operator's internal metric.' → High RT: risk transferred to private actor → Moderate DG: adjustment clause unbounded",
      animationType: "projection",
      position: { x: 50, y: 45 },
    },
    {
      id: "crossdocument",
      title: "Cross-Document Logic",
      definition:
        "Risk is not in one text. It emerges from clause interaction across law, contract, policy.",
      rule: "No document exists alone. Clause meaning is defined by adjacent legal architecture.",
      example:
        "Contract Clause: 'Subject to Public Procurement Law' → Procurement Law: 'Exceptions apply during natural disaster' → PPP Manual: 'Fiscal crises are equivalent to disaster' → Full procedural override hidden across three texts.",
      animationType: "overlap",
      position: { x: 25, y: 50 },
    },
    {
      id: "integrity",
      title: "Structural Integrity Loss",
      definition:
        "Systems collapse when clause interactions loop, contradict, or flatten meaning.",
      rule: "When all clause logic collapses into contradiction or recursion, structural meaning dissolves. Form survives. Constraint does not.",
      example:
        "Clause 4.1: 'Subject to provisions of Clause 7.1' → Clause 7.1: 'Implemented as per Clause 4.1' → Circular recursion = no executable state. Appears legal. Systemically incoherent.",
      animationType: "collapse",
      position: { x: 70, y: 80 },
    },
  ];

  const handleCircleHover = (circleId: string | null) => {
    setHoveredCircle(circleId);

    if (!circleId) return;

    // Dim other circles
    const circles =
      interpretiveZoneRef.current?.querySelectorAll(".circle-node");
    circles?.forEach((circle) => {
      if (circle.id !== `circle-${circleId}`) {
        gsap.to(circle, { opacity: 0.3, duration: 0.3 });
      } else {
        gsap.to(circle, { scale: 1.15, duration: 0.3 });
      }
    });
  };

  const handleCircleLeave = () => {
    setHoveredCircle(null);

    // Restore all circles
    const circles =
      interpretiveZoneRef.current?.querySelectorAll(".circle-node");
    circles?.forEach((circle) => {
      gsap.to(circle, { opacity: 1, scale: 1, duration: 0.3 });
    });
  };

  const handleCircleClick = (circle: CircleData) => {
    setSelectedCircle(circle);
    setInteractionCount((prev) => prev + 1);

    // Show CTA after 2-3 interactions
    if (interactionCount >= 1) {
      setShowCTA(true);
    }
  };

  const handleModalClose = () => {
    setSelectedCircle(null);
  };

  const handleCTAClick = () => {
    // Navigate to SPE interface
    navigate("/vigilum#demo");
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!prefersReducedMotion && interpretiveZoneRef.current) {
      // Initialize sophisticated circle animations
      circleData.forEach((circle) => {
        const element = document.getElementById(`circle-${circle.id}`);
        if (!element) return;

        switch (circle.animationType) {
          case "pulse":
            // Constraint Simulation: Breathing cage effect
            gsap.to(element, {
              scale: 1.08,
              duration: 2,
              ease: "power2.inOut",
              repeat: -1,
              yoyo: true,
            });
            // Add cage line effect
            gsap.to(element.querySelector(".cage-line"), {
              strokeDashoffset: 0,
              duration: 3,
              ease: "power2.inOut",
              repeat: -1,
              yoyo: true,
            });
            break;

          case "orbital":
            // Sequence Dependency: Counter-rotating orbitals
            gsap.to(element.querySelector(".orbital-1"), {
              rotation: 360,
              duration: 4,
              ease: "none",
              repeat: -1,
            });
            gsap.to(element.querySelector(".orbital-2"), {
              rotation: -360,
              duration: 3,
              ease: "none",
              repeat: -1,
            });
            break;

          case "flicker":
            // Discretion Encoding: Unstable perimeter
            gsap.to(element.querySelector(".perimeter"), {
              opacity: 0.3,
              duration: 0.4,
              ease: "power2.inOut",
              repeat: -1,
              yoyo: true,
              repeatDelay: Math.random() * 2,
            });
            break;

          case "override":
            // Override Pathways: Arc intersection with pulse
            gsap.to(element.querySelector(".override-arc"), {
              rotation: 45,
              duration: 2,
              ease: "power2.inOut",
              repeat: -1,
              yoyo: true,
            });
            gsap.to(element.querySelector(".pulse-point"), {
              scale: 1.5,
              opacity: 0.8,
              duration: 1,
              ease: "power2.inOut",
              repeat: -1,
              yoyo: true,
            });
            break;

          case "projection":
            // Typological Projection: Quadrant splitting
            gsap.to(element.querySelector(".quad-1"), {
              x: -5,
              y: -5,
              duration: 2,
              ease: "power2.inOut",
              repeat: -1,
              yoyo: true,
            });
            gsap.to(element.querySelector(".quad-2"), {
              x: 5,
              y: -5,
              duration: 2,
              ease: "power2.inOut",
              repeat: -1,
              yoyo: true,
              delay: 0.5,
            });
            gsap.to(element.querySelector(".quad-3"), {
              x: -5,
              y: 5,
              duration: 2,
              ease: "power2.inOut",
              repeat: -1,
              yoyo: true,
              delay: 1,
            });
            gsap.to(element.querySelector(".quad-4"), {
              x: 5,
              y: 5,
              duration: 2,
              ease: "power2.inOut",
              repeat: -1,
              yoyo: true,
              delay: 1.5,
            });
            break;

          case "overlap":
            // Cross-Document Logic: Venn diagram breathing
            gsap.to(element.querySelector(".circle-a"), {
              scale: 1.1,
              duration: 2.5,
              ease: "power2.inOut",
              repeat: -1,
              yoyo: true,
            });
            gsap.to(element.querySelector(".circle-b"), {
              scale: 1.05,
              duration: 2,
              ease: "power2.inOut",
              repeat: -1,
              yoyo: true,
              delay: 0.5,
            });
            gsap.to(element.querySelector(".circle-c"), {
              scale: 1.08,
              duration: 1.8,
              ease: "power2.inOut",
              repeat: -1,
              yoyo: true,
              delay: 1,
            });
            break;

          case "collapse":
            // Structural Integrity Loss: Subtle jitter with fractal potential
            gsap.to(element, {
              x: "+=2",
              y: "+=1",
              duration: 0.1,
              ease: "power2.inOut",
              repeat: -1,
              yoyo: true,
              repeatDelay: Math.random() * 5,
            });
            break;

          default:
            // Ambient drift
            gsap.to(element, {
              y: "+=3",
              duration: 4,
              ease: "power2.inOut",
              repeat: -1,
              yoyo: true,
            });
        }
      });

      // Entrance animation with stagger
      gsap.fromTo(
        ".circle-node",
        { opacity: 0, scale: 0.3, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Ambient field drift
      gsap.to(".interpretive-zone", {
        backgroundPosition: "100px 100px",
        duration: 20,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      id="structural-interpretation"
      style={{
        backgroundColor: "#0a0a0a",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <div className="container mx-auto px-4 py-20">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl font-bold mb-4 font-mono tracking-tight"
            style={{
              color: "#f2f2f2",
              textShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
            }}
          >
            STRUCTURAL INTERPRETATION MODE
          </h2>
          <p
            className="text-xl font-light max-w-3xl mx-auto"
            style={{ color: "#a0a0a0" }}
          >
            Seven semantic units. One cognitive recompiler.
          </p>
        </div>

        {/* Interpretive Zone */}
        <div
          ref={interpretiveZoneRef}
          className="interpretive-zone"
          style={{
            width: "70%",
            height: "500px",
            margin: "0 auto",
            position: "relative",
            background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          {circleData.map((circle) => (
            <div
              key={circle.id}
              id={`circle-${circle.id}`}
              className="circle-node"
              onMouseEnter={() => handleCircleHover(circle.id)}
              onMouseLeave={handleCircleLeave}
              onClick={() => handleCircleClick(circle)}
              style={{
                position: "absolute",
                left: `${circle.position.x}%`,
                top: `${circle.position.y}%`,
                width: "60px",
                height: "60px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Circle specific animations */}
              {circle.animationType === "orbital" && (
                <>
                  <div
                    className="orbital-1"
                    style={{
                      position: "absolute",
                      width: "20px",
                      height: "20px",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      borderRadius: "50%",
                      top: "10px",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  />
                  <div
                    className="orbital-2"
                    style={{
                      position: "absolute",
                      width: "20px",
                      height: "20px",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      borderRadius: "50%",
                      bottom: "10px",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  />
                </>
              )}

              {/* Hover text */}
              {hoveredCircle === circle.id && (
                <div
                  style={{
                    position: "absolute",
                    left: "70px",
                    top: "-20px",
                    background: "rgba(0, 0, 0, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    minWidth: "250px",
                    zIndex: 10,
                  }}
                >
                  <div
                    style={{
                      color: "#f2f2f2",
                      fontSize: "14px",
                      fontWeight: "600",
                      marginBottom: "4px",
                      fontFamily: "monospace",
                    }}
                  >
                    {circle.title}
                  </div>
                  <div
                    style={{
                      color: "#a0a0a0",
                      fontSize: "12px",
                      lineHeight: "1.4",
                    }}
                  >
                    {circle.definition}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        {showCTA && (
          <div className="text-center mt-16">
            <div
              style={{
                color: "#00ffff",
                fontSize: "14px",
                fontFamily: "monospace",
                marginBottom: "12px",
              }}
            >
              Structural Interpretation Mode: Active
            </div>
            <div
              style={{
                color: "#a0a0a0",
                fontSize: "12px",
                marginBottom: "20px",
              }}
            >
              You are now aligned with Vigilum's logic resolution.
            </div>
            <button
              onClick={handleCTAClick}
              style={{
                background: "rgba(0, 255, 255, 0.1)",
                border: "1px solid #00ffff",
                borderRadius: "8px",
                padding: "12px 24px",
                color: "#00ffff",
                fontFamily: "monospace",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0, 255, 255, 0.2)";
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(0, 255, 255, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0, 255, 255, 0.1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              → ENTER STRUCTURAL PROCESSING ENVIRONMENT
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedCircle && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={handleModalClose}
        >
          <div
            style={{
              background: "#1a1a1a",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              padding: "32px",
              maxWidth: "600px",
              width: "100%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              style={{
                color: "#f2f2f2",
                fontSize: "24px",
                fontWeight: "600",
                marginBottom: "16px",
                fontFamily: "monospace",
              }}
            >
              {selectedCircle.title}
            </h3>

            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  color: "#00ffff",
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                FORMAL RULE
              </div>
              <div
                style={{
                  color: "#f2f2f2",
                  fontSize: "14px",
                  lineHeight: "1.5",
                }}
              >
                {selectedCircle.rule}
              </div>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  color: "#00ffff",
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                STRUCTURAL EXAMPLE
              </div>
              <div
                style={{
                  color: "#a0a0a0",
                  fontSize: "13px",
                  lineHeight: "1.5",
                }}
              >
                {selectedCircle.example}
              </div>
            </div>

            <button
              onClick={handleModalClose}
              style={{
                background: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "6px",
                padding: "8px 16px",
                color: "#a0a0a0",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StructuralInterpretationMode;
