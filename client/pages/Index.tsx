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
import LetterGlitch from "../components/LetterGlitch";

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

  // Track glass shatter trigger - when all 3 other boxes hovered, prepare red box for shatter
  useEffect(() => {
    if (hoveredBoxes.size === 3 && !hoveredBoxes.has(3)) {
      // All boxes except red box hovered - prepare for shatter
      const redBox = document.querySelector(".glass-clause-sc");
      if (redBox) {
        redBox.classList.add("shatter-ready");
      }
    }

    if (hoveredBoxes.size === 4 && !epistemicCollapseTriggered) {
      setEpistemicCollapseTriggered(true);

      // Trigger glass shatter on red "See Together" box
      const redBox = document.querySelector(".glass-clause-sc");
      if (redBox) {
        redBox.classList.add("shattered");
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
      description: "Clauses collide,\nnot coexist",
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

            {/* Glass-Logic Semantic Containers */}
            <div className="relative mb-20 px-4" id="glass-logic-containers">
              {/* Live Canvas-Rendered Symbolic Glitch Background */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <LetterGlitch
                  glitchColors={[
                    "#0A0E14",
                    "#1a2332",
                    "#2b4539",
                    "#61dca3",
                    "#61b3dc",
                  ]}
                  glitchSpeed={80}
                  centerVignette={false}
                  outerVignette={true}
                  smooth={true}
                  className="w-full h-full"
                />
              </div>

              {/* Glass Container Grid */}
              <div className="relative p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                  {clausePhases.map((phase, index) => {
                    // Glass-Logic Typological Mapping
                    const getGlassTypology = (index) => {
                      switch (index) {
                        case 0: // Legality is Structure (CI)
                          return {
                            className: "glass-clause-ci",
                            accentColor: "#3A56D8",
                            glyph: "ϕ",
                            typology: "CI",
                            floatDelay: "0s",
                          };
                        case 1: // Discretion is Formatted (DG)
                          return {
                            className: "glass-clause-dg",
                            accentColor: "#F85E00",
                            glyph: "Δ",
                            typology: "DG",
                            floatDelay: "1.5s",
                          };
                        case 2: // Meaning is Positional (OD)
                          return {
                            className: "glass-clause-od",
                            accentColor: "#F4C900",
                            glyph: "⊗",
                            typology: "OD",
                            floatDelay: "3s",
                          };
                        case 3: // See Together. Break the Illusion. (SC)
                          return {
                            className: "glass-clause-sc",
                            accentColor: "#FF1B4C",
                            glyph: "λ",
                            typology: "SC",
                            floatDelay: "4.5s",
                          };
                        default:
                          return {
                            className: "glass-clause-default",
                            accentColor: "#FFFFFF",
                            glyph: "○",
                            typology: "DEFAULT",
                            floatDelay: "0s",
                          };
                      }
                    };

                    const glassData = getGlassTypology(index);

                    return (
                      <div
                        key={index}
                        className={`glass-logic-container ${glassData.className} ${
                          currentPhase === index ? "logic-active" : ""
                        }`}
                        data-typology={glassData.typology}
                        style={{
                          "--accent-color": glassData.accentColor,
                          "--float-delay": glassData.floatDelay,
                          position: "relative",
                          background: "rgba(255, 255, 255, 0.05)",
                          backdropFilter: "blur(12px)",
                          border: "1px solid rgba(255, 255, 255, 0.15)",
                          borderLeft: `3px solid ${glassData.accentColor}`,
                          borderRadius: "16px",
                          padding: "2rem",
                          transition:
                            "transform 0.3s ease, box-shadow 0.3s ease",
                          transformStyle: "preserve-3d",
                          willChange: "transform",
                          animation: `glass-float 6s ease-in-out infinite`,
                          animationDelay: glassData.floatDelay,
                        }}
                        onMouseEnter={() => handleBoxHover(index)}
                      >
                        {/* Glass Reflectivity Edge */}
                        <div
                          className="absolute top-0 left-0 right-0 h-px"
                          style={{
                            background:
                              "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)",
                          }}
                        />

                        {/* Inner Glass Glow */}
                        <div
                          className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 glass-inner-glow"
                          style={{
                            boxShadow: `inset 0 0 20px ${glassData.accentColor}20`,
                          }}
                        />

                        {/* Content */}
                        <div className="relative z-10">
                          <h3 className="text-lg font-bold uppercase tracking-wider mb-3 text-white">
                            {phase.title}
                          </h3>
                          <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                            {index === 3 ? (
                              <span className="font-bold text-white">
                                {phase.description}
                              </span>
                            ) : (
                              phase.description
                            )}
                          </p>
                        </div>

                        {/* Faint Typology Glyph */}
                        <div
                          className="absolute bottom-4 right-4 text-white transition-opacity duration-300 glass-glyph"
                          style={{
                            fontSize: "1.8rem",
                            opacity: "0.1",
                            fontFamily: "serif",
                            fontWeight: "300",
                          }}
                        >
                          {glassData.glyph}
                        </div>

                        {/* Special Shatter Overlay for Red Box */}
                        {index === 3 && (
                          <div className="absolute inset-0 opacity-0 shatter-overlay pointer-events-none">
                            {/* SVG Crack Pattern */}
                            <svg
                              className="absolute inset-0 w-full h-full"
                              viewBox="0 0 200 120"
                              style={{ opacity: 0 }}
                            >
                              <defs>
                                <path
                                  id="crack1"
                                  d="M50,20 L120,80 L180,40"
                                  strokeWidth="0.5"
                                  stroke="rgba(255, 255, 255, 0.6)"
                                  fill="none"
                                />
                                <path
                                  id="crack2"
                                  d="M20,60 L100,30 L160,90"
                                  strokeWidth="0.3"
                                  stroke="rgba(255, 255, 255, 0.4)"
                                  fill="none"
                                />
                                <path
                                  id="crack3"
                                  d="M80,10 L140,100 L190,60"
                                  strokeWidth="0.4"
                                  stroke="rgba(255, 255, 255, 0.5)"
                                  fill="none"
                                />
                              </defs>
                              <use href="#crack1" className="crack-line" />
                              <use href="#crack2" className="crack-line" />
                              <use href="#crack3" className="crack-line" />
                            </svg>

                            {/* Shattered State Content */}
                            <div className="absolute inset-0 flex items-center justify-center shattered-content opacity-0">
                              <div className="text-center">
                                <h3 className="text-xl font-bold text-red-400 mb-2">
                                  STRUCTURE EXPOSED
                                </h3>
                                <p className="text-sm text-gray-300">
                                  Simulation no longer holds.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Arrow for mobile */}
                        {index < 3 && (
                          <ArrowRight className="w-4 h-4 text-gray-400 mx-auto mt-4 md:hidden opacity-50" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Ambient System Activity Indicators */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <div
                    className="w-2 h-2 rounded-full bg-green-400 animate-pulse"
                    style={{ animationDelay: "0s" }}
                  />
                  <div
                    className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  />
                  <div
                    className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"
                    style={{ animationDelay: "1s" }}
                  />
                </div>
              </div>
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
