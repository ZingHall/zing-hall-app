import { ReactNode } from "react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { PrivyProvider } from "@privy-io/react-auth";
import { UserContextProvider } from "@/context/user-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Buffer } from "buffer";
global.Buffer = Buffer;
// import { SuiClientProvider, createNetworkConfig } from "@mysten/dapp-kit";
// import { getFullnodeUrl } from "@mysten/sui/client";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { WalletContextProvider } from "@/contexts/wallet-context";
// import { EnvContextProvider } from "@/contexts/env-context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 10 * 60 * 1000, // 10 minutes
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const Providers = ({ children }: { children: ReactNode }) => {
  // const { networkConfig } = createNetworkConfig({
  //   testnet: { url: getFullnodeUrl("testnet") },
  // });

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <PrivyProvider
          appId={import.meta.env.VITE_PRIVY_APP_ID}
          clientId={import.meta.env.VITE_PRIVY_CLIENT_ID}
        >
          <UserContextProvider>{children}</UserContextProvider>
        </PrivyProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Providers;
