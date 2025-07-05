import ModulePageTemplate from "@/components/vigilum/ModulePageTemplate";
import { Shield, Clock, AlertCircle, Calendar } from "lucide-react";

const moduleData = {
  id: "nullum",
  name: "NULLUM",
  subtitle: "Judicial Stalling Detector",
  tagline: "Delay disarms enforcement.",
  description:
    "Detects legal stalling patterns—timeline collapse, expiration clustering, and procedural bypass that dissolve accountability.",
  color: "#1e232b",
  secondaryColor: "#1f2937",
  textColor: "#9ca3af",
  accentColor: "#9ca3af",
  glyph: "Δ",
  status: "MONITORING",
  typologyFocus: ["OD", "RT"],
  riskFingerprint: 0.22,
  longDescription:
    "NULLUM monitors judicial and administrative processes for systematic delay tactics designed to erode enforcement capabilities. It identifies patterns where legal procedures are weaponized through timeline manipulation, causing cases to expire, evidence to become stale, or public attention to wane. The system specializes in detecting sophisticated stalling architectures that appear procedurally correct while fundamentally undermining justice delivery.",
  capabilities: [
    "Timeline manipulation detection and delay pattern analysis",
    "Expiration clustering analysis for systematic case dissolution",
    "Procedural bypass identification through administrative routing",
    "Judicial backlog correlation with case sensitivity analysis",
    "Evidence degradation timeline tracking and preservation alerts",
  ],
  exampleInputs: [
    {
      name: "Appeal Cascade Pattern",
      description:
        "Seven consecutive appeals filed to exceed statute of limitations",
      risk: 0.78,
    },
    {
      name: "Discovery Extension Spiral",
      description:
        "Repeated motions extending discovery phase beyond evidence viability",
      risk: 0.65,
    },
    {
      name: "Jurisdictional Ping-Pong",
      description:
        "Case transferred between courts until key witnesses become unavailable",
      risk: 0.82,
    },
  ],
  patternArchive: [
    {
      id: "temporal-dissolution",
      name: "Temporal Dissolution",
      triggers: [
        "Case duration exceeding 3x normal timeline",
        "Multiple continuances without substantial cause",
        "Strategic filing timing to exploit court schedules",
      ],
      frequency: "DETECTED MONTHLY",
    },
    {
      id: "expiration-clustering",
      name: "Expiration Clustering",
      triggers: [
        "Multiple cases expiring within narrow timeframes",
        "Statute of limitations approached across case portfolio",
        "Evidence preservation deadlines systematically missed",
      ],
      frequency: "DETECTED QUARTERLY",
    },
    {
      id: "procedural-nullification",
      name: "Procedural Nullification",
      triggers: [
        "Technicality dismissals exceeding baseline rates",
        "Administrative routing creating jurisdiction confusion",
        "Process service complications creating timeline gaps",
      ],
      frequency: "DETECTED MONTHLY",
    },
  ],
};

const NULLUMModulePage = () => {
  return (
    <ModulePageTemplate moduleData={moduleData}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Judicial Timeline Monitor */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-gray-400" />
            <h4 className="font-mono font-bold text-white">
              JUDICIAL TIMELINE MONITOR
            </h4>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded bg-gray-500/20 border border-gray-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-mono text-gray-300">
                  Case Duration: 847 days
                </span>
              </div>
              <div className="text-xs text-gray-400 font-mono">
                348% above normal timeline for case type
              </div>
            </div>

            <div className="p-3 rounded bg-yellow-500/20 border border-yellow-500/30">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-mono text-yellow-300">
                  Stalling Pattern: Active
                </span>
              </div>
              <div className="text-xs text-gray-400 font-mono">
                Procedural delays correlate with evidence degradation timeline
              </div>
            </div>

            <div className="p-3 rounded bg-orange-500/20 border border-orange-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-mono text-orange-300">
                  Expiration Risk: 73 days
                </span>
              </div>
              <div className="text-xs text-gray-400 font-mono">
                Statute of limitations approaching - enforcement window closing
              </div>
            </div>
          </div>
        </div>

        {/* Dissolution Tracking */}
        <div className="space-y-4">
          <h4 className="font-mono font-bold text-white mb-4">
            DISSOLUTION VECTORS
          </h4>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Delay Factor", value: "3.48x", color: "#9ca3af" },
              { label: "Appeal Depth", value: "L7", color: "#fbbf24" },
              { label: "Evidence Viability", value: "31%", color: "#f87171" },
              { label: "Timeline Integrity", value: "0.22", color: "#9ca3af" },
            ].map((metric, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border text-center"
                style={{
                  backgroundColor: `${metric.color}20`,
                  borderColor: `${metric.color}30`,
                }}
              >
                <div
                  className="text-lg font-mono font-bold"
                  style={{ color: metric.color }}
                >
                  {metric.value}
                </div>
                <div className="text-xs text-gray-400 mt-1">{metric.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded bg-gray-800/50 border border-gray-600">
            <div className="text-xs font-mono text-gray-400 mb-2">
              NULLIFICATION VECTOR
            </div>
            <div className="text-sm font-mono text-gray-300">
              Δ(Time × Procedure × Evidence) → Enforcement Dissolution
            </div>
          </div>
        </div>
      </div>
    </ModulePageTemplate>
  );
};

export default NULLUMModulePage;
