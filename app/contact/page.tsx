import Image from "next/image";

export default function Contact() {
  return (
  <div className="fixed bottom-8 right-8 z-50">
    <div className="relative group w-24 h-24 flex items-center justify-center cursor-pointer">
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
        <svg className="w-full h-full animate-spin-slow" viewBox="0 0 120 120">
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
  )
}

