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
    <div className="min-h-screen bg-white text-gray-900 font-plex-sans relative overflow-hidden">
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
                <Button className="bg-black text-white hover:bg-gray-800 font-medium">
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
              <div className="text-lg text-gray-700 font-medium leading-relaxed">
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
                className="group p-8 rounded-lg border border-gray-200 hover:border-[#00BFFF] transition-all duration-300 cursor-pointer hover:bg-[#00E6FF]/10"
                style={{ background: "rgba(0, 0, 0, 0.02)" }}
              >
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <div className="flex items-center gap-1.5">
                      <FileText
                        className="w-8 h-8 text-vigilum-blue group-hover:text-[#00BFFF] transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                      <ArrowRight
                        className="w-6 h-6 text-vigilum-blue group-hover:text-[#00BFFF] transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                      <Share2
                        className="w-8 h-8 text-vigilum-blue group-hover:text-[#00BFFF] transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm uppercase text-gray-600 tracking-wide font-medium font-plex-mono">
                    From language
                    <br />
                    To logic
                  </p>
                  <p className="text-base leading-relaxed text-gray-700">
                    Trained on a corpus of 200+ known structural evasions — from
                    Article 72 expansions to in-house procurement exemptions —
                    Vigilum matches clause logic to real-world loophole profiles
                    before they're exploited.
                  </p>
                  <button className="text-blue-600 hover:text-[#00BFFF] transition-colors duration-300 font-medium text-sm">
                    → View the CLAVIS module
                  </button>
                </div>
              </div>

              {/* Column 2 - Structural Risk Simulation */}
              <div
                className="group p-8 rounded-lg border border-gray-200 hover:border-[#4682B4] transition-all duration-300 cursor-pointer hover:bg-[#0080FE]/10"
                style={{ background: "rgba(0, 0, 0, 0.02)" }}
              >
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <div className="relative">
                      <Globe
                        className="w-11 h-11 text-vigilum-blue group-hover:text-[#4682B4] transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                      <Shield
                        className="w-5 h-5 text-vigilum-blue group-hover:text-[#4682B4] transition-colors duration-300 absolute -bottom-0.5 -right-0.5"
                        strokeWidth={1.5}
                      />
                    </div>
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
                    <Gauge
                      className="w-11 h-11 text-vigilum-blue group-hover:text-[#57A0D2] transition-colors duration-300"
                      strokeWidth={1.5}
                    />
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
