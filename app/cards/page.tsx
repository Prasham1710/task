"use client";
import Image from "next/image";
import { motion} from "framer-motion";
import { useRef, useState, } from "react";
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
    description: "Official website of the Saudi Arabia's capital",
    image: "/mp3.png",
    video: "/mp3.mp4",
  },
];
export default function Cardsp() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="relative min-h-screen bg-neutral-900 rounded-t-[100px] py-24">
      {/* Custom Cursor */}

      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="text-7xl font-bold mb-32 text-white italic text-center"
        >
          Featured
          <br />
          projects
        </h2>
        <div className="flex flex-col gap-12">
          {projects.map((project, index) => {
            const videoRef = useRef<HTMLVideoElement>(null);
            const [isPlaying, setIsPlaying] = useState(false);
            return (
              <div
                key={project.id}
                className={`relative project-card w-full md:w-[39%] ${
                  index % 2 === 0
                    ? "md:ml-[10%] md:mr-auto"
                    : "md:mr-[10%] md:ml-auto"
                }`}
                data-cursor="explore"
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
                    {/* Video Element */}
                    <video
                      ref={videoRef}
                      src={project.video}
                      className="absolute inset-0 w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      poster={project.image}
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
