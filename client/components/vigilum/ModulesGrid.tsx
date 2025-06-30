import { useState } from "react";
import { Key, Gavel, Building2, Gauge, Network, Radio } from "lucide-react";

const modules = [
  {
    id: "clavis",
    name: "CLAVIS",
    title: "Clause Intelligence",
    icon: Key,
    description: "Identifies risk-shifting clause logic",
    detail:
      "Scans individual contract clauses to detect risk-shifting logic – clauses that unfairly transfer risk or accountability from one party to another.",
    typology: "RT", // Risk Transfer
    color: "blue",
  },
  {
    id: "obscura",
    name: "OBSCURA",
    title: "Procurement Distortion Engine",
    icon: Gavel,
    description: "Flags procedural anomalies in tenders",
    detail:
      "Detects distortions in procurement processes, identifying when standard procedures are bypassed or manipulated.",
    typology: "SB", // Structural Blindspot
    color: "purple",
  },
  {
    id: "nullum",
    name: "NULLUM",
    title: "Judicial Stalling Detector",
    icon: Building2,
    description: "Traces patterns of legal delay",
    detail:
      "Identifies systematic patterns of judicial or administrative delays that serve to obstruct accountability.",
    typology: "SB", // Structural Blindspot
    color: "red",
  },
  {
    id: "veris",
    name: "VERIS",
    title: "Structural Risk Index",
    icon: Gauge,
    description: "Quantifies institutional fragility",
    detail:
      "Combines findings from other modules to generate a comprehensive risk score for institutional structures.",
    typology: "ALL",
    color: "green",
  },
  {
    id: "nexus",
    name: "NEXUS POTENTIA",
    title: "Political Graph Mapper",
    icon: Network,
    description: "Maps power/control relationships",
    detail:
      "Uses graph theory to map relationships between political actors, companies, and institutions to identify potential conflicts of interest.",
    typology: "CI", // Conflict of Interest
    color: "orange",
  },
  {
    id: "sentium",
    name: "SENTIUM",
    title: "Civic Signal Channel",
    icon: Radio,
    description: "Integrates whistleblower & public signals",
    detail:
      "Aggregates and correlates external signals including whistleblower reports, media coverage, and public complaints.",
    typology: "DG", // Discretionary Gap
    color: "teal",
  },
];

const typologyColors = {
  RT: "bg-blue-100 text-blue-800",
  SB: "bg-red-100 text-red-800",
  CI: "bg-orange-100 text-orange-800",
  DG: "bg-teal-100 text-teal-800",
  ALL: "bg-gray-100 text-gray-800",
};

const ModulesGrid = () => {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Five AI-Powered Modules
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Each module targets specific structural vulnerabilities, working in
            concert to provide comprehensive governance intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {modules.map((module) => {
            const Icon = module.icon;
            const isHovered = hoveredModule === module.id;

            return (
              <div
                key={module.id}
                className={`group relative bg-white rounded-lg border-2 p-6 cursor-pointer transition-all duration-300 ${
                  isHovered
                    ? "border-slate-400 shadow-xl transform -translate-y-2"
                    : "border-slate-200 shadow-md hover:border-slate-300 hover:shadow-lg"
                }`}
                onMouseEnter={() => setHoveredModule(module.id)}
                onMouseLeave={() => setHoveredModule(null)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-3 rounded-lg bg-${module.color}-100 text-${module.color}-600`}
                    >
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">
                        {module.name}
                      </h3>
                      <p className="text-sm text-slate-600">{module.title}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      typologyColors[
                        module.typology as keyof typeof typologyColors
                      ]
                    }`}
                  >
                    {module.typology}
                  </span>
                </div>

                {/* Description */}
                <p className="text-slate-700 mb-4">{module.description}</p>

                {/* Detailed info on hover */}
                <div
                  className={`transition-all duration-300 ${
                    isHovered
                      ? "opacity-100 max-h-40"
                      : "opacity-0 max-h-0 overflow-hidden"
                  }`}
                >
                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-sm text-slate-600">{module.detail}</p>
                  </div>
                </div>

                {/* Interaction indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Typology Legend */}
        <div className="mt-16 bg-white rounded-lg p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Risk Typologies
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                RT
              </span>
              <span className="text-sm text-slate-600">Risk Transfer</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
                SB
              </span>
              <span className="text-sm text-slate-600">
                Structural Blindspot
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-800">
                CI
              </span>
              <span className="text-sm text-slate-600">
                Conflict of Interest
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 rounded text-xs font-medium bg-teal-100 text-teal-800">
                DG
              </span>
              <span className="text-sm text-slate-600">Discretionary Gap</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModulesGrid;
