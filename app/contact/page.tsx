"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.div
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.95 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="relative w-24 h-24 flex items-center justify-center cursor-pointer"
      >
        {/* Inner Button */}
        <motion.div
          className="w-16 h-16 rounded-full bg-white flex items-center justify-center border border-gray-200"
          whileHover={{ scale: 1.2, rotate: 10 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Image
            src="/next.svg"
            alt="Contact"
            width={48}
            height={48}
            className="rounded-full"
          />
        </motion.div>

        {/* Circular Text Animation */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-28 h-28"
        >
          <svg className="w-full h-full" viewBox="0 0 120 120">
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
        </motion.div>
      </motion.div>
    </div>
  );
}
