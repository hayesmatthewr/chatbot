const MAROON = "#A40011";

// Simple age -> chart coordinate mapping for a hand-authored decline curve.
// Plot area: x in [50, 460], y in [20, 300] within a 480x340 viewBox.
const AGE_TICKS = [20, 40, 60, 80];
const VALUE_TICKS = [0, 0.2, 0.4, 0.6, 0.8, 1.0];

function ageToX(age: number) {
  return 50 + ((age - 20) / (80 - 20)) * 410;
}

function valueToY(value: number) {
  return 20 + (1 - value) * 280;
}

export function NadDeclineChart() {
  const annotationX = ageToX(40);
  const annotationY = valueToY(0.5);

  return (
    <section className="bg-[#F6F1EA] py-16 px-6 sm:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#50000B]"
            style={{ fontFamily: "var(--font-im8-display), serif" }}
          >
            Your NAD+ Declines
          </h2>
          <p
            className="mt-2 text-2xl sm:text-3xl text-[#50000B]"
            style={{ fontFamily: "var(--font-im8-display), serif" }}
          >
            50% by Age 40
          </p>

          <p className="mt-6 text-base sm:text-lg leading-relaxed text-neutral-700">
            Research published in Nature Aging shows a clear link between NAD+ levels and healthy
            aging. NAD+ (nicotinamide adenine dinucleotide) is found in every cell in your
            body—it&rsquo;s essential to the chemistry that keeps you up and running.
          </p>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-neutral-700">
            But here&rsquo;s the problem: NAD+ levels decline universally as we age. By age 40,
            most people have lost half their NAD+. By 60, it&rsquo;s down to just 25% of youthful
            levels.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-4 sm:p-8">
          <svg viewBox="0 0 480 340" className="w-full h-auto" role="img" aria-label="Chart showing NAD+ concentration declining with age">
            {/* Y gridlines + labels */}
            {VALUE_TICKS.map((v) => {
              const y = valueToY(v);
              return (
                <g key={v}>
                  <line x1={50} y1={y} x2={460} y2={y} stroke="#e5e0d5" strokeWidth={1} />
                  <text x={44} y={y + 4} textAnchor="end" fontSize={10} fill="#8a8272">
                    {v.toFixed(1)}
                  </text>
                </g>
              );
            })}

            {/* X axis ticks + labels */}
            {AGE_TICKS.map((age) => {
              const x = ageToX(age);
              return (
                <g key={age}>
                  <line x1={x} y1={20} x2={x} y2={300} stroke="#f0ece2" strokeWidth={1} />
                  <text x={x} y={318} textAnchor="middle" fontSize={10} fill="#8a8272">
                    {age}
                  </text>
                </g>
              );
            })}

            {/* Axes */}
            <line x1={50} y1={20} x2={50} y2={300} stroke="#c9c1af" strokeWidth={1.5} />
            <line x1={50} y1={300} x2={460} y2={300} stroke="#c9c1af" strokeWidth={1.5} />

            {/* Axis titles */}
            <text x={255} y={336} textAnchor="middle" fontSize={11} fill="#50000B" letterSpacing="0.08em">
              AGE (YEARS)
            </text>
            <text
              x={-160}
              y={16}
              textAnchor="middle"
              fontSize={11}
              fill="#50000B"
              letterSpacing="0.08em"
              transform="rotate(-90)"
            >
              NAD+ CONCENTRATION (RELATIVE UNITS)
            </text>

            {/* Decline curve */}
            <path
              d={`M ${ageToX(20)} ${valueToY(1.0)}
                  C ${ageToX(28)} ${valueToY(0.98)}, ${ageToX(34)} ${valueToY(0.68)}, ${ageToX(40)} ${valueToY(0.5)}
                  C ${ageToX(46)} ${valueToY(0.38)}, ${ageToX(54)} ${valueToY(0.29)}, ${ageToX(60)} ${valueToY(0.25)}
                  C ${ageToX(68)} ${valueToY(0.2)}, ${ageToX(74)} ${valueToY(0.17)}, ${ageToX(80)} ${valueToY(0.15)}`}
              fill="none"
              stroke={MAROON}
              strokeWidth={3}
              strokeLinecap="round"
            />

            {/* Annotation point at age 40 */}
            <circle cx={annotationX} cy={annotationY} r={5} fill={MAROON} />
            <line
              x1={annotationX}
              y1={annotationY}
              x2={annotationX}
              y2={annotationY - 34}
              stroke={MAROON}
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <text
              x={annotationX}
              y={annotationY - 40}
              textAnchor="middle"
              fontSize={12}
              fontWeight={700}
              fill={MAROON}
            >
              50% by 40
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
