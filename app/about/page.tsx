"use client";
import { useEffect, useRef } from "react";

export default function AboutPage() {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let angle = 0;

    const rotateImage = () => {
      if (imageRef.current) {
        angle += 0.2; // Slower speed
        imageRef.current.style.transform = `perspective(1000px) rotateY(${angle}deg)`;
      }
      requestAnimationFrame(rotateImage);
    };

    rotateImage(); // Start animation

    return () => cancelAnimationFrame(rotateImage as unknown as number);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <main className="flex min-h-screen items-center px-24">
        <div className="grid grid-cols-2 gap-12 w-full">
          {/* Rotating Image - Reduced Size */}
          {/* Rotating Image - Reduced Size & Moved Right */}
          <div
            ref={imageRef}
            className="w-2/4 max-w-[300px] aspect-[4/5] bg-gray-100 rounded-3xl overflow-hidden transition-transform duration-300 ease-out ml-24"
          >
            <img
              src="rc.jpg"
              alt="Rotating Object"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-light mb-6 leading-snug">
              Cuberto is a leading digital product agency focused on branding,
              UI/UX design, mobile, and web development.
            </h1>
            <div
              className="relative group rounded-full border border-black px-24 py-10 text-4xl font-bold w-fit cursor-pointer overflow-hidden"
              data-cursor="transition"
            >
              {/* Background Transition Effect */}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[200%] h-[400%] bg-black rounded-full scale-0 group-hover:scale-100 transition-transform duration-[700ms] ease-out will-change-transform"></span>

              {/* Button Text */}
              <span className="relative z-10 transition-colors duration-[700ms] ease-out will-change-color group-hover:text-white">
                What we do
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
