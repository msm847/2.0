import { Brain } from "lucide-react";

const MethodologyHeader = () => {
  return (
    <div className="py-16" style={{ backgroundColor: "#0B1E16" }}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center">
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
        </div>
      </div>
    </div>
  );
};

export default MethodologyHeader;
