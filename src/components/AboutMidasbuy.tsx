
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useResponsive } from '@/hooks/use-mobile';

const AboutMidasbuy = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { isMobile } = useResponsive();

  const features = [
    {
      id: 1,
      title: "TENCENT X MIDASBUY",
      description: "Midasbuy as Tencent's overseas third-party recharge store, continuously providing safer, faster, and more enjoyable payment services for the global gaming industry.",
      image: "/lovable-uploads/1cd43933-d83f-4e97-beef-91b98202d7d2.png"
    },
    {
      id: 2,
      title: "THE LOYALTY OF MIDASBUY USERS",
      description: "Midasbuy offers payment and VIP services to tens of millions of users in more than 100 markets worldwide.",
      subtext: "of Midasbuy Members",
      highlight: "Ten of Millions"
    }
  ];

  return (
    <div className="py-12 bg-midasbuy-navy/40">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl text-white font-bold">ABOUT MIDASBUY</h2>
          <div className="mt-8">
            <h3 className="text-3xl md:text-4xl text-white font-bold mb-6">
              PAY SAFE, FAST AND FUN WITH MIDASBUY.
            </h3>
            <div className="bg-gradient-to-br from-midasbuy-navy/80 to-midasbuy-navy/40 rounded-xl p-6 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <img src="/midasbuy-logo.png" alt="Tencent" className="h-8" />
              </div>
              <p className="text-gray-300 text-lg">
                Midasbuy is the official recharge store by Tencent. We have established official partnerships with <span className="text-white font-semibold">30</span> game companies and game studios around the world to jointly create a safe and convenient recharge store for <span className="text-white font-semibold">ten of millions</span> players.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="text-xl text-white font-bold mb-6">MIDASBUY CAN OFFER YOU</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gradient-to-br from-midasbuy-navy/60 to-midasbuy-navy/20 rounded-xl p-6 backdrop-blur-sm border border-white/10"
              >
                <div className="mb-4">
                  <span className="text-midasbuy-blue text-lg">{String(feature.id).padStart(2, '0')}</span>
                </div>
                <h4 className="text-2xl text-midasbuy-blue font-bold mb-4">{feature.title}</h4>
                <p className="text-gray-300">{feature.description}</p>
                {feature.subtext && (
                  <div className="mt-4">
                    <div className="text-3xl text-midasbuy-blue font-bold">{feature.highlight}</div>
                    <div className="text-sm text-gray-400">{feature.subtext}</div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMidasbuy;
