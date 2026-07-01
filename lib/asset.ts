// Prefix references to files in /public with the base path so they resolve
// when the site is served from a GitHub Pages subpath. Empty in local dev.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${BASE_PATH}${path}`;
