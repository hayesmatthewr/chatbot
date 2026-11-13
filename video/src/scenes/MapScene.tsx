import { geoMercator, geoPath } from "d3-geo";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import world from "world-atlas/countries-50m.json";
import { EASE_IN_OUT, EASE_OUT, LINEAR, lerp, prog, reveal, tween } from "../lib/anim";
import { SANS, SERIF } from "../lib/constants";
import { Placeholder } from "../components/Placeholder";

// ISO 3166-1 numeric codes for African countries (Natural Earth via world-atlas).
const AFRICA = new Set(
  "012 024 072 108 120 132 140 148 174 178 180 204 226 231 232 262 266 270 288 324 384 404 426 430 434 450 454 466 478 480 504 508 516 562 566 624 646 678 686 690 694 706 710 716 728 729 732 748 768 788 800 818 834 854 894".split(" "),
);

type Props = { name: string };
const topo = world as unknown as Topology<{ countries: GeometryCollection<Props> }>;
const all = feature(topo, topo.objects.countries) as FeatureCollection<Geometry, Props>;
const africa = all.features.filter((f) => AFRICA.has(String(f.id)) || f.properties.name === "Somaliland");
const kenya = africa.find((f) => f.id === "404") as Feature<Geometry, Props>;

// Base framing: whole continent, as it first appears.
const projection = geoMercator().fitExtent(
  [
    [58, 406],
    [648, 1026],
  ],
  { type: "FeatureCollection", features: africa },
);
const path = geoPath(projection);
const countryPaths = africa.filter((f) => f !== kenya).map((f) => path(f) ?? "");
const kenyaPath = path(kenya) ?? "";
const [[kx0, ky0], [kx1, ky1]] = path.bounds(kenya);

// End framing: Kenya ~120px wide, upper right of frame (then a slow push-in).
const K_END = 120 / (kx1 - kx0);
const KC = { x: (kx0 + kx1) / 2, y: (ky0 + ky1) / 2 };
const TARGET = { x: 489, y: 414 };

const CARD = { left: 95, top: 518, w: 387, h: 385 };

export const MapScene = ({ s }: { s: number }) => {
  if (s < 3.3 || s >= 8.0) return null;

  const enter = prog(s, 3.35, 4.05);
  const slide = tween(s, 3.35, 4.1, -120, 0);
  const z = prog(s, 3.85, 5.35, EASE_IN_OUT);
  const k = lerp(1, K_END, z);
  const tx = lerp(0, TARGET.x - K_END * KC.x, z);
  const ty = lerp(0, TARGET.y - K_END * KC.y, z);
  const drift = tween(s, 5.35, 8.0, 1, 1.08, LINEAR);
  // compose push-in around Kenya's final position
  const K = k * drift;
  const TX = drift * tx + (1 - drift) * TARGET.x;
  const TY = drift * ty + (1 - drift) * TARGET.y;

  const dark = prog(s, 4.9, 5.4);
  const label = prog(s, 5.0, 5.6);
  const labelX = K * KC.x + TX;
  const labelY = K * ky0 + TY;

  const line = prog(s, 4.7, 5.0);
  const open = prog(s, 5.0, 5.75);
  const cardScale = tween(s, 5.75, 8.0, 1, 1.07, LINEAR);
  const tag = prog(s, 6.15, 6.6);

  return (
    <div style={{ position: "absolute", inset: 0, opacity: enter, transform: `translateX(${slide}px)` }}>
      <svg width={720} height={1280} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="kenya" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5b6266" />
            <stop offset="0.45" stopColor="#1c1e20" />
            <stop offset="1" stopColor="#0e0f10" />
          </linearGradient>
        </defs>
        <g transform={`matrix(${K},0,0,${K},${TX},${TY})`}>
          {countryPaths.map((d, i) => (
            <path key={i} d={d} fill="#b2b2b2" stroke="#ffffff" strokeWidth={1.3} vectorEffect="non-scaling-stroke" />
          ))}
          <path d={kenyaPath} fill="#b2b2b2" stroke="#ffffff" strokeWidth={1.3} vectorEffect="non-scaling-stroke" />
          <path d={kenyaPath} fill="url(#kenya)" opacity={dark} />
        </g>
      </svg>

      <div
        style={{
          position: "absolute",
          left: labelX,
          top: labelY - 8,
          transform: `translate(-50%, -100%) ${reveal(label, 8, 8).transform}`,
          opacity: label,
          filter: reveal(label, 8, 8).filter,
          fontFamily: SANS,
          fontSize: 21,
          letterSpacing: "0.38em",
          color: "#1d1f20",
          whiteSpace: "nowrap",
        }}
      >
        KENYA
      </div>

      {/* white line that splits open into the photo card */}
      {open < 0.05 && (
        <div
          style={{
            position: "absolute",
            left: CARD.left + CARD.w / 2,
            top: CARD.top + CARD.h / 2 - 1,
            width: CARD.w * 0.95,
            height: 2,
            background: "rgba(255,255,255,0.9)",
            transform: `translateX(-50%) scaleX(${line})`,
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          left: CARD.left,
          top: CARD.top,
          width: CARD.w,
          height: CARD.h,
          transform: `scale(${cardScale})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 10,
            overflow: "hidden",
            border: "1.5px solid rgba(255,255,255,0.9)",
            clipPath: `inset(${(1 - open) * 50}% 0 ${(1 - open) * 50}% 0 round 10px)`,
            opacity: line > 0 ? 1 : 0,
          }}
        >
          <Placeholder
            label="Photo · Kalenjin elders"
            fill="linear-gradient(160deg, #ecebe7 0%, #e7e3da 35%, #d9a63a 36%, #c9542e 62%, #3c2a22 63%, #574034 100%)"
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: 176,
            top: 385,
            padding: "3px 22px 5px",
            background: "#ffffff",
            borderRadius: 8,
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: 26,
            color: "#151617",
            whiteSpace: "nowrap",
            ...reveal(tag, 10, 8),
          }}
        >
          Kalenjin Tribe
        </div>
      </div>
    </div>
  );
};
