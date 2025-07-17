import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Collaboration = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate("/vigilum");
    // Wait longer for navigation to complete, then scroll to team section
    setTimeout(() => {
      const scrollToTeam = () => {
        const teamSection = document.getElementById("team-heading");
        if (teamSection) {
          teamSection.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          // Try again if element not found
          setTimeout(scrollToTeam, 100);
        }
      };
      scrollToTeam();
    }, 300);
  };

  return (
    <div style={{ backgroundColor: "#0B1E16", minHeight: "100vh" }}>
      {/* Return Button */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={handleReturn}
          className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-mono px-4 py-2 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-100 mb-6 font-mono tracking-tight">
              COLLABORATION
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Work together seamlessly across institutional boundaries
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div
              className="rounded-lg p-8 border"
              style={{
                backgroundColor: "rgba(12, 35, 28, 0.85)",
                borderColor: "rgba(0,255,204,0.06)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)",
              }}
            >
              <h3 className="text-2xl font-bold text-green-400 font-mono mb-4">
                Cross-Institutional
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Enable secure collaboration between different organizations,
                agencies, and stakeholders while maintaining data integrity.
              </p>
            </div>

            <div
              className="rounded-lg p-8 border"
              style={{
                backgroundColor: "rgba(12, 35, 28, 0.85)",
                borderColor: "rgba(0,255,204,0.06)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)",
              }}
            >
              <h3 className="text-2xl font-bold text-green-400 font-mono mb-4">
                Shared Intelligence
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Pool governance intelligence across organizations to identify
                systemic risks and share best practices for prevention.
              </p>
            </div>
          </div>

          <div
            className="rounded-lg p-8 border"
            style={{
              backgroundColor: "rgba(12, 35, 28, 0.85)",
              borderColor: "rgba(0,255,204,0.06)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)",
            }}
          >
            <h3 className="text-2xl font-bold text-green-400 font-mono mb-6">
              Collaboration Tools
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <span>Secure multi-party data sharing protocols</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <span>Joint investigation and analysis workflows</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <span>Cross-organizational alert and notification systems</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <span>Standardized reporting and documentation formats</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaboration;
