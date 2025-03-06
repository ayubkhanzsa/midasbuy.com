
import React, { useEffect, useState } from 'react';
import './SocialMediaIcons.css';

const PaymentMethodsCarousel = () => {
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [renderComplete, setRenderComplete] = useState(false);
  
  const paymentMethods = [
    { src: "/lovable-uploads/472b4a57-816e-438a-9263-5def84a255d4.png", alt: "WeChat Pay", link: "#" },
    { src: "/lovable-uploads/49c6d1b3-3f65-4564-abb7-4508f09f1be4.png", alt: "Paysafecard", link: "#" },
    { src: "/lovable-uploads/d144375d-1696-41a3-8db3-0060edf9bc1b.png", alt: "QBucks", link: "#" },
    { src: "/lovable-uploads/34a2899d-6b6b-4a53-b345-8ed077fa89c9.png", alt: "Dollar General", link: "#" },
    { src: "/lovable-uploads/0d361fa6-0d2b-42d0-a2fb-1b292c4a9f68.png", alt: "PayPal", link: "#" },
    { src: "/lovable-uploads/f82e5529-bf2b-4c4e-9278-d43c0e4b5f7b.png", alt: "Razer Gold", link: "#" },
    { src: "/lovable-uploads/fdda1afe-280b-4ce5-8e22-0f007912ad74.png", alt: "Credit Cards", link: "#" },
    { src: "/lovable-uploads/17e669b9-358d-4d7d-afaa-06e54f7a7d21.png", alt: "Google Pay", link: "#" },
    { src: "/lovable-uploads/3a833ba0-ffe1-4464-b71c-3078d1ad11a3.png", alt: "Apple Pay", link: "#" },
    { src: "/lovable-uploads/239b1416-8be4-4867-a17f-1021d7fa9634.png", alt: "CVS", link: "#" },
    { src: "/lovable-uploads/a267526b-908a-4ca3-b4a2-5a2e84d6028d.png", alt: "Razer Gold", link: "#" }
  ];

  // Duplicate the array for seamless looping
  const duplicatedMethods = [...paymentMethods, ...paymentMethods];

  useEffect(() => {
    // Preload all payment method images in parallel
    const preloadPromises = paymentMethods.map(method => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = method.src;
        img.loading = "eager";
        img.onload = () => {
          setImagesLoaded(prev => prev + 1);
          resolve();
        };
        img.onerror = () => resolve();
      });
    });
    
    // Mark component as ready to render when all images are loaded
    Promise.all(preloadPromises).then(() => {
      setRenderComplete(true);
    });
  }, []);

  return (
    <div className="mt-4">
      <h3 className="text-white font-bold mb-4 text-center">Payment Methods</h3>
      <div className={`payment-methods-container transition-opacity duration-300 ${renderComplete ? 'opacity-100' : 'opacity-0'}`}>
        <div className="payment-methods-scroll">
          {duplicatedMethods.map((method, index) => (
            <a
              key={`${method.alt}-${index}`}
              href={method.link}
              target="_blank"
              rel="noopener noreferrer"
              className="payment-method-logo"
            >
              <img 
                src={method.src} 
                alt={method.alt} 
                className="h-full w-auto object-contain"
                style={{ display: 'block', maxWidth: '100%', maxHeight: '100%' }}
                loading="eager"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsCarousel;
