"use client";

import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVideoHover, setIsVideoHover] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [cursorText, setCursorText] = useState("");
  const [isInSidebar, setIsInSidebar] = useState(false); // New State

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      const size = isHovering || isVideoHover ? 80 : 30; // Reduce normal size
      mouseX.set(e.clientX - size / 2);
      mouseY.set(e.clientY - size / 2);

      const target = document.elementFromPoint(
        e.clientX,
        e.clientY
      ) as HTMLElement;
      if (!target) return;

      // Check if inside the sidebar
      setIsInSidebar(!!target.closest("[data-cursor='sidebar']"));

      if (target.closest("[data-cursor='video']")) {
        setIsVideoHover(true);
        setIsHovering(false);
        setCursorText("");
        return;
      }

      setIsVideoHover(false);
      const isInteractive = target.closest("a, button, .cursor-pointer");
      const isCard = target.closest("[data-cursor='explore']");

      setIsHovering(!!isInteractive || !!isCard);
      setCursorText(isCard ? "Explore" : "");
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
        backgroundColor: isInSidebar ? "black" : "white", // Change color in sidebar
        width: isHovering || isVideoHover ? 80 : 30, // Normal cursor is smaller
        height: isHovering || isVideoHover ? 80 : 30,
        mixBlendMode: isHovering
          ? "normal"
          : isInSidebar
          ? "normal"
          : "difference", // Ensure visibility
      }}
      animate={{
        scale: isHovering ? 1.1 : isVideoHover ? 1.3 : 1,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {isVideoHover ? (
        <motion.div
          className="flex items-center justify-center w-full h-full bg-white rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <Play size={32} strokeWidth={2} className="text-black" />
        </motion.div>
      ) : (
        cursorText && (
          <motion.span className="text-black">{cursorText}</motion.span>
        )
      )}
    </motion.div>
  );
}
