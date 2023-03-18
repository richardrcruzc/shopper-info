import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.shopper.info001.app",
  appName: "shopper-info",
  webDir: "build",
  bundledWebRuntime: false,
  server:
    process.env.NODE_ENV === "development"
      ? {
          url: "http://localhost:8100",
          cleartext: true,
        }
      : {},
};

export default config;
