import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Bell, Globe, ChevronDown, Flag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onLogout: () => void;
}

const countries = [
  { name: "United States", code: "us", region: "North America" },
  { name: "Canada", code: "ca", region: "North America" },
  { name: "Brazil", code: "br", region: "Latin American and the Caribbean" },
  { name: "Chile", code: "cl", region: "Latin American and the Caribbean" },
  { name: "Colombia", code: "co", region: "Latin American and the Caribbean" },
  { name: "Mexico", code: "mx", region: "Latin American and the Caribbean" },
  { name: "Peru", code: "pe", region: "Latin American and the Caribbean" },
  { name: "Slovenia", code: "si", region: "Europe" },
  { name: "Slovakia", code: "sk", region: "Europe" },
  { name: "Türkiye", code: "tr", region: "Europe" },
  { name: "Ukraine", code: "ua", region: "Europe" },
  { name: "Australia", code: "au", region: "Asia and Oceania" },
  { name: "Armenia", code: "am", region: "Asia and Oceania" },
  { name: "Bangladesh", code: "bd", region: "Asia and Oceania" },
  { name: "Bhutan", code: "bt", region: "Asia and Oceania" },
  { name: "Cambodia", code: "kh", region: "Asia and Oceania" },
  { name: "Hong Kong", code: "hk", region: "Asia and Oceania" },
  { name: "Indonesia", code: "id", region: "Asia and Oceania" },
  { name: "Kazakhstan", code: "kz", region: "Asia and Oceania" },
  { name: "Kyrgyzstan", code: "kg", region: "Asia and Oceania" },
  { name: "Laos", code: "la", region: "Asia and Oceania" },
  { name: "Malaysia", code: "my", region: "Asia and Oceania" },
  { name: "Myanmar (Burma)", code: "mm", region: "Asia and Oceania" },
  { name: "Macao", code: "mo", region: "Asia and Oceania" },
  { name: "Mongolia", code: "mn", region: "Asia and Oceania" },
  { name: "Maldives", code: "mv", region: "Asia and Oceania" },
  { name: "New Zealand", code: "nz", region: "Asia and Oceania" },
  { name: "Pakistan", code: "pk", region: "Asia and Oceania" },
  { name: "Philippines", code: "ph", region: "Asia and Oceania" },
  { name: "Singapore", code: "sg", region: "Asia and Oceania" },
  { name: "South Korea", code: "kr", region: "Asia and Oceania" },
  { name: "Sri Lanka", code: "lk", region: "Asia and Oceania" },
  { name: "Taiwan", code: "tw", region: "Asia and Oceania" },
  { name: "Thailand", code: "th", region: "Asia and Oceania" },
  { name: "Vietnam", code: "vn", region: "Asia and Oceania" },
];

const Header = ({ onLogout }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
  const [currentCountry, setCurrentCountry] = useState({ name: "United States", code: "us" });
  const location = useLocation();
  const navigate = useNavigate();
  const countryMenuRef = useRef<HTMLDivElement>(null);
  
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryMenuRef.current && !countryMenuRef.current.contains(event.target as Node)) {
        setIsCountryMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const groupedCountries = countries.reduce((acc, country) => {
    if (!acc[country.region]) {
      acc[country.region] = [];
    }
    acc[country.region].push(country);
    return acc;
  }, {} as Record<string, typeof countries>);

  const handleSelectCountry = (country: { name: string; code: string }) => {
    setCurrentCountry(country);
    setIsCountryMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-midasbuy-navy/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      )}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 overflow-hidden" 
        style={{ 
          backgroundImage: `url('/lovable-uploads/6e96cbf9-67f4-4b17-92e7-f5819b7f68db.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          height: '100%',
          width: '100%'
        }}
      ></div>
      
      <div className="container mx-auto px-4 py-2 flex items-center justify-between relative z-10">
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            <img src="/lovable-uploads/c6fd77e7-3682-428e-8154-140308b4a06b.png" alt="Logo" className="h-6" />
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-3">
          <div className="relative" ref={countryMenuRef}>
            <button 
              className="flex items-center text-gray-300 hover:text-white transition-colors text-xs px-2 py-1"
              onClick={() => setIsCountryMenuOpen(!isCountryMenuOpen)}
            >
              <img 
                src={`https://flagcdn.com/w20/${currentCountry.code}.png`} 
                alt={currentCountry.name} 
                className="w-4 h-3 mr-1" 
              />
              <span className="hidden sm:inline">{currentCountry.name}</span>
              <ChevronDown className="w-3 h-3 ml-1" />
            </button>
            
            {isCountryMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-midasbuy-navy border border-gray-700 rounded-md shadow-lg z-50 overflow-hidden">
                <div className="max-h-96 overflow-y-auto p-2">
                  <div className="flex justify-between items-center mb-3 p-2 border-b border-gray-700">
                    <h3 className="text-white font-bold">COUNTRY/REGION</h3>
                    <button 
                      onClick={() => setIsCountryMenuOpen(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {Object.entries(groupedCountries).map(([region, countries]) => (
                    <div key={region} className="mb-4">
                      <h4 className="text-gray-400 text-sm font-medium mb-2">{region}</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {countries.map((country) => (
                          <button
                            key={country.code}
                            className={cn(
                              "flex items-center p-2 rounded-md text-left",
                              currentCountry.code === country.code 
                                ? "bg-midasbuy-blue text-white" 
                                : "text-gray-300 hover:bg-gray-700/40"
                            )}
                            onClick={() => handleSelectCountry(country)}
                          >
                            <img 
                              src={`https://flagcdn.com/w20/${country.code}.png`} 
                              alt={country.name} 
                              className="w-5 h-4 mr-2" 
                            />
                            <span>{country.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-2 pt-2 border-t border-gray-700">
                    <button 
                      className="w-full bg-midasbuy-blue text-white py-2 rounded-md"
                      onClick={() => setIsCountryMenuOpen(false)}
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <button className="relative p-1 text-gray-300 hover:text-white transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button 
            onClick={onLogout} 
            className="btn-outline text-xs px-3 py-1"
          >
            Sign Out
          </button>
        </div>

        <div className="md:hidden flex items-center space-x-3">
          <button className="relative p-1 text-gray-300 hover:text-white transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="relative" ref={countryMenuRef}>
            <button 
              className="flex items-center text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsCountryMenuOpen(!isCountryMenuOpen)}
            >
              <img 
                src={`https://flagcdn.com/w20/${currentCountry.code}.png`} 
                alt={currentCountry.name} 
                className="w-4 h-3" 
              />
            </button>
            
            {isCountryMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-midasbuy-navy border border-gray-700 rounded-md shadow-lg z-50 overflow-hidden">
                <div className="max-h-96 overflow-y-auto p-2">
                  <div className="flex justify-between items-center mb-3 p-2 border-b border-gray-700">
                    <h3 className="text-white font-bold">COUNTRY/REGION</h3>
                    <button 
                      onClick={() => setIsCountryMenuOpen(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {Object.entries(groupedCountries).map(([region, countries]) => (
                    <div key={region} className="mb-4">
                      <h4 className="text-gray-400 text-sm font-medium mb-2">{region}</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {countries.map((country) => (
                          <button
                            key={country.code}
                            className={cn(
                              "flex items-center p-2 rounded-md text-left",
                              currentCountry.code === country.code 
                                ? "bg-midasbuy-blue text-white" 
                                : "text-gray-300 hover:bg-gray-700/40"
                            )}
                            onClick={() => handleSelectCountry(country)}
                          >
                            <img 
                              src={`https://flagcdn.com/w20/${country.code}.png`} 
                              alt={country.name} 
                              className="w-5 h-4 mr-2" 
                            />
                            <span>{country.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-2 pt-2 border-t border-gray-700">
                    <button 
                      className="w-full bg-midasbuy-blue text-white py-2 rounded-md"
                      onClick={() => setIsCountryMenuOpen(false)}
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <button 
            className="text-gray-300 hover:text-white" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

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
