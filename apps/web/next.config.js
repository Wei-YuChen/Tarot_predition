const path = require('path');

const buildTarget = process.env.NEXT_PUBLIC_BUILD_TARGET;
const isAppTarget = buildTarget === 'app';

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
  distDir: path.join('..', '..', '.next'),
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

if (isAppTarget) {
  // App 目標使用靜態輸出供 Capacitor 包殼讀取。
  nextConfig.output = 'export';
}

module.exports = nextConfig;
