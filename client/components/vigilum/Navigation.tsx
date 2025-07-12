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
        const sections = ["modules", "demo", "cases", "about", "team"];
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
      "font-mono text-sm uppercase tracking-[0.08em] font-medium transition-all duration-300 ease-out relative";
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
          <Link
            to="/"
            className="flex items-center px-3 py-2 rounded border font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: "rgba(16, 44, 34, 0.5)",
              borderColor: "rgba(34, 68, 54, 0.6)",
              color: "#9ca3af",
              boxShadow: "inset 0 0 0 1px rgba(52, 211, 153, 0.05)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(34, 68, 54, 0.7)";
              e.currentTarget.style.color = "#34d399";
              e.currentTarget.style.boxShadow =
                "0 0 10px rgba(52, 211, 153, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(16, 44, 34, 0.5)";
              e.currentTarget.style.color = "#9ca3af";
              e.currentTarget.style.boxShadow =
                "inset 0 0 0 1px rgba(52, 211, 153, 0.05)";
            }}
          >
            RETURN
          </Link>

          {/* Scrollable Navigation Button - Right Side */}
          <div className="hidden md:block absolute right-4">
            <div className="relative group">
              <button
                className="px-4 py-2 text-gray-300 hover:text-white font-mono text-sm transition-colors duration-200 border border-gray-600 rounded"
                style={{
                  backgroundColor: "rgba(5, 15, 12, 0.95)",
                }}
              >
                NAVIGATE
                <span className="ml-2">↓</span>
              </button>

              {/* Scrollable Dropdown */}
              <div
                className="absolute right-0 mt-2 w-48 max-h-64 overflow-y-auto border border-gray-600 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out transform group-hover:translate-y-0 translate-y-2 z-50"
                style={{
                  backgroundColor: "rgba(5, 15, 12, 0.95)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="py-2">
                  <button
                    onClick={() => handleNavigation("#modules")}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${
                      activeSection === "modules"
                        ? "text-green-400 bg-green-400/10"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    ENGINES
                  </button>
                  <button
                    onClick={() => handleNavigation("#clause-simulator")}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${
                      activeSection === "clause-simulator"
                        ? "text-green-400 bg-green-400/10"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    CLAUSE SIMULATOR
                  </button>
                  <button
                    onClick={() => handleNavigation("#demo")}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${
                      activeSection === "demo" || activeSection === "clavis"
                        ? "text-green-400 bg-green-400/10"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    SPE
                  </button>
                  <button
                    onClick={() => handleNavigation("#cases")}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${
                      activeSection === "cases"
                        ? "text-green-400 bg-green-400/10"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    LIBRARY
                  </button>
                  <button
                    onClick={() => handleNavigation("#team")}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${
                      activeSection === "team"
                        ? "text-green-400 bg-green-400/10"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    TEAM
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
                onClick={() => handleNavigation("#modules")}
                className={`${getButtonStyles("modules", activeSection === "modules")} text-left`}
              >
                ENGINES
              </button>
              <button
                onClick={() => handleNavigation("#about")}
                className={`${getButtonStyles("about", activeSection === "about")} text-left`}
              >
                METHODOLOGY
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
                LIBRARY
              </button>
              <button
                onClick={() => handleNavigation("#team")}
                className={`${getSeeTogetherStyles(activeSection === "team")} text-left whitespace-nowrap`}
                onMouseEnter={() => setSeeTogetherHovered(true)}
                onMouseLeave={() => setSeeTogetherHovered(false)}
              >
                TEAM
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
