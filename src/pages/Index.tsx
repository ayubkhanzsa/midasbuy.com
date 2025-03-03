
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Filter, ChevronDown, Shield, Lock, FileText, HelpCircle, Info } from "lucide-react";
import Header from "@/components/Header";
import { ucPackages } from "@/data/ucPackages";
import { Button } from "@/components/ui/button";

interface IndexProps {
  onLogout: () => void;
}

const Index = ({ onLogout }: IndexProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showPromotion, setShowPromotion] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

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
          <img src="/midasbuy-logo.png" alt="MidasBuy" className="h-10 mx-auto mb-6 animate-pulse-subtle" />
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
            <img src="/midasbuy-logo.png" alt="MidasBuy" className="h-8 mr-3" />
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
                src="/pubg-character-logo.png" 
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
      
      <footer className="bg-midasbuy-navy py-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <img src="/midasbuy-logo.png" alt="MidasBuy" className="h-8 mr-3" />
                <h3 className="text-lg font-bold text-white">MidasBuy</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                The official platform for purchasing in-game currency and items for PUBG Mobile and other popular games.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => setShowPrivacyPolicy(true)}
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    <span>Privacy Policy</span>
                  </button>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    <span>Terms of Service</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <Lock className="w-4 h-4 mr-2" />
                    <span>Security</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    <span>Refund Policy</span>
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    <span>FAQ</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">help@midasbuy.com</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">+1 (800) 123-4567</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-6 text-center">
            <p className="text-gray-400 text-sm">© 2023 PUBG MOBILE. All Rights Reserved.</p>
            <p className="text-gray-500 text-xs mt-2">PUBG MOBILE is a trademark of KRAFTON, Inc. Midasbuy is an official partner authorized by KRAFTON, Inc.</p>
          </div>
        </div>
      </footer>

      {showPrivacyPolicy && <PrivacyPolicyModal />}
    </div>
  );
};

export default Index;
