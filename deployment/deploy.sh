#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
CODE_DIR="$SCRIPT_DIR/../code"

echo "=== TokenizeArt42 Deployment ==="
echo ""

# Check environment
if [ ! -f "$CODE_DIR/.env" ]; then
  echo "Error: code/.env file not found."
  echo "Copy code/.env.example to code/.env and fill in your keys."
  exit 1
fi

# Source .env from code directory
set -a
source "$CODE_DIR/.env"
set +a

if [ "$PRIVATE_KEY" = "your_private_key_here" ] || [ -z "$PRIVATE_KEY" ]; then
  echo "Error: PRIVATE_KEY not configured in code/.env"
  exit 1
fi

echo "1. Compiling contracts..."
cd "$CODE_DIR"
npx hardhat compile

echo ""
echo "2. Running tests..."
npx hardhat test

echo ""
echo "3. Deploying to BSC Testnet..."
npx hardhat ignition deploy ./ignition/modules/TokenizeArt42.ts --network bscTestnet

echo ""
echo "4. Deployment complete!"
echo "   Check deployment artifacts in code/ignition/deployments/"
echo ""
echo "Next steps:"
echo "  1. Upload NFT image to IPFS: npx tsx ../mint/scripts/upload-to-ipfs.ts"
echo "  2. Mint NFT: npx tsx ../mint/scripts/mint-nft.ts"
echo "  3. Verify contract on BscScan: npx hardhat verify --network bscTestnet <CONTRACT_ADDRESS>"
