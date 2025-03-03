"use client";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarNav } from "@/components/sidebarn";
import { CustomCursor } from "@/components/custom-cursor";
import Image from "next/image";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white">
      <CustomCursor />
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 bg-white/80 backdrop-blur-md">
        <div className="text-xl font-medium">cuberto</div>
        <div className="flex items-center gap-4">
          <span className="text-sm">menu</span>
          <Button
            variant="ghost"
            size="icon"
            className="text-black"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <main className="flex min-h-screen flex-col items-start justify-center px-24">
        <div className="max-w-[90%]">
          <h6 className="text-[7rem] md:text-[8rem] font-light leading-[1] tracking-[-0.02em] relative">
            We are a digital
            <br />
            <span className="inline-flex items-center gap-4">
              <div className=" video-container w-[220px] h-[140px] rounded-[30px] overflow-hidden bg-gray-300">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/video.mp4" type="video/mp4" />
                </video>
              </div>
              <span className="italic">design</span> and
            </span>
            <br />
            motion agency
          </h6>
        </div>
      </main>

      {/* Contact Floating Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="relative group w-24 h-24 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border border-gray-200 group-hover:scale-110 transition-transform duration-300">
            <Image
              src="/next.svg"
              alt="Contact"
              width={48}
              height={48}
              className="rounded-full"
            />
          </div>
          <div className="absolute w-28 h-28 group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-full h-full animate-spin-slow"
              viewBox="0 0 120 120"
            >
              <path
                id="textPath"
                d="M 60,60 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                fill="none"
              />
              <text className="text-[13px] uppercase">
                <textPath href="#textPath" startOffset="0%">
                  contact - contact - contact - contact
                </textPath>
              </text>
            </svg>
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsSidebarOpen(false)}
          ></motion.div>

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.5 }}
            className="fixed right-0 top-0 h-full w-1/2 bg-white z-50 shadow-lg"
          >
            <div className="absolute top-6 right-6">
              <Button
                variant="ghost"
                size="icon"
                className="text-black"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <SidebarNav onClose={() => setIsSidebarOpen(false)} />
          </motion.div>
        </>
      )}

      {/* Video Section (Auto Play on Scroll) */}
      <div className="min-h-screen relative">
        <div className=" video-container absolute inset-0 z-10">
          <video
            loop
            muted
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}
