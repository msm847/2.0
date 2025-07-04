import { DemoResponse } from "@shared/api";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Shield,
  Search,
  Brain,
  FileText,
  Share2,
  Globe,
  Gauge,
  ChevronDown,
  Upload,
  BarChart3,
} from "lucide-react";
import MatrixBackground from "../components/MatrixBackground";
import DecryptedText from "../components/DecryptedText";
import VigilumModulesCarousel from "../components/VigilumModulesCarousel";

export default function Index() {
  const [messageFromServer, setMessageFromServer] = useState("");
  const [currentPhase, setCurrentPhase] = useState(0);
  const [hoveredBoxes, setHoveredBoxes] = useState(new Set());
  const [epistemicCollapseTriggered, setEpistemicCollapseTriggered] =
    useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(fetchHello, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Simulate clause logic progression
  useEffect(() => {
    const phases = [0, 1, 2, 3];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % phases.length;
      setCurrentPhase(phases[currentIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Track epistemic collapse trigger
  useEffect(() => {
    if (hoveredBoxes.size === 4 && !epistemicCollapseTriggered) {
      setEpistemicCollapseTriggered(true);

      // Trigger epistemic collapse visual effect
      const collapseElement = document.querySelector(".epistemic-collapse");
      if (collapseElement) {
        collapseElement.classList.add("active");
      }

      // Trigger awakening shimmer on final box
      const awakeningBox = document.querySelector(
        '.semantic-operator[data-typology="Λ"]',
      );
      if (awakeningBox) {
        awakeningBox.classList.add("awakened");
      }
    }
  }, [hoveredBoxes, epistemicCollapseTriggered]);

  const handleBoxHover = (index) => {
    setHoveredBoxes((prev) => new Set([...prev, index]));
  };

  const handleNavigation = (hash: string) => {
    navigate(`/vigilum${hash}`);
  };

  const fetchHello = async () => {
    try {
      const baseUrl = window.location.origin;
      const apiUrl = `${baseUrl}/api/demo`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as DemoResponse;
      setMessageFromServer(data.message);
    } catch (error) {
      console.error("Error fetching hello:", error);

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          setMessageFromServer("Request timeout - server unavailable");
        } else if (error.message.includes("fetch")) {
          setMessageFromServer("Network error - cannot reach server");
        } else {
          setMessageFromServer("API connection unavailable");
        }
      } else {
        setMessageFromServer("Unknown error occurred");
      }
    }
  };

  const clausePhases = [
    {
      title: "Legality is structure",
      description: "Safety is not implied",
      visual: "opacity-100 translate-y-0",
      color: "text-blue-400",
    },
    {
      title: "Discretion is formatted",
      description: "Freedom is a simulation",
      visual: "opacity-100 translate-y-0 scale-105",
      color: "text-yellow-400",
    },
    {
      title: "meaning is positional",
      description: "Clauses collide, not coexist",
      visual: "opacity-100 translate-y-0 scale-110",
      color: "text-orange-400",
    },
    {
      title: "SEE TOGETHER",
      description: "BREAK THE ILLUSION",
      visual: "opacity-100 translate-y-0 scale-105 pulse",
      color: "text-red-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-mono relative overflow-hidden">
      <MatrixBackground />

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold tracking-tight">
                VIGILUM.AI
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <Link to="/vigilum">
                  <Button className="bg-gray-800 text-white hover:bg-gray-700 font-mono border border-gray-600">
                    STRUCTURAL ANALYSIS
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <div className="absolute right-0 mt-2 w-full bg-gray-800 border border-gray-600 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out transform group-hover:translate-y-0 translate-y-2 z-50">
                  <div className="py-1">
                    <button
                      onClick={() => handleNavigation("#modules")}
                      className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors duration-150 text-left"
                    >
                      <Brain className="mr-3 h-4 w-4" />
                      MODULES
                    </button>
                    <button
                      onClick={() => handleNavigation("#demo")}
                      className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors duration-150 text-left"
                    >
                      <Search className="mr-3 h-4 w-4" />
                      CLAVIS
                    </button>
                    <button
                      onClick={() => handleNavigation("#cases")}
                      className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors duration-150 text-left"
                    >
                      <FileText className="mr-3 h-4 w-4" />
                      CASE STUDIES
                    </button>
                    <button
                      onClick={() => handleNavigation("#about")}
                      className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors duration-150 text-left"
                    >
                      <Globe className="mr-3 h-4 w-4" />
                      METHODOLOGY
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>

        {/* Cognitive Entrypoint - Clause Logic Simulation */}
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* System Identity */}
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold tracking-tighter mb-6 text-gray-100">
                SEMANTIC GOVERNANCE
                <span className="block text-blue-400">INTELLIGENCE</span>
              </h1>
              <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
                <DecryptedText
                  text="Simulating override before discretion encodes compliance"
                  animateOn="view"
                  sequential={true}
                  speed={80}
                  className="text-gray-400"
                  encryptedClassName="text-gray-600"
                  useOriginalCharsOnly={true}
                />
              </p>
            </div>

            {/* Epistemic Semantic Operators */}
            <div className="relative mb-20" id="semantic-operators">
              {/* Epistemic Field Background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-radial from-indigo-500/3 via-transparent to-transparent blur-3xl animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-conic from-violet-500/2 via-transparent to-blue-500/2 blur-2xl animate-spin-slow"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
                {clausePhases.map((phase, index) => {
                  // Typological color schemes
                  const getTypologyColors = (index) => {
                    switch (index) {
                      case 0: // Legality is Structure (CI - Clause Interference)
                        return {
                          bg: "#E0E5F5",
                          border: "#C5CCE8",
                          glow: "#8B9DE8",
                          glyph: "⊗",
                          shadow: "rgba(139, 157, 232, 0.2)",
                        };
                      case 1: // Discretion is Formatted (DG - Discretionary Gap)
                        return {
                          bg: "#F5EDE0",
                          border: "#E8D5C0",
                          glow: "#D4A874",
                          glyph: "τ",
                          shadow: "rgba(212, 168, 116, 0.2)",
                        };
                      case 2: // Meaning is Positional (OD - Override Detection)
                        return {
                          bg: "#F7F1D4",
                          border: "#EDE3B8",
                          glow: "#D4C574",
                          glyph: "ϕ",
                          shadow: "rgba(212, 197, 116, 0.2)",
                        };
                      case 3: // See Together (SC - Structural Collapse/Awakening)
                        return {
                          bg: "#F8D4D4",
                          border: "#F0B8B8",
                          glow: "#E88888",
                          glyph: "Λ",
                          shadow: "rgba(232, 136, 136, 0.2)",
                        };
                      default:
                        return {
                          bg: "#F0F0F0",
                          border: "#E0E0E0",
                          glow: "#C0C0C0",
                          glyph: "○",
                          shadow: "rgba(192, 192, 192, 0.2)",
                        };
                    }
                  };

                  // Arc positioning with horizontal arc and inward rotation
                  const getArcTransform = () => {
                    switch (index) {
                      case 0:
                        return "perspective(1000px) rotateY(2deg) rotateX(3deg) translateY(-2px)";
                      case 1:
                        return "perspective(1000px) rotateY(1deg) rotateX(3deg) translateY(-1px)";
                      case 2:
                        return "perspective(1000px) rotateY(-1deg) rotateX(3deg) translateY(-1px)";
                      case 3:
                        return "perspective(1000px) rotateY(-2deg) rotateX(3deg) translateY(-2px)";
                      default:
                        return "perspective(1000px) rotateX(3deg)";
                    }
                  };

                  const getHoverTransform = () => {
                    switch (index) {
                      case 0:
                        return "perspective(1000px) rotateY(2deg) rotateX(4.5deg) translateY(-2px) scale(1.04)";
                      case 1:
                        return "perspective(1000px) rotateY(1deg) rotateX(4.5deg) translateY(-1px) scale(1.04)";
                      case 2:
                        return "perspective(1000px) rotateY(-1deg) rotateX(4.5deg) translateY(-1px) scale(1.04)";
                      case 3:
                        return "perspective(1000px) rotateY(-2deg) rotateX(4.5deg) translateY(-2px) scale(1.04)";
                      default:
                        return "perspective(1000px) rotateX(4.5deg) scale(1.04)";
                    }
                  };

                  const colors = getTypologyColors(index);

                  return (
                    <div
                      key={index}
                      className={`transition-all duration-1000 ${
                        currentPhase === index
                          ? phase.visual
                          : "opacity-70 translate-y-2 scale-98"
                      }`}
                      style={{
                        willChange: "transform, opacity",
                      }}
                    >
                      <div
                        className="relative group cursor-pointer semantic-operator"
                        style={{
                          transform: getArcTransform(),
                          transition:
                            "transform 0.3s ease-out, box-shadow 0.3s ease-out",
                          willChange: "transform",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = getHoverTransform();
                          e.currentTarget.style.boxShadow = `0 15px 40px ${colors.shadow}, 0 0 30px ${colors.shadow}`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = getArcTransform();
                          e.currentTarget.style.boxShadow = `0 8px 25px rgba(0, 0, 0, 0.1)`;
                        }}
                        data-typology={colors.glyph}
                      >
                        {/* Semantic Lens Surface */}
                        <div
                          className="relative p-6 rounded-lg text-center overflow-hidden border-2"
                          style={{
                            backgroundColor: colors.bg,
                            borderColor: colors.border,
                            boxShadow: `
                              0 8px 25px rgba(0, 0, 0, 0.1),
                              inset 0 1px 0 rgba(255, 255, 255, 0.8),
                              inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                            `,
                            transformOrigin: "center bottom",
                          }}
                        >
                          {/* Epistemic Pressure Gradient */}
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                            style={{
                              background: `
                                radial-gradient(ellipse 120% 150% at center,
                                  ${colors.glow} 0%,
                                  transparent 70%
                                )
                              `,
                            }}
                          />

                          {/* Typology Glyph */}
                          <div
                            className="absolute bottom-2 right-3 opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                            style={{
                              fontSize: "1.2rem",
                              color: colors.glow,
                              fontFamily: "serif",
                              fontWeight: "300",
                            }}
                          >
                            {colors.glyph}
                          </div>

                          {/* Surface Tension Field */}
                          <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                            <div
                              className="w-full h-full"
                              style={{
                                background: `
                                  repeating-linear-gradient(
                                    120deg,
                                    transparent,
                                    transparent 15px,
                                    ${colors.glow} 15px,
                                    ${colors.glow} 16px
                                  )
                                `,
                              }}
                            />
                          </div>

                          {/* Content Layer */}
                          <div className="relative z-10">
                            <div
                              className="text-sm font-bold uppercase tracking-wider mb-3 transition-all duration-300 group-hover:scale-105"
                              style={{
                                color: "#1a1a1a",
                                textShadow: `0 0 8px ${colors.glow}20`,
                              }}
                            >
                              {phase.title}
                            </div>
                            <div
                              className="text-sm leading-relaxed transition-all duration-300 group-hover:scale-102"
                              style={{
                                color: "#2a2a2a",
                                fontWeight: index === 3 ? "600" : "400",
                              }}
                            >
                              {index === 3 ? (
                                <span className="font-bold">
                                  {phase.description}
                                </span>
                              ) : (
                                phase.description
                              )}
                            </div>
                          </div>

                          {/* Perceptual Activation Pulse */}
                          <div
                            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none"
                            style={{
                              boxShadow: `inset 0 0 20px ${colors.glow}30`,
                              animation: "pulse 2s ease-in-out infinite",
                            }}
                          />
                        </div>

                        {/* Arrow for mobile (if needed) */}
                        {index < 3 && (
                          <ArrowRight className="w-4 h-4 text-gray-500 mx-auto mt-4 md:hidden" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Epistemic Collapse Trigger (activated after all boxes hovered) */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-1000 epistemic-collapse"
                style={{
                  background:
                    "radial-gradient(ellipse 150% 50% at center bottom, rgba(120, 119, 198, 0.1) 0%, transparent 100%)",
                  transform: "translateY(5px)",
                }}
              />
            </div>

            {/* Primary Engagement */}
            <div className="text-center mb-16">
              <Link to="/vigilum#demo">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-mono px-8 py-4 text-lg border border-blue-500"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Simulate Multi-Clause Behavior
                </Button>
              </Link>
              <p className="text-sm text-gray-500 mt-4 font-mono">
                ϕ(c₁…cₙ) ⇨ ⊗(sequence logic) ⇨ G(override graph) ⇨ τ(typology
                projection) ⇨ Λ(pattern flag)
              </p>
            </div>

            {/* Vigilum Modules Carousel */}
            <div className="mb-16">
              <VigilumModulesCarousel
                autoRotate={true}
                rotationInterval={4500}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
