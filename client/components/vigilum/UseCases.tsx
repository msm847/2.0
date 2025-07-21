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
              className="text-display-lg text-white mb-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Structural Retrospectives
            </motion.h2>
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
                  color: "#2A2A2A",
                  link: "/loophole/L001",
                  title: "1. Directive 2014/24/EU\nArticle 32(2)(a)",
                  description: "Negotiated procedure without prior publication",
                },
                {
                  color: "#404040",
                  link: "/loophole/L002",
                  title: "2. Directive 2014/24/EU\nArticle 68(1)(b)",
                  description: "Price revision formula based on indexation",
                },
                {
                  color: "#5A5A5A",
                  link: "/loophole/L003",
                  title: "3. Directive 2014/24/EU\nArticle 12(1)",
                  description: "Public-public cooperation exemption",
                },
                {
                  color: "#707070",
                  link: "/loophole/L004",
                  title: "4. Directive 2014/23/EU\nArticle 44(1)(d)",
                  description: "Unilateral termination clause logic",
                },
                {
                  color: "#8A8A8A",
                  link: "/loophole/L005",
                  title: "5. Directive 2014/24/EU\nArticle 72(1)(c)",
                  description: "Contract modification without new procedure",
                },
                {
                  color: "#A0A0A0",
                  link: "/loophole/L006",
                  title: "6. Directive 2014/24/EU\nArticle 33(1)",
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
