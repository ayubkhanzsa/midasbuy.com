
import { motion } from "framer-motion";

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen = ({ message = "Loading PUBG Mobile..." }: LoadingScreenProps) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="min-h-screen flex items-center justify-center bg-midasbuy-darkBlue"
  >
    <div className="text-center">
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
