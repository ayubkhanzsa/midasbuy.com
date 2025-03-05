
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useResponsive } from '@/hooks/use-mobile';
import './PaymentLogosCarousel.css';

const PaymentLogosCarousel = () => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Social media logos with their respective official links
  const socialLogos = [
    { 
      src: "/lovable-uploads/8f778e5f-d38b-463d-8bff-004086ce7deb.png", 
      alt: "Facebook", 
      link: "https://www.facebook.com/midasbuy" 
    },
    { 
      src: "/lovable-uploads/fb236867-879d-4b91-b611-6ae28d1e6ba4.png", 
      alt: "Instagram", 
      link: "https://www.instagram.com/midasbuy" 
    },
    { 
      src: "/lovable-uploads/e84cec8b-5d3a-4f4f-8811-71f8c3720ba7.png", 
      alt: "YouTube", 
      link: "https://www.youtube.com/midasbuy" 
    },
    { 
      src: "/lovable-uploads/e9f85ba7-1e65-424b-b3c7-335c54e95606.png", 
      alt: "TikTok", 
      link: "https://www.tiktok.com/@midasbuy" 
    },
    { 
      src: "/lovable-uploads/f908163b-bb4f-4e56-90fb-1c50b5431f82.png", 
      alt: "Reddit", 
      link: "https://www.reddit.com/r/Midasbuy/" 
    },
    { 
      src: "/lovable-uploads/83ad7998-06b3-45e3-bf1c-7f5558ebbf1a.png", 
      alt: "Twitter/X", 
      link: "https://twitter.com/midasbuy" 
    },
    { 
      src: "/lovable-uploads/3a733dab-e588-4b87-b11b-6860d5551ec9.png", 
      alt: "Discord", 
      link: "https://discord.gg/midasbuy" 
    }
  ];

  // Updated payment method logos with their respective links
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
    if (isMobile) return 44; // Increased size
    if (isTablet) return 50; // Increased size
    return 54; // Increased size
  };

  // Get the appropriate social icon size based on the viewport
  const getSocialIconSize = () => {
    if (isMobile) return 42; // Increased size
    if (isTablet) return 46; // Increased size
    return 50; // Increased size
  };
  
  // Double the array for infinite loop effect
  const duplicatedLogos = [...paymentLogos, ...paymentLogos];
  const duplicatedSocialLogos = [...socialLogos, ...socialLogos];
  
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

  const socialCarouselVariants = {
    animate: {
      x: [0, -100 * socialLogos.length],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 25,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="mt-6 overflow-hidden" ref={containerRef}>
      <h4 className="text-sm font-medium text-gray-300 mb-2">Follow Us:</h4>
      <div className="social-logos-container">
        <motion.div 
          className="flex social-logos-scroll" 
          variants={socialCarouselVariants}
          animate="animate"
        >
          {duplicatedSocialLogos.map((logo, index) => (
            <a 
              key={`social-${logo.alt}-${index}`} 
              href={logo.link}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
            >
              <img 
                src={logo.src} 
                alt={logo.alt} 
                style={{ 
                  width: `${getSocialIconSize()}px`,
                  height: `${getSocialIconSize()}px`
                }}
                className="social-icon"
              />
            </a>
          ))}
        </motion.div>
      </div>

      <h4 className="text-sm font-medium text-gray-300 mt-6 mb-2">Payment Methods:</h4>
      <div className="relative w-full overflow-hidden payment-logos-container">
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
