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
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
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
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
                Before it's <span className="text-red-400">corruption</span>,
                <br />
                it's <span className="text-blue-400">design</span>.
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl">
                Vigilum detects how institutions encode exposure into legal
                systems — structurally, before it breaches.
              </p>
              <p className="text-lg text-slate-400 max-w-2xl">
                A new category of tool:{" "}
                <strong className="text-white">
                  Structural Governance Intelligence
                </strong>{" "}
                — focused on systemic risk by design rather than after-the-fact
                compliance breaches.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Explore the Codex
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-400 text-white hover:bg-slate-800"
              >
                See Loophole Map
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-slate-300 hover:text-white hover:bg-slate-800"
              >
                Try Simulation
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">6</div>
                <div className="text-sm text-slate-400">AI Modules</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">200+</div>
                <div className="text-sm text-slate-400">Loopholes Mapped</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">4</div>
                <div className="text-sm text-slate-400">Risk Typologies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">€2B+</div>
                <div className="text-sm text-slate-400">Risk Detected</div>
              </div>
            </div>
          </div>

          {/* Animation */}
          <div className="lg:pl-12">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8">
              <h3 className="text-lg font-semibold mb-6 text-center">
                Non-Commutative Clause Logic
              </h3>

              <div className="space-y-6">
                {/* Clause A */}
                <div
                  className={`p-4 rounded border-2 transition-all duration-1000 ${
                    animationStep >= 1
                      ? "border-blue-400 bg-blue-400/10"
                      : "border-slate-600 bg-slate-700/50"
                  }`}
                >
                  <div className="text-sm text-slate-400 mb-1">Clause A:</div>
                  <div className="text-white">
                    "Emergency procurement may bypass standard tender
                    procedures..."
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <div
                    className={`transition-all duration-500 ${
                      animationStep >= 2 ? "text-yellow-400" : "text-slate-600"
                    }`}
                  >
                    ↓
                  </div>
                </div>

                {/* Clause B */}
                <div
                  className={`p-4 rounded border-2 transition-all duration-1000 ${
                    animationStep >= 2
                      ? "border-green-400 bg-green-400/10"
                      : "border-slate-600 bg-slate-700/50"
                  }`}
                >
                  <div className="text-sm text-slate-400 mb-1">Clause B:</div>
                  <div className="text-white">
                    "Emergency status determination is at ministry
                    discretion..."
                  </div>
                </div>

                {/* Result */}
                <div className="flex justify-center">
                  <div
                    className={`transition-all duration-500 ${
                      animationStep >= 3 ? "text-red-400" : "text-slate-600"
                    }`}
                  >
                    ⚠
                  </div>
                </div>

                <div
                  className={`p-4 rounded border-2 transition-all duration-1000 ${
                    animationStep >= 3
                      ? "border-red-400 bg-red-400/10"
                      : "border-slate-600 bg-slate-700/50"
                  }`}
                >
                  <div className="text-sm text-slate-400 mb-1">Result:</div>
                  <div
                    className={`transition-all duration-500 ${
                      animationStep >= 3 ? "text-red-300" : "text-slate-500"
                    }`}
                  >
                    <strong>Discretionary Gap (DG)</strong> - Unlimited bypass
                    authority
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center text-sm text-slate-400">
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
