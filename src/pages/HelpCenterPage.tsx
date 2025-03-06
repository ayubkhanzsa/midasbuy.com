
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Phone, Mail, HelpCircle, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

interface HelpCenterPageProps {
  onLogout: () => void;
}

const HelpCenterPage = ({ onLogout }: HelpCenterPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-midasbuy-navy to-black text-white">
      <Header onLogout={onLogout} />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-gray-300 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span>Back to Home</span>
            </Link>
          </div>
          
          <div className="glass-effect p-8 rounded-xl mb-10">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-midasbuy-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="w-12 h-12 text-midasbuy-blue" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Help Center</h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Get support for all your Midasbuy needs. We're here to help with your purchases, account issues, and any questions you might have.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-effect p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-midasbuy-gold" />
                  Contact by Phone
                </h2>
                <p className="text-gray-300 mb-4">
                  Our support team is available 24/7 to assist you with any issues or questions.
                </p>
                <div className="p-4 bg-midasbuy-navy/30 rounded-lg">
                  <p className="font-medium text-white">International Support:</p>
                  <p className="text-midasbuy-gold text-lg">+1-800-MIDASBUY (800-734-3992)</p>
                  <p className="text-sm text-gray-400 mt-1">Available 24/7</p>
                </div>
              </div>
              
              <div className="glass-effect p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-midasbuy-gold" />
                  Email Support
                </h2>
                <p className="text-gray-300 mb-4">
                  Send us an email and we'll get back to you within 24 hours.
                </p>
                <div className="p-4 bg-midasbuy-navy/30 rounded-lg">
                  <p className="font-medium text-white">General Support:</p>
                  <p className="text-midasbuy-gold text-lg">support@midasbuy.com</p>
                  <p className="text-sm text-gray-400 mt-1">Response within 24 hours</p>
                  
                  <p className="font-medium text-white mt-3">Payment Issues:</p>
                  <p className="text-midasbuy-gold text-lg">payment@midasbuy.com</p>
                  <p className="text-sm text-gray-400 mt-1">Response within 12 hours</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 glass-effect p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-midasbuy-gold" />
                Live Chat Support
              </h2>
              <p className="text-gray-300 mb-4">
                Connect with a support agent instantly through our live chat service.
              </p>
              <div className="text-center mt-4">
                <Button className="bg-midasbuy-blue hover:bg-blue-600 px-8">
                  Start Live Chat
                </Button>
                <p className="text-sm text-gray-400 mt-2">Available 24/7</p>
              </div>
            </div>
          </div>
          
          <div className="text-center text-gray-400 text-sm">
            <p>Still have questions? Check our <Link to="/faqs" className="text-midasbuy-blue hover:underline">FAQs</Link> for quick answers.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpCenterPage;
