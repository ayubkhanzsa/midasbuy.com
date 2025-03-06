
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { honorOfKingsPackages } from "@/data/honorOfKingsPackages";
import { getSelectedCountry } from "@/data/ucPackages";
import { useMobile, useResponsive } from "@/hooks/use-mobile";
import NavigationTabs from "@/components/NavigationTabs";
import MobileNavigationTabs from "@/components/MobileNavigationTabs";
import HonorOfKingsPackageGrid from "@/components/HonorOfKingsPackageGrid";
import FilterBar from "@/components/FilterBar";
import Footer from "@/components/Footer";
import { ArrowRight, Download, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import FeatureBoxesCarousel from "@/components/FeatureBoxesCarousel";

interface HonorOfKingsPageProps {
  onLogout: () => void;
}

const HonorOfKingsPage = ({ onLogout }: HonorOfKingsPageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState(getSelectedCountry());
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const bannerImg = new Image();
    bannerImg.src = "/lovable-uploads/ec01c36c-6925-4ab3-8d01-c1ef4b766ce9.png";
    bannerImg.onload = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    };
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

  const handleSubscribeClick = () => {
    toast({
      title: "Subscribe to Honor of Kings",
      description: "Sign up to receive updates and exclusive offers!",
      action: (
        <Button 
          variant="default" 
          size="sm" 
          onClick={() => window.open("mailto:signup@honorofkings.com", "_blank")}
        >
          Sign Up
        </Button>
      ),
    });
  };

  const handlePlayerIdClick = () => {
    toast({
      title: "Honor of Kings Player ID",
      description: "This feature will be available soon!",
    });
  };

  const handleDownloadClick = () => {
    toast({
      title: "Download Honor of Kings",
      description: "Download link will be available soon!",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-midasbuy-darkBlue">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-midasbuy-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-400 animate-pulse">Loading Honor of Kings...</p>
        </div>
      </div>
    );
  }

  const filteredPackages = filter === "all" 
    ? honorOfKingsPackages 
    : honorOfKingsPackages.filter(pkg => {
        if (filter === "small" && pkg.baseAmount <= 80) return true;
        if (filter === "medium" && pkg.baseAmount > 80 && pkg.baseAmount <= 800) return true;
        if (filter === "large" && pkg.baseAmount > 800) return true;
        return false;
      });

  return (
    <div className="min-h-screen bg-midasbuy-darkBlue overflow-x-hidden relative">
      {/* Apply mobile header styling to all device sizes */}
      <div className="mobile-header-banner"></div>
      <div className="mobile-header-overlay"></div>
      
      <div className="mobile-header">
        <Header onLogout={onLogout} />
      </div>
      
      <main className="pt-20 pb-20 relative mobile-content mobile-main-container z-10">
        <div className="container mx-auto px-4 mobile-main-container">
          <div className="flex flex-col md:flex-row items-start mb-6 relative">
            <div className="flex-grow z-10 md:ml-8 md:mt-2">
              {/* Honor of Kings Title with Logo */}
              <div className="flex items-center mb-2">
                <img 
                  src="/lovable-uploads/ca9555b1-e949-4084-8def-830689dfcfab.png" 
                  alt="Honor of Kings Logo" 
                  className={`w-[85px] h-[85px] mr-3 rounded-md sm:w-[100px] sm:h-[100px]`}
                />
                <div>
                  <div className="flex items-center">
                    <h1 className="text-2xl md:text-3xl text-white font-bold tracking-wide mobile-pubg-title">HONOR OF KINGS</h1>
                    <div className="ml-3 flex space-x-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white text-black">
                        <Check className="h-3 w-3 mr-1" />
                        Official
                      </span>
                      <span 
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm text-white cursor-pointer hover:bg-white/20 transition-colors"
                        onClick={handleSubscribeClick}
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Subscribed
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex space-x-2">
                    <button 
                      className="bg-gradient-to-r from-midasbuy-blue to-midasbuy-blue/90 text-white font-medium rounded-md px-5 py-1 text-sm hover:from-midasbuy-blue/90 hover:to-midasbuy-blue transition-all shadow-lg flex items-center gap-2 border border-midasbuy-blue/30"
                      onClick={handlePlayerIdClick}
                    >
                      <span className="font-semibold">Enter Your Player ID</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    
                    <button 
                      className="bg-gradient-to-r from-green-600 to-green-500 text-white font-medium rounded-md px-5 py-1 text-sm hover:from-green-500 hover:to-green-600 transition-all shadow-lg flex items-center gap-2 border border-green-500/30"
                      onClick={handleDownloadClick}
                    >
                      <span className="font-semibold">Download Game</span>
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <NavigationTabs />
          <MobileNavigationTabs />
          
          <FilterBar onFilterChange={setFilter} />
          
          <div className="mb-4">
            <button className="inline-flex items-center px-4 py-2 rounded-full bg-midasbuy-blue/10 text-midasbuy-blue text-sm hover:bg-midasbuy-blue/20 transition-colors">
              <span>Try filtering to find product faster!</span>
            </button>
          </div>
          
          <HonorOfKingsPackageGrid packages={filteredPackages} selectedCountry={selectedCountry} />
          
          <div className="mt-8 mb-8">
            <FeatureBoxesCarousel showHeading={false} />
          </div>
          
          <div className="mt-8 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-xl p-6 border border-blue-500/20">
            <h2 className="text-2xl font-bold text-white mb-4">Honor of Kings Global Launch!</h2>
            <p className="text-gray-200 mb-6">Enjoy extra 100% bonus on your first purchase only at Midasbuy! Limited time offer.</p>
            <div className="flex justify-end">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Get Bonus Now
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HonorOfKingsPage;
