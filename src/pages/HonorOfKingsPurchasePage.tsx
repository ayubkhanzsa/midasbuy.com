import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, AlertCircle, Check, RefreshCw, User, Shield, X, HelpCircle } from "lucide-react";
import Header from "@/components/Header";
import { getPackageById, getSelectedCountry, setupCountryChangeListener } from "@/data/ucPackages";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { convertAndFormatPrice, setupCurrencyChangeListener } from "@/utils/currencyUtils";
import { useResponsive } from "@/hooks/use-mobile";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface HonorOfKingsPurchasePageProps {
  onLogout: () => void;
}

const HonorOfKingsPurchasePage = ({ onLogout }: HonorOfKingsPurchasePageProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [playerID, setPlayerID] = useState("");
  const [isPlayerIDValid, setIsPlayerIDValid] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(getSelectedCountry());
  const [username, setUsername] = useState("");
  const { isMobile, isTablet } = useResponsive();
  const [showPlayerIdModal, setShowPlayerIdModal] = useState(false);
  const [tempPlayerID, setTempPlayerID] = useState("");

  const honorPackage = id ? getPackageById(id) : undefined;

  useEffect(() => {
    if (!honorPackage) {
      navigate("/");
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [honorPackage, navigate]);

  useEffect(() => {
    const savedPlayerID = localStorage.getItem("playerID");
    if (savedPlayerID) {
      setPlayerID(savedPlayerID);
      setIsPlayerIDValid(true);
      
      const savedUsername = localStorage.getItem("pubgUsername");
      if (savedUsername) {
        setUsername(savedUsername);
      }
    }
    
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "pubgUsername") {
        const newUsername = event.newValue;
        if (newUsername !== null) {
          setUsername(newUsername);
        } else {
          setUsername("");
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    const handleCountryChange = () => {
      const newSelectedCountry = getSelectedCountry();
      if (newSelectedCountry.currency !== selectedCountry.currency) {
        setSelectedCountry(newSelectedCountry);
      }
    };

    const storageCleanup = setupCountryChangeListener(handleCountryChange);
    const currencyCleanup = setupCurrencyChangeListener(() => {
      handleCountryChange();
    });

    return () => {
      storageCleanup();
      currencyCleanup();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleVerifyPlayerID = () => {
    if (!tempPlayerID || tempPlayerID.length < 8) {
      toast({
        title: "Invalid Player ID",
        description: "Please enter a valid Player ID",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);

    const savedUsername = localStorage.getItem("pubgUsername");
    
    setTimeout(() => {
      setIsVerifying(false);
      setIsPlayerIDValid(true);
      setPlayerID(tempPlayerID);
      
      toast({
        title: "Player ID Verified",
        description: "ID verification successful",
      });
      
      localStorage.setItem("playerID", tempPlayerID);
      
      if (savedUsername) {
        setUsername(savedUsername);
      } else {
        const placeholderUsername = `Player_${tempPlayerID.substring(0, 4)}`;
        localStorage.setItem("pubgUsername", placeholderUsername);
        setUsername(placeholderUsername);
      }
      
      setShowPlayerIdModal(false);
    }, 1500);
  };

  const handleResetPlayerID = () => {
    setPlayerID("");
    setIsPlayerIDValid(false);
    setUsername("");
    localStorage.removeItem("playerID");
    localStorage.removeItem("pubgUsername");
    
    toast({
      title: "Player ID Reset",
      description: "Please enter a new Player ID",
    });
    
    setShowPlayerIdModal(true);
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleProceedToCheckout = () => {
    if (!isPlayerIDValid) {
      toast({
        title: "Player ID Required",
        description: "Please verify your Player ID before proceeding",
        variant: "destructive",
      });
      setShowPlayerIdModal(true);
      return;
    }

    if (id) {
      navigate(`/checkout/${id}`);
    }
  };
  
  const openPlayerIdModal = () => {
    setTempPlayerID("");
    setShowPlayerIdModal(true);
  };

  if (isLoading || !honorPackage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-midasbuy-darkBlue">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-midasbuy-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-400 animate-pulse">Loading package details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midasbuy-darkBlue overflow-x-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 w-full h-[50vh] bg-hero-pattern bg-cover bg-center opacity-20 z-0"></div>
      </div>
      
      <Header onLogout={onLogout} />
      
      <AnimatePresence>
        <Dialog open={showPlayerIdModal} onOpenChange={setShowPlayerIdModal}>
          <DialogContent className="sm:max-w-md bg-[#121B2E] border-none text-white p-0 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <DialogTitle className="text-2xl font-bold text-white">Enter Your Player ID Now</DialogTitle>
                <Button 
                  variant="ghost" 
                  className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-transparent"
                  onClick={() => setShowPlayerIdModal(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            
              <div className="py-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xl font-medium text-white">Player ID</h4>
                  <Button 
                    variant="ghost" 
                    className="flex items-center text-blue-400 hover:text-blue-300 p-0 hover:bg-transparent"
                  >
                    <HelpCircle className="w-5 h-5 mr-1" />
                    <span>Couldn't find your Player ID?</span>
                  </Button>
                </div>
                
                <div className="mb-5">
                  <div className="bg-[#0099FF]/10 p-4 rounded-t-md">
                    <p className="text-white">Start by entering your Game player ID to ensure a smooth purchase!</p>
                  </div>
                  <div className="bg-[#1A1F2E] rounded-b-md p-4 border border-[#182238]">
                    <Input
                      value={tempPlayerID}
                      onChange={(e) => setTempPlayerID(e.target.value)}
                      placeholder="Enter Player ID"
                      variant="dark"
                      className="h-12 text-lg"
                    />
                  </div>
                </div>
                
                <Button 
                  className="w-full mb-8"
                  variant="blue"
                  size="xl"
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
                
                <div className="space-y-5">
                  <div>
                    <h5 className="text-white font-medium mb-3 flex items-center">
                      <HelpCircle className="w-5 h-5 mr-2 text-[#0099FF]" />
                      Couldn't find your Player ID?
                    </h5>
                    
                    <div className="ml-7 space-y-4">
                      <div>
                        <p className="text-sm text-gray-300 mb-2">1. Find your ID in your profile page</p>
                        <div className="rounded-md overflow-hidden mb-4">
                          <img 
                            src="/lovable-uploads/a11f7ec0-260b-4785-89db-c8478d536442.png" 
                            alt="Finding Player ID in Profile Page" 
                            className="w-full rounded-md border border-gray-700"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-300 mb-2">2. Or view your ID in the game lobby</p>
                        <div className="rounded-md overflow-hidden">
                          <img 
                            src="/lovable-uploads/d8a0389b-81ee-4c91-bd70-8e9e7b0d765b.png" 
                            alt="Finding Player ID in Game Lobby" 
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
      </AnimatePresence>
      
      <main className="pt-20 pb-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <button 
              onClick={handleBackToHome}
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span>Back to Packages</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-effect rounded-xl p-6 mb-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <User className="w-5 h-5 mr-2 text-midasbuy-blue" />
                    Player Information
                  </h2>
                  <div className="bg-midasbuy-navy/50 px-3 py-1 rounded-full text-xs text-gray-300 flex items-center">
                    <Shield className="w-3 h-3 mr-1 text-midasbuy-blue" />
                    Secure Verification
                  </div>
                </div>
                
                {isPlayerIDValid ? (
                  <div>
                    <div className="flex flex-col items-start">
                      <div className="flex items-center mb-6 w-full justify-start">
                        <div className="bg-gradient-to-r from-[#1a5fb4] to-[#3584e4] text-white text-xs px-3 py-1 rounded-full flex items-center font-medium shadow-md">
                          <Check className="w-3 h-3 mr-1" /> Verified Account
                        </div>
                      </div>
                      
                      <div className="w-full space-y-5">
                        <div className="flex items-center justify-between border-b border-gray-700/30 pb-3">
                          <span className="text-gray-400 text-sm font-medium w-32">Player ID:</span>
                          <span className="text-white font-semibold tracking-wide text-right">{playerID}</span>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-gray-400 text-sm font-medium w-32">Username:</span>
                          <span className="text-white font-semibold text-right">{username}</span>
                        </div>
                      </div>
                      
                      <div className="mt-6 w-full flex justify-end">
                        <Button 
                          className="bg-[#1F2A3C] hover:bg-[#2A3A52] text-white shadow-md transition-all duration-200"
                          onClick={handleResetPlayerID}
                        >
                          <RefreshCw className="w-4 h-4 mr-1" /> Change ID
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-5">
                    <div className="text-center py-3">
                      <div className="mb-4">
                        <img 
                          src="/lovable-uploads/02bb433c-783b-4512-b8bd-c2d8c0cb3d0e.png" 
                          alt="Honor of Kings Logo" 
                          className="h-10 w-auto mx-auto rounded-lg mb-4"
                        />
                        <p className="text-gray-300 mb-4 text-lg font-medium">Please enter your Player ID to continue</p>
                      </div>
                      <Button 
                        className="bg-gradient-to-r from-midasbuy-blue to-blue-500 hover:from-blue-600 hover:to-blue-500 text-white font-medium shadow-md transition-all duration-300 hover:shadow-lg px-6 py-5 h-auto"
                        onClick={openPlayerIdModal}
                      >
                        <User className="w-4 h-4 mr-2" /> Enter Your Player ID Now &gt;
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="mt-3 flex items-start">
                  <AlertCircle className="w-4 h-4 text-midasbuy-gold mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-300">
                    Your Player ID can be found in your Honor of Kings game. Go to your profile and copy the ID number. 
                    This ID is required to deliver credits directly to your account.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-effect rounded-xl p-6"
              >
                <h2 className="text-xl font-bold mb-4 text-white">Important Information</h2>
                
                <div className="space-y-4 text-sm text-gray-300">
                  <p className="flex items-start">
                    <span className="text-midasbuy-gold mr-2">•</span>
                    Credits will be directly added to the Honor of Kings account with the Player ID you provide.
                  </p>
                  <p className="flex items-start">
                    <span className="text-midasbuy-gold mr-2">•</span>
                    Please ensure that the Player ID is correct before proceeding with the purchase.
                  </p>
                  <p className="flex items-start">
                    <span className="text-midasbuy-gold mr-2">•</span>
                    Credit delivery is instant but may take up to 5 minutes in some cases.
                  </p>
                  <p className="flex items-start">
                    <span className="text-midasbuy-gold mr-2">•</span>
                    For any issues with your purchase, please contact our support team.
                  </p>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:col-span-1 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-effect rounded-xl p-6 sticky top-24"
              >
                <h2 className="text-xl font-bold mb-4 text-white">Order Summary</h2>
                
                <div className="flex items-center mb-6 pb-4 border-b border-gray-700">
                  <img src="/lovable-uploads/f6594fcb-d2eb-4e92-9f21-fe5959fa5360.png" alt="Credits" className="w-[70px] mr-4" />
                  
                  <div>
                    <div className="flex items-baseline">
                      <span className="text-white text-xl">{honorPackage?.baseAmount}</span>
                      {honorPackage?.bonusAmount > 0 && (
                        <span className="text-midasbuy-gold ml-1">+{honorPackage?.bonusAmount}</span>
                      )}
                      <span className="text-white ml-1">Credits</span>
                      
                      {honorPackage?.bonusPercent && (
                        <span className="ml-2 text-xs px-2 py-0.5 rounded bg-midasbuy-gold/20 text-midasbuy-gold">
                          {honorPackage?.bonusPercent}
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-1">
                      <span className="text-midasbuy-gold font-medium">
                        {convertAndFormatPrice(honorPackage?.price || 0, selectedCountry.currency)}
                      </span>
                      {honorPackage?.originalPrice > (honorPackage?.price || 0) && (
                        <span className="text-gray-400 line-through text-sm ml-2">
                          {convertAndFormatPrice(honorPackage?.originalPrice || 0, selectedCountry.currency)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Subtotal</span>
                    <span className="text-white">
                      {convertAndFormatPrice(honorPackage?.price || 0, selectedCountry.currency)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Taxes</span>
                    <span className="text-white">
                      {convertAndFormatPrice(0.00, selectedCountry.currency)}
                    </span>
                  </div>
                  
                  {honorPackage?.originalPrice > (honorPackage?.price || 0) && (
                    <div className="flex justify-between text-sm">
                      <span className="text-midasbuy-gold">Discount</span>
                      <span className="text-midasbuy-gold">
                        -{convertAndFormatPrice((honorPackage?.originalPrice || 0) - (honorPackage?.price || 0), selectedCountry.currency)}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between mb-6 pb-2 border-b border-gray-700">
                  <span className="font-bold text-white">Total</span>
                  <span className="font-bold text-white text-xl">
                    {convertAndFormatPrice(honorPackage?.price || 0, selectedCountry.currency)}
                  </span>
                </div>
                
                <Button 
                  className="w-full h-12 bg-midasbuy-blue hover:bg-blue-600 text-white font-medium text-lg"
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-midasbuy-navy py-6 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400 text-sm">
            <p>© 2025 Midasbuy. All Rights Reserved.</p>
            <div className="mt-2">
              <a href="#" className="text-gray-400 hover:text-gray-300 mx-2">Terms of Service</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-gray-300 mx-2">Privacy Policy</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-gray-300 mx-2">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HonorOfKingsPurchasePage;
