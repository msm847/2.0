import React from "react";
import { motion } from "framer-motion";

const PerceptionPerspective = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 pl-12 pr-12" style={{ backgroundColor: "#0D1510" }}>
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-display-lg text-white mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            PERCEPTION PERSPECTIVE
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            <p className="text-body-lg text-gray-300 mb-6 leading-relaxed">
              Understanding begins with recognizing the lens through which we observe
              institutional structures and their embedded vulnerabilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerceptionPerspective;
