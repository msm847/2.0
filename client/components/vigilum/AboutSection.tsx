import { Button } from "@/components/ui/button";
import { ExternalLink, Users, Award, Target } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              About Vigilum.AI
            </h2>
            <p className="text-xl text-slate-600">
              Rendering institutional structure legible before it breaks
            </p>
          </div>

          {/* Founder's Note */}
          <div className="mb-16">
            <div className="bg-slate-50 rounded-lg p-8 border-l-4 border-blue-500">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-slate-300 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Founder's Note
                  </h3>
                  <p className="text-slate-700 mb-4 leading-relaxed">
                    "During my research in the MARS-REERS program at Columbia
                    University, I discovered a fundamental gap in how we
                    approach corruption. We often react to scandals rather than
                    predict them. Traditional tools detect issues after rules
                    are broken, but what if we could identify the structural
                    flaws that enable corruption before any funds are spent or
                    contracts signed?"
                  </p>
                  <p className="text-slate-700 mb-4 leading-relaxed">
                    "Vigilum emerged from this insight. Our mission is to render
                    institutional structure legible before it breaks, to
                    spotlight design flaws that breed corruption so they can be
                    fixed in time. This isn't just detection — this is
                    preemption."
                  </p>
                  <div className="text-slate-600 font-medium">
                    — Adam Kovarskas, Founder
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Origin Story */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Origin Story
              </h3>
              <div className="space-y-4 text-slate-700">
                <p>
                  Vigilum began as a research thesis in the MARS-REERS program
                  at Columbia University, exploring quantum logic in legal
                  clauses. The findings crystallized into the Vigilum Codex — an
                  evolving compendium of risk patterns.
                </p>
                <p>
                  Through analysis of real-world cases like the ill-fated
                  Vilnius National Stadium project and energy contracts at
                  Ignitis, we discovered how sequences of legal clauses can
                  create escape logic and procedural dead-ends while remaining
                  formally compliant.
                </p>
                <p>
                  What started as academic research evolved into a platform with
                  the potential to transform how institutions approach
                  governance risk — from reactive compliance to proactive
                  structural intelligence.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Vision Statement
              </h3>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <blockquote className="text-lg text-blue-900 italic mb-4">
                  "Vigilum aims to empower societies with structural
                  transparency — where laws and contracts carry traceable logic,
                  and loopholes have nowhere to hide."
                </blockquote>
                <p className="text-blue-800">
                  We believe in augmenting human oversight with AI to achieve
                  accountability by design, transforming governance from
                  reactive to predictive.
                </p>
              </div>
            </div>
          </div>

          {/* Values & Principles */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-slate-900 mb-8 text-center">
              Core Principles
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">
                  Preemption over Reaction
                </h4>
                <p className="text-slate-600">
                  Identify structural risks before they manifest, not after
                  damage is done.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">
                  Transparency in Analysis
                </h4>
                <p className="text-slate-600">
                  Explainable AI that shows how conclusions are reached, not
                  black box predictions.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">
                  Civic Collaboration
                </h4>
                <p className="text-slate-600">
                  Working with journalists, whistleblowers, and civic actors to
                  strengthen accountability.
                </p>
              </div>
            </div>
          </div>

          {/* Research Foundation */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-slate-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-slate-900 mb-4">
                Research Foundation
              </h4>
              <ul className="space-y-2 text-slate-700">
                <li>
                  • MARS-REERS thesis research (Columbia University, 2023)
                </li>
                <li>• Vigilum Codex v0.1 - Initial risk pattern compendium</li>
                <li>• Quantum logic applications in legal clause analysis</li>
                <li>• Mathematical semantic weighting methodologies</li>
              </ul>
              <Button variant="outline" size="sm" className="mt-4">
                View Research
                <ExternalLink size={14} className="ml-2" />
              </Button>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-slate-900 mb-4">
                Recognition & Partners
              </h4>
              <ul className="space-y-2 text-slate-700">
                <li>• Methodology featured in governance research</li>
                <li>• Alignment with OECD preemption frameworks</li>
                <li>• Council of Europe anti-corruption approaches</li>
                <li>• Transparency International collaboration</li>
              </ul>
              <Button variant="outline" size="sm" className="mt-4">
                View Partners
                <ExternalLink size={14} className="ml-2" />
              </Button>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center bg-slate-900 rounded-lg p-8 text-white">
            <h3 className="text-xl font-semibold mb-4">Join the Mission</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Whether you're a regulator seeking to preempt loopholes, a
              journalist tracing accountability, or a researcher in governance
              innovation — we'd love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Get in Touch
              </Button>
              <Button
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                View Press Kit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
