import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/vigilum/Navigation";
import Hero from "@/components/vigilum/Hero";
import ModulesGrid from "@/components/vigilum/ModulesGrid";
import ClauseDemo from "@/components/vigilum/ClauseDemo";
import UseCases from "@/components/vigilum/UseCases";
import AboutSection from "@/components/vigilum/AboutSection";
import Newsletter from "@/components/vigilum/Newsletter";

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
    <div className="min-h-screen bg-gray-900 text-gray-100 font-mono">
      <Navigation />
      <Hero />
      <div id="modules">
        <ModulesGrid />
      </div>
      <div id="demo">
        <ClauseDemo />
      </div>
      <div id="cases">
        <UseCases />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <Newsletter />
    </div>
  );
};

export default VigilumPage;
