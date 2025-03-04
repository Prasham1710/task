import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const AnimatedFooterLink = ({
  text,
  url,
  index,
  isVisible,
}: {
  text: string;
  url: string;
  index: number;
  isVisible: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (isVisible) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          delay: index * 0.2,
          duration: 0.6,
          ease: "easeOut",
        },
      });
    }
  }, [isVisible, controls, index]);

  return (
    <motion.div
      className={`relative overflow-hidden border-t py-8 md:py-12 my-6 md:my-8 transition-colors duration-300 ${
        isHovered ? "bg-white border-gray-700" : "border-gray-800"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-full"
      >
        <div className="flex justify-between items-center px-6 md:px-12">
          {/* Normal Text (visible when not hovered) */}
          <motion.span
            className="text-white text-xl md:text-3xl font-medium"
            animate={{
              opacity: isHovered ? 0 : 1,
              x: isHovered ? -50 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {text}
          </motion.span>

          {/* Arrow Icon */}
          <motion.div
            animate={{
              x: isHovered ? -10 : 0,
              opacity: isHovered ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="text-white"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="md:w-6 md:h-6"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </motion.div>
        </div>

        {/* Scrolling Text Container (visible on hover) */}
        <motion.div
          className="absolute inset-0 flex items-center"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Scrolling Text - starts from right and moves left */}
          <motion.div
            className="flex items-center px-6 md:px-12 w-full"
            initial={{ x: "100%" }}
            animate={{
              x: isHovered ? "-100%" : "100%",
            }}
            transition={{
              duration: 8, // Slower animation (8 seconds)
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <div className="w-full overflow-hidden whitespace-nowrap">
  <div className="flex items-center gap-8 animate-marquee">
    {Array(10).fill(text).map((item, index) => (
      <span
        key={index}
        className="text-black px-4 py-1 rounded-full text-xl md:text-2xl font-medium"
      >
        {item}
      </span>
    ))}
  </div>
</div>

          </motion.div>
        </motion.div>
      </a>
    </motion.div>
  );
};

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const links = [
    { text: "LinkedIn", url: "https://linkedin.com" },
    { text: "Dribbble", url: "https://dribbble.com" },
    { text: "GitHub", url: "https://github.com" },
    { text: "YouTube", url: "https://youtube.com" },
  ];

  useEffect(() => {
    // Set visible after component mounts to trigger animations
    setIsVisible(true);
  }, []);

  return (
    <footer className="bg-black w-full p-6 md:p-10">
      {links.map((link, index) => (
        <AnimatedFooterLink
          key={index}
          index={index}
          text={link.text}
          url={link.url}
          isVisible={isVisible}
        />
      ))}
    </footer>
  );
};

export default Footer;
