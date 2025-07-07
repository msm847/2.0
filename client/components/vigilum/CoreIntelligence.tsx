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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const navigate = useNavigate();

  const circleData: CircleData[] = [
    {
      id: "constraint",
      title: "Constraint Simulation",
      definition: "Appears restrictive, structurally inert",
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
      definition: "Clause order alters legal outcome",
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
      definition: "Authority routed into undefined thresholds",
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
      definition: "Nullification embedded in downstream chains",
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
      definition: "Clause as vector across structural risk space",
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
      definition: "Meaning emerges across legal strata",
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
      definition: "Clause logic collapses into semantic noise",
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
          "Loop forms: disbursement → automation → recurring �� waiver → disbursement",
        output:
          "Circular reference collapse - Vigilum marks as semantic decoherence",
      },
    },
  ];

  const handleCircleHover = (circleId: string) => {
    setHoveredCircle(circleId);

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

    // Reset hover animations and restore all circles
    const circles =
      interpretiveZoneRef.current?.querySelectorAll(".circle-node");
    circles?.forEach((circle) => {
      gsap.to(circle, { opacity: 1, scale: 1, duration: 0.3 });

      // Reset specific hover animations
      const circleId = circle.id.replace("circle-", "");
      const circleDataItem = circleData.find((c) => c.id === circleId);
      if (circleDataItem) {
        resetHoverAnimation(circle, circleDataItem.animationType);
        restartIdleAnimation(circle, circleDataItem.animationType);
      }
    });
  };

  const triggerHoverAnimation = (element: Element, animationType: string) => {
    switch (animationType) {
      case "pulse":
        // CONSTRAINT SIMULATION: Cage bar retracts, creating gap, then reseals
        const cageSegments = element.querySelectorAll(".cage-segment");
        if (cageSegments.length > 0) {
          // Retract one segment (simulate breach)
          const targetSegment = cageSegments[6] || cageSegments[0];
          gsap
            .timeline()
            .to(targetSegment, {
              opacity: 0,
              duration: 0.4,
              ease: "cubic.inOut",
            })
            .to(targetSegment, {
              opacity: 1,
              duration: 0.4,
              ease: "cubic.inOut",
              delay: 0.2,
            });
        }
        break;

      case "orbital":
        // SEQUENCE DEPENDENCY: Reverse rotation and flip directional arrow
        const orbital1 = element.querySelector(".orbital-1");
        const orbital2 = element.querySelector(".orbital-2");
        const arrow = element.querySelector(".sequence-arrow");

        if (orbital1 && orbital2 && arrow) {
          gsap.killTweensOf([orbital1, orbital2]);

          // Reverse rotation direction
          gsap.to([orbital1, orbital2], {
            rotation: "-=120",
            duration: 0.6,
            ease: "cubic.inOut",
          });

          // Flip arrow and move closer to center
          gsap
            .timeline()
            .to(arrow, {
              opacity: 0,
              duration: 0.25,
              ease: "cubic.inOut",
            })
            .set(arrow, {
              attr: { d: "M 32 30 L 41 30 M 39 27 L 41 30 L 39 33" },
              scaleX: -1,
              x: -6,
            })
            .to(arrow, {
              opacity: 0.8,
              duration: 0.25,
              ease: "cubic.inOut",
            });
        }
        break;

      case "flicker":
        // DISCRETION ENCODING: Hide axis, keep dot visible, restore pulsating ripple
        const coordinateGrid = element.querySelector(".coordinate-grid");
        const axisDot = element.querySelector(".axis-dot");
        const rippleCenter = element.querySelector(".ripple-center");

        if (coordinateGrid && axisDot && rippleCenter) {
          // Hide grid
          gsap.to(coordinateGrid, {
            opacity: 0,
            duration: 0.3,
            ease: "cubic.inOut",
          });
          // Keep dot visible and slightly enlarged
          gsap.to(axisDot, {
            scale: 1.2,
            opacity: 1,
            duration: 0.3,
            ease: "cubic.inOut",
          });
          // Restore original pulsating ripple effect
          gsap.fromTo(
            rippleCenter,
            {
              scale: 0,
              opacity: 0.6,
            },
            {
              scale: 0.6,
              opacity: 0,
              duration: 0.5,
              ease: "sine.out",
              repeat: -1,
              repeatDelay: 0.4,
            },
          );
        }
        break;

      case "override":
        // OVERRIDE PATHWAYS: Arc moves outward to intersect ring
        const overrideArc = element.querySelector(".override-arc");
        const ring = element.querySelector(".base-ring");
        const intersection = element.querySelector(".intersection-point");

        if (overrideArc && intersection) {
          gsap
            .timeline()
            .to(overrideArc, {
              opacity: 0.8,
              duration: 0.3,
              ease: "cubic.inOut",
            })
            .to(
              overrideArc,
              {
                attr: { d: "M 15 30 Q 30 10 45 30" },
                duration: 0.6,
                ease: "cubic.inOut",
              },
              0.1,
            )
            .to(
              intersection,
              {
                opacity: 0.6,
                scale: 1.5,
                duration: 0.3,
                ease: "cubic.inOut",
              },
              0.4,
            );
        }
        break;

      case "projection":
        // TYPOLOGICAL PROJECTION: Show projection beam on hover
        const beam = element.querySelector(".projection-beam");

        if (beam) {
          gsap.to(beam, {
            opacity: 0.8,
            duration: 0.3,
            ease: "cubic.inOut",
          });
        }
        break;

      case "overlap":
        // CROSS-DOCUMENT LOGIC: Hide Venn diagram, show intersection-only
        const vennDiagram = element.querySelector(".venn-diagram");
        const intersectionOnly = element.querySelector(".intersection-only");

        if (vennDiagram && intersectionOnly) {
          gsap
            .timeline()
            .to(vennDiagram, {
              opacity: 0,
              duration: 0.3,
              ease: "cubic.inOut",
            })
            .to(
              intersectionOnly,
              {
                opacity: 1,
                duration: 0.4,
                ease: "cubic.inOut",
              },
              0.1,
            );
        }
        break;

      case "collapse":
        // STRUCTURAL INTEGRITY LOSS: Hide circle, show 8 break lines
        const integrityCircle = element.querySelector(".integrity-circle");
        const breakLines = element.querySelector(".break-lines");

        if (integrityCircle && breakLines) {
          gsap
            .timeline()
            .to(integrityCircle, {
              opacity: 0,
              duration: 0.3,
              ease: "cubic.inOut",
            })
            .to(
              breakLines,
              {
                opacity: 1,
                duration: 0.5,
                ease: "cubic.inOut",
              },
              0.2,
            );
        }
        break;
    }
  };

  const resetHoverAnimation = (element: Element, animationType: string) => {
    // Reset all hover animations back to base state
    switch (animationType) {
      case "pulse":
        const cageSegments = element.querySelectorAll(".cage-segment");
        gsap.killTweensOf(cageSegments);
        gsap.to(cageSegments, {
          opacity: 1,
          duration: 0.3,
          ease: "cubic.inOut",
        });
        break;

      case "orbital":
        const orbital1 = element.querySelector(".orbital-1");
        const orbital2 = element.querySelector(".orbital-2");
        const arrow = element.querySelector(".sequence-arrow");

        if (orbital1 && orbital2 && arrow) {
          gsap.killTweensOf([orbital1, orbital2, arrow]);
          gsap.to(arrow, {
            opacity: 0.8,
            scaleX: 1,
            x: 0,
            attr: { d: "M 19 30 L 28 30 M 25 27 L 28 30 L 25 33" },
            duration: 0.3,
            ease: "cubic.inOut",
          });
        }
        break;

      case "flicker":
        const coordinateGrid = element.querySelector(".coordinate-grid");
        const axisDot = element.querySelector(".axis-dot");
        const rippleCenter = element.querySelector(".ripple-center");

        if (coordinateGrid && axisDot && rippleCenter) {
          gsap.killTweensOf([coordinateGrid, axisDot, rippleCenter]);
          // Restore grid
          gsap.to(coordinateGrid, {
            opacity: 0.4,
            duration: 0.3,
            ease: "cubic.inOut",
          });
          // Reset dot to normal size
          gsap.to(axisDot, {
            scale: 1,
            opacity: 0.8,
            duration: 0.3,
            ease: "cubic.inOut",
          });
          // Stop ripple animation
          gsap.set(rippleCenter, { opacity: 0, scale: 0 });
        }
        break;

      case "override":
        const overrideArc = element.querySelector(".override-arc");
        const intersection = element.querySelector(".intersection-point");

        if (overrideArc && intersection) {
          gsap.killTweensOf([overrideArc, intersection]);
          gsap.to(overrideArc, {
            opacity: 0.4,
            attr: { d: "M 20 30 Q 30 20 40 30" },
            duration: 0.3,
            ease: "cubic.inOut",
          });
          gsap.to(intersection, {
            opacity: 0,
            scale: 1,
            duration: 0.3,
            ease: "cubic.inOut",
          });
        }
        break;

      case "projection":
        // TYPOLOGICAL PROJECTION: Hide projection beam when hover ends
        const beam = element.querySelector(".projection-beam");

        if (beam) {
          gsap.killTweensOf(beam);
          gsap.to(beam, {
            opacity: 0,
            duration: 0.3,
            ease: "cubic.inOut",
          });
        }
        break;

      case "overlap":
        const vennDiagram = element.querySelector(".venn-diagram");
        const intersectionOnly = element.querySelector(".intersection-only");

        if (vennDiagram && intersectionOnly) {
          gsap.killTweensOf([vennDiagram, intersectionOnly]);
          gsap.to(vennDiagram, {
            opacity: 1,
            duration: 0.3,
            ease: "cubic.inOut",
          });
          gsap.to(intersectionOnly, {
            opacity: 0,
            duration: 0.3,
            ease: "cubic.inOut",
          });
        }
        break;

      case "collapse":
        const integrityCircle = element.querySelector(".integrity-circle");
        const breakLines = element.querySelector(".break-lines");

        if (integrityCircle && breakLines) {
          gsap.killTweensOf([integrityCircle, breakLines]);
          gsap.to(integrityCircle, {
            opacity: 1,
            duration: 0.3,
            ease: "cubic.inOut",
          });
          gsap.to(breakLines, {
            opacity: 0,
            duration: 0.3,
            ease: "cubic.inOut",
          });
        }
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
    // Set up reduced motion preference detection
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    const prefersReducedMotionValue = mediaQuery.matches;

    if (!prefersReducedMotionValue && interpretiveZoneRef.current) {
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
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      id="structural-interpretation"
      style={{
        backgroundColor: "#0b1e16",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <div className="container mx-auto px-4 py-20">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            className="font-mono text-5xl mb-8"
            style={{
              color: "#C9D2DC",
              fontWeight: "400",
              letterSpacing: "0.02em",
              lineHeight: "1.4",
            }}
          >
            STRUCTURAL INTERPRETATION MODE
          </h2>
        </div>

        {/* Cognitive Recompiler Interface */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 400px 1fr",
            gap: "60px",
            alignItems: "center",
            minHeight: "60vh",
            marginBottom: "40px",
          }}
        >
          {/* Left Column: Threshold Declaration */}
          <div style={{ justifySelf: "end", maxWidth: "320px" }}>
            <div
              className="font-mono text-sm mb-6"
              style={{
                color: "#9AA4B0",
                fontWeight: "400",
                lineHeight: "1.5",
              }}
            >
              Pre-simulation logic field
            </div>
            <div
              className="font-mono text-xs mb-6"
              style={{
                color: "#7A8794",
                fontWeight: "400",
                lineHeight: "1.6",
              }}
            >
              You are entering the cognition layer.
              <br />
              Vigilum does not display corruption.
              <br />
              It renders legality as a machine — a sequence of clause operators
              that simulate compliance while nullifying constraint.
            </div>
            <div
              className="font-mono text-xs mb-4"
              style={{
                color: "#6B7684",
                fontWeight: "400",
                lineHeight: "1.6",
              }}
            >
              These seven units are not icons.
              <br />
              They are semantic operators — minimal logic gates used to
              precondition your interpretive system before simulation.
              <br />
              Each one expresses a failure condition: a way the law survives
              formally while collapsing structurally.
            </div>
            <div
              className="font-mono text-xs"
              style={{
                color: "#5A6470",
                fontWeight: "400",
                lineHeight: "1.6",
              }}
            >
              This is not an explainer.
              <br />
              It is a compiler — a final re-alignment layer.
              <br />
              Hover to see logic.
              <br />
              Click to enter structure.
              <br />
              Once three operators are understood, Vigilum will unlock
              simulation.
            </div>
          </div>

          {/* Center: Interactive Node Field */}
          <div style={{ position: "relative", justifySelf: "center" }}>
            <div
              ref={interpretiveZoneRef}
              className="interpretive-zone"
              style={{
                width: "400px",
                height: "400px",
                position: "relative",
                background:
                  logicClassesEngaged.size >= 3
                    ? "linear-gradient(135deg, #0a1d15 0%, #1f3f31 100%)"
                    : "linear-gradient(135deg, #0b1e16 0%, #224436 100%)",
                borderRadius: "8px",
                border:
                  logicClassesEngaged.size >= 3
                    ? "1px solid rgba(0, 255, 204, 0.2)"
                    : "1px solid rgba(0, 255, 204, 0.1)",
                transition:
                  "background 0.8s ease-out, border-color 0.8s ease-out",
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
                    transition:
                      hoveredCircle === circle.id
                        ? "box-shadow 0.3s ease-out, all 0.3s ease"
                        : "all 0.3s ease",
                    transform: "translate(-50%, -50%)",
                    zIndex:
                      circle.gravity === 1.0
                        ? 10
                        : Math.floor(circle.gravity * 5),
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
                    // Semantic shadow system with gravity-based variations
                    boxShadow:
                      hoveredCircle === circle.id
                        ? // Hover state: elevated semantic focus
                          `0px 8px 20px rgba(0, 0, 0, 0.5), inset 0px 0px 3px rgba(255, 255, 255, 0.08)`
                        : // Idle state: gravity-based depth variations
                          circle.gravity === 1.0
                          ? `0px 2px 16px rgba(0, 0, 0, 0.45), inset 0px 0px 2px rgba(255, 255, 255, 0.05)` // Structural Integrity Loss
                          : circle.gravity >= 0.8
                            ? `0px 4px 12px rgba(0, 0, 0, 0.4), inset 0px 0px 2px rgba(255, 255, 255, 0.05)` // Override/Typological
                            : circle.gravity >= 0.7
                              ? `0px 5px 14px rgba(0, 0, 0, 0.35), inset 0px 0px 2px rgba(255, 255, 255, 0.05)` // Cross-Document
                              : circle.gravity >= 0.6
                                ? `0px 4px 10px rgba(0, 0, 0, 0.3), inset 0px 0px 2px rgba(255, 255, 255, 0.05)` // Constraint
                                : circle.gravity >= 0.5
                                  ? `0px 3px 8px rgba(0, 0, 0, 0.28), inset 0px 0px 2px rgba(255, 255, 255, 0.05)` // Discretion
                                  : `0px 3px 10px rgba(0, 0, 0, 0.3), inset 0px 0px 2px rgba(255, 255, 255, 0.05)`, // Sequence
                    // Ambient shadow oscillation animation (disabled for reduced motion)
                    animation: prefersReducedMotion
                      ? "none"
                      : "shadowWander 8s ease-in-out infinite",
                  }}
                >
                  {/* Circle-specific SVG animations */}
                  <svg
                    width="60"
                    height="60"
                    style={{
                      position: "absolute",
                      overflow: "hidden",
                      contain: "layout paint style",
                    }}
                  >
                    {circle.animationType === "pulse" && (
                      // Constraint Simulation: Cage with retractable segments
                      <>
                        <circle
                          cx="30"
                          cy="30"
                          r="25"
                          fill="rgba(32, 36, 43, 0.1)"
                          stroke="rgba(32, 36, 43, 0.2)"
                          strokeWidth="1.2"
                        />
                        {/* 24 radial cage segments */}
                        {Array.from({ length: 24 }, (_, i) => {
                          const angle = i * 15 * (Math.PI / 180);
                          const x1 = 30 + 18 * Math.cos(angle);
                          const y1 = 30 + 18 * Math.sin(angle);
                          const x2 = 30 + 22 * Math.cos(angle);
                          const y2 = 30 + 22 * Math.sin(angle);
                          return (
                            <line
                              key={i}
                              className="cage-segment"
                              x1={x1}
                              y1={y1}
                              x2={x2}
                              y2={y2}
                              stroke="rgba(46, 51, 60, 0.8)"
                              strokeWidth="1.2"
                            />
                          );
                        })}
                      </>
                    )}

                    {circle.animationType === "orbital" && (
                      // Sequence Dependency: Orbital nodes with directional arrow
                      <>
                        <circle
                          cx="30"
                          cy="30"
                          r="25"
                          fill="rgba(32, 36, 43, 0.1)"
                          stroke="rgba(32, 36, 43, 0.2)"
                          strokeWidth="1"
                        />
                        <g style={{ transformOrigin: "30px 30px" }}>
                          <circle
                            className="orbital-1"
                            cx="30"
                            cy="12"
                            r="3"
                            fill="rgba(153, 170, 184, 0.8)"
                            stroke="rgba(108, 129, 149, 0.6)"
                            strokeWidth="1"
                          />
                          <circle
                            className="orbital-2"
                            cx="30"
                            cy="48"
                            r="3"
                            fill="rgba(153, 170, 184, 0.6)"
                            stroke="rgba(108, 129, 149, 0.4)"
                            strokeWidth="1"
                          />
                          {/* Directional arrow - 150% scale permanent */}
                          <path
                            className="sequence-arrow"
                            d="M 19 30 L 28 30 M 25 27 L 28 30 L 25 33"
                            fill="none"
                            stroke="rgba(108, 129, 149, 0.8)"
                            strokeWidth="2.25"
                            strokeLinecap="round"
                            opacity="0.8"
                            style={{ transformOrigin: "23.5px 30px" }}
                          />
                        </g>
                      </>
                    )}

                    {circle.animationType === "flicker" && (
                      // Discretion Encoding: Dot on xy-grid with pulsating ripple overlay
                      <>
                        <circle
                          cx="30"
                          cy="30"
                          r="25"
                          fill="rgba(41, 48, 56, 0.1)"
                          stroke="rgba(41, 48, 56, 0.2)"
                          strokeWidth="1"
                        />
                        {/* XY-Grid coordinate system */}
                        <g className="coordinate-grid" style={{ opacity: 0.4 }}>
                          {/* Vertical grid lines */}
                          <line
                            x1="15"
                            y1="10"
                            x2="15"
                            y2="50"
                            stroke="rgba(94, 137, 160, 0.3)"
                            strokeWidth="0.5"
                          />
                          <line
                            x1="30"
                            y1="10"
                            x2="30"
                            y2="50"
                            stroke="rgba(94, 137, 160, 0.4)"
                            strokeWidth="0.8"
                          />
                          <line
                            x1="45"
                            y1="10"
                            x2="45"
                            y2="50"
                            stroke="rgba(94, 137, 160, 0.3)"
                            strokeWidth="0.5"
                          />
                          {/* Horizontal grid lines */}
                          <line
                            x1="10"
                            y1="15"
                            x2="50"
                            y2="15"
                            stroke="rgba(94, 137, 160, 0.3)"
                            strokeWidth="0.5"
                          />
                          <line
                            x1="10"
                            y1="30"
                            x2="50"
                            y2="30"
                            stroke="rgba(94, 137, 160, 0.4)"
                            strokeWidth="0.8"
                          />
                          <line
                            x1="10"
                            y1="45"
                            x2="50"
                            y2="45"
                            stroke="rgba(94, 137, 160, 0.3)"
                            strokeWidth="0.5"
                          />
                        </g>
                        {/* Pulsating ripple effect - restored from original */}
                        <circle
                          className="ripple-center"
                          cx="30"
                          cy="30"
                          r="15"
                          fill="none"
                          stroke="rgba(94, 137, 160, 0.6)"
                          strokeWidth="1.5"
                          opacity="0"
                          style={{ transformOrigin: "30px 30px" }}
                        />
                        {/* Dot on axis - always visible, overlaid on top */}
                        <circle
                          className="axis-dot"
                          cx="30"
                          cy="30"
                          r="3"
                          fill="rgba(94, 137, 160, 0.8)"
                          stroke="rgba(94, 137, 160, 1)"
                          strokeWidth="1"
                        />
                        {/* Subtle center pulse - restored from original */}
                        <circle
                          cx="30"
                          cy="30"
                          r="2"
                          fill="rgba(94, 137, 160, 0.4)"
                          opacity="0.6"
                        />
                      </>
                    )}

                    {circle.animationType === "override" && (
                      // Override Pathways: Arc intersection with ring
                      <>
                        <circle
                          className="base-ring"
                          cx="30"
                          cy="30"
                          r="25"
                          fill="rgba(34, 38, 46, 0.1)"
                          stroke="rgba(34, 38, 46, 0.2)"
                          strokeWidth="1"
                        />
                        <path
                          className="override-arc"
                          d="M 20 30 Q 30 20 40 30"
                          fill="none"
                          stroke="rgba(113, 142, 164, 0.6)"
                          strokeWidth="1.5"
                          opacity="0.4"
                        />
                        <circle
                          className="intersection-point"
                          cx="30"
                          cy="25"
                          r="1.5"
                          fill="rgba(209, 116, 116, 0.6)"
                          opacity="0"
                          style={{ transformOrigin: "30px 25px" }}
                        />
                      </>
                    )}

                    {circle.animationType === "projection" && (
                      // Typological Projection: Vector projection with axis labels
                      <>
                        <circle
                          cx="30"
                          cy="30"
                          r="25"
                          fill="rgba(32, 36, 43, 0.1)"
                          stroke="rgba(32, 36, 43, 0.2)"
                          strokeWidth="1"
                        />
                        {/* Axis markers */}
                        <g opacity="0.3">
                          <line
                            x1="10"
                            y1="30"
                            x2="50"
                            y2="30"
                            stroke="rgba(64, 74, 82, 0.4)"
                            strokeWidth="0.5"
                          />
                          <line
                            x1="30"
                            y1="10"
                            x2="30"
                            y2="50"
                            stroke="rgba(64, 74, 82, 0.4)"
                            strokeWidth="0.5"
                          />
                        </g>
                        {/* Projection beam - hidden until hover */}
                        <line
                          className="projection-beam"
                          x1="30"
                          y1="30"
                          x2="40"
                          y2="15"
                          stroke="rgba(136, 178, 206, 0.6)"
                          strokeWidth="2"
                          opacity="0"
                          style={{ transformOrigin: "30px 30px" }}
                        />
                        {/* Axis labels - always visible, centered symmetrically */}
                        <text
                          className="axis-label"
                          x="52"
                          y="34"
                          fontSize="6"
                          fill="rgba(124, 139, 155, 0.7)"
                          opacity="0.7"
                          textAnchor="middle"
                        >
                          DG
                        </text>
                        <text
                          className="axis-label"
                          x="30"
                          y="8"
                          fontSize="6"
                          fill="rgba(124, 139, 155, 0.7)"
                          opacity="0.7"
                          textAnchor="middle"
                        >
                          RT
                        </text>
                        <text
                          className="axis-label"
                          x="8"
                          y="34"
                          fontSize="6"
                          fill="rgba(124, 139, 155, 0.7)"
                          opacity="0.7"
                          textAnchor="middle"
                        >
                          CI
                        </text>
                        <text
                          className="axis-label"
                          x="30"
                          y="55"
                          fontSize="6"
                          fill="rgba(124, 139, 155, 0.7)"
                          opacity="0.7"
                          textAnchor="middle"
                        >
                          SB
                        </text>
                      </>
                    )}

                    {circle.animationType === "overlap" && (
                      // Cross-Document Logic: 3-circle Venn diagram with intersection on hover
                      <>
                        {/* 3-circle Venn diagram (visible initially) */}
                        <g className="venn-diagram" style={{ opacity: 1 }}>
                          <circle
                            className="venn-circle-a"
                            cx="24"
                            cy="24"
                            r="11"
                            fill="rgba(52, 65, 77, 0.2)"
                            stroke="rgba(52, 65, 77, 0.6)"
                            strokeWidth="1"
                          />
                          <circle
                            className="venn-circle-b"
                            cx="36"
                            cy="24"
                            r="11"
                            fill="rgba(52, 65, 77, 0.2)"
                            stroke="rgba(52, 65, 77, 0.6)"
                            strokeWidth="1"
                          />
                          <circle
                            className="venn-circle-c"
                            cx="30"
                            cy="36"
                            r="11"
                            fill="rgba(52, 65, 77, 0.2)"
                            stroke="rgba(52, 65, 77, 0.6)"
                            strokeWidth="1"
                          />
                        </g>
                        {/* Mathematically precise intersection shape (shown on hover) */}
                        <g className="intersection-only" style={{ opacity: 0 }}>
                          {/* A ∩ B intersection (lens between circles A and B) */}
                          <path
                            d="M 30 13.5
                               A 11 11 0 0 1 30 34.5
                               A 11 11 0 0 1 30 13.5 Z"
                            fill="rgba(123, 163, 186, 0.5)"
                            stroke="rgba(123, 163, 186, 0.8)"
                            strokeWidth="1.2"
                          />
                          {/* B ∩ C intersection (lens between circles B and C) */}
                          <path
                            d="M 33 30
                               A 11 11 0 0 1 27 30
                               A 11 11 0 0 1 33 30 Z"
                            fill="rgba(123, 163, 186, 0.5)"
                            stroke="rgba(123, 163, 186, 0.8)"
                            strokeWidth="1.2"
                          />
                          {/* A ∩ C intersection (lens between circles A and C) */}
                          <path
                            d="M 27 30
                               A 11 11 0 0 1 33 30
                               A 11 11 0 0 1 27 30 Z"
                            fill="rgba(123, 163, 186, 0.5)"
                            stroke="rgba(123, 163, 186, 0.8)"
                            strokeWidth="1.2"
                          />
                          {/* A ∩ B ∩ C central intersection */}
                          <ellipse
                            cx="30"
                            cy="30"
                            rx="3"
                            ry="2"
                            fill="rgba(123, 163, 186, 0.8)"
                            stroke="rgba(123, 163, 186, 1)"
                            strokeWidth="1.5"
                          />
                        </g>
                      </>
                    )}

                    {circle.animationType === "collapse" && (
                      // Structural Integrity Loss: Circle that breaks into 8 lines on hover
                      <>
                        {/* Initial circle */}
                        <circle
                          className="integrity-circle"
                          cx="30"
                          cy="30"
                          r="22"
                          fill="none"
                          stroke="rgba(66, 85, 100, 0.6)"
                          strokeWidth="1.5"
                        />
                        {/* 8 break lines (hidden initially, shown on hover) */}
                        <g className="break-lines" style={{ opacity: 0 }}>
                          {Array.from({ length: 8 }, (_, i) => {
                            const angle = i * 45 * (Math.PI / 180);
                            const innerRadius = 18;
                            const outerRadius = 26;
                            const x1 = 30 + innerRadius * Math.cos(angle);
                            const y1 = 30 + innerRadius * Math.sin(angle);
                            const x2 = 30 + outerRadius * Math.cos(angle);
                            const y2 = 30 + outerRadius * Math.sin(angle);
                            return (
                              <line
                                key={i}
                                className="collapse-fragment"
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke="rgba(193, 118, 118, 0.8)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                style={{ transformOrigin: "30px 30px" }}
                              />
                            );
                          })}
                        </g>
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
          </div>

          {/* Right Column: Clause Dynamics Primer */}
          <div style={{ justifySelf: "start", maxWidth: "320px" }}>
            <div
              className="font-mono text-xs"
              style={{
                color: "#7A8794",
                fontWeight: "400",
                lineHeight: "1.6",
                marginBottom: "24px",
              }}
            >
              Clauses in governance systems behave non-linearly.
              <br />
              They reference, override, nullify, and collapse each other based
              on order, scope, and embedded discretion.
              <br />
              Vigilum interprets these as logic units projected into a
              multidimensional risk space.
            </div>
            <div
              className="font-mono text-xs"
              style={{
                color: "#6B7684",
                fontWeight: "400",
                lineHeight: "1.6",
                marginBottom: "20px",
              }}
            >
              These seven nodes are the minimal vocabulary of that language.
              <br />
              Each operator defines a structural failure pattern.
              <br />
              They do not explain risk. They instantiate it.
            </div>
            {logicClassesEngaged.size >= 1 && (
              <div
                className="font-mono text-xs"
                style={{
                  color: "#8A9199",
                  fontWeight: "400",
                  lineHeight: "1.6",
                  opacity: logicClassesEngaged.size >= 3 ? 1 : 0.7,
                  transition: "opacity 0.5s ease-out",
                }}
              >
                Semantic alignment: {logicClassesEngaged.size}/7
                <br />
                {logicClassesEngaged.size >= 3
                  ? "Interpretive schema realigned. Simulation unlocking..."
                  : "Central glyph resolving..."}
              </div>
            )}
          </div>
        </div>

        {/* Semantic Hover Reinforcement */}
        {hoveredCircle && (
          <div
            style={{
              position: "fixed",
              bottom: "40px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(11, 30, 22, 0.95)",
              border: "1px solid rgba(0, 255, 204, 0.2)",
              borderRadius: "6px",
              padding: "12px 20px",
              zIndex: 1000,
            }}
          >
            <div
              className="font-mono text-xs"
              style={{
                color: "#C9D2DC",
                textAlign: "center",
                lineHeight: "1.4",
              }}
            >
              {circleData.find((c) => c.id === hoveredCircle)?.title}
              <br />
              <span style={{ color: "#8A9199", fontSize: "11px" }}>
                {circleData.find((c) => c.id === hoveredCircle)?.id ===
                  "constraint" &&
                  "Simulates legality while preserving override."}
                {circleData.find((c) => c.id === hoveredCircle)?.id ===
                  "sequence" && "Clause order alters structural output."}
                {circleData.find((c) => c.id === hoveredCircle)?.id ===
                  "discretion" && "Authority embedded in undefined thresholds."}
                {circleData.find((c) => c.id === hoveredCircle)?.id ===
                  "override" &&
                  "Nullification chains embedded across references."}
                {circleData.find((c) => c.id === hoveredCircle)?.id ===
                  "typological" &&
                  "Clause projected across DG, CI, RT, SB vectors."}
                {circleData.find((c) => c.id === hoveredCircle)?.id ===
                  "crossdocument" && "Meaning collapses across legal strata."}
                {circleData.find((c) => c.id === hoveredCircle)?.id ===
                  "integrity" && "Clause logic collapses into semantic noise."}
              </span>
            </div>
          </div>
        )}

        {/* CTA */}
        {showCTA && (
          <div style={{ textAlign: "center", marginTop: "60px" }}>
            <div
              className="font-mono text-xs"
              style={{
                color: "#C9D2DC",
                marginBottom: "16px",
                letterSpacing: "0.02em",
              }}
            >
              Interpretive schema accepted. Output can now be rendered.
            </div>
            <div
              className="font-mono text-xs"
              style={{
                color: "#8A9199",
                marginBottom: "24px",
                lineHeight: "1.5",
              }}
            >
              You are now aligned with clause-level cognition.
              <br />
              The simulation field will unlock.
            </div>
            <button
              onClick={handleCTAClick}
              style={{
                background: "rgba(201, 210, 220, 0.05)",
                border: "1px solid rgba(201, 210, 220, 0.2)",
                borderRadius: "4px",
                padding: "16px 32px",
                color: "#C9D2DC",
                fontFamily: "monospace",
                fontSize: "12px",
                fontWeight: "400",
                cursor: "pointer",
                letterSpacing: "0.08em",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(201, 210, 220, 0.08)";
                e.currentTarget.style.borderColor = "rgba(201, 210, 220, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(201, 210, 220, 0.05)";
                e.currentTarget.style.borderColor = "rgba(201, 210, 220, 0.2)";
              }}
            >
              [ ENTER STRUCTURAL PROCESSING ENVIRONMENT ]
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

            {/* Structural Logic */}
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  color: "#C9D2DC",
                  fontSize: "12px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                STRUCTURAL LOGIC
              </div>
              <div
                style={{
                  color: "#f2f2f2",
                  fontSize: "13px",
                  lineHeight: "1.4",
                  fontFamily: "monospace",
                }}
              >
                {selectedCircle.id === "constraint" &&
                  'Clause 3.2 states that "approval must be granted," yet Clause 3.4 allows discretion. Constraint is formal — not functional.'}
                {selectedCircle.id === "sequence" &&
                  "Clause 4.1 precedes 4.5: legal meaning is preserved. Reverse order collapses enforceability. Vigilum tracks sequence chains."}
                {selectedCircle.id === "discretion" &&
                  '"Where appropriate" or "as needed" clauses route control into unbounded fields. These clauses cannot be escalated.'}
                {selectedCircle.id === "override" &&
                  "Clause 6.3 → 9.2 → 2.1: every link appears valid. Together, they collapse the original restriction via legal path."}
                {selectedCircle.id === "typological" &&
                  '"Subject to review" projects ϕ(c) = [0.81 CI, 0.67 DG]. Legal text remains static. Its meaning shifts structurally.'}
                {selectedCircle.id === "crossdocument" &&
                  "Procurement Law defers to Presidential Decree, which defers to Budget Memo. Risk shifts invisibly between documents."}
                {selectedCircle.id === "integrity" &&
                  "Clause 3.1 defers to Clause 5.1, which loops back to 3.1. Circular reference = systemic failure masked as legality."}
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
