import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [seeTogetherHovered, setSeeTogetherHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Hide navigation on module pages
  if (location.pathname.startsWith("/module/")) {
    return null;
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavigation = (hash: string) => {
    navigate(`/vigilum${hash}`);
    setIsMenuOpen(false);
  };

  // Track active section based on current route and scroll position
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/module/clavis")) {
      setActiveSection("clavis");
    } else if (path === "/vigilum") {
      // Track scroll position for vigilum page sections
      const handleScroll = () => {
        const sections = [
          "perception-perspective",
          "modules",
          "demo",
          "clause-simulator",
          "cases",
          "team",
          "stakeholders",
        ];
        const currentSection = sections.find((section) => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });
        setActiveSection(currentSection || "");
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check

      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setActiveSection("");
    }
  }, [location]);

  const getButtonStyles = (section: string, isActive: boolean) => {
    const baseStyles =
      "font-display text-sm uppercase tracking-[0.05em] font-medium transition-all duration-300 ease-out relative";
    const hoverStyles = "hover:text-white";
    const glowStyles = "hover:shadow-[0_0_6px_rgba(255,255,255,0.12)]";

    if (isActive) {
      return `${baseStyles} ${hoverStyles} ${glowStyles} text-white after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent`;
    }

    return `${baseStyles} ${hoverStyles} ${glowStyles} text-gray-300`;
  };

  const getSeeTogetherStyles = (isActive: boolean) => {
    const baseStyles = getButtonStyles("team", isActive);
    const pulseAnimation = seeTogetherHovered ? "animate-pulse" : "";
    const bounceAnimation = seeTogetherHovered ? "animate-bounce" : "";
    const strongerGlow = "hover:shadow-[0_0_12px_rgba(255,255,255,0.2)]";

    return `${baseStyles} ${pulseAnimation} ${bounceAnimation} ${strongerGlow}`;
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b"
      style={{
        backgroundColor: "rgba(11, 30, 22, 0.95)",
        borderBottomColor: "rgba(34, 68, 54, 0.8)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Return Button */}
          <div className="absolute left-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center font-display text-sm uppercase tracking-wider transition-all duration-300"
              style={{
                backdropFilter: "blur(8px)",
                background: "rgba(255, 255, 255, 0.05)",
                borderColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                borderWidth: "1px",
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 8px 32px 0px, rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset",
                color: "rgba(255, 255, 255, 0.8)",
                fontWeight: "500",
                letterSpacing: "1.5px",
                textShadow: "rgba(0, 0, 0, 0.3) 0px 1px 2px",
                padding: "8px 16px",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-2px) scale(1.02)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                e.currentTarget.style.boxShadow =
                  "rgba(0, 0, 0, 0.15) 0px 12px 40px 0px, rgba(255, 255, 255, 0.3) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset";
                e.currentTarget.style.color = "rgba(255, 255, 255, 1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px) scale(1)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.boxShadow =
                  "rgba(0, 0, 0, 0.1) 0px 8px 32px 0px, rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset";
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
              }}
            >
              RETURN
            </button>
          </div>

          {/* Scrollable Navigation Button - Right Side */}
          <div className="hidden md:block absolute right-4">
            <div className="relative group">
              <button
                className="font-display text-sm uppercase tracking-wider transition-all duration-300"
                style={{
                  backdropFilter: "blur(8px)",
                  background: "rgba(255, 255, 255, 0.05)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  borderWidth: "1px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 8px 32px 0px, rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset",
                  color: "rgba(255, 255, 255, 0.8)",
                  fontWeight: "500",
                  letterSpacing: "1.5px",
                  textShadow: "rgba(0, 0, 0, 0.3) 0px 1px 2px",
                  padding: "8px 16px",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-2px) scale(1.02)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.boxShadow =
                    "rgba(0, 0, 0, 0.15) 0px 12px 40px 0px, rgba(255, 255, 255, 0.3) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset";
                  e.currentTarget.style.color = "rgba(255, 255, 255, 1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0px) scale(1)";
                  e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.boxShadow =
                    "rgba(0, 0, 0, 0.1) 0px 8px 32px 0px, rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset";
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
                }}
              >
                NAVIGATE
                <span className="ml-2">↓</span>
              </button>

              {/* Navigation Dropdown - No Scrolling */}
              <div
                className="absolute right-0 mt-2 w-fit rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out transform group-hover:translate-y-0 translate-y-2 z-50"
                style={{
                  backgroundColor: "transparent",
                  backdropFilter: "blur(10px)",
                  border: "none",
                }}
              >
                <div className="py-3">
                  <button
                    onClick={() => handleNavigation("#perception-perspective")}
                    className="w-full text-left text-sm font-display transition-all duration-200 mb-2"
                    style={{
                      backdropFilter: "blur(8px)",
                      background:
                        activeSection === "perception-perspective"
                          ? "rgba(34, 197, 94, 0.15)"
                          : "rgba(255, 255, 255, 0.05)",
                      borderColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      borderWidth: "1px",
                      boxShadow:
                        "rgba(0, 0, 0, 0.1) 0px 4px 16px 0px, rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset",
                      color:
                        activeSection === "perception-perspective"
                          ? "rgba(34, 197, 94, 1)"
                          : "rgba(255, 255, 255, 0.8)",
                      fontWeight: "500",
                      letterSpacing: "1.2px",
                      textShadow: "rgba(0, 0, 0, 0.3) 0px 1px 2px",
                      padding: "10px 16px",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(-1px) scale(1.01)";
                      e.currentTarget.style.background =
                        "rgba(34, 197, 94, 0.2)";
                      e.currentTarget.style.color = "rgba(34, 197, 94, 1)";
                      e.currentTarget.style.boxShadow =
                        "0 0 20px rgba(34, 197, 94, 0.3), rgba(0, 0, 0, 0.1) 0px 4px 16px 0px";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(0px) scale(1)";
                      e.currentTarget.style.background =
                        activeSection === "perception-perspective"
                          ? "rgba(34, 197, 94, 0.15)"
                          : "rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.color =
                        activeSection === "perception-perspective"
                          ? "rgba(34, 197, 94, 1)"
                          : "rgba(255, 255, 255, 0.8)";
                      e.currentTarget.style.boxShadow =
                        "rgba(0, 0, 0, 0.1) 0px 4px 16px 0px, rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset";
                    }}
                  >
                    PERCEPTION
                  </button>
                  <button
                    onClick={() => handleNavigation("#modules")}
                    className="w-full text-left text-sm font-display transition-all duration-200 mb-2"
                    style={{
                      backdropFilter: "blur(8px)",
                      background:
                        activeSection === "modules"
                          ? "rgba(34, 197, 94, 0.15)"
                          : "rgba(255, 255, 255, 0.05)",
                      borderColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      borderWidth: "1px",
                      boxShadow:
                        "rgba(0, 0, 0, 0.1) 0px 4px 16px 0px, rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset",
                      color:
                        activeSection === "modules"
                          ? "rgba(34, 197, 94, 1)"
                          : "rgba(255, 255, 255, 0.8)",
                      fontWeight: "500",
                      letterSpacing: "1.2px",
                      textShadow: "rgba(0, 0, 0, 0.3) 0px 1px 2px",
                      padding: "10px 16px",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(-1px) scale(1.01)";
                      e.currentTarget.style.background =
                        "rgba(34, 197, 94, 0.2)";
                      e.currentTarget.style.color = "rgba(34, 197, 94, 1)";
                      e.currentTarget.style.boxShadow =
                        "0 0 20px rgba(34, 197, 94, 0.3), rgba(0, 0, 0, 0.1) 0px 4px 16px 0px";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(0px) scale(1)";
                      e.currentTarget.style.background =
                        activeSection === "modules"
                          ? "rgba(34, 197, 94, 0.15)"
                          : "rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.color =
                        activeSection === "modules"
                          ? "rgba(34, 197, 94, 1)"
                          : "rgba(255, 255, 255, 0.8)";
                      e.currentTarget.style.boxShadow =
                        "rgba(0, 0, 0, 0.1) 0px 4px 16px 0px, rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset";
                    }}
                  >
                    OPERATORS
                  </button>
                  <button
                    onClick={() => handleNavigation("#demo")}
                    className="w-full text-left text-sm font-display transition-all duration-200 mb-2"
                    style={{
                      backdropFilter: "blur(8px)",
                      background:
                        activeSection === "demo" || activeSection === "clavis"
                          ? "rgba(34, 197, 94, 0.15)"
                          : "rgba(255, 255, 255, 0.05)",
                      borderColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      borderWidth: "1px",
                      boxShadow:
                        "rgba(0, 0, 0, 0.1) 0px 4px 16px 0px, rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset",
                      color:
                        activeSection === "demo" || activeSection === "clavis"
                          ? "rgba(34, 197, 94, 1)"
                          : "rgba(255, 255, 255, 0.8)",
                      fontWeight: "500",
                      letterSpacing: "1.2px",
                      textShadow: "rgba(0, 0, 0, 0.3) 0px 1px 2px",
                      padding: "10px 16px",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(-1px) scale(1.01)";
                      e.currentTarget.style.background =
                        "rgba(34, 197, 94, 0.2)";
                      e.currentTarget.style.color = "rgba(34, 197, 94, 1)";
                      e.currentTarget.style.boxShadow =
                        "0 0 20px rgba(34, 197, 94, 0.3), rgba(0, 0, 0, 0.1) 0px 4px 16px 0px";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(0px) scale(1)";
                      e.currentTarget.style.background =
                        activeSection === "demo" || activeSection === "clavis"
                          ? "rgba(34, 197, 94, 0.15)"
                          : "rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.color =
                        activeSection === "demo" || activeSection === "clavis"
                          ? "rgba(34, 197, 94, 1)"
                          : "rgba(255, 255, 255, 0.8)";
                      e.currentTarget.style.boxShadow =
                        "rgba(0, 0, 0, 0.1) 0px 4px 16px 0px, rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset";
                    }}
                  >
                    PERMUTATOR
                  </button>
                  <button
                    onClick={() => handleNavigation("#cases")}
                    className="w-full text-left text-sm font-display transition-all duration-200 mb-2"
                    style={{
                      backdropFilter: "blur(8px)",
                      background:
                        activeSection === "cases"
                          ? "rgba(34, 197, 94, 0.15)"
                          : "rgba(255, 255, 255, 0.05)",
                      borderColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      borderWidth: "1px",
                      boxShadow:
                        "rgba(0, 0, 0, 0.1) 0px 4px 16px 0px, rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset",
                      color:
                        activeSection === "cases"
                          ? "rgba(34, 197, 94, 1)"
                          : "rgba(255, 255, 255, 0.8)",
                      fontWeight: "500",
                      letterSpacing: "1.2px",
                      textShadow: "rgba(0, 0, 0, 0.3) 0px 1px 2px",
                      padding: "10px 16px",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(-1px) scale(1.01)";
                      e.currentTarget.style.background =
                        "rgba(34, 197, 94, 0.2)";
                      e.currentTarget.style.color = "rgba(34, 197, 94, 1)";
                      e.currentTarget.style.boxShadow =
                        "0 0 20px rgba(34, 197, 94, 0.3), rgba(0, 0, 0, 0.1) 0px 4px 16px 0px";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(0px) scale(1)";
                      e.currentTarget.style.background =
                        activeSection === "cases"
                          ? "rgba(34, 197, 94, 0.15)"
                          : "rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.color =
                        activeSection === "cases"
                          ? "rgba(34, 197, 94, 1)"
                          : "rgba(255, 255, 255, 0.8)";
                      e.currentTarget.style.boxShadow =
                        "rgba(0, 0, 0, 0.1) 0px 4px 16px 0px, rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset";
                    }}
                  >
                    PATTERNS
                  </button>
                  <button
                    onClick={() => handleNavigation("#team")}
                    className="w-full text-left text-sm font-display transition-all duration-200 mb-2"
                    style={{
                      backdropFilter: "blur(8px)",
                      background:
                        activeSection === "team"
                          ? "rgba(34, 197, 94, 0.15)"
                          : "rgba(255, 255, 255, 0.05)",
                      borderColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      borderWidth: "1px",
                      boxShadow:
                        "rgba(0, 0, 0, 0.1) 0px 4px 16px 0px, rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset",
                      color:
                        activeSection === "team"
                          ? "rgba(34, 197, 94, 1)"
                          : "rgba(255, 255, 255, 0.8)",
                      fontWeight: "500",
                      letterSpacing: "1.2px",
                      textShadow: "rgba(0, 0, 0, 0.3) 0px 1px 2px",
                      padding: "10px 16px",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(-1px) scale(1.01)";
                      e.currentTarget.style.background =
                        "rgba(34, 197, 94, 0.2)";
                      e.currentTarget.style.color = "rgba(34, 197, 94, 1)";
                      e.currentTarget.style.boxShadow =
                        "0 0 20px rgba(34, 197, 94, 0.3), rgba(0, 0, 0, 0.1) 0px 4px 16px 0px";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(0px) scale(1)";
                      e.currentTarget.style.background =
                        activeSection === "team"
                          ? "rgba(34, 197, 94, 0.15)"
                          : "rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.color =
                        activeSection === "team"
                          ? "rgba(34, 197, 94, 1)"
                          : "rgba(255, 255, 255, 0.8)";
                      e.currentTarget.style.boxShadow =
                        "rgba(0, 0, 0, 0.1) 0px 4px 16px 0px, rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset";
                    }}
                  >
                    TEAM
                  </button>
                  <button
                    onClick={() => handleNavigation("#stakeholders")}
                    className="w-full text-left text-sm font-display transition-all duration-200"
                    style={{
                      backdropFilter: "blur(8px)",
                      background:
                        activeSection === "stakeholders"
                          ? "rgba(34, 197, 94, 0.15)"
                          : "rgba(255, 255, 255, 0.05)",
                      borderColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      borderWidth: "1px",
                      boxShadow:
                        "rgba(0, 0, 0, 0.1) 0px 4px 16px 0px, rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset",
                      color:
                        activeSection === "stakeholders"
                          ? "rgba(34, 197, 94, 1)"
                          : "rgba(255, 255, 255, 0.8)",
                      fontWeight: "500",
                      letterSpacing: "1.2px",
                      textShadow: "rgba(0, 0, 0, 0.3) 0px 1px 2px",
                      padding: "10px 16px",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(-1px) scale(1.01)";
                      e.currentTarget.style.background =
                        "rgba(34, 197, 94, 0.2)";
                      e.currentTarget.style.color = "rgba(34, 197, 94, 1)";
                      e.currentTarget.style.boxShadow =
                        "0 0 20px rgba(34, 197, 94, 0.3), rgba(0, 0, 0, 0.1) 0px 4px 16px 0px";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(0px) scale(1)";
                      e.currentTarget.style.background =
                        activeSection === "stakeholders"
                          ? "rgba(34, 197, 94, 0.15)"
                          : "rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.color =
                        activeSection === "stakeholders"
                          ? "rgba(34, 197, 94, 1)"
                          : "rgba(255, 255, 255, 0.8)";
                      e.currentTarget.style.boxShadow =
                        "rgba(0, 0, 0, 0.1) 0px 4px 16px 0px, rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset";
                    }}
                  >
                    STAKEHOLDERS
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            className="md:hidden py-4 border-t"
            style={{ borderTopColor: "rgba(34, 68, 54, 0.8)" }}
          >
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => handleNavigation("#perception-perspective")}
                className={`${getButtonStyles("perception-perspective", activeSection === "perception-perspective")} text-left`}
              >
                REALITY?
              </button>
              <button
                onClick={() => handleNavigation("#modules")}
                className={`${getButtonStyles("modules", activeSection === "modules")} text-left`}
              >
                CORE MODULES
              </button>
              <button
                onClick={() => handleNavigation("#demo")}
                className={`${getButtonStyles("demo", activeSection === "demo" || activeSection === "clavis")} text-left`}
                style={{
                  fontWeight:
                    activeSection === "demo" || activeSection === "clavis"
                      ? "600"
                      : "500",
                }}
              >
                SPE
              </button>
              <button
                onClick={() => handleNavigation("#cases")}
                className={`${getButtonStyles("cases", activeSection === "cases")} text-left`}
              >
                RETROSPECTIVES
              </button>
              <button
                onClick={() => handleNavigation("#team")}
                className={`${getButtonStyles("team", activeSection === "team")} text-left`}
              >
                MISSION
              </button>
              <button
                onClick={() => handleNavigation("#stakeholders")}
                className={`${getButtonStyles("stakeholders", activeSection === "stakeholders")} text-left`}
              >
                STAKEHOLDERS
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
