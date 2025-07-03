import { DemoResponse } from "@shared/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "lucide-react";
import MatrixBackground from "../components/MatrixBackground";

export default function Index() {
  const [messageFromServer, setMessageFromServer] = useState("");

  useEffect(() => {
    // Add a longer delay to ensure the server is fully ready
    const timer = setTimeout(fetchHello, 1000);
    return () => clearTimeout(timer);
  }, []);

  const fetchHello = async () => {
    try {
      // Check if we're in development or production
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

      // More specific error handling
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
              <div className="relative group">
                <Link to="/vigilum">
                  <Button className="bg-black text-white hover:bg-gray-800 font-medium">
                    Explore Platform
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                {/* Hover Dropdown */}
                <div className="absolute right-0 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out transform group-hover:translate-y-0 translate-y-2 z-50">
                  <div className="py-1">
                    <Link
                      to="/modules"
                      className="flex items-center px-4 py-2 text-gray-900 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <Brain className="mr-3 h-4 w-4" />
                      Modules
                    </Link>
                    <Link
                      to="/try-system"
                      className="flex items-center px-4 py-2 text-gray-900 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <Search className="mr-3 h-4 w-4" />
                      Try the System
                    </Link>
                    <Link
                      to="/use-cases"
                      className="flex items-center px-4 py-2 text-gray-900 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <FileText className="mr-3 h-4 w-4" />
                      Live Use Cases
                    </Link>
                    <Link
                      to="/about"
                      className="flex items-center px-4 py-2 text-gray-900 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <Globe className="mr-3 h-4 w-4" />
                      About
                    </Link>
                  </div>
                </div>
              </div>
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
                style={{ background: "rgba(255, 255, 255, 0.8)" }}
              >
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <div className="flex items-center gap-1.5">
                      <FileText
                        className="w-8 h-8 text-blue-600 group-hover:text-[#00BFFF] transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                      <ArrowRight
                        className="w-6 h-6 text-blue-600 group-hover:text-[#00BFFF] transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                      <Share2
                        className="w-8 h-8 text-blue-600 group-hover:text-[#00BFFF] transition-colors duration-300"
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
                style={{ background: "rgba(255, 255, 255, 0.8)" }}
              >
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <div className="relative">
                      <Globe
                        className="w-11 h-11 text-blue-600 group-hover:text-[#4682B4] transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                      <Shield
                        className="w-5 h-5 text-blue-600 group-hover:text-[#4682B4] transition-colors duration-300 absolute -bottom-0.5 -right-0.5"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm uppercase text-gray-600 tracking-wide font-medium font-plex-mono">
                    STRUCTURAL RISK SIMULATION
                  </p>
                  <p className="text-base leading-relaxed text-gray-700">
                    Trained on a corpus of 200+ known structural evasions — from
                    Article 72 expansions to in-house procurement exemptions —
                    Vigilum matches clause logic to real-world loophole profiles
                    before they're exploited.
                  </p>
                  <button className="text-blue-600 hover:text-[#4682B4] transition-colors duration-300 font-medium text-sm">
                    → Explore Typologies
                  </button>
                </div>
              </div>

              {/* Column 3 - Loophole Pattern Recognition */}
              <div
                className="group p-8 rounded-lg border border-gray-200 hover:border-[#57A0D2] transition-all duration-300 cursor-pointer hover:bg-[#73C2FB]/10"
                style={{ background: "rgba(255, 255, 255, 0.8)" }}
              >
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Gauge
                      className="w-11 h-11 text-blue-600 group-hover:text-[#57A0D2] transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm uppercase text-gray-600 tracking-wide font-medium font-plex-mono">
                    Performance
                    <br />
                    Over promise
                  </p>
                  <p className="text-base leading-relaxed text-gray-700">
                    Trained on a corpus of 200+ known structural evasions — from
                    Article 72 expansions to in-house procurement exemptions —
                    Vigilum matches clause logic to real-world loophole profiles
                    before they're exploited.
                  </p>
                  <button className="text-blue-600 hover:text-[#57A0D2] transition-colors duration-300 font-medium text-sm">
                    → Browse Loophole Library
                  </button>
                </div>
              </div>
            </div>

            <div className="relative mt-12" style={{ position: "relative" }} />
            <div className="mt-12">
              <p className="text-lg text-gray-700 font-medium leading-relaxed">
                "The concept of truth cannot be defined in terms of the concepts
                of the object language."
              </p>
              <p className="font-medium text-gray-600">– Alfred Tarski, 1944</p>
            </div>
            <p
              className="text-sm text-gray-600 uppercase font-medium mt-12"
              style={{ letterSpacing: "0.035em" }}
            />
          </div>
        </main>
        <MatrixBackground />
      </div>
    </div>
  );
}
