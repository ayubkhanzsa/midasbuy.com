import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RefreshCw, User, Shield, Check } from "lucide-react";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useResponsive } from "@/hooks/use-mobile";

interface EventsPageProps {
  onLogout: () => void;
}

const EventsPage = ({ onLogout }: EventsPageProps) => {
  const [username, setUsername] = useState("");
  const [isUsernameVerified, setIsUsernameVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  
  useEffect(() => {
    const savedUsername = localStorage.getItem("pubgUsername");
    if (savedUsername) {
      setUsername(savedUsername);
      setIsUsernameVerified(true);
    }
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "pubgUsername") {
        const newUsername = event.newValue;
        if (newUsername !== null) {
          setUsername(newUsername);
          setIsUsernameVerified(true);
        } else {
          setUsername("");
          setIsUsernameVerified(false);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleSaveUsername = () => {
    if (!username.trim()) {
      toast({
        title: "Username Required",
        description: "Please enter a valid username",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("pubgUsername", username);
    setIsUsernameVerified(true);
    
    toast({
      title: "Username Verified",
      description: "Your username has been verified successfully",
    });
  };

  const handleResetUsername = () => {
    setUsername("");
    setIsUsernameVerified(false);
    localStorage.removeItem("pubgUsername");
    
    toast({
      title: "Username Reset",
      description: "Please enter a new username",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-midasbuy-darkBlue">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-midasbuy-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-400 animate-pulse">Loading events...</p>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <div className="glass-effect rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <User className="w-6 h-6 mr-2 text-midasbuy-gold" />
                  PUBG Mobile Events
                </h2>
                <div className="bg-midasbuy-navy/50 px-3 py-1 rounded-full text-xs text-gray-300 flex items-center">
                  <Shield className="w-3 h-3 mr-1 text-midasbuy-blue" />
                  Account Settings
                </div>
              </div>
              
              <div className="mb-6 bg-midasbuy-navy/30 p-6 rounded-lg border border-midasbuy-blue/20">
                <div className="flex items-center mb-3">
                  <Label htmlFor="username" className="block text-sm font-medium text-white mr-2 flex items-center">
                    PUBG Mobile Username
                    {isUsernameVerified && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-500/20 text-green-400 ml-2">
                        <Check className="w-3 h-3 mr-1" /> Verified
                      </span>
                    )}
                  </Label>
                </div>
                
                <div className="flex">
                  <div className="flex-grow relative">
                    <Input 
                      id="username"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setIsUsernameVerified(false);
                      }}
                      placeholder="Enter your PUBG Mobile username"
                      className="bg-midasbuy-navy/50 border-midasbuy-blue/30 text-white focus:border-midasbuy-blue focus:ring-midasbuy-blue/20"
                    />
                  </div>
                  
                  <Button 
                    className={`ml-2 ${isUsernameVerified 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-midasbuy-blue hover:bg-blue-600'} text-white`}
                    onClick={isUsernameVerified ? handleResetUsername : handleSaveUsername}
                  >
                    {isUsernameVerified ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-1" /> Reset Username
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4 mr-1" /> Verify Username
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="bg-midasbuy-navy/30 p-6 rounded-lg border border-midasbuy-blue/20">
                <h3 className="text-xl font-bold text-white mb-4">Upcoming Events</h3>
                
                <div className="bg-midasbuy-navy/40 rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-midasbuy-gold font-semibold">UC Bonus Event</h4>
                        <p className="text-gray-300 text-sm mt-1">Get extra UC on all purchases</p>
                      </div>
                      <div className="text-right">
                        <div className="text-white text-xs">Ends in</div>
                        <div className="text-midasbuy-gold font-bold">3 days</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-midasbuy-gold font-semibold">Royal Pass Season</h4>
                        <p className="text-gray-300 text-sm mt-1">New season starting soon</p>
                      </div>
                      <div className="text-right">
                        <div className="text-white text-xs">Starts in</div>
                        <div className="text-midasbuy-gold font-bold">5 days</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-midasbuy-gold font-semibold">Limited Time Offer</h4>
                        <p className="text-gray-300 text-sm mt-1">Special discounts on selected items</p>
                      </div>
                      <div className="text-right">
                        <div className="text-white text-xs">Available for</div>
                        <div className="text-midasbuy-gold font-bold">24 hours</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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

export default EventsPage;
