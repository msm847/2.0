import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import MagicBentoTeamGrid from "./MagicBentoTeamGrid";
import MagicBentoContactGrid from "./MagicBentoContactGrid";
import MagicBento from "./MagicBento";
import {
  Shield,
  Building,
  Bot,
  ArrowRight,
  CheckCircle,
  User,
  Target,
  Eye,
  BookOpen,
  Mail,
  Send,
  Zap,
  Network,
  Search,
  Clock,
  Gavel,
  Globe,
  Brain,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Users,
  Scale,
  FileSearch,
  Landmark,
} from "lucide-react";

const TeamContact = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragStartPosition, setDragStartPosition] = useState(0);
  const [autoScrollDisabled, setAutoScrollDisabled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollDepth, setScrollDepth] = useState(0);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const inactivityTimeoutRef = useRef(null);

  // Target Audiences Carousel State
  const [audiencesScrollPosition, setAudiencesScrollPosition] = useState(0);
  const [audiencesAutoScrollDisabled, setAudiencesAutoScrollDisabled] =
    useState(false);
  const [audiencesIsDragging, setAudiencesIsDragging] = useState(false);
  const [audiencesDragStart, setAudiencesDragStart] = useState(0);
  const [audiencesDragStartPosition, setAudiencesDragStartPosition] =
    useState(0);
  const [audiencesIsAnimating, setAudiencesIsAnimating] = useState(false);
  const [audiencesLastInteractionTime, setAudiencesLastInteractionTime] =
    useState(Date.now());
  const audiencesAnimationRef = useRef(null);

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

  const cardWidth = 352; // 320px card + 32px margin
  const totalCards = corePrinciples.length;
  const animationRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      setAudiencesScrollPosition((prev) => prev - 0.5); // 30px per second at 60fps
      audiencesAnimationRef.current = requestAnimationFrame(animate);
    };

    audiencesAnimationRef.current = requestAnimationFrame(animate);

    return () => {
      if (audiencesAnimationRef.current) {
        cancelAnimationFrame(audiencesAnimationRef.current);
      }
    };
  }, []);

  // Perpetual auto-scroll animation
  useEffect(() => {
    const animate = () => {
      setScrollPosition((prev) => prev - 0.5); // 30px per second at 60fps
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Scroll depth effect for gradient
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const depth = Math.min(scrollY * 0.002, 0.3); // Cap at 0.3 for subtle effect
      setScrollDepth(depth);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const smoothScrollTo = (targetPosition, duration = 600) => {
    setIsAnimating(true);
    const startPosition = scrollPosition;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth acceleration/deceleration
      const easeInOutQuart =
        progress < 0.5
          ? 8 * progress * progress * progress * progress
          : 1 -
            8 *
              (progress - 1) *
              (progress - 1) *
              (progress - 1) *
              (progress - 1);

      setScrollPosition(startPosition + distance * easeInOutQuart);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  };

  const scrollLeftOneCard = () => {
    updateInteractionTime();
    smoothScrollTo(scrollPosition + cardWidth); // Move left (positive direction)
  };

  const scrollRightOneCard = () => {
    updateInteractionTime();
    smoothScrollTo(scrollPosition - cardWidth); // Move right (negative direction)
  };

  const updateInteractionTime = () => {
    setLastInteractionTime(Date.now());
    setAutoScrollDisabled(true);
    setIsPaused(true);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setDragStart(e.clientX);
    setDragStartPosition(scrollPosition);
    updateInteractionTime();

    // Create handlers with current context
    const globalMouseMove = (moveEvent) => {
      moveEvent.preventDefault();
      const diff = moveEvent.clientX - e.clientX;
      setScrollPosition(scrollPosition + diff);
      setDragStart(moveEvent.clientX);
      setDragStartPosition(scrollPosition + diff);
    };

    const globalMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", globalMouseMove);
      document.removeEventListener("mouseup", globalMouseUp);
      updateInteractionTime();
    };

    document.addEventListener("mousemove", globalMouseMove);
    document.addEventListener("mouseup", globalMouseUp);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
    setDragStartPosition(scrollPosition);
    updateInteractionTime();
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - dragStart;
    setScrollPosition(dragStartPosition + diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    updateInteractionTime();
  };

  const audiencesSmoothScrollTo = (targetPosition, duration = 600) => {
    setAudiencesIsAnimating(true);
    const startPosition = audiencesScrollPosition;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth acceleration/deceleration
      const easeInOutQuart =
        progress < 0.5
          ? 8 * progress * progress * progress * progress
          : 1 -
            8 *
              (progress - 1) *
              (progress - 1) *
              (progress - 1) *
              (progress - 1);

      setAudiencesScrollPosition(startPosition + distance * easeInOutQuart);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAudiencesIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  };

  const audiencesScrollLeftOneCard = () => {
    updateAudiencesInteractionTime();
    audiencesSmoothScrollTo(audiencesScrollPosition + cardWidth);
  };

  const audiencesScrollRightOneCard = () => {
    updateAudiencesInteractionTime();
    audiencesSmoothScrollTo(audiencesScrollPosition - cardWidth);
  };

  const handleAudiencesMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAudiencesIsDragging(true);
    setAudiencesDragStart(e.clientX);
    setAudiencesDragStartPosition(audiencesScrollPosition);
    updateAudiencesInteractionTime();

    // Create handlers with current context
    const globalMouseMove = (moveEvent) => {
      moveEvent.preventDefault();
      const diff = moveEvent.clientX - e.clientX;
      setAudiencesScrollPosition(audiencesScrollPosition + diff);
      setAudiencesDragStart(moveEvent.clientX);
      setAudiencesDragStartPosition(audiencesScrollPosition + diff);
    };

    const globalMouseUp = () => {
      setAudiencesIsDragging(false);
      document.removeEventListener("mousemove", globalMouseMove);
      document.removeEventListener("mouseup", globalMouseUp);
      updateAudiencesInteractionTime();
    };

    document.addEventListener("mousemove", globalMouseMove);
    document.addEventListener("mouseup", globalMouseUp);
  };

  const handleAudiencesTouchStart = (e) => {
    e.preventDefault();
    setAudiencesIsDragging(true);
    setAudiencesDragStart(e.touches[0].clientX);
    setAudiencesDragStartPosition(audiencesScrollPosition);
    updateAudiencesInteractionTime();
  };

  const handleAudiencesTouchMove = (e) => {
    if (!audiencesIsDragging) return;
    const diff = e.touches[0].clientX - audiencesDragStart;
    setAudiencesScrollPosition(audiencesDragStartPosition + diff);
  };

  const handleAudiencesTouchEnd = () => {
    if (!audiencesIsDragging) return;
    setAudiencesIsDragging(false);
    updateAudiencesInteractionTime();
  };

  const updateAudiencesInteractionTime = () => {
    setAudiencesLastInteractionTime(Date.now());
    setAudiencesAutoScrollDisabled(true);
  };

  const targetAudiences = [
    {
      id: "auditor",
      title: "Institutional Auditors",
      icon: Shield,
      description:
        "Risk assessment professionals analyzing governance structures",
    },
    {
      id: "donor",
      title: "Development Organizations",
      icon: Building,
      description: "Funding bodies requiring governance risk assessment",
    },
    {
      id: "civic",
      title: "Civic AI Developers",
      icon: Bot,
      description: "Technology teams building governance intelligence systems",
    },
    {
      id: "students",
      title: "Students & Researchers",
      icon: GraduationCap,
      description:
        "Academic researchers studying governance patterns and structural risk detection",
    },
    {
      id: "professors",
      title: "Academic Faculty",
      icon: Users,
      description:
        "Professors in public policy, law, and governance seeking research collaboration",
    },
    {
      id: "regulators",
      title: "Regulatory Agencies",
      icon: Scale,
      description:
        "Government oversight bodies requiring pre-award structural intelligence",
    },
    {
      id: "analysts",
      title: "ESG & Compliance Analysts",
      icon: FileSearch,
      description:
        "Investment firms screening for institutional exposure and political risk",
    },
    {
      id: "ifi",
      title: "International Finance",
      icon: Landmark,
      description:
        "World Bank, EBRD, and multilateral institutions conducting integrity assessments",
    },
  ];

  const researchFoundation = [
    "MARS-REERS thesis research (Columbia University, 2023)",
    "Vigilum Codex v0.1 – Initial risk pattern compendium",
    "Quantum logic applications in legal clause analysis",
    "Mathematical semantic weighting methodologies",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
    }, 3000);
  };

  return (
    <div
      style={{
        background: `linear-gradient(135deg,
        rgba(26, 46, 37, ${1 - scrollDepth * 0.2}) 0%,
        rgba(18, 53, 40, ${1 - scrollDepth * 0.1}) 100%)`,
        transition: "background 0.2s ease-out",
      }}
    >
      {/* TEAM SECTION */}
      <section className="pt-20 pb-32" aria-labelledby="team-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 mt-8">
              <motion.h2
                className="mb-8 font-semibold leading-tight"
                style={{
                  fontFamily: "IBM Plex Sans, sans-serif",
                  fontSize: "clamp(2.4rem, 3.4vw, 3rem)",
                  color: "#E5F3ED",
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Purpose & Horizon
              </motion.h2>

              <p
                style={{
                  fontFamily: "IBM Plex Sans, sans-serif",
                  fontSize: "18px",
                  color: "#A5C9B7",
                  textAlign: "center",
                  margin: "0",
                  lineHeight: "1.5",
                }}
              >
                Meet the team and understand the vision driving Vigilum.
              </p>
            </div>

            {/* MagicBento Grid */}
            <div style={{ height: "850px", position: "relative" }}>
              <MagicBento
                textAutoHide={true}
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                spotlightRadius={300}
                particleCount={12}
                glowColor="132, 0, 255"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Vigilum AI",
            description:
              "Structural governance intelligence platform for institutional risk detection",
            url: "https://vigilum.com",
            founder: {
              "@type": "Person",
              name: "Adam Kovarskas",
              alumniOf: "Columbia University",
            },
            contactPoint: {
              "@type": "ContactPoint",
              email: "info@vigilum.com",
              contactType: "General Inquiries",
            },
            address: {
              "@type": "PostalAddress",
              addressCountry: "US",
            },
          }),
        }}
      />
    </div>
  );
};

export default TeamContact;
