
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const MobileNavigationTabs = () => {
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
    <div className="mb-4 overflow-x-auto pb-1 mt-4 md:hidden">
      <div className="flex min-w-max border-b border-gray-700">
        {navLinks.map((link) => (
          <button 
            key={link.path}
            onClick={() => handleNavigate(link.path)}
            className={cn(
              "text-gray-400 font-bold tracking-wide px-4 py-2 relative hover:text-white transition-colors text-xs",
              location.pathname === link.path ? "text-white" : ""
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
  );
};

export default MobileNavigationTabs;
