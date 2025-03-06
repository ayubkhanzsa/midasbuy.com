import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, BellRing, Globe, ChevronDown, Flag, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useResponsive } from "@/hooks/use-mobile";
import { triggerCurrencyChangeEvent } from "@/utils/currencyUtils";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  onLogout: () => void;
}

const countries = [
  { name: "United States", code: "us", region: "North America", currency: "USD" },
  { name: "Canada", code: "ca", region: "North America", currency: "CAD" },
  { name: "Brazil", code: "br", region: "Latin American and the Caribbean", currency: "BRL" },
  { name: "Chile", code: "cl", region: "Latin American and the Caribbean", currency: "CLP" },
  { name: "Colombia", code: "co", region: "Latin American and the Caribbean", currency: "COP" },
  { name: "Mexico", code: "mx", region: "Latin American and the Caribbean", currency: "MXN" },
  { name: "Peru", code: "pe", region: "Latin American and the Caribbean", currency: "PEN" },
  { name: "France", code: "fr", region: "Europe", currency: "EUR" },
  { name: "Germany", code: "de", region: "Europe", currency: "EUR" },
  { name: "Italy", code: "it", region: "Europe", currency: "EUR" },
  { name: "Spain", code: "es", region: "Europe", currency: "EUR" },
  { name: "United Kingdom", code: "gb", region: "Europe", currency: "GBP" },
  { name: "Slovenia", code: "si", region: "Europe", currency: "EUR" },
  { name: "Slovakia", code: "sk", region: "Europe", currency: "EUR" },
  { name: "Türkiye", code: "tr", region: "Europe", currency: "TRY" },
  { name: "Ukraine", code: "ua", region: "Europe", currency: "UAH" },
  { name: "Russia", code: "ru", region: "Europe", currency: "RUB" },
  { name: "Poland", code: "pl", region: "Europe", currency: "PLN" },
  { name: "Switzerland", code: "ch", region: "Europe", currency: "CHF" },
  { name: "Sweden", code: "se", region: "Europe", currency: "SEK" },
  { name: "Norway", code: "no", region: "Europe", currency: "NOK" },
  { name: "Japan", code: "jp", region: "Asia and Oceania", currency: "JPY" },
  { name: "China", code: "cn", region: "Asia and Oceania", currency: "CNY" },
  { name: "India", code: "in", region: "Asia and Oceania", currency: "INR" },
  { name: "Australia", code: "au", region: "Asia and Oceania", currency: "AUD" },
  { name: "Armenia", code: "am", region: "Asia and Oceania", currency: "AMD" },
  { name: "Bangladesh", code: "bd", region: "Asia and Oceania", currency: "BDT" },
  { name: "Bhutan", code: "bt", region: "Asia and Oceania", currency: "BTN" },
  { name: "Cambodia", code: "kh", region: "Asia and Oceania", currency: "KHR" },
  { name: "Hong Kong", code: "hk", region: "Asia and Oceania", currency: "HKD" },
  { name: "Indonesia", code: "id", region: "Asia and Oceania", currency: "IDR" },
  { name: "Kazakhstan", code: "kz", region: "Asia and Oceania", currency: "KZT" },
  { name: "Kyrgyzstan", code: "kg", region: "Asia and Oceania", currency: "KGS" },
  { name: "Laos", code: "la", region: "Asia and Oceania", currency: "LAK" },
  { name: "Malaysia", code: "my", region: "Asia and Oceania", currency: "MYR" },
  { name: "Myanmar (Burma)", code: "mm", region: "Asia and Oceania", currency: "MMK" },
  { name: "Macao", code: "mo", region: "Asia and Oceania", currency: "MOP" },
  { name: "Mongolia", code: "mn", region: "Asia and Oceania", currency: "MNT" },
  { name: "Maldives", code: "mv", region: "Asia and Oceania", currency: "MVR" },
  { name: "New Zealand", code: "nz", region: "Asia and Oceania", currency: "NZD" },
  { name: "Pakistan", code: "pk", region: "Asia and Oceania", currency: "PKR" },
  { name: "Philippines", code: "ph", region: "Asia and Oceania", currency: "PHP" },
  { name: "Singapore", code: "sg", region: "Asia and Oceania", currency: "SGD" },
  { name: "South Korea", code: "kr", region: "Asia and Oceania", currency: "KRW" },
  { name: "Sri Lanka", code: "lk", region: "Asia and Oceania", currency: "LKR" },
  { name: "Taiwan", code: "tw", region: "Asia and Oceania", currency: "TWD" },
  { name: "Thailand", code: "th", region: "Asia and Oceania", currency: "THB" },
  { name: "Vietnam", code: "vn", region: "Asia and Oceania", currency: "VND" },
  { name: "Egypt", code: "eg", region: "Africa and Middle East", currency: "EGP" },
  { name: "Israel", code: "il", region: "Africa and Middle East", currency: "ILS" },
  { name: "Saudi Arabia", code: "sa", region: "Africa and Middle East", currency: "SAR" },
  { name: "United Arab Emirates", code: "ae", region: "Africa and Middle East", currency: "AED" },
  { name: "South Africa", code: "za", region: "Africa and Middle East", currency: "ZAR" },
  { name: "Nigeria", code: "ng", region: "Africa and Middle East", currency: "NGN" },
];

export type Country = typeof countries[0];

const Header = ({ onLogout }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
  const [currentCountry, setCurrentCountry] = useState<Country>({ 
    name: "United States", 
    code: "us", 
    region: "North America", 
    currency: "USD" 
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const countryMenuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const { isMobile, isTablet } = useResponsive();
  
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
      
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedCountry', JSON.stringify(currentCountry));
    triggerCurrencyChangeEvent(currentCountry.currency);
    const event = new CustomEvent('countryChanged');
    window.dispatchEvent(event);
    const storageEvent = new StorageEvent('storage', {
      key: 'selectedCountry',
      newValue: JSON.stringify(currentCountry)
    });
    window.dispatchEvent(storageEvent);
  }, [currentCountry]);

  useEffect(() => {
    const savedCountry = localStorage.getItem('selectedCountry');
    if (savedCountry) {
      try {
        setCurrentCountry(JSON.parse(savedCountry));
      } catch (error) {
        console.error('Error parsing saved country:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCountries(countries);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = countries.filter(country => 
        country.name.toLowerCase().includes(query) || 
        country.region.toLowerCase().includes(query) ||
        country.currency.toLowerCase().includes(query)
      );
      setFilteredCountries(filtered);
    }
  }, [searchQuery]);

  useEffect(() => {
    const notificationTimer = setTimeout(() => {
      if (!isNotificationOpen) {
        setHasNotifications(true);
        // Uncomment the line below to show toast notifications when enabled
        // toast({ title: "New notification", description: "You have a new game update available!" });
      }
    }, 30000); // Every 30 seconds for demo purposes
    
    return () => clearTimeout(notificationTimer);
  }, [isNotificationOpen]);

  const groupedCountries = filteredCountries.reduce((acc, country) => {
    if (!acc[country.region]) {
      acc[country.region] = [];
    }
    acc[country.region].push(country);
    return acc;
  }, {} as Record<string, typeof countries>);

  const handleSelectCountry = (country: Country) => {
    setCurrentCountry(country);
    setIsCountryMenuOpen(false);
    setSearchQuery("");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };
  
  const handleBellClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setHasNotifications(false);
  };

  const renderNotificationsMenu = () => (
    <div className="absolute right-0 mt-2 w-72 bg-midasbuy-navy border border-gray-700 rounded-md shadow-lg z-50 overflow-hidden">
      <div className="max-h-[70vh] overflow-y-auto">
        <div className="sticky top-0 z-10 bg-midasbuy-navy border-b border-gray-700 p-3">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-white font-bold">NOTIFICATIONS</h3>
            <button 
              onClick={() => setIsNotificationOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-3">
          <div className="mb-3 p-3 bg-midasbuy-blue/10 rounded-md border border-midasbuy-blue/20">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-midasbuy-blue/20 p-2 rounded-md">
                <BellRing className="w-5 h-5 text-midasbuy-blue" />
              </div>
              <div className="ml-3">
                <p className="text-white text-sm font-medium">New Season Update!</p>
                <p className="text-gray-400 text-xs mt-1">Check out the latest PUBG Mobile season update with new rewards and challenges.</p>
                <span className="text-gray-500 text-xs mt-2 block">2 hours ago</span>
              </div>
            </div>
          </div>
          
          <div className="mb-3 p-3 bg-gray-800/40 rounded-md border border-gray-700">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-gray-700 p-2 rounded-md">
                <BellRing className="w-5 h-5 text-gray-400" />
              </div>
              <div className="ml-3">
                <p className="text-white text-sm font-medium">Special Discount</p>
                <p className="text-gray-400 text-xs mt-1">Get 20% off on your next UC purchase. Limited time offer!</p>
                <span className="text-gray-500 text-xs mt-2 block">Yesterday</span>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-gray-800/40 rounded-md border border-gray-700">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-gray-700 p-2 rounded-md">
                <BellRing className="w-5 h-5 text-gray-400" />
              </div>
              <div className="ml-3">
                <p className="text-white text-sm font-medium">Account Security</p>
                <p className="text-gray-400 text-xs mt-1">We've updated our security policies. Please review them.</p>
                <span className="text-gray-500 text-xs mt-2 block">3 days ago</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="sticky bottom-0 bg-midasbuy-navy border-t border-gray-700 p-3">
          <button 
            className="w-full bg-midasbuy-blue text-white py-2 rounded-md"
            onClick={() => setIsNotificationOpen(false)}
          >
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );

  const renderCountryMenu = () => (
    <div className="absolute right-0 mt-2 w-72 bg-midasbuy-navy border border-gray-700 rounded-md shadow-lg z-50 overflow-hidden">
      <div className="max-h-[70vh] overflow-y-auto">
        <div className="sticky top-0 z-10 bg-midasbuy-navy border-b border-gray-700 p-3">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white font-bold">COUNTRY/REGION</h3>
            <button 
              onClick={() => setIsCountryMenuOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="relative">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search countries..."
              className="w-full bg-midasbuy-darkBlue/70 text-white border border-gray-700 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:border-midasbuy-blue"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
        
        <div className="p-2">
          {Object.entries(groupedCountries).map(([region, countries]) => (
            <div key={region} className="mb-4">
              <h4 className="text-gray-400 text-sm font-medium mb-2 px-2">{region}</h4>
              <div className="grid grid-cols-1 gap-1">
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
                    <span className="flex-1">{country.name}</span>
                    <span className="text-xs opacity-70">{country.currency}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
          
          {filteredCountries.length === 0 && (
            <div className="text-center py-4 text-gray-400">
              No countries found matching "{searchQuery}"
            </div>
          )}
        </div>
        
        <div className="sticky bottom-0 bg-midasbuy-navy border-t border-gray-700 p-3">
          <button 
            className="w-full bg-midasbuy-blue text-white py-2 rounded-md"
            onClick={() => setIsCountryMenuOpen(false)}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-midasbuy-navy/90 backdrop-blur-md shadow-lg" : "bg-transparent",
        !isMobile ? "desktop-header" : "mobile-header"
      )}
    >
      {!isMobile && (
        <>
          <div className="desktop-header-banner"></div>
          <div className="desktop-header-overlay"></div>
        </>
      )}
      
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
              <span className="text-xs ml-1 text-midasbuy-gold">{currentCountry.currency}</span>
              <ChevronDown className="w-3 h-3 ml-1" />
            </button>
            
            {isCountryMenuOpen && renderCountryMenu()}
          </div>
          
          <div className="relative" ref={notificationRef}>
            <button 
              className="relative p-1.5 bg-midasbuy-blue/5 hover:bg-midasbuy-blue/10 rounded-full text-gray-300 hover:text-white transition-colors"
              onClick={handleBellClick}
            >
              <BellRing className="w-4 h-4" />
              {hasNotifications && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </button>
            
            {isNotificationOpen && renderNotificationsMenu()}
          </div>
          
          <button 
            onClick={onLogout} 
            className="text-white text-xs px-4 py-1.5 rounded-md transition-all"
          >
            Sign Out
          </button>
        </div>

        <div className="md:hidden flex items-center space-x-3">
          <div className="relative" ref={notificationRef}>
            <button 
              className="relative p-1 bg-midasbuy-blue/5 hover:bg-midasbuy-blue/10 rounded-full text-gray-300 hover:text-white transition-colors"
              onClick={handleBellClick}
              aria-label="Notifications"
            >
              <BellRing className="w-4 h-4" />
              {hasNotifications && (
                <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </button>
            
            {isNotificationOpen && renderNotificationsMenu()}
          </div>
          
          <div className="relative" ref={countryMenuRef}>
            <button 
              className="flex items-center text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsCountryMenuOpen(!isCountryMenuOpen)}
              aria-label="Select Country"
            >
              <img 
                src={`https://flagcdn.com/w20/${currentCountry.code}.png`} 
                alt={currentCountry.name} 
                className="w-4 h-3" 
              />
              <span className="text-xs ml-1 text-midasbuy-gold">{currentCountry.currency}</span>
              <ChevronDown className="w-3 h-3 ml-1" />
            </button>
            
            {isCountryMenuOpen && renderCountryMenu()}
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
    </header>
  );
};

export default Header;
