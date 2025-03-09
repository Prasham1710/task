"use client";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <main className="flex flex-col items-start justify-center px-6 md:px-24 pb-12 md:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-full md:max-w-[90%]"
      >
        <h6 className="text-5xl sm:text-6xl md:text-[7rem] font-light leading-[1.1] tracking-[-0.02em] relative">
          We are a digital
          <br />
          <span className="inline-flex items-center gap-2 md:gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
                delay: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="video-container w-[170px] h-[120px] sm:w-[180px] sm:h-[120px] md:w-[220px] md:h-[140px] rounded-[20px] sm:rounded-[25px] md:rounded-[40px] overflow-hidden bg-gray-300"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/video.mp4" type="video/mp4" />
              </video>
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="italic"
            >
              design
            </motion.span>{" "}
            and
          </span>
          <br />
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            motion agency
          </motion.span>
        </h6>
      </motion.div>
    </main>
  );
}
