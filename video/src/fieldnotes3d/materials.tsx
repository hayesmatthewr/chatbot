import { CanvasTexture, RepeatWrapping, type Texture } from "three";
import { random } from "remotion";
import { CONFIG } from "./config";
import { P } from "./theme";

// Procedural surface detail, built once: fine clay grain and a facade (window grid) relief.
const makeTexture = (size: number, draw: (ctx: CanvasRenderingContext2D) => void, repeat = 1): Texture | null => {
  if (typeof document === "undefined") return null;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  if (!ctx) return null;
  draw(ctx);
  const t = new CanvasTexture(c);
  t.wrapS = t.wrapT = RepeatWrapping;
  t.repeat.set(repeat, repeat);
  return t;
};

let grain: Texture | null = null;
const grainTex = () =>
  (grain ??= makeTexture(
    256,
    (ctx) => {
      const img = ctx.createImageData(256, 256);
      for (let i = 0; i < 256 * 256; i++) {
        const v = 118 + Math.floor((random(`g${i}`) - 0.5) * 70);
        img.data.set([v, v, v, 255], i * 4);
      }
      ctx.putImageData(img, 0, 0);
    },
    3,
  ));

let facade: Texture | null = null;
export const facadeTex = () =>
  (facade ??= makeTexture(256, (ctx) => {
    ctx.fillStyle = "#808080";
    ctx.fillRect(0, 0, 256, 256);
    ctx.fillStyle = "#3a3a3a";
    for (let y = 18; y < 256; y += 30) for (let x = 22; x < 256; x += 36) ctx.fillRect(x, y, 20, 14);
  }));

/** Modelling clay: grain bump + roughness variation, soft sheen, faint clearcoat. */
export const Clay = ({ color = P.clay, facadeRelief = false }: { color?: string; facadeRelief?: boolean }) => {
  const bump = facadeRelief ? facadeTex() : grainTex();
  return (
    <meshPhysicalMaterial
      color={color}
      roughness={0.6}
      roughnessMap={grainTex() ?? undefined}
      bumpMap={bump ?? undefined}
      bumpScale={facadeRelief ? 1.6 : 0.35}
      sheen={0.55}
      sheenRoughness={0.55}
      sheenColor="#ffffff"
      clearcoat={0.14}
      clearcoatRoughness={0.5}
    />
  );
};

/** Glazed accent (liquid, beads, routes). */
export const Glaze = ({ color, emissive = 0 }: { color: string; emissive?: number }) => (
  <meshPhysicalMaterial color={color} roughness={0.22} clearcoat={0.8} clearcoatRoughness={0.15} emissive={color} emissiveIntensity={emissive} />
);

/** Lab glass: refractive, bright rims from the studio environment. */
export const Glass = () =>
  CONFIG.glassTransmission ? (
    <meshPhysicalMaterial
      color="#ffffff"
      transmission={1}
      thickness={0.5}
      roughness={0.03}
      ior={1.5}
      specularIntensity={1}
      clearcoat={1}
      clearcoatRoughness={0.03}
      envMapIntensity={2.4}
      transparent
    />
  ) : (
    <meshStandardMaterial color="#ffffff" roughness={0.1} transparent opacity={0.16} depthWrite={false} side={2} />
  );
