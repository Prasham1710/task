"use client";
import React from "react";

export default function VideoSection() {
  return (
    <div className="min-h-screen relative">
      <div className="video-container absolute inset-0 z-10">
        <video
          loop
          muted
          autoPlay
          playsInline
          data-cursor="video"
          className="w-full h-full object-cover"
        >
          <source src="/v2.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
