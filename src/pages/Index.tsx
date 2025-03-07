import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { ucPackages, getSelectedCountry } from "@/data/ucPackages";
import { useMobile, useResponsive } from "@/hooks/use-mobile";
import NavigationTabs from "@/components/NavigationTabs";
import MobileNavigationTabs from "@/components/MobileNavigationTabs";
import PrivacyPolicyModal from "@/components/PrivacyPolicyModal";
import LoadingScreen from "@/components/LoadingScreen";
import PromotionBanner from "@/components/PromotionBanner";
import PackageGrid from "@/components/PackageGrid";
import FilterBar from "@/components/FilterBar";
import Footer from "@/components/Footer";
import { ChevronDown, ArrowRight, User, HelpCircle, X, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

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
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [showPlayerIdModal, setShowPlayerIdModal] = useState(false);
  const [tempPlayerID, setTempPlayerID] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [packageSelectionPrompt, setPackageSelectionPrompt] = useState(false);
  const [scrollToPackages, setScrollToPackages] = useState(false);
  const packagesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const imagesToPreload = [
      '/lovable-uploads/28985189-d7e6-4b78-b392-1c1c9fcaff88.png',
      '/lovable-uploads/072f88f4-7402-4591-b3e4-11f57bb0e9ea.png',
      '/lovable-uploads/c6fd77e7-3682-428e-8154-140308b4a06b.png'
    ];

    const preloadImages = async () => {
      const imagePromises = imagesToPreload.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
      } catch (error) {
        console.error('Error preloading images:', error);
      }
    };

    Promise.all([
      preloadImages(),
      new Promise(resolve => setTimeout(resolve, 800))
    ]).then(() => {
      setIsLoading(false);
    });
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

  const handleSubscribeClick = () => {
    toast({
      title: "Subscribe to PUBG Mobile",
      description: "Sign up to receive updates and exclusive offers!",
      action: (
        <Button 
          variant="default" 
          size="sm" 
          onClick={() => window.open("mailto:signup@pubgmobile.com", "_blank")}
        >
          Sign Up
        </Button>
      ),
    });
  };

  const handlePlayerIdClick = () => {
    setTempPlayerID("");
    setShowPlayerIdModal(true);
  };

  const handleVerifyPlayerID = () => {
    if (!tempPlayerID || tempPlayerID.length < 8) {
      toast({
        title: "Invalid Player ID",
        description: "Please enter a valid Player ID",
        variant: "destructive",
      });
      return;
    }

    const savedUsername = localStorage.getItem("pubgUsername");
    if (!savedUsername) {
      toast({
        title: "Username Not Verified",
        description: "Please verify your username in the Events page first",
        variant: "destructive",
      });
      setShowPlayerIdModal(false);
      navigate("/events");
      return;
    }

    setIsVerifying(true);
    
    setTimeout(() => {
      setIsVerifying(false);
      
      localStorage.setItem("playerID", tempPlayerID);
      
      toast({
        title: "Player ID Verified",
        description: "ID verification successful",
      });
      
      setShowPlayerIdModal(false);
      
      setPackageSelectionPrompt(true);
      setScrollToPackages(true);
    }, 1500);
  };

  useEffect(() => {
    if (scrollToPackages && packagesRef.current) {
      packagesRef.current.scrollIntoView({ behavior: 'smooth' });
      setScrollToPackages(false);
    }
  }, [scrollToPackages]);

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
      <div className="corner-light-effect"></div>
      
      {isMobile && (
        <>
          <div className="mobile-header-banner"></div>
          <div className="mobile-header-overlay"></div>
        </>
      )}
      
      <div className={isMobile ? 'mobile-header' : ''}>
        <Header onLogout={onLogout} />
      </div>
      
      <Dialog open={showPlayerIdModal} onOpenChange={setShowPlayerIdModal}>
        <DialogContent className="sm:max-w-md bg-[#121B2E] border-none text-white p-0 overflow-hidden">
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <DialogTitle className="text-lg sm:text-xl font-bold text-white">Enter Your Player ID</DialogTitle>
              <Button 
                variant="ghost" 
                className="h-7 w-7 p-0 text-gray-400 hover:text-white hover:bg-transparent"
                onClick={() => setShowPlayerIdModal(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          
            <div className="py-2">
              <div className="mb-3">
                <div className="bg-[#0099FF] p-2 rounded-t-md text-center text-white text-sm">
                  Please select or fill in your Player ID you want to recharge
                </div>
                <div className="bg-[#1A1F2E] rounded-b-md p-3 border border-[#182238]">
                  <Input
                    value={tempPlayerID}
                    onChange={(e) => setTempPlayerID(e.target.value)}
                    placeholder="Enter Player ID"
                    variant="dark"
                    className="h-10 text-base"
                  />
                </div>
              </div>
              
              <Button 
                className="w-full mb-4"
                variant="blue"
                size="lg"
                onClick={handleVerifyPlayerID}
                disabled={isVerifying || !tempPlayerID}
              >
                {isVerifying ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Verifying...
                  </>
                ) : (
                  "OK"
                )}
              </Button>
              
              <div className="space-y-3">
                <div>
                  <h5 className="text-white font-medium mb-2 flex items-center text-sm">
                    <HelpCircle className="w-4 h-4 mr-1 text-[#0099FF]" />
                    Couldn't find your Player ID?
                  </h5>
                  
                  <div className="ml-5 space-y-3">
                    <div>
                      <p className="text-xs text-gray-300 mb-1">1. Or view your ID in the game lobby</p>
                      <div className="rounded-md overflow-hidden mb-3">
                        <img 
                          src="/lovable-uploads/d8a0389b-81ee-4c91-bd70-8e9e7b0d765b.png" 
                          alt="Finding Player ID in Game Lobby" 
                          className="w-full rounded-md border border-gray-700"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-300 mb-1">2. Find your ID in your profile page</p>
                      <div className="rounded-md overflow-hidden">
                        <img 
                          src="/lovable-uploads/a11f7ec0-260b-4785-89db-c8478d536442.png" 
                          alt="Finding Player ID in Profile Page" 
                          className="w-full rounded-md border border-gray-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <main className={`pt-20 pb-20 relative ${isMobile ? 'mobile-content mobile-main-container' : 'z-10'}`}>
        {!isMobile && (
          <div className="banner-container" style={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
            <img 
              src="/lovable-uploads/28985189-d7e6-4b78-b392-1c1c9fcaff88.png" 
              alt="Banner"
              className="w-full h-auto object-cover"
              style={{ 
                width: '100%', 
                maxWidth: '1440px',
                maxHeight: isDesktop ? '350px' : '300px',
              }}
            />
          </div>
        )}
        
        <div className={`container mx-auto px-4 ${isMobile ? 'mobile-main-container' : ''}`}>
          <div className="flex flex-col md:flex-row items-start mb-6 relative">
            <div className="flex-grow z-10 md:ml-8 md:mt-2">
              <div className="flex items-center mb-2">
                <img 
                  src="/lovable-uploads/072f88f4-7402-4591-b3e4-11f57bb0e9ea.png" 
                  alt="PUBG Mobile" 
                  className={`w-[75px] mr-3 rounded-md ${isMobile ? 'mobile-pubg-icon' : ''}`}
                />
                <div>
                  <div className="flex items-center">
                    <h1 className={`text-2xl md:text-3xl text-white font-bold tracking-wide ${isMobile ? 'mobile-pubg-title' : ''}`}>PUBG MOBILE</h1>
                    <div className="ml-3 flex space-x-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        Official
                      </span>
                      <span 
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm text-white cursor-pointer hover:bg-white/20 transition-colors"
                        onClick={handleSubscribeClick}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.44 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        Subscribed
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <button 
                      className="bg-gradient-to-r from-midasbuy-blue to-midasbuy-blue/90 text-white font-medium rounded-md px-5 py-1.5 text-sm hover:from-midasbuy-blue/90 hover:to-midasbuy-blue transition-all shadow-lg flex items-center gap-2 border border-midasbuy-blue/30"
                      onClick={handlePlayerIdClick}
                    >
                      <span className="font-semibold">Enter Your Player ID</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <NavigationTabs />
          <MobileNavigationTabs />
          
          {showPromotion && <PromotionBanner onClose={() => setShowPromotion(false)} />}
          
          <FilterBar onFilterChange={setFilter} />
          
          <div className="mb-4">
            <button className="inline-flex items-center px-4 py-2 rounded-full bg-midasbuy-blue/10 text-midasbuy-blue text-sm hover:bg-midasbuy-blue/20 transition-colors">
              <span>Try filtering to find product faster!</span>
            </button>
          </div>
          
          {packageSelectionPrompt && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-lg bg-midasbuy-blue/10 border border-midasbuy-blue/30 flex items-start"
            >
              <AlertCircle className="text-midasbuy-blue mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white font-medium mb-1">Player ID verified successfully!</h3>
                <p className="text-gray-300 text-sm">Please select a package below to continue with your purchase.</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-auto text-gray-400 hover:text-white hover:bg-transparent"
                onClick={() => setPackageSelectionPrompt(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
          
          <div ref={packagesRef}>
            <PackageGrid packages={filteredPackages} selectedCountry={selectedCountry} />
          </div>
        </div>
      </main>
      
      <Footer />
      
      {showPrivacyPolicy && <PrivacyPolicyModal onClose={() => setShowPrivacyPolicy(false)} />}
    </div>
  );
};

export default Index;
