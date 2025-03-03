
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ThankYouPageProps {
  onLogout: () => void;
}

const ThankYouPage = ({ onLogout }: ThankYouPageProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [transactionDetails, setTransactionDetails] = useState({
    orderId: `MIDAS-${Math.floor(Math.random() * 1000000)}`,
    playerId: localStorage.getItem("playerId") || "Unknown",
    amount: localStorage.getItem("purchaseAmount") || "Unknown",
    ucAmount: localStorage.getItem("ucAmount") || "Unknown",
    date: new Date().toLocaleString(),
    paymentMethod: localStorage.getItem("paymentMethod") || "Credit Card"
  });

  useEffect(() => {
    // If user refreshes page or navigates directly to thank you page without checkout
    if (!localStorage.getItem("ucAmount")) {
      navigate("/");
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Analytics tracking
    console.log("Thank you page viewed", {
      orderId: transactionDetails.orderId,
      timestamp: new Date().toISOString()
    });
  }, [navigate, transactionDetails.orderId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-midasbuy-navy to-black text-white">
      <Header onLogout={onLogout} />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </motion.div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Thank You for Your Purchase!</h1>
            <p className="text-gray-400 text-lg">
              Your transaction has been completed successfully. Your UC will be credited to your account shortly.
            </p>
          </div>
          
          <div className="glass-effect p-6 rounded-xl mb-8">
            <h2 className="text-xl font-bold mb-4 text-center border-b border-gray-700 pb-3">
              Order Confirmation
            </h2>
            
            <div className="space-y-4 mt-6">
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400">Order ID:</span>
                <span className="font-medium">{transactionDetails.orderId}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400">Player ID:</span>
                <span className="font-medium">{transactionDetails.playerId}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400">UC Amount:</span>
                <span className="font-medium">{transactionDetails.ucAmount} UC</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400">Amount Paid:</span>
                <span className="font-medium">${transactionDetails.amount}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400">Payment Method:</span>
                <span className="font-medium">{transactionDetails.paymentMethod}</span>
              </div>
              
              <div className="flex justify-between py-2">
                <span className="text-gray-400">Date:</span>
                <span className="font-medium">{transactionDetails.date}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
            <Link to="/">
              <Button 
                variant="outline" 
                className="w-full md:w-auto px-8 bg-transparent border-midasbuy-blue text-midasbuy-blue hover:bg-midasbuy-blue/10"
              >
                Back to Home
              </Button>
            </Link>
            
            <Button 
              onClick={() => {
                // In a real app, this could download a PDF receipt
                alert("Receipt downloaded!");
              }}
              className="w-full md:w-auto px-8 bg-midasbuy-blue hover:bg-blue-600"
            >
              Download Receipt
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ThankYouPage;
