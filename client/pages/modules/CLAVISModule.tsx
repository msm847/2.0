import Navigation from "@/components/vigilum/Navigation";
import SemanticPermutationEngine from "@/components/vigilum/SemanticPermutationEngine";

const CLAVISModulePage = () => {
  return (
    <div
      className="min-h-screen text-gray-100 font-mono"
      style={{
        background: "radial-gradient(circle, #0B1E16 0%, #050D0A 100%)",
      }}
    >
      <Navigation />
      <div className="pt-16">
        <SemanticPermutationEngine />
      </div>
    </div>
  );
};

export default CLAVISModulePage;
