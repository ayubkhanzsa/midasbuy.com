import React, { useRef, useEffect, useState } from 'react';
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
  backgroundImage?: string;
}

const featureBoxes: FeatureBox[] = [
  {
    id: '01',
    number: '01',
    title: 'DELTA FORCE X MIDASBUY',
    description: 'EXTRA BONUS UPSIZE ONLY ON MIDASBUY. ENJOY UP TO 45% BONUS NOW',
    image: '/lovable-uploads/1cd43933-d83f-4e97-beef-91b98202d7d2.png',
    backgroundImage: '/lovable-uploads/2521c4ce-9ca9-4431-ba16-c0b4bc07758f.png'
  },
  {
    id: '02',
    number: '02',
    title: 'PUBG MOBILE VIP BENEFITS',
    description: 'Get exclusive VIP benefits and up to 42% UC bonus on your purchases',
    highlight: '42% UC',
    subtext: 'BONUS',
    backgroundImage: '/lovable-uploads/0b6a2bd8-ba33-4dbc-ac1f-572136610345.png'
  },
  {
    id: '03',
    number: '03',
    title: 'HONOR OF KINGS',
    description: 'GET FREE EPIC AND RARE PERMANENT SKINS & UP TO 100% EXTRA BONUS',
    image: '/lovable-uploads/5774e0bb-22ac-48fa-a34f-5f8dfbad6b92.png',
    backgroundImage: '/lovable-uploads/89886b09-1e77-4044-a805-e9a56ea3c28d.png'
  },
  {
    id: '04',
    number: '04',
    title: 'PAYMENT METHODS',
    description: 'Multiple payment options including Apple Pay and Google Pay for your convenience',
    image: '/lovable-uploads/14c03a58-3e93-4ba4-abf5-db1f083c3363.png',
    backgroundImage: '/lovable-uploads/be3d3f52-9518-461a-ae76-65f587cefc9d.png'
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
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  
  useEffect(() => {
    const imagesToLoad = featureBoxes
      .filter(feature => feature.image)
      .map(feature => feature.image!);
    
    const imagePromises = imagesToLoad.map(imageSrc => {
      return new Promise<string>((resolve) => {
        const img = new Image();
        img.src = imageSrc;
        img.loading = "eager";
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, imageSrc]));
          resolve(imageSrc);
        };
        img.onerror = () => resolve(imageSrc);
      });
    });
    
    Promise.all(imagePromises).then(() => {
      console.log("All feature box images loaded");
    });
    
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;
    
    let scrollAmount = 0;
    let direction = 1;
    const scrollSpeed = 0.5;
    
    const scroll = () => {
      if (!scrollContainer) return;
      
      scrollAmount += scrollSpeed * direction;
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      if (scrollAmount >= maxScroll || scrollAmount <= 0) {
        direction *= -1;
      }
      
      scrollContainer.scrollLeft = scrollAmount;
      animationFrameId = requestAnimationFrame(scroll);
    };
    
    let animationFrameId = requestAnimationFrame(scroll);
    
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
            <Card className="h-[320px] overflow-hidden relative">
              {feature.backgroundImage && (
                <div className="absolute inset-0 z-0">
                  <motion.img 
                    src={feature.backgroundImage}
                    alt={feature.title}
                    className="w-full h-full object-cover opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 0.3 }}
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />
                </div>
              )}
              <CardContent className="p-6 h-full flex flex-col relative z-10">
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
                      <motion.img 
                        src={feature.image}
                        alt={feature.title}
                        className={`max-h-[100px] object-contain transition-opacity duration-200 ${
                          loadedImages.has(feature.image) ? 'opacity-100' : 'opacity-0'
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: loadedImages.has(feature.image) ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                        loading="eager"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center mt-4 space-x-2">
        {featureBoxes.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full transition-colors duration-300 ${
              index === 0 ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureBoxesCarousel;
