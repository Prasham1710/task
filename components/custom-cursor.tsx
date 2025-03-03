"use client";

import { useEffect, useState } from "react";
import { Play } from "lucide-react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVideoHover, setIsVideoHover] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest(".video-container")) {
        setIsVideoHover(true);
        setIsHovering(false);
        return;
      }

      setIsVideoHover(false);
      setIsHovering(
        target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          !!target.closest("a") ||
          !!target.closest("button") ||
          target.classList.contains("cursor-pointer")
      );
    };

    document.addEventListener("mousemove", updatePosition, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${isHovering ? "custom-cursor-hover" : ""} ${
        isVideoHover ? "custom-cursor-video" : ""
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {isVideoHover && (
        <div className="cursor-play-icon">
          <Play size={30} strokeWidth={2} />
        </div>
      )}
    </div>
  );
}
