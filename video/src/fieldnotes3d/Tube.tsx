import { useEffect, useMemo } from "react";
import { CatmullRomCurve3, TubeGeometry, Vector3 } from "three";

type Props = { points: [number, number, number][]; radius: number; color: string; segments?: number };

/** A clay tube along a point list; rebuilt whenever the points change (i.e. every frame while animating). */
export const Tube = ({ points, radius, color, segments = 360 }: Props) => {
  const key = points.map((p) => p.join(",")).join(";") + radius;
  const geo = useMemo(() => {
    const curve = new CatmullRomCurve3(points.map((p) => new Vector3(...p)));
    return new TubeGeometry(curve, segments, Math.max(radius, 0.0005), 16, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  useEffect(() => () => geo.dispose(), [geo]);
  return (
    <mesh geometry={geo} castShadow>
      <meshStandardMaterial color={color} roughness={0.8} />
    </mesh>
  );
};
