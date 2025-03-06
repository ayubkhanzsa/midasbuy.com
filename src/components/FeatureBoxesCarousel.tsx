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
    backgroundImage: '/lovable-uploads/0b34b282-16b2-4e05-b721-00d292f36b90.png'
  },
  {
    id: '02',
    number: '02',
    title: 'PUBG MOBILE VIP BENEFITS',
    description: 'Get exclusive VIP benefits and up to 42% UC bonus on your purchases',
    highlight: '42% UC',
    subtext: 'BONUS',
    backgroundImage: '/lovable-uploads/c4d7c825-56b5-4320-98f0-714677da34be.png'
  },
  {
    id: '03',
    number: '03',
    title: 'HONOR OF KINGS',
    description: 'GET FREE EPIC AND RARE PERMANENT SKINS & UP TO 100% EXTRA BONUS',
    backgroundImage: '/lovable-uploads/f11e1091-4ecb-4e7a-8075-3d07f281f2da.png'
  },
  {
    id: '04',
    number: '04',
    title: 'PAYMENT METHODS',
    description: 'Multiple payment options including Apple Pay and Google Pay for your convenience',
    backgroundImage: '/lovable-uploads/033f325b-60e8-44ed-8046-d29687c59e27.png'
  },
  {
    id: '05',
    number: '05',
    title: 'MULTIPLE PAYMENT CHANNELS',
    description: 'We cover over 850 payment channels around the world, including SMS&Mobile, Physical Vouchers, and Redeem Code.',
    highlight: '850+',
    subtext: 'Payment Channels',
    backgroundImage: '/lovable-uploads/033f325b-60e8-44ed-8046-d29687c59e27.png'
  },
  {
    id: '06',
    number: '06',
    title: 'PROMOTIONS FOR VARIOUS REGION',
    description: 'We offer more than dozens of different marketing activities to our users in every region of the world.',
    highlight: '20+',
    subtext: 'MARKETING ACTIVITIES',
    backgroundImage: '/lovable-uploads/0b34b282-16b2-4e05-b721-00d292f36b90.png'
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
  
  // Preload all background images
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
  
  // Auto-scroll behavior
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
    }, 3000);
    
    return () => clearInterval(interval);
  }, [activeIndex, isLoaded, isPaused]);
  
  // Handle manual navigation
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
  
  // Handle manual interaction
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
    // Keep paused for a moment after touch to allow user to interact
    setTimeout(() => setIsPaused(false), 5000);
  };
  
  // Handle scroll sync
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
        style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
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
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/90" />
                </motion.div>
              </div>
              
              <CardContent className="p-6 h-full flex flex-col relative z-10">
                <div className="mb-2">
                  <span className="text-midasbuy-blue text-lg font-bold">{feature.number}</span>
                </div>
                
                <h4 className="text-xl text-midasbuy-blue font-bold mb-4 text-shadow-blue">{feature.title}</h4>
                
                {feature.highlight && (
                  <div className="mb-2">
                    <div className="text-4xl text-midasbuy-blue font-bold">{feature.highlight}</div>
                    {feature.subtext && <div className="text-sm text-gray-400">{feature.subtext}</div>}
                  </div>
                )}
                
                <p className="text-gray-300 mb-4">{feature.description}</p>
                
                <div className="mt-auto">
                  <Button 
                    variant="link" 
                    className="text-midasbuy-blue p-0 hover:text-midasbuy-gold"
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
