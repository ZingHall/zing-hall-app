/// <reference types="vite/client" />
interface ImportMetaEnv {
  // built-in
  readonly DEV: boolean;
  readonly PROD: boolean;

  readonly VITE_PLATFORM: "web" | "tauri";

  readonly VITE_PRIVY_APP_ID: string;
  readonly VITE_PRIVY_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
