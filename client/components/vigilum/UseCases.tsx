import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FileText,
  AlertTriangle,
  TrendingUp,
  Eye,
  EyeOff,
  ArrowRight,
  Calendar,
  DollarSign,
} from "lucide-react";

const UseCases = () => {
  const [selectedCase, setSelectedCase] = useState(0);

  const cases = [];

  return (
    <div className="py-20" style={{ backgroundColor: "#0B1E16" }}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-orange-900/30 px-3 py-1 rounded-full border border-orange-700 mb-4">
              <FileText className="w-3 h-3 text-orange-400" />
              <span className="text-xs text-orange-300 font-mono uppercase tracking-wider">
                Structural Retrospectives
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-100 mb-4 font-mono tracking-tight">
              Library
            </h2>
            <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto">
              Structural analysis of EU procurement directive clauses revealing
              embedded loopholes and override paths that enable systematic
              competition bypass.
            </p>
          </div>

          <div className="text-center py-20">
            <div className="text-gray-500 text-xl font-mono">
              Library content is currently being updated
            </div>
            <div className="text-gray-400 text-sm mt-2">
              Case studies will be available soon
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCases;
