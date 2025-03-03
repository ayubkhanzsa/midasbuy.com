
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Filter, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import { ucPackages } from "@/data/ucPackages";

interface IndexProps {
  onLogout: () => void;
}

const Index = ({ onLogout }: IndexProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showPromotion, setShowPromotion] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-midasbuy-darkBlue">
        <div className="text-center">
          <img src="/logo.svg" alt="MidasBuy" className="h-10 mx-auto mb-6 animate-pulse-subtle" />
          <div className="w-12 h-12 border-4 border-midasbuy-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-400 animate-pulse">Loading PUBG Mobile...</p>
        </div>
      </div>
    );
  }

  const filteredPackages = filter === "all" 
    ? ucPackages 
    : ucPackages.filter(pkg => {
        if (filter === "small" && pkg.baseAmount <= 600) return true;
        if (filter === "medium" && pkg.baseAmount > 600 && pkg.baseAmount <= 6000) return true;
        if (filter === "large" && pkg.baseAmount > 6000) return true;
        return false;
      });

  return (
    <div className="min-h-screen bg-midasbuy-darkBlue overflow-x-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 w-full h-[70vh] bg-hero-pattern bg-cover bg-center opacity-20 z-0"></div>
      </div>
      
      <Header onLogout={onLogout} />
      
      <main className="pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center mb-10">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              <img 
                src="https://cdn.midasbuy.com/images/Apps/pubgm/logo/ico_pubgm_new.png" 
                alt="PUBG Mobile" 
                className="w-[120px]"
              />
            </div>
            
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <h1 className="text-3xl font-bold text-white mb-2 md:mb-0 md:mr-4">PUBG MOBILE</h1>
                <div className="flex space-x-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-midasbuy-blue/20 text-midasbuy-blue border border-midasbuy-blue/30">
                    Official
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                    Subscribed
                  </span>
                </div>
              </div>
              
              <button className="mt-4 btn-primary inline-flex items-center">
                <span>Enter Your Player ID Now</span>
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Navigation tabs */}
          <div className="mb-8 overflow-x-auto pb-1">
            <div className="flex min-w-max border-b border-gray-700">
              <button className="text-white font-medium px-6 py-3 relative active">
                PURCHASE
                <span className="absolute bottom-0 left-0 w-full h-1 bg-midasbuy-blue"></span>
              </button>
              <button className="text-gray-400 font-medium px-6 py-3 hover:text-gray-200 transition-colors">
                REDEEM
              </button>
              <button className="text-gray-400 font-medium px-6 py-3 hover:text-gray-200 transition-colors">
                SHOP
              </button>
              <button className="text-gray-400 font-medium px-6 py-3 hover:text-gray-200 transition-colors">
                EVENTS
              </button>
            </div>
          </div>
          
          {/* Promotion banner */}
          {showPromotion && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 bg-gradient-to-r from-midasbuy-darkGold/30 to-midasbuy-gold/20 rounded-lg p-4 flex items-center relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 text-xs text-black font-medium bg-midasbuy-gold py-1 px-2 rounded-br-md">
                Ends in 2023-03-08
              </div>
              
              <div className="ml-8 flex-grow py-3">
                <p className="text-gray-200 font-medium">
                  <span className="text-midasbuy-gold font-bold">Recharging 60UC, 300UC, or 600UC</span> will get you the Classic Crate Voucher (30 UC). One purchase per day, three times in total.
                </p>
              </div>
              
              <button className="flex-shrink-0 bg-white text-midasbuy-navy font-bold rounded-full h-10 w-10 flex items-center justify-center">
                GO
              </button>
              
              <button 
                onClick={() => setShowPromotion(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </motion.div>
          )}
          
          {/* Filter controls */}
          <div className="flex flex-wrap justify-between items-center mb-6">
            <div className="mb-4 sm:mb-0">
              <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-midasbuy-navy">
                <div className="text-sm text-gray-300 font-medium mr-2">PAYMENT CHANNELS</div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="mr-4 flex items-center space-x-2 px-4 py-2 rounded-lg bg-midasbuy-navy">
                <div className="text-sm text-gray-300 font-medium">UC</div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              
              <button className="px-4 py-2 rounded-lg bg-midasbuy-navy flex items-center">
                <Filter className="w-5 h-5 mr-2 text-gray-300" />
                <span className="text-sm text-gray-300 font-medium">Filter</span>
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <button className="inline-flex items-center px-4 py-2 rounded-full bg-midasbuy-blue/10 text-midasbuy-blue text-sm hover:bg-midasbuy-blue/20 transition-colors">
              <span>Try filtering to find product faster!</span>
            </button>
          </div>
          
          {/* UC packages grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link to={`/purchase/${pkg.id}`} className="block">
                  <div className="uc-card p-5">
                    {pkg.discount && (
                      <div className="discount-tag">
                        <span>{pkg.discount}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center mb-3">
                      <img src={pkg.image} alt={`${pkg.baseAmount} UC`} className="w-[80px] mr-4" />
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex items-baseline">
                        <img src="https://cdn.midasbuy.com/images/UC_1d666b1.png" alt="UC" className="w-[22px] mr-1" />
                        <span className="gold-text text-2xl">{pkg.baseAmount}</span>
                        {pkg.bonusAmount > 0 && (
                          <span className="text-midasbuy-gold ml-1">+{pkg.bonusAmount}</span>
                        )}
                        
                        {pkg.bonusPercent && (
                          <span className="ml-2 text-xs px-2 py-0.5 rounded bg-midasbuy-gold/20 text-midasbuy-gold">
                            {pkg.bonusPercent}
                          </span>
                        )}
                      </div>
                      
                      <div className="mt-3">
                        <span className="text-midasbuy-gold font-medium text-lg">From {pkg.price.toFixed(2)} USD</span>
                        {pkg.originalPrice > pkg.price && (
                          <span className="text-gray-400 line-through text-sm ml-2">
                            {pkg.originalPrice.toFixed(2)} USD
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="absolute bottom-3 right-3">
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        <span>Midasbuy Only</span>
                        <svg className="w-4 h-4 ml-1 animate-pulse-subtle" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16 8L8 16M8 8L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      
      <footer className="bg-midasbuy-navy py-6 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400 text-sm">
            <p>© 2023 PUBG MOBILE. All Rights Reserved.</p>
            <div className="mt-2">
              <a href="#" className="text-gray-400 hover:text-gray-300 mx-2">Terms of Service</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-gray-300 mx-2">Privacy Policy</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-gray-300 mx-2">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
