
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const MobileNavigationTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
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

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path === "/pubg-mobile" && location.pathname === "/pubg-mobile") return true;
    if (path === "/redeem" && location.pathname === "/purchase-history") return true;
    if (path === "/events" && location.pathname === "/events") return true;
    return false;
  };

  return (
    <div className="mb-4 overflow-x-auto pb-1 mt-4 md:hidden">
      <div className="flex min-w-max border-b border-gray-700">
        {navLinks.map((link) => (
          <button 
            key={link.path}
            onClick={() => handleNavigate(link.path)}
            className={cn(
              "text-gray-400 font-bold tracking-wide px-4 py-2 relative hover:text-white transition-colors text-xs",
              isActive(link.path) ? "text-white" : ""
            )}
          >
            {link.name}
            {isActive(link.path) && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-midasbuy-blue"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigationTabs;
