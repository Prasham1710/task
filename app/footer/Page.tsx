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
  const controls = useAnimation();

  useEffect(() => {
    if (isVisible) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { delay: index * 0.15, duration: 0.5, ease: "easeOut" },
      });
    }
  }, [isVisible, controls, index]);

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block border-t border-gray-800 py-6 md:py-8 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      whileHover={{ backgroundColor: "white", transition: { duration: 0.3 } }}
    >
      {/* Default View */}
      <motion.div
        className="flex justify-between items-center px-6 md:px-12 text-white"
        initial={{ opacity: 1, x: 0 }}
        whileHover={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-xl md:text-3xl font-medium">{text}</span>
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

      {/* Scrolling Text (Visible on Hover) */}
      <motion.div
        className="absolute inset-0 flex items-center text-black"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="flex gap-24 px-6 md:px-12 whitespace-nowrap w-full"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{
            duration: 6,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {Array(16)
            .fill(text)
            .map((item, i) => (
              <span key={i} className="text-2xl md:text-2xl font-medium">
                {item}
              </span>
            ))}
        </motion.div>
      </motion.div>
    </motion.a>
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
