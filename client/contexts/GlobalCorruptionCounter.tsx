import { createContext, useContext, useEffect, useState } from "react";

interface GlobalCorruptionCounterContextType {
  globalLoss: number;
}

const GlobalCorruptionCounterContext = createContext<GlobalCorruptionCounterContextType | null>(null);

export const useGlobalCorruptionCounter = () => {
  const context = useContext(GlobalCorruptionCounterContext);
  if (!context) {
    throw new Error("useGlobalCorruptionCounter must be used within GlobalCorruptionCounterProvider");
  }
  return context;
};

export const GlobalCorruptionCounterProvider = ({ children }: { children: React.ReactNode }) => {
  const [globalLoss, setGlobalLoss] = useState(87432198);

  // Single global counter that runs continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalLoss((prev) => prev + 114169);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <GlobalCorruptionCounterContext.Provider value={{ globalLoss }}>
      {children}
    </GlobalCorruptionCounterContext.Provider>
  );
};
