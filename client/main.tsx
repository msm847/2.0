import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import VigilumPage from "./pages/Vigilum";
import NotFound from "./pages/NotFound";
import CLAVISModulePage from "./pages/modules/CLAVISModule";
import OBSCURAModulePage from "./pages/modules/OBSCURAModule";
import NULLUMModulePage from "./pages/modules/NULLUMModule";
import NEXUSPOTENTIAModulePage from "./pages/modules/NEXUSPOTENTIAModule";
import VIGILOCOREModulePage from "./pages/modules/VIGILOCOREModule";
import VERISModulePage from "./pages/modules/VERISModule";
import SENTIUMModulePage from "./pages/modules/SENTIUMModule";
import ProblemPage from "./pages/core-intelligence/problem";
import SolutionPage from "./pages/core-intelligence/solution";
import MethodPage from "./pages/core-intelligence/method";
import SystemPage from "./pages/core-intelligence/system";
import ImpactPage from "./pages/core-intelligence/impact";
import DeploymentPage from "./pages/core-intelligence/deployment";
import ContactPage from "./pages/Contact";

const queryClient = new QueryClient();

// Global error handler for development
if (import.meta.env.DEV) {
  window.addEventListener("unhandledrejection", (event) => {
    if (
      event.reason?.name === "AbortError" ||
      event.reason?.message?.includes("aborted")
    ) {
      console.warn(
        "Fetch request was aborted (likely due to component unmounting or navigation)",
        event.reason,
      );
      event.preventDefault(); // Prevent the error from being logged as uncaught
    }
  });
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vigilum" element={<VigilumPage />} />
          <Route path="/module/clavis" element={<CLAVISModulePage />} />
          <Route path="/module/obscura" element={<OBSCURAModulePage />} />
          <Route path="/module/nullum" element={<NULLUMModulePage />} />
          <Route
            path="/module/nexus-potentia"
            element={<NEXUSPOTENTIAModulePage />}
          />
          <Route
            path="/module/vigilo-core"
            element={<VIGILOCOREModulePage />}
          />
          <Route path="/module/veris" element={<VERISModulePage />} />
          <Route path="/module/sentium" element={<SENTIUMModulePage />} />
          <Route path="/core-intelligence/problem" element={<ProblemPage />} />
          <Route
            path="/core-intelligence/solution"
            element={<SolutionPage />}
          />
          <Route path="/core-intelligence/method" element={<MethodPage />} />
          <Route path="/core-intelligence/system" element={<SystemPage />} />
          <Route path="/core-intelligence/impact" element={<ImpactPage />} />
          <Route
            path="/core-intelligence/deployment"
            element={<DeploymentPage />}
          />
          <Route path="/contact" element={<ContactPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
