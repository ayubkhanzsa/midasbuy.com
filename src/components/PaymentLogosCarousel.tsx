
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useResponsive } from '@/hooks/use-mobile';
import './PaymentLogosCarousel.css';

const PaymentLogosCarousel = () => {
  const { isMobile, isTablet } = useResponsive();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Payment method logos with their respective links
  const paymentLogos = [
    { 
      src: "/lovable-uploads/7a0d6345-29e5-4523-a58b-99c479881319.png", 
      alt: "WeChat Pay",
      link: "https://pay.weixin.qq.com/" 
    },
    { 
      src: "/lovable-uploads/f4e1454b-ee95-4ccd-8373-ee2abbc125e0.png", 
      alt: "Paysafecard",
      link: "https://www.paysafecard.com/" 
    },
    { 
      src: "/lovable-uploads/c0720f31-5b4a-4103-8e72-034b6e40e193.png", 
      alt: "QBucks",
      link: "https://qbucks.com/" 
    },
    { 
      src: "/lovable-uploads/6c1448cd-5a0c-4758-97f1-8bc182285369.png", 
      alt: "Dollar General",
      link: "https://www.dollargeneral.com/" 
    },
    { 
      src: "/lovable-uploads/03fdf9b3-8539-407f-a49b-6373f6697e9d.png", 
      alt: "PayPal",
      link: "https://www.paypal.com/" 
    },
    { 
      src: "/lovable-uploads/f537874b-483d-4d48-b6f4-11e32ac37364.png", 
      alt: "Razer Gold",
      link: "https://gold.razer.com/" 
    },
    { 
      src: "/lovable-uploads/3730deb3-05f5-4bbe-9efa-195af7f29836.png", 
      alt: "PayPal",
      link: "https://www.paypal.com/" 
    },
    { 
      src: "/lovable-uploads/f3eef038-8d82-4ddc-8728-78c42891e7eb.png", 
      alt: "Credit Card",
      link: "https://www.visa.com/" 
    },
    { 
      src: "/lovable-uploads/c79df0c5-b617-4df7-9a31-a4c7bff7adf1.png", 
      alt: "Google Pay",
      link: "https://pay.google.com/" 
    },
    { 
      src: "/lovable-uploads/92b9671d-9796-4e4c-b93e-accba3fb373b.png", 
      alt: "Apple Pay",
      link: "https://www.apple.com/apple-pay/" 
    },
    { 
      src: "/lovable-uploads/7ced4eaa-5e21-4b51-9998-13cc4910f35a.png", 
      alt: "CVS",
      link: "https://www.cvs.com/" 
    },
    { 
      src: "/lovable-uploads/0c0b49b5-dfc9-4276-a464-a5857a2dcffc.png", 
      alt: "Razer Gold",
      link: "https://gold.razer.com/" 
    }
  ];
  
  // Get the appropriate logo size based on the viewport
  const getLogoSize = () => {
    if (isMobile) return 44;
    if (isTablet) return 50;
    return 54;
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
    <div className="mt-6 overflow-hidden" ref={containerRef}>
      <div className="payment-logos-container">
        <motion.div 
          className="flex payment-logos-scroll" 
          variants={carouselVariants}
          animate="animate"
        >
          {duplicatedLogos.map((logo, index) => (
            <a 
              key={`${logo.alt}-${index}`} 
              href={logo.link}
              target="_blank"
              rel="noopener noreferrer"
              className="payment-logo"
            >
              <img 
                src={logo.src} 
                alt={logo.alt} 
                style={{ 
                  height: `${getLogoSize()}px`,
                  objectFit: 'contain'
                }}
                className="bg-white/10 backdrop-blur-sm rounded-md p-1.5"
              />
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentLogosCarousel;
