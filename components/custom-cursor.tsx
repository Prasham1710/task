"use client";

import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVideoHover, setIsVideoHover] = useState(false);
  const [isCardHover, setIsCardHover] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  const [hoverText, setHoverText] = useState("");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      const size = isHovering || isVideoHover || isCardHover ? 80 : 20;
      mouseX.set(e.clientX - size / 2);
      mouseY.set(e.clientY - size / 2);

      const target = document.elementFromPoint(
        e.clientX,
        e.clientY
      ) as HTMLElement;
      if (!target) return;

      // Check for video elements
      if (target.closest("[data-cursor='video']")) {
        setIsVideoHover(true);
        setIsHovering(false);
        setIsCardHover(false);
        return;
      }

      // Check for card elements
      if (target.closest("[data-cursor='card']")) {
        setIsCardHover(true);
        setHoverText("Explore");
        setIsHovering(false);
        setIsVideoHover(false);
        return;
      }

      setIsVideoHover(false);
      setIsCardHover(false);

      // Check for interactive elements
      const isInteractive = target.closest("a, button, .cursor-pointer");
      setIsHovering(!!isInteractive);

      // Detect background color
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
        const r = Number.parseInt(match[0]);
        const g = Number.parseInt(match[1]);
        const b = Number.parseInt(match[2]);
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
  }, [mouseX, mouseY, isHovering, isVideoHover, isCardHover]);

  return (
    <motion.div
      className="fixed flex items-center justify-center rounded-full pointer-events-none z-[9999] shadow-lg font-semibold"
      style={{
        x: smoothX,
        y: smoothY,
        backgroundColor:
          isHovering || isVideoHover || isCardHover
            ? "white"
            : isDarkBackground
            ? "white"
            : "black",
        border:
          isHovering || isVideoHover || isCardHover
            ? "2px solid rgba(255, 255, 255, 0.5)"
            : "none",
        width: isHovering || isVideoHover || isCardHover ? 60 : 10,
        height: isHovering || isVideoHover || isCardHover ? 60 : 10,
        mixBlendMode: isHovering
          ? "difference"
          : isDarkBackground
          ? "difference"
          : "normal",
      }}
      animate={{
        scale: isHovering ? 1.3 : isVideoHover ? 1.5 : isCardHover ? 1.4 : 1,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {isVideoHover && (
        <motion.div
          className="flex items-center justify-center w-full h-full bg-white rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <Play size={50} strokeWidth={1} className="text-black" />
        </motion.div>
      )}

      {isCardHover && (
        <motion.div
  className="flex items-center justify-center w-full h-full bg-white rounded-full"
  initial={{ scale: 0.5 }} // Start slightly visible
  animate={{ scale: 1 }} // Instant transition
  transition={{ type: "spring", stiffness: 500, damping: 10 }} // Faster response
>
  <span className="text-black text-sm font-medium">{hoverText}</span>
</motion.div>

      )}
    </motion.div>
  );
}
