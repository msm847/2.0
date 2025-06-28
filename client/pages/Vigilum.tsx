import Hero from "@/components/vigilum/Hero";
import ModulesGrid from "@/components/vigilum/ModulesGrid";
import ClauseDemo from "@/components/vigilum/ClauseDemo";
import UseCases from "@/components/vigilum/UseCases";
import AboutSection from "@/components/vigilum/AboutSection";

const VigilumPage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ModulesGrid />
      <ClauseDemo />
      <UseCases />
      <AboutSection />
    </div>
  );
};

export default VigilumPage;
