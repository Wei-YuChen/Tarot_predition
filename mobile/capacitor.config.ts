import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.tarotapp',
  appName: 'TarotApp',
  webDir: '../apps/web/out',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
  },
};

export default config;
