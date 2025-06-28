import Navigation from "@/components/vigilum/Navigation";
import Hero from "@/components/vigilum/Hero";
import ModulesGrid from "@/components/vigilum/ModulesGrid";
import ClauseDemo from "@/components/vigilum/ClauseDemo";
import UseCases from "@/components/vigilum/UseCases";
import AboutSection from "@/components/vigilum/AboutSection";
import Newsletter from "@/components/vigilum/Newsletter";

const VigilumPage = () => {
  return (
    <div className="min-h-screen">
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
