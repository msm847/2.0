import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/vigilum/Navigation";
import Hero from "@/components/vigilum/Hero";
import WhatWeFight from "@/components/vigilum/WhatWeFight";
import ModuleGrid from "@/components/vigilum/ModuleGrid";
import LegalStructuralSimulator from "@/components/vigilum/LegalStructuralSimulator";

import SemanticPermutationEngine from "@/components/vigilum/SemanticPermutationEngine";
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
