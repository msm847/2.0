import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Analytics = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Immediately show the page, then load content
    setIsLoaded(true);
  }, []);

  const handleReturn = () => {
    navigate("/vigilum");
    // Wait for navigation to complete, then jump instantly to team section
    setTimeout(() => {
      const scrollToTeam = () => {
        const teamSection = document.getElementById("team-heading");
        if (teamSection) {
          teamSection.scrollIntoView({ behavior: "instant", block: "start" });
        } else {
          // Try again if element not found
          setTimeout(scrollToTeam, 50);
        }
      };
      scrollToTeam();
    }, 100);
  };

  return (
    <div style={{ backgroundColor: "#0B1E16", minHeight: "100vh" }}>
      {/* Return Button */}
      <div className="fixed top-6 left-6 z-50">
        <button onClick={handleReturn} className="glass-return-btn">
          <ArrowLeft className="w-4 h-4" />
          <span>Return</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto">
          {/* Always show header immediately */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-100 mb-6 font-mono tracking-tight">
              ANALYTICS
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Track user behavior and gain deep insights into governance
              patterns
            </p>
          </div>

          {/* Loading state or content */}
          {!isLoaded ? (
            <div className="animate-pulse">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                <div className="h-48 bg-gray-800 rounded-lg"></div>
                <div className="h-48 bg-gray-800 rounded-lg"></div>
              </div>
              <div className="h-64 bg-gray-800 rounded-lg"></div>
            </div>
          ) : (

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
                Behavior Tracking
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Monitor how users interact with governance systems, identifying
                patterns that indicate potential risks or inefficiencies.
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
                Pattern Recognition
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Advanced AI algorithms analyze behavioral data to detect
                anomalies and predict potential governance issues before they
                manifest.
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
              Key Features
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <span>Real-time behavioral monitoring and analysis</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <span>Predictive risk modeling based on user patterns</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <span>Customizable dashboards for different stakeholders</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <span>Integration with existing governance systems</span>
              </li>
            </ul>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;