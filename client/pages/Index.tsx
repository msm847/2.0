import { DemoResponse } from "@shared/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Search, Brain } from "lucide-react";

export default function Index() {
  const [messageFromServer, setMessageFromServer] = useState("");

  useEffect(() => {
    fetchHello();
  }, []);

  const fetchHello = async () => {
    try {
      const response = await fetch("/api/demo");
      const data = (await response.json()) as DemoResponse;
      setMessageFromServer(data.message);
    } catch (error) {
      console.error("Error fetching hello:", error);
    }
  };

  return (
    <div className="min-h-screen bg-vigilum text-vigilum-body font-plex-sans relative overflow-hidden">
      {/* Animated 3D Network Background */}
      <div className="absolute inset-0 pointer-events-none z-0 min-h-[200vh]">
        <div className="absolute inset-0 bg-gradient-to-br from-vigilum-bg via-slate-900/50 to-vigilum-bg"></div>

        {/* Floating Network Nodes */}
        <div className="absolute inset-0">
          {/* Large central nodes */}
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-vigilum-blue rounded-full opacity-60 animate-pulse shadow-lg shadow-vigilum-blue/50">
            <div className="absolute inset-0 bg-vigilum-blue rounded-full animate-ping opacity-30"></div>
          </div>
          <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-blue-400 rounded-full opacity-40 animate-pulse shadow-md shadow-blue-400/30">
            <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20"></div>
          </div>
          <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-cyan-400 rounded-full opacity-30 animate-pulse shadow-lg shadow-cyan-400/40">
            <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-20"></div>
          </div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-vigilum-blue rounded-full opacity-50 animate-pulse shadow-md shadow-vigilum-blue/40">
            <div className="absolute inset-0 bg-vigilum-blue rounded-full animate-ping opacity-25"></div>
          </div>
          <div className="absolute top-1/3 left-2/3 w-3 h-3 bg-blue-300 rounded-full opacity-35 animate-pulse shadow-lg shadow-blue-300/30">
            <div className="absolute inset-0 bg-blue-300 rounded-full animate-ping opacity-20"></div>
          </div>

          {/* Smaller distributed nodes */}
          <div className="absolute top-[15%] left-[60%] w-1 h-1 bg-vigilum-blue rounded-full opacity-40 animate-pulse"></div>
          <div className="absolute top-[80%] left-[20%] w-1 h-1 bg-cyan-300 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-[40%] left-[80%] w-1 h-1 bg-blue-400 rounded-full opacity-35 animate-pulse"></div>
          <div className="absolute top-[70%] left-[70%] w-1 h-1 bg-vigilum-blue rounded-full opacity-25 animate-pulse"></div>
          <div className="absolute top-[25%] left-[40%] w-1 h-1 bg-blue-300 rounded-full opacity-30 animate-pulse"></div>

          {/* Connection lines */}
          <svg
            className="absolute inset-0 w-full opacity-20"
            style={{ height: "200vh" }}
          >
            <defs>
              <linearGradient
                id="line-gradient-1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#316EFF" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient
                id="line-gradient-2"
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#316EFF" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Main connection lines */}
            <line
              x1="25%"
              y1="25%"
              x2="75%"
              y2="50%"
              stroke="url(#line-gradient-1)"
              strokeWidth="1"
            >
              <animate
                attributeName="opacity"
                values="0.1;0.4;0.1"
                dur="4s"
                repeatCount="indefinite"
              />
            </line>
            <line
              x1="33%"
              y1="75%"
              x2="66%"
              y2="33%"
              stroke="url(#line-gradient-2)"
              strokeWidth="1"
            >
              <animate
                attributeName="opacity"
                values="0.2;0.5;0.2"
                dur="6s"
                repeatCount="indefinite"
              />
            </line>
            <line
              x1="67%"
              y1="25%"
              x2="25%"
              y2="75%"
              stroke="url(#line-gradient-1)"
              strokeWidth="1"
            >
              <animate
                attributeName="opacity"
                values="0.1;0.3;0.1"
                dur="5s"
                repeatCount="indefinite"
              />
            </line>
            <line
              x1="20%"
              y1="50%"
              x2="80%"
              y2="40%"
              stroke="url(#line-gradient-2)"
              strokeWidth="1"
            >
              <animate
                attributeName="opacity"
                values="0.15;0.35;0.15"
                dur="7s"
                repeatCount="indefinite"
              />
            </line>

            {/* Secondary connection web */}
            <line
              x1="60%"
              y1="15%"
              x2="40%"
              y2="40%"
              stroke="#316EFF"
              strokeWidth="0.5"
              opacity="0.2"
            >
              <animate
                attributeName="opacity"
                values="0.1;0.3;0.1"
                dur="8s"
                repeatCount="indefinite"
              />
            </line>
            <line
              x1="20%"
              y1="80%"
              x2="70%"
              y2="70%"
              stroke="#60A5FA"
              strokeWidth="0.5"
              opacity="0.15"
            >
              <animate
                attributeName="opacity"
                values="0.05;0.25;0.05"
                dur="6s"
                repeatCount="indefinite"
              />
            </line>
            <line
              x1="80%"
              y1="40%"
              x2="70%"
              y2="70%"
              stroke="#93C5FD"
              strokeWidth="0.5"
              opacity="0.1"
            >
              <animate
                attributeName="opacity"
                values="0.05;0.2;0.05"
                dur="9s"
                repeatCount="indefinite"
              />
            </line>
          </svg>
        </div>

        {/* Moving particles */}
        <div className="absolute inset-0">
          <div
            className="absolute w-1 h-1 bg-vigilum-blue rounded-full opacity-60 shadow-sm shadow-vigilum-blue/50"
            style={{
              animation: "float-1 20s infinite linear",
              left: "10%",
              top: "20%",
            }}
          ></div>
          <div
            className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full opacity-40"
            style={{
              animation: "float-2 25s infinite linear",
              left: "70%",
              top: "60%",
            }}
          ></div>
          <div
            className="absolute w-0.5 h-0.5 bg-blue-300 rounded-full opacity-30"
            style={{
              animation: "float-3 30s infinite linear",
              left: "40%",
              top: "80%",
            }}
          ></div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-vigilum-blue" />
              <span className="text-xl font-medium">Vigilum.AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/vigilum">
                <Button className="bg-white text-black hover:bg-gray-100 font-medium">
                  Full Platform
                </Button>
              </Link>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="container mx-auto px-4 py-32">
          <div className="max-w-3xl mx-auto space-y-12">
            <h1 className="text-6xl font-medium tracking-tight leading-tight">
              When meaning collapses,
              <br />
              power hides in format.
            </h1>

            <div className="space-y-6">
              <div>
                <p
                  className="text-sm text-vigilum-label uppercase tracking-wide font-medium mb-3"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  STRUCTURAL GOVERNANCE INTELLIGENCE
                </p>
                <p className="text-lg text-vigilum-subheadline font-medium leading-relaxed">
                  — where structure, not intent, defines institutional risk
                </p>
              </div>

              <div className="relative max-w-2xl">
                {/* Central text */}
                <div className="text-center mb-8">
                  <p className="text-2xl text-vigilum-body font-medium leading-relaxed">
                    Vigilum simulates how legal systems encode exposure through
                  </p>
                </div>

                {/* Three concept boxes */}
                <div className="flex justify-center items-center gap-8">
                  <div className="bg-slate-800/30 backdrop-blur-sm px-3 py-2 rounded border border-slate-700/50">
                    <span className="text-sm text-vigilum-label font-medium font-plex-mono tracking-wide">
                      clause sequence
                    </span>
                  </div>
                  <div className="bg-slate-800/30 backdrop-blur-sm px-3 py-2 rounded border border-slate-700/50">
                    <span className="text-sm text-vigilum-label font-medium font-plex-mono tracking-wide">
                      override logic
                    </span>
                  </div>
                  <div className="bg-slate-800/30 backdrop-blur-sm px-3 py-2 rounded border border-slate-700/50">
                    <span className="text-sm text-vigilum-label font-medium font-plex-mono tracking-wide">
                      typological collapse
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Link to="/vigilum">
                <Button
                  size="lg"
                  className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-8 py-3"
                >
                  Explore Platform
                </Button>
              </Link>
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 font-medium px-8 py-3"
              >
                View the Codex
              </Button>
            </div>

            {/* Module Block */}
            <div className="grid md:grid-cols-3 gap-8 mt-20">
              {/* Column 1 - Clause-Based Intelligence */}
              <div
                className="group p-8 rounded-lg border border-slate-700/30 hover:border-yellow-500/50 transition-all duration-300 cursor-pointer"
                style={{ background: "rgba(255, 255, 255, 0.02)" }}
              >
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-vigilum-blue group-hover:text-yellow-400 transition-colors duration-300"
                      viewBox="0 0 48 48"
                      fill="none"
                    >
                      <rect
                        x="6"
                        y="6"
                        width="36"
                        height="28"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M12 12h24M12 18h20M12 24h16"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="38"
                        cy="38"
                        r="6"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M35 38h6M38 35v6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M24 30l8 4"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                      />
                    </svg>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm uppercase text-vigilum-label tracking-wide font-medium font-plex-mono">
                    From language
                    <br />
                    To logic
                  </p>
                  <p className="text-base leading-relaxed text-vigilum-subheadline">
                    Failure isn't random — it's recursive, institutional, and
                    often indistinguishable from function.
                    <br />
                    Structure is simulated long before consequence emerges,
                    encoding risk through what appears to constrain.
                  </p>
                  <button className="text-vigilum-blue hover:text-yellow-400 transition-colors duration-300 font-medium text-sm">
                    → View the CLAVIS module
                  </button>
                </div>
              </div>

              {/* Column 2 - Structural Risk Simulation */}
              <div
                className="group p-8 rounded-lg border border-slate-700/30 hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
                style={{ background: "rgba(255, 255, 255, 0.02)" }}
              >
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-vigilum-blue group-hover:text-purple-400 transition-colors duration-300"
                      viewBox="0 0 48 48"
                      fill="none"
                    >
                      <circle
                        cx="24"
                        cy="24"
                        r="18"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle
                        cx="24"
                        cy="24"
                        r="12"
                        stroke="currentColor"
                        strokeWidth="1"
                        opacity="0.6"
                      />
                      <circle
                        cx="24"
                        cy="24"
                        r="6"
                        stroke="currentColor"
                        strokeWidth="1"
                        opacity="0.4"
                      />
                      <text
                        x="18"
                        y="12"
                        className="text-xs font-mono fill-current"
                      >
                        DG
                      </text>
                      <text
                        x="30"
                        y="12"
                        className="text-xs font-mono fill-current"
                      >
                        CI
                      </text>
                      <text
                        x="18"
                        y="38"
                        className="text-xs font-mono fill-current"
                      >
                        RT
                      </text>
                      <text
                        x="30"
                        y="38"
                        className="text-xs font-mono fill-current"
                      >
                        SB
                      </text>
                      <path
                        d="M24 6v12M42 24H30M24 42V30M6 24h12"
                        stroke="currentColor"
                        strokeWidth="1"
                        opacity="0.5"
                      />
                    </svg>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm uppercase text-vigilum-label tracking-wide font-medium font-plex-mono">
                    STRUCTURAL RISK SIMULATION
                  </p>
                  <p className="text-base leading-relaxed text-vigilum-subheadline">
                    Clause structures are mapped into higher-dimensional
                    semantic typology space — revealing how legal form produces
                    risk in permissible form.
                  </p>
                  <button className="text-vigilum-blue hover:text-purple-400 transition-colors duration-300 font-medium text-sm">
                    → Explore Typologies
                  </button>
                </div>
              </div>

              {/* Column 3 - Loophole Pattern Recognition */}
              <div
                className="group p-8 rounded-lg border border-slate-700/30 hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
                style={{ background: "rgba(255, 255, 255, 0.02)" }}
              >
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-vigilum-blue group-hover:text-blue-400 transition-colors duration-300"
                      viewBox="0 0 48 48"
                      fill="none"
                    >
                      <rect
                        x="6"
                        y="8"
                        width="36"
                        height="24"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M12 14h24M12 20h20M12 26h16"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M18 36c0-4 4-8 12-6s8 6 4 10c-2 2-8 0-10-2"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <circle
                        cx="36"
                        cy="40"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <text
                        x="34"
                        y="42"
                        className="text-xs font-mono fill-current"
                      >
                        L
                      </text>
                      <path
                        d="M24 32l6 4M30 32l-6 4"
                        stroke="currentColor"
                        strokeWidth="1"
                        opacity="0.6"
                      />
                    </svg>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm uppercase text-vigilum-label tracking-wide font-medium font-plex-mono">
                    Performance
                    <br />
                    Over promise
                  </p>
                  <p className="text-base leading-relaxed text-vigilum-subheadline">
                    Trained on a corpus of 200+ known structural evasions — from
                    Article 72 expansions to in-house procurement exemptions —
                    Vigilum matches clause logic to real-world loophole profiles
                    before they're exploited.
                  </p>
                  <button className="text-vigilum-blue hover:text-blue-400 transition-colors duration-300 font-medium text-sm">
                    → Browse Loophole Library
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-8 border-t border-slate-700/50">
              <div className="text-center">
                <div className="text-3xl font-medium text-vigilum-blue font-plex-mono">
                  6
                </div>
                <div className="text-sm text-vigilum-label">AI Modules</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-medium text-vigilum-blue font-plex-mono">
                  200+
                </div>
                <div className="text-sm text-vigilum-label">
                  Loopholes Mapped
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-medium text-vigilum-blue font-plex-mono">
                  4
                </div>
                <div className="text-sm text-vigilum-label">
                  Risk Typologies
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-medium text-vigilum-blue font-plex-mono">
                  €2B+
                </div>
                <div className="text-sm text-vigilum-label">Risk Detected</div>
              </div>
            </div>

            {/* Server Message */}
            {messageFromServer && (
              <div className="mt-12 p-4 bg-slate-800 rounded-lg border border-slate-700">
                <p className="text-slate-300 text-sm">
                  Server Status: {messageFromServer}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
