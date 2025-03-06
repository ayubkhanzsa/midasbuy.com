
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FeatureBox {
  id: string;
  number: string;
  title: string;
  description: string;
  backgroundImage: string;
  highlight?: string;
  subtext?: string;
}

const featureBoxes: FeatureBox[] = [
  {
    id: '01',
    number: '01',
    title: 'DELTA FORCE X MIDASBUY',
    description: 'EXTRA BONUS UPSIZE ONLY ON MIDASBUY. ENJOY UP TO 45% BONUS NOW',
    backgroundImage: '/lovable-uploads/96dcf71f-b919-40f7-95a7-47d66e3d3527.png'
  },
  {
    id: '02',
    number: '02',
    title: 'PUBG MOBILE VIP BENEFITS',
    description: 'Get exclusive VIP benefits and up to 42% UC bonus on your purchases',
    highlight: '42% UC',
    subtext: 'BONUS',
    backgroundImage: '/lovable-uploads/0f15b743-31d1-4b9a-9c20-1e741e00afdc.png'
  },
  {
    id: '03',
    number: '03',
    title: 'HONOR OF KINGS',
    description: 'GET FREE EPIC AND RARE PERMANENT SKINS & UP TO 100% EXTRA BONUS',
    backgroundImage: '/lovable-uploads/0e111052-aaa5-4b23-914b-6e10702525de.png'
  },
  {
    id: '04',
    number: '04',
    title: 'PAYMENT METHODS',
    description: 'Multiple payment options including Apple Pay and Google Pay for your convenience',
    backgroundImage: '/lovable-uploads/8ef7e337-4e5f-4d1d-94e0-dfee5d239199.png'
  },
  {
    id: '05',
    number: '05',
    title: 'MULTIPLE PAYMENT CHANNELS',
    description: 'We cover over 850 payment channels around the world, including SMS&Mobile, Physical Vouchers, and Redeem Code.',
    highlight: '850+',
    subtext: 'Payment Channels',
    backgroundImage: '/lovable-uploads/8ef7e337-4e5f-4d1d-94e0-dfee5d239199.png'
  },
  {
    id: '06',
    number: '06',
    title: 'PROMOTIONS FOR VARIOUS REGION',
    description: 'We offer more than dozens of different marketing activities to our users in every region of the world.',
    highlight: '20+',
    subtext: 'MARKETING ACTIVITIES',
    backgroundImage: '/lovable-uploads/96dcf71f-b919-40f7-95a7-47d66e3d3527.png'
  }
];

interface FeatureBoxesCarouselProps {
  className?: string;
}

const FeatureBoxesCarousel: React.FC<FeatureBoxesCarouselProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const imagesToLoad = featureBoxes.map(feature => feature.backgroundImage);
    
    const imagePromises = imagesToLoad.map(imageSrc => {
      return new Promise<string>((resolve) => {
        const img = new Image();
        img.src = imageSrc;
        img.loading = "eager";
        img.onload = () => resolve(imageSrc);
        img.onerror = () => resolve(imageSrc);
      });
    });
    
    Promise.all(imagePromises).then(() => {
      console.log("All feature box images loaded");
      setIsLoaded(true);
    });
  }, []);
  
  useEffect(() => {
    if (!isLoaded || isPaused) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % featureBoxes.length);
      
      if (containerRef.current) {
        const nextScrollPosition = activeIndex * (320 + 24); // card width + gap
        containerRef.current.scrollTo({
          left: nextScrollPosition,
          behavior: 'smooth'
        });
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeIndex, isLoaded, isPaused]);
  
  const scrollToIndex = (index: number) => {
    setActiveIndex(index);
    if (containerRef.current) {
      const scrollPosition = index * (320 + 24); // card width + gap
      containerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };
  
  const handleMouseEnter = () => {
    setIsPaused(true);
  };
  
  const handleMouseLeave = () => {
    setIsPaused(false);
  };
  
  const handleTouchStart = () => {
    setIsPaused(true);
  };
  
  const handleTouchEnd = () => {
    setTimeout(() => setIsPaused(false), 7000);
  };
  
  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const scrollPosition = containerRef.current.scrollLeft;
    const cardWidth = 320 + 24; // width + gap
    const newIndex = Math.round(scrollPosition / cardWidth);
    
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };
  
  return (
    <div className={`w-full ${className}`}>
      <h3 className="text-xl text-white font-bold mb-6">MIDASBUY CAN OFFER YOU</h3>
      
      <div 
        ref={containerRef}
        className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar"
        style={{ 
          scrollBehavior: isPaused ? 'auto' : 'smooth', 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          transition: isPaused ? 'all 0.3s ease' : 'all 0.8s ease-in-out'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onScroll={handleScroll}
      >
        {featureBoxes.map((feature, index) => (
          <motion.div
            key={feature.id}
            className="min-w-[320px] sm:min-w-[320px] flex-shrink-0 cursor-pointer"
            whileHover={{ 
              y: -10, 
              transition: { duration: 0.2 } 
            }}
            onClick={() => scrollToIndex(index)}
          >
            <Card className="h-[320px] overflow-hidden relative border-0 shadow-xl rounded-xl">
              <div className="absolute inset-0 z-0">
                <motion.div
                  className="w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={feature.backgroundImage}
                    alt={feature.title}
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                  />
                  {/* Using a very light, partially transparent overlay to ensure text readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30" />
                </motion.div>
              </div>
              
              <CardContent className="p-6 h-full flex flex-col relative z-10">
                <div className="mb-2">
                  <span className="text-midasbuy-blue text-lg font-bold text-shadow">{feature.number}</span>
                </div>
                
                <h4 className="text-xl text-white font-bold mb-4 text-shadow">{feature.title}</h4>
                
                {feature.highlight && (
                  <div className="mb-2">
                    <div className="text-4xl text-midasbuy-gold font-bold text-shadow">{feature.highlight}</div>
                    {feature.subtext && <div className="text-sm text-white text-shadow">{feature.subtext}</div>}
                  </div>
                )}
                
                <p className="text-white text-shadow mb-4">{feature.description}</p>
                
                <div className="mt-auto">
                  <Button 
                    variant="link" 
                    className="text-midasbuy-gold p-0 hover:text-white text-shadow"
                  >
                    Learn more →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center mt-6 space-x-2">
        {featureBoxes.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full transition-colors duration-300 ${
              index === activeIndex ? 'bg-midasbuy-blue' : 'bg-white/30'
            }`}
            onClick={() => scrollToIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureBoxesCarousel;
