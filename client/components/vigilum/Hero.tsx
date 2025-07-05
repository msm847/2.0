const Hero = () => {
  return (
    <div
      className="relative pt-24 pb-16 overflow-hidden"
      style={{ backgroundColor: "#0B1E16" }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-yellow-500/20" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent)] animate-pulse" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6">
              VIGILUM
              <span className="block text-blue-400">
                GOVERNANCE INTELLIGENCE
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
