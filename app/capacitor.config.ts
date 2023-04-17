import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'bank.holidays',
  appName: 'bank-holidays',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    cleartext: true
  }
};

export default config;
