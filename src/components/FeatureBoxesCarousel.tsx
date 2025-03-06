
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';

interface FeatureBox {
  id: string;
  number: string;
  title: string;
  description: string;
  image?: string;
  highlight?: string;
  subtext?: string;
}

const featureBoxes: FeatureBox[] = [
  {
    id: '01',
    number: '01',
    title: 'TENCENT X MIDASBUY',
    description: 'Midasbuy as Tencent\'s overseas third-party recharge store, continuously providing safer, faster, and more enjoyable payment services for the global gaming industry.',
    image: '/lovable-uploads/1cd43933-d83f-4e97-beef-91b98202d7d2.png'
  },
  {
    id: '02',
    number: '02',
    title: 'THE LOYALTY OF MIDASBUY USERS',
    description: 'Midasbuy offers payment and VIP services to tens of millions of users in more than 100 markets worldwide.',
    highlight: 'Ten of Millions',
    subtext: 'of Midasbuy Members'
  },
  {
    id: '03',
    number: '03',
    title: 'PAYMENT SECURITY',
    description: 'We guarantee your payment security, and that you can instantly check all your order records in Midasbuy after you sign in.',
    image: '/lovable-uploads/5774e0bb-22ac-48fa-a34f-5f8dfbad6b92.png'
  },
  {
    id: '04',
    number: '04',
    title: 'PROTECTION OF USER PRIVACY',
    description: 'We strictly protect your privacy rights from being violated. At the same time, we also create a safe and compliant recharge environment for you.',
    image: '/lovable-uploads/14c03a58-3e93-4ba4-abf5-db1f083c3363.png'
  },
  {
    id: '05',
    number: '05',
    title: 'MULTIPLE PAYMENT CHANNELS',
    description: 'We cover over 850 payment channels around the world, including SMS&Mobile, Physical Vouchers, and Redeem Code. You can find any payment channel you want in Midasbuy!',
    highlight: '850+',
    subtext: 'Payment Channels'
  },
  {
    id: '06',
    number: '06',
    title: 'PROMOTIONS FOR VARIOUS REGION',
    description: 'We offer more than dozens of different marketing activities to our users in every region of the world. You can participate in a variety of fun activities and get the richest rewards at the most affordable prices.',
    highlight: '20+',
    subtext: 'MARKETING ACTIVITIES'
  }
];

interface FeatureBoxesCarouselProps {
  className?: string;
}

const FeatureBoxesCarousel: React.FC<FeatureBoxesCarouselProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Auto-scroll effect
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;
    
    let scrollAmount = 0;
    let direction = 1;
    const scrollSpeed = 0.5; // pixels per frame
    
    const scroll = () => {
      if (!scrollContainer) return;
      
      scrollAmount += scrollSpeed * direction;
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      // Change direction when reaching the end
      if (scrollAmount >= maxScroll || scrollAmount <= 0) {
        direction *= -1;
      }
      
      scrollContainer.scrollLeft = scrollAmount;
      animationFrameId = requestAnimationFrame(scroll);
    };
    
    let animationFrameId = requestAnimationFrame(scroll);
    
    // Pause scrolling when hovering
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationFrameId);
    };
    
    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(scroll);
    };
    
    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <div className={`w-full ${className}`}>
      <h3 className="text-xl text-white font-bold mb-6">MIDASBUY CAN OFFER YOU</h3>
      
      <div 
        ref={containerRef}
        className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar"
        style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {featureBoxes.map((feature) => (
          <motion.div
            key={feature.id}
            className="min-w-[300px] sm:min-w-[320px] flex-shrink-0"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className="h-[320px] overflow-hidden bg-gradient-to-br from-midasbuy-navy/60 to-midasbuy-navy/20 backdrop-blur-sm border border-white/10 text-white">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="mb-2">
                  <span className="text-midasbuy-blue text-lg">{feature.number}</span>
                </div>
                
                <h4 className="text-xl text-midasbuy-blue font-bold mb-4">{feature.title}</h4>
                
                {feature.highlight && (
                  <div className="mb-2">
                    <div className="text-4xl text-midasbuy-blue font-bold">{feature.highlight}</div>
                    {feature.subtext && <div className="text-sm text-gray-400">{feature.subtext}</div>}
                  </div>
                )}
                
                <p className="text-gray-300 mb-4">{feature.description}</p>
                
                {feature.image && (
                  <div className="mt-auto">
                    <div className="flex justify-center items-center">
                      <img 
                        src={feature.image} 
                        alt={feature.title} 
                        className="max-h-[100px] object-contain"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Navigation dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {[1, 2, 3, 4, 5, 6].map((dot) => (
          <div
            key={dot}
            className={`h-2 w-2 rounded-full bg-white/30 ${dot === 2 ? 'bg-white' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureBoxesCarousel;
