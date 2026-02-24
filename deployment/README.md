# Deployment Guide

## Prerequisites

1. BSC Testnet BNB (from [BNB Chain Faucet](https://www.bnbchain.org/en/testnet-faucet))
2. Private key of the deployer wallet
3. (Optional) BscScan API key for contract verification

## Setup

```bash
cd code
cp .env.example .env
# Edit .env with your actual values
```

## Deploy

```bash
# Option 1: Use deploy script
./deployment/deploy.sh

# Option 2: Manual deployment
cd code
npx hardhat ignition deploy ./ignition/modules/TokenizeArt42.ts --network bscTestnet
```

## After Deployment

1. Update `deployment/deployed-address.json` with the deployed contract addresses
2. Upload NFT image to IPFS: `npx tsx mint/scripts/upload-to-ipfs.ts`
3. Mint NFT: `npx tsx mint/scripts/mint-nft.ts`
4. Verify on BscScan:
   ```bash
   npx hardhat verify etherscan --network bscTestnet <CONTRACT_ADDRESS>
   ```

## Verify Deployment

- Check contract on [BSC Testnet Explorer](https://testnet.bscscan.com/)
- Call `ownerOf(0)` to verify NFT ownership
- Check metadata via IPFS gateway
