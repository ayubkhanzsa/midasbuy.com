import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAnimationDuration } from "@/hooks/use-mobile";
import { convertAndFormatPrice } from "@/utils/currencyUtils";
import { useEffect, useState } from "react";
import { Coins } from "lucide-react";

interface Package {
  id: string;
  image: string;
  baseAmount: number;
  bonusAmount: number;
  bonusPercent?: string;
  price: number;
  originalPrice: number;
  discount: string;
}

interface HonorOfKingsPackageGridProps {
  packages: Package[];
  selectedCountry: {
    currency: string;
    [key: string]: any;
  };
}

const HonorOfKingsPackageGrid = ({ packages, selectedCountry }: HonorOfKingsPackageGridProps) => {
  const slowAnimationDuration = useAnimationDuration('slow');
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  useEffect(() => {
    // Preload all package images
    packages.forEach(pkg => {
      const img = new Image();
      img.src = pkg.image;
      img.onload = () => {
        setImagesLoaded(prev => ({
          ...prev,
          [pkg.id]: true
        }));
      };
    });

    // Also preload the token icon for better performance
    const tokenIcon = new Image();
    tokenIcon.src = "/lovable-uploads/66f224af-167c-45ac-9981-180dd2bf927d.png";
    
    // And the Midasbuy logo
    const midasbuyLogo = new Image();
    midasbuyLogo.src = "/lovable-uploads/7ef942ba-efa8-4e8f-9282-d86c01b1e909.png";
    
    // Preload the honor of kings currency icon
    const honorIcon = new Image();
    honorIcon.src = "/lovable-uploads/fc143449-9fb4-4203-8027-be50aebec0eb.png";
  }, [packages]);

  const handlePackageClick = (pkg: Package) => {
    navigate(`/honor-of-kings/purchase/${pkg.id}`);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
      {packages.map((pkg, index) => (
        <motion.div
          key={pkg.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
          onClick={() => handlePackageClick(pkg)}
          className="cursor-pointer"
        >
          <div className="bg-midasbuy-navy rounded-lg overflow-hidden h-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,145,255,0.3)] border border-midasbuy-navy hover:border-midasbuy-blue/50">
              <div className="p-4 flex justify-center">
                <motion.img 
                  src={pkg.image}
                  alt="Honor of Kings Tokens" 
                  className={`object-contain ${['8tokens', '16tokens', '23tokens', '80tokens'].includes(pkg.id) ? 'h-10 sm:h-12' : ['240tokens', '400tokens', '560tokens', '800tokens'].includes(pkg.id) ? 'h-12 sm:h-16' : 'h-16 sm:h-20'} transition-opacity duration-200 ${imagesLoaded[pkg.id] ? 'opacity-100' : 'opacity-0'}`}
                  animate={{ 
                    y: [0, -8, 0, 8, 0] 
                  }}
                  transition={{ 
                    duration: slowAnimationDuration,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  loading="eager"
                />
              </div>
              
              <div className="p-3 sm:p-4 pt-1">
                {pkg.bonusPercent && (
                  <div className="flex justify-end">
                    <div className="inline-block rounded-md bg-[#FFDD33] px-1 sm:px-2 py-0.5 text-xs sm:text-sm font-bold text-black">
                      {pkg.bonusPercent}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center mb-2 sm:mb-3">
                  <div className="token-icon mr-1 sm:mr-2">
                    <img 
                      src="/lovable-uploads/66f224af-167c-45ac-9981-180dd2bf927d.png" 
                      alt="Token" 
                      className="w-4 h-4 sm:w-5 sm:h-5" 
                      loading="eager"
                    />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-white">{pkg.baseAmount}</span>
                  {pkg.bonusAmount > 0 && (
                    <span className="text-base sm:text-lg font-semibold text-midasbuy-gold ml-1">+{pkg.bonusAmount}</span>
                  )}
                </div>
                
                <div className="flex flex-col">
                  <span className="text-midasbuy-gold text-xs sm:text-sm">From</span>
                  <div className="flex items-center">
                    <img 
                      src="/lovable-uploads/fc143449-9fb4-4203-8027-be50aebec0eb.png"
                      alt="Honor of Kings Currency"
                      className="h-4 w-4 mr-1 text-midasbuy-gold"
                    />
                    <span className="text-lg sm:text-xl font-bold text-white">
                      {convertAndFormatPrice(pkg.price, selectedCountry.currency)}
                    </span>
                  </div>
                  
                  {pkg.originalPrice > pkg.price && (
                    <div className="flex items-center ml-5">
                      <span className="text-xs sm:text-sm text-gray-400 line-through">
                        {convertAndFormatPrice(pkg.originalPrice, selectedCountry.currency)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex">
                <div className="bg-[#FF9900] text-black font-semibold py-1 px-1 sm:px-3 text-xs sm:text-sm flex items-center">
                  {pkg.discount}
                </div>
                <div className="bg-white text-black font-semibold py-1 px-1 sm:px-3 text-xs sm:text-sm flex-grow flex items-center ml-1 justify-between">
                  <span className="font-bold truncate">Midasbuy Only</span>
                  <img 
                    src="/lovable-uploads/7ef942ba-efa8-4e8f-9282-d86c01b1e909.png" 
                    alt="Midasbuy Logo" 
                    className="h-5 sm:h-6 ml-1" 
                    loading="eager"
                  />
                </div>
              </div>
            </div>
        </motion.div>
      ))}
    </div>
  );
};

export default HonorOfKingsPackageGrid;
