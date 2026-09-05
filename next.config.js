const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the workspace root. Without this, Next 16 infers it from the nearest
  // parent lockfile and crawls every sibling app (and their backups), which
  // stalls dev compilation.
  turbopack: {
    root: path.join(__dirname),
  },
};

module.exports = nextConfig;
