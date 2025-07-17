import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Security = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleReturn = () => {
    navigate("/vigilum");
    setTimeout(() => {
      const scrollToTeam = () => {
        const teamSection = document.getElementById("team-heading");
        if (teamSection) {
          teamSection.scrollIntoView({ behavior: "instant", block: "start" });
        } else {
          setTimeout(scrollToTeam, 50);
        }
      };
      scrollToTeam();
    }, 100);
  };

  return (
    <div style={{ backgroundColor: "#0B1E16", minHeight: "100vh" }}>
      <div className="fixed top-6 left-6 z-50">
        <button onClick={handleReturn} className="glass-return-btn">
          <ArrowLeft className="w-4 h-4" />
          <span>Return</span>
        </button>
      </div>

      <div className="container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-100 mb-6 font-mono tracking-tight">
              SECURITY
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Enterprise-grade protection for governance intelligence
            </p>
          </div>

          {!isLoaded ? (
            <div className="animate-pulse">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                <div className="h-48 bg-gray-800/30 rounded-lg"></div>
                <div className="h-48 bg-gray-800/30 rounded-lg"></div>
              </div>
              <div className="h-64 bg-gray-800/30 rounded-lg"></div>
            </div>
          ) : (
            <>
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
                    Data Protection
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Advanced encryption and security protocols ensure that
                    sensitive governance data remains protected at all times.
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
                    Access Control
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Granular permission systems ensure that only authorized
                    personnel can access specific governance intelligence and
                    analysis tools.
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
                  Security Features
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    <span>
                      End-to-end encryption for all data transmissions
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    <span>
                      Multi-factor authentication and identity verification
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    <span>Comprehensive audit trails and activity logging</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    <span>
                      Compliance with international security standards
                    </span>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Security;
