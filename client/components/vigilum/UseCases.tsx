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
          <div className="text-center mb-16">
            <motion.h2
              className="text-white mb-8 font-semibold leading-tight"
              style={{
                fontFamily: "IBM Plex Sans, sans-serif",
                fontSize: "clamp(2.4rem, 3.4vw, 3rem)",
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Retrospective Clause Mapping
            </motion.h2>
            <div className="flex items-start justify-center max-w-4xl mx-auto relative">
              <p className="text-xl text-gray-400 font-light leading-relaxed text-center">
                Scroll through an interactive sphere of loophole profiles—each simulating how a single clause or sequence re-routes oversight, encodes risk transfer, or fragments recognition across the system.
              </p>
              <div className="absolute right-0 top-0 text-gray-400 z-10" style={{ transform: 'translateY(-10px)' }}>
                <svg
                  width="120"
                  height="80"
                  viewBox="0 0 120 80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* L-shaped arrow path: right then down */}
                  <path d="M10 20 L50 20 L50 60" />
                  {/* Arrow head pointing down */}
                  <polyline points="45,55 50,60 55,55" />
                </svg>
              </div>
            </div>
          </div>

          <div style={{ height: "600px", position: "relative" }}>
            <InfiniteMenu
              items={[
                {
                  color: "#2A2A2A",
                  link: "/loophole/L001",
                  title: "Directive 2014/24/EU\nArticle 32(2)(a)",
                  description: "Negotiated procedure without prior publication",
                  number: 1,
                },
                {
                  color: "#404040",
                  link: "/loophole/L002",
                  title: "Directive 2014/24/EU\nArticle 68(1)(b)",
                  description: "Price revision formula based on indexation",
                  number: 2,
                },
                {
                  color: "#5A5A5A",
                  link: "/loophole/L003",
                  title: "Directive 2014/24/EU\nArticle 12(1)",
                  description: "Public-public cooperation exemption",
                  number: 3,
                },
                {
                  color: "#707070",
                  link: "/loophole/L004",
                  title: "Directive 2014/23/EU\nArticle 44(1)(d)",
                  description: "Unilateral termination clause logic",
                  number: 4,
                },
                {
                  color: "#8A8A8A",
                  link: "/loophole/L005",
                  title: "Directive 2014/24/EU\nArticle 72(1)(c)",
                  description: "Contract modification without new procedure",
                  number: 5,
                },
                {
                  color: "#A0A0A0",
                  link: "/loophole/L006",
                  title: "Directive 2014/24/EU\nArticle 33(1)",
                  description: "Framework agreement without re-opening terms",
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
