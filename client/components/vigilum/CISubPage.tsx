import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CISubPageProps {
  slug: string;
  heading: string;
  lead: string;
  lottieUrl?: string;
  customDiagram?: React.ReactNode;
  bodyHtml: string;
  ctaLabel?: string;
  ctaHref?: string;
}

const CISubPage = ({
  slug,
  heading,
  lead,
  lottieUrl,
  customDiagram,
  bodyHtml,
  ctaLabel = "Book a Demo",
  ctaHref = "/contact",
}: CISubPageProps) => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!prefersReducedMotion && pageRef.current) {
      // Animate fade-in elements
      const fadeElements = pageRef.current.querySelectorAll(
        ".fade-in, .fade-in-content",
      );

      fadeElements.forEach((el) => {
        gsap.set(el, {
          opacity: 0,
          y: 40,
        });

        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Animate header elements
      const header = pageRef.current.querySelector(".page-header");
      if (header) {
        const headerElements = header.querySelectorAll("h1, p, .back-button");
        gsap.set(headerElements, {
          opacity: 0,
          y: 30,
        });

        gsap.to(headerElements, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          delay: 0.2,
        });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={pageRef}
      className="min-h-screen text-white font-mono"
      style={{
        background: "radial-gradient(circle, #0B1E16 0%, #050D0A 100%)",
      }}
    >
      {/* Navigation Spacer */}
      <div className="h-16"></div>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="page-header mb-16">
            <Link
              to="/vigilum#core-intelligence"
              className="back-button inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 mb-8"
            >
              <ArrowLeft size={16} />
              <span className="text-sm uppercase tracking-wider">
                Back to Core Intelligence
              </span>
            </Link>

            <h1
              className="text-5xl font-bold mb-6 tracking-tight"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #00ffff 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 30px rgba(0, 255, 255, 0.3)",
              }}
            >
              {heading}
            </h1>

            <p
              className="text-xl text-gray-300 leading-relaxed max-w-3xl"
              style={{ lineHeight: "1.6" }}
            >
              {lead}
            </p>
          </div>

          {/* Interactive Diagram Container */}
          {(customDiagram || lottieUrl) && (
            <div className="fade-in mb-16">
              {customDiagram ? (
                customDiagram
              ) : (
                <div
                  className="rounded-lg p-8 border"
                  style={{
                    backgroundColor: "rgba(10, 10, 10, 0.8)",
                    borderColor: "rgba(0, 255, 255, 0.2)",
                    boxShadow: "0 8px 32px rgba(0, 255, 255, 0.1)",
                  }}
                >
                  <div
                    className="w-full h-64 flex items-center justify-center text-cyan-400"
                    style={{ minHeight: "300px" }}
                  >
                    {/* Placeholder for Lottie animation */}
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 border-2 border-cyan-400 rounded-full animate-pulse"></div>
                      <p className="text-sm">Interactive Diagram Loading...</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Lottie URL: {lottieUrl}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Body Content */}
          <div className="fade-in-content prose prose-invert max-w-none">
            <div
              className="text-gray-300 leading-relaxed"
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.7",
              }}
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          </div>

          {/* CTA Section */}
          <div className="fade-in mt-16 text-center">
            <div
              className="rounded-lg p-8 border"
              style={{
                backgroundColor: "rgba(16, 44, 34, 0.3)",
                borderColor: "rgba(0, 255, 255, 0.2)",
                boxShadow: "inset 0 0 0 1px rgba(0, 255, 255, 0.05)",
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Discover how structural foresight can transform your
                institutional risk assessment capabilities.
              </p>
              <Link
                to={ctaHref}
                className="inline-flex items-center px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-mono uppercase tracking-wider rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  boxShadow: "0 4px 15px rgba(0, 255, 255, 0.2)",
                }}
              >
                {ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .prose h2 {
            color: #00ffff;
            font-size: 1.5rem;
            font-weight: 600;
            margin-top: 2rem;
            margin-bottom: 1rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .prose h3 {
            color: #ffffff;
            font-size: 1.25rem;
            font-weight: 500;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
          }

          .prose p {
            margin-bottom: 1.5rem;
          }

          .prose ul {
            margin: 1.5rem 0;
            padding-left: 2rem;
          }

          .prose li {
            margin-bottom: 0.5rem;
            color: #d1d5db;
          }

          .prose strong {
            color: #00ffff;
            font-weight: 600;
          }

          .prose em {
            color: #fbbf24;
            font-style: normal;
          }
        `}
      </style>
    </div>
  );
};

export default CISubPage;
