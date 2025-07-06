import { Brain, Zap } from "lucide-react";

const AboutSection = () => {
  return (
    <div className="py-20" style={{ backgroundColor: "#0B1E16" }}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-purple-900/30 px-3 py-1 rounded-full border border-purple-700 mb-4">
              <Brain className="w-3 h-3 text-purple-400" />
              <span className="text-xs text-purple-300 font-mono uppercase tracking-wider">
                Interface as Philosophy
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-100 mb-4 font-mono tracking-tight">
              METHODOLOGY
            </h2>
            <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto">
              Vigilum operates through semantic analysis of legal structure.
              This interface renders the matrix mechanics, typology geometry,
              and behavioral logic of governance risk detection.
            </p>
          </div>

          {/* Core Principles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div
              className="rounded-lg p-8 border"
              style={{
                backgroundColor: "#102c22",
                borderColor: "rgba(0,255,204,0.06)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)",
              }}
            >
              <h3 className="text-2xl font-bold text-white font-mono mb-6">
                DETECTION PRINCIPLES
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="text-lg font-bold text-blue-400 font-mono mb-2">
                    01. STRUCTURAL RISK
                  </div>
                  <div className="text-sm text-gray-300 leading-relaxed">
                    Risk emerges from legal structure, not individual intent.
                    Institutional failure is encoded in design before
                    implementation.
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-yellow-400 font-mono mb-2">
                    02. EMBEDDED OVERRIDE
                  </div>
                  <div className="text-sm text-gray-300 leading-relaxed">
                    Legal clauses contain latent mechanisms for procedural
                    bypass. Override paths are discoverable through semantic
                    analysis.
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-orange-400 font-mono mb-2">
                    03. PRE-COMPLIANT DESIGN
                  </div>
                  <div className="text-sm text-gray-300 leading-relaxed">
                    Structural evasion operates within legal boundaries.
                    Compliance and corruption become indistinguishable.
                  </div>
                </div>
              </div>
            </div>

            <div
              className="rounded-lg p-8 border"
              style={{
                backgroundColor: "#102c22",
                borderColor: "rgba(0,255,204,0.06)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)",
              }}
            >
              <h3 className="text-2xl font-bold text-white font-mono mb-6">
                SEMANTIC ANALYSIS
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="text-lg font-bold text-red-400 font-mono mb-2">
                    CLAUSE VECTORS
                  </div>
                  <div className="text-sm text-gray-300 leading-relaxed">
                    Legal text decomposed into semantic vectors representing
                    institutional behavior patterns and override potential.
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-400 font-mono mb-2">
                    TYPOLOGY PROJECTION
                  </div>
                  <div className="text-sm text-gray-300 leading-relaxed">
                    Risk patterns mapped onto four-dimensional typology space:
                    DG, RT, CI, SB representing failure modes.
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-400 font-mono mb-2">
                    BEHAVIORAL SIMULATION
                  </div>
                  <div className="text-sm text-gray-300 leading-relaxed">
                    Legal system response modeled through clause interaction
                    sequences and override pathway analysis.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Operational Philosophy */}
          <div className="bg-purple-900/20 border border-purple-700 rounded-lg p-8">
            <div className="text-center mb-8">
              <Zap className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white font-mono mb-4">
                OPERATIONAL PHILOSOPHY
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400 font-mono mb-3">
                  REVEALING STRUCTURE
                </div>
                <div className="text-sm text-gray-300 leading-relaxed">
                  Vigilum exposes embedded institutional logic rather than
                  individual behavior. Structure precedes intent.
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-400 font-mono mb-3">
                  SIMULATING RISK
                </div>
                <div className="text-sm text-gray-300 leading-relaxed">
                  Systemic failure patterns modeled through legal clause
                  interaction and override pathway analysis.
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-400 font-mono mb-3">
                  DISCOVERING INTENT
                </div>
                <div className="text-sm text-gray-300 leading-relaxed">
                  Legal intent emerges from design choices embedded in
                  structural constraints and procedural pathways.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
