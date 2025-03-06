
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useResponsive } from '@/hooks/use-mobile';
import FeatureBoxesCarousel from './FeatureBoxesCarousel';

const AboutMidasbuy = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { isMobile } = useResponsive();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/lovable-uploads/decafc18-49f3-42c9-83f5-64a5c5f9c3c7.png";
    img.onload = () => setIsImageLoaded(true);
  }, []);

  return (
    <div className="py-12 relative">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img 
          src="/lovable-uploads/decafc18-49f3-42c9-83f5-64a5c5f9c3c7.png" 
          alt="Games Background" 
          className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-25' : 'opacity-0'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isImageLoaded ? 0.25 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-midasbuy-navy/70"></div>
      </div>
      
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl text-white font-bold">ABOUT MIDASBUY</h2>
          
          <div className="mt-8">
            <div className="bg-gradient-to-br from-midasbuy-navy/80 to-midasbuy-navy/40 rounded-xl p-6 backdrop-blur-sm border border-white/10">
              <h3 className="text-3xl md:text-4xl text-white font-bold mb-6">
                PAY SAFE, FAST AND FUN WITH MIDASBUY.
              </h3>
              
              <div className="flex items-center justify-start mb-6">
                <span className="text-xl text-white font-semibold mr-2">TENCENT</span>
                <span className="mx-2 text-white">|</span>
                <motion.img 
                  src="/lovable-uploads/edac9bb3-e3c4-4e95-b6ac-a20ef2194d6f.png" 
                  alt="Tencent Logo" 
                  className="h-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              <p className="text-gray-300 text-lg">
                Midasbuy is the official recharge store by Tencent. We have established official partnerships with <span className="text-white font-semibold">30</span> game companies and game studios around the world to jointly create a safe and convenient recharge store for <span className="text-white font-semibold">ten of millions</span> players.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <FeatureBoxesCarousel />
        </div>
      </div>
    </div>
  );
};

export default AboutMidasbuy;
