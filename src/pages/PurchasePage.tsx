import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, AlertCircle, Check, RefreshCw, User, Shield } from "lucide-react";
import Header from "@/components/Header";
import { getPackageById, getSelectedCountry, setupCountryChangeListener } from "@/data/ucPackages";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { convertAndFormatPrice, setupCurrencyChangeListener } from "@/utils/currencyUtils";
import { useResponsive } from "@/hooks/use-mobile";
import { Label } from "@/components/ui/label";

interface PurchasePageProps {
  onLogout: () => void;
}

const PurchasePage = ({ onLogout }: PurchasePageProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [playerID, setPlayerID] = useState("");
  const [isPlayerIDValid, setIsPlayerIDValid] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(getSelectedCountry());
  const [username, setUsername] = useState("");
  const { isMobile, isTablet } = useResponsive();

  const ucPackage = id ? getPackageById(id) : undefined;

  useEffect(() => {
    if (!ucPackage) {
      navigate("/");
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [ucPackage, navigate]);

  useEffect(() => {
    const savedPlayerID = localStorage.getItem("playerID");
    if (savedPlayerID) {
      setPlayerID(savedPlayerID);
      setIsPlayerIDValid(true);
    }
    
    const savedUsername = localStorage.getItem("pubgUsername");
    if (savedUsername) {
      setUsername(savedUsername);
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
    if (!playerID || playerID.length < 8) {
      toast({
        title: "Invalid Player ID",
        description: "Please enter a valid Player ID",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      setIsPlayerIDValid(true);
      
      toast({
        title: "Player ID Verified",
        description: "ID verification successful",
      });
      
      localStorage.setItem("playerID", playerID);
    }, 1500);
  };

  const handleResetPlayerID = () => {
    setPlayerID("");
    setIsPlayerIDValid(false);
    localStorage.removeItem("playerID");
    
    toast({
      title: "Player ID Reset",
      description: "Please enter a new Player ID",
    });
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
      return;
    }

    if (id) {
      navigate(`/checkout/${id}`);
    }
  };

  if (isLoading || !ucPackage) {
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
                
                <div className="mb-6 bg-midasbuy-navy/30 p-4 rounded-lg border border-midasbuy-blue/20">
                  <div className="flex items-center mb-1">
                    <Label htmlFor="playerID" className="block text-sm font-medium text-white mr-2 flex items-center">
                      PUBG Mobile Player ID
                      {isPlayerIDValid && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-500/20 text-green-400 ml-2">
                          <Check className="w-3 h-3 mr-1" /> Verified
                        </span>
                      )}
                    </Label>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-grow relative">
                      <Input 
                        id="playerID"
                        value={playerID}
                        onChange={(e) => {
                          setPlayerID(e.target.value);
                          setIsPlayerIDValid(false);
                        }}
                        placeholder="Enter your PUBG Mobile ID"
                        className="bg-midasbuy-navy/50 border-midasbuy-blue/30 text-white focus:border-midasbuy-blue focus:ring-midasbuy-blue/20"
                        disabled={isPlayerIDValid}
                      />
                      {isPlayerIDValid && (
                        <button
                          onClick={handleResetPlayerID}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-midasbuy-blue transition-colors"
                          title="Reset Player ID"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    
                    <Button 
                      className={`ml-2 ${isPlayerIDValid 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-midasbuy-blue hover:bg-blue-600'} text-white`}
                      onClick={isPlayerIDValid ? handleResetPlayerID : handleVerifyPlayerID}
                      disabled={isVerifying || (!isPlayerIDValid && !playerID)}
                    >
                      {isVerifying ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Verifying...
                        </>
                      ) : isPlayerIDValid ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-1" /> Reset ID
                        </>
                      ) : (
                        <>
                          <Shield className="w-4 h-4 mr-1" /> Verify
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {username && (
                    <div className="mt-3 bg-midasbuy-blue/10 p-3 rounded-lg border border-midasbuy-blue/20">
                      <div className="flex items-center">
                        <User className="w-4 h-4 text-midasbuy-gold mr-2" />
                        <div>
                          <div className="text-xs text-gray-400">Username</div>
                          <div className="text-sm text-white font-medium">{username}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-3 flex items-start">
                    <AlertCircle className="w-4 h-4 text-midasbuy-gold mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-300">
                      Your Player ID can be found in your PUBG Mobile game. Go to your profile and copy the ID number. 
                      This ID is required to deliver UC directly to your account.
                    </p>
                  </div>
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
                    UC will be directly added to the PUBG Mobile account with the Player ID you provide.
                  </p>
                  <p className="flex items-start">
                    <span className="text-midasbuy-gold mr-2">•</span>
                    Please ensure that the Player ID is correct before proceeding with the purchase.
                  </p>
                  <p className="flex items-start">
                    <span className="text-midasbuy-gold mr-2">•</span>
                    UC delivery is instant but may take up to 5 minutes in some cases.
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
                  <img src="/lovable-uploads/ecae37c2-470f-4c72-8005-270d82abe96f.png" alt="UC Coins" className="w-[70px] mr-4" />
                  
                  <div>
                    <div className="flex items-baseline">
                      <span className="gold-text text-xl">{ucPackage?.baseAmount}</span>
                      {ucPackage?.bonusAmount > 0 && (
                        <span className="text-midasbuy-gold ml-1">+{ucPackage?.bonusAmount}</span>
                      )}
                      
                      {ucPackage?.bonusPercent && (
                        <span className="ml-2 text-xs px-2 py-0.5 rounded bg-midasbuy-gold/20 text-midasbuy-gold">
                          {ucPackage?.bonusPercent}
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-1">
                      <span className="text-midasbuy-gold font-medium">
                        {convertAndFormatPrice(ucPackage?.price || 0, selectedCountry.currency)}
                      </span>
                      {ucPackage?.originalPrice > (ucPackage?.price || 0) && (
                        <span className="text-gray-400 line-through text-sm ml-2">
                          {convertAndFormatPrice(ucPackage?.originalPrice || 0, selectedCountry.currency)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Subtotal</span>
                    <span className="text-white">
                      {convertAndFormatPrice(ucPackage?.price || 0, selectedCountry.currency)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Taxes</span>
                    <span className="text-white">
                      {convertAndFormatPrice(0.00, selectedCountry.currency)}
                    </span>
                  </div>
                  
                  {ucPackage?.originalPrice > (ucPackage?.price || 0) && (
                    <div className="flex justify-between text-sm">
                      <span className="text-midasbuy-gold">Discount</span>
                      <span className="text-midasbuy-gold">
                        -{convertAndFormatPrice((ucPackage?.originalPrice || 0) - (ucPackage?.price || 0), selectedCountry.currency)}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between mb-6 pb-2 border-b border-gray-700">
                  <span className="font-bold text-white">Total</span>
                  <span className="font-bold text-midasbuy-gold text-xl">
                    {convertAndFormatPrice(ucPackage?.price || 0, selectedCountry.currency)}
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
            <p>© 2025 PUBG MOBILE. All Rights Reserved.</p>
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

export default PurchasePage;
