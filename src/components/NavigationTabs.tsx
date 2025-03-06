
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const NavigationTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  
  const navLinks = [
    { name: "PURCHASE", path: "/" },
    { name: "REDEEM", path: "/redeem" },
    { name: "SHOP", path: "/shop" },
    { name: "EVENTS", path: "/events" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="hidden md:block relative z-20 bg-midasbuy-darkBlue border-b border-gray-800 shadow-md py-0 mt-[290px]">
      <div className="container mx-auto">
        <div className="flex justify-center items-center">
          {navLinks.map((link, index) => (
            <button 
              key={link.path}
              onClick={() => handleNavigate(link.path)}
              className={cn(
                "text-gray-400 font-bold tracking-wider px-10 py-4 relative hover:text-white transition-colors text-sm",
                location.pathname === link.path ? "text-white" : "",
                index < navLinks.length - 1 ? "border-r border-gray-700" : ""
              )}
            >
              {link.name}
              {location.pathname === link.path && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-midasbuy-blue"></span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationTabs;
