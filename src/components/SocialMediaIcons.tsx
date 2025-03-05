
import { motion } from "framer-motion";
import "./SocialMediaIcons.css";

const SocialMediaIcons = () => {
  const socialIcons = [
    { name: "Reddit", src: "/lovable-uploads/cfe59f0f-a327-4aa8-9bff-b25f0075981c.png", link: "https://reddit.com" },
    { name: "TikTok", src: "/lovable-uploads/76e56af4-c8eb-4b94-9e1b-25c02adc9315.png", link: "https://tiktok.com" },
    { name: "Discord", src: "/lovable-uploads/3e65c4a4-0ec1-47de-a89e-144fd3914c86.png", link: "https://discord.com" },
    { name: "YouTube", src: "/lovable-uploads/00ca65fe-e177-4f73-9942-3d47c99fc997.png", link: "https://youtube.com" },
    { name: "Twitter/X", src: "/lovable-uploads/a0ecb7e0-422e-4e2a-8361-0f4d90332dc5.png", link: "https://x.com" },
    { name: "Instagram", src: "/lovable-uploads/d0c4f228-e3bc-4b24-be3d-4fc205ebc36f.png", link: "https://instagram.com" },
    { name: "Facebook", src: "/lovable-uploads/39d11692-fef2-4bd7-9273-6cae480df2bc.png", link: "https://facebook.com" },
  ];

  return (
    <div className="mt-6">
      <h3 className="text-white font-bold mb-4 text-center">Follow Us</h3>
      <div className="flex justify-center flex-wrap gap-5 mx-auto max-w-2xl">
        {socialIcons.map((icon) => (
          <motion.a
            key={icon.name}
            href={icon.link}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-container"
            initial={{ y: 0, x: 0 }}
            animate={{ 
              y: [0, -5, 0, 5, 0],
              x: [0, 3, 0, -3, 0],
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              repeatType: "mirror",
              ease: "easeInOut",
              delay: Math.random() * 2 // Random delay for each icon to create variety
            }}
            whileHover={{ scale: 1.15, y: -3 }}
          >
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src={icon.src}
                alt={icon.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaIcons;
