
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface FeatureBoxesCarouselProps {
  className?: string;
  showHeading?: boolean;
}

const FeatureBoxesCarousel: React.FC<FeatureBoxesCarouselProps> = ({ className, showHeading = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imageRefs = useRef<HTMLImageElement[]>([]);

  const carouselImages = [
    "/lovable-uploads/5d84e606-83ab-4ccd-8186-132fa1fca79c.png",
    "/lovable-uploads/9a7e56eb-e7ca-4352-acd8-fd90978164a9.png",
    "/lovable-uploads/e0945660-8538-49d8-ad3a-652079b6f0e2.png",
    "/lovable-uploads/58ab0999-9b9a-4134-99be-0ed63f5b99d5.png"
  ];

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = carouselImages.length;
    
    // Create image objects to preload
    const preloadImages = carouselImages.map((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${src}`);
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      return img;
    });
  }, []);

  // Auto rotate carousel
  useEffect(() => {
    if (!imagesLoaded) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval);
  }, [carouselImages.length, imagesLoaded]);

  // Indicator dots for navigation
  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="relative w-full rounded-xl overflow-hidden h-[220px] md:h-[260px] lg:h-[300px] max-w-5xl mx-auto shadow-lg">
        {carouselImages.map((image, index) => (
          <div 
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}
          >
            <img 
              ref={el => {
                if (el) imageRefs.current[index] = el;
              }}
              src={image} 
              alt={`Feature ${index + 1}`} 
              className="w-full h-full object-contain md:object-cover"
              loading="eager"
            />
          </div>
        ))}
        
        {/* Navigation dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === index 
                  ? 'bg-white w-4' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureBoxesCarousel;
