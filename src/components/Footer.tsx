
import { Link } from "react-router-dom";
import { useState } from "react";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import SocialMediaIcons from "./SocialMediaIcons";

const Footer = () => {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  return (
    <footer className="bg-midasbuy-navy py-8 relative z-10">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="mb-4 flex justify-center">
            <img src="/lovable-uploads/c6fd77e7-3682-428e-8154-140308b4a06b.png" alt="Logo" className="h-10 transform hover:scale-110 transition-transform" />
          </div>
          <p className="text-gray-400 text-sm mb-4 text-center">
            The official platform for purchasing in-game currency and items for PUBG Mobile and other popular games.
          </p>
          
          <SocialMediaIcons />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/help-center" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/contact-us" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/faqs" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/payment-issues" className="hover:text-white transition-colors">Payment Issues</Link></li>
              <li><Link to="/security" className="hover:text-white transition-colors">Security</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li>
                <button 
                  className="hover:text-white transition-colors"
                  onClick={() => setShowPrivacyPolicy(true)}
                >
                  Privacy Policy
                </button>
              </li>
              <li><Link to="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link></li>
              <li><Link to="/copyright-notice" className="hover:text-white transition-colors">Copyright Notice</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">About Us</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/about-midasbuy" className="hover:text-white transition-colors">About MidasBuy</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/press" className="hover:text-white transition-colors">Press</Link></li>
              <li><Link to="/partners" className="hover:text-white transition-colors">Partners</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 pb-2">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center mb-4 space-x-4">
              <img 
                src="/lovable-uploads/57ffc683-59b7-4970-9c91-977479b64214.png" 
                alt="PCI DSS Compliant" 
                className="h-10 md:h-12"
              />
              <img 
                src="/lovable-uploads/17590eb9-a257-432b-bd97-5ccfa3ee5ed5.png" 
                alt="AICPA SOC" 
                className="h-10 md:h-12"
              />
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">
                © 2025 MidasBuy. All rights reserved. All trademarks referenced herein are the properties of their respective owners.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {showPrivacyPolicy && <PrivacyPolicyModal onClose={() => setShowPrivacyPolicy(false)} />}
    </footer>
  );
};

export default Footer;
