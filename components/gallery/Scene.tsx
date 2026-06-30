"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Billboard, RoundedBox, OrbitControls, Text, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { galleryApps } from "@/lib/data";

type View = "sphere" | "cylinder";

// Fewer, more spaced-out apps read as "scattered" rather than clumped.
const APPS = galleryApps.filter((_, i) => i % 3 !== 2); // ~35 of 52

const logoFor = (name: string) => `/logos/${name.toLowerCase().replace(/[^a-z0-9]/g, "")}.png`;
const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
const GOLDEN = Math.PI * (3 - Math.sqrt(5));

/* ----------------------------- layouts ----------------------------------- */
// Sparse spherical shell, wide and deep so cards spill beyond the screen and
// sit both in front of and behind the centre.
function sphereLayout(n: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const off = 2 / n;
  for (let i = 0; i < n; i++) {
    const yy = i * off - 1 + off / 2;
    const rad = Math.sqrt(Math.max(0, 1 - yy * yy));
    const phi = i * GOLDEN;
    const r = 12 + (rand(i + 3) - 0.5) * 7; // big radius + strong depth jitter
    pts.push([Math.cos(phi) * rad * r, yy * r * 1.1, Math.sin(phi) * rad * r]);
  }
  return pts;
}

function cylinderLayout(n: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const height = 20;
  for (let i = 0; i < n; i++) {
    const ang = i * GOLDEN;
    const yy = (i / Math.max(1, n - 1) - 0.5) * height;
    const r = 10 + (rand(i + 7) - 0.5) * 5;
    pts.push([Math.cos(ang) * r, yy, Math.sin(ang) * r]);
  }
  return pts;
}

/* --------------------------- centre 3D title ----------------------------- */
// Lives inside the scene so cards can render in front of and behind it.
function Title() {
  return (
    <Billboard>
      <Text
        font="/fonts/playfair-500.woff"
        fontSize={1.7}
        lineHeight={1.04}
        letterSpacing={-0.02}
        maxWidth={18}
        anchorX="center"
        anchorY="middle"
        textAlign="center"
        color="#231a12"
        outlineWidth={0}
      >
        {"Every app you use,\nin one orbit"}
      </Text>
    </Billboard>
  );
}

/* -------------------------------- one card ------------------------------- */
function Card({
  app,
  target,
  phase,
}: {
  app: { name: string; tint: string };
  target: [number, number, number];
  phase: number;
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
    tmp.set(target[0], target[1] + Math.sin(t * 0.5 + phase) * 0.25, target[2]);
    g.position.lerp(tmp, 0.05);
    const s = hovered ? 1.18 : 1;
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, s, 0.15));
  });

  return (
    <group ref={group}>
      <Billboard>
        <RoundedBox
          args={[1.7, 1.7, 0.14]}
          radius={0.26}
          smoothness={5}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = "grab";
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
      </Billboard>
    </group>
  );
}

/* ------------------------------- the gallery ----------------------------- */
function Gallery({ view }: { view: View }) {
  const grp = useRef<THREE.Group>(null);
  const { gl } = useThree();
  const vel = useRef(0);
  const targets = useMemo(
    () => (view === "sphere" ? sphereLayout(APPS.length) : cylinderLayout(APPS.length)),
    [view]
  );

  // Scrolling spins the gallery (with momentum). While the hero is at the top
  // of the page we swallow the scroll so it rotates instead of leaving. Use
  // the nav / "see use cases" link to move on.
  useEffect(() => {
    const el = gl.domElement;
    const onWheel = (e: WheelEvent) => {
      if (window.scrollY < 6) e.preventDefault();
      vel.current += e.deltaY * 0.0002;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [gl]);

  useFrame((_, delta) => {
    if (!grp.current) return;
    grp.current.rotation.y += 0.035 * delta + vel.current;
    vel.current *= 0.93;
  });

  return (
    <group ref={grp}>
      {APPS.map((app, i) => (
        <Card key={app.name + i} app={app} target={targets[i]} phase={i * 1.7} />
      ))}
    </group>
  );
}

/* -------------------------------- the scene ------------------------------ */
export default function Scene({ view }: { view: View }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 19], fov: 54 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearAlpha(0);
        gl.domElement.addEventListener("webglcontextlost", (e) => e.preventDefault(), false);
      }}
    >
      <fog attach="fog" args={["#efe2cc", 24, 46]} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 8, 8]} intensity={0.95} />
      <directionalLight position={[-6, -2, -4]} intensity={0.3} color="#e8b486" />

      <Suspense fallback={null}>
        <Title />
        <Gallery view={view} />
      </Suspense>

      {/* drag to look around; scrolling spins the gallery */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        rotateSpeed={0.5}
        dampingFactor={0.06}
        enableDamping
      />
    </Canvas>
  );
}
