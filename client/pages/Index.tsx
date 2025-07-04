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

            {/* Animated Clause Logic Flow - Warped Field */}
            <div className="relative mb-20 perspective-1000">
              {/* Cognitive Pressure Field Background */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-blue-500/5 via-transparent to-transparent blur-3xl animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-conic from-purple-500/3 via-transparent to-blue-500/3 blur-2xl animate-spin-slow"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {clausePhases.map((phase, index) => {
                  // Arc positioning - create shallow arc with outer boxes angled inward
                  const getArcTransform = () => {
                    switch (index) {
                      case 0:
                        return "rotateY(8deg) rotateX(-2deg)";
                      case 1:
                        return "rotateY(3deg) rotateX(-1deg)";
                      case 2:
                        return "rotateY(-3deg) rotateX(-1deg)";
                      case 3:
                        return "rotateY(-8deg) rotateX(-2deg)";
                      default:
                        return "rotateY(0deg)";
                    }
                  };

                  const getHoverTransform = () => {
                    switch (index) {
                      case 0:
                        return "rotateY(12deg) rotateX(-5deg) rotateZ(2deg)";
                      case 1:
                        return "rotateY(5deg) rotateX(-3deg) rotateZ(-1deg)";
                      case 2:
                        return "rotateY(-5deg) rotateX(-3deg) rotateZ(1deg)";
                      case 3:
                        return "rotateY(-12deg) rotateX(-5deg) rotateZ(-2deg)";
                      default:
                        return "rotateY(0deg)";
                    }
                  };

                  return (
                    <div
                      key={index}
                      className={`transition-all duration-1000 ${
                        currentPhase === index
                          ? phase.visual
                          : "opacity-40 translate-y-4 scale-95"
                      }`}
                      style={{
                        perspective: "1000px",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <div
                        className="relative group cursor-pointer"
                        style={{
                          transform: getArcTransform(),
                          transformStyle: "preserve-3d",
                          transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = getHoverTransform();
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = getArcTransform();
                        }}
                      >
                        {/* Curved Surface with Cognitive Pressure */}
                        <div
                          className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 rounded-lg text-center overflow-hidden"
                          style={{
                            transform: "rotateX(-3deg) scaleY(0.96)",
                            transformOrigin: "center bottom",
                            boxShadow: `
                              0 8px 25px rgba(0, 0, 0, 0.4),
                              0 0 0 1px rgba(255, 255, 255, 0.05),
                              inset 0 1px 0 rgba(255, 255, 255, 0.1),
                              inset 0 -1px 0 rgba(0, 0, 0, 0.2)
                            `,
                            background: `
                              radial-gradient(ellipse 150% 100% at center bottom,
                                rgba(55, 65, 81, 0.6) 0%,
                                rgba(55, 65, 81, 0.3) 70%,
                                rgba(55, 65, 81, 0.1) 100%
                              ),
                              linear-gradient(to bottom,
                                rgba(75, 85, 99, 0.4) 0%,
                                rgba(55, 65, 81, 0.6) 100%
                              )
                            `,
                          }}
                        >
                          {/* Pressure Field Gradient */}
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                              background: `
                                radial-gradient(ellipse 120% 150% at center,
                                  ${phase.color.replace("text-", "")}20 0%,
                                  transparent 70%
                                ),
                                radial-gradient(ellipse 80% 200% at center bottom,
                                  rgba(255, 255, 255, 0.05) 0%,
                                  transparent 50%
                                )
                              `,
                            }}
                          />

                          {/* Reactive Light Beam */}
                          <div
                            className="absolute inset-x-0 bottom-0 h-px opacity-0 group-hover:opacity-100 transition-all duration-500"
                            style={{
                              background: `linear-gradient(90deg,
                                transparent 0%,
                                ${
                                  phase.color.includes("blue")
                                    ? "#60A5FA"
                                    : phase.color.includes("yellow")
                                      ? "#FBBF24"
                                      : phase.color.includes("orange")
                                        ? "#FB923C"
                                        : "#EF4444"
                                } 50%,
                                transparent 100%
                              )`,
                              boxShadow: `0 0 20px ${
                                phase.color.includes("blue")
                                  ? "#60A5FA"
                                  : phase.color.includes("yellow")
                                    ? "#FBBF24"
                                    : phase.color.includes("orange")
                                      ? "#FB923C"
                                      : "#EF4444"
                              }`,
                            }}
                          />

                          {/* Surface Tension Grid */}
                          <div className="absolute inset-0 opacity-20">
                            <div
                              className="w-full h-full"
                              style={{
                                background: `
                                  repeating-linear-gradient(
                                    45deg,
                                    transparent,
                                    transparent 10px,
                                    rgba(255, 255, 255, 0.02) 10px,
                                    rgba(255, 255, 255, 0.02) 11px
                                  ),
                                  repeating-linear-gradient(
                                    -45deg,
                                    transparent,
                                    transparent 10px,
                                    rgba(255, 255, 255, 0.02) 10px,
                                    rgba(255, 255, 255, 0.02) 11px
                                  )
                                `,
                              }}
                            />
                          </div>

                          {/* Content Layer */}
                          <div className="relative z-10">
                            <div
                              className={`text-sm font-bold uppercase tracking-wider mb-3 transition-all duration-300 group-hover:scale-105 ${phase.color}`}
                              style={{
                                textShadow: `0 0 10px ${
                                  phase.color.includes("blue")
                                    ? "#60A5FA"
                                    : phase.color.includes("yellow")
                                      ? "#FBBF24"
                                      : phase.color.includes("orange")
                                        ? "#FB923C"
                                        : "#EF4444"
                                }50`,
                              }}
                            >
                              {phase.title}
                            </div>
                            <div className="text-sm text-gray-300 leading-relaxed transition-all duration-300 group-hover:text-gray-100">
                              {index === 3 ? (
                                <span className="font-bold">
                                  {phase.description}
                                </span>
                              ) : (
                                phase.description
                              )}
                            </div>
                          </div>

                          {/* Depth Shadow */}
                          <div
                            className="absolute inset-x-0 -bottom-2 h-8 opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                            style={{
                              background: `
                                radial-gradient(ellipse 90% 100% at center top,
                                  rgba(0, 0, 0, 0.6) 0%,
                                  rgba(0, 0, 0, 0.2) 50%,
                                  transparent 100%
                                )
                              `,
                              transform:
                                "perspective(100px) rotateX(90deg) translateZ(-20px)",
                              filter: "blur(6px)",
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
