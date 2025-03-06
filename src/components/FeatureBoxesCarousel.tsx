
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface FeatureBoxesCarouselProps {
  className?: string;
}

const FeatureBoxesCarousel: React.FC<FeatureBoxesCarouselProps> = ({ className }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imageRefs = useRef<HTMLImageElement[]>([]);

  const carouselImages = [
    "/lovable-uploads/9a7e56eb-e7ca-4352-acd8-fd90978164a9.png",
    "/lovable-uploads/5d84e606-83ab-4ccd-8186-132fa1fca79c.png",
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

  return (
    <div className={`w-full ${className}`}>
      <h3 className="text-xl text-white font-bold mb-6 z-10 relative">MIDASBUY CAN OFFER YOU</h3>
      
      <div className="relative w-full rounded-xl overflow-hidden h-[400px] md:h-[500px] lg:h-[600px] max-w-full mx-auto">
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
            {/* Removed the black gradient overlay */}
          </div>
        ))}
        
        {/* Navigation dots have been removed as requested */}
      </div>
    </div>
  );
};

export default FeatureBoxesCarousel;
