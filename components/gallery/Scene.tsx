"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { galleryApps } from "@/lib/data";

type View = "scatter" | "orbit";

const logoFor = (name: string) => `/logos/${name.toLowerCase().replace(/[^a-z0-9]/g, "")}.png`;
const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

/* ----------------------------- layouts ----------------------------------- */
// Wide field that fills (and overflows) the screen, with a clear centre oval
// so the title sits in calm space and the cards float around it.
function scatterLayout(n: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const cx = 9.5, cy = 5.6;
  for (let i = 0; i < n; i++) {
    let x = (rand(i + 1) - 0.5) * 38;
    let y = (rand(i + 91.3) - 0.5) * 22;
    const z = -1.5 - rand(i + 57.7) * 9.5;
    const e = (x * x) / (cx * cx) + (y * y) / (cy * cy);
    if (e < 1) {
      const s = (1.1 + rand(i + 13.3) * 0.7) / Math.sqrt(Math.max(e, 0.0001));
      x *= s;
      y *= s;
    }
    pts.push([x, y, z]);
  }
  return pts;
}

// Concentric elliptical rings — a hole in the middle by construction.
function orbitLayout(n: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const rings = 3;
  const per = Math.ceil(n / rings);
  for (let i = 0; i < n; i++) {
    const ring = i % rings;
    const idx = Math.floor(i / rings);
    const ang = (idx / per) * Math.PI * 2 + ring * 0.7;
    const rad = 8.5 + ring * 4.6;
    const x = Math.cos(ang) * rad * 1.55;
    const y = Math.sin(ang) * rad * 0.92;
    const z = -2.5 - ring * 2.6 - rand(i) * 1.5;
    pts.push([x, y, z]);
  }
  return pts;
}

/* -------------------------------- one card ------------------------------- */
function Card({
  app,
  target,
  phase,
  tilt,
}: {
  app: { name: string; tint: string };
  target: [number, number, number];
  phase: number;
  tilt: number;
}) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const tex = useTexture(logoFor(app.name));
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    tmp.set(target[0], target[1] + Math.sin(t * 0.5 + phase) * 0.22, target[2]);
    g.position.lerp(tmp, 0.05);
    const s = hovered ? 1.16 : 1;
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, s, 0.15));
  });

  return (
    <group ref={group} rotation={[0, 0, tilt]}>
      <RoundedBox
        args={[1.7, 1.7, 0.14]}
        radius={0.26}
        smoothness={5}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <meshStandardMaterial color="#fffdf9" roughness={0.62} metalness={0.04} />
      </RoundedBox>
      <mesh position={[0, 0, 0.085]}>
        <planeGeometry args={[1.22, 1.22]} />
        <meshBasicMaterial map={tex} transparent toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ----------------------- field + drag / parallax ------------------------- */
function Field({ view }: { view: View }) {
  const world = useRef<THREE.Group>(null);
  const { gl } = useThree();
  const drag = useRef({ x: 0, y: 0 });
  const par = useRef({ x: 0, y: 0 });
  const zoom = useRef(13.5);

  const apps = galleryApps;
  const targets = useMemo(
    () => (view === "scatter" ? scatterLayout(apps.length) : orbitLayout(apps.length)),
    [view, apps.length]
  );

  useEffect(() => {
    const el = gl.domElement;
    let dragging = false,
      lx = 0,
      ly = 0;
    const down = (e: PointerEvent) => {
      dragging = true;
      lx = e.clientX;
      ly = e.clientY;
    };
    const move = (e: PointerEvent) => {
      par.current.x = -(e.clientX / window.innerWidth - 0.5) * 2.2;
      par.current.y = (e.clientY / window.innerHeight - 0.5) * 2.2;
      if (dragging) {
        drag.current.x = clamp(drag.current.x + (e.clientX - lx) * 0.022, -11, 11);
        drag.current.y = clamp(drag.current.y - (e.clientY - ly) * 0.022, -6.5, 6.5);
        lx = e.clientX;
        ly = e.clientY;
      }
    };
    const up = () => (dragging = false);
    const wheel = (e: WheelEvent) => {
      zoom.current = clamp(zoom.current + e.deltaY * 0.012, 9.5, 20);
    };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    el.addEventListener("wheel", wheel, { passive: true });
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      el.removeEventListener("wheel", wheel);
    };
  }, [gl]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (world.current) {
      world.current.position.x = THREE.MathUtils.lerp(
        world.current.position.x,
        drag.current.x + par.current.x + Math.sin(t * 0.045) * 0.7,
        0.05
      );
      world.current.position.y = THREE.MathUtils.lerp(
        world.current.position.y,
        drag.current.y + par.current.y + Math.cos(t * 0.038) * 0.5,
        0.05
      );
    }
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, zoom.current, 0.06);
  });

  return (
    <group ref={world}>
      {apps.map((app, i) => (
        <Card
          key={app.name + i}
          app={app}
          target={targets[i]}
          phase={i * 1.7}
          tilt={(rand(i + 4.2) - 0.5) * 0.2}
        />
      ))}
    </group>
  );
}

/* -------------------------------- the scene ------------------------------ */
export default function Scene({ view }: { view: View }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 13.5], fov: 52 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearAlpha(0);
        gl.domElement.addEventListener("webglcontextlost", (e) => e.preventDefault(), false);
      }}
    >
      <fog attach="fog" args={["#f0e3cd", 16, 34]} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 8, 8]} intensity={0.95} />
      <directionalLight position={[-6, -2, -4]} intensity={0.3} color="#e8b486" />

      <Suspense fallback={null}>
        <Field view={view} />
      </Suspense>
    </Canvas>
  );
}
