import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.tarotapp',
  appName: 'TarotApp',
  webDir: '../apps/web/out',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
  },
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#0f0d1a',
  },
  android: {
    allowMixedContent: true,
    webContentsDebuggingEnabled: false,
  },
  plugins: {
    AdMob: {
      adSize: 'SMART_BANNER',
      appIdAndroid: 'ca-app-pub-3940256099942544~3347511713',
      appIdIOS: 'ca-app-pub-3940256099942544~1458002511',
    },
  },
};

export default config;
