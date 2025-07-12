import React, { useState } from "react";
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
      <style>{`
        @keyframes pulse-glow {
          0%, 100% {
            text-shadow: 0 0 10px #17B58F, 0 0 20px #17B58F40, 0 0 30px #17B58F20;
            opacity: 1;
          }
          50% {
            text-shadow: 0 0 20px #17B58F, 0 0 30px #17B58F60, 0 0 40px #17B58F40;
            opacity: 0.8;
          }
        }
      `}</style>
      <MatrixBackground />

      {/* Floating VIGILUM.AI Logo */}
      <div className="absolute top-6 left-6 z-50">
        <span className="text-xl font-bold tracking-tight text-gray-100">
          VIGILUM.AI
        </span>
      </div>

      {/* Main Section with Brain Background - Full Page */}
      <main className="relative min-h-screen">
        {/* Spline 3D Particles Hand Animation Background */}
        <div className="absolute inset-0 z-0" id="spline-animation-background">
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
          <div className="text-center -mt-20 drop-shadow-2xl max-w-4xl px-4">
            {/* Header: Mathematical Expression */}
            <h1
              className="text-xl font-mono font-medium mb-2 animate-pulse"
              style={{
                color: "#17B58F",
                fontFamily: "IBM Plex Mono, JetBrains Mono, monospace",
                textShadow:
                  "0 0 10px #17B58F, 0 0 20px #17B58F40, 0 0 30px #17B58F20",
                animation: "pulse-glow 3s ease-in-out infinite",
              }}
            >
              ϕ(c, 𝓔) = ∑ αᵢeᵢ + ∇𝓔
            </h1>

            {/* Subline: Truth sentence */}
            <p
              className="italic font-mono"
              style={{
                color: "#9DE6C6",
                fontFamily: "IBM Plex Mono, 'Suisse Int'l Mono', monospace",
                fontSize: "0.85em",
                letterSpacing: "0.02em",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              Truth is not a stable referent, but a function of observation
              logic
              <br />— a structurally encoded uncertainty.
            </p>

            {/* CTA Button */}
            <div className="mt-8">
              <Link
                to="/vigilum"
                className="inline-block px-8 py-3 font-mono font-medium text-lg transition-all duration-300 hover:scale-105"
                style={{
                  color: "#9DE6C6",
                  border: "2px solid transparent",
                  background: "transparent",
                  borderImage: "linear-gradient(45deg, #17B58F, #9DE6C6) 1",
                  textShadow: "0 0 8px #17B58F40",
                }}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow =
                    "0 0 20px #17B58F60, inset 0 0 20px #17B58F20";
                  e.target.style.textShadow = "0 0 12px #17B58F80";
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = "none";
                  e.target.style.textShadow = "0 0 8px #17B58F40";
                }}
              >
                ENTER STRUCTURE
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
