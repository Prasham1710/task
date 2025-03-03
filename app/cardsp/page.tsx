"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  video: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Punto Pago",
    description: "The First Super-App in Latin America",
    image: "/rc.jpg",
    video: "/video.mp4",
  },
  {
    id: 2,
    title: "Kelvin Zero",
    description: "A digital product for passwordless authentication",
    image: "/rc.jpg",
    video: "/video.mp4",
  },
  {
    id: 3,
    title: "Secondly",
    description: "Astrology planner app: plan, achieve, thrive",
    image: "/rc.jpg",
    video: "/video.mp4",
  },
  {
    id: 4,
    title: "Riyadh",
    description: "Official website of the Saudi Arabia's capital",
    image: "/rc.jpg",
    video: "/video.mp4",
  },
];

export function Cardsp() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className="relative min-h-screen bg-neutral-900 rounded-t-[100px] py-24">
      {/* Custom Cursor */}
      <motion.div
        className="fixed flex items-center justify-center w-24 h-24 bg-white text-black font-bold text-lg rounded-full pointer-events-none shadow-lg z-50"
        animate={{
          x: cursorPos.x - 48,
          y: cursorPos.y - 48,
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        Explore
      </motion.div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-7xl font-bold mb-16 text-white italic text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Featured
          <br />
          projects
        </motion.h2>

        <div className="flex flex-col gap-12">
          {projects.map((project, index) => {
            const videoRef = useRef<HTMLVideoElement>(null);

            return (
              <div
                key={project.id}
                className={`relative project-card ${
                  index % 2 === 0 ? "ml-[10%] mr-auto" : "mr-[10%] ml-auto"
                }`}
                style={{ width: "40%" }}
                data-cursor="explore" // ADDED: Helps custom cursor detect card hover
                onMouseEnter={() => {
                  setIsHovered(true);
                  videoRef.current?.play();
                }}
                onMouseLeave={() => {
                  setIsHovered(false);
                  videoRef.current?.pause();
                }}
              >
                {/* Card */}
                <motion.div
                  className="group relative overflow-hidden rounded-2xl"
                  style={{
                    transform: `translateY(${
                      index % 2 === 0 ? "20px" : "-20px"
                    })`,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a className="block relative aspect-[3/4]">
                    {/* Video Element */}
                    <video
                      ref={videoRef}
                      src={project.video}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      muted
                      loop
                      playsInline
                    />

                    {/* Image Fallback */}
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 transition-opacity duration-700 group-hover:opacity-0" />
                  </a>
                </motion.div>

                {/* Title & Description (Outside the Card) */}
                <div className="mt-4">
                  <h3 className="text-3xl font-bold text-white mb-1">
                    {project.title}
                  </h3>
                  <p className="text-lg text-gray-300">{project.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
