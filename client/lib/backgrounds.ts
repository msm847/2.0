// Centralized background gradients to avoid duplication
export const BACKGROUNDS = {
  // Primary dark radial gradient used across main pages
  PRIMARY_RADIAL: "radial-gradient(circle, #0B1E16 0%, #050D0A 100%)",
  
  // Section-specific gradients
  CORE_PRINCIPLES: "linear-gradient(135deg, #25443B 0%, #1A2F29 50%, #10201C 100%)",
  MODULE_GRID: "linear-gradient(180deg, #121B17, #121B17)",
  SEMANTIC_ENGINE: "linear-gradient(90deg, #1e2d26 0%, #1f2225 100%)",
  
  // Modal and card backgrounds
  MODAL_DARK: "radial-gradient(circle, #0a1418 0%, #0d1f1a 100%)",
  CARD_GLASS: "linear-gradient(135deg, rgba(16, 32, 28, 0.9) 0%, rgba(12, 25, 22, 0.9) 100%)",
  
  // Perception-specific gradients
  PERCEPTION_BASE: "linear-gradient(135deg, #0a1c15, #123528)",
  PERCEPTION_SEMANTIC: "radial-gradient(ellipse at center, #223c32 0%, #1c2f26 100%)",
} as const;
