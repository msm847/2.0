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
        <div
          className="relative mt-5 flex flex-col"
          dangerouslySetInnerHTML={{
            __html: `<p>Hello there, I am custom HTML code!</p><!-- Matrix Background Canvas -->
<canvas id="matrix-canvas"></canvas>

<style>
  #matrix-canvas {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    z-index: -999 !important;
    background: transparent !important;
    pointer-events: none !important;
  }
</style>

<script>
(function() {
  'use strict';

  // Check if document is ready
  function initMatrix() {
    var canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var particles = [];
    var animationId;

    // Responsive particle count
    function getParticleCount() {
      return window.innerWidth < 768 ? 60 : 100;
    }

    // Particle constructor function with speed 1.3
    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.3,
        vy: (Math.random() - 0.5) * 1.3,
        size: 2.4  // Increased by 20% from 2 to 2.4
      };
    }

    // Initialize particles
    function initParticles() {
      particles = [];
      var count = getParticleCount();
      for (var i = 0; i < count; i++) {
        particles.push(createParticle());
      }
    }

    // Update particle positions and handle bouncing
    function updateParticles() {
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x <= 0 || p.x >= canvas.width) {
          p.vx = -p.vx;
          p.x = Math.max(0, Math.min(canvas.width, p.x));
        }
        if (p.y <= 0 || p.y >= canvas.height) {
          p.vy = -p.vy;
          p.y = Math.max(0, Math.min(canvas.height, p.y));
        }
      }
    }

    // Calculate distance between two particles
    function getDistance(p1, p2) {
      var dx = p1.x - p2.x;
      var dy = p1.y - p2.y;
      return Math.sqrt(dx * dx + dy * dy);
    }

    // Draw particles and connections
    function draw() {
      // Clear canvas with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections first (behind particles)
      ctx.strokeStyle = '#0066ff';
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var distance = getDistance(particles[i], particles[j]);

          if (distance < 300) { // Updated connection distance to 300px
            // Calculate opacity based on distance (closer = more opaque)
            var opacity = (1 - distance / 300) * 0.6;

            ctx.globalAlpha = opacity;
            ctx.lineWidth = 1.3; // Increased by 30% from 1 to 1.3
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#0066ff';
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Animation loop
    function animate() {
      updateParticles();
      draw();
      animationId = requestAnimationFrame(animate);
    }

    // Resize handler
    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Reinitialize particles if count changed
      var newCount = getParticleCount();
      if (particles.length !== newCount) {
        initParticles();
      }
    }

    // Initialize canvas
    function setupCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
      animate();
    }

    // Window resize event
    window.addEventListener('resize', handleResize);

    // Cleanup function
    window.addEventListener('beforeunload', function() {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', handleResize);
    });

    // Start the matrix
    setupCanvas();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMatrix);
  } else {
    initMatrix();
  }
})();
</script>

`,
          }}
        />
        <div className="relative mt-5 flex flex-col">
          <canvas />
        </div>
      </div>
    </div>
  );
}
