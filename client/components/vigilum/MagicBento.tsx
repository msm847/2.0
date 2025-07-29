import { useRef, useEffect, useCallback, useState } from "react";
import { gsap } from "gsap";
import "./MagicBento.css";

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "64, 255, 170";
const MOBILE_BREAKPOINT = 768;

const cardData = [
  {
    color: "#10201C",
    title: "Purpose",
    description:
      "Vigilum is a structural foresight engine that transforms governance into a dynamic risk field–modeling the true sequence of contracts, processes, and networks as an integrated logic system. Every clause, threshold, and override is mapped as an operator, while real-world events and operational context are ingested as live variables–reconstructing the actual flows of discretion, escalation, and risk embedded in institutional design.\nBy vectorizing legal structure and simulating operator interactions, Vigilum exposes how override chains, compliance simulation, and latent extraction paths intersect–surfacing systemic blind spots before risk materializes as loss.\nDesigned for public, private, and hybrid environments, Vigilum adapts to any institutional context–ensuring foresight, precision, and resilience at every scale.",
    secondaryDescription: "",
    signature: "",
    url: "/core-principles",
    isFounder: true,
  },
  {
    color: "#10201C",
    title: "Vision",
    description:
      "A future where risk is not simply managed but anticipated–where institutions gain the ability to surface and neutralize structural vulnerabilities before they become public crises.\nVigilum envisions governance as a living system, continually modeling its own logic and adapting in real time. Contracts, regulations, and procedures are no longer static or opaque; they become transparent frameworks whose effects can be measured, simulated, and improved.\nTrust is not a matter of silence, but of shared recognition: when all actors can observe, verify, and interrogate system logic in real time.",
    secondaryDescription: "",
    url: "/core-principles",
    isVision: true,
  },
  {
    color: "#10201C",
    title: "Our Team",
    description: "Meet the innovators behind Vigilum",
    secondaryDescription: "",
    signature: "",
    url: "/team",
    isTeamCarousel: true,
    teamMembers: [
      {
        name: "Adam Kovarskas",
        role: "Founder & System Architect",
        description:
          "Leads technical innovation and system architecture. Oversees all platform development.",
        imageUrl:
          "https://cdn.builder.io/api/v1/image/assets%2F41e98af6d24e4f21a2289029be813332%2Fee53c7aa65024702a4b9f670a39a113d?format=webp&width=800",
      },
      {
        name: "Mihail Martynov",
        role: "Founding Team & Chief of Staff",
        description:
          "Drives web implementation, team coordination,\ntalent acquisition, and external partnerships.",
        imageUrl:
          "https://cdn.builder.io/api/v1/image/assets%2F41e98af6d24e4f21a2289029be813332%2F305c959a26d64f34998aec1bc8fd5a2b?format=webp&width=800",
      },
      {
        name: "Ričardas Blaškevič",
        role: "Media Coordinator",
        description:
          "Leads social media, content strategy,\nand video production.",
        imageUrl:
          "https://cdn.builder.io/api/v1/image/assets%2F41e98af6d24e4f21a2289029be813332%2F12d37d76bae3402ca48fa9a7ea03a60c?format=webp&width=800",
      },
    ],
  },
  {
    color: "#10201C",
    title: "Advisory",
    description: "Strategic guidance from industry leaders",
    secondaryDescription: "",
    signature: "",
    url: "/advisory",
    isAdvisoryCarousel: true,
    advisoryMembers: [
      {
        name: "Matthew Murray",
        role: "Strategic Advisor",
        description:
          "International expert in systemic corruption and governance reform; Adjunct Professor, Columbia University (SIPA/Harriman). Former U.S. Deputy Assistant Secretary of Commerce; 30 years' experience spanning law, policy, business, and anti-corruption strategy across Europe and Eurasia.",
        imageUrl:
          "https://cdn.builder.io/api/v1/image/assets%2F41e98af6d24e4f21a2289029be813332%2Fa2821bac7f4e400bbc76b0cb9d1cfd4a?format=webp&width=800",
      },
      {
        name: "Name Surname",
        role: "Advisor",
        description: "Description",
        imageUrl: "/placeholder.svg",
      },
    ],
  },
];

const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 10;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
});

const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty("--glow-x", `${relativeX}%`);
  card.style.setProperty("--glow-y", `${relativeY}%`);
  card.style.setProperty("--glow-intensity", glow.toString());
  card.style.setProperty("--glow-radius", `${radius}px`);
};

const ParticleCard = ({
  children,
  className = "",
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(
        Math.random() * width,
        Math.random() * height,
        glowColor,
      ),
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        },
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(
          clone,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" },
        );

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseMove = (e) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleClick = (e) => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height),
      );

      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 5;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1,
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        },
      );
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("click", handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("click", handleClick);
      clearAllParticles();
    };
  }, [
    animateParticles,
    clearAllParticles,
    disableAnimations,
    enableTilt,
    enableMagnetism,
    clickEffect,
    glowColor,
  ]);

  return (
    <div
      ref={cardRef}
      className={`${className} particle-container`}
      style={{ ...style, position: "relative", overflow: "hidden" }}
    >
      {children}
    </div>
  );
};

const GlobalSpotlight = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const spotlightRef = useRef(null);
  const isInsideSection = useRef(false);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement("div");
    spotlight.className = "global-spotlight";
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 15;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest(".bento-section");
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      isInsideSection.current = mouseInside || false;
      const cards = gridRef.current.querySelectorAll(".card");

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        cards.forEach((card) => {
          card.style.setProperty("--glow-intensity", "0");
        });
        return;
      }

      const { proximity, fadeDistance } =
        calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach((card) => {
        const cardElement = card;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) -
          Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity =
            (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(
          cardElement,
          e.clientX,
          e.clientY,
          glowIntensity,
          spotlightRadius,
        );
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      gridRef.current?.querySelectorAll(".card").forEach((card) => {
        card.style.setProperty("--glow-intensity", "0");
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

const BentoCardGrid = ({ children, gridRef }) => (
  <div className="card-grid bento-section" ref={gridRef}>
    {children}
  </div>
);

const TeamCarousel = ({ card }) => {
  const [currentMember, setCurrentMember] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextMember = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentMember((prev) => (prev + 1) % card.teamMembers.length);
      setIsTransitioning(false);
    }, 150);
  };

  const prevMember = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentMember(
        (prev) =>
          (prev - 1 + card.teamMembers.length) % card.teamMembers.length,
      );
      setIsTransitioning(false);
    }, 150);
  };

  const member = card.teamMembers[currentMember];

  return (
    <>
      <h2
        className="card__title"
        style={{
          fontSize: "30px",
          marginBottom: "10px",
          color: "#9DE6C6",
          fontWeight: "400",
        }}
      >
        Team
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          position: "relative",
          opacity: isTransitioning ? 0.5 : 1,
          transition: "opacity 0.15s ease",
        }}
      >
        {/* Profile Image */}
        <div
          style={{
            width: "160px",
            height: "160px",
            borderRadius: "12px",
            backgroundColor: "#2d4a3f",
            border: "2px solid #9DE6C6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            boxShadow: "0 4px 15px rgba(157, 230, 198, 0.2)",
          }}
        >
          <img
            src={member.imageUrl}
            alt={member.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.9)",
            }}
          />
        </div>

        {/* Member Info */}
        <div style={{ textAlign: "center", maxWidth: "300px" }}>
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#FFFFFF",
              margin: "0 0 6px 0",
              lineHeight: "1.2",
            }}
          >
            {member.name}
          </h3>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#9DE6C6",
              margin: "0 0 12px 0",
              lineHeight: "1.3",
            }}
          >
            {member.role}
          </p>
          <p
            style={{
              fontSize: "13px",
              lineHeight: "1.4",
              color: "#E5E5E5",
              fontWeight: "300",
              margin: "0",
              whiteSpace: "pre-line",
            }}
          >
            {member.description}
          </p>
        </div>

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginTop: "10px",
          }}
        >
          <button
            onClick={prevMember}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "rgba(157, 230, 198, 0.1)",
              border: "1px solid rgba(157, 230, 198, 0.3)",
              color: "#9DE6C6",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "rgba(157, 230, 198, 0.2)";
              e.target.style.borderColor = "rgba(157, 230, 198, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "rgba(157, 230, 198, 0.1)";
              e.target.style.borderColor = "rgba(157, 230, 198, 0.3)";
            }}
          >
            ‹
          </button>

          {/* Dots indicator */}
          <div style={{ display: "flex", gap: "8px" }}>
            {card.teamMembers.map((_, index) => (
              <div
                key={index}
                onClick={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true);
                    setTimeout(() => {
                      setCurrentMember(index);
                      setIsTransitioning(false);
                    }, 150);
                  }
                }}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor:
                    index === currentMember
                      ? "#9DE6C6"
                      : "rgba(157, 230, 198, 0.3)",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                }}
              />
            ))}
          </div>

          <button
            onClick={nextMember}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "rgba(157, 230, 198, 0.1)",
              border: "1px solid rgba(157, 230, 198, 0.3)",
              color: "#9DE6C6",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "rgba(157, 230, 198, 0.2)";
              e.target.style.borderColor = "rgba(157, 230, 198, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "rgba(157, 230, 198, 0.1)";
              e.target.style.borderColor = "rgba(157, 230, 198, 0.3)";
            }}
          >
            ›
          </button>
        </div>
      </div>
    </>
  );
};

const AdvisoryCarousel = ({ card }) => {
  const [currentMember, setCurrentMember] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextMember = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentMember((prev) => (prev + 1) % card.advisoryMembers.length);
      setIsTransitioning(false);
    }, 150);
  };

  const prevMember = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentMember(
        (prev) =>
          (prev - 1 + card.advisoryMembers.length) %
          card.advisoryMembers.length,
      );
      setIsTransitioning(false);
    }, 150);
  };

  const member = card.advisoryMembers[currentMember];

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "0",
      }}
    >
      <h2
        className="card__title"
        style={{
          fontSize: "30px",
          marginBottom: "16px",
          color: "#9DE6C6",
          fontWeight: "400",
          textAlign: "left",
          marginTop: "0",
        }}
      >
        {card.title}
      </h2>

      <div
        style={{
          display: "flex",
          gap: "24px",
          flex: "1",
          alignItems: "flex-start",
          marginTop: "32px",
          opacity: isTransitioning ? 0.5 : 1,
          transition: "opacity 0.15s ease",
        }}
      >
        {/* Left side - Profile Image & Description */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "180px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "12px",
              backgroundColor: "#2d4a3f",
              border: "2px solid #9DE6C6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              boxShadow: "0 4px 15px rgba(157, 230, 198, 0.2)",
              marginBottom: "16px",
            }}
          >
            <img
              src={member.imageUrl}
              alt={member.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.9)",
              }}
            />
          </div>
        </div>

        {/* Right side - Name, Role, Description & Navigation */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            paddingTop: "0px",
            marginTop: "-8px",
          }}
        >
          <h3
            style={{
              fontSize: "22px",
              fontWeight: "600",
              color: "#FFFFFF",
              margin: "0 0 8px 0",
              lineHeight: "1.2",
            }}
          >
            {member.name}
          </h3>
          <p
            style={{
              fontSize: "15px",
              fontWeight: "500",
              color: "#9DE6C6",
              margin: "0 0 16px 0",
              lineHeight: "1.3",
            }}
          >
            {member.role}
          </p>
          <p
            style={{
              fontSize: "13px",
              lineHeight: "1.4",
              color: "#E5E5E5",
              fontWeight: "300",
              margin: "0",
              textAlign: "left",
            }}
          >
            {member.description}
          </p>
        </div>
      </div>

      {/* Navigation at absolute bottom */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          marginTop: "auto",
          paddingTop: "20px",
        }}
      >
        <button
          onClick={prevMember}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "rgba(157, 230, 198, 0.1)",
            border: "1px solid rgba(157, 230, 198, 0.3)",
            color: "#9DE6C6",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(157, 230, 198, 0.2)";
            e.target.style.borderColor = "rgba(157, 230, 198, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "rgba(157, 230, 198, 0.1)";
            e.target.style.borderColor = "rgba(157, 230, 198, 0.3)";
          }}
        >
          ‹
        </button>

        <div style={{ display: "flex", gap: "8px" }}>
          {card.advisoryMembers.map((_, index) => (
            <div
              key={index}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentMember(index);
                    setIsTransitioning(false);
                  }, 150);
                }
              }}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor:
                  index === currentMember
                    ? "#9DE6C6"
                    : "rgba(157, 230, 198, 0.3)",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
            />
          ))}
        </div>

        <button
          onClick={nextMember}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "rgba(157, 230, 198, 0.1)",
            border: "1px solid rgba(157, 230, 198, 0.3)",
            color: "#9DE6C6",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(157, 230, 198, 0.2)";
            e.target.style.borderColor = "rgba(157, 230, 198, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "rgba(157, 230, 198, 0.1)";
            e.target.style.borderColor = "rgba(157, 230, 198, 0.3)";
          }}
        >
          ›
        </button>
      </div>
    </div>
  );
};

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

const MagicBento = ({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
}) => {
  const gridRef = useRef(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  return (
    <>
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <BentoCardGrid gridRef={gridRef}>
        {cardData.map((card, index) => {
          const baseClassName = `card ${textAutoHide ? "card--text-autohide" : ""} ${enableBorderGlow ? "card--border-glow" : ""}`;
          const contentStyle = {};
          const cardProps = {
            className: baseClassName,
            style: {
              backgroundColor: card.color,
              "--glow-color": glowColor,
            },
          };

          if (enableStars) {
            return (
              <ParticleCard
                key={index}
                {...cardProps}
                disableAnimations={
                  shouldDisableAnimations ||
                  card.isTeamCarousel ||
                  card.isAdvisoryCarousel ||
                  card.isVision ||
                  card.isFounder
                }
                particleCount={particleCount}
                glowColor={glowColor}
                enableTilt={
                  enableTilt &&
                  !card.isTeamCarousel &&
                  !card.isAdvisoryCarousel &&
                  !card.isVision &&
                  !card.isFounder
                }
                clickEffect={
                  clickEffect &&
                  !card.isTeamCarousel &&
                  !card.isAdvisoryCarousel &&
                  !card.isVision &&
                  !card.isFounder
                }
                enableMagnetism={
                  enableMagnetism &&
                  !card.isTeamCarousel &&
                  !card.isAdvisoryCarousel &&
                  !card.isVision &&
                  !card.isFounder
                }
              >
                <div className="card__content" style={contentStyle}>
                  {card.isVision ? (
                    <>
                      <h2
                        className="card__title"
                        style={{
                          fontSize: "30px",
                          marginBottom: "10px",
                          color: "#9DE6C6",
                          fontWeight: "400",
                        }}
                      >
                        {card.title}
                      </h2>
                      <p
                        style={{
                          fontSize: "19px",
                          lineHeight: "27px",
                          color: "#E5E5E5",
                          marginBottom: "8px",
                          fontWeight: "300",
                        }}
                      >
                        {card.description}
                      </p>
                      <p
                        style={{
                          fontSize: "17px",
                          lineHeight: "25px",
                          color: "#E5E5E5",
                          marginBottom: "8px",
                          fontWeight: "300",
                        }}
                      >
                        {card.secondaryDescription}
                      </p>
                    </>
                  ) : card.isFounder ? (
                    <>
                      <h2
                        className="card__title"
                        style={{
                          fontSize: "30px",
                          marginBottom: "10px",
                          color: "rgba(157, 230, 198, 1)",
                          fontWeight: "400",
                        }}
                      >
                        {card.title}
                      </h2>
                      <p
                        style={{
                          fontSize: "16px",
                          lineHeight: "24px",
                          color: "#E5E5E5",
                          marginBottom: "8px",
                          fontWeight: "300",
                        }}
                      >
                        {card.description}
                      </p>
                      <p
                        style={{
                          fontSize: "16px",
                          lineHeight: "25px",
                          color: "#D0D0D0",
                          marginBottom: "8px",
                          fontWeight: "200",
                        }}
                      >
                        {card.secondaryDescription}
                      </p>
                      <p
                        style={{
                          fontSize: "15px",
                          lineHeight: "13px",
                          color: "#9DE6C6",
                          fontWeight: "500",
                        }}
                      >
                        {card.signature}
                      </p>
                    </>
                  ) : card.isTeamMember ? (
                    <>
                      <h2
                        className="card__title"
                        style={{
                          fontSize: "30px",
                          marginBottom: "16px",
                          color: "#9DE6C6",
                          fontWeight: "400",
                        }}
                      >
                        {card.title}
                      </h2>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "16px",
                        }}
                      >
                        <div
                          style={{
                            width: "120px",
                            height: "120px",
                            borderRadius: "50%",
                            backgroundColor: "#2d4a3f",
                            border: "2px solid #9DE6C6",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={card.imageUrl}
                            alt={card.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              filter: "brightness(0.9)",
                            }}
                          />
                        </div>
                        <p
                          style={{
                            fontSize: "16px",
                            lineHeight: "22px",
                            color: "#E5E5E5",
                            textAlign: "center",
                            fontWeight: "300",
                            margin: "0",
                          }}
                        >
                          {card.description}
                        </p>
                      </div>
                    </>
                  ) : card.isTeamCarousel ? (
                    <TeamCarousel card={card} />
                  ) : card.isAdvisoryCarousel ? (
                    <AdvisoryCarousel card={card} />
                  ) : (
                    <>
                      <h2 className="card__title">{card.title}</h2>
                      <p className="card__description">{card.description}</p>
                    </>
                  )}
                </div>
              </ParticleCard>
            );
          }
        })}
      </BentoCardGrid>
    </>
  );
};

export default MagicBento;
