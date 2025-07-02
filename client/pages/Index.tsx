import { DemoResponse } from "@shared/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
} from "lucide-react";
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
                      {/* Document */}
                      <rect
                        x="4"
                        y="8"
                        width="18"
                        height="22"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        fill="none"
                      />
                      {/* Document lines */}
                      <path
                        d="M8 14h10M8 18h8M8 22h6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      {/* Arrow */}
                      <path
                        d="M26 19h8"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M30 15l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                      {/* Network nodes */}
                      <circle
                        cx="39"
                        cy="12"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        fill="none"
                      />
                      <circle
                        cx="43"
                        cy="24"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        fill="none"
                      />
                      <circle
                        cx="35"
                        cy="32"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        fill="none"
                      />
                      {/* Network connections */}
                      <path
                        d="M36.5 14.5l5 7.5M40.5 21.5l-3.5 8.5M37.5 29.5l3.5-6.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
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
                    Trained on a corpus of 200+ known structural evasions — from
                    Article 72 expansions to in-house procurement exemptions —
                    Vigilum matches clause logic to real-world loophole profiles
                    before they're exploited.
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
                      {/* Globe outline */}
                      <circle
                        cx="24"
                        cy="24"
                        r="18"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        fill="none"
                      />
                      {/* Globe grid lines - vertical */}
                      <path
                        d="M24 6v36M16 12v24M32 12v24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        opacity="0.7"
                      />
                      {/* Globe grid lines - horizontal */}
                      <path
                        d="M6 24h36M10 15h28M10 33h28"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        opacity="0.7"
                      />
                      {/* Globe curved sections */}
                      <path
                        d="M24 6c-6 6-6 12 0 18s6 12 0 18M24 6c6 6 6 12 0 18s-6 12 0 18"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        opacity="0.6"
                        fill="none"
                      />
                      {/* Shield */}
                      <path
                        d="M30 30v8c0 2 4 4 6 4s6-2 6-4v-8l-6-2-6 2z"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      {/* RISK text */}
                      <text
                        x="20"
                        y="26"
                        className="text-xs font-bold fill-current"
                        textAnchor="middle"
                      >
                        RISK
                      </text>
                    </svg>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm uppercase text-vigilum-label tracking-wide font-medium font-plex-mono">
                    STRUCTURAL RISK SIMULATION
                  </p>
                  <p className="text-base leading-relaxed text-vigilum-subheadline">
                    Trained on a corpus of 200+ known structural evasions — from
                    Article 72 expansions to in-house procurement exemptions —
                    Vigilum matches clause logic to real-world loophole profiles
                    before they're exploited.
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
                      {/* Speedometer arc */}
                      <path
                        d="M8 32c0-8.84 7.16-16 16-16s16 7.16 16 16"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                      />
                      {/* Center dot */}
                      <circle cx="24" cy="32" r="2.5" fill="currentColor" />
                      {/* Needle/pointer */}
                      <path
                        d="M24 32l8-8"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      {/* Speed marks */}
                      <path
                        d="M11 29l2 1M13 25l2 2M16 22l2 2"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity="0.6"
                      />
                      <path
                        d="M37 29l-2 1M35 25l-2 2M32 22l-2 2"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity="0.6"
                      />
                      {/* Bottom arc extension */}
                      <path
                        d="M12 35c0-1 0.5-2 1-2M36 35c0-1-0.5-2-1-2"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        opacity="0.7"
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
