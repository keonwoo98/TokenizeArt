import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { bscTestnet } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "TokenizeArt42",
  projectId: "YOUR_WALLETCONNECT_PROJECT_ID",
  chains: [bscTestnet],
});
