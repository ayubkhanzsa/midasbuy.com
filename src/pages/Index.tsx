import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Filter, ChevronDown, Shield, Lock, FileText, HelpCircle, Info } from "lucide-react";
import Header from "@/components/Header";
import { ucPackages, getSelectedCountry } from "@/data/ucPackages";
import { Button } from "@/components/ui/button";
import { useMobile, useResponsive, useAnimationDuration } from "@/hooks/use-mobile";
import { convertAndFormatPrice } from "@/utils/currencyUtils";

interface IndexProps {
  onLogout: () => void;
}

const Index = ({ onLogout }: IndexProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showPromotion, setShowPromotion] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(getSelectedCountry());
  const navigate = useNavigate();
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const slowAnimationDuration = useAnimationDuration('slow');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'selectedCountry' && e.newValue) {
        try {
          setSelectedCountry(JSON.parse(e.newValue));
        } catch (error) {
          console.error('Error parsing country from storage event:', error);
        }
      }
    };

    const handleCountryChanged = () => {
      setSelectedCountry(getSelectedCountry());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('countryChanged', handleCountryChanged);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('countryChanged', handleCountryChanged);
    };
  }, []);

  useEffect(() => {
    const storedCountry = getSelectedCountry();
    if (JSON.stringify(storedCountry) !== JSON.stringify(selectedCountry)) {
      setSelectedCountry(storedCountry);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-midasbuy-darkBlue">
        <div className="text-center">
          <img src="/lovable-uploads/c6fd77e7-3682-428e-8154-140308b4a06b.png" alt="Logo" className="h-10 mx-auto mb-6 animate-pulse-subtle" />
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

  const PrivacyPolicyModal = () => (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-midasbuy-navy border border-midasbuy-blue/20 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-midasbuy-navy/95 backdrop-blur-md p-4 border-b border-gray-700 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/lovable-uploads/c6fd77e7-3682-428e-8154-140308b4a06b.png" alt="Logo" className="h-8 mr-3" />
            <h2 className="text-xl font-bold text-white">Privacy Policy</h2>
          </div>
          <button 
            onClick={() => setShowPrivacyPolicy(false)}
            className="text-gray-400 hover:text-white p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 text-gray-300">
          <section className="mb-8">
            <h3 className="text-xl text-white font-bold mb-4">Introduction</h3>
            <p className="mb-4">
              This Privacy Policy ("Policy") explains how MidasBuy collects, uses, and discloses your information when you use our website, products, and services. We are committed to ensuring the privacy and security of your personal information.
            </p>
            <p>
              By using MidasBuy, you agree to the collection and use of information in accordance with this Policy. We will not use or share your information with anyone except as described in this Privacy Policy.
            </p>
          </section>
          
          <section className="mb-8">
            <h3 className="text-xl text-white font-bold mb-4">Information Collection and Use</h3>
            <p className="mb-4">
              We collect several different types of information for various purposes to provide and improve our service to you:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="text-white font-medium">Personal Data:</span> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you, including but not limited to your name, email address, phone number, and payment information.
              </li>
              <li>
                <span className="text-white font-medium">Game Account Information:</span> To facilitate purchases and ensure proper delivery of in-game items, we collect your game ID, username, and related information.
              </li>
              <li>
                <span className="text-white font-medium">Transaction Data:</span> We keep records of the products you purchase, transaction amount, and payment methods used.
              </li>
              <li>
                <span className="text-white font-medium">Usage Data:</span> We collect information on how the Service is accessed and used, including your computer's Internet Protocol address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.
              </li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h3 className="text-xl text-white font-bold mb-4">Data Security</h3>
            <p className="mb-4">
              The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>All sensitive information is transmitted via Secure Socket Layer (SSL) technology.</li>
              <li>All payment information is encrypted using industry-standard methods.</li>
              <li>We regularly review our information collection, storage, and processing practices to protect against unauthorized access.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h3 className="text-xl text-white font-bold mb-4">Third-Party Disclosure</h3>
            <p>
              We may disclose your Personal Data in the good faith belief that such action is necessary to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Comply with a legal obligation</li>
              <li>Protect and defend the rights or property of MidasBuy</li>
              <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
              <li>Protect the personal safety of users of the Service or the public</li>
              <li>Protect against legal liability</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h3 className="text-xl text-white font-bold mb-4">Your Rights</h3>
            <p className="mb-4">
              You have the right to access, update, or delete the information we have on you. Whenever made possible, you can:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Update your personal information by logging into your account</li>
              <li>Request access to the personal data we hold about you</li>
              <li>Request correction of any inaccurate data</li>
              <li>Request deletion of your personal data (subject to certain conditions)</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing your personal data</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h3 className="text-xl text-white font-bold mb-4">Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-2 p-4 bg-midasbuy-darkBlue/50 rounded-lg">
              <p className="font-medium text-white">MidasBuy Support</p>
              <p>Email: privacy@midasbuy.com</p>
              <p>Address: One MidasBuy Plaza, Gaming District, CA 90210, USA</p>
            </div>
          </section>
          
          <div className="mt-6 flex justify-center">
            <Button 
              onClick={() => setShowPrivacyPolicy(false)}
              className="bg-midasbuy-blue hover:bg-blue-600 px-8"
            >
              I Understand
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const navLinks = [
    { name: "PURCHASE", path: "/" },
    { name: "REDEEM", path: "/redeem" },
    { name: "SHOP", path: "/shop" },
    { name: "EVENTS", path: "/events" },
  ];

  const NavigationTabs = () => (
    <div className="mb-6 overflow-x-auto pb-1 mt-4">
      <div className="flex min-w-max border-b border-gray-700">
        {navLinks.map((link, index) => (
          <button 
            key={link.path}
            onClick={() => handleNavigate(link.path)}
            className={`text-${link.path === '/' ? 'white' : 'gray-400'} font-bold tracking-wide px-4 sm:px-6 py-2 relative hover:text-gray-200 transition-colors text-sm`}
          >
            {link.name}
            {link.path === '/' && <span className="absolute bottom-0 left-0 w-full h-1 bg-midasbuy-blue"></span>}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-midasbuy-darkBlue overflow-x-hidden relative">
      {isMobile && (
        <>
          <div className="mobile-header-banner"></div>
          <div className="mobile-header-overlay"></div>
        </>
      )}
      
      <div className={isMobile ? 'mobile-header' : ''}>
        <Header onLogout={onLogout} />
      </div>
      
      <main className={`pt-20 pb-20 relative ${isMobile ? 'mobile-content mobile-main-container' : 'z-10'}`}>
        <div className="absolute top-0 left-0 w-full flex justify-center items-center">
          {!isMobile && (
            <img 
              src="/lovable-uploads/28985189-d7e6-4b78-b392-1c1c9fcaff88.png" 
              alt="Banner"
              className="w-full h-auto object-cover md:object-contain"
              style={{ 
                width: '100%', 
                maxWidth: '1440px',
                maxHeight: isDesktop ? '350px' : isTablet ? '300px' : '180px',
              }}
            />
          )}
        </div>
        
        <div className={`container mx-auto px-4 ${isMobile ? 'mobile-main-container' : ''}`}>
          <div className="flex flex-col md:flex-row items-start mb-6 relative">
            <div className="flex-grow z-10">
              <div className="flex items-center mb-3">
                <img 
                  src="/lovable-uploads/072f88f4-7402-4591-b3e4-11f57bb0e9ea.png" 
                  alt="PUBG Mobile" 
                  className={`w-[35px] mr-3 rounded-md ${isMobile ? 'mobile-pubg-icon' : ''}`}
                />
                <h1 className={`text-3xl md:text-4xl text-white font-bold tracking-wide ${isMobile ? 'mobile-pubg-title' : ''}`}>PUBG MOBILE</h1>
              </div>
              
              <div className="flex items-center space-x-2 mb-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/90 text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Official
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/90 text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.44 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Subscribed
                </span>
              </div>
              
              <div className="mt-1">
                <button className="btn-primary inline-flex items-center text-sm py-1 px-3">
                  <span>Enter Your Player ID Now</span>
                  <ChevronDown className="ml-1 w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
          
          <NavigationTabs />
          
          {showPromotion && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-gradient-to-r from-midasbuy-darkGold/30 to-midasbuy-gold/20 rounded-lg p-3 flex items-center relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 text-xs text-black font-medium bg-midasbuy-gold py-1 px-2 rounded-br-md">
                Ends in 2023-03-08
              </div>
              
              <div className="ml-8 flex-grow py-2">
                <p className="text-gray-200 font-medium text-sm">
                  <span className="text-midasbuy-gold font-bold">Recharging 60UC, 300UC, or 600UC</span> will get you the Classic Crate Voucher (30 UC). One purchase per day, three times in total.
                </p>
              </div>
              
              <button className="flex-shrink-0 bg-white text-midasbuy-navy font-bold rounded-full h-8 w-8 flex items-center justify-center">
                GO
              </button>
              
              <button 
                onClick={() => setShowPromotion(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </motion.div>
          )}
          
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
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {filteredPackages.map((pkg, index) => (
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
        </div>
      </main>
      
      <footer className="bg-midasbuy-navy py-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <img src="/lovable-uploads/c6fd77e7-3682-428e-8154-140308b4a06b.png" alt="Logo" className="h-8 mr-3" />
                <h3 className="text-lg font-bold text-white"></h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                The official platform for purchasing in-game currency and items for PUBG Mobile and other popular games.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/midasbuy" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                  <img src="/lovable-uploads/c5f69ab8-8e1f-4dc8-ac6f-26dcd8ca689e.png" alt="Facebook" className="w-8 h-8 md:w-10 md:h-10" />
                </a>
                <a href="https://www.instagram.com/midasbuyofficial" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                  <img src="/lovable-uploads/610a898a-ddc9-4d5a-ba8a-22267533d657.png" alt="Instagram" className="w-8 h-8 md:w-10 md:h-10" />
                </a>
                <a href="https://www.youtube.com/c/midasbuy" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                  <img src="/lovable-uploads/a7059e67-d794-41f1-b455-26ed6c2abc84.png" alt="YouTube" className="w-8 h-8 md:w-10 md:h-10" />
                </a>
                <a href="https://www.tiktok.com/@midasbuy" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                  <img src="/lovable-uploads/35cfa48b-6ce7-4b2c-b0a7-79d5c222a691.png" alt="TikTok" className="w-8 h-8 md:w-10 md:h-10" />
                </a>
                <a href="https://twitter.com/midasbuy" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                  <img src="/lovable-uploads/d2923e15-4d3d-4b89-97b8-22c6e8e870d0.png" alt="X (Twitter)" className="w-8 h-8 md:w-10 md:h-10" />
                </a>
                <a href="https://discord.gg/midasbuy" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                  <img src="/lovable-uploads/3bded7ee-e136-4831-a460-c6df65f3ca79.png" alt="Discord" className="w-8 h-8 md:w-10 md:h-10" />
                </a>
                <a href="https://www.reddit.com/r/midasbuy" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                  <img src="/lovable-uploads/92464c86-8a49-47b7-8a25-343840caec7f.png" alt="Reddit" className="w-8 h-8 md:w-10 md:h-10" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Payment Issues</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li>
                  <button 
                    className="hover:text-white transition-colors"
                    onClick={() => setShowPrivacyPolicy(true)}
                  >
                    Privacy Policy
                  </button>
                </li>
                <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Copyright Notice</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-6 pb-2">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <p className="text-xs text-gray-500">
                  © 2025 MidasBuy. All rights reserved. All trademarks referenced herein are the properties of their respective owners.
                </p>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-gray-500 mr-3">Secure Payment:</span>
                <div className="flex flex-wrap gap-2 items-center">
                  <img src="/lovable-uploads/4c4d35fa-bd7e-4ba9-8153-5ff41254770b.png" alt="Payment Methods" className="h-8 object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {showPrivacyPolicy && <PrivacyPolicyModal />}
    </div>
  );
};

export default Index;
