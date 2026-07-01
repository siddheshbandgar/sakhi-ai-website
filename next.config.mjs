// When building for GitHub Pages we produce a fully static export served
// from a repo subpath. Local dev/build stays a normal Next app.
const isPages = process.env.GITHUB_PAGES === "true";
const repo = "sakhi-ai-website";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  ...(isPages
    ? {
        output: "export",
        images: { unoptimized: true },
        basePath: `/${repo}`,
        assetPrefix: `/${repo}/`,
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
