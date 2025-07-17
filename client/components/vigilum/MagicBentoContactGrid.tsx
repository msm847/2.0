import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Building,
  Bot,
  ArrowRight,
  CheckCircle,
  Mail,
  Send,
  GraduationCap,
  Users,
  Scale,
  FileSearch,
  Landmark,
  ChevronDown,
} from "lucide-react";
import "./MagicBento.css";

interface MagicBentoContactGridProps {
  email: string;
  setEmail: (email: string) => void;
  isSubmitted: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

const MagicBentoContactGrid: React.FC<MagicBentoContactGridProps> = ({
  email,
  setEmail,
  isSubmitted,
  handleSubmit,
}) => {
  const gridRef = useRef(null);
  const [expandedCard, setExpandedCard] = useState(null);

  const targetAudiences = [
    {
      id: "auditor",
      title: "Institutional Auditors",
      icon: Shield,
      description:
        "Risk assessment professionals analyzing governance structures",
    },
    {
      id: "donor",
      title: "Development Organizations",
      icon: Building,
      description: "Funding bodies requiring governance risk assessment",
    },
    {
      id: "civic",
      title: "Civic AI Developers",
      icon: Bot,
      description: "Technology teams building governance intelligence systems",
    },
    {
      id: "students",
      title: "Students & Researchers",
      icon: GraduationCap,
      description:
        "Academic researchers studying governance patterns and structural risk detection",
    },
    {
      id: "professors",
      title: "Academic Faculty",
      icon: Users,
      description:
        "Professors in public policy, law, and governance seeking research collaboration",
    },
    {
      id: "regulators",
      title: "Regulatory Agencies",
      icon: Scale,
      description:
        "Government oversight bodies requiring pre-award structural intelligence",
    },
    {
      id: "analysts",
      title: "ESG & Compliance Analysts",
      icon: FileSearch,
      description:
        "Investment firms screening for institutional exposure and political risk",
    },
    {
      id: "ifi",
      title: "International Finance",
      icon: Landmark,
      description:
        "World Bank, EBRD, and multilateral institutions conducting integrity assessments",
    },
  ];

  const contactSections = [
    {
      id: "actors",
      title: "Actors",
      description: "All types of professionals we work with across sectors",
      span: "full",
      content: {
        actors: targetAudiences,
      },
    },
    {
      id: "direct",
      title: "Direct Contact",
      description: "Get in touch for partnerships and collaboration",
      span: "half",
      content: {
        email: "info@vigilum.com",
        description:
          "For institutional partnerships, technical integration, or research collaboration inquiries.",
        buttonText: "Get in Touch",
        buttonLink: "/contact",
      },
    },
    {
      id: "newsletter",
      title: "Stay Updated",
      description: "Methodology advances, case studies, analysis techniques",
      span: "half",
      content: {
        form: true,
      },
    },
  ];

  const handleCardClick = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className="mb-16">
      <div className="contact-card-grid" ref={gridRef}>
        {contactSections.map((section) => (
          <div
            key={section.id}
            className={`card magic-team-card card--border-glow ${
              expandedCard === section.id ? "expanded" : ""
            } ${section.span === "full" ? "full-width" : ""}`}
            onClick={() => handleCardClick(section.id)}
            style={{
              "--glow-color": "0, 255, 204",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-6px) rotateX(3deg) rotateY(1deg)";
              e.currentTarget.style.boxShadow = `
                0 25px 60px rgba(0, 255, 204, 0.12),
                0 8px 30px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.25),
                inset 0 0 0 1px rgba(0, 255, 204, 0.20),
                inset 0 -1px 0 rgba(0, 0, 0, 0.15)
              `;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0px) rotateX(0deg) rotateY(0deg)";
              e.currentTarget.style.boxShadow = `
                0 12px 40px rgba(0, 255, 204, 0.08),
                0 4px 16px rgba(0, 0, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.15),
                inset 0 0 0 1px rgba(0, 255, 204, 0.12),
                inset 0 -1px 0 rgba(0, 0, 0, 0.1)
              `;
            }}
          >
            <div className="card__header">
              <ChevronDown className="card__expand-icon w-5 h-5" />
            </div>
            <div className="card__content">
              <h2 className="card__title">{section.title}</h2>
              <p className="card__description">{section.description}</p>

              <div className="card__expanded-content">
                {section.id === "actors" && (
                  <div className="actors-grid">
                    {section.content.actors.map((actor, index) => {
                      const Icon = actor.icon;
                      return (
                        <div key={index} className="actor-item">
                          <div className="actor-icon">
                            <Icon className="w-6 h-6 text-black" />
                          </div>
                          <h4 className="actor-title">{actor.title}</h4>
                          <p className="actor-description">
                            {actor.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}

                {section.id === "direct" && (
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <Mail className="w-5 h-5 text-green-400" />
                      <a
                        href={`mailto:${section.content.email}`}
                        className="text-gray-300 hover:text-green-400 transition-colors font-mono"
                        aria-label="Send email to Vigilum"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {section.content.email}
                      </a>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {section.content.description}
                    </p>
                    <a
                      href={section.content.buttonLink}
                      className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-mono px-6 py-3 rounded-lg transition-colors"
                      aria-label="Open contact form"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Mail className="w-4 h-4" />
                      <span>{section.content.buttonText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                )}

                {section.id === "newsletter" && (
                  <div onClick={(e) => e.stopPropagation()}>
                    {!isSubmitted ? (
                      <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                        aria-labelledby="newsletter-form"
                      >
                        <div>
                          <label
                            htmlFor="email-input-bento"
                            className="block text-sm font-bold text-gray-300 font-mono mb-2"
                          >
                            Email address
                          </label>
                          <input
                            id="email-input-bento"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your.email@organization.com"
                            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-gray-300 font-mono text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                            required
                            aria-describedby="email-help-bento"
                          />
                          <p
                            id="email-help-bento"
                            className="text-xs text-gray-500 mt-1"
                          >
                            No spam. Unsubscribe anytime.
                          </p>
                        </div>

                        <Button
                          type="submit"
                          disabled={!email.trim()}
                          className="w-full bg-green-600 hover:bg-green-500 text-white font-mono py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          aria-label="Subscribe to Vigilum newsletter"
                        >
                          Subscribe
                          <Send className="ml-2 w-4 h-4" />
                        </Button>
                      </form>
                    ) : (
                      <div
                        className="text-center py-8"
                        role="status"
                        aria-live="polite"
                      >
                        <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-green-400 font-mono mb-2">
                          SUBSCRIPTION CONFIRMED
                        </h3>
                        <p className="text-sm text-gray-400">
                          You'll receive updates on structural intelligence
                          methodologies
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MagicBentoContactGrid;
