import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/vigilum/Navigation";
import Hero from "@/components/vigilum/Hero";
import WhatWeFight from "@/components/vigilum/WhatWeFight";
import ModuleGrid from "@/components/vigilum/ModuleGrid";
import LegalStructuralSimulator from "@/components/vigilum/LegalStructuralSimulator";

import SemanticPermutationEngine from "@/components/vigilum/SemanticPermutationEngine";
import InfiniteMenu from "@/components/ui/InfiniteMenu";
import UseCases from "@/components/vigilum/UseCases";
import TeamContact from "@/components/vigilum/TeamContact";

const VigilumPage = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle hash scrolling when component mounts or location changes
    const handleHashScroll = () => {
      if (location.hash) {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 100);
        }
      }
    };

    handleHashScroll();
  }, [location]);

  return (
    <div
      className="min-h-screen text-gray-100 font-mono"
      style={{
        background: "radial-gradient(circle, #0B1E16 0%, #050D0A 100%)",
      }}
    >
      <Navigation />
      <Hero />
      <WhatWeFight />
      <div id="modules">
        <ModuleGrid />
      </div>
      <div id="clause-simulator">
        <LegalStructuralSimulator />
      </div>

      <div id="demo">
        <SemanticPermutationEngine />
      </div>
      <div id="infinite-menu" style={{ height: "600px", position: "relative" }}>
        <InfiniteMenu
          items={[
            {
              color: "#d4a300",
              link: "/loophole/L001",
              title: "Directive 2014/24/EU – Article 32(2)(a)",
              description: "Negotiated procedure without prior publication",
            },
            {
              color: "#b4241d",
              link: "/loophole/L002",
              title: "Directive 2014/24/EU – Article 68(1)(b)",
              description: "Price revision formula based on indexation",
            },
            {
              color: "#1e2b44",
              link: "/loophole/L003",
              title: "Directive 2014/24/EU – Article 12(1)",
              description: "Public-public cooperation exemption",
            },
            {
              color: "#1e2b44",
              link: "/loophole/L004",
              title: "Directive 2014/23/EU – Article 44(1)(d)",
              description: "Unilateral termination clause logic",
            },
            {
              color: "#d4a300",
              link: "/loophole/L005",
              title: "Directive 2014/24/EU – Article 72(1)(c)",
              description: "Contract modification without new procedure",
            },
            {
              color: "#5a4d7c",
              link: "/loophole/L006",
              title: "Directive 2014/24/EU – Article 33(1)",
              description: "Framework agreement without re-opening terms",
            },
          ]}
        />
      </div>
      <div id="cases">
        <UseCases />
      </div>
      <div id="team">
        <TeamContact />
      </div>
      <div id="bottom" style={{ height: "1px" }}></div>
    </div>
  );
};

export default VigilumPage;
