
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useResponsive } from '@/hooks/use-mobile';

const PaymentLogosCarousel = () => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Payment method logos with their respective links
  const paymentLogos = [
    { 
      src: "/lovable-uploads/01229da3-c59f-4769-9328-3597db96e0d3.png", 
      alt: "WeChat Pay",
      link: "https://pay.weixin.qq.com/" 
    },
    { 
      src: "/lovable-uploads/825367af-3c13-4019-bf19-a7b4780cc00b.png", 
      alt: "Paysafecard",
      link: "https://www.paysafecard.com/" 
    },
    { 
      src: "/lovable-uploads/5cf86807-eba9-4735-91a2-8724f82d68bb.png", 
      alt: "QBucks",
      link: "https://qbucks.com/" 
    },
    { 
      src: "/lovable-uploads/4ece2678-4046-4dce-a0a4-e9e76b09cc6d.png", 
      alt: "Dollar General",
      link: "https://www.dollargeneral.com/" 
    },
    { 
      src: "/lovable-uploads/125e1b88-0b19-40bd-936e-c226516c57f0.png", 
      alt: "PayPal",
      link: "https://www.paypal.com/" 
    },
    { 
      src: "/lovable-uploads/e09e0ddf-1a2c-4230-b8f8-3255d2c0cdeb.png", 
      alt: "Razer Gold",
      link: "https://gold.razer.com/" 
    },
    { 
      src: "/lovable-uploads/d0a61b7d-12c6-4a32-a46c-724c93942478.png", 
      alt: "PayPal",
      link: "https://www.paypal.com/" 
    },
    { 
      src: "/lovable-uploads/79981d54-bb2d-4fdf-ae99-d68ebf783436.png", 
      alt: "Credit Card",
      link: "https://www.visa.com/" 
    },
    { 
      src: "/lovable-uploads/ef54380f-445f-4de8-8135-7fee01bc259e.png", 
      alt: "Google Pay",
      link: "https://pay.google.com/" 
    },
    { 
      src: "/lovable-uploads/15d8b149-8507-4842-a007-22fa85b958de.png", 
      alt: "Apple Pay",
      link: "https://www.apple.com/apple-pay/" 
    },
    { 
      src: "/lovable-uploads/4bc97c7b-b5af-40b0-ad1b-acbc83a9c031.png", 
      alt: "CVS",
      link: "https://www.cvs.com/" 
    },
    { 
      src: "/lovable-uploads/693baced-5c95-433f-a927-64182c6c6868.png", 
      alt: "Razer Gold",
      link: "https://gold.razer.com/" 
    }
  ];
  
  // Get the appropriate logo size based on the viewport
  const getLogoSize = () => {
    if (isMobile) return 28;
    if (isTablet) return 32;
    return 36; // desktop
  };
  
  // Double the array for infinite loop effect
  const duplicatedLogos = [...paymentLogos, ...paymentLogos];
  
  // Animation settings
  const carouselVariants = {
    animate: {
      x: [0, -100 * paymentLogos.length],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="mt-4 overflow-hidden" ref={containerRef}>
      <h4 className="text-sm font-medium text-gray-300 mb-2">Payment Methods:</h4>
      <div className="relative w-full overflow-hidden">
        <motion.div 
          className="flex" 
          variants={carouselVariants}
          animate="animate"
          style={{ width: `${duplicatedLogos.length * 100}px` }}
        >
          {duplicatedLogos.map((logo, index) => (
            <a 
              key={`${logo.alt}-${index}`} 
              href={logo.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 mx-3 hover:opacity-80 transition-opacity"
            >
              <img 
                src={logo.src} 
                alt={logo.alt} 
                style={{ 
                  height: `${getLogoSize()}px`,
                  objectFit: 'contain'
                }}
                className="bg-white/10 backdrop-blur-sm rounded-md p-1"
              />
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentLogosCarousel;
