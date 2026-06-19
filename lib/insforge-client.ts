import { createBrowserClient } from "@insforge/sdk/ssr";

type InsforgeBrowserClient = ReturnType<typeof createBrowserClient>;

let insforgeBrowserClient: InsforgeBrowserClient | null = null;

export function getInsforgeBrowserClient(): InsforgeBrowserClient {
  if (!insforgeBrowserClient) {
    insforgeBrowserClient = createBrowserClient();
  }

  return insforgeBrowserClient;
}
