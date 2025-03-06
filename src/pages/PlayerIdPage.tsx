
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Check, Info, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const PlayerIdPage = ({ onLogout }: { onLogout: () => void }) => {
  const [playerId, setPlayerId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [playerVerified, setPlayerVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get saved username when component mounts
  useEffect(() => {
    const savedUsername = localStorage.getItem("pubgUsername");
    if (savedUsername) {
      setPlayerName(savedUsername);
    }
  }, []);

  const handleVerifyPlayer = () => {
    if (!playerId) {
      toast({
        title: "Player ID Required",
        description: "Please enter your Player ID to continue",
        variant: "destructive",
      });
      return;
    }

    // Check if username is verified in events page
    const savedUsername = localStorage.getItem("pubgUsername");
    if (!savedUsername) {
      toast({
        title: "Username Not Verified",
        description: "Please verify your username in the Events page first",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (playerId.length >= 8 && playerId.length <= 12) {
        setPlayerVerified(true);
        
        // Always use the username from Events page
        setPlayerName(savedUsername);
        
        // Save the player ID to localStorage
        localStorage.setItem("playerID", playerId);
        
        toast({
          title: "Player Verified",
          description: "Your Player ID has been verified successfully",
          variant: "default",
        });
      } else {
        toast({
          title: "Invalid Player ID",
          description: "Please enter a valid Player ID (8-12 digits)",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1500);
  };

  const handleContinue = () => {
    if (playerVerified) {
      navigate("/");
      toast({
        title: "Success",
        description: "Player ID linked successfully",
        variant: "default",
      });
    }
  };

  return (
    <div className="min-h-screen bg-midasbuy-darkBlue text-white">
      <Header onLogout={onLogout} />
      
      <main className="container mx-auto px-4 py-24">
        <Button 
          variant="ghost" 
          className="mb-6 text-white hover:bg-white/10" 
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        
        <div className="max-w-2xl mx-auto bg-midasbuy-navy rounded-lg border border-white/10 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-midasbuy-blue to-midasbuy-blue/80 p-4">
            <h1 className="text-2xl font-bold flex items-center">
              <img 
                src="/lovable-uploads/072f88f4-7402-4591-b3e4-11f57bb0e9ea.png" 
                alt="PUBG Mobile" 
                className="w-12 h-12 mr-3 rounded-md"
              />
              PUBG MOBILE Player ID Verification
            </h1>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-start mb-4">
                <Info className="text-midasbuy-gold mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                <p className="text-white/80 text-sm">
                  To ensure a seamless gaming experience and secure transaction, please enter your PUBG MOBILE Player ID below. This ID is required to correctly route your purchases to your game account.
                </p>
              </div>
              
              <div className="bg-white/5 p-4 rounded-md mb-6">
                <h2 className="font-medium mb-3 text-midasbuy-gold">How to find your Player ID:</h2>
                <ol className="list-decimal list-inside text-sm text-white/80 space-y-2">
                  <li>Open PUBG MOBILE on your device</li>
                  <li>Tap on your profile picture in the main lobby</li>
                  <li>Your Player ID is displayed below your nickname</li>
                  <li>It's usually an 8-12 digit number (e.g., 5126384791)</li>
                </ol>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="player-id" className="block text-sm font-medium mb-1">
                  Your PUBG MOBILE Player ID
                </label>
                <div className="relative">
                  <Input
                    id="player-id"
                    type="text"
                    placeholder="Enter your Player ID (e.g., 5126384791)"
                    value={playerId}
                    onChange={(e) => {
                      // Only allow numbers
                      const value = e.target.value.replace(/\D/g, '');
                      setPlayerId(value);
                    }}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 pr-12"
                    maxLength={12}
                  />
                  {playerVerified && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                      <Check className="h-5 w-5" />
                    </div>
                  )}
                </div>
                {playerVerified && (
                  <p className="text-green-500 text-sm mt-1 flex items-center">
                    <Check className="h-4 w-4 mr-1" />
                    Verified as: {playerName}
                  </p>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={handleVerifyPlayer}
                  disabled={loading || !playerId}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white border-white/20"
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Verifying...
                    </>
                  ) : (
                    "Verify Player ID"
                  )}
                </Button>
                
                <Button
                  onClick={handleContinue}
                  disabled={!playerVerified}
                  className="flex-1 bg-gradient-to-r from-midasbuy-blue to-midasbuy-blue/80 text-white border-none"
                >
                  Continue
                </Button>
              </div>
            </div>
            
            <div className="mt-8 border-t border-white/10 pt-4">
              <div className="flex items-start">
                <AlertCircle className="text-white/60 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                <p className="text-white/60 text-xs">
                  Your Player ID is used only for processing in-game purchases and will be handled according to our Privacy Policy. We do not store or share this information with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PlayerIdPage;
