
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface FeatureBoxesCarouselProps {
  className?: string;
}

const FeatureBoxesCarousel: React.FC<FeatureBoxesCarouselProps> = ({ className }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselImages = [
    "/lovable-uploads/9a7e56eb-e7ca-4352-acd8-fd90978164a9.png",
    "/lovable-uploads/5d84e606-83ab-4ccd-8186-132fa1fca79c.png",
    "/lovable-uploads/e0945660-8538-49d8-ad3a-652079b6f0e2.png",
    "/lovable-uploads/58ab0999-9b9a-4134-99be-0ed63f5b99d5.png"
  ];

  // Auto rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className={`w-full ${className}`}>
      <h3 className="text-xl text-white font-bold mb-6 z-10 relative">MIDASBUY CAN OFFER YOU</h3>
      
      <div className="relative w-full rounded-xl overflow-hidden h-[400px] md:h-[500px]">
        {carouselImages.map((image, index) => (
          <div 
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}
          >
            <img 
              src={image} 
              alt={`Feature ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        ))}
        
        {/* Navigation dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${activeIndex === index ? 'bg-midasbuy-gold w-6' : 'bg-white/50'}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureBoxesCarousel;
