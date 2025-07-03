import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Menu, X, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold text-white tracking-tight">
              VIGILUM.AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-colors font-mono text-sm uppercase tracking-wider"
            >
              Home
            </Link>
            <a
              href="#modules"
              className="text-gray-300 hover:text-white transition-colors font-mono text-sm uppercase tracking-wider"
            >
              Modules
            </a>
            <a
              href="#demo"
              className="text-gray-300 hover:text-white transition-colors font-mono text-sm uppercase tracking-wider"
            >
              CLAVIS
            </a>
            <a
              href="#cases"
              className="text-gray-300 hover:text-white transition-colors font-mono text-sm uppercase tracking-wider"
            >
              Case Studies
            </a>
            <a
              href="#about"
              className="text-gray-300 hover:text-white transition-colors font-mono text-sm uppercase tracking-wider"
            >
              Methodology
            </a>
          </div>

          {/* Structural Status Indicator */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-xs text-gray-400 font-mono">
                OPERATIONAL
              </span>
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
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition-colors font-mono text-sm uppercase tracking-wider"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <a
                href="#modules"
                className="text-gray-300 hover:text-white transition-colors font-mono text-sm uppercase tracking-wider"
                onClick={toggleMenu}
              >
                Modules
              </a>
              <a
                href="#demo"
                className="text-gray-300 hover:text-white transition-colors font-mono text-sm uppercase tracking-wider"
                onClick={toggleMenu}
              >
                CLAVIS
              </a>
              <a
                href="#cases"
                className="text-gray-300 hover:text-white transition-colors font-mono text-sm uppercase tracking-wider"
                onClick={toggleMenu}
              >
                Case Studies
              </a>
              <a
                href="#about"
                className="text-gray-300 hover:text-white transition-colors font-mono text-sm uppercase tracking-wider"
                onClick={toggleMenu}
              >
                Methodology
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
