import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, BarChart3 } from "lucide-react";

const Hero = () => {
  const [activeRisk, setActiveRisk] = useState(0);

  const riskTypologies = [
    {
      code: "DG",
      name: "Discretionary Gap",
      color: "text-yellow-400",
      description: "Administrative override potential",
      value: 0.91,
    },
    {
      code: "RT",
      name: "Regulatory Tunneling",
      color: "text-orange-400",
      description: "Compliance pathway deviation",
      value: 0.74,
    },
    {
      code: "CI",
      name: "Clause Interference",
      color: "text-blue-400",
      description: "Semantic contradiction matrix",
      value: 0.22,
    },
    {
      code: "SB",
      name: "Structural Bypass",
      color: "text-red-400",
      description: "Institutional route nullification",
      value: 0.05,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRisk((prev) => (prev + 1) % riskTypologies.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative pt-24 pb-16 overflow-hidden"
      style={{ backgroundColor: "#0B1E16" }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-yellow-500/20" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent)] animate-pulse" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6">
              VIGILUM
              <span className="block text-blue-400">
                GOVERNANCE INTELLIGENCE
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
