"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

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
    image: "/mp1.png",
    video: "/mp1.mp4",
  },
  {
    id: 2,
    title: "Kelvin Zero",
    description: "A digital product for passwordless authentication",
    image: "/mp4.png",
    video: "/mp4.mp4",
  },
  {
    id: 3,
    title: "Secondly",
    description: "Astrology planner app: plan, achieve, thrive",
    image: "/mp3.png",
    video: "/mp3.mp4",
  },
  {
    id: 4,
    title: "Riyadh",
    description: "Official website of Saudi Arabia's capital",
    image: "/mp3.png",
    video: "/mp3.mp4",
  },
];

export default function Cardsp() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="relative min-h-screen bg-neutral-900 rounded-t-[100px] py-24">
      {/* Title */}
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-7xl font-bold mb-20 text-white italic text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Featured <br /> Projects
        </motion.h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, index) => {
            const videoRef = useRef<HTMLVideoElement>(null);
            const [isPlaying, setIsPlaying] = useState(false);

            return (
              <div
                key={project.id}
                className="relative project-card w-full"
                onMouseEnter={() => videoRef.current?.play()}
                onMouseLeave={() => videoRef.current?.pause()}
              >
                {/* Card Container */}
                <motion.div
                  data-cursor="card"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  className="group relative overflow-hidden rounded-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a className="block relative aspect-[4/5]">
                    {/* Video */}
                    <video
                      ref={videoRef}
                      src={project.video}
                      className="absolute inset-0 w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      poster={project.image}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    />

                    {/* Image Fallback */}
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                    />
                  </a>
                </motion.div>

                {/* Title & Description */}
                <div className="mt-4 text-center md:text-left">
                  <h3 className="text-3xl font-bold text-white">
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
