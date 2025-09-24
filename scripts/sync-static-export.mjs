#!/usr/bin/env node
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const exportDir = path.join(repoRoot, '.next');

const capacitorTargets = [
  {
    platform: 'android',
    assetsDir: path.join(repoRoot, 'android', 'app', 'src', 'main', 'assets'),
    outputDir: path.join(repoRoot, 'android', 'app', 'src', 'main', 'assets', 'public'),
  },
  {
    platform: 'ios',
    assetsDir: path.join(repoRoot, 'ios', 'App', 'App'),
    outputDir: path.join(repoRoot, 'ios', 'App', 'App', 'public'),
  },
];

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch (error) {
    return false;
  }
}

async function main() {
  if (!(await pathExists(exportDir))) {
    console.error(
      `Static export directory not found at "${path.relative(repoRoot, exportDir)}". ` +
        'Run "npm run export" or "npm run build:app" first.'
    );
    process.exitCode = 1;
    return;
  }

  const copyPromises = capacitorTargets.map(async ({ platform, assetsDir, outputDir }) => {
    if (!(await pathExists(assetsDir))) {
      console.warn(
        `Skipping ${platform} sync – expected assets directory missing at "${path.relative(
          repoRoot,
          assetsDir
        )}". Run "npx cap add ${platform}" if this platform should be synced.`
      );
      return false;
    }

    await fs.rm(outputDir, { recursive: true, force: true });
    await fs.mkdir(outputDir, { recursive: true });
    await fs.cp(exportDir, outputDir, { recursive: true });

    console.log(
      `Synced static export from "${path.relative(repoRoot, exportDir)}" to "${path.relative(
        repoRoot,
        outputDir
      )}".`
    );
    return true;
  });

  const results = await Promise.all(copyPromises);

  if (!results.some(Boolean)) {
    console.warn('No Capacitor platforms were synced. This is expected when no native shells exist yet.');
  }
}

main().catch((error) => {
  console.error('Failed to sync static export:', error);
  process.exitCode = 1;
});
