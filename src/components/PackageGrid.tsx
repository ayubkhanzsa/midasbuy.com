
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAnimationDuration } from "@/hooks/use-mobile";
import { convertAndFormatPrice } from "@/utils/currencyUtils";

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

interface PackageGridProps {
  packages: Package[];
  selectedCountry: {
    currency: string;
    [key: string]: any;
  };
}

const PackageGrid = ({ packages, selectedCountry }: PackageGridProps) => {
  const slowAnimationDuration = useAnimationDuration('slow');

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
      {packages.map((pkg, index) => (
        <motion.div
          key={pkg.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Link to={`/purchase/${pkg.id}`} className="block">
            <div className="bg-midasbuy-navy rounded-lg overflow-hidden h-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,145,255,0.3)] border border-midasbuy-navy hover:border-midasbuy-blue/50">
              <div className="p-4 flex justify-center">
                <motion.img 
                  src={pkg.image}
                  alt="UC Coins" 
                  className={`object-contain ${['60uc', '300uc'].includes(pkg.id) ? 'h-10 sm:h-12' : ['600uc', '1500uc'].includes(pkg.id) ? 'h-12 sm:h-16' : 'h-16 sm:h-20'}`}
                  animate={{ 
                    y: [0, -8, 0, 8, 0] 
                  }}
                  transition={{ 
                    duration: slowAnimationDuration,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
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
                  <div className="uc-icon mr-1 sm:mr-2">
                    <img src="/lovable-uploads/f6594fcb-d2eb-4e92-9f21-fe5959fa5360.png" alt="UC" className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-white">{pkg.baseAmount}</span>
                  {pkg.bonusAmount > 0 && (
                    <span className="text-base sm:text-lg font-semibold text-midasbuy-gold ml-1">+{pkg.bonusAmount}</span>
                  )}
                </div>
                
                <div className="flex flex-col">
                  <span className="text-midasbuy-gold text-xs sm:text-sm">From</span>
                  <span className="text-lg sm:text-xl font-bold text-white">
                    {convertAndFormatPrice(pkg.price, selectedCountry.currency)}
                  </span>
                  
                  {pkg.originalPrice > pkg.price && (
                    <span className="text-xs sm:text-sm text-gray-400 line-through">
                      {convertAndFormatPrice(pkg.originalPrice, selectedCountry.currency)}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex">
                <div className="bg-[#FF9900] text-black font-semibold py-1 px-1 sm:px-3 text-xs sm:text-sm flex items-center">
                  {pkg.discount}
                </div>
                <div className="bg-white text-black font-semibold py-1 px-1 sm:px-3 text-xs sm:text-sm flex-grow flex items-center ml-1 justify-between">
                  <span className="font-bold truncate">Midasbuy Only</span>
                  <img src="/lovable-uploads/7ef942ba-efa8-4e8f-9282-d86c01b1e909.png" alt="Midasbuy Logo" className="h-5 sm:h-6 ml-1" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default PackageGrid;
