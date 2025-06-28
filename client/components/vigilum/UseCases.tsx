import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const useCases = [
  {
    id: "vilnius-stadium",
    title: "Vilnius National Stadium",
    subtitle: "40 Years, 3 Tenders, €2.1B Lost",
    description:
      "A decades-long project repeatedly stalled by legal loopholes in PPP contracts, showing how structural gaps enable systematic delays.",
    timeline: [
      { year: "1987", event: "Initial stadium plan conceived" },
      { year: "2008", event: "EU funds application attempt" },
      { year: "2013", event: "PPP tender with BaltCap launched" },
      { year: "2019", event: "Concession canceled amid scandal" },
      { year: "2022", event: "Project restarted with new safeguards" },
    ],
    loopholes: ["L003: Unforeseen Modification", "L005: Single-bidder Award"],
    vigilumAnalysis: {
      obscura: "Would flag repeated tender cancellations as anomalies",
      nexus: "Maps recurring officials/companies across tender iterations",
      nullum: "Tracks systematic legal challenges as delay patterns",
      veris: "High risk score from multiple structural factors",
    },
    image: "/placeholder.svg",
    category: "Infrastructure",
    location: "Lithuania",
  },
  {
    id: "ignitis-energy",
    title: "Ignitis Energy Procurement",
    subtitle: "Board Conflicts & Risk Transfer",
    description:
      "Energy procurement contracts where board connections and risk transfer clauses created systematic vulnerabilities.",
    timeline: [
      { year: "2020", event: "Energy market liberalization begins" },
      { year: "2021", event: "New procurement framework adopted" },
      { year: "2022", event: "Contracts with risk transfer clauses" },
      { year: "2023", event: "Board conflicts of interest revealed" },
    ],
    loopholes: ["L007: Risk Transfer Clauses", "L012: Board Overlap"],
    vigilumAnalysis: {
      clavis: "Detects risk-shifting language in energy contracts",
      nexus: "Maps board member overlaps between entities",
      veris: "Elevated risk score from conflict patterns",
    },
    image: "/placeholder.svg",
    category: "Energy",
    location: "Lithuania",
  },
  {
    id: "covid-procurement",
    title: "COVID Emergency Procurement",
    subtitle: "€500M in Bypassed Oversight",
    description:
      "Emergency procurement during pandemic showed how crisis exceptions created systematic oversight gaps across EU.",
    timeline: [
      { year: "2020 Q1", event: "Pandemic emergency declared" },
      { year: "2020 Q2", event: "Emergency procurement surge" },
      { year: "2021", event: "Audit reveals systematic issues" },
      { year: "2022", event: "New emergency frameworks adopted" },
    ],
    loopholes: ["L001: Emergency Exception", "L006: Direct Award"],
    vigilumAnalysis: {
      obscura: "Flags spike in direct awards vs normal periods",
      sentium: "Correlates media reports with contract patterns",
      veris: "Tracks risk escalation during emergency periods",
    },
    image: "/placeholder.svg",
    category: "Healthcare",
    location: "EU-wide",
  },
  {
    id: "romanian-ppp",
    title: "Romanian PPP Exploitation",
    subtitle: "EU Directive Loopholes Exploited",
    description:
      "Systematic exploitation of PPP directive loopholes allowing contract modifications without proper oversight.",
    timeline: [
      { year: "2018", event: "PPP framework implementation" },
      { year: "2019", event: "First contract modifications" },
      { year: "2020", event: "Scope expansions accelerate" },
      { year: "2021", event: "EU audit flags issues" },
    ],
    loopholes: ["L003: Unforeseen Modification", "L009: Scope Expansion"],
    vigilumAnalysis: {
      clavis: "Identifies modification clauses creating loopholes",
      obscura: "Detects pattern of systematic scope changes",
      nexus: "Maps relationships enabling modifications",
    },
    image: "/placeholder.svg",
    category: "Infrastructure",
    location: "Romania",
  },
];

const UseCases = () => {
  const [currentCase, setCurrentCase] = useState(0);

  const nextCase = () => {
    setCurrentCase((prev) => (prev + 1) % useCases.length);
  };

  const prevCase = () => {
    setCurrentCase((prev) => (prev - 1 + useCases.length) % useCases.length);
  };

  const useCase = useCases[currentCase];

  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Live Use Cases</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Real-world examples where structural corruption dynamics were at
            play, analyzed through Vigilum's lens.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevCase}
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              <ChevronLeft size={16} className="mr-1" />
              Previous
            </Button>

            <div className="flex space-x-2">
              {useCases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCase(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentCase ? "bg-blue-400" : "bg-slate-600"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextCase}
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              Next
              <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>

          {/* Case Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Case Info */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="px-2 py-1 bg-blue-600 text-white rounded text-sm font-medium">
                    {useCase.category}
                  </span>
                  <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-sm">
                    {useCase.location}
                  </span>
                </div>
                <h3 className="text-3xl font-bold mb-2">{useCase.title}</h3>
                <p className="text-xl text-blue-400 mb-4">{useCase.subtitle}</p>
                <p className="text-slate-300 text-lg">{useCase.description}</p>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-slate-200">
                  Timeline
                </h4>
                <div className="space-y-3">
                  {useCase.timeline.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-20 text-blue-400 font-medium text-sm mt-1 flex-shrink-0">
                        {item.year}
                      </div>
                      <div className="text-slate-300">{item.event}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detected Loopholes */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-slate-200">
                  Detected Loopholes
                </h4>
                <div className="space-y-2">
                  {useCase.loopholes.map((loophole, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-slate-800 rounded-lg p-3"
                    >
                      <span className="text-red-400 font-medium">
                        {loophole}
                      </span>
                      <ExternalLink size={16} className="text-slate-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Vigilum Analysis */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-slate-200">
                  How Vigilum's Modules Would Have Detected This
                </h4>
                <div className="space-y-4">
                  {Object.entries(useCase.vigilumAnalysis).map(
                    ([module, analysis]) => (
                      <div
                        key={module}
                        className="bg-slate-800 rounded-lg p-4 border-l-4 border-blue-500"
                      >
                        <div className="font-semibold text-blue-400 mb-2 uppercase">
                          {module}
                        </div>
                        <div className="text-slate-300">{analysis}</div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Outcome & Lessons */}
              <div className="bg-slate-800 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-3 text-slate-200">
                  Outcome & Lessons
                </h4>
                <p className="text-slate-300 mb-4">
                  {useCase.id === "vilnius-stadium" &&
                    "Project was eventually rebooted with new safeguards in 2022. Had Vigilum been applied, structural risks could have been identified in the 2013 PPP contract stage, potentially saving years of delay."}
                  {useCase.id === "ignitis-energy" &&
                    "New governance frameworks implemented to address conflicts. Early detection would have prevented systematic risk accumulation."}
                  {useCase.id === "covid-procurement" &&
                    "Emergency frameworks were revised EU-wide. Vigilum could have maintained oversight during crisis while allowing necessary speed."}
                  {useCase.id === "romanian-ppp" &&
                    "EU directive amendments proposed to close loopholes. Proactive detection could have prevented systematic exploitation."}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Read Full Analysis
                  <ExternalLink size={14} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
