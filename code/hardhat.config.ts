import { configVariable } from "hardhat/config";
import hardhatIgnition from "@nomicfoundation/hardhat-ignition-viem";
import hardhatVerify from "@nomicfoundation/hardhat-verify";
import hardhatViem from "@nomicfoundation/hardhat-viem";
import hardhatNodeTestRunner from "@nomicfoundation/hardhat-node-test-runner";

const config = {
  solidity: {
    version: "0.8.28",
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    bscTestnet: {
      type: "http" as const,
      chainType: "l1" as const,
      url: configVariable("BSC_TESTNET_RPC_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
  plugins: [hardhatViem, hardhatNodeTestRunner, hardhatIgnition, hardhatVerify],
  etherscan: {
    apiKey: {
      bscTestnet: configVariable("BSCSCAN_API_KEY"),
    },
  },
};

export default config;
