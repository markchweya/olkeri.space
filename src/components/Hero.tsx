export default function Hero() {
  return (
    <section className="min-h-screen w-screen bg-[#050811] flex items-center justify-center text-center overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_60%)]" />

      <div className="relative z-10 px-6 max-w-3xl">

        <h1 className="text-5xl md:text-7xl font-light text-[#E6E9F2] mb-6">
          olkeri.space
        </h1>

        <p className="text-[#C9CCD6] text-lg md:text-xl mb-12">
          Web development. Systems. AI. Applications.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">

          <a
            href="#work"
            className="
              text-[#E6E9F2]
              text-lg
              tracking-wide
              transition-all duration-300
              hover:text-white
              hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]
            "
          >
            View Work
          </a>

          <a
            href="#contact"
            className="
              text-[#E6E9F2]
              text-lg
              tracking-wide
              transition-all duration-300
              hover:text-white
              hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]
            "
          >
            Start a Project
          </a>

        </div>

      </div>

    </section>
  );
}
