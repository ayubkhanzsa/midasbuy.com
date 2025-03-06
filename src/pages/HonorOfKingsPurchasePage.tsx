
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, AlertCircle, Check, RefreshCw, User, Shield, X, HelpCircle } from "lucide-react";
import Header from "@/components/Header";
import { getHonorOfKingsPackageById, getSelectedCountry, setupCountryChangeListener } from "@/data/honorOfKingsPackages";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { convertAndFormatPrice, setupCurrencyChangeListener } from "@/utils/currencyUtils";
import { useResponsive } from "@/hooks/use-mobile";
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

  const honorPackage = id ? getHonorOfKingsPackageById(id) : undefined;

  useEffect(() => {
    if (!honorPackage) {
      navigate("/honor-of-kings");
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [honorPackage, navigate]);

  useEffect(() => {
    const savedPlayerID = localStorage.getItem("honorPlayerID");
    if (savedPlayerID) {
      setPlayerID(savedPlayerID);
      setIsPlayerIDValid(true);
      
      // Only get the username if player ID is valid
      const savedUsername = localStorage.getItem("honorUsername");
      if (savedUsername) {
        setUsername(savedUsername);
      }
    }
    
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "honorUsername") {
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
        description: "Please enter a valid Honor of Kings Player ID",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      setIsPlayerIDValid(true);
      setPlayerID(tempPlayerID);
      
      toast({
        title: "Player ID Verified",
        description: "ID verification successful",
      });
      
      localStorage.setItem("honorPlayerID", tempPlayerID);
      
      // Generate random username for demonstration
      const mockUsername = `HonorPlayer${Math.floor(Math.random() * 10000)}`;
      localStorage.setItem("honorUsername", mockUsername);
      setUsername(mockUsername);
      
      setShowPlayerIdModal(false);
    }, 1500);
  };

  const handleResetPlayerID = () => {
    setPlayerID("");
    setIsPlayerIDValid(false);
    setUsername(""); // Clear username when player ID is reset
    localStorage.removeItem("honorPlayerID");
    localStorage.removeItem("honorUsername");
    
    toast({
      title: "Player ID Reset",
      description: "Please enter a new Player ID",
    });
    
    // Open the modal for entering a new player ID
    setShowPlayerIdModal(true);
  };

  const handleBackToPackages = () => {
    navigate("/honor-of-kings");
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
      toast({
        title: "Proceeding to Checkout",
        description: `Package: ${honorPackage?.baseAmount} Tokens`,
      });
      
      // For now, we'll just navigate back to honor of kings page
      // In a real implementation, this would go to a checkout page
      navigate(`/honor-of-kings`);
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
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl font-bold text-white">Enter Your Player ID Now</DialogTitle>
                <Button 
                  variant="ghost" 
                  className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-transparent"
                  onClick={() => setShowPlayerIdModal(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            
              <div className="py-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xl font-medium text-white">Player ID</h4>
                  <Button 
                    variant="ghost" 
                    className="flex items-center text-blue-400 hover:text-blue-300 p-0 hover:bg-transparent"
                  >
                    <HelpCircle className="w-5 h-5 mr-1" />
                    <span>Couldn't find your Player ID?</span>
                  </Button>
                </div>
                
                <div className="mb-4">
                  <div className="bg-[#0099FF]/10 p-3 rounded-t-md">
                    <p className="text-white">Start by entering your Game player ID to ensure a smooth purchase!</p>
                  </div>
                  <div className="bg-[#1A1F2E] rounded-b-md p-3 border border-[#182238]">
                    <Input
                      value={tempPlayerID}
                      onChange={(e) => setTempPlayerID(e.target.value)}
                      placeholder="Enter Player ID"
                      variant="dark"
                      className="h-12"
                    />
                  </div>
                </div>
                
                <Button 
                  className="w-full"
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
                
                <div className="mt-6 space-y-4">
                  <div>
                    <h5 className="text-white font-medium mb-2 flex items-center">
                      <HelpCircle className="w-4 h-4 mr-2 text-[#0099FF]" />
                      Couldn't find your Player ID?
                    </h5>
                    
                    <div className="ml-6">
                      <p className="text-sm text-gray-300 mb-1">1.1. Enter the game</p>
                      <div className="rounded-md overflow-hidden mb-4">
                        <img 
                          src="/lovable-uploads/e8dbeab5-139d-48a8-be8c-c65c04e63967.png" 
                          alt="Finding Player ID Step 1" 
                          className="w-full rounded-md"
                        />
                      </div>
                      
                      <p className="text-sm text-gray-300 mb-1">1.2. Go to your profile and find the ID</p>
                      <div className="rounded-md overflow-hidden">
                        <img 
                          src="/lovable-uploads/e8dbeab5-139d-48a8-be8c-c65c04e63967.png" 
                          alt="Finding Player ID Step 2" 
                          className="w-full rounded-md"
                        />
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
              onClick={handleBackToPackages}
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
                  <div className="bg-midasbuy-navy/30 p-5 rounded-lg border border-midasbuy-blue/20">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center mb-2">
                          <span className="text-green-400 flex items-center font-medium">
                            <Check className="w-4 h-4 mr-1" /> ID Verified
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                          <div>
                            <div className="text-gray-400 text-sm">Player ID:</div>
                            <div className="text-white font-medium">{playerID}</div>
                          </div>
                          <div>
                            <div className="text-gray-400 text-sm">Username:</div>
                            <div className="text-midasbuy-gold font-medium">{username}</div>
                          </div>
                        </div>
                      </div>
                      <Button 
                        className="bg-gray-700 hover:bg-gray-600 text-white"
                        onClick={handleResetPlayerID}
                      >
                        <RefreshCw className="w-4 h-4 mr-1" /> Change ID
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-midasbuy-navy/30 p-5 rounded-lg border border-midasbuy-blue/20">
                    <div className="text-center py-3">
                      <p className="text-gray-300 mb-3">Please enter your Player ID to continue</p>
                      <Button 
                        className="bg-midasbuy-blue hover:bg-blue-600 text-white font-medium"
                        onClick={openPlayerIdModal}
                      >
                        <User className="w-4 h-4 mr-1" /> Enter Player ID
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="mt-3 flex items-start">
                  <AlertCircle className="w-4 h-4 text-midasbuy-gold mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-300">
                    Your Player ID can be found in your Honor of Kings game profile. 
                    This ID is required to deliver Tokens directly to your account.
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
                    Tokens will be directly added to the Honor of Kings account with the Player ID you provide.
                  </p>
                  <p className="flex items-start">
                    <span className="text-midasbuy-gold mr-2">•</span>
                    Please ensure that the Player ID is correct before proceeding with the purchase.
                  </p>
                  <p className="flex items-start">
                    <span className="text-midasbuy-gold mr-2">•</span>
                    Token delivery is instant but may take up to 5 minutes in some cases.
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
                  <img 
                    src={honorPackage.image} 
                    alt="Honor of Kings Tokens" 
                    className="w-[70px] mr-4"
                  />
                  
                  <div>
                    <div className="flex items-baseline">
                      <span className="text-white text-xl">{honorPackage?.baseAmount}</span>
                      {honorPackage?.bonusAmount > 0 && (
                        <span className="text-midasbuy-gold ml-1">+{honorPackage?.bonusAmount}</span>
                      )}
                      <span className="text-white ml-1">Tokens</span>
                      
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
