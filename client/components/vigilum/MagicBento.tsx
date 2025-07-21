import { useRef, useEffect, useCallback, useState } from "react";
import { gsap } from "gsap";
import "./MagicBento.css";

const EmailIcon = () => (
  <svg
    width="24"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      color: "#40FFAA",
      marginLeft: "8px",
      flexShrink: 0,
    }}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "64, 255, 170";
const MOBILE_BREAKPOINT = 768;

const cardData = [
  {
    color: "#10201C",
    title: "Vision",
    description:
      "Vigilum pioneers Structural Governance Intelligence—the first system capable of translating complex legal and political networks into real-time risk signals that reveal system-level vulnerabilities before they become procedural reality.",
    secondaryDescription:
      "By computing intent rather than monitoring behavior, we enable institutions to foresee and prevent corruption that operates through compliance, not in violation of it.",
    url: "/core-principles",
    isVision: true,
  },
  {
    color: "#10201C",
    title: "Founder's Note",
    description:
      "During my research in the MARS-REERS program at Columbia University, I discovered a fundamental gap in how we approach corruption. We often react to scandals rather than predict them. Traditional tools detect issues after rules are broken, but what if we could identify the structural flaws that enable corruption before any funds are spent or contracts signed?",
    secondaryDescription:
      "Vigilum emerged from this insight. Our mission is to render institutional structure legible before it breaks, to spotlight design flaws that breed corruption so they can be fixed in time. This isn't just detection — this is preemption.",
    signature: "— Adam Kovarskas, Founder",
    url: "/core-principles",
    isFounder: true,
  },
];

interface ParticleCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  disableAnimations?: boolean;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}

const ParticleCard: React.FC<ParticleCardProps> = ({
  children,
  className = "",
  style = {},
  disableAnimations = false,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = true,
  enableMagnetism = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  const createParticles = useCallback(() => {
    if (disableAnimations || !cardRef.current) return;

    const card = cardRef.current;
    const existingParticles = card.querySelectorAll(".star-particle");
    existingParticles.forEach((particle) => particle.remove());
    particlesRef.current = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "star-particle";
      particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgb(${glowColor});
        border-radius: 50%;
        pointer-events: none;
        opacity: 0;
        box-shadow: 0 0 6px rgb(${glowColor});
      `;

      const x = Math.random() * 100;
      const y = Math.random() * 100;
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;

      card.appendChild(particle);
      particlesRef.current.push(particle);

      gsap.to(particle, {
        opacity: Math.random() * 0.5 + 0.2,
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: Math.random() * 2,
      });

      gsap.to(particle, {
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
        duration: Math.random() * 4 + 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2,
      });
    }
  }, [disableAnimations, particleCount, glowColor]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disableAnimations || !cardRef.current || !enableTilt) return;

      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: "power2.out",
      });

      if (enableMagnetism) {
        particlesRef.current.forEach((particle) => {
          const particleRect = particle.getBoundingClientRect();
          const particleX = particleRect.left + particleRect.width / 2;
          const particleY = particleRect.top + particleRect.height / 2;
          const distance = Math.sqrt(
            Math.pow(e.clientX - particleX, 2) +
              Math.pow(e.clientY - particleY, 2),
          );

          if (distance < 100) {
            const force = (100 - distance) / 100;
            const moveX = (e.clientX - particleX) * force * 0.1;
            const moveY = (e.clientY - particleY) * force * 0.1;

            gsap.to(particle, {
              x: moveX,
              y: moveY,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });
      }
    },
    [disableAnimations, enableTilt, enableMagnetism],
  );

  const handleMouseLeave = useCallback(() => {
    if (disableAnimations || !cardRef.current) return;

    setIsHovered(false);
    const card = cardRef.current;

    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: "power2.out",
    });

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  }, [disableAnimations]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disableAnimations || !cardRef.current || !clickEffect) return;

      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.3) 0%, transparent 70%);
        width: 100px;
        height: 100px;
        left: ${x - 50}px;
        top: ${y - 50}px;
        pointer-events: none;
        z-index: 1000;
      `;

      card.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1,
        },
        {
          scale: 3,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        },
      );
    },
    [disableAnimations, clickEffect, glowColor],
  );

  useEffect(() => {
    createParticles();
    return () => {
      if (cardRef.current) {
        const particles = cardRef.current.querySelectorAll(".star-particle");
        particles.forEach((particle) => particle.remove());
      }
    };
  }, [createParticles]);

  useEffect(() => {
    if (isHovered && !disableAnimations) {
      createParticles();
    }
  }, [isHovered, createParticles, disableAnimations]);

  return (
    <div
      ref={cardRef}
      className={`card ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
    >
      {children}
    </div>
  );
};

const BentoCardGrid = ({ children }: { children: React.ReactNode }) => {
  return <div className="card-grid">{children}</div>;
};

interface MagicBentoProps {
  particleCount?: number;
  glowColor?: string;
  enableStars?: boolean;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}

const MagicBento: React.FC<MagicBentoProps> = ({
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableStars = true,
  enableTilt = true,
  clickEffect = true,
  enableMagnetism = true,
}) => {
  const [shouldDisableAnimations, setShouldDisableAnimations] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      setShouldDisableAnimations(isMobile || prefersReducedMotion);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const isDirectContactCard = (card: any) => {
    return card.isContact;
  };

  return (
    <>
      <BentoCardGrid>
        {cardData.map((card, index) => {
          const cardProps = {
            className: isDirectContactCard(card)
              ? "card--contact magic-card card--border-glow"
              : "magic-card card--border-glow",
            style: {
              ...(isDirectContactCard(card)
                ? {
                    gridColumn: "span 2",
                    width: "100%",
                    height: "200px",
                    maxHeight: "200px",
                    minHeight: "200px",
                  }
                : {}),
            } as React.CSSProperties,
          };

          if (enableStars) {
            return (
              <ParticleCard
                key={index}
                {...cardProps}
                disableAnimations={shouldDisableAnimations}
                particleCount={particleCount}
                glowColor={glowColor}
                enableTilt={enableTilt}
                clickEffect={clickEffect}
                enableMagnetism={enableMagnetism}
              >
                <div className="card__content">
                  {card.isContact ? (
                    <>
                      <h2
                        className="card__title"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <span style={{ fontWeight: "500" }}>{card.title}</span>
                      </h2>
                      <p
                        className="card__description"
                        style={{
                          color: "#40FFAA",
                          fontWeight: "600",
                          fontSize: "14px",
                          marginBottom: "8px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {card.description}
                        <EmailIcon />
                      </p>
                      <p
                        style={{
                          color: "#9DE6C6",
                          fontSize: "12px",
                          lineHeight: "1.4",
                          opacity: 0.9,
                        }}
                      >
                        For institutional partnerships, technical integration,
                        <br />
                        or research collaboration inquiries
                      </p>
                      <div className="card__footer">
                        <a
                          href={card.url}
                          className="explore-btn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Contact Forum
                        </a>
                      </div>
                    </>
                  ) : card.isVision ? (
                    <>
                      <h2
                        className="card__title"
                        style={{
                          fontSize: "30px",
                          marginBottom: "12px",
                          color: "#9DE6C6",
                          fontWeight: "400",
                        }}
                      >
                        {card.title}
                      </h2>
                      <p
                        style={{
                          fontSize: "17px",
                          lineHeight: "25px",
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
                      <div className="card__footer"></div>
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
                          fontSize: "17px",
                          lineHeight: "25px",
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
                          fontStyle: "italic",
                        }}
                      >
                        {card.signature}
                      </p>
                      <div className="card__footer"></div>
                    </>
                  ) : (
                    <>
                      <h2 className="card__title">{card.title}</h2>
                      <p className="card__description">{card.description}</p>
                      <div className="card__footer">
                        <a
                          href={card.url}
                          className="explore-btn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Explore
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </ParticleCard>
            );
          }

          return (
            <div
              key={index}
              {...cardProps}
              ref={(el) => {
                if (!el) return;

                const handleMouseMove = (e: MouseEvent) => {
                  if (shouldDisableAnimations || !enableTilt) return;

                  const rect = el.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 25;
                  const rotateY = (centerX - x) / 25;

                  gsap.to(el, {
                    rotationX: rotateX,
                    rotationY: rotateY,
                    transformPerspective: 1000,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                };

                const handleMouseLeave = () => {
                  if (shouldDisableAnimations) return;

                  gsap.to(el, {
                    rotationX: 0,
                    rotationY: 0,
                    duration: 0.5,
                    ease: "power2.out",
                  });
                };

                const handleClick = (e: MouseEvent) => {
                  if (shouldDisableAnimations || !clickEffect) return;

                  const rect = el.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;

                  const ripple = document.createElement("div");
                  ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(${glowColor}, 0.3) 0%, transparent 70%);
                    width: 100px;
                    height: 100px;
                    left: ${x - 50}px;
                    top: ${y - 50}px;
                    pointer-events: none;
                    z-index: 1000;
                  `;

                  el.appendChild(ripple);

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

                el.addEventListener("mousemove", handleMouseMove);
                el.addEventListener("mouseleave", handleMouseLeave);
                el.addEventListener("click", handleClick);

                return () => {
                  el.removeEventListener("mousemove", handleMouseMove);
                  el.removeEventListener("mouseleave", handleMouseLeave);
                  el.removeEventListener("click", handleClick);
                };
              }}
            >
              <div className="card__content">
                {card.isContact ? (
                  <>
                    <h2
                      className="card__title"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <span style={{ fontWeight: "500" }}>{card.title}</span>
                    </h2>
                    <p
                      className="card__description"
                      style={{
                        color: "#40FFAA",
                        fontWeight: "600",
                        fontSize: "14px",
                        marginBottom: "8px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {card.description}
                      <EmailIcon />
                    </p>
                    <p
                      style={{
                        color: "#9DE6C6",
                        fontSize: "12px",
                        lineHeight: "1.4",
                        opacity: 0.9,
                      }}
                    >
                      For institutional partnerships, technical integration,
                      <br />
                      or research collaboration inquiries
                    </p>
                    <div className="card__footer">
                      <a
                        href={card.url}
                        className="explore-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Contact Forum
                      </a>
                    </div>
                  </>
                ) : card.isVision ? (
                  <>
                    <h2
                      className="card__title"
                      style={{
                        fontSize: "30px",
                        marginBottom: "12px",
                        color: "#9DE6C6",
                        fontWeight: "400",
                      }}
                    >
                      {card.title}
                    </h2>
                    <p
                      style={{
                        fontSize: "13px",
                        lineHeight: "1.5",
                        color: "#E5E5E5",
                        marginBottom: "30px",
                        fontWeight: "500",
                        fontStyle: "italic",
                      }}
                    >
                      "
                      <span
                        style={{
                          fontWeight: "500",
                          lineHeight: "30px",
                          fontSize: "20px",
                        }}
                      >
                        {card.description}
                      </span>
                      "
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        lineHeight: "30px",
                        color: "#B0BEC5",
                        fontWeight: "600",
                      }}
                    >
                      {card.secondaryDescription}
                    </p>
                    <div className="card__footer"></div>
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
                        fontSize: "17px",
                        lineHeight: "25px",
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
                        fontStyle: "italic",
                      }}
                    >
                      {card.signature}
                    </p>
                    <div className="card__footer"></div>
                  </>
                ) : (
                  <>
                    <h2 className="card__title">{card.title}</h2>
                    <p className="card__description">{card.description}</p>
                    <div className="card__footer">
                      <a
                        href={card.url}
                        className="explore-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Explore
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </BentoCardGrid>
    </>
  );
};

export default MagicBento;
