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
      title: "System Intent",
      description: "Legal structures encode intent through design",
      visual: "opacity-100 translate-y-0",
      color: "text-blue-400",
    },
    {
      title: "Embedded Risk",
      description: "Discretionary exposure accumulates in clause vectors",
      visual: "opacity-100 translate-y-0 scale-105",
      color: "text-yellow-400",
    },
    {
      title: "Structural Override",
      description: "Pre-compliant design enables semantic decoherence",
      visual: "opacity-100 translate-y-0 scale-110",
      color: "text-orange-400",
    },
    {
      title: "Test the System",
      description: "Simulate legal behavior through clause analysis",
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
                Detecting embedded override paths in legal structure before
                institutional collapse
              </p>
            </div>

            {/* Animated Clause Logic Flow */}
            <div className="relative mb-20">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {clausePhases.map((phase, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-1000 ${
                      currentPhase === index
                        ? phase.visual
                        : "opacity-40 translate-y-4 scale-95"
                    }`}
                  >
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 rounded-lg">
                      <div
                        className={`text-sm font-bold uppercase tracking-wider mb-3 ${phase.color}`}
                      >
                        {phase.title}
                      </div>
                      <div className="text-sm text-gray-300 leading-relaxed">
                        {phase.description}
                      </div>
                      {index < 3 && (
                        <ArrowRight className="w-4 h-4 text-gray-500 mx-auto mt-4 md:hidden" />
                      )}
                    </div>
                    {index < 3 && (
                      <ArrowRight
                        className="hidden md:block w-6 h-6 text-gray-500 absolute top-1/2 -translate-y-1/2"
                        style={{ left: `${(index + 1) * 25 - 3}%` }}
                      />
                    )}
                  </div>
                ))}
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
                  ANALYZE CLAUSE STRUCTURE
                </Button>
              </Link>
              <p className="text-sm text-gray-500 mt-4 font-mono">
                Input legal text → Vector projection → Override mapping → Risk
                fingerprint
              </p>
            </div>

            {/* Structural Intelligence Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* CLAVIS */}
              <div className="group bg-gray-800/30 backdrop-blur-sm border border-gray-700 p-6 rounded-lg hover:border-blue-500 transition-all duration-300 cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-blue-400">CLAVIS</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                      CLAUSE INTELLIGENCE
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Input → Analysis → Override → Risk projection through semantic
                  vector mapping
                </p>
              </div>

              {/* OBSCURA */}
              <div className="group bg-gray-800/30 backdrop-blur-sm border border-gray-700 p-6 rounded-lg hover:border-yellow-500 transition-all duration-300 cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mr-4">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-yellow-400">
                      OBSCURA
                    </h3>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                      TIMELINE COMPRESSION
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Frictionless procurement detection through temporal sequence
                  analysis
                </p>
              </div>

              {/* NULLUM */}
              <div className="group bg-gray-800/30 backdrop-blur-sm border border-gray-700 p-6 rounded-lg hover:border-orange-500 transition-all duration-300 cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mr-4">
                    <Gauge className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-orange-400">
                      NULLUM
                    </h3>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                      DELAY MAPPING
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Risk accumulation through user non-interaction and procedural
                  drift
                </p>
              </div>
            </div>

            {/* Structural Trust Indicator */}
            <div className="text-center">
              <div className="inline-flex items-center space-x-4 bg-gray-800/40 backdrop-blur-sm border border-gray-700 px-6 py-3 rounded-lg">
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  Structural Foresight
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="text-xs text-gray-400 font-mono">
                  {messageFromServer || "System operational"}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
