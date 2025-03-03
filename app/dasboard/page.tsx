export default function Dashboard() {
  return (
    <main className="flex flex-col items-start justify-center px-6 md:px-24 pb-12 md:pb-24">
      <div className="max-w-full md:max-w-[90%]">
        <h6 className="text-5xl sm:text-6xl md:text-[7rem] font-light leading-[1.1] tracking-[-0.02em] relative">
          We are a digital
          <br />
          <span className="inline-flex items-center gap-2 md:gap-4">
            <div className="video-container w-[150px] h-[100px] sm:w-[180px] sm:h-[120px] md:w-[220px] md:h-[140px] rounded-[20px] sm:rounded-[25px] md:rounded-[30px] overflow-hidden bg-gray-300">
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
