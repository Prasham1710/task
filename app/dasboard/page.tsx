export default function Dashboard() {
  return (
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
  );
}

