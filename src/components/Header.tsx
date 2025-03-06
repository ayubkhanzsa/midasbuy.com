
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, BellRing, Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useResponsive } from "@/hooks/use-mobile";
import { triggerCurrencyChangeEvent } from "@/utils/currencyUtils";
import { useToast } from "@/hooks/use-toast";
import CountrySelector from "./header/CountrySelector";
import NotificationsMenu from "./header/NotificationsMenu";
import MobileNav from "./header/MobileNav";
import { Country } from "./header/types";

interface HeaderProps {
  onLogout: () => void;
}

const Header = ({ onLogout }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentCountry, setCurrentCountry] = useState<Country>({ 
    name: "United States", 
    code: "us", 
    region: "North America", 
    currency: "USD" 
  });
  const [hasNotifications, setHasNotifications] = useState(true);
  
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const { isMobile, isTablet } = useResponsive();

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
          <CountrySelector 
            currentCountry={currentCountry} 
            setCurrentCountry={setCurrentCountry} 
          />
          
          <NotificationsMenu 
            hasNotifications={hasNotifications}
            setHasNotifications={setHasNotifications}
          />
          
          <button 
            onClick={onLogout} 
            className="text-white text-xs px-4 py-1.5 rounded-md transition-all"
          >
            Sign Out
          </button>
        </div>

        <div className="md:hidden flex items-center space-x-3">
          <div className="relative">
            <button 
              className="relative p-1 bg-midasbuy-blue/5 hover:bg-midasbuy-blue/10 rounded-full text-gray-300 hover:text-white transition-colors"
              onClick={() => setHasNotifications(!hasNotifications)}
              aria-label="Notifications"
            >
              <BellRing className="w-4 h-4" />
              {hasNotifications && (
                <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </button>
          </div>
          
          <CountrySelector 
            currentCountry={currentCountry} 
            setCurrentCountry={setCurrentCountry} 
          />
          
          <button 
            className="text-gray-300 hover:text-white" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <Menu className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <MobileNav 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        onLogout={onLogout} 
      />
    </header>
  );
};

export default Header;
