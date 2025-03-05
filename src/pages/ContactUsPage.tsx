
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Send, PhoneCall, Mail, MessageSquare, MapPin } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

interface ContactUsPageProps {
  onLogout: () => void;
}

const ContactUsPage = ({ onLogout }: ContactUsPageProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll respond to your inquiry shortly.",
      });
      
      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-midasbuy-navy to-black text-white">
      <Header onLogout={onLogout} />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-gray-300 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span>Back to Home</span>
            </Link>
          </div>
          
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Contact Us</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Have questions or need assistance? Our team is ready to help you with any inquiries about UC purchases, account issues, or technical support.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-effect p-6 rounded-xl">
              <h2 className="text-xl font-bold mb-6 border-b border-gray-700 pb-3">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
                  <Input 
                    id="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="bg-midasbuy-navy/50 border-midasbuy-blue/30 text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                  <Input 
                    id="email" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="bg-midasbuy-navy/50 border-midasbuy-blue/30 text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                  <Input 
                    id="subject" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="What is this regarding?"
                    required
                    className="bg-midasbuy-navy/50 border-midasbuy-blue/30 text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                  <Textarea 
                    id="message" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    required
                    className="bg-midasbuy-navy/50 border-midasbuy-blue/30 text-white min-h-[120px]"
                  />
                </div>
                
                <Button type="submit" disabled={isSubmitting} className="w-full bg-midasbuy-blue hover:bg-blue-600">
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
            
            <div className="space-y-6">
              <div className="glass-effect p-6 rounded-xl">
                <h2 className="text-xl font-bold mb-6 border-b border-gray-700 pb-3">Contact Information</h2>
                
                <div className="space-y-4">
                  <div className="flex">
                    <div className="bg-midasbuy-blue/20 p-2 rounded-full mr-4">
                      <PhoneCall className="w-5 h-5 text-midasbuy-blue" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Phone Support</h3>
                      <p className="text-midasbuy-gold">+1-800-MIDASBUY (800-734-3992)</p>
                      <p className="text-xs text-gray-400">24/7 Customer Support</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="bg-midasbuy-blue/20 p-2 rounded-full mr-4">
                      <Mail className="w-5 h-5 text-midasbuy-blue" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Email Support</h3>
                      <p className="text-midasbuy-gold">support@midasbuy.com</p>
                      <p className="text-xs text-gray-400">For general inquiries</p>
                      <p className="text-midasbuy-gold mt-1">uc-support@midasbuy.com</p>
                      <p className="text-xs text-gray-400">For UC purchase issues</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="bg-midasbuy-blue/20 p-2 rounded-full mr-4">
                      <MessageSquare className="w-5 h-5 text-midasbuy-blue" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Live Chat</h3>
                      <p className="text-gray-300">Available 24/7 on our website</p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent border-midasbuy-blue text-midasbuy-blue hover:bg-midasbuy-blue/10">
                        Start Chat
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-effect p-6 rounded-xl">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-midasbuy-gold" />
                  Our Office
                </h2>
                <p className="text-gray-300 mb-2">
                  Midasbuy Headquarters
                </p>
                <p className="text-gray-400">
                  One Midasbuy Plaza, Gaming District<br />
                  Los Angeles, CA 90210<br />
                  United States
                </p>
                
                <div className="mt-4 p-2 bg-midasbuy-navy/50 rounded-lg">
                  <p className="text-sm text-gray-400">
                    Office Hours: Monday to Friday, 9:00 AM - 6:00 PM (PST)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUsPage;
