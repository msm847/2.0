import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavigation = (hash: string) => {
    navigate(`/vigilum${hash}`);
    setIsMenuOpen(false);
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
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-colors font-mono text-sm uppercase tracking-wider"
            >
              Home
            </Link>
            <button
              onClick={() => handleNavigation("#modules")}
              className="text-gray-300 hover:text-white transition-colors font-mono text-sm uppercase tracking-wider"
            >
              Modules
            </button>
            <button
              onClick={() => handleNavigation("#demo")}
              className="text-gray-300 hover:text-white transition-colors font-mono text-sm uppercase tracking-wider"
            >
              CLAVIS
            </button>
            <button
              onClick={() => handleNavigation("#cases")}
              className="text-gray-300 hover:text-white transition-colors font-mono text-sm uppercase tracking-wider whitespace-nowrap"
            >
              Clause Library
            </button>
            <button
              onClick={() => handleNavigation("#about")}
              className="text-gray-300 hover:text-white transition-colors font-mono text-sm uppercase tracking-wider"
            >
              Methodology
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
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition-colors font-mono text-sm uppercase tracking-wider"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <button
                onClick={() => handleNavigation("#modules")}
                className="text-gray-300 hover:text-white transition-colors font-mono text-sm uppercase tracking-wider text-left"
              >
                Modules
              </button>
              <button
                onClick={() => handleNavigation("#demo")}
                className="text-gray-300 hover:text-white transition-colors font-mono text-sm uppercase tracking-wider text-left"
              >
                CLAVIS
              </button>
              <button
                onClick={() => handleNavigation("#cases")}
                className="text-gray-300 hover:text-white transition-colors font-mono text-sm uppercase tracking-wider text-left"
              >
                Clause Library
              </button>
              <button
                onClick={() => handleNavigation("#about")}
                className="text-gray-300 hover:text-white transition-colors font-mono text-sm uppercase tracking-wider text-left"
              >
                Methodology
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
