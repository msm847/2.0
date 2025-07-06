import { Link } from "react-router-dom";
import { ArrowLeft, Mail, MessageCircle } from "lucide-react";

const ContactPage = () => {
  return (
    <div
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
          <div className="mb-16">
            <Link
              to="/vigilum#core-intelligence"
              className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 mb-8"
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
              Contact Us
            </h1>

            <p
              className="text-xl text-gray-300 leading-relaxed max-w-3xl"
              style={{ lineHeight: "1.6" }}
            >
              Ready to implement structural foresight in your institution? Let's
              discuss how Vigilum can transform your risk assessment
              capabilities.
            </p>
          </div>

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div
              className="rounded-lg p-8 border"
              style={{
                backgroundColor: "rgba(10, 10, 10, 0.8)",
                borderColor: "rgba(0, 255, 255, 0.2)",
                boxShadow: "0 8px 32px rgba(0, 255, 255, 0.1)",
              }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <Mail className="w-8 h-8 text-cyan-400" />
                <h3 className="text-2xl font-bold text-white">Email Contact</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Send us a detailed message about your institutional requirements
                and risk assessment needs.
              </p>
              <a
                href="mailto:contact@vigilum.ai"
                className="inline-flex items-center px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-mono uppercase tracking-wider rounded-lg transition-all duration-300 hover:scale-105"
                style={{
                  boxShadow: "0 4px 15px rgba(0, 255, 255, 0.2)",
                }}
              >
                contact@vigilum.ai
              </a>
            </div>

            <div
              className="rounded-lg p-8 border"
              style={{
                backgroundColor: "rgba(10, 10, 10, 0.8)",
                borderColor: "rgba(0, 255, 255, 0.2)",
                boxShadow: "0 8px 32px rgba(0, 255, 255, 0.1)",
              }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <MessageCircle className="w-8 h-8 text-cyan-400" />
                <h3 className="text-2xl font-bold text-white">Schedule Demo</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Book a live demonstration of our structural foresight platform
                and see the technology in action.
              </p>
              <Link
                to="/vigilum#newsletter"
                className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-mono uppercase tracking-wider rounded-lg transition-all duration-300 hover:scale-105"
                style={{
                  boxShadow: "0 4px 15px rgba(52, 211, 153, 0.2)",
                }}
              >
                Join Network
              </Link>
            </div>
          </div>

          {/* Information Section */}
          <div
            className="rounded-lg p-8 border text-center"
            style={{
              backgroundColor: "rgba(16, 44, 34, 0.3)",
              borderColor: "rgba(0, 255, 255, 0.2)",
              boxShadow: "inset 0 0 0 1px rgba(0, 255, 255, 0.05)",
            }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Implementation Support
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              Our team provides comprehensive support throughout the integration
              process, from initial assessment to full operational deployment.
              Every implementation is tailored to your institutional structure
              and risk profile.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="text-cyan-400 font-mono uppercase tracking-wider mb-2">
                  Assessment
                </div>
                <div className="text-gray-400">
                  Structural vulnerability analysis and baseline risk
                  quantification
                </div>
              </div>
              <div>
                <div className="text-cyan-400 font-mono uppercase tracking-wider mb-2">
                  Integration
                </div>
                <div className="text-gray-400">
                  Seamless deployment with existing systems and workflows
                </div>
              </div>
              <div>
                <div className="text-cyan-400 font-mono uppercase tracking-wider mb-2">
                  Training
                </div>
                <div className="text-gray-400">
                  Comprehensive staff education on structural foresight
                  principles
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
