import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

const faces = [
  { family: "Instrument Serif", file: "instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
  { family: "Instrument Serif", file: "instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
  { family: "Inter", file: "inter-latin-300-normal.woff2", weight: "300", style: "normal" },
  { family: "Inter", file: "inter-latin-400-normal.woff2", weight: "400", style: "normal" },
  { family: "Inter", file: "inter-latin-500-normal.woff2", weight: "500", style: "normal" },
  { family: "JetBrains Mono", file: "jetbrains-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
  { family: "Fraunces", file: "fraunces-latin-300-normal.woff2", weight: "300", style: "normal" },
  { family: "Fraunces", file: "fraunces-latin-400-normal.woff2", weight: "400", style: "normal" },
  { family: "Fraunces", file: "fraunces-latin-300-italic.woff2", weight: "300", style: "italic" },
  { family: "Fraunces", file: "fraunces-latin-400-italic.woff2", weight: "400", style: "italic" },
  { family: "IBM Plex Mono", file: "ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
  { family: "IBM Plex Mono", file: "ibm-plex-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
] as const;

let loaded = false;
export const loadFonts = () => {
  if (loaded) return;
  loaded = true;
  for (const f of faces) {
    loadFont({ family: f.family, url: staticFile(`fonts/${f.file}`), weight: f.weight, style: f.style });
  }
};
