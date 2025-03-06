
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  onLogout: () => void;
}

const MobileNav = ({ isMenuOpen, setIsMenuOpen, onLogout }: MobileNavProps) => {
  const location = useLocation();
  
  const navLinks = [
    { name: "PURCHASE", path: "/" },
    { name: "REDEEM", path: "/redeem" },
    { name: "SHOP", path: "/shop" },
    { name: "EVENTS", path: "/events" },
  ];

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-midasbuy-navy/95 backdrop-blur-md border-t border-gray-800 relative z-10"
        >
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "py-2 px-3 rounded-md text-gray-300 hover:text-white hover:bg-midasbuy-blue/10 transition-colors font-bold tracking-wider text-base",
                    location.pathname === link.path ? "bg-midasbuy-blue/20 text-white" : ""
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex justify-between pt-3 border-t border-gray-700">
                <button 
                  onClick={onLogout} 
                  className="text-white text-xs px-3 py-1.5 rounded-md transition-all"
                >
                  Sign Out
                </button>
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
