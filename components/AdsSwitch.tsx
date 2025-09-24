import type { ReactNode } from 'react';

export type AdsSwitchProps = {
  /** Web 版專用的廣告元件或內容 */
  web?: ReactNode;
  /** App 版專用的廣告元件或內容 */
  app?: ReactNode;
  /** 當無符合的 target 時的備援內容 */
  fallback?: ReactNode;
};

export const BUILD_TARGET = process.env.NEXT_PUBLIC_BUILD_TARGET;

export function isAppBuildTarget() {
  return BUILD_TARGET === 'app';
}

export default function AdsSwitch({
  web,
  app,
  fallback = null,
}: AdsSwitchProps) {
  if (BUILD_TARGET === 'app') {
    return app ?? fallback ?? null;
  }

  if (BUILD_TARGET === 'web') {
    return web ?? fallback ?? null;
  }

  return fallback ?? null;
}
