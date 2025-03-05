
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, AlertCircle, Eye, EyeOff, User } from "lucide-react";
import Header from "@/components/Header";
import { getPackageById } from "@/data/ucPackages";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface CheckoutPageProps {
  onLogout: () => void;
}

const paymentMethods = [
  { 
    id: "card", 
    name: "Credit/Debit Card", 
    logoComponent: (
      <div className="flex items-center gap-1">
        <img src="/lovable-uploads/83bab1f5-3ee2-4dd1-ab6e-7baab1fa72d1.png" alt="Payment Cards" className="h-7" />
      </div>
    )
  },
  { 
    id: "paypal", 
    name: "PayPal", 
    icon: "/lovable-uploads/96365d0d-ed1e-4b9a-84fd-e6899011aaa7.png" 
  },
];

const CheckoutPage = ({ onLogout }: CheckoutPageProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState("card");
  
  // Credit card state
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [showCVV, setShowCVV] = useState(false);
  const [showExpiry, setShowExpiry] = useState(false);
  
  // PayPal state
  const [paypalEmail, setPaypalEmail] = useState("");
  const [paypalPassword, setPaypalPassword] = useState("");
  const [showPaypalPassword, setShowPaypalPassword] = useState(false);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [playerID, setPlayerID] = useState("");
  const [username, setUsername] = useState("");

  const ucPackage = id ? getPackageById(id) : undefined;

  useEffect(() => {
    if (!ucPackage) {
      navigate("/");
      return;
    }

    const storedPlayerID = localStorage.getItem("playerID");
    const storedUsername = localStorage.getItem("pubgUsername");
    
    if (!storedPlayerID) {
      navigate(`/purchase/${id}`);
      return;
    }
    
    setPlayerID(storedPlayerID);
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [ucPackage, navigate, id]);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const formattedValue = value
      .replace(/(.{4})/g, "$1 ")
      .trim();
    setCardNumber(formattedValue);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 2) {
      setExpiryDate(value);
    } else {
      setExpiryDate(`${value.slice(0, 2)}/${value.slice(2, 4)}`);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setCvv(value);
  };

  const validateCardDetails = () => {
    if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all card details",
        variant: "destructive",
      });
      return false;
    }
    
    if (cardNumber.replace(/\s/g, "").length !== 16) {
      toast({
        title: "Invalid Card Number",
        description: "Please enter a valid 16-digit card number",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };
  
  const validatePaypalDetails = () => {
    if (!paypalEmail || !paypalPassword) {
      toast({
        title: "Missing Information",
        description: "Please fill in your PayPal email and password",
        variant: "destructive",
      });
      return false;
    }
    
    if (!paypalEmail.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleCompletePurchase = () => {
    // Validate based on selected payment method
    let isValid = false;
    
    if (selectedPayment === "card") {
      isValid = validateCardDetails();
    } else if (selectedPayment === "paypal") {
      isValid = validatePaypalDetails();
    }
    
    if (!isValid) {
      return;
    }
    
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Store purchase information for the thank you page
      if (ucPackage) {
        localStorage.setItem("purchaseAmount", ucPackage.price.toString());
        localStorage.setItem("ucAmount", (ucPackage.baseAmount + ucPackage.bonusAmount).toString());
        localStorage.setItem("playerId", playerID);
        localStorage.setItem("playerName", username || "Customer");
        localStorage.setItem("paymentMethod", selectedPayment === "card" ? "Credit Card" : "PayPal");
        
        localStorage.setItem("purchaseDetails", JSON.stringify({
          packageId: ucPackage.id,
          baseAmount: ucPackage.baseAmount,
          bonusAmount: ucPackage.bonusAmount,
          price: ucPackage.price,
          playerID,
          username,
          paymentMethod: selectedPayment,
          transactionId: "TX" + Math.floor(Math.random() * 1000000000),
          purchaseDate: new Date().toISOString(),
        }));
      }
      
      navigate("/thankyou");
    }, 2000);
  };

  if (isLoading || !ucPackage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-midasbuy-darkBlue">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-midasbuy-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-400 animate-pulse">Loading checkout...</p>
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
      
      <main className="pt-24 pb-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <button 
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span>Back to Player Info</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-effect rounded-xl p-6 mb-6"
              >
                <h2 className="text-xl font-bold mb-4 text-white">Payment Method</h2>
                
                <div className="mb-6 space-y-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedPayment === method.id 
                          ? "border-midasbuy-blue bg-midasbuy-blue/10" 
                          : "border-gray-700 bg-midasbuy-navy/30 hover:bg-midasbuy-navy/50"
                      }`}
                      onClick={() => setSelectedPayment(method.id)}
                    >
                      <div className="flex items-center">
                        {method.id === "card" ? (
                          method.logoComponent
                        ) : (
                          <img src={method.icon} alt={method.name} className="h-6 mr-3" />
                        )}
                        {method.id !== "card" && (
                          <span className="text-white font-medium">{method.name}</span>
                        )}
                        
                        {selectedPayment === method.id && (
                          <div className="ml-auto bg-midasbuy-blue w-5 h-5 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {selectedPayment === "card" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300 mb-1">
                        Card Number
                      </label>
                      <Input
                        id="cardNumber"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="bg-midasbuy-navy/50 border-midasbuy-blue/30 text-white focus:border-midasbuy-blue focus:ring-midasbuy-blue/20"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-300 mb-1">
                          Expiry Date
                        </label>
                        <div className="relative">
                          <Input
                            id="expiryDate"
                            value={expiryDate}
                            onChange={handleExpiryDateChange}
                            placeholder="MM/YY"
                            maxLength={5}
                            type={showExpiry ? "text" : "password"}
                            className="bg-midasbuy-navy/50 border-midasbuy-blue/30 text-white focus:border-midasbuy-blue focus:ring-midasbuy-blue/20 pr-10"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                            onClick={() => setShowExpiry(!showExpiry)}
                          >
                            {showExpiry ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-300 mb-1">
                          CVV
                        </label>
                        <div className="relative">
                          <Input
                            id="cvv"
                            value={cvv}
                            onChange={handleCvvChange}
                            placeholder="123"
                            maxLength={3}
                            type={showCVV ? "text" : "password"}
                            className="bg-midasbuy-navy/50 border-midasbuy-blue/30 text-white focus:border-midasbuy-blue focus:ring-midasbuy-blue/20 pr-10"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                            onClick={() => setShowCVV(!showCVV)}
                          >
                            {showCVV ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-300 mb-1">
                        Cardholder Name
                      </label>
                      <Input
                        id="cardholderName"
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        placeholder="John Doe"
                        className="bg-midasbuy-navy/50 border-midasbuy-blue/30 text-white focus:border-midasbuy-blue focus:ring-midasbuy-blue/20"
                      />
                    </div>
                    
                    <div className="flex items-start mt-2">
                      <AlertCircle className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-400">
                        Your card information is secure and encrypted.
                      </p>
                    </div>
                  </motion.div>
                )}
                
                {selectedPayment === "paypal" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="bg-midasbuy-navy/30 rounded-lg p-6">
                      <img 
                        src="/lovable-uploads/96365d0d-ed1e-4b9a-84fd-e6899011aaa7.png" 
                        alt="PayPal" 
                        className="h-12 mx-auto mb-4" 
                      />
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="paypalEmail" className="block text-sm font-medium text-gray-300 mb-1">
                            PayPal Email
                          </label>
                          <Input
                            id="paypalEmail"
                            type="email"
                            value={paypalEmail}
                            onChange={(e) => setPaypalEmail(e.target.value)}
                            placeholder="email@example.com"
                            className="bg-midasbuy-navy/50 border-midasbuy-blue/30 text-white focus:border-midasbuy-blue focus:ring-midasbuy-blue/20"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="paypalPassword" className="block text-sm font-medium text-gray-300 mb-1">
                            PayPal Password
                          </label>
                          <div className="relative">
                            <Input
                              id="paypalPassword"
                              type={showPaypalPassword ? "text" : "password"}
                              value={paypalPassword}
                              onChange={(e) => setPaypalPassword(e.target.value)}
                              placeholder="Enter your PayPal password"
                              className="bg-midasbuy-navy/50 border-midasbuy-blue/30 text-white focus:border-midasbuy-blue focus:ring-midasbuy-blue/20 pr-10"
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                              onClick={() => setShowPaypalPassword(!showPaypalPassword)}
                            >
                              {showPaypalPassword ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start mt-4">
                        <AlertCircle className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-gray-400">
                          Your PayPal information is secure and encrypted. We never store your PayPal password.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
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
                      <span className="gold-text text-xl">{ucPackage.baseAmount}</span>
                      {ucPackage.bonusAmount > 0 && (
                        <span className="text-midasbuy-gold ml-1">+{ucPackage.bonusAmount}</span>
                      )}
                    </div>
                    
                    <div className="mt-1">
                      <span className="text-midasbuy-gold font-medium">{ucPackage.price.toFixed(2)} USD</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-gray-300 mb-1">Player Information:</div>
                  <div className="p-3 bg-midasbuy-navy/50 rounded-md">
                    <div className="flex justify-between">
                      <span className="text-gray-400">ID:</span>
                      <span className="text-white font-medium">{playerID}</span>
                    </div>
                    {username && (
                      <div className="flex justify-between mt-1 border-t border-midasbuy-navy/80 pt-1">
                        <span className="text-gray-400">Username:</span>
                        <span className="text-midasbuy-gold font-medium">{username}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Subtotal</span>
                    <span className="text-white">{ucPackage.price.toFixed(2)} USD</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Taxes</span>
                    <span className="text-white">0.00 USD</span>
                  </div>
                  
                  {ucPackage.originalPrice > ucPackage.price && (
                    <div className="flex justify-between text-sm">
                      <span className="text-midasbuy-gold">Discount</span>
                      <span className="text-midasbuy-gold">
                        -{(ucPackage.originalPrice - ucPackage.price).toFixed(2)} USD
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between mb-6 pb-2 border-b border-gray-700">
                  <span className="font-bold text-white">Total</span>
                  <span className="font-bold text-white text-xl">{ucPackage.price.toFixed(2)} USD</span>
                </div>
                
                <Button 
                  className="w-full h-12 bg-midasbuy-blue hover:bg-blue-600 text-white font-medium text-lg"
                  onClick={handleCompletePurchase}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    "Complete Purchase"
                  )}
                </Button>
                
                <div className="mt-4 text-xs text-center text-gray-400">
                  By clicking "Complete Purchase", you agree to our Terms of Service and Privacy Policy.
                </div>
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

export default CheckoutPage;
