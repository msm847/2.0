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

              <p
                className="text-2xl text-vigilum-body font-medium leading-relaxed max-w-2xl"
                style={{ lineHeight: "1.5" }}
              >
                Vigilum simulates how legal systems encode exposure through
                clause sequence, override logic, and typological collapse.
              </p>
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
                variant="outline"
                className="border-slate-600 text-vigilum-label hover:bg-slate-800 font-medium px-8 py-3"
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
