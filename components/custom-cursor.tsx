"use client";

import { useEffect, useState } from "react";
import { Play, Grab } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [cursorType, setCursorType] = useState<
    "default" | "hover" | "video" | "card" | "drag"
  >("default");
  const [isVisible, setIsVisible] = useState(true);
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  const [hoverText, setHoverText] = useState("");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const target = document.elementFromPoint(clientX, clientY) as HTMLElement;
      if (!target) return;

      let newCursorType: typeof cursorType = "default";

      if (target.closest("[data-cursor='video']")) {
        newCursorType = "video";
      } else if (target.closest("[data-cursor='card']")) {
        newCursorType = "card";
        setHoverText("Explore");
      } else if (target.closest("[data-cursor='drag']")) {
        newCursorType = "drag";
        setHoverText("Drag");
      } else if (target.closest("a, button, .cursor-pointer")) {
        newCursorType = "hover";
      }

      setCursorType(newCursorType);

      // Detect background color
      let bgColor = window.getComputedStyle(target).backgroundColor;
      let parent = target.parentElement;
      while (parent && bgColor === "rgba(0, 0, 0, 0)") {
        bgColor = window.getComputedStyle(parent).backgroundColor;
        parent = parent.parentElement;
      }

      // Convert bg color to RGB values and check brightness
      const match = bgColor.match(/\d+/g);
      if (match) {
        const [r, g, b] = match.map(Number);
        setIsDarkBackground((r * 299 + g * 587 + b * 114) / 1000 < 128);
      }

      // Adjust cursor position
      const size = cursorType === "default" ? 10 : 60;
      mouseX.set(clientX - size / 2);
      mouseY.set(clientY - size / 2);
    };

    const hideCursor = () => setIsVisible(false);
    const showCursor = () => setIsVisible(true);

    document.addEventListener("mousemove", updateCursor);
    document.addEventListener("mouseleave", hideCursor);
    document.addEventListener("mouseenter", showCursor);

    return () => {
      document.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mouseleave", hideCursor);
      document.removeEventListener("mouseenter", showCursor);
    };
  }, [mouseX, mouseY, cursorType]);

  return (
    <motion.div
      className="fixed flex items-center justify-center rounded-full pointer-events-none z-[9999] shadow-lg font-semibold"
      style={{
        x: smoothX,
        y: smoothY,
        backgroundColor:
          cursorType !== "default"
            ? "white"
            : isDarkBackground
            ? "white"
            : "black",
        border:
          cursorType !== "default"
            ? "2px solid rgba(255, 255, 255, 0.5)"
            : "none",
        width: cursorType !== "default" ? 60 : 10,
        height: cursorType !== "default" ? 60 : 10,
        mixBlendMode:
          cursorType === "hover"
            ? "difference"
            : isDarkBackground
            ? "difference"
            : "normal",
      }}
      animate={{
        scale:
          cursorType === "hover"
            ? 1.3
            : cursorType === "video"
            ? 1.5
            : cursorType === "card"
            ? 1.4
            : cursorType === "drag"
            ? 1.6
            : 1,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Play Button for Video Hover */}
      {cursorType === "video" && (
        <motion.div
          className="flex items-center justify-center w-full h-full bg-white rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <Play size={50} strokeWidth={1} className="text-black" />
        </motion.div>
      )}

      {/* Explore Text for Card Hover */}
      {(cursorType === "card" || cursorType === "drag") && (
        <motion.div
          className="flex items-center justify-center w-full h-full bg-white rounded-full"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 10 }}
        >
          <span className="text-black text-sm font-medium">{hoverText}</span>
        </motion.div>
      )}
    </motion.div>
  );
}
