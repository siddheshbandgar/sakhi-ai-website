/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disabled: StrictMode double-mounts the WebGL <Canvas> in dev, which can
  // leak/lose GL contexts. Production is single-mount regardless.
  reactStrictMode: false,
};

export default nextConfig;
