
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
    { name: "PURCHASE", path: "/" },
    { name: "REDEEM", path: "/redeem" },
    { name: "SHOP", path: "/shop" },
    { name: "EVENTS", path: "/events" },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  if (!mounted) return null;

  return (
    <div className="mb-6 pb-1 mt-16 hidden md:block">
      <div className="flex justify-center">
        <div className="rounded-md bg-midasbuy-darkBlue px-1 shadow-lg border border-[#33C3F0]/10">
          {navLinks.map((link, index) => (
            <>
              <button 
                key={link.path}
                onClick={() => handleNavigate(link.path)}
                className={cn(
                  "text-white font-bold tracking-wide px-8 py-3 relative hover:text-white transition-colors text-sm",
                  location.pathname === link.path ? "text-white" : ""
                )}
              >
                {link.name}
              </button>
              {index < navLinks.length - 1 && (
                <span className="h-6 w-px bg-gray-700/50 self-center mx-1"></span>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationTabs;
