
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import { CheckCircle2, Download, ArrowLeft, Printer } from "lucide-react";
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
  
  const [showReceipt, setShowReceipt] = useState(false);

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

  const handlePrintReceipt = () => {
    window.print();
  };

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
          
          {!showReceipt ? (
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
              
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={() => setShowReceipt(true)}
                  className="w-full md:w-auto px-8 bg-midasbuy-blue hover:bg-blue-600"
                >
                  View Official Receipt
                </Button>
              </div>
            </div>
          ) : (
            <div className="print-container">
              <div className="glass-effect p-8 rounded-xl mb-8 border-2 border-midasbuy-blue/30 print:border-gray-300 print:bg-white print:text-black">
                <div className="flex justify-between items-start mb-6 print:mb-8">
                  <div className="flex items-center">
                    <img src="/midasbuy-logo.png" alt="MidasBuy" className="h-12 mr-2" />
                    <div>
                      <h2 className="text-lg font-bold text-midasbuy-gold print:text-black">MidasBuy</h2>
                      <p className="text-xs text-gray-400 print:text-gray-600">Official PUBG Mobile Partner</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <h3 className="text-xl font-bold print:text-black">RECEIPT</h3>
                    <p className="text-sm text-gray-400 print:text-gray-600">{transactionDetails.date}</p>
                    <p className="text-xs mt-1 text-midasbuy-gold print:text-gray-600">Order #{transactionDetails.orderId}</p>
                  </div>
                </div>
                
                <div className="border-t border-b border-gray-700 print:border-gray-300 py-6 mb-6">
                  <div className="flex flex-col md:flex-row mb-6">
                    <div className="mb-4 md:mb-0 md:w-1/2">
                      <h4 className="text-sm font-medium text-gray-400 print:text-gray-600 mb-1">Billed To</h4>
                      <p className="font-medium">Player ID: {transactionDetails.playerId}</p>
                      <p className="text-sm text-gray-400 print:text-gray-600 mt-1">PUBG Mobile</p>
                    </div>
                    <div className="md:w-1/2">
                      <h4 className="text-sm font-medium text-gray-400 print:text-gray-600 mb-1">Payment Method</h4>
                      <p className="font-medium">{transactionDetails.paymentMethod}</p>
                      <p className="text-sm text-gray-400 print:text-gray-600 mt-1">
                        Transaction processed on {transactionDetails.date.split(',')[0]}
                      </p>
                    </div>
                  </div>
                  
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700 print:border-gray-300">
                        <th className="text-left py-3 text-gray-400 print:text-gray-600">Item</th>
                        <th className="text-right py-3 text-gray-400 print:text-gray-600">Amount</th>
                        <th className="text-right py-3 text-gray-400 print:text-gray-600">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-4">
                          <div className="flex items-center">
                            <img 
                              src="https://cdn.midasbuy.com/images/UC_1d666b1.png" 
                              alt="UC" 
                              className="w-8 h-8 mr-3" 
                            />
                            <div>
                              <p className="font-medium">Unknown Cash (UC)</p>
                              <p className="text-xs text-gray-400 print:text-gray-600">PUBG Mobile Currency</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-right font-medium">{transactionDetails.ucAmount}</td>
                        <td className="py-4 text-right font-medium">${transactionDetails.amount}</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-gray-700 print:border-gray-300">
                        <td className="pt-4 pb-1 text-right" colSpan={2}>
                          <span className="text-gray-400 print:text-gray-600">Subtotal</span>
                        </td>
                        <td className="pt-4 pb-1 text-right font-medium">
                          ${transactionDetails.amount}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1 text-right" colSpan={2}>
                          <span className="text-gray-400 print:text-gray-600">Tax</span>
                        </td>
                        <td className="py-1 text-right font-medium">$0.00</td>
                      </tr>
                      <tr className="border-t border-gray-700 print:border-gray-300">
                        <td className="pt-4 text-right" colSpan={2}>
                          <span className="text-base font-bold">Total</span>
                        </td>
                        <td className="pt-4 text-right text-midasbuy-gold print:text-black font-bold">
                          ${transactionDetails.amount}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                
                <div className="text-center text-sm text-gray-400 print:text-gray-600 mb-6">
                  <p>This is an official receipt for your purchase. Thank you for your business!</p>
                  <p className="mt-1">For any questions or support, please contact support@midasbuy.com</p>
                </div>
                
                <div className="hidden print:block text-center mt-8 pt-8 border-t border-gray-300 text-xs text-gray-500">
                  <p>© 2023 PUBG MOBILE. All Rights Reserved.</p>
                </div>
                
                <div className="flex justify-between print:hidden">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowReceipt(false)} 
                    className="bg-transparent border-midasbuy-blue text-midasbuy-blue hover:bg-midasbuy-blue/10"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  
                  <div className="flex space-x-3">
                    <Button 
                      onClick={() => {
                        alert("Receipt downloaded!");
                      }}
                      className="bg-midasbuy-blue hover:bg-blue-600"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    
                    <Button 
                      onClick={handlePrintReceipt}
                      variant="outline"
                      className="bg-transparent border-midasbuy-blue text-midasbuy-blue hover:bg-midasbuy-blue/10"
                    >
                      <Printer className="mr-2 h-4 w-4" />
                      Print
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-8 print:hidden">
            <Link to="/">
              <Button 
                variant="outline" 
                className="w-full md:w-auto px-8 bg-transparent border-midasbuy-blue text-midasbuy-blue hover:bg-midasbuy-blue/10"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            body * {
              visibility: hidden;
            }
            .print-container, .print-container * {
              visibility: visible;
            }
            .print-container {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              background: white;
              color: black;
            }
          }
        `
      }} />
    </div>
  );
};

export default ThankYouPage;
