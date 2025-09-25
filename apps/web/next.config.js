const path = require('path');

/** @type {import('next').NextConfig} */
let admobModulePath;
try {
  // Attempt to resolve the real AdMob plugin. If it isn't installed (optional dependency),
  // we fall back to the local stub to keep web builds working.
  admobModulePath = require.resolve('@capacitor-community/admob');
} catch (error) {
  admobModulePath = path.join(
    __dirname,
    '..',
    '..',
    'lib',
    'stubs',
    'capacitor-admob.ts'
  );
}

const nextConfig = {
  // Only use custom distDir for root build commands, for Vercel use default
  distDir: process.env.VERCEL ? '.next' : path.join('..', '..', '.next'),
  output: process.env.NEXT_PUBLIC_BUILD_TARGET === 'app' ? 'export' : undefined,
  trailingSlash: true,
  images: {
    unoptimized: process.env.NEXT_PUBLIC_BUILD_TARGET === 'app',
  },
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '..', '..'),
  },
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias['@capacitor-community/admob'] = admobModulePath;
    return config;
  },
};

module.exports = nextConfig;
