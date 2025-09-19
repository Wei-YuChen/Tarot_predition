import { cp, mkdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, '.next');
const outDir = path.join(projectRoot, 'apps', 'web', 'out');

async function ensureDistDir() {
  try {
    const info = await stat(distDir);
    if (!info.isDirectory()) {
      throw new Error(`${distDir} exists but is not a directory.`);
    }
  } catch (error) {
    throw new Error(`Expected build output at ${distDir}. Did you run "next build"?`, { cause: error });
  }
}

async function copyStaticOutput() {
  await ensureDistDir();
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });
  await cp(distDir, outDir, { recursive: true });
}

async function run() {
  const target = process.env.NEXT_PUBLIC_BUILD_TARGET;
  if (target !== 'app') {
    console.log('[sync-static-export] Skipped: NEXT_PUBLIC_BUILD_TARGET is not "app".');
    return;
  }

  console.log(`[sync-static-export] Copying static export from ${distDir} to ${outDir}`);
  try {
    await copyStaticOutput();
    console.log('[sync-static-export] Static export ready.');
  } catch (error) {
    console.error('[sync-static-export] Failed to prepare static export:', error);
    process.exitCode = 1;
  }
}

run();
