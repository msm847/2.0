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
          {/* Large central nodes - distributed across extended height */}

          <div
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-40 animate-pulse shadow-md shadow-blue-400/30"
            style={{
              top: "35%",
              right: "30%",
              animation: "float-1 19s infinite linear, pulse 2.1s infinite",
            }}
          >
            <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20"></div>
          </div>
          <div
            className="absolute w-4 h-4 bg-cyan-400 rounded-full opacity-30 animate-pulse shadow-lg shadow-cyan-400/40"
            style={{
              top: "25%",
              right: "25%",
              animation: "float-2 22s infinite linear, pulse 2.3s infinite",
            }}
          >
            <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-20"></div>
          </div>
          <div
            className="absolute w-2 h-2 bg-vigilum-blue rounded-full opacity-50 animate-pulse shadow-md shadow-vigilum-blue/40"
            style={{
              top: "55%",
              left: "35%",
              animation: "float-3 18s infinite linear, pulse 2s infinite",
            }}
          >
            <div className="absolute inset-0 bg-vigilum-blue rounded-full animate-ping opacity-25"></div>
          </div>
          <div
            className="absolute w-3 h-3 bg-blue-300 rounded-full opacity-35 animate-pulse shadow-lg shadow-blue-300/30"
            style={{
              top: "45%",
              left: "65%",
              animation: "float-1 21s infinite linear, pulse 2.2s infinite",
            }}
          >
            <div className="absolute inset-0 bg-blue-300 rounded-full animate-ping opacity-20"></div>
          </div>
          <div
            className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-45 animate-pulse shadow-md shadow-cyan-400/30"
            style={{
              top: "75%",
              left: "20%",
              animation: "float-2 17s infinite linear, pulse 1.9s infinite",
            }}
          >
            <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-20"></div>
          </div>
          <div
            className="absolute w-3 h-3 bg-vigilum-blue rounded-full opacity-40 animate-pulse shadow-lg shadow-vigilum-blue/40"
            style={{
              top: "85%",
              right: "40%",
              animation: "float-3 20s infinite linear, pulse 2.4s infinite",
            }}
          >
            <div className="absolute inset-0 bg-vigilum-blue rounded-full animate-ping opacity-25"></div>
          </div>
          <div
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-35 animate-pulse shadow-md shadow-blue-400/30"
            style={{
              top: "110%",
              left: "45%",
              animation: "float-1 23s infinite linear, pulse 2.1s infinite",
            }}
          >
            <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20"></div>
          </div>
          <div
            className="absolute w-4 h-4 bg-cyan-300 rounded-full opacity-30 animate-pulse shadow-lg shadow-cyan-300/40"
            style={{
              top: "130%",
              right: "30%",
              animation: "float-2 16s infinite linear, pulse 2.5s infinite",
            }}
          >
            <div className="absolute inset-0 bg-cyan-300 rounded-full animate-ping opacity-20"></div>
          </div>

          {/* Enhanced medium nodes with more movement */}
          <div
            className="absolute w-2 h-2 bg-blue-500 rounded-full opacity-45 animate-pulse shadow-md shadow-blue-500/30"
            style={{
              top: "10%",
              left: "50%",
              animation: "float-1 18s infinite linear, pulse 2s infinite",
            }}
          >
            <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-25"></div>
          </div>
          <div
            className="absolute w-3 h-3 bg-cyan-500 rounded-full opacity-40 animate-pulse shadow-lg shadow-cyan-500/35"
            style={{
              top: "30%",
              left: "10%",
              animation: "float-2 22s infinite linear, pulse 2.5s infinite",
            }}
          >
            <div className="absolute inset-0 bg-cyan-500 rounded-full animate-ping opacity-30"></div>
          </div>
          <div
            className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-50 animate-pulse shadow-md shadow-blue-300/40"
            style={{
              top: "50%",
              right: "10%",
              animation: "float-3 16s infinite linear, pulse 1.8s infinite",
            }}
          >
            <div className="absolute inset-0 bg-blue-300 rounded-full animate-ping opacity-25"></div>
          </div>
          <div
            className="absolute w-3 h-3 bg-vigilum-blue rounded-full opacity-35 animate-pulse shadow-lg shadow-vigilum-blue/45"
            style={{
              top: "65%",
              left: "80%",
              animation: "float-1 20s infinite linear, pulse 2.2s infinite",
            }}
          >
            <div className="absolute inset-0 bg-vigilum-blue rounded-full animate-ping opacity-30"></div>
          </div>
          <div
            className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-40 animate-pulse shadow-md shadow-cyan-400/35"
            style={{
              top: "95%",
              left: "15%",
              animation: "float-2 24s infinite linear, pulse 1.9s infinite",
            }}
          >
            <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-25"></div>
          </div>
          <div
            className="absolute w-4 h-4 bg-blue-600 rounded-full opacity-30 animate-pulse shadow-lg shadow-blue-600/40"
            style={{
              top: "105%",
              right: "20%",
              animation: "float-3 19s infinite linear, pulse 2.1s infinite",
            }}
          >
            <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-25"></div>
          </div>
          <div
            className="absolute w-2 h-2 bg-cyan-300 rounded-full opacity-45 animate-pulse shadow-md shadow-cyan-300/30"
            style={{
              top: "125%",
              left: "60%",
              animation: "float-1 21s infinite linear, pulse 2.3s infinite",
            }}
          >
            <div className="absolute inset-0 bg-cyan-300 rounded-full animate-ping opacity-30"></div>
          </div>
          <div
            className="absolute w-3 h-3 bg-blue-400 rounded-full opacity-35 animate-pulse shadow-lg shadow-blue-400/35"
            style={{
              top: "140%",
              left: "35%",
              animation: "float-2 17s infinite linear, pulse 2.4s infinite",
            }}
          >
            <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-25"></div>
          </div>
          <div
            className="absolute w-2 h-2 bg-vigilum-blue rounded-full opacity-50 animate-pulse shadow-md shadow-vigilum-blue/40"
            style={{
              top: "155%",
              right: "15%",
              animation: "float-3 23s infinite linear, pulse 2s infinite",
            }}
          >
            <div className="absolute inset-0 bg-vigilum-blue rounded-full animate-ping opacity-30"></div>
          </div>

          {/* Smaller distributed nodes with enhanced movement */}
          <div
            className="absolute w-1 h-1 bg-vigilum-blue rounded-full opacity-40 animate-pulse"
            style={{
              top: "20%",
              left: "60%",
              animation: "float-1 25s infinite linear, pulse 1.5s infinite",
            }}
          ></div>
          <div
            className="absolute w-1 h-1 bg-cyan-300 rounded-full opacity-30 animate-pulse"
            style={{
              top: "40%",
              left: "80%",
              animation: "float-2 28s infinite linear, pulse 1.7s infinite",
            }}
          ></div>
          <div
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-35 animate-pulse"
            style={{
              top: "60%",
              left: "15%",
              animation: "float-3 26s infinite linear, pulse 1.6s infinite",
            }}
          ></div>
          <div
            className="absolute w-1 h-1 bg-vigilum-blue rounded-full opacity-25 animate-pulse"
            style={{
              top: "70%",
              left: "70%",
              animation: "float-1 27s infinite linear, pulse 1.8s infinite",
            }}
          ></div>
          <div
            className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-30 animate-pulse"
            style={{
              top: "90%",
              left: "55%",
              animation: "float-2 24s infinite linear, pulse 1.9s infinite",
            }}
          ></div>
          <div
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-25 animate-pulse"
            style={{
              top: "120%",
              left: "25%",
              animation: "float-3 29s infinite linear, pulse 1.4s infinite",
            }}
          ></div>
          <div
            className="absolute w-1 h-1 bg-blue-500 rounded-full opacity-30 animate-pulse"
            style={{
              top: "35%",
              left: "45%",
              animation: "float-1 30s infinite linear, pulse 1.6s infinite",
            }}
          ></div>
          <div
            className="absolute w-1 h-1 bg-cyan-500 rounded-full opacity-25 animate-pulse"
            style={{
              top: "80%",
              left: "85%",
              animation: "float-2 26s infinite linear, pulse 1.7s infinite",
            }}
          ></div>
          <div
            className="absolute w-1 h-1 bg-blue-600 rounded-full opacity-35 animate-pulse"
            style={{
              top: "115%",
              left: "75%",
              animation: "float-3 25s infinite linear, pulse 1.5s infinite",
            }}
          ></div>
          <div
            className="absolute w-1 h-1 bg-vigilum-blue rounded-full opacity-30 animate-pulse"
            style={{
              top: "135%",
              left: "10%",
              animation: "float-1 28s infinite linear, pulse 1.8s infinite",
            }}
          ></div>
          <div
            className="absolute w-1 h-1 bg-cyan-300 rounded-full opacity-25 animate-pulse"
            style={{
              top: "145%",
              right: "25%",
              animation: "float-2 27s infinite linear, pulse 1.9s infinite",
            }}
          ></div>
          <div
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30 animate-pulse"
            style={{
              top: "165%",
              left: "55%",
              animation: "float-3 24s infinite linear, pulse 1.6s infinite",
            }}
          ></div>

          {/* Circle Interconnections */}
          <svg
            className="absolute inset-0 w-full opacity-30"
            style={{ height: "200vh" }}
          >
            <defs>
              <linearGradient
                id="connection-blue"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#316EFF" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient
                id="connection-cyan"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.15" />
              </linearGradient>
            </defs>

            {/* Top level - Sparse connections (2-3 lines) */}
            {/* blue-400 (35%, right 30%) to cyan-400 (25%, right 25%) */}
            <line
              x1="70%"
              y1="35%"
              x2="75%"
              y2="25%"
              stroke="url(#connection-blue)"
              strokeWidth="1"
              opacity="0.4"
              className="scroll-reveal-0"
            >
              <animate
                attributeName="opacity"
                values="0.08;0.18;0.08"
                dur="6s"
                repeatCount="indefinite"
              />
            </line>

            {/* cyan-400 (25%, right 25%) to blue-300 (45%, left 65%) */}
            <line
              x1="75%"
              y1="25%"
              x2="65%"
              y2="45%"
              stroke="url(#connection-cyan)"
              strokeWidth="0.3"
              opacity="0.12"
              className="scroll-reveal-0"
            >
              <animate
                attributeName="opacity"
                values="0.06;0.15;0.06"
                dur="7s"
                repeatCount="indefinite"
              />
            </line>

            <line stroke="url(#web-gradient-2)" strokeWidth="0.6" opacity="0.2">
              <animate
                attributeName="x1"
                values="50%;55%;45%;50%"
                dur="19s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y1"
                values="10%;15%;5%;10%"
                dur="19s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="x2"
                values="10%;15%;5%;10%"
                dur="22s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y2"
                values="30%;35%;25%;30%"
                dur="22s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.1;0.25;0.05;0.1"
                dur="8s"
                repeatCount="indefinite"
              />
            </line>

            {/* Mid-level interconnections */}
            <line stroke="#60A5FA" strokeWidth="1" opacity="0.3">
              <animate
                attributeName="x1"
                values="85%;90%;80%;85%"
                dur="20s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y1"
                values="45%;50%;40%;45%"
                dur="20s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="x2"
                values="15%;20%;10%;15%"
                dur="24s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y2"
                values="95%;100%;90%;95%"
                dur="24s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.2;0.35;0.12;0.2"
                dur="5s"
                repeatCount="indefinite"
              />
            </line>

            <line
              stroke="url(#web-gradient-1)"
              strokeWidth="0.7"
              opacity="0.25"
            >
              <animate
                attributeName="x1"
                values="20%;25%;15%;20%"
                dur="17s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y1"
                values="75%;80%;70%;75%"
                dur="17s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="x2"
                values="60%;65%;55%;60%"
                dur="16s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y2"
                values="115%;120%;110%;115%"
                dur="16s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.18;0.32;0.1;0.18"
                dur="6s"
                repeatCount="indefinite"
              />
            </line>

            <line stroke="#93C5FD" strokeWidth="0.5" opacity="0.2">
              <animate
                attributeName="x1"
                values="45%;50%;40%;45%"
                dur="23s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y1"
                values="110%;115%;105%;110%"
                dur="23s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="x2"
                values="70%;75%;65%;70%"
                dur="16s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y2"
                values="130%;135%;125%;130%"
                dur="16s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.15;0.28;0.08;0.15"
                dur="7s"
                repeatCount="indefinite"
              />
            </line>

            {/* Lower dense web */}
            <line stroke="url(#web-gradient-2)" strokeWidth="0.8" opacity="0.3">
              <animate
                attributeName="x1"
                values="25%;30%;20%;25%"
                dur="24s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y1"
                values="120%;125%;115%;120%"
                dur="24s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="x2"
                values="75%;80%;70%;75%"
                dur="21s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y2"
                values="155%;160%;150%;155%"
                dur="21s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.2;0.4;0.12;0.2"
                dur="5s"
                repeatCount="indefinite"
              />
            </line>

            <line stroke="#316EFF" strokeWidth="0.6" opacity="0.25">
              <animate
                attributeName="x1"
                values="60%;65%;55%;60%"
                dur="18s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y1"
                values="140%;145%;135%;140%"
                dur="18s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="x2"
                values="35%;40%;30%;35%"
                dur="25s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y2"
                values="120%;125%;115%;120%"
                dur="25s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.16;0.3;0.1;0.16"
                dur="6s"
                repeatCount="indefinite"
              />
            </line>

            {/* Cross-network connections */}
            <line stroke="url(#web-gradient-1)" strokeWidth="0.4" opacity="0.2">
              <animate
                attributeName="x1"
                values="10%;15%;5%;10%"
                dur="28s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y1"
                values="30%;35%;25%;30%"
                dur="28s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="x2"
                values="85%;90%;80%;85%"
                dur="20s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y2"
                values="130%;135%;125%;130%"
                dur="20s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.1;0.2;0.05;0.1"
                dur="9s"
                repeatCount="indefinite"
              />
            </line>

            <line stroke="#60A5FA" strokeWidth="0.5" opacity="0.18">
              <animate
                attributeName="x1"
                values="55%;60%;50%;55%"
                dur="26s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y1"
                values="90%;95%;85%;90%"
                dur="26s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="x2"
                values="25%;30%;20%;25%"
                dur="19s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y2"
                values="145%;150%;140%;145%"
                dur="19s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.12;0.22;0.06;0.12"
                dur="8s"
                repeatCount="indefinite"
              />
            </line>

            {/* Dense lower web connections */}
            <line
              stroke="url(#web-gradient-2)"
              strokeWidth="0.6"
              opacity="0.22"
            >
              <animate
                attributeName="x1"
                values="75%;80%;70%;75%"
                dur="17s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y1"
                values="125%;130%;120%;125%"
                dur="17s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="x2"
                values="30%;35%;25%;30%"
                dur="23s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y2"
                values="165%;170%;160%;165%"
                dur="23s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.18;0.28;0.1;0.18"
                dur="7s"
                repeatCount="indefinite"
              />
            </line>

            <line stroke="#93C5FD" strokeWidth="0.4" opacity="0.15">
              <animate
                attributeName="x1"
                values="40%;45%;35%;40%"
                dur="21s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y1"
                values="155%;160%;150%;155%"
                dur="21s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="x2"
                values="80%;85%;75%;80%"
                dur="19s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y2"
                values="140%;145%;135%;140%"
                dur="19s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.1;0.2;0.05;0.1"
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
