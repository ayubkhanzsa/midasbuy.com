
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
    <div className="mb-6 pb-1 mt-10 hidden md:block">
      <div className="flex justify-center">
        <div className="rounded-md bg-[#D3E4FD]/10 backdrop-blur-sm border border-[#33C3F0]/20 px-1 shadow-lg">
          {navLinks.map((link, index) => (
            <>
              <button 
                key={link.path}
                onClick={() => handleNavigate(link.path)}
                className={cn(
                  "text-gray-300 font-bold tracking-wide px-8 py-3 relative hover:text-white transition-colors text-sm",
                  location.pathname === link.path ? "text-white" : "",
                  "text-shadow-sm"
                )}
                style={{
                  textShadow: location.pathname === link.path ? "0 0 8px rgba(51, 195, 240, 0.6)" : "0 0 4px rgba(0, 0, 0, 0.5)"
                }}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-[#1EAEDB] shadow-[0_0_8px_rgba(30,174,219,0.8)]"></span>
                )}
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
