export function BackedSection() {
  return (
    <section
      className="relative flex min-h-[420px] w-full items-center overflow-hidden bg-cover bg-center py-16 md:min-h-[580px]"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.35) 100%), url('/images/backed-img_ffcb2d4e-4cf2-41e0-8c85-072f786f6e86.jpg')",
      }}
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-6 md:grid-cols-2 md:px-16">
        <div className="flex flex-col justify-center gap-8">
          <h2 className="max-w-xl text-[32px] leading-[1.1] font-bold text-white md:text-[40px]">
            THE MOST RESEARCHED PERFORMANCE NUTRIENT
          </h2>
          <div className="flex flex-col gap-1 text-white">
            <p className="text-sm md:text-base">The science is clear.</p>
            <p className="text-sm md:text-base">
              Most people just never stay long enough to feel it.
            </p>
          </div>
        </div>

        <div className="hidden flex-col justify-center divide-y divide-white/30 md:flex md:border-l md:border-white/30 md:pl-16">
          <div className="pb-8">
            <p className="text-6xl leading-none font-bold text-white md:text-7xl">
              700+
            </p>
            <p className="mt-3 text-sm text-white/90">Clinical studies</p>
          </div>
          <div className="pt-8">
            <p className="text-6xl leading-none font-bold text-white md:text-7xl">
              30+
            </p>
            <p className="mt-3 text-sm text-white/90">Years of research</p>
          </div>
        </div>
      </div>
    </section>
  )
}
