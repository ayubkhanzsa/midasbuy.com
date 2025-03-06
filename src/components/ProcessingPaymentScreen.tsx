
import { motion } from "framer-motion";

interface ProcessingPaymentScreenProps {
  paymentMethod: string;
}

const ProcessingPaymentScreen = ({ paymentMethod }: ProcessingPaymentScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="bg-midasbuy-navy/90 border border-midasbuy-blue/30 rounded-xl p-8 max-w-md w-full mx-4 shadow-xl">
        <img 
          src="/lovable-uploads/c6fd77e7-3682-428e-8154-140308b4a06b.png" 
          alt="Logo" 
          className="h-10 mx-auto mb-6 animate-pulse-subtle" 
        />
        
        <div className="flex flex-col items-center">
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 border-4 border-midasbuy-blue/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-midasbuy-blue border-t-transparent rounded-full animate-spin"></div>
            
            {paymentMethod === "card" ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/83bab1f5-3ee2-4dd1-ab6e-7baab1fa72d1.png" 
                  alt="Credit Card" 
                  className="h-8" 
                />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/2cabc096-1cf2-484c-9608-bca24f15e622.png" 
                  alt="PayPal" 
                  className="h-8" 
                />
              </div>
            )}
          </div>
          
          <h2 className="text-xl font-bold text-white mb-2">Processing Payment</h2>
          <p className="text-gray-300 text-center mb-4">
            {paymentMethod === "card" 
              ? "Your card is being charged. Please do not close this window."
              : "Connecting to PayPal. Please do not close this window."
            }
          </p>
          
          <div className="w-full max-w-xs bg-midasbuy-darkBlue/50 rounded-full h-2 overflow-hidden">
            <motion.div 
              className="h-full bg-midasbuy-blue"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
            />
          </div>
          
          <div className="mt-6 text-sm text-gray-400">
            <div className="flex flex-wrap justify-center gap-2">
              <div className="flex items-center px-3 py-1 bg-midasbuy-darkBlue/50 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span>Secure Connection</span>
              </div>
              <div className="flex items-center px-3 py-1 bg-midasbuy-darkBlue/50 rounded-full">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                <span>Processing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProcessingPaymentScreen;
