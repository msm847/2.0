import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-vigilum text-vigilum-body font-plex-sans overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #ffffff 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, #ffffff 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Content */}
          <div className="space-y-12">
            <h1 className="text-5xl lg:text-6xl font-medium tracking-tight leading-tight">
              When meaning collapses,
              <br />
              power hides in format.
            </h1>

            <div className="space-y-8">
              <div>
                <p
                  className="text-sm text-vigilum-label uppercase tracking-wide font-medium mb-3"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  STRUCTURAL GOVERNANCE INTELLIGENCE
                </p>
                <p className="text-lg text-vigilum-subheadline font-medium leading-relaxed max-w-2xl">
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

                {/* Three-way arrow diagram */}
                <div className="relative flex justify-center items-center h-48">
                  {/* Central point */}
                  <div className="absolute w-4 h-4 bg-vigilum-blue rounded-full"></div>

                  {/* Top arrow and bubble - Clause Sequence */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                    <div className="flex flex-col items-center">
                      <div className="bg-slate-800/30 backdrop-blur-sm px-3 py-2 rounded border border-slate-700/50 mb-4">
                        <span className="text-sm text-vigilum-label font-medium font-plex-mono tracking-wide">
                          clause sequence
                        </span>
                      </div>
                      <svg
                        className="w-12 h-16 text-vigilum-blue"
                        viewBox="0 0 24 32"
                        fill="none"
                      >
                        <path
                          d="M12 4L12 24M12 4L8 8M12 4L16 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom left arrow and bubble - Override Logic */}
                  <div className="absolute -bottom-12 -left-20">
                    <div className="flex flex-col items-center">
                      <svg
                        className="w-12 h-16 text-vigilum-blue transform rotate-45"
                        viewBox="0 0 24 32"
                        fill="none"
                      >
                        <path
                          d="M12 4L12 24M12 4L8 8M12 4L16 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="bg-slate-800/30 backdrop-blur-sm px-3 py-2 rounded border border-slate-700/50 mt-4">
                        <span className="text-sm text-vigilum-label font-medium font-plex-mono tracking-wide">
                          override logic
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom right arrow and bubble - Typological Collapse */}
                  <div className="absolute -bottom-12 -right-20">
                    <div className="flex flex-col items-center">
                      <svg
                        className="w-12 h-16 text-vigilum-blue transform -rotate-45"
                        viewBox="0 0 24 32"
                        fill="none"
                      >
                        <path
                          d="M12 4L12 24M12 4L8 8M12 4L16 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="bg-slate-800/30 backdrop-blur-sm px-3 py-2 rounded border border-slate-700/50 mt-4">
                        <span className="text-sm text-vigilum-label font-medium font-plex-mono tracking-wide">
                          typological collapse
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                size="lg"
                className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-8 py-3"
              >
                Explore Platform
              </Button>
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 font-medium px-8 py-3"
              >
                View the Codex
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-slate-700/50">
              <div className="text-center">
                <div className="text-2xl font-medium text-vigilum-blue font-plex-mono">
                  6
                </div>
                <div className="text-sm text-vigilum-label">AI Modules</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-medium text-vigilum-blue font-plex-mono">
                  200+
                </div>
                <div className="text-sm text-vigilum-label">
                  Loopholes Mapped
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-medium text-vigilum-blue font-plex-mono">
                  4
                </div>
                <div className="text-sm text-vigilum-label">
                  Risk Typologies
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-medium text-vigilum-blue font-plex-mono">
                  €2B+
                </div>
                <div className="text-sm text-vigilum-label">Risk Detected</div>
              </div>
            </div>
          </div>

          {/* Animation */}
          <div className="lg:pl-12">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg p-8">
              <h3 className="text-lg font-medium mb-6 text-center text-vigilum-subheadline font-plex-mono">
                Non-Commutative Clause Logic
              </h3>

              <div className="space-y-6">
                {/* Clause A */}
                <div
                  className={`p-4 rounded border-2 transition-all duration-1000 ${
                    animationStep >= 1
                      ? "border-vigilum-blue/60 bg-vigilum-blue/5"
                      : "border-slate-600 bg-slate-700/30"
                  }`}
                >
                  <div className="text-sm text-vigilum-label mb-1 font-plex-mono">
                    Clause A:
                  </div>
                  <div className="text-vigilum-body font-medium">
                    "Emergency procurement may bypass standard tender
                    procedures..."
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <div
                    className={`transition-all duration-500 text-2xl ${
                      animationStep >= 2
                        ? "text-vigilum-blue"
                        : "text-slate-600"
                    }`}
                  >
                    ↓
                  </div>
                </div>

                {/* Clause B */}
                <div
                  className={`p-4 rounded border-2 transition-all duration-1000 ${
                    animationStep >= 2
                      ? "border-vigilum-blue/60 bg-vigilum-blue/5"
                      : "border-slate-600 bg-slate-700/30"
                  }`}
                >
                  <div className="text-sm text-vigilum-label mb-1 font-plex-mono">
                    Clause B:
                  </div>
                  <div className="text-vigilum-body font-medium">
                    "Emergency status determination is at ministry
                    discretion..."
                  </div>
                </div>

                {/* Result */}
                <div className="flex justify-center">
                  <div
                    className={`transition-all duration-500 text-2xl ${
                      animationStep >= 3 ? "text-orange-400" : "text-slate-600"
                    }`}
                  >
                    ⚠
                  </div>
                </div>

                <div
                  className={`p-4 rounded border-2 transition-all duration-1000 ${
                    animationStep >= 3
                      ? "border-orange-400/60 bg-orange-400/5"
                      : "border-slate-600 bg-slate-700/30"
                  }`}
                >
                  <div className="text-sm text-vigilum-label mb-1 font-plex-mono">
                    Result:
                  </div>
                  <div
                    className={`transition-all duration-500 font-medium ${
                      animationStep >= 3 ? "text-orange-300" : "text-slate-500"
                    }`}
                  >
                    <strong>Discretionary Gap (DG)</strong> - Unlimited bypass
                    authority
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center text-sm text-vigilum-label font-plex-mono">
                Order matters: A→B ≠ B→A
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
