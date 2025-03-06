
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Copyright, FileText, Shield } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

interface CopyrightNoticePageProps {
  onLogout: () => void;
}

const CopyrightNoticePage = ({ onLogout }: CopyrightNoticePageProps) => {
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
            <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Copyright className="w-10 h-10 text-purple-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Copyright Notice</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Information about intellectual property rights, trademarks, and copyrighted materials on Midasbuy.
            </p>
          </div>
          
          <div className="glass-effect p-8 rounded-xl mb-6">
            <div className="space-y-6 text-gray-300">
              <section>
                <h2 className="text-xl text-white font-bold mb-3">1. Copyright Protection</h2>
                <p>
                  All content on the Midasbuy website and platform, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, is the property of Midasbuy or its content suppliers and is protected by international copyright laws.
                </p>
                <p className="mt-2">
                  The compilation of all content on this site is the exclusive property of Midasbuy and is protected by international copyright laws. All software used on this site is the property of Midasbuy or its software suppliers and is protected by international copyright laws.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl text-white font-bold mb-3">2. Trademarks</h2>
                <p>
                  Midasbuy® and the Midasbuy logo are registered trademarks of Midasbuy Inc. All other trademarks, service marks, and logos used on Midasbuy are the property of their respective owners and are used under license or with permission.
                </p>
                <div className="mt-4 p-4 bg-midasbuy-navy/30 rounded-lg">
                  <div className="flex items-start">
                    <Shield className="w-5 h-5 text-purple-500 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-sm">
                      PUBG MOBILE, PUBG, and all related logos, characters, names, and distinctive likenesses thereof are the exclusive property of PUBG Corporation or its licensors. All rights reserved. Other trademarks and trade names are those of their respective owners.
                    </p>
                  </div>
                </div>
                <p className="mt-3">
                  Nothing contained on this website should be construed as granting, by implication, estoppel, or otherwise, any license or right to use any trademark displayed on this website without the written permission of Midasbuy or the third party that owns the trademark.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl text-white font-bold mb-3">3. Use of Content</h2>
                <p>
                  You may access, download, and use content, information, and materials made available on Midasbuy for personal, non-commercial use only. You may not:
                </p>
                <ul className="list-disc pl-5 mt-3 space-y-2">
                  <li>Modify any of the materials on this website</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to decompile or reverse engineer any software contained on Midasbuy</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
                <p className="mt-3">
                  This license shall automatically terminate if you violate any of these restrictions and may be terminated by Midasbuy at any time.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl text-white font-bold mb-3">4. User-Generated Content</h2>
                <p>
                  By posting, uploading, inputting, providing, or submitting content to Midasbuy, you grant Midasbuy and its affiliated companies a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content throughout the world in any media.
                </p>
                <p className="mt-2">
                  You represent and warrant that you own or otherwise control all of the rights to the content that you post; that the content is accurate; that use of the content you supply does not violate this policy and will not cause injury to any person or entity; and that you will indemnify Midasbuy for all claims resulting from content you supply.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl text-white font-bold mb-3">5. Copyright Infringement Claims</h2>
                <p>
                  Midasbuy respects the intellectual property of others. If you believe that your work has been copied in a way that constitutes copyright infringement, please provide Midasbuy's copyright agent with the following information:
                </p>
                <ul className="list-disc pl-5 mt-3 space-y-2">
                  <li>An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright interest</li>
                  <li>A description of the copyrighted work that you claim has been infringed</li>
                  <li>A description of where the material that you claim is infringing is located on the site</li>
                  <li>Your address, telephone number, and email address</li>
                  <li>A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law</li>
                  <li>A statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf</li>
                </ul>
                
                <div className="mt-4 p-4 bg-midasbuy-navy/30 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Midasbuy's Copyright Agent for notice of claims of copyright infringement:</h4>
                  <p>Copyright Agent, Legal Department</p>
                  <p>Midasbuy Inc.</p>
                  <p>One Midasbuy Plaza, Gaming District, CA 90210, USA</p>
                  <p>Email: copyright@midasbuy.com</p>
                </div>
              </section>
              
              <section>
                <h2 className="text-xl text-white font-bold mb-3">6. Digital Millennium Copyright Act (DMCA) Policy</h2>
                <p>
                  Midasbuy complies with the provisions of the Digital Millennium Copyright Act (DMCA) applicable to internet service providers. If you believe that materials available on Midasbuy infringe your copyright, you may request that those materials be removed by submitting a DMCA notice to our Copyright Agent (contact information provided above).
                </p>
                <p className="mt-2">
                  Upon receipt of a valid DMCA notice, Midasbuy will:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Remove or disable access to the material that is alleged to be infringing</li>
                  <li>Notify the content provider, member, or user that it has removed or disabled access to the material</li>
                  <li>Provide the content provider, member, or user with information about how to submit a counter-notification</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl text-white font-bold mb-3">7. Changes to Copyright Notice</h2>
                <p>
                  Midasbuy reserves the right to modify this Copyright Notice at any time without prior notice. Any changes will be effective immediately upon posting on our website.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl text-white font-bold mb-3">8. Contact Information</h2>
                <p>
                  If you have any questions about this Copyright Notice, please contact us at:
                </p>
                <div className="mt-2 p-4 bg-midasbuy-navy/30 rounded-lg">
                  <p>Email: legal@midasbuy.com</p>
                  <p>Address: One Midasbuy Plaza, Gaming District, CA 90210, USA</p>
                </div>
              </section>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">Last Updated: March 1, 2025</p>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-400">
            <p className="mb-3">For more information about our policies, please review our:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/terms-of-service" className="text-midasbuy-blue hover:underline">Terms of Service</Link>
              <Link to="/privacy-policy" className="text-midasbuy-blue hover:underline">Privacy Policy</Link>
              <Link to="/refund-policy" className="text-midasbuy-blue hover:underline">Refund Policy</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CopyrightNoticePage;
