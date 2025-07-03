import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/vigilum" className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold text-white">Vigilum.AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#modules"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Modules
            </a>
            <a
              href="#demo"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Demo
            </a>
            <a
              href="#cases"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Live Examples
            </a>
            <a
              href="#about"
              className="text-slate-300 hover:text-white transition-colors"
            >
              About
            </a>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Try Platform
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-slate-300 hover:text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800">
            <div className="flex flex-col space-y-4">
              <a
                href="#modules"
                className="text-slate-300 hover:text-white transition-colors"
                onClick={toggleMenu}
              >
                Modules
              </a>
              <a
                href="#demo"
                className="text-slate-300 hover:text-white transition-colors"
                onClick={toggleMenu}
              >
                Demo
              </a>
              <a
                href="#cases"
                className="text-slate-300 hover:text-white transition-colors"
                onClick={toggleMenu}
              >
                Use Cases
              </a>
              <a
                href="#about"
                className="text-slate-300 hover:text-white transition-colors"
                onClick={toggleMenu}
              >
                About
              </a>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white w-fit"
                onClick={toggleMenu}
              >
                Try Platform
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
