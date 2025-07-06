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
        const sections = ["modules", "demo", "cases", "about", "newsletter"];
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
    const baseStyles = getButtonStyles("newsletter", isActive);
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
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-white tracking-tight">
              VIGILUM.AI
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => handleNavigation("#modules")}
              className={getButtonStyles(
                "modules",
                activeSection === "modules",
              )}
            >
              ENGINES
            </button>
            <span className="mx-6 text-gray-600 text-xs">·</span>
            <button
              onClick={() => handleNavigation("#demo")}
              className={getButtonStyles(
                "demo",
                activeSection === "demo" || activeSection === "clavis",
              )}
              style={{
                fontWeight:
                  activeSection === "demo" || activeSection === "clavis"
                    ? "600"
                    : "500",
              }}
            >
              SPE
            </button>
            <span className="mx-6 text-gray-600 text-xs">·</span>
            <button
              onClick={() => handleNavigation("#cases")}
              className={getButtonStyles("cases", activeSection === "cases")}
            >
              LIBRARY
            </button>
            <span className="mx-6 text-gray-600 text-xs">·</span>
            <button
              onClick={() => handleNavigation("#about")}
              className={getButtonStyles("about", activeSection === "about")}
            >
              METHODOLOGY
            </button>
            <span className="mx-6 text-gray-600 text-xs">·</span>
            <button
              onClick={() => handleNavigation("#newsletter")}
              className={`${getSeeTogetherStyles(activeSection === "newsletter")} whitespace-nowrap`}
              onMouseEnter={() => setSeeTogetherHovered(true)}
              onMouseLeave={() => setSeeTogetherHovered(false)}
            >
              See together
            </button>
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
                onClick={() => handleNavigation("#demo")}
                className={`${getButtonStyles("demo", activeSection === "demo" || activeSection === "clavis")} text-left`}
                style={{
                  fontWeight:
                    activeSection === "demo" || activeSection === "clavis"
                      ? "600"
                      : "500",
                }}
              >
                CLAVIS
              </button>
              <button
                onClick={() => handleNavigation("#cases")}
                className={`${getButtonStyles("cases", activeSection === "cases")} text-left`}
              >
                LIBRARY
              </button>
              <button
                onClick={() => handleNavigation("#about")}
                className={`${getButtonStyles("about", activeSection === "about")} text-left`}
              >
                METHODOLOGY
              </button>
              <button
                onClick={() => handleNavigation("#newsletter")}
                className={`${getSeeTogetherStyles(activeSection === "newsletter")} text-left whitespace-nowrap`}
                onMouseEnter={() => setSeeTogetherHovered(true)}
                onMouseLeave={() => setSeeTogetherHovered(false)}
              >
                See together
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
