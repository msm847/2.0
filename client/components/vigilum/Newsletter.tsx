import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Users,
  Building,
  Bot,
  ArrowRight,
  CheckCircle,
  Activity,
} from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const targetAudiences = [
    {
      id: "auditor",
      title: "Institutional Auditors",
      icon: Shield,
      description:
        "Risk assessment professionals analyzing governance structures",
      benefits: [
        "Structural risk detection methodologies",
        "Pre-compliance analysis techniques",
        "Semantic audit frameworks",
      ],
    },
    {
      id: "donor",
      title: "Development Organizations",
      icon: Building,
      description: "Funding bodies requiring governance risk assessment",
      benefits: [
        "Due diligence enhancement protocols",
        "Structural oversight mechanisms",
        "Risk-aware funding frameworks",
      ],
    },
    {
      id: "civic",
      title: "Civic AI Developers",
      icon: Bot,
      description: "Technology teams building governance intelligence systems",
      benefits: [
        "Semantic analysis implementation",
        "Legal behavior modeling APIs",
        "Institutional logic simulation",
      ],
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !role) return;

    // Simulate submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
      setRole("");
    }, 3000);
  };

  return (
    <div className="bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-green-900/30 px-3 py-1 rounded-full border border-green-700 mb-4">
              <Users className="w-3 h-3 text-green-400" />
              <span className="text-xs text-green-300 font-mono uppercase tracking-wider">
                Structural Trust Activation
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-100 mb-4 font-mono tracking-tight">
              INSTITUTIONAL INTELLIGENCE NETWORK
            </h2>
            <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto">
              Join governance professionals using structural analysis for
              institutional risk detection. Not marketing — methodology
              advancement.
            </p>
          </div>

          {/* Target Audiences */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {targetAudiences.map((audience) => {
              const Icon = audience.icon;
              return (
                <div
                  key={audience.id}
                  className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-green-500 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-green-400 font-mono">
                        {audience.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    {audience.description}
                  </p>
                  <div className="space-y-2">
                    {audience.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-2 text-xs text-gray-400"
                      >
                        <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subscription Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white font-mono mb-2">
                      STRUCTURAL INTELLIGENCE UPDATES
                    </h3>
                    <p className="text-sm text-gray-400">
                      Methodology advances, case studies, semantic analysis
                      techniques
                    </p>
                  </div>

                  {/* Role Selection */}
                  <div>
                    <label className="block text-sm font-bold text-gray-300 font-mono mb-3">
                      PROFESSIONAL ROLE
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {targetAudiences.map((audience) => (
                        <button
                          key={audience.id}
                          type="button"
                          onClick={() => setRole(audience.id)}
                          className={`p-3 rounded-lg border text-sm font-mono transition-all duration-300 ${
                            role === audience.id
                              ? "border-green-500 bg-green-900/20 text-green-400"
                              : "border-gray-600 text-gray-400 hover:border-gray-500"
                          }`}
                        >
                          {audience.title.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-bold text-gray-300 font-mono mb-2">
                      INSTITUTIONAL EMAIL
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@institution.org"
                      className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-gray-300 font-mono text-sm focus:outline-none focus:border-green-500"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={!email.trim() || !role}
                    className="w-full bg-green-600 hover:bg-green-500 text-white font-mono py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ACTIVATE STRUCTURAL INTELLIGENCE
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>

                  {/* Privacy Note */}
                  <div className="text-xs text-gray-500 text-center">
                    Structural analysis methodologies only. No marketing. No
                    third-party sharing.
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-400 font-mono mb-2">
                    ACTIVATION CONFIRMED
                  </h3>
                  <p className="text-sm text-gray-400">
                    Structural intelligence updates will be transmitted to your
                    institutional endpoint
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Network Statistics */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-green-400 font-mono mb-2">
                847
              </div>
              <div className="text-sm text-gray-400">Active practitioners</div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-blue-400 font-mono mb-2">
                23
              </div>
              <div className="text-sm text-gray-400">
                Institutional partners
              </div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-yellow-400 font-mono mb-2">
                156
              </div>
              <div className="text-sm text-gray-400">
                Methodology implementations
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-full border border-gray-700">
              <Activity className="w-3 h-3 text-green-400" />
              <span className="text-xs text-gray-300 font-mono">
                STRUCTURAL ANALYSIS NETWORK: OPERATIONAL
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
