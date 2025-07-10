import { useState } from "react";
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
  const navigate = useNavigate();

  const handleNavigation = (hash: string) => {
    if (hash === "#newsletter") {
      navigate("/vigilum");
      setTimeout(() => {
        const element = document.getElementById("newsletter");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      navigate(`/vigilum${hash}`);
    }
  };

  return (
    <div
      className="min-h-screen text-gray-100 font-mono relative overflow-hidden"
      style={{
        background: "radial-gradient(circle, #0B1E16 0%, #050D0A 100%)",
      }}
    >
      <MatrixBackground />

      <div className="relative z-50">
        {/* Header */}
        <header
          className="container mx-auto px-4 py-3 relative z-50"
          style={{
            backgroundColor: "#050F0C",
            opacity: "0.95",
          }}
        >
          <nav className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-xl font-bold tracking-tight text-gray-100">
                VIGILUM.AI
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <Link to="/vigilum">
                  <Button
                    className="text-white hover:bg-opacity-80 font-mono border border-gray-600"
                    style={{
                      backgroundColor: "#050F0C",
                      opacity: "0.95",
                    }}
                  >
                    HOME
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <div
                  className="absolute right-0 mt-2 min-w-max border border-gray-600 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out transform group-hover:translate-y-0 translate-y-2 z-50"
                  style={{
                    backgroundColor: "#050F0C",
                    opacity: "0.95",
                  }}
                >
                  <div className="py-1">
                    <button
                      onClick={() => handleNavigation("#modules")}
                      className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-black hover:bg-opacity-30 transition-colors duration-150 text-left"
                    >
                      <Brain className="mr-3 h-4 w-4" />
                      ENGINES
                    </button>
                    <button
                      onClick={() => handleNavigation("#about")}
                      className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-black hover:bg-opacity-30 transition-colors duration-150 text-left"
                    >
                      <Globe className="mr-3 h-4 w-4" />
                      METHODOLOGY
                    </button>
                    <button
                      onClick={() => handleNavigation("#demo")}
                      className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-black hover:bg-opacity-30 transition-colors duration-150 text-left"
                    >
                      <Search className="mr-3 h-4 w-4" />
                      SPE
                    </button>
                    <button
                      onClick={() => handleNavigation("#cases")}
                      className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-black hover:bg-opacity-30 transition-colors duration-150 text-left"
                    >
                      <FileText className="mr-3 h-4 w-4" />
                      LIBRARY
                    </button>
                    <button
                      onClick={() => handleNavigation("#newsletter")}
                      className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-black hover:bg-opacity-30 transition-colors duration-150 text-left"
                    >
                      <Share2 className="mr-3 h-4 w-4" />
                      SEE TOGETHER
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>

        {/* Main Section with Brain Background */}
        <main className="relative min-h-screen">
          {/* Spline 3D Particles Hand Animation Background */}
          <div
            className="absolute inset-0 z-0"
            id="spline-animation-background"
          >
            <iframe
              src="https://my.spline.design/particleshand-Ii78meWYbJO8msIhUppyXUUG/?controls=false&orbit=false&pan=false&zoom=false"
              frameBorder="0"
              width="100%"
              height="100%"
              style={{
                border: "none",
                background: "radial-gradient(circle, #0B1E16 0%, #050D0A 100%)",
                pointerEvents: "none",
                userSelect: "none",
              }}
              title="Particles Hand 3D Animation"
              loading="lazy"
            />
          </div>

          {/* Content overlay */}
          {/* System Identity - Centered in middle of page */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-100 drop-shadow-2xl text-center -mt-20">
              SEMANTIC GOVERNANCE
              <span className="block text-blue-400">INTELLIGENCE</span>
            </h1>
          </div>

          {/* Vigilum Modules - Bottom Navigation */}
          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-10">
            <div className="text-gray-300 font-mono text-sm tracking-wider space-x-3 text-center whitespace-nowrap">
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
              <span className="text-gray-600">���</span>
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
        </main>
      </div>
    </div>
  );
}
