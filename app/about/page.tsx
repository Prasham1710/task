"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let angle = 0;
    const speed = window.innerWidth <= 768 ? 0.3 : 0.6; // Slower rotation on mobile
    const updateRotation = () => {
      if (imageRef.current) {
        angle += speed;
        imageRef.current.style.transform = `perspective(1200px) rotateY(${angle}deg)`;
      }
      requestAnimationFrame(updateRotation);
    };

    const animationFrame = requestAnimationFrame(updateRotation);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="bg-white mt-0">
      <main className="flex items-center px-6 md:px-24 py-12 md:py-24 mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
          {/* Rotating Image */}
          <div className="flex justify-center">
            <div
              ref={imageRef}
              className="w-full max-w-[200px] md:max-w-[300px] aspect-[4/5] overflow-hidden"
            >
              <img
                src="/rc.jpg"
                alt="Rotating Object"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col justify-center text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-light mb-6 leading-snug">
              Cuberto is a leading digital product agency focused on branding,
              UI/UX design, mobile, and web development.
            </h1>
            <motion.button
              className="relative group rounded-full border border-black px-12 md:px-16 py-4 md:py-6 text-2xl md:text-3xl font-bold w-fit mx-auto md:mx-0 cursor-pointer overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {/* Background Transition Effect */}
              <motion.span
                className="absolute inset-0 bg-black rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"
                layoutId="button-background"
              />
              {/* Button Text */}
              <span className="relative z-10 group-hover:text-white transition-colors duration-500 ease-out">
                What we do
              </span>
            </motion.button>
          </div>
        </div>
      </main>
    </div>
  );
}
