import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, Key, CheckCircle } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const timer1 = setTimeout(() => setAnimationStep(1), 500);
      const timer2 = setTimeout(() => setAnimationStep(2), 1000);
      const timer3 = setTimeout(() => setAnimationStep(3), 1500);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else {
      setAnimationStep(0);
    }
  }, [isOpen]);

  // Network connection animation paths
  const connectionPaths = [
    "M50,30 Q70,50 90,30",
    "M10,50 Q30,30 50,50",
    "M50,70 Q30,50 10,70",
    "M90,70 Q70,50 50,70",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(8px)",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="relative w-full max-w-lg mx-auto"
            style={{
              background:
                "radial-gradient(ellipse at center, #0a1418 0%, #0d1f1a 100%)",
              border: "1px solid rgba(157, 230, 198, 0.2)",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: `
                0 25px 50px -12px rgba(0, 0, 0, 0.8),
                0 0 0 1px rgba(255, 255, 255, 0.05),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full transition-all duration-200 hover:bg-white/10"
              style={{ color: "#9CA3AF" }}
            >
              <X className="w-5 h-5" />
            </motion.button>



            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
              className="flex justify-center mb-6"
            >
              <div className="w-16 h-16 rounded-full bg-green-600/20 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </motion.div>

            {/* Main Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-center mb-4"
            >
              <h2
                className="text-2xl font-bold mb-4 leading-tight"
                style={{
                  fontFamily: "IBM Plex Sans, sans-serif",
                  background: "linear-gradient(135deg, #FFFFFF, #10B981)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Your Engagement Drives Integrity Forward
              </h2>

              <p
                className="text-lg mb-0 leading-relaxed"
                style={{ color: "#E5F3ED" }}
              >
                Thank you for contributing to Vigilum's mission of detecting
                hidden governance risks before they embed. Together, we build
                foresight into integrity.
              </p>


            </motion.div>

            {/* Continue Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex justify-center"
            >
              <motion.button
                onClick={onClose}
                className="px-8 py-3 rounded-lg font-medium transition-all duration-300 group relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #10B981, #059669)",
                  color: "#FFFFFF",
                  border: "1px solid rgba(16, 185, 129, 0.5)",
                  fontFamily: "IBM Plex Sans, sans-serif",
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 25px rgba(16, 185, 129, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Continue Exploring</span>
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    →
                  </motion.div>
                </span>

                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.1), transparent)",
                  }}
                />
              </motion.button>
            </motion.div>

            {/* Ambient glow animation */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(16, 185, 129, 0.1)",
                  "0 0 40px rgba(16, 185, 129, 0.2)",
                  "0 0 20px rgba(16, 185, 129, 0.1)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
