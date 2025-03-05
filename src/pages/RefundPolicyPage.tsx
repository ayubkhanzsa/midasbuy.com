
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw, AlertCircle, Clock, Check } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

interface RefundPolicyPageProps {
  onLogout: () => void;
}

const RefundPolicyPage = ({ onLogout }: RefundPolicyPageProps) => {
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
            <div className="w-20 h-20 bg-midasbuy-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <RefreshCw className="w-10 h-10 text-midasbuy-gold" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Refund Policy</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Learn about our refund and cancellation policies for Midasbuy purchases.
            </p>
          </div>
          
          <div className="glass-effect p-8 rounded-xl mb-6">
            <div className="space-y-6 text-gray-300">
              <section>
                <h2 className="text-xl text-white font-bold mb-3">1. General Refund Policy</h2>
                <p>
                  Due to the nature of digital goods and virtual currencies, all purchases made through Midasbuy are generally final and non-refundable once the transaction is completed and the virtual items or currency have been delivered to your game account.
                </p>
                <div className="mt-4 p-4 bg-midasbuy-navy/30 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-sm">
                      Virtual items and currencies (such as UC for PUBG Mobile) are considered delivered and used immediately upon being credited to your game account, making them ineligible for refunds under normal circumstances.
                    </p>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-xl text-white font-bold mb-3">2. Exceptional Circumstances for Refunds</h2>
                <p>
                  We may consider refund requests under the following exceptional circumstances:
                </p>
                <ul className="list-disc pl-5 mt-3 space-y-2">
                  <li>
                    <span className="font-medium text-white">Unauthorized Purchases:</span> If you believe an unauthorized purchase was made from your account, please contact us immediately with details of the transaction.
                  </li>
                  <li>
                    <span className="font-medium text-white">Non-Delivery of Virtual Items:</span> If you have been charged for a purchase but the virtual items or currency were not delivered to your game account within 24 hours, you may request a refund.
                  </li>
                  <li>
                    <span className="font-medium text-white">Double Charging:</span> If you were charged multiple times for the same transaction, you may be eligible for a refund of the duplicate charges.
                  </li>
                  <li>
                    <span className="font-medium text-white">Technical Errors:</span> If a technical error or system malfunction prevented you from receiving or using your purchased items properly.
                  </li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl text-white font-bold mb-3">3. Refund Request Process</h2>
                <p>
                  To request a refund for eligible purchases, please follow these steps:
                </p>
                <ol className="list-decimal pl-5 mt-3 space-y-2">
                  <li>
                    Contact our customer support team through the <Link to="/contact" className="text-midasbuy-blue hover:underline">Contact Us</Link> page within 7 days of the purchase.
                  </li>
                  <li>
                    Provide your transaction details, including:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Transaction ID (found in your purchase confirmation)</li>
                      <li>Date and time of purchase</li>
                      <li>Player ID used for the purchase</li>
                      <li>Amount charged</li>
                      <li>Payment method used</li>
                    </ul>
                  </li>
                  <li>
                    Explain the reason for your refund request with as much detail as possible.
                  </li>
                  <li>
                    Provide any relevant screenshots or additional information that supports your request.
                  </li>
                </ol>
                
                <div className="mt-4 flex items-center">
                  <Clock className="w-5 h-5 text-midasbuy-gold mr-2 flex-shrink-0" />
                  <p className="text-sm">
                    Refund requests are typically processed within 3-5 business days. Complex cases may require additional time for investigation.
                  </p>
                </div>
              </section>
              
              <section>
                <h2 className="text-xl text-white font-bold mb-3">4. Refund Method</h2>
                <p>
                  If your refund request is approved, we will process the refund using the same payment method that was used for the original purchase. The time it takes for the refunded amount to appear in your account depends on your payment provider's policies:
                </p>
                <ul className="list-disc pl-5 mt-3 space-y-2">
                  <li>
                    <span className="font-medium text-white">Credit/Debit Cards:</span> Refunds typically appear on your statement within 5-10 business days.
                  </li>
                  <li>
                    <span className="font-medium text-white">PayPal:</span> Refunds are usually processed within 3-5 business days.
                  </li>
                  <li>
                    <span className="font-medium text-white">Digital Wallets:</span> Refunds to digital wallets typically appear within 1-3 business days.
                  </li>
                  <li>
                    <span className="font-medium text-white">Other Payment Methods:</span> Processing times vary based on the specific payment provider.
                  </li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl text-white font-bold mb-3">5. Refund Limitations</h2>
                <p>
                  Please be aware of the following limitations to our refund policy:
                </p>
                <ul className="list-disc pl-5 mt-3 space-y-2">
                  <li>
                    Refund requests submitted more than 7 days after the purchase may not be considered.
                  </li>
                  <li>
                    We reserve the right to deny refund requests if we detect any fraudulent activity or abuse of our refund policy.
                  </li>
                  <li>
                    Refunds will not be provided for purchases made due to user error, such as purchasing the wrong item or entering an incorrect Player ID.
                  </li>
                  <li>
                    Purchases made by a minor without parental consent are the responsibility of the parent or guardian and may not qualify for a refund.
                  </li>
                  <li>
                    If you have already used the virtual items or currency in the game, you will not be eligible for a refund.
                  </li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl text-white font-bold mb-3">6. Cancellation Policy</h2>
                <p>
                  Due to the instantaneous nature of digital purchases, we do not offer a cancellation period for transactions once they have been confirmed. Please review your purchase details carefully before completing any transaction.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl text-white font-bold mb-3">7. Disputes and Chargebacks</h2>
                <p>
                  We strongly encourage you to contact our customer support team before initiating a payment dispute or chargeback with your payment provider. Unauthorized chargebacks may result in:
                </p>
                <ul className="list-disc pl-5 mt-3 space-y-2">
                  <li>Temporary or permanent suspension of your Midasbuy account</li>
                  <li>Restrictions on future purchases</li>
                  <li>Potential reversal of delivered virtual items or currency</li>
                </ul>
                <p className="mt-3">
                  We are committed to resolving all legitimate issues through our customer support channels.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl text-white font-bold mb-3">8. Changes to Refund Policy</h2>
                <p>
                  We reserve the right to modify this refund policy at any time without prior notice. Any changes will be effective immediately upon posting on our website.
                </p>
              </section>
            </div>
            
            <div className="mt-8 p-4 bg-midasbuy-navy/30 rounded-lg">
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-sm text-gray-300">
                  By making a purchase on Midasbuy, you acknowledge that you have read, understood, and agree to be bound by this refund policy. If you do not agree with any part of this policy, please do not proceed with any purchases.
                </p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">Last Updated: March 1, 2025</p>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-gray-400 mb-3">Need help with a purchase?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-midasbuy-blue hover:bg-blue-600 px-8">
                  Contact Support
                </Button>
              </Link>
              <Link to="/payment-issues">
                <Button variant="outline" className="bg-transparent border-midasbuy-blue text-midasbuy-blue hover:bg-midasbuy-blue/10">
                  Payment Issues Help
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
