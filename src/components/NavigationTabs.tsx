
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const NavigationTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const navLinks = [
    { name: "PURCHASE", path: "/pubg-mobile" },
    { name: "REDEEM", path: "/redeem" },
    { name: "SHOP", path: "/" },
    { name: "EVENTS", path: "/events" },
  ];

  const handleNavigate = (path: string) => {
    if (path === "/redeem") {
      navigate("/purchase-history");
    } else {
      navigate(path);
    }
  };

  if (!mounted) return null;

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path === "/pubg-mobile" && location.pathname === "/pubg-mobile") return true;
    if (path === "/redeem" && location.pathname === "/purchase-history") return true;
    if (path === "/events" && location.pathname === "/events") return true;
    return false;
  };

  return (
    <div className="mb-6 pb-1 mt-16 hidden md:block">
      <div className="flex justify-center">
        <div className="rounded-md bg-midasbuy-darkBlue px-1 shadow-lg border border-[#33C3F0]/10">
          {navLinks.map((link, index) => (
            <button 
              key={link.path}
              onClick={() => handleNavigate(link.path)}
              className={cn(
                "text-white font-bold tracking-wide px-8 py-3 relative hover:text-white transition-colors text-sm",
                isActive(link.path) ? "text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-midasbuy-blue" : "text-gray-400"
              )}
            >
              {link.name}
              {index < navLinks.length - 1 && (
                <span className="h-6 w-px bg-gray-700/50 absolute right-0 top-1/2 transform -translate-y-1/2"></span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationTabs;
