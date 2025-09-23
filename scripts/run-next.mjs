#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { existsSync } from 'node:fs';

const argv = process.argv.slice(2);
const command = argv.shift() ?? 'build';
let target = 'web';

if (argv.length > 0 && ['web', 'app'].includes(argv[0])) {
  target = argv.shift();
}

const extraArgs = argv;

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const appDir = resolve(repoRoot, 'apps', 'web');

const nextBinName = process.platform === 'win32' ? 'next.cmd' : 'next';
const nextBin = resolve(repoRoot, 'node_modules', '.bin', nextBinName);

if (!existsSync(nextBin)) {
  console.error(`找不到 Next.js CLI：${nextBin}\n請先執行 npm install 安裝專案依賴。`);
  process.exit(1);
}

const child = spawnSync(nextBin, [command, ...extraArgs], {
  cwd: appDir,
  stdio: 'inherit',
  env: {
    ...process.env,
    NEXT_PUBLIC_BUILD_TARGET: process.env.NEXT_PUBLIC_BUILD_TARGET ?? target,
  },
});

if (child.error) {
  console.error(child.error);
}

process.exit(child.status ?? 1);
