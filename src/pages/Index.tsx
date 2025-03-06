
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { ucPackages, getSelectedCountry } from "@/data/ucPackages";
import { useResponsive } from "@/hooks/use-mobile";
import NavigationTabs from "@/components/NavigationTabs";
import PrivacyPolicyModal from "@/components/PrivacyPolicyModal";
import LoadingScreen from "@/components/LoadingScreen";
import PromotionBanner from "@/components/PromotionBanner";
import PackageGrid from "@/components/PackageGrid";
import FilterBar from "@/components/FilterBar";
import Footer from "@/components/Footer";
import { ChevronDown } from "lucide-react";

interface IndexProps {
  onLogout: () => void;
}

const Index = ({ onLogout }: IndexProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showPromotion, setShowPromotion] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(getSelectedCountry());
  const { isMobile, isTablet, isDesktop } = useResponsive();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'selectedCountry' && e.newValue) {
        try {
          setSelectedCountry(JSON.parse(e.newValue));
        } catch (error) {
          console.error('Error parsing country from storage event:', error);
        }
      }
    };

    const handleCountryChanged = () => {
      setSelectedCountry(getSelectedCountry());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('countryChanged', handleCountryChanged);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('countryChanged', handleCountryChanged);
    };
  }, []);

  useEffect(() => {
    const storedCountry = getSelectedCountry();
    if (JSON.stringify(storedCountry) !== JSON.stringify(selectedCountry)) {
      setSelectedCountry(storedCountry);
    }
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const filteredPackages = filter === "all" 
    ? ucPackages 
    : ucPackages.filter(pkg => {
        if (filter === "small" && pkg.baseAmount <= 600) return true;
        if (filter === "medium" && pkg.baseAmount > 600 && pkg.baseAmount <= 6000) return true;
        if (filter === "large" && pkg.baseAmount > 6000) return true;
        return false;
      });

  return (
    <div className="min-h-screen bg-midasbuy-darkBlue overflow-x-hidden relative">
      <Header onLogout={onLogout} />
      
      <main className="pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start mb-6 pt-10 relative">
            <div className="flex-grow">
              <div className="flex items-center mb-4 mt-2">
                <img 
                  src="/lovable-uploads/072f88f4-7402-4591-b3e4-11f57bb0e9ea.png" 
                  alt="PUBG Mobile" 
                  className="w-[40px] mr-3 rounded-md"
                />
                <h1 className="text-3xl md:text-4xl text-white font-bold tracking-wide">PUBG MOBILE</h1>
              </div>
              
              <div className="flex items-center space-x-2 mb-4">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-midasbuy-darkBlue border border-gray-700 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Official
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-midasbuy-darkBlue border border-gray-700 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.44 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Subscribed
                </span>
              </div>
              
              <div className="mt-2 mb-8">
                <button className="bg-blue-500 text-white rounded-md py-2.5 px-4 flex items-center text-sm hover:bg-blue-600 transition-colors">
                  <span>Enter Your Player ID Now</span>
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          <NavigationTabs />
          
          {showPromotion && <PromotionBanner onClose={() => setShowPromotion(false)} />}
          
          <FilterBar onFilterChange={setFilter} />
          
          <div className="mb-4">
            <button className="inline-flex items-center px-4 py-2 rounded-full bg-midasbuy-blue/10 text-midasbuy-blue text-sm hover:bg-midasbuy-blue/20 transition-colors">
              <span>Try filtering to find product faster!</span>
            </button>
          </div>
          
          <PackageGrid packages={filteredPackages} selectedCountry={selectedCountry} />
        </div>
      </main>
      
      <Footer />
      
      {showPrivacyPolicy && <PrivacyPolicyModal onClose={() => setShowPrivacyPolicy(false)} />}
    </div>
  );
};

export default Index;
