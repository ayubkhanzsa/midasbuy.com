
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, FileText } from "lucide-react";
import Header from "@/components/Header";

interface TermsOfServicePageProps {
  onLogout: () => void;
}

const TermsOfServicePage = ({ onLogout }: TermsOfServicePageProps) => {
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
            <div className="w-20 h-20 bg-midasbuy-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-midasbuy-blue" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Terms of Service</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Please read these terms carefully before using Midasbuy services.
            </p>
          </div>
          
          <div className="glass-effect p-8 rounded-xl mb-6">
            <div className="space-y-6 text-gray-300">
              <section>
                <h2 className="text-xl text-white font-bold mb-3">1. Introduction</h2>
                <p>
                  Welcome to Midasbuy. These Terms of Service ("Terms") govern your use of Midasbuy's website, products, and services ("Services"). By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy.
                </p>
                <p className="mt-2">
                  If you do not agree to these Terms, please do not use our Services. We reserve the right to modify these Terms at any time, and such modifications shall be effective immediately upon posting. Your continued use of the Services following any modifications indicates your acceptance of the modified Terms.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl text-white font-bold mb-3">2. Eligibility</h2>
                <p>
                  You must be at least 18 years old to use our Services. By using our Services, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into these Terms. If you are under 18 years old, you may only use our Services with the involvement and consent of a parent or legal guardian.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl text-white font-bold mb-3">3. Midasbuy Account</h2>
                <p>
                  When you create a Midasbuy account, you agree to provide accurate, current, and complete information about yourself. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                </p>
                <p className="mt-2">
                  We reserve the right to suspend or terminate your account at our discretion if we suspect any violation of these Terms or any fraudulent, abusive, or illegal activity associated with your account.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl text-white font-bold mb-3">4. Purchases and Payments</h2>
                <p>
                  All purchases through Midasbuy are subject to the following terms:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Prices for products and services are displayed in your local currency or USD and may change without notice.</li>
                  <li>Payment must be made through one of our approved payment methods.</li>
                  <li>By making a purchase, you represent that you are authorized to use the selected payment method.</li>
                  <li>All sales are final, and we do not offer refunds unless required by law or as specified in our Refund Policy.</li>
                  <li>Virtual items and currencies (such as UC for PUBG Mobile) are non-transferable and have no cash value.</li>
                  <li>We are not responsible for any taxes that may apply to your purchases, except where required by law.</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl text-white font-bold mb-3">5. Delivery of Virtual Items</h2>
                <p>
                  Upon successful payment, virtual items or currency will typically be delivered to your game account immediately. However, delivery may be delayed due to technical issues, high traffic, or server maintenance. If you do not receive your purchase within 24 hours, please contact our customer support.
                </p>
                <p className="mt-2">
                  You are responsible for providing the correct game account information. We cannot be held responsible for deliveries to incorrect accounts due to errors in the information you provide.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl text-white font-bold mb-3">6. Prohibited Activities</h2>
                <p>
                  When using our Services, you agree not to:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon the rights of others, including intellectual property rights</li>
                  <li>Use our Services for any illegal or unauthorized purpose</li>
                  <li>Attempt to gain unauthorized access to any portion of our Services or any other systems or networks</li>
                  <li>Use any automated means or interface not provided by us to access our Services</li>
                  <li>Attempt to reverse engineer any aspect of our Services</li>
                  <li>Engage in any activity that interferes with or disrupts our Services</li>
                  <li>Engage in fraudulent behavior, including providing false information or making unauthorized purchases</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl text-white font-bold mb-3">7. Intellectual Property</h2>
                <p>
                  All content on Midasbuy, including text, graphics, logos, icons, images, audio clips, and software, is the property of Midasbuy or its content suppliers and is protected by international copyright laws. The compilation of all content on Midasbuy is the exclusive property of Midasbuy and is protected by international copyright laws.
                </p>
                <p className="mt-2">
                  Trademarks, service marks, and logos used and displayed on Midasbuy are registered and unregistered trademarks of Midasbuy and others. Nothing on Midasbuy should be construed as granting any license or right to use any trademark displayed on Midasbuy without our written permission or that of the third-party rights holder.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl text-white font-bold mb-3">8. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by applicable law, Midasbuy shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenue, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Your access to or use of or inability to access or use our Services</li>
                  <li>Any conduct or content of any third party on our Services</li>
                  <li>Any content obtained from our Services</li>
                  <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                </ul>
                <p className="mt-2">
                  In no event shall our aggregate liability exceed the amount you paid us, if any, in the past six months for the Services giving rise to the claim.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl text-white font-bold mb-3">9. Indemnification</h2>
                <p>
                  You agree to indemnify, defend, and hold harmless Midasbuy and its officers, directors, employees, agents, and affiliates from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses (including but not limited to attorney's fees) arising from:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Your use of and access to our Services</li>
                  <li>Your violation of any term of these Terms</li>
                  <li>Your violation of any third-party right, including without limitation any copyright, property, or privacy right</li>
                  <li>Any claim that your content caused damage to a third party</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl text-white font-bold mb-3">10. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl text-white font-bold mb-3">11. Changes to Terms</h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any significant changes by posting the new Terms on this page and updating the "Last Updated" date. Your continued use of our Services after any such changes constitutes your acceptance of the new Terms.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl text-white font-bold mb-3">12. Contact Us</h2>
                <p>
                  If you have any questions about these Terms, please contact us at:
                </p>
                <div className="mt-2 p-4 bg-midasbuy-navy/50 rounded-lg">
                  <p>Email: legal@midasbuy.com</p>
                  <p>Address: One Midasbuy Plaza, Gaming District, CA 90210, USA</p>
                </div>
              </section>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">Last Updated: March 1, 2025</p>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-400">
            <p>By using Midasbuy services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
