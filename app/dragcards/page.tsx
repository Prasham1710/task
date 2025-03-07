"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Grab } from "lucide-react";

const CubertoImageCards = () => {
  const cards = [
    {
      id: 1,
      title: "Astrology Planner",
      subtitle: "Plan, Achieve, Thrive",
      theme: "bg-green-100",
      textColor: "text-green-900",
      image: "/Drag1.png",
    },
    {
      id: 2,
      title: "Boost Creators",
      subtitle: "Empowering Creative Potential",
      theme: "bg-gray-100",
      textColor: "text-gray-900",
      image: "/Drag2.png",
    },
    {
      id: 3,
      title: "Next Gen Creatives",
      subtitle: "AI-Powered Innovation",
      theme: "bg-slate-100",
      textColor: "text-slate-900",
      image: "/Drag1.png",
    },
    {
      id: 4,
      title: "Next Gen Creatives",
      subtitle: "AI-Powered Innovation",
      theme: "bg-slate-100",
      textColor: "text-slate-900",
      image: "/Drag1.png",
    },
  ];

  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const x = useMotionValue(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const cardWidth = isMobile ? window.innerWidth * 0.85 : 500; // Responsive width
  const dragConstraints = {
    left: -(cards.length - 1) * cardWidth, // Adjusted for better mobile behavior
    right: 0,
  };

  return (
    <div className="overflow-hidden py-10">
      {" "}
      {/* Prevents horizontal scrolling */}
      <motion.div
        ref={containerRef}
        data-cursor="drag"
        drag="x"
        dragConstraints={dragConstraints}
        dragElastic={0.2}
        style={{ x }}
        className="flex space-x-4 px-4 md:px-8" // Keeps padding consistent
      >
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className={`
              relative flex-shrink-0 overflow-hidden group 
              ${card.theme} ${card.textColor} 
              w-[85vw] md:w-[500px] h-[50vh] md:h-[300px] rounded-2xl md:rounded-3xl
            `}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 z-0">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            <div className="relative z-10 p-6 flex flex-col justify-between w-full h-full text-white">
              <div>
                <h2 className="font-bold text-2xl md:text-3xl mb-2">
                  {card.title}
                </h2>
                <p className="opacity-80 text-base md:text-xl">
                  {card.subtitle}
                </p>
              </div>

              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center text-white bg-white/20 rounded-full px-3 py-1">
                  <Grab className="mr-2" size={14} />
                  <span className="text-xs">Drag</span>
                </div>
              </div>

              <div className="absolute bottom-0 right-0 opacity-30 text-7xl font-bold">
                {card.id}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CubertoImageCards;
