const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: path.join('..', '..', '.next'),
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '..', '..'),
  },
};

module.exports = nextConfig;
