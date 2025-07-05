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

  // Track collective interaction (can be used for future behaviors)
  useEffect(() => {
    if (hoveredBoxes.size === 4 && !epistemicCollapseTriggered) {
      setEpistemicCollapseTriggered(true);
      // Future collective behaviors can be added here
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
      title: "meaning is positional",
      description: "A ⇄ B ≠ B ⇄ A",
      visual: "opacity-100 translate-y-0 scale-110",
      color: "text-orange-400",
    },
    {
      title: "Discretion is formatted",
      description: "Freedom is a simulation",
      visual: "opacity-100 translate-y-0 scale-105",
      color: "text-yellow-400",
    },
    {
      title: "SEE TOGETHER",
      description: "BREAK THE ILLUSION",
      visual: "opacity-100 translate-y-0 scale-105 pulse",
      color: "text-red-400",
    },
  ];

  return (
    <div
      className="min-h-screen text-gray-100 font-mono relative overflow-hidden"
      style={{
        background: "radial-gradient(circle, #0B1E16 0%, #050D0A 100%)",
      }}
    >
      <MatrixBackground />

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-3">
          <nav className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-xl font-bold tracking-tight">
                VIGILUM.AI
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <Link to="/vigilum">
                  <Button
                    className="text-white hover:bg-opacity-80 font-mono border border-gray-600"
                    style={{
                      background:
                        "radial-gradient(circle, #0B1E16 0%, #050D0A 100%)",
                    }}
                  >
                    HOME
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <div
                  className="absolute right-0 mt-2 min-w-max border border-gray-600 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out transform group-hover:translate-y-0 translate-y-2 z-50"
                  style={{
                    background:
                      "radial-gradient(circle, #0B1E16 0%, #050D0A 100%)",
                  }}
                >
                  <div className="py-1">
                    <button
                      onClick={() => handleNavigation("#modules")}
                      className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-black hover:bg-opacity-30 transition-colors duration-150 text-left"
                    >
                      <Brain className="mr-3 h-4 w-4" />
                      MODULES
                    </button>
                    <button
                      onClick={() => handleNavigation("#demo")}
                      className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-black hover:bg-opacity-30 transition-colors duration-150 text-left"
                    >
                      <Search className="mr-3 h-4 w-4" />
                      CLAVIS
                    </button>
                    <button
                      onClick={() => handleNavigation("#cases")}
                      className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-black hover:bg-opacity-30 transition-colors duration-150 text-left"
                    >
                      <FileText className="mr-3 h-4 w-4" />
                      CLAUSE LIBRARY
                    </button>
                    <button
                      onClick={() => handleNavigation("#about")}
                      className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-black hover:bg-opacity-30 transition-colors duration-150 text-left"
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
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* System Identity */}
            <div className="text-center mb-10 relative">
              {/* Vertical Trace Lines */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-96 pointer-events-none">
                <svg className="w-full h-full" style={{ opacity: 0.03 }}>
                  <defs>
                    <pattern
                      id="trace-lines"
                      x="0"
                      y="0"
                      width="40"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <line
                        x1="20"
                        y1="0"
                        x2="20"
                        y2="20"
                        stroke="#0BF5A3"
                        strokeWidth="1"
                        strokeDasharray="2,4"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#trace-lines)" />
                </svg>
              </div>

              <h1 className="text-5xl font-bold tracking-tighter mb-6 text-gray-100 relative z-10">
                SEMANTIC GOVERNANCE
                <span className="block text-blue-400">INTELLIGENCE</span>
              </h1>
              <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto relative z-10">
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
                        <div
                          className={
                            index === 3
                              ? "absolute inset-0 flex flex-col items-center justify-center text-center z-10"
                              : "relative z-10"
                          }
                        >
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
            <div className="text-center mb-10 -mt-12">
              <Link to="/vigilum#demo">
                <Button
                  size="lg"
                  className="text-white font-mono px-8 py-4 text-lg transition-all duration-200"
                  style={{
                    backgroundColor: "#004E45",
                    border: "1px solid #003B34",
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#006B60";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#004E45";
                  }}
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Simulate Multi-Clause Behavior
                </Button>
              </Link>
              <p className="text-sm text-gray-500 mt-4 font-mono">
                ϕ(c��…cₙ) ⇨ ⊗(sequence logic) ⇨ G(override graph) ⇨ τ(typology
                projection) ⇨ Λ(pattern flag)
              </p>
            </div>

            {/* Vigilum Modules */}
            <div className="mb-12 text-center mt-8">
              <div className="text-gray-300 font-mono text-sm tracking-wider space-x-3 relative">
                <Link
                  to="/module/clavis"
                  className="hover:text-blue-400 transition-all duration-300 hover:scale-110 inline-block relative"
                  style={{
                    textShadow: "none",
                    filter: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.textShadow =
                      "0 0 15px #60a5fa, 0 0 25px #60a5fa40";
                    e.target.style.filter = "drop-shadow(0 0 8px #60a5fa60)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textShadow = "none";
                    e.target.style.filter = "none";
                  }}
                >
                  CLAVIS
                </Link>
                <span className="text-gray-600">•</span>
                <Link
                  to="/module/obscura"
                  className="hover:text-red-400 transition-all duration-300 hover:scale-110 inline-block relative"
                  style={{
                    textShadow: "none",
                    filter: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.textShadow =
                      "0 0 15px #f87171, 0 0 25px #f8717140";
                    e.target.style.filter = "drop-shadow(0 0 8px #f8717160)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textShadow = "none";
                    e.target.style.filter = "none";
                  }}
                >
                  OBSCURA
                </Link>
                <span className="text-gray-600">•</span>
                <Link
                  to="/module/nullum"
                  className="hover:text-gray-300 transition-all duration-300 hover:scale-110 inline-block relative"
                  style={{
                    textShadow: "none",
                    filter: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.textShadow =
                      "0 0 15px #9ca3af, 0 0 25px #9ca3af40";
                    e.target.style.filter = "drop-shadow(0 0 8px #9ca3af60)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textShadow = "none";
                    e.target.style.filter = "none";
                  }}
                >
                  NULLUM
                </Link>
                <span className="text-gray-600">•</span>
                <Link
                  to="/module/nexus-potentia"
                  className="hover:text-purple-400 transition-all duration-300 hover:scale-110 inline-block relative"
                  style={{
                    textShadow: "none",
                    filter: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.textShadow =
                      "0 0 15px #a78bfa, 0 0 25px #a78bfa40";
                    e.target.style.filter = "drop-shadow(0 0 8px #a78bfa60)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textShadow = "none";
                    e.target.style.filter = "none";
                  }}
                >
                  NEXUS POTENTIA
                </Link>
                <span className="text-gray-600">•</span>
                <Link
                  to="/module/vigilo-core"
                  className="hover:text-green-400 transition-all duration-300 hover:scale-110 inline-block relative"
                  style={{
                    textShadow: "none",
                    filter: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.textShadow =
                      "0 0 15px #34d399, 0 0 25px #34d39940";
                    e.target.style.filter = "drop-shadow(0 0 8px #34d39960)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textShadow = "none";
                    e.target.style.filter = "none";
                  }}
                >
                  VIGILO CORE
                </Link>
                <span className="text-gray-600">•</span>
                <Link
                  to="/module/veris"
                  className="hover:text-yellow-400 transition-all duration-300 hover:scale-110 inline-block relative"
                  style={{
                    textShadow: "none",
                    filter: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.textShadow =
                      "0 0 15px #fbbf24, 0 0 25px #fbbf2440";
                    e.target.style.filter = "drop-shadow(0 0 8px #fbbf2460)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textShadow = "none";
                    e.target.style.filter = "none";
                  }}
                >
                  VERIS
                </Link>
                <span className="text-gray-600">•</span>
                <Link
                  to="/module/sentium"
                  className="hover:text-cyan-400 transition-all duration-300 hover:scale-110 inline-block relative"
                  style={{
                    textShadow: "none",
                    filter: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.textShadow =
                      "0 0 15px #22d3ee, 0 0 25px #22d3ee40";
                    e.target.style.filter = "drop-shadow(0 0 8px #22d3ee60)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textShadow = "none";
                    e.target.style.filter = "none";
                  }}
                >
                  SENTIUM
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
