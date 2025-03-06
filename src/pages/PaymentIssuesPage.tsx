
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle, CheckCircle, HelpCircle, CreditCard, RefreshCw, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

interface PaymentIssuesPageProps {
  onLogout: () => void;
}

const PaymentIssuesPage = ({ onLogout }: PaymentIssuesPageProps) => {
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
          
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-orange-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Payment Issues</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Find solutions to common payment problems and learn how to resolve issues with your UC purchases.
            </p>
          </div>
          
          <div className="glass-effect p-8 rounded-xl mb-10">
            <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-3">Common Payment Issues</h2>
            
            <div className="space-y-8">
              <div className="glass-effect p-5 rounded-lg bg-midasbuy-navy/30">
                <div className="flex items-start">
                  <div className="bg-orange-500/20 p-2 rounded-full mr-4 flex-shrink-0">
                    <CreditCard className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">Payment Declined</h3>
                    <p className="text-gray-300 mb-4">
                      If your payment was declined, it could be due to several reasons:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li>Insufficient funds in your account</li>
                      <li>Incorrect card information (number, expiration date, CVV)</li>
                      <li>Your bank may have blocked the transaction for security reasons</li>
                      <li>Your card may have expired</li>
                      <li>Transaction limits on your card or account</li>
                    </ul>
                    
                    <div className="mt-4 bg-midasbuy-navy/50 p-4 rounded-lg">
                      <h4 className="font-medium text-white flex items-center mb-2">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        How to resolve this:
                      </h4>
                      <ol className="list-decimal pl-5 space-y-1 text-gray-300">
                        <li>Verify that your card details are correct</li>
                        <li>Check with your bank if the transaction was blocked</li>
                        <li>Try using a different payment method</li>
                        <li>Ensure you have sufficient funds in your account</li>
                        <li>Contact your bank to authorize transactions with Midasbuy</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-effect p-5 rounded-lg bg-midasbuy-navy/30">
                <div className="flex items-start">
                  <div className="bg-orange-500/20 p-2 rounded-full mr-4 flex-shrink-0">
                    <RefreshCw className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">Payment Successful but UC Not Received</h3>
                    <p className="text-gray-300 mb-4">
                      If your payment was successful but you haven't received your UC, it could be due to:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li>Server delays in processing your purchase</li>
                      <li>Incorrect Player ID entered during purchase</li>
                      <li>Temporary synchronization issues between Midasbuy and the game</li>
                      <li>System maintenance or technical issues</li>
                    </ul>
                    
                    <div className="mt-4 bg-midasbuy-navy/50 p-4 rounded-lg">
                      <h4 className="font-medium text-white flex items-center mb-2">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        How to resolve this:
                      </h4>
                      <ol className="list-decimal pl-5 space-y-1 text-gray-300">
                        <li>Wait at least 30 minutes as some transactions take time to process</li>
                        <li>Check your in-game mail for any UC delivery notifications</li>
                        <li>Verify that you entered the correct Player ID</li>
                        <li>Login and logout of the game to refresh your account data</li>
                        <li>If the issue persists for more than 2 hours, contact customer support with your transaction details</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-effect p-5 rounded-lg bg-midasbuy-navy/30">
                <div className="flex items-start">
                  <div className="bg-orange-500/20 p-2 rounded-full mr-4 flex-shrink-0">
                    <HelpCircle className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">Multiple Charges for One Purchase</h3>
                    <p className="text-gray-300 mb-4">
                      If you see multiple charges for a single purchase, it could be due to:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li>Payment processing errors</li>
                      <li>Clicking the purchase button multiple times</li>
                      <li>Temporary authorization holds that will be released</li>
                      <li>Browser or connection issues causing multiple submissions</li>
                    </ul>
                    
                    <div className="mt-4 bg-midasbuy-navy/50 p-4 rounded-lg">
                      <h4 className="font-medium text-white flex items-center mb-2">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        How to resolve this:
                      </h4>
                      <ol className="list-decimal pl-5 space-y-1 text-gray-300">
                        <li>Check if these are actual charges or just authorization holds</li>
                        <li>Wait 3-5 business days as temporary holds are typically released automatically</li>
                        <li>Contact customer support with screenshots of the charges and your transaction ID</li>
                        <li>Provide your bank statement showing the multiple charges</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-effect p-6 rounded-xl mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-midasbuy-gold" />
              Need More Help?
            </h2>
            <p className="text-gray-300 mb-4">
              If you're still experiencing payment issues, our customer support team is ready to assist you. Please provide your transaction details when contacting us for faster resolution.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/contact">
                <Button className="w-full bg-midasbuy-blue hover:bg-blue-600">
                  Contact Support
                </Button>
              </Link>
              <Link to="/help-center">
                <Button variant="outline" className="w-full bg-transparent border-midasbuy-blue text-midasbuy-blue hover:bg-midasbuy-blue/10">
                  Visit Help Center
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-400">
            <p>For payment issues involving significant amounts or multiple failed transactions, please contact your bank in addition to reaching out to our support team.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentIssuesPage;
