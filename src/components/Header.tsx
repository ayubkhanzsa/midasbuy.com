
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Bell, ChevronDown, Globe } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onLogout: () => void;
}

const Header = ({ onLogout }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { name: "PURCHASE", path: "/" },
    { name: "REDEEM", path: "/redeem" },
    { name: "SHOP", path: "/shop" },
    { name: "EVENTS", path: "/events" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-midasbuy-navy/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-6">
            <img src="/midasbuy-logo.png" alt="MidasBuy" className="h-8" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "nav-link",
                location.pathname === link.path ? "text-white active" : ""
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right side buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="flex items-center text-gray-300 hover:text-white transition-colors">
            <Globe className="w-5 h-5 mr-1" />
            <span>EN</span>
            <ChevronDown className="w-4 h-4 ml-1" />
          </button>
          
          <button className="relative p-1 text-gray-300 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button 
            onClick={onLogout} 
            className="btn-outline text-sm ml-2"
          >
            Sign Out
          </button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-300 hover:text-white" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-midasbuy-navy/95 backdrop-blur-md border-t border-gray-800"
          >
            <div className="container mx-auto px-4 py-3">
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={cn(
                      "py-2 px-3 rounded-md text-gray-300 hover:text-white hover:bg-midasbuy-blue/10 transition-colors",
                      location.pathname === link.path ? "bg-midasbuy-blue/20 text-white" : ""
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="flex justify-between pt-3 border-t border-gray-700">
                  <button className="flex items-center text-gray-300 hover:text-white transition-colors">
                    <Globe className="w-5 h-5 mr-1" />
                    <span>EN</span>
                  </button>
                  <button 
                    onClick={onLogout} 
                    className="text-midasbuy-blue hover:text-midasbuy-blue/80 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
