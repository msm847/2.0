import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import MagicBentoTeamGrid from "./MagicBentoTeamGrid";
import MagicBentoContactGrid from "./MagicBentoContactGrid";
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
    <div style={{ backgroundColor: "#0B1E16" }}>
      {/* TEAM SECTION */}
      <section className="py-20" aria-labelledby="team-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-green-900/30 px-3 py-1 rounded-full border border-green-700 mb-4">
                <User className="w-3 h-3 text-green-400" />
                <span className="text-xs text-green-300 font-mono uppercase tracking-wider">
                  Origins & Vision
                </span>
              </div>
              <h2
                id="team-heading"
                className="text-4xl font-bold text-gray-100 mb-4 font-mono tracking-tight"
              >
                TEAM
              </h2>
            </div>

            {/* Interactive Team Grid - 2x2 Layout */}
            <MagicBentoTeamGrid />
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        className="py-20 border-t border-gray-800"
        aria-labelledby="contact-heading"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Target Audiences */}
            <div className="mb-16">
              <div className="relative">
                <div
                  className="overflow-hidden cursor-grab active:cursor-grabbing select-none py-4"
                  onMouseDown={handleAudiencesMouseDown}
                  onTouchStart={handleAudiencesTouchStart}
                  onTouchMove={handleAudiencesTouchMove}
                  onTouchEnd={handleAudiencesTouchEnd}
                  style={{ userSelect: "none", touchAction: "pan-x" }}
                >
                  <div
                    className="target-audiences-scroll"
                    style={{
                      transform: `translateX(${audiencesScrollPosition}px)`,
                      transition: "none",
                      display: "flex",
                      willChange: "transform",
                    }}
                  >
                    {/* Render multiple copies for smooth infinite scroll */}
                    {Array.from({ length: 3 }, (_, copyIndex) =>
                      targetAudiences.map((audience, index) => {
                        const Icon = audience.icon;
                        const uniqueKey = `${copyIndex}-${index}`;
                        return (
                          <div
                            key={uniqueKey}
                            className="flex-shrink-0 w-80 rounded-lg p-6 border text-center mx-4"
                            style={{
                              backgroundColor: "rgba(12, 35, 28, 0.85)",
                              borderColor: "rgba(0,255,204,0.06)",
                              boxShadow:
                                "inset 0 0 0 1px rgba(255,255,255,0.03)",
                            }}
                            onDragStart={(e) => e.preventDefault()}
                          >
                            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="text-lg font-bold text-green-400 font-mono mb-3">
                              {audience.title}
                            </h4>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {audience.description}
                            </p>
                          </div>
                        );
                      }),
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info & Newsletter */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div
                className="rounded-lg p-8 border"
                style={{
                  backgroundColor: "rgba(12, 35, 28, 0.85)",
                  borderColor: "rgba(0,255,204,0.06)",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)",
                }}
              >
                <h3 className="text-xl font-bold text-green-400 font-mono mb-6">
                  Direct Contact
                </h3>
                <div className="flex items-center space-x-3 mb-4">
                  <Mail className="w-5 h-5 text-green-400" />
                  <a
                    href="mailto:info@vigilum.com"
                    className="text-gray-300 hover:text-green-400 transition-colors font-mono"
                    aria-label="Send email to Vigilum"
                  >
                    info@vigilum.com
                  </a>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  For institutional partnerships, technical integration, or
                  research collaboration inquiries.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-mono px-6 py-3 rounded-lg transition-colors"
                  aria-label="Open contact form"
                >
                  <Mail className="w-4 h-4" />
                  <span>Get in Touch</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Newsletter Subscription */}
              <div
                className="rounded-lg p-8 border"
                style={{
                  backgroundColor: "#102c22",
                  borderColor: "rgba(0,255,204,0.06)",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)",
                }}
              >
                {!isSubmitted ? (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    aria-labelledby="newsletter-form"
                  >
                    <div>
                      <h3
                        id="newsletter-form"
                        className="text-xl font-bold text-white font-mono mb-2"
                      >
                        Stay Updated
                      </h3>
                      <p className="text-sm text-gray-400 mb-4">
                        Methodology advances, case studies, structural analysis
                        techniques
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="email-input"
                        className="block text-sm font-bold text-gray-300 font-mono mb-2"
                      >
                        Email address
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@organization.com"
                        className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-gray-300 font-mono text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        required
                        aria-describedby="email-help"
                      />
                      <p id="email-help" className="text-xs text-gray-500 mt-1">
                        No spam. Unsubscribe anytime.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      disabled={!email.trim()}
                      className="w-full bg-green-600 hover:bg-green-500 text-white font-mono py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Subscribe to Vigilum newsletter"
                    >
                      Subscribe
                      <Send className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                ) : (
                  <div
                    className="text-center py-8"
                    role="status"
                    aria-live="polite"
                  >
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-green-400 font-mono mb-2">
                      SUBSCRIPTION CONFIRMED
                    </h3>
                    <p className="text-sm text-gray-400">
                      You'll receive updates on structural intelligence
                      methodologies
                    </p>
                  </div>
                )}
              </div>
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
