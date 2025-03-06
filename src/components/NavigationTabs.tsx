
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const NavigationTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navLinks = [
    { name: "PURCHASE", path: "/" },
    { name: "REDEEM", path: "/redeem" },
    { name: "SHOP", path: "/shop" },
    { name: "EVENTS", path: "/events" },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="mb-6 overflow-x-auto pb-1 mt-6 hidden md:block">
      <div className="flex min-w-max border-b border-gray-700">
        {navLinks.map((link) => (
          <button 
            key={link.path}
            onClick={() => handleNavigate(link.path)}
            className={cn(
              "text-gray-400 font-bold tracking-wide px-6 py-3 relative hover:text-white transition-colors text-sm",
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

export default NavigationTabs;
