
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen = ({ message = "Loading PUBG Mobile..." }: LoadingScreenProps) => {
  const [logoLoaded, setLogoLoaded] = useState(false);
  
  useEffect(() => {
    // Preload the logo
    const img = new Image();
    img.src = "/lovable-uploads/c6fd77e7-3682-428e-8154-140308b4a06b.png";
    img.onload = () => setLogoLoaded(true);
    
    // Also preload critical UI elements
    const criticalImages = [
      "/lovable-uploads/072f88f4-7402-4591-b3e4-11f57bb0e9ea.png", // PUBG Mobile icon
      "/lovable-uploads/28985189-d7e6-4b78-b392-1c1c9fcaff88.png"  // Banner
    ];
    
    criticalImages.forEach(src => {
      const preloadImg = new Image();
      preloadImg.src = src;
    });
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-midasbuy-darkBlue"
    >
      <div className="text-center">
        <motion.img 
          src="/lovable-uploads/c6fd77e7-3682-428e-8154-140308b4a06b.png" 
          alt="Logo" 
          className="h-10 mx-auto mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: logoLoaded ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
        <div className="w-12 h-12 border-4 border-midasbuy-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-400">{message}</p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
