import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/vigilum/Navigation";
import Hero from "@/components/vigilum/Hero";
import PerceptionPerspective from "@/components/vigilum/PerceptionPerspective";
import ModuleGrid from "@/components/vigilum/ModuleGrid";
import LegalStructuralSimulator from "@/components/vigilum/LegalStructuralSimulator";

import SemanticPermutationEngine from "@/components/vigilum/SemanticPermutationEngine";
import UseCases from "@/components/vigilum/UseCases";
import TeamContact from "@/components/vigilum/TeamContact";
import Partners from "@/components/vigilum/Partners";

const VigilumPage = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle hash scrolling when component mounts or location changes
    const handleHashScroll = () => {
      if (location.hash) {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          // Use requestAnimationFrame to ensure DOM is ready
          requestAnimationFrame(() => {
            element.scrollIntoView({
              behavior: "instant",
              block: "start",
            });
          });
        }
      }
    };

    handleHashScroll();
  }, [location]);

  return (
    <div
      className="min-h-screen text-gray-100 font-body relative overflow-hidden"
      style={{
        background: "radial-gradient(circle, #0B1E16 0%, #050D0A 100%)",
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
      }}
    >
      <Navigation />
      <Hero />
      <div id="perception-perspective">
        <PerceptionPerspective />
      </div>
      <div id="clause-simulator">
        <LegalStructuralSimulator />
      </div>
      <div id="modules">
        <ModuleGrid />
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
      <div id="partners">
        <Partners />
      </div>
      <div id="bottom" style={{ height: "1px" }}></div>
    </div>
  );
};

export default VigilumPage;
