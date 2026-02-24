# NFT Minting Guide

## Directory Structure

```
mint/
├── image/                 # NFT artwork files
│   └── tokenizeart42.svg  # Main NFT image (42 themed)
├── metadata/              # ERC-721 metadata JSON
│   └── 0.json             # Metadata for token #0
├── scripts/
│   ├── upload-to-ipfs.ts  # Upload image & metadata to IPFS via Pinata
│   └── mint-nft.ts        # Mint NFT on BSC Testnet
├── ipfs-cids.json         # IPFS CIDs (generated after upload)
└── mint-record.json       # Mint transaction record (generated after mint)
```

## Step 1: Upload to IPFS

```bash
# Set Pinata API keys in code/.env
cd code
npx tsx ../mint/scripts/upload-to-ipfs.ts
```

This will:
1. Upload the SVG image to IPFS
2. Update metadata with the image CID
3. Upload metadata JSON to IPFS
4. Save CIDs to `mint/ipfs-cids.json`

## Step 2: Mint NFT

```bash
# Ensure contract is deployed and deployed-address.json is updated
cd code
npx tsx ../mint/scripts/mint-nft.ts
```

This will:
1. Read token URI from `ipfs-cids.json`
2. Call `mintNFT()` on the deployed contract
3. Verify ownership via `ownerOf()`
4. Save record to `mint/mint-record.json`

## Verification

- Image: `https://gateway.pinata.cloud/ipfs/<IMAGE_CID>`
- Metadata: `https://gateway.pinata.cloud/ipfs/<METADATA_CID>`
- Owner: Call `ownerOf(0)` on the contract
