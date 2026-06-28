"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, RoundedBox, Text, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { galleryApps } from "@/lib/data";

type View = "sphere" | "cylinder";

/* ----------------------------- layout helpers ---------------------------- */
function sphereLayout(n: number, r: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const inc = Math.PI * (3 - Math.sqrt(5));
  const off = 2 / n;
  for (let i = 0; i < n; i++) {
    const y = i * off - 1 + off / 2;
    const rad = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * inc;
    pts.push([Math.cos(phi) * rad * r, y * r, Math.sin(phi) * rad * r]);
  }
  return pts;
}

function cylinderLayout(n: number, r: number, h: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const cols = Math.ceil(Math.sqrt(n * 1.8));
  const rows = Math.ceil(n / cols);
  for (let i = 0; i < n; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const theta = (col / cols) * Math.PI * 2 + (row % 2) * (Math.PI / cols);
    const y = (row / Math.max(1, rows - 1) - 0.5) * h;
    pts.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
  }
  return pts;
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
  const tint = useMemo(() => new THREE.Color(app.tint), [app.tint]);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    tmp.set(target[0], target[1] + Math.sin(t * 0.6 + phase) * 0.18, target[2]);
    g.position.lerp(tmp, 0.05);
    const s = hovered ? 1.16 : 1;
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, s, 0.15));
  });

  return (
    <group ref={group}>
      <Billboard>
        <RoundedBox
          args={[1.78, 1.12, 0.08]}
          radius={0.12}
          smoothness={4}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
        >
          <meshStandardMaterial
            color="#0b0b11"
            emissive={tint}
            emissiveIntensity={hovered ? 0.6 : 0.28}
            roughness={0.6}
            metalness={0.1}
          />
        </RoundedBox>
        {/* accent bar */}
        <mesh position={[0, 0.46, 0.05]}>
          <planeGeometry args={[1.78, 0.06]} />
          <meshBasicMaterial color={tint} toneMapped={false} />
        </mesh>
        <Text position={[0, 0.08, 0.06]} fontSize={0.42} color={app.tint} anchorX="center" anchorY="middle">
          {app.name.slice(0, 1)}
        </Text>
        <Text position={[0, -0.32, 0.06]} fontSize={0.15} color="#e9e9f2" anchorX="center" anchorY="middle">
          {app.name}
        </Text>
      </Billboard>
    </group>
  );
}

/* ------------------------------- the gallery ----------------------------- */
function Gallery({ view }: { view: View }) {
  const apps = galleryApps;
  const targets = useMemo(
    () => (view === "sphere" ? sphereLayout(apps.length, 7.2) : cylinderLayout(apps.length, 6, 9)),
    [view, apps.length]
  );
  return (
    <group>
      {apps.map((app, i) => (
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
      camera={{ position: [0, 0, 17], fov: 50 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      style={{ background: "#070709" }}
      onCreated={({ gl }) => {
        gl.setClearColor("#070709", 1);
        // Allow the browser to restore a lost GL context instead of going
        // blank permanently (default behaviour does NOT restore).
        gl.domElement.addEventListener(
          "webglcontextlost",
          (e) => e.preventDefault(),
          false
        );
      }}
    >
      <color attach="background" args={["#070709"]} />
      <fog attach="fog" args={["#070709", 18, 34]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 6]} intensity={0.7} />
      <directionalLight position={[-6, -3, -6]} intensity={0.35} color="#8d92e6" />

      <Stars radius={60} depth={40} count={1100} factor={3} saturation={0} fade speed={0.6} />

      <Gallery view={view} />

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={11}
        maxDistance={24}
        autoRotate
        autoRotateSpeed={0.55}
        rotateSpeed={0.5}
        dampingFactor={0.08}
        enableDamping
      />
    </Canvas>
  );
}
