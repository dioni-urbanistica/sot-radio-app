import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sotradio.app',
  appName: 'SOT Radio',

  server: {
    url: 'https://sot-radio-app.vercel.app',
    cleartext: true
  }
};

export default config;