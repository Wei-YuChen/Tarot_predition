declare module '@capacitor/cli' {
  export interface CapacitorServerConfig {
    url?: string;
    cleartext?: boolean;
    allowNavigation?: string[];
    androidScheme?: string;
  }

  export interface CapacitorIOSConfig {
    backgroundColor?: string;
    contentInset?: 'automatic' | 'never';
  }

  export interface CapacitorAndroidConfig {
    allowMixedContent?: boolean;
    webContentsDebuggingEnabled?: boolean;
  }

  export interface CapacitorPluginConfig {
    [pluginName: string]: unknown;
  }

  export interface CapacitorConfig {
    appId: string;
    appName: string;
    webDir: string;
    bundledWebRuntime?: boolean;
    loggingBehavior?: 'debug' | 'production';
    server?: CapacitorServerConfig;
    ios?: CapacitorIOSConfig;
    android?: CapacitorAndroidConfig;
    plugins?: CapacitorPluginConfig;
  }
}
