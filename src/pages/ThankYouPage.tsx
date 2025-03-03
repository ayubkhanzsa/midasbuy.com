
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, Printer, FileText, Shield, QrCode, HelpCircle, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadReceipt } from "@/utils/receiptUtils";

interface ThankYouPageProps {
  onLogout: () => void;
}

const ThankYouPage = ({ onLogout }: ThankYouPageProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const receiptRef = useRef<HTMLDivElement>(null);
  const [transactionDetails, setTransactionDetails] = useState({
    orderId: `MIDAS-${Math.floor(Math.random() * 1000000)}`,
    playerId: localStorage.getItem("playerId") || "Unknown",
    playerName: "Customer",
    amount: localStorage.getItem("purchaseAmount") || "Unknown",
    ucAmount: localStorage.getItem("ucAmount") || "Unknown",
    date: new Date().toLocaleString(),
    paymentMethod: localStorage.getItem("paymentMethod") || "Credit Card",
    fakeTransactionId: `TXN-${Math.floor(Math.random() * 10000)}XYZ`
  });
  
  const [showReceipt, setShowReceipt] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("ucAmount")) {
      navigate("/");
    }
    
    window.scrollTo(0, 0);
    
    console.log("Thank you page viewed", {
      orderId: transactionDetails.orderId,
      timestamp: new Date().toISOString()
    });
  }, [navigate, transactionDetails.orderId]);

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleDownloadReceipt = async () => {
    setIsDownloading(true);
    try {
      await downloadReceipt(receiptRef.current, transactionDetails.orderId);
    } finally {
      setIsDownloading(false);
    }
  };

  const generateQRPattern = () => {
    const size = 10;
    const qrPattern = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(Math.random() > 0.5 ? 1 : 0);
      }
      qrPattern.push(row);
    }
    return qrPattern;
  };

  const qrPattern = generateQRPattern();

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
              className="w-32 h-32 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [1, 0.8, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <CheckCircle2 className="w-20 h-20 text-green-500" />
              </motion.div>
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
              <div 
                ref={receiptRef}
                className="glass-effect p-8 rounded-xl mb-8 border-2 border-midasbuy-blue/30 print:border-gray-300 print:bg-white print:text-black relative"
              >
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 overflow-hidden">
                  <div className="text-6xl font-bold rotate-45 text-gray-700 select-none scale-150">
                    <img 
                      src="/lovable-uploads/72a28f0c-54ae-45b1-9cf2-53b1abf4d6e7.jpeg" 
                      alt="Watermark" 
                      className="opacity-10 scale-150"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-start mb-6 print:mb-8 relative z-10">
                  <div className="flex flex-col items-start">
                    <img 
                      src="/lovable-uploads/93d7ba55-9f86-45bc-be91-b93a2a13c0c4.jpeg" 
                      alt="Logo" 
                      className="h-12 mb-1" 
                    />
                  </div>
                  <div className="text-right">
                    <h3 className="text-xl font-bold text-orange-500 print:text-orange-500">TRANSACTION RECEIPT</h3>
                    <p className="text-sm text-midasbuy-blue print:text-midasbuy-blue">{transactionDetails.date}</p>
                    <p className="font-mono text-xs mt-1 text-midasbuy-gold print:text-white">
                      Order #{transactionDetails.orderId}
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-b border-gray-700 print:border-gray-300 py-6 mb-6 relative z-10">
                  <div className="flex flex-col md:flex-row gap-6 mb-6">
                    <div className="mb-4 md:mb-0 md:w-1/2">
                      <h4 className="text-sm font-bold text-gray-400 print:text-white mb-3 uppercase tracking-wider">
                        Customer Details
                      </h4>
                      <div className="space-y-2">
                        <p className="font-medium flex justify-between">
                          <span className="text-gray-400 print:text-white">Player ID:</span>
                          <span className="font-mono font-bold text-midasbuy-blue">{transactionDetails.playerId}</span>
                        </p>
                        <p className="font-medium flex justify-between">
                          <span className="text-gray-400 print:text-white">Name:</span>
                          <span className="text-white">{transactionDetails.playerName}</span>
                        </p>
                        <p className="font-medium flex justify-between">
                          <span className="text-gray-400 print:text-white">Contact:</span>
                          <span className="text-white"></span>
                        </p>
                      </div>
                    </div>
                    <div className="md:w-1/2">
                      <h4 className="text-sm font-bold text-gray-400 print:text-white mb-3 uppercase tracking-wider">
                        Transaction Details
                      </h4>
                      <div className="space-y-2">
                        <p className="font-medium flex justify-between">
                          <span className="text-gray-400 print:text-white">Transaction ID:</span>
                          <span className="font-mono font-bold text-midasbuy-blue">{transactionDetails.fakeTransactionId}</span>
                        </p>
                        <p className="font-medium flex justify-between">
                          <span className="text-gray-400 print:text-white">Date:</span>
                          <span className="text-midasbuy-blue">{transactionDetails.date}</span>
                        </p>
                        <p className="font-medium flex justify-between">
                          <span className="text-gray-400 print:text-white">Status:</span>
                          <span className="text-green-600 font-bold">Completed</span>
                        </p>
                        <p className="font-medium flex justify-between">
                          <span className="text-gray-400 print:text-white">Payment Method:</span>
                          <span className="text-midasbuy-blue">{transactionDetails.paymentMethod}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="text-sm font-bold text-gray-400 print:text-white mb-3 uppercase tracking-wider">
                      Item Details
                    </h4>
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-700 print:border-gray-300">
                          <th className="text-left py-3 text-gray-400 print:text-white">Item</th>
                          <th className="text-right py-3 text-gray-400 print:text-white">Amount</th>
                          <th className="text-right py-3 text-gray-400 print:text-white">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-4">
                            <div className="flex items-center">
                              <DollarSign className="w-8 h-8 text-midasbuy-gold mr-3" />
                              <div>
                                <p className="font-medium text-white">Unknown Cash (UC)</p>
                                <p className="text-xs text-gray-400 print:text-white">PUBG Mobile Currency</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 text-right font-medium text-orange-500">
                            {transactionDetails.ucAmount}
                          </td>
                          <td className="py-4 text-right font-medium text-midasbuy-blue">
                            ${transactionDetails.amount}
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr className="border-t border-gray-700 print:border-gray-300">
                          <td className="pt-4 pb-1 text-right" colSpan={2}>
                            <span className="text-gray-400 print:text-white">Subtotal</span>
                          </td>
                          <td className="pt-4 pb-1 text-right font-medium text-midasbuy-blue">
                            ${transactionDetails.amount}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1 text-right" colSpan={2}>
                            <span className="text-gray-400 print:text-white">Tax</span>
                          </td>
                          <td className="py-1 text-right font-medium text-midasbuy-blue">$0.00</td>
                        </tr>
                        <tr className="border-t border-gray-700 print:border-gray-300">
                          <td className="pt-4 text-right" colSpan={2}>
                            <span className="text-base font-bold text-white">Total</span>
                          </td>
                          <td className="pt-4 text-right text-midasbuy-gold font-bold">
                            ${transactionDetails.amount}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 relative z-10">
                  <div className="md:w-1/3 flex flex-col items-center">
                    <div className="bg-white p-2 mb-2">
                      <img 
                        src="/lovable-uploads/a8a6c62b-0b19-42ae-8eea-f7a0999b2395.png" 
                        alt="Verification QR Code" 
                        className="w-32 h-32"
                      />
                    </div>
                    <p className="text-xs text-center text-gray-400 print:text-white">
                      Scan to verify
                    </p>
                  </div>
                  
                  <div className="md:w-2/3">
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <Shield className="w-4 h-4 mr-2 text-midasbuy-gold" />
                        <h4 className="text-sm font-bold text-gray-400 print:text-white uppercase tracking-wider">
                          Security Notice
                        </h4>
                      </div>
                      <p className="text-xs text-gray-400 print:text-white italic mb-4">
                        System-generated receipt. Tampering invalidates authenticity.
                        This receipt serves as proof of purchase. Keep for your records.
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <HelpCircle className="w-4 h-4 mr-2 text-midasbuy-blue" />
                        <h4 className="text-sm font-bold text-gray-400 print:text-white uppercase tracking-wider">
                          Support Contact
                        </h4>
                      </div>
                      <div className="text-xs text-orange-500">
                        <p>Email: support@midasbuy.com</p>
                        <p>Phone: +1-800-7349908</p>
                        <p>Website: www.midasbuy.com</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="hidden print:block text-center mt-8 pt-8 border-t border-gray-300 text-xs text-white">
                  <p>© 2023 Midasbuy. All Rights Reserved.</p>
                </div>
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
                    onClick={handleDownloadReceipt}
                    disabled={isDownloading}
                    className="bg-midasbuy-blue hover:bg-blue-600"
                  >
                    {isDownloading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Downloading...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-4 w-4" />
                        Download Receipt
                      </>
                    )}
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
              color: white;
            }
          }
        `
      }} />
    </div>
  );
};

export default ThankYouPage;
