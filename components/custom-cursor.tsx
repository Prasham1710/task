"use client";

import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVideoHover, setIsVideoHover] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isDarkBackground, setIsDarkBackground] = useState(false); // Detects dark background

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      const size = isHovering || isVideoHover ? 80 : 20; // Default size 10px
      mouseX.set(e.clientX - size / 2);
      mouseY.set(e.clientY - size / 2);

      const target = document.elementFromPoint(
        e.clientX,
        e.clientY
      ) as HTMLElement;
      if (!target) return;

      if (target.closest("[data-cursor='video']")) {
        setIsVideoHover(true);
        setIsHovering(false);
        return;
      }

      setIsVideoHover(false);
      const isInteractive = target.closest("a, button, .cursor-pointer");

      setIsHovering(!!isInteractive );

      // **Detect background color**
      let bgColor = window.getComputedStyle(target).backgroundColor;
      if (bgColor === "rgba(0, 0, 0, 0)") {
        // If it's transparent, check the parent
        let parent = target.parentElement;
        while (parent && bgColor === "rgba(0, 0, 0, 0)") {
          bgColor = window.getComputedStyle(parent).backgroundColor;
          parent = parent.parentElement;
        }
      }

      // Convert bg color to RGB values and check brightness
      const match = bgColor.match(/\d+/g);
      if (match) {
        const r = parseInt(match[0]);
        const g = parseInt(match[1]);
        const b = parseInt(match[2]);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        setIsDarkBackground(brightness < 128);
      }
    };

    document.addEventListener("mousemove", updateCursor);
    document.addEventListener("mouseleave", () => setIsVisible(false));
    document.addEventListener("mouseenter", () => setIsVisible(true));

    return () => {
      document.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mouseleave", () => setIsVisible(false));
      document.removeEventListener("mouseenter", () => setIsVisible(true));
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed flex items-center justify-center rounded-full pointer-events-none z-[9999] shadow-lg font-semibold"
      style={{
        x: smoothX,
        y: smoothY,
        backgroundColor:
          isHovering || isVideoHover
            ? "white"
            : isDarkBackground
            ? "white"
            : "black",
        border:
          isHovering || isVideoHover
            ? "2px solid rgba(255, 255, 255, 0.5)"
            : "none", // White border when hovering
        width: isHovering || isVideoHover ? 60 : 10,
        height: isHovering || isVideoHover ? 60 : 10,
        mixBlendMode: isHovering
          ? "difference"
          : isDarkBackground
          ? "difference"
          : "normal",
      }}
      animate={{
        scale: isHovering ? 1.3 : isVideoHover ? 1.5 : 1,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div>
        {isVideoHover ? (
          <motion.div
            className="flex items-center justify-center w-full h-full bg-white rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Play size={50} strokeWidth={2} className="text-black" />
          </motion.div>
        ) : null}{" "}
        {/* Add a fallback (null) or another element if needed */}
      </motion.div>
    </motion.div>
  );
}
