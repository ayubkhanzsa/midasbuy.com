
import { useNavigate } from "react-router-dom";

const NavigationTabs = () => {
  const navigate = useNavigate();
  
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
    <div className="mb-6 overflow-x-auto">
      <div className="flex min-w-max border-b border-gray-700">
        {navLinks.map((link) => (
          <button 
            key={link.path}
            onClick={() => handleNavigate(link.path)}
            className={`text-${link.path === '/' ? 'white' : 'gray-400'} font-bold px-4 sm:px-6 py-3 relative hover:text-gray-200 transition-colors text-sm`}
          >
            {link.name}
            {link.path === '/' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavigationTabs;
