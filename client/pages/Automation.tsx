import { ArrowLeft } from "lucide-react";

const Automation = () => {
  const handleReturn = () => {
    window.location.href = "/#team";
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
              AUTOMATION
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Streamline workflows and automate governance processes
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
                Process Optimization
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Automatically identify bottlenecks and inefficiencies in
                governance processes, suggesting optimizations for better
                outcomes.
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
                Intelligent Workflows
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Deploy AI-driven automation that adapts to changing conditions
                and learns from past decisions to improve future outcomes.
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
              Automation Capabilities
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <span>Automated document analysis and risk assessment</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <span>
                  Smart routing of governance issues to appropriate teams
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <span>Predictive maintenance of institutional processes</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <span>Automated compliance monitoring and reporting</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Automation;
