# TokenizeArt - 42 BEP-721 NFT Project

A BEP-721 (ERC-721) NFT project built on BNB Chain (BSC Testnet) for the 42 school TokenizeArt assignment.

## Overview

| Item | Detail |
|------|--------|
| **Collection Name** | 42 TokenizeArt by keokim |
| **Symbol** | T42K |
| **Standard** | BEP-721 (ERC-721) |
| **Network** | BSC Testnet (Chain ID: 97) |
| **Contract Address (IPFS)** | `0xb95Fd55B6103AC0939441853eE78524D0Fb20233` |
| **Contract Address (OnChain)** | `0x5cF188eeE62fDC0E2129CDD1cd8E7A75625d62EB` |
| **Login** | keokim |

## Tech Stack

| Component | Technology | Why |
|-----------|-----------|-----|
| Framework | Hardhat 3 + TypeScript | Latest version, native TS support |
| Contracts | OpenZeppelin v5 (ERC721URIStorage + Ownable) | Industry standard, audited |
| Solidity | ^0.8.28 | Latest stable |
| IPFS | Pinata (free tier) | Reliable, 1GB free |
| Blockchain | BSC Testnet | Assignment requirement |
| Website | React + Vite + wagmi + RainbowKit | Standard Web3 frontend |

## Project Structure

```
TokenizeArt/
├── code/                   # Hardhat project (smart contracts)
│   ├── contracts/          # Solidity contracts
│   ├── test/               # Contract tests
│   ├── ignition/modules/   # Deployment modules
│   └── hardhat.config.ts
├── deployment/             # Deploy scripts & records
├── mint/                   # NFT images, metadata, minting scripts
├── documentation/          # Project documentation
└── website/                # Bonus: minting website
```

## Smart Contracts

### TokenizeArt42.sol (Main)
- ERC721URIStorage + Ownable
- `mintNFT(address to, string tokenURI)` - Owner-only minting with IPFS metadata
- `totalMinted()` - Returns total minted count
- `ownerOf(tokenId)` - Standard ERC-721 ownership query

### TokenizeArt42OnChain.sol (Bonus)
- Fully on-chain SVG art generation
- Unique geometric art with "42" prominently displayed
- `tokenURI()` returns Base64-encoded JSON with embedded SVG
- No external dependencies (IPFS not required)

## Quick Start

```bash
# 1. Install dependencies
cd code && npm install

# 2. Compile contracts
npx hardhat compile

# 3. Run tests
npx hardhat test

# 4. Deploy (after setting up .env)
cp .env.example .env
# Edit .env with your private key and RPC URL
npx hardhat ignition deploy ./ignition/modules/TokenizeArt42.ts --network bscTestnet

# 5. Upload to IPFS & Mint
npx tsx ../mint/scripts/upload-to-ipfs.ts
npx tsx ../mint/scripts/mint-nft.ts
```

## Tests

15 tests covering:
- Contract deployment and initialization
- Owner-only minting access control
- Token ID incrementing
- Token URI storage and retrieval
- On-chain SVG generation and Base64 encoding
- Metadata validation (JSON structure, attributes)
- Revert on non-existent tokens

```bash
cd code && npx hardhat test
```

## Documentation

See [documentation/](./documentation/) for:
- [Whitepaper](./documentation/whitepaper.md) - Complete technical whitepaper covering architecture, security, tokenomics, and all design decisions
- [Evaluation Guide](./documentation/evaluation-guide.md) - Full evaluation guide with concept explanations, demo scripts, and Q&A (EN + KR)

## Design Choices

**Why BSC Testnet?** Assignment requirement. BSC is EVM-compatible with low gas fees.

**Why ERC721URIStorage?** Allows per-token metadata URI, ideal for IPFS-based NFTs.

**Why Ownable?** Simple access control - only the contract deployer can mint.

**Why Hardhat 3?** Latest version with native TypeScript support, viem integration, and improved developer experience.

**Why On-chain SVG?** Bonus feature demonstrating fully decentralized NFTs with no external dependencies.
