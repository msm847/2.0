import { useState } from "react";
import { motion } from "framer-motion";
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
  return (
    <div className="py-20" style={{ backgroundColor: "#24352E" }}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 mt-8">
            <motion.h2
              className="mb-8 font-semibold leading-tight"
              style={{
                fontFamily: "IBM Plex Sans, sans-serif",
                fontSize: "clamp(2.4rem, 3.4vw, 3rem)",
                color: "#E5F3ED",
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Retrospective Clause Mapping
            </motion.h2>
            <div className="text-xl text-gray-400 font-light leading-relaxed text-center max-w-4xl mx-auto">
              <p>Each sphere node is a live loophole profile: source, mechanism, risk, and real-world scenario.</p>
              <p>Scroll to surface the architectures of bypass that shape procurement across the EU.</p>
            </div>
          </div>

          <div style={{ height: "600px", position: "relative" }}>
            {/* Interactive instruction text */}
            <div style={{
              position: "absolute",
              top: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "14px",
              fontFamily: "monospace",
              letterSpacing: "1px",
              textAlign: "center",
              pointerEvents: "none",
              textShadow: "0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.2)",
              filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))"
            }}>
              Interactive • Click & drag
            </div>
            <InfiniteMenu
              items={[
                {
                  color: "#2A2A2A",
                  link: "/loophole/L001",
                  source: "Directive 2014/24/EU, Art. 32(2)(a)",
                  title: "Negotiated Procedure Without Publication",
                  description: "If no \"suitable\" bids are received, authorities may negotiate directly—opening a formal backdoor for preferred suppliers.",
                  number: 1,
                },
                {
                  color: "#404040",
                  link: "/loophole/L002",
                  source: "Directive 2014/24/EU, Art. 32(2)(c)",
                  title: "Urgent Direct Award",
                  description: "\"Extreme urgency\" provisions let officials skip open bidding, making it possible to justify direct contracts by invoking crisis or emergency.",
                  number: 2,
                },
                {
                  color: "#5A5A5A",
                  link: "/loophole/L003",
                  source: "Directive 2014/24/EU, Art. 72(1)(c)",
                  title: "Contract Modification for Unforeseen Events",
                  description: "Contracts can be expanded after award if justified as \"unforeseeable,\" often masking planned scope increases or retroactive legal cover.",
                  number: 3,
                },
                {
                  color: "#707070",
                  link: "/loophole/L004",
                  source: "Directive 2014/24/EU, Art. 12",
                  title: "In-House Award (Teckal Exemption)",
                  description: "Authorities create their own controlled entities and award contracts internally, bypassing competition in ways that embed loyalty networks.",
                  number: 4,
                },
                {
                  color: "#8A8A8A",
                  link: "/loophole/L005",
                  source: "Directive 2014/23/EU, Art. 42 & 43",
                  title: "Unregulated Subcontracting",
                  description: "Subcontracting rules are delegated to national law, enabling local actors to structure shadow deals that escape EU procurement oversight.",
                  number: 5,
                },
                {
                  color: "#A0A0A0",
                  link: "/loophole/L006",
                  source: "Directive 2014/25/EU, Art. 30",
                  title: "Joint Venture Internal Award",
                  description: "Public utilities and entities form joint ventures, then transfer contracts internally—evading open tenders by engineering eligibility.",
                  number: 6,
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
