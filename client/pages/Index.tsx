import { DemoResponse } from "@shared/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Search, Brain } from "lucide-react";
import MatrixBackground from "../components/MatrixBackground";

export default function Index() {
  const [messageFromServer, setMessageFromServer] = useState("");

  useEffect(() => {
    // Add a small delay to ensure the server is ready
    const timer = setTimeout(fetchHello, 100);
    return () => clearTimeout(timer);
  }, []);

  const fetchHello = async () => {
    try {
      const response = await fetch("/api/demo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Add timeout to prevent hanging
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as DemoResponse;
      setMessageFromServer(data.message);
    } catch (error) {
      console.error("Error fetching hello:", error);
      // Set a fallback message instead of leaving it empty
      setMessageFromServer("API connection unavailable");
    }
  };

  return (
    <div className="min-h-screen bg-black text-vigilum-body font-plex-sans relative overflow-hidden">
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
                  <p>Explore Platform</p>
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
              <div className="text-lg text-vigilum-subheadline font-medium leading-relaxed">
                — where structure, not intent, defines institutional risk
              </div>

              <div className="relative max-w-2xl">
                {/* Central text */}
                <div className="text-center mb-8"></div>
              </div>
            </div>

            <div className="flex gap-4">
              <Link to="/vigilum" />
            </div>

            {/* Module Block */}
            <div className="grid md:grid-cols-3 gap-8 mt-20">
              {/* Column 1 - Clause-Based Intelligence */}
              <div
                className="group p-8 rounded-lg border border-slate-700/30 hover:border-[#00BFFF] transition-all duration-300 cursor-pointer hover:bg-[#00E6FF]/15"
                style={{ background: "rgba(255, 255, 255, 0.02)" }}
              >
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-vigilum-blue group-hover:text-[#00BFFF] transition-colors duration-300"
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
                    <p>
                      Trained on a corpus of 200+ known structural evasions —
                      from Article 72 expansions to in-house procurement
                      exemptions — Vigilum matches clause logic to real-world
                      loophole profiles before they're exploited.
                    </p>
                    <br />
                  </p>
                  <button className="text-vigilum-blue hover:text-[#00BFFF] transition-colors duration-300 font-medium text-sm">
                    → View the CLAVIS module
                  </button>
                </div>
              </div>

              {/* Column 2 - Structural Risk Simulation */}
              <div
                className="group p-8 rounded-lg border border-slate-700/30 hover:border-[#4682B4] transition-all duration-300 cursor-pointer hover:bg-[#0080FE]/15"
                style={{ background: "rgba(255, 255, 255, 0.02)" }}
              >
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-vigilum-blue group-hover:text-[#4682B4] transition-colors duration-300"
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
                    <p>
                      Trained on a corpus of 200+ known structural evasions —
                      from Article 72 expansions to in-house procurement
                      exemptions — Vigilum matches clause logic to real-world
                      loophole profiles before they're exploited.
                    </p>
                  </p>
                  <button className="text-vigilum-blue hover:text-[#4682B4] transition-colors duration-300 font-medium text-sm">
                    → Explore Typologies
                  </button>
                </div>
              </div>

              {/* Column 3 - Loophole Pattern Recognition */}
              <div
                className="group p-8 rounded-lg border border-slate-700/30 hover:border-[#57A0D2] transition-all duration-300 cursor-pointer hover:bg-[#73C2FB]/15"
                style={{ background: "rgba(255, 255, 255, 0.02)" }}
              >
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-vigilum-blue group-hover:text-[#57A0D2] transition-colors duration-300"
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
                  <button className="text-vigilum-blue hover:text-[#57A0D2] transition-colors duration-300 font-medium text-sm">
                    → Browse Loophole Library
                  </button>
                </div>
              </div>
            </div>

            <div className="relative mt-12" style={{ position: "relative" }} />
            <div className="mt-12">
              <p className="text-lg text-vigilum-subheadline font-medium leading-relaxed">
                "The concept of truth cannot be defined in terms of the concepts
                of the object language."
              </p>
              <p className="font-medium">– Alfred Tarski, 1944</p>
            </div>
            <p
              className="text-sm text-vigilum-label uppercase font-medium mt-12"
              style={{ letterSpacing: "0.035em" }}
            />
          </div>
        </main>
        <MatrixBackground />
      </div>
    </div>
  );
}
