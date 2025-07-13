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
import InfiniteMenu from "@/components/ui/InfiniteMenu";

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

          <div style={{ height: "600px", position: "relative" }}>
            <InfiniteMenu
              items={[
                {
                  color: "#d4a300",
                  link: "/loophole/L001",
                  title: "Directive 2014/24/EU\nArticle 32(2)(a)",
                  description: "Negotiated procedure without prior publication",
                },
                {
                  color: "#b4241d",
                  link: "/loophole/L002",
                  title: "Directive 2014/24/EU\nArticle 68(1)(b)",
                  description: "Price revision formula based on indexation",
                },
                {
                  color: "#1e2b44",
                  link: "/loophole/L003",
                  title: "Directive 2014/24/EU\nArticle 12(1)",
                  description: "Public-public cooperation exemption",
                },
                {
                  color: "#1e2b44",
                  link: "/loophole/L004",
                  title: "Directive 2014/23/EU\nArticle 44(1)(d)",
                  description: "Unilateral termination clause logic",
                },
                {
                  color: "#d4a300",
                  link: "/loophole/L005",
                  title: "Directive 2014/24/EU\nArticle 72(1)(c)",
                  description: "Contract modification without new procedure",
                },
                {
                  color: "#5a4d7c",
                  link: "/loophole/L006",
                  title: "Directive 2014/24/EU\nArticle 33(1)",
                  description: "Framework agreement without re-opening terms",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCases;
