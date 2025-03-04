"use client";
import { motion } from "framer-motion";
import { useState } from "react";
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

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white relative">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Header */}
      <div className="top-4 left-0 right-0 flex items-center justify-between py-8 px-8 md:px-16 w-full">
        <Button className="text-4xl font-bold">cuberto</Button>

        {/* Hide Menu Icon When Sidebar is Open */}
        {!isSidebarOpen && (
          <div className="flex items-center gap-8">
            <span className="text-2xl font-semibold">menu</span>
            <Button
              variant="ghost"
              size="icon"
              className="text-black"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-12 w-12" />
            </Button>
          </div>
        )}
      </div>

      {/* Sidebar */}
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
          ></motion.div>

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.5 }}
            className="fixed right-0 top-0 h-full w-full md:w-1/2 bg-white z-50 shadow-lg px-6 pt-8"
          >
            {/* Close Button (Aligned Properly) */}
            <div className="absolute top-6 right-6">
              <Button
                variant="ghost"
                size="icon"
                className="text-black"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="h-10 w-10" />
              </Button>
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
        <Footer />
      </main>
    </div>
  );
}
