import { useEffect, useMemo } from "react";
import { CatmullRomCurve3, TubeGeometry, Vector3 } from "three";
import { Clay, Glaze } from "./materials";

type Props = { points: [number, number, number][]; radius: number; color: string; segments?: number; glaze?: boolean };

/** A clay tube along a point list; rebuilt whenever the points change (i.e. every frame while animating). */
export const Tube = ({ points, radius, color, segments = 360, glaze }: Props) => {
  const key = points.map((p) => p.join(",")).join(";") + radius;
  const geo = useMemo(() => {
    const curve = new CatmullRomCurve3(points.map((p) => new Vector3(...p)));
    return new TubeGeometry(curve, segments, Math.max(radius, 0.0005), 24, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  useEffect(() => () => geo.dispose(), [geo]);
  const mat = glaze ? <Glaze color={color} /> : <Clay color={color} />;
  const r = Math.max(radius, 0.0005) * 1.04;
  return (
    <group>
      <mesh geometry={geo} castShadow>
        {mat}
      </mesh>
      {[points[0], points[points.length - 1]].map((p, i) => (
        <mesh key={i} position={p} scale={r} castShadow>
          <sphereGeometry args={[1, 32, 32]} />
          {mat}
        </mesh>
      ))}
    </group>
  );
};
