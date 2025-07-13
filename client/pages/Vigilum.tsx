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
              title: "L001 – Emergency Procurement Shell",
              description:
                "Simulates urgency to bypass competition via discretionary trigger.",
            },
            {
              color: "#b4241d",
              link: "/loophole/L002",
              title: "L002 – Indexation Spiral",
              description:
                "Legally inflates public cost by pegging prices to volatile indexes.",
            },
            {
              color: "#1e2b44",
              link: "/loophole/L003",
              title: "L003 – In-House Disguise",
              description:
                "Simulates public-public cooperation to mask hidden subcontracting.",
            },
            {
              color: "#1e2b44",
              link: "/loophole/L004",
              title: "L004 – One-Sided Termination",
              description:
                "Simulates bilateralism, grants private unilateral exit rights.",
            },
            {
              color: "#d4a300",
              link: "/loophole/L005",
              title: "L005 – Unbounded Modification",
              description:
                "Uses vague modification clauses to expand contract without tender.",
            },
            {
              color: "#5a4d7c",
              link: "/loophole/L006",
              title: "L006 – Non-Transparent Framework",
              description:
                "Simulates transparency via frameworks with hidden award logic.",
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
