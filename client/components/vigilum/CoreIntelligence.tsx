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
  gravity: number;
  clausePairing: {
    clauseA: string;
    clauseB?: string;
    clauseC?: string;
    clauseD?: string;
    analysis: string;
    output: string;
    dgScore?: number;
    ciScore?: number;
    rtScore?: number;
    sbScore?: number;
  };
  logicClass: string;
}

const StructuralInterpretationMode = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const interpretiveZoneRef = useRef<HTMLDivElement>(null);
  const [hoveredCircle, setHoveredCircle] = useState<string | null>(null);
  const [selectedCircle, setSelectedCircle] = useState<CircleData | null>(null);
  const [interactionCount, setInteractionCount] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  const [showTypologyOverlay, setShowTypologyOverlay] = useState(false);
  const [centralGlyph, setCentralGlyph] = useState(0);
  const [clickedCircles, setClickedCircles] = useState<Set<string>>(new Set());
  const [logicClassesEngaged, setLogicClassesEngaged] = useState<Set<string>>(
    new Set(),
  );
  const [fieldStabilized, setFieldStabilized] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const navigate = useNavigate();

  const circleData: CircleData[] = [
    {
      id: "constraint",
      title: "Constraint Simulation",
      definition:
        "Rules may perform restriction while preserving override. Vigilum detects simulated constraint.",
      rule: "A constraint is real only if it binds across actors and time without dependent trigger.",
      example:
        "Clause: 'All deviations shall be reviewed within a reasonable timeframe.' — No timeframe, no escalation rule, no breach definition. Structurally open. Appears restrictive. Actually null.",
      animationType: "pulse",
      position: { x: 20, y: 25 },
      gravity: 0.6,
      logicClass: "Simulation",
      clausePairing: {
        clauseA:
          "The supplier must submit audited financial statements before disbursement.",
        clauseB:
          "Except where prior approval has been granted by the oversight committee.",
        analysis:
          "The clause performs constraint (submission required) but contains a pre-installed escape path via internal exception.",
        output: "Simulated boundary",
        dgScore: 0.86,
        ciScore: 0.91,
      },
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
      gravity: 0.4,
      logicClass: "Sequence",
      clausePairing: {
        clauseA: "Any sole-source procedure must be justified in advance.",
        clauseB:
          "Emergency cases may be regularized post hoc by internal memo.",
        analysis:
          "Scenario 1: A → B = strong constraint, later overridden. Scenario 2: B → A = emergency creates pre-justification, clause A becomes moot.",
        output: "Meaning reversed by order",
      },
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
      gravity: 0.5,
      logicClass: "Discretion",
      clausePairing: {
        clauseA:
          "The Contracting Authority may waive documentation requirements in exceptional cases.",
        analysis:
          "No definition of 'exceptional' • No oversight of waiver • No log requirement",
        output: "Discretional override without parameterization",
        dgScore: 0.92,
        sbScore: 1.0,
      },
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
      gravity: 0.8,
      logicClass: "Override",
      clausePairing: {
        clauseA: "Tender process must remain open for 30 calendar days.",
        clauseB: "This period may be shortened in accordance with Decree 14.",
        clauseC:
          "Shortened periods permissible when aligned with project timelines.",
        clauseD: "Timelines are defined internally by executing entity.",
        analysis:
          "Four-level override trace. Appears compliant — actually nullifies original constraint.",
        output: "Structured override path detected",
        ciScore: 0.96,
      },
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
      gravity: 0.8,
      logicClass: "Typology",
      clausePairing: {
        clauseA:
          "Price adjustments shall reflect regional inflation indexes, as calculated by the operator.",
        analysis:
          "RT (Risk Transfer) = 0.93 → Index chosen by vendor • DG = 0.71 → Adjustment frequency undefined • CI = 0.67 → Performance language used, no benchmarking",
        output: "High-risk vector along RT + DG",
        rtScore: 0.93,
        dgScore: 0.71,
        ciScore: 0.67,
      },
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
      gravity: 0.7,
      logicClass: "Bridge",
      clausePairing: {
        clauseA: "Termination is subject to national PPP regulations.",
        clauseB: "Projects may be terminated in cases of non-performance.",
        clauseC: "Performance lapses defined via quarterly assessments.",
        clauseD:
          "Quarterly assessments to be determined by project team discretion.",
        analysis:
          "Clause validity deferred across three documents — final condition determined by actor discretion",
        output: "Cross-document override with embedded DG",
      },
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
      gravity: 1.0,
      logicClass: "Collapse",
      clausePairing: {
        clauseA: "The Oversight Authority shall validate all disbursements.",
        clauseB: "Disbursement can be automated if validation has occurred.",
        clauseC: "Validation may be waived for recurring transactions.",
        clauseD:
          "Recurring transactions are defined by disbursement automation triggers.",
        analysis:
          "Loop forms: disbursement → automation → recurring → waiver → disbursement",
        output:
          "Circular reference collapse - Vigilum marks as semantic decoherence",
      },
    },
  ];

  const handleCircleHover = (circleId: string | null) => {
    setHoveredCircle(circleId);

    if (!circleId) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    // Halt all animations and dim other circles
    const circles =
      interpretiveZoneRef.current?.querySelectorAll(".circle-node");
    circles?.forEach((circle) => {
      if (circle.id !== `circle-${circleId}`) {
        // Pause animations and dim
        gsap.killTweensOf(circle);
        gsap.to(circle, { opacity: 0.3, scale: 0.95, duration: 0.3 });
      } else {
        // Halt this circle's animation and expand
        gsap.killTweensOf(circle);
        gsap.to(circle, { scale: 1.2, duration: 0.3, ease: "back.out(1.7)" });

        // Trigger specific hover animations based on type
        const circleDataItem = circleData.find((c) => c.id === circleId);
        if (circleDataItem) {
          triggerHoverAnimation(circle, circleDataItem.animationType);
        }
      }
    });
  };

  const handleCircleLeave = () => {
    setHoveredCircle(null);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    // Restore all circles and restart idle animations
    const circles =
      interpretiveZoneRef.current?.querySelectorAll(".circle-node");
    circles?.forEach((circle) => {
      gsap.to(circle, { opacity: 1, scale: 1, duration: 0.3 });

      // Restart idle animations
      const circleId = circle.id.replace("circle-", "");
      const circleDataItem = circleData.find((c) => c.id === circleId);
      if (circleDataItem) {
        restartIdleAnimation(circle, circleDataItem.animationType);
      }
    });
  };

  const triggerHoverAnimation = (element: Element, animationType: string) => {
    switch (animationType) {
      case "pulse":
        // Cage opens and snaps closed
        const cageLine = element.querySelector(".cage-line");
        if (cageLine) {
          gsap.to(cageLine, {
            strokeDashoffset: 20,
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
          });
        }
        break;
      case "orbital":
        // Stop rotation and reorder orbitals
        const orbital1 = element.querySelector(".orbital-1");
        const orbital2 = element.querySelector(".orbital-2");
        if (orbital1 && orbital2) {
          gsap.killTweensOf([orbital1, orbital2]);
          gsap.to(orbital1, { y: 12, duration: 0.4 });
          gsap.to(orbital2, { y: -12, duration: 0.4 });
        }
        break;
      case "flicker":
        // Ripple effect from center
        gsap.fromTo(
          element.querySelector(".perimeter"),
          { scale: 0.5, opacity: 1 },
          { scale: 1.2, opacity: 0, duration: 0.6, ease: "power2.out" },
        );
        break;
      case "override":
        // Show directional nullification line
        const overrideArc = element.querySelector(".override-arc");
        if (overrideArc) {
          gsap.to(overrideArc, {
            strokeWidth: 4,
            stroke: "rgba(255, 100, 100, 1)",
            duration: 0.3,
          });
        }
        break;
      case "projection":
        // Project beam outward
        const quad1 = element.querySelector(".quad-1");
        if (quad1) {
          gsap.to(
            [".quad-1", ".quad-2", ".quad-3", ".quad-4"].map((q) =>
              element.querySelector(q),
            ),
            {
              scale: 1.3,
              opacity: 0.8,
              duration: 0.4,
              stagger: 0.1,
            },
          );
        }
        break;
      case "overlap":
        // Venn circles blur then focus
        const circles = [".circle-a", ".circle-b", ".circle-c"].map((q) =>
          element.querySelector(q),
        );
        gsap.to(circles, {
          filter: "blur(2px)",
          duration: 0.2,
          yoyo: true,
          repeat: 1,
        });
        break;
      case "collapse":
        // Fractal folding animation
        gsap.to(element, {
          scale: 0.8,
          rotation: 15,
          duration: 0.4,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        });
        break;
    }
  };

  const restartIdleAnimation = (element: Element, animationType: string) => {
    // Restart the original idle animations based on type
    switch (animationType) {
      case "pulse":
        gsap.to(element, {
          scale: 1.08,
          duration: 2,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
        break;
      case "orbital":
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
      // Add other cases as needed
    }
  };

  const handleCircleClick = (circle: CircleData) => {
    setSelectedCircle(circle);

    // Update structural memory trace
    const newClickedCircles = new Set(clickedCircles);
    newClickedCircles.add(circle.id);
    setClickedCircles(newClickedCircles);

    const newLogicClasses = new Set(logicClassesEngaged);
    newLogicClasses.add(circle.logicClass);
    setLogicClassesEngaged(newLogicClasses);

    setInteractionCount((prev) => prev + 1);

    // Central glyph begins resolving after 2-3 interactions
    if (newLogicClasses.size >= 2) {
      setCentralGlyph(Math.min(newLogicClasses.size * 0.3, 0.8));
    }

    // Field gravitational stabilization after 3+ logic classes
    if (newLogicClasses.size >= 3) {
      setFieldStabilized(true);
      setShowCTA(true);
    }

    // Full semantic map rendered when all 7 clicked
    if (newClickedCircles.size === 7) {
      setCentralGlyph(1.0);
      setShowCTA(true);
    }
  };

  const handleModalClose = () => {
    setSelectedCircle(null);
  };

  const handleCircleHover = (circleId: string) => {
    setHoveredCircle(circleId);
  };

  const handleCircleLeave = () => {
    setHoveredCircle(null);
  };

  const handleCTAClick = () => {
    // Procedural exit sequence - structural collapse
    setIsCollapsing(true);

    // Central glyph fully resolves with φ(c) flash
    setCentralGlyph(1.0);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!prefersReducedMotion) {
      // Field slows and nodes lock in orbit
      const circles =
        interpretiveZoneRef.current?.querySelectorAll(".circle-node");
      circles?.forEach((circle) => {
        gsap.killTweensOf(circle);
        gsap.to(circle, { rotation: 0, duration: 1, ease: "power2.out" });
      });

      // Sequential collapse: Constraint → Sequence → Discretion → Override → Typological → Cross-document → Integrity
      const collapseOrder = [
        "constraint",
        "sequence",
        "discretion",
        "override",
        "typological",
        "crossdocument",
        "integrity",
      ];

      collapseOrder.forEach((circleId, index) => {
        setTimeout(() => {
          const element = document.getElementById(`circle-${circleId}`);
          if (element) {
            gsap.to(element, {
              scale: 0,
              opacity: 0,
              duration: 0.5,
              ease: "power2.in",
            });
          }
        }, index * 200);
      });

      // Final collapse and fade to SPE
      setTimeout(
        () => {
          navigate("/vigilum#demo");
        },
        collapseOrder.length * 200 + 1000,
      );
    } else {
      // Immediate transition for reduced motion
      setTimeout(() => navigate("/vigilum#demo"), 500);
    }
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
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                transform: "translate(-50%, -50%)",
                zIndex:
                  circle.gravity === 1.0 ? 10 : Math.floor(circle.gravity * 5),
                filter: hoveredCircle
                  ? hoveredCircle === circle.id
                    ? "none"
                    : "blur(2px)"
                  : circle.gravity > 0.7
                    ? "none"
                    : `blur(${(1 - circle.gravity) * 0.5}px)`,
                opacity: clickedCircles.has(circle.id)
                  ? Math.min(1, 0.6 + clickedCircles.size * 0.1)
                  : fieldStabilized && !clickedCircles.has(circle.id)
                    ? 0.4
                    : 1,
              }}
            >
              {/* Circle-specific SVG animations */}
              <svg width="60" height="60" style={{ position: "absolute" }}>
                {circle.animationType === "pulse" && (
                  // Constraint Simulation: Breathing cage
                  <>
                    <circle
                      cx="30"
                      cy="30"
                      r="25"
                      fill="rgba(255, 255, 255, 0.05)"
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth="1"
                    />
                    <circle
                      className="cage-line"
                      cx="30"
                      cy="30"
                      r="20"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.3)"
                      strokeWidth="1"
                      strokeDasharray="8,4"
                      strokeDashoffset="0"
                    />
                  </>
                )}

                {circle.animationType === "orbital" && (
                  // Sequence Dependency: Counter-rotating orbitals
                  <>
                    <circle
                      cx="30"
                      cy="30"
                      r="25"
                      fill="rgba(255, 255, 255, 0.05)"
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth="1"
                    />
                    <circle
                      className="orbital-1"
                      cx="30"
                      cy="18"
                      r="6"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.4)"
                      strokeWidth="1"
                    />
                    <circle
                      className="orbital-2"
                      cx="30"
                      cy="42"
                      r="6"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.4)"
                      strokeWidth="1"
                    />
                  </>
                )}

                {circle.animationType === "flicker" && (
                  // Discretion Encoding: Unstable perimeter
                  <>
                    <circle
                      cx="30"
                      cy="30"
                      r="25"
                      fill="rgba(255, 255, 255, 0.05)"
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth="1"
                    />
                    <circle
                      className="perimeter"
                      cx="30"
                      cy="30"
                      r="22"
                      fill="none"
                      stroke="rgba(255, 100, 100, 0.6)"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                  </>
                )}

                {circle.animationType === "override" && (
                  // Override Pathways: Arc intersection
                  <>
                    <circle
                      cx="30"
                      cy="30"
                      r="25"
                      fill="rgba(255, 255, 255, 0.05)"
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth="1"
                    />
                    <path
                      className="override-arc"
                      d="M 15 30 Q 30 15 45 30"
                      fill="none"
                      stroke="rgba(255, 200, 100, 0.7)"
                      strokeWidth="2"
                    />
                    <circle
                      className="pulse-point"
                      cx="30"
                      cy="22"
                      r="2"
                      fill="rgba(255, 200, 100, 0.8)"
                    />
                  </>
                )}

                {circle.animationType === "projection" && (
                  // Typological Projection: Four quadrants
                  <>
                    <circle
                      cx="30"
                      cy="30"
                      r="25"
                      fill="rgba(255, 255, 255, 0.05)"
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth="1"
                    />
                    <rect
                      className="quad-1"
                      x="12"
                      y="12"
                      width="8"
                      height="8"
                      fill="rgba(255, 100, 100, 0.3)"
                    />
                    <rect
                      className="quad-2"
                      x="40"
                      y="12"
                      width="8"
                      height="8"
                      fill="rgba(100, 255, 100, 0.3)"
                    />
                    <rect
                      className="quad-3"
                      x="12"
                      y="40"
                      width="8"
                      height="8"
                      fill="rgba(100, 100, 255, 0.3)"
                    />
                    <rect
                      className="quad-4"
                      x="40"
                      y="40"
                      width="8"
                      height="8"
                      fill="rgba(255, 255, 100, 0.3)"
                    />
                  </>
                )}

                {circle.animationType === "overlap" && (
                  // Cross-Document Logic: Venn diagram
                  <>
                    <circle
                      className="circle-a"
                      cx="25"
                      cy="25"
                      r="12"
                      fill="rgba(255, 100, 100, 0.2)"
                      stroke="rgba(255, 100, 100, 0.4)"
                      strokeWidth="1"
                    />
                    <circle
                      className="circle-b"
                      cx="35"
                      cy="25"
                      r="12"
                      fill="rgba(100, 255, 100, 0.2)"
                      stroke="rgba(100, 255, 100, 0.4)"
                      strokeWidth="1"
                    />
                    <circle
                      className="circle-c"
                      cx="30"
                      cy="35"
                      r="12"
                      fill="rgba(100, 100, 255, 0.2)"
                      stroke="rgba(100, 100, 255, 0.4)"
                      strokeWidth="1"
                    />
                  </>
                )}

                {circle.animationType === "collapse" && (
                  // Structural Integrity Loss: Jittery circle
                  <>
                    <circle
                      cx="30"
                      cy="30"
                      r="25"
                      fill="rgba(255, 255, 255, 0.05)"
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth="1"
                    />
                    <circle
                      cx="30"
                      cy="30"
                      r="18"
                      fill="none"
                      stroke="rgba(255, 150, 150, 0.4)"
                      strokeWidth="1"
                      strokeDasharray="4,2"
                    />
                  </>
                )}

                {/* Default fallback */}
                {![
                  "pulse",
                  "orbital",
                  "flicker",
                  "override",
                  "projection",
                  "overlap",
                  "collapse",
                ].includes(circle.animationType) && (
                  <circle
                    cx="30"
                    cy="30"
                    r="25"
                    fill="rgba(255, 255, 255, 0.05)"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="1"
                  />
                )}
              </svg>

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
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "20px",
                fontFamily: "monospace",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {selectedCircle.title}
            </h3>

            {/* Declarative Rule */}
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  color: "#00ffff",
                  fontSize: "12px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                DECLARATIVE RULE
              </div>
              <div
                style={{
                  color: "#f2f2f2",
                  fontSize: "14px",
                  lineHeight: "1.4",
                  fontFamily: "monospace",
                }}
              >
                {selectedCircle.rule}
              </div>
            </div>

            {/* Clause Simulation */}
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  color: "#00ffff",
                  fontSize: "12px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                CLAUSE SIMULATION
              </div>
              <div
                style={{
                  color: "#f2f2f2",
                  fontSize: "13px",
                  lineHeight: "1.4",
                  marginBottom: "8px",
                }}
              >
                <strong>A:</strong> {selectedCircle.clausePairing.clauseA}
              </div>
              {selectedCircle.clausePairing.clauseB && (
                <div
                  style={{
                    color: "#f2f2f2",
                    fontSize: "13px",
                    lineHeight: "1.4",
                    marginBottom: "8px",
                  }}
                >
                  <strong>B:</strong> {selectedCircle.clausePairing.clauseB}
                </div>
              )}
              {selectedCircle.clausePairing.clauseC && (
                <div
                  style={{
                    color: "#f2f2f2",
                    fontSize: "13px",
                    lineHeight: "1.4",
                    marginBottom: "8px",
                  }}
                >
                  <strong>C:</strong> {selectedCircle.clausePairing.clauseC}
                </div>
              )}
              {selectedCircle.clausePairing.clauseD && (
                <div
                  style={{
                    color: "#f2f2f2",
                    fontSize: "13px",
                    lineHeight: "1.4",
                    marginBottom: "8px",
                  }}
                >
                  <strong>D:</strong> {selectedCircle.clausePairing.clauseD}
                </div>
              )}
              <div
                style={{
                  color: "#a0a0a0",
                  fontSize: "12px",
                  lineHeight: "1.4",
                  marginTop: "12px",
                }}
              >
                → {selectedCircle.clausePairing.output}
              </div>
            </div>

            {/* Structural Diagram */}
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  color: "#00ffff",
                  fontSize: "12px",
                  fontWeight: "600",
                  marginBottom: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                STRUCTURAL DIAGRAM
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "80px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "4px",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                }}
              >
                <svg width="200" height="60" style={{ overflow: "visible" }}>
                  {selectedCircle.animationType === "override" && (
                    // Override arc diagram
                    <>
                      <path
                        d="M 40 30 Q 100 10 160 30"
                        fill="none"
                        stroke="rgba(255, 200, 100, 0.8)"
                        strokeWidth="2"
                        strokeDasharray="4,2"
                      />
                      <circle
                        cx="100"
                        cy="20"
                        r="3"
                        fill="rgba(255, 200, 100, 1)"
                      />
                      <text
                        x="100"
                        y="50"
                        textAnchor="middle"
                        fill="#a0a0a0"
                        fontSize="10"
                      >
                        Override Path
                      </text>
                    </>
                  )}
                  {selectedCircle.animationType === "projection" && (
                    // φ-space vector beam
                    <>
                      <line
                        x1="100"
                        y1="30"
                        x2="60"
                        y2="10"
                        stroke="rgba(255, 100, 100, 0.8)"
                        strokeWidth="2"
                      />
                      <line
                        x1="100"
                        y1="30"
                        x2="140"
                        y2="10"
                        stroke="rgba(100, 255, 100, 0.8)"
                        strokeWidth="2"
                      />
                      <line
                        x1="100"
                        y1="30"
                        x2="60"
                        y2="50"
                        stroke="rgba(100, 100, 255, 0.8)"
                        strokeWidth="2"
                      />
                      <line
                        x1="100"
                        y1="30"
                        x2="140"
                        y2="50"
                        stroke="rgba(255, 255, 100, 0.8)"
                        strokeWidth="2"
                      />
                      <circle
                        cx="100"
                        cy="30"
                        r="4"
                        fill="rgba(255, 255, 255, 0.8)"
                      />
                      <text
                        x="100"
                        y="55"
                        textAnchor="middle"
                        fill="#a0a0a0"
                        fontSize="10"
                      >
                        φ-space Vector
                      </text>
                    </>
                  )}
                  {selectedCircle.animationType === "overlap" && (
                    // Cross-document path
                    <>
                      <rect
                        x="20"
                        y="15"
                        width="40"
                        height="30"
                        fill="none"
                        stroke="rgba(255, 100, 100, 0.6)"
                        strokeWidth="1"
                      />
                      <rect
                        x="80"
                        y="15"
                        width="40"
                        height="30"
                        fill="none"
                        stroke="rgba(100, 255, 100, 0.6)"
                        strokeWidth="1"
                      />
                      <rect
                        x="140"
                        y="15"
                        width="40"
                        height="30"
                        fill="none"
                        stroke="rgba(100, 100, 255, 0.6)"
                        strokeWidth="1"
                      />
                      <path
                        d="M 60 30 L 80 30 M 120 30 L 140 30"
                        stroke="rgba(255, 255, 255, 0.5)"
                        strokeWidth="1"
                      />
                      <text
                        x="100"
                        y="55"
                        textAnchor="middle"
                        fill="#a0a0a0"
                        fontSize="10"
                      >
                        Cross-Document Path
                      </text>
                    </>
                  )}
                  {selectedCircle.animationType === "collapse" && (
                    // Recursive collapse
                    <>
                      <circle
                        cx="100"
                        cy="30"
                        r="20"
                        fill="none"
                        stroke="rgba(255, 150, 150, 0.6)"
                        strokeWidth="2"
                        strokeDasharray="8,4"
                      />
                      <circle
                        cx="100"
                        cy="30"
                        r="12"
                        fill="none"
                        stroke="rgba(255, 150, 150, 0.8)"
                        strokeWidth="1"
                        strokeDasharray="4,2"
                      />
                      <circle
                        cx="100"
                        cy="30"
                        r="6"
                        fill="none"
                        stroke="rgba(255, 150, 150, 1)"
                        strokeWidth="1"
                      />
                      <text
                        x="100"
                        y="55"
                        textAnchor="middle"
                        fill="#a0a0a0"
                        fontSize="10"
                      >
                        Recursive Collapse
                      </text>
                    </>
                  )}
                  {!["override", "projection", "overlap", "collapse"].includes(
                    selectedCircle.animationType,
                  ) && (
                    // Default structural pattern
                    <>
                      <circle
                        cx="100"
                        cy="30"
                        r="15"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.6)"
                        strokeWidth="2"
                      />
                      <circle
                        cx="100"
                        cy="30"
                        r="3"
                        fill="rgba(255, 255, 255, 0.8)"
                      />
                      <text
                        x="100"
                        y="55"
                        textAnchor="middle"
                        fill="#a0a0a0"
                        fontSize="10"
                      >
                        Structural Pattern
                      </text>
                    </>
                  )}
                </svg>
              </div>
            </div>

            {/* Risk Scores */}
            {(selectedCircle.clausePairing.dgScore ||
              selectedCircle.clausePairing.ciScore ||
              selectedCircle.clausePairing.rtScore) && (
              <div style={{ marginBottom: "20px" }}>
                <div
                  style={{
                    color: "#00ffff",
                    fontSize: "12px",
                    fontWeight: "600",
                    marginBottom: "8px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  RISK VECTORIZATION
                </div>
                <div style={{ display: "flex", gap: "16px", fontSize: "12px" }}>
                  {selectedCircle.clausePairing.dgScore && (
                    <span style={{ color: "#f2f2f2" }}>
                      DG:{" "}
                      <span style={{ color: "#ff6b6b" }}>
                        {selectedCircle.clausePairing.dgScore}
                      </span>
                    </span>
                  )}
                  {selectedCircle.clausePairing.ciScore && (
                    <span style={{ color: "#f2f2f2" }}>
                      CI:{" "}
                      <span style={{ color: "#4ecdc4" }}>
                        {selectedCircle.clausePairing.ciScore}
                      </span>
                    </span>
                  )}
                  {selectedCircle.clausePairing.rtScore && (
                    <span style={{ color: "#f2f2f2" }}>
                      RT:{" "}
                      <span style={{ color: "#45b7d1" }}>
                        {selectedCircle.clausePairing.rtScore}
                      </span>
                    </span>
                  )}
                  {selectedCircle.clausePairing.sbScore && (
                    <span style={{ color: "#f2f2f2" }}>
                      SB:{" "}
                      <span style={{ color: "#ffa726" }}>
                        {selectedCircle.clausePairing.sbScore}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            )}

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
