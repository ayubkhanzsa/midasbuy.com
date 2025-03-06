
import { motion } from "framer-motion";

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen = ({ message = "Loading PUBG Mobile..." }: LoadingScreenProps) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="min-h-screen flex items-center justify-center bg-midasbuy-darkBlue relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-full h-full">
      <img 
        src="/lovable-uploads/0fbc8835-de81-43f1-b68d-6b85ab444851.png" 
        alt="Background" 
        className="w-full h-full object-cover opacity-50"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-midasbuy-darkBlue/60 to-midasbuy-darkBlue/95"></div>
    </div>
    
    <div className="text-center relative z-10">
      <img 
        src="/lovable-uploads/c6fd77e7-3682-428e-8154-140308b4a06b.png" 
        alt="Logo" 
        className="h-10 mx-auto mb-6 animate-pulse-subtle" 
      />
      <div className="w-12 h-12 border-4 border-midasbuy-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-gray-400 animate-pulse">{message}</p>
    </div>
  </motion.div>
);

export default LoadingScreen;
