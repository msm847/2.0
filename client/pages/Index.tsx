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

            {/* Structural Clause Operators */}
            <div
              className="relative mb-20 bg-gray-950 p-8 rounded-xl"
              id="clause-operators"
            >
              {/* Structural Texture Background */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div
                  className="w-full h-full"
                  style={{
                    background: `
                      repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 2px,
                        rgba(255, 255, 255, 0.1) 2px,
                        rgba(255, 255, 255, 0.1) 3px
                      ),
                      repeating-linear-gradient(
                        90deg,
                        transparent,
                        transparent 2px,
                        rgba(255, 255, 255, 0.1) 2px,
                        rgba(255, 255, 255, 0.1) 3px
                      )
                    `,
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                {clausePhases.map((phase, index) => {
                  // Typological mapping per specification
                  const getTypologyData = (index) => {
                    switch (index) {
                      case 0: // Legality is Structure (CI)
                        return {
                          className: "clause-ci",
                          bg: "#DCE5FA",
                          border: "#B5C7ED",
                          glyph: "ϕ",
                          typology: "CI",
                        };
                      case 1: // Discretion is Formatted (DG)
                        return {
                          className: "clause-dg",
                          bg: "#F5D6B3",
                          border: "#E0BA89",
                          glyph: "Δ",
                          typology: "DG",
                        };
                      case 2: // Meaning is Positional (OD)
                        return {
                          className: "clause-od",
                          bg: "#F3E6BA",
                          border: "#E6D197",
                          glyph: "⊗",
                          typology: "OD",
                        };
                      case 3: // See Together. Break the Illusion. (SC)
                        return {
                          className: "clause-sc",
                          bg: "#F6D4D4",
                          border: "#E9BABA",
                          glyph: "λ",
                          typology: "SC",
                        };
                      default:
                        return {
                          className: "clause-default",
                          bg: "#F0F0F0",
                          border: "#E0E0E0",
                          glyph: "○",
                          typology: "DEFAULT",
                        };
                    }
                  };

                  const typologyData = getTypologyData(index);

                  // Arc positioning
                  const getArcStyle = () => {
                    switch (index) {
                      case 0:
                        return { transform: "rotateY(2deg)" };
                      case 1:
                        return { transform: "rotateY(0.5deg)" };
                      case 2:
                        return { transform: "rotateY(-0.5deg)" };
                      case 3:
                        return { transform: "rotateY(-2deg)" };
                      default:
                        return { transform: "rotateY(0deg)" };
                    }
                  };

                  return (
                    <div
                      key={index}
                      className={`vigilum-clause-box ${typologyData.className} ${
                        currentPhase === index ? "active" : ""
                      }`}
                      data-glyph={typologyData.glyph}
                      style={{
                        ...getArcStyle(),
                        backgroundColor: typologyData.bg,
                        borderColor: typologyData.border,
                        position: "relative",
                        padding: "2rem",
                        borderRadius: "12px",
                        border: "1px solid",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        transformStyle: "preserve-3d",
                        willChange: "transform",
                        perspective: "1000px",
                      }}
                      onMouseEnter={() => handleBoxHover(index)}
                    >
                      {/* Content */}
                      <h3 className="text-lg font-bold uppercase tracking-wider mb-3 text-gray-900">
                        {phase.title}
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {index === 3 ? (
                          <span className="font-bold">{phase.description}</span>
                        ) : (
                          phase.description
                        )}
                      </p>

                      {/* Glyph Overlay */}
                      <div
                        className="absolute bottom-3 right-4 glyph-overlay"
                        style={{
                          fontSize: "2.2rem",
                          opacity: "0.1",
                          color: "#333",
                          pointerEvents: "none",
                          transition: "opacity 0.3s ease",
                        }}
                      >
                        {typologyData.glyph}
                      </div>

                      {/* Arrow for mobile */}
                      {index < 3 && (
                        <ArrowRight className="w-4 h-4 text-gray-500 mx-auto mt-4 md:hidden" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Collective Trigger - Grid Curvature */}
              {epistemicCollapseTriggered && (
                <div
                  className="absolute inset-0 pointer-events-none structural-collapse"
                  style={{
                    background:
                      "radial-gradient(ellipse 200% 50% at center bottom, rgba(120, 119, 198, 0.05) 0%, transparent 100%)",
                    transform: "perspective(2000px) rotateX(1deg)",
                    borderRadius: "12px",
                  }}
                />
              )}
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
