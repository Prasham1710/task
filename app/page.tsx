"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarNav } from "@/components/sidebarn";
import { CustomCursor } from "@/components/custom-cursor";
import AboutPage from "./about/page";
import VideoSection from "./vdsection/page";
import Contact from "./contact/page";
import Dashboard from "./dasboard/page";
import Cardsp from "./cards/page";
import Footer from "./footer/Page";
import LeftToRightDragCards from "./dragcards/page";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar when "Esc" key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-white relative">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Header */}
      <div className=" left-0 right-0 flex items-center justify-between py-8  md:px-16 w-full">
        <Button className="text-4xl font-bold">cuberto</Button>

        {/* Hide Menu Icon When Sidebar is Open */}
        {!isSidebarOpen && (
          <div className="flex items-center gap-8 ml-auto">
            {" "}
            {/* Added ml-auto */}
            <span className="text-2xl font-semibold">menu</span>
            <button
              className="text-black p-3 md:p-4"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-10 w-10 md:h-12 md:w-12" />
            </button>
          </div>
        )}
      </div>

      {/* Sidebar with AnimatePresence for smooth unmounting */}
      {isSidebarOpen && (
        <>
          {/* Dark Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.5 }}
            className="fixed right-0 top-0 h-full w-full md:w-1/2 bg-white z-50 shadow-lg px-6 pt-8"
          >
            {/* Close Button */}
            <div className="absolute top-6 right-6 flex">
              <button
                className="text-black p-3 md:p-4"
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-12 w-20 md:h-12 md:w-12" />
              </button>
            </div>
            {/* Sidebar Navigation */}
            <SidebarNav onClose={() => setIsSidebarOpen(false)} />
          </motion.div>
        </>
      )}

      {/* Page Content */}
      <main className="pt-0">
        <Dashboard />
        <VideoSection />
        <AboutPage />
        <Cardsp />
        <div className="hidden md:block">
          <Contact />
        </div>
        <LeftToRightDragCards />
        <Footer />
      </main>
    </div>
  );
}
