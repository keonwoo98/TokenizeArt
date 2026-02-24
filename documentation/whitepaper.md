# TokenizeArt Whitepaper

**Version:** 1.0
**Author:** keokim
**Date:** February 2026
**Network:** BNB Chain — BSC Testnet (Chain ID 97)

---

## Table of Contents

1. [Abstract](#1-abstract)
2. [Introduction](#2-introduction)
   - 2.1 Background
   - 2.2 Problem Statement
   - 2.3 Proposed Solution
3. [Blockchain Fundamentals](#3-blockchain-fundamentals)
   - 3.1 What Is a Blockchain?
   - 3.2 Smart Contracts
   - 3.3 Non-Fungible Tokens (NFTs)
   - 3.4 Token Standards: ERC-721 / BEP-721
4. [Network Selection: BNB Chain](#4-network-selection-bnb-chain)
   - 4.1 Why BNB Chain?
   - 4.2 BSC Testnet
   - 4.3 Comparison with Alternatives
5. [Architecture](#5-architecture)
   - 5.1 System Overview
   - 5.2 On-Chain Layer
   - 5.3 Off-Chain Storage Layer (IPFS)
   - 5.4 Client Layer (Website)
6. [Smart Contract Design](#6-smart-contract-design)
   - 6.1 TokenizeArt42 (IPFS-Based)
   - 6.2 TokenizeArt42OnChain (Fully On-Chain SVG)
   - 6.3 Inheritance Hierarchy
   - 6.4 Access Control Model
   - 6.5 Gas Optimization
7. [Token Metadata & Storage](#7-token-metadata--storage)
   - 7.1 ERC-721 Metadata Standard
   - 7.2 IPFS Storage via Pinata
   - 7.3 On-Chain Metadata Encoding
   - 7.4 Content Addressing & Immutability
8. [NFT Artwork](#8-nft-artwork)
   - 8.1 IPFS Image (Space Theme SVG)
   - 8.2 On-Chain Generative Art
9. [Security Analysis](#9-security-analysis)
   - 9.1 Smart Contract Security
   - 9.2 Access Control
   - 9.3 Threat Model
   - 9.4 Key Management
   - 9.5 IPFS Security
   - 9.6 Known Limitations
10. [Development Stack](#10-development-stack)
    - 10.1 Toolchain
    - 10.2 Testing Framework
    - 10.3 Deployment Pipeline
11. [Tokenomics](#11-tokenomics)
12. [Deployment Record](#12-deployment-record)
13. [Future Considerations](#13-future-considerations)
14. [Conclusion](#14-conclusion)
15. [References](#15-references)

---

## 1. Abstract

TokenizeArt is a BEP-721 non-fungible token project deployed on the BNB Chain BSC Testnet. The project demonstrates the complete lifecycle of NFT creation — from smart contract development and testing, through decentralized image storage on IPFS, to on-chain minting and ownership verification.

Two smart contracts are provided: **TokenizeArt42**, which follows the conventional pattern of linking to off-chain metadata stored on IPFS, and **TokenizeArt42OnChain**, which stores SVG artwork and JSON metadata entirely within the smart contract itself, eliminating all external dependencies.

The project is accompanied by a React-based minting website, a comprehensive test suite of 15 automated tests, and full documentation covering architecture, security, and operational procedures.

---

## 2. Introduction

### 2.1 Background

Blockchain technology enables the creation of digital assets with verifiable scarcity and provable ownership. Since the introduction of the ERC-721 standard in 2018 (EIP-721), non-fungible tokens have become the primary mechanism for representing unique digital assets on EVM-compatible blockchains.

BNB Chain (formerly Binance Smart Chain) implements the same standard under the name BEP-721, maintaining full compatibility with Ethereum tooling while offering significantly lower transaction costs and faster block confirmation times.

### 2.2 Problem Statement

Digital art faces three fundamental challenges in the digital age:

1. **Provenance** — There is no inherent way to trace the origin and ownership history of a digital file.
2. **Authenticity** — Digital files can be duplicated infinitely, making it impossible to distinguish an "original" from a copy.
3. **Ownership** — Traditional digital files lack built-in ownership mechanisms; possession of a file does not constitute verifiable ownership.

### 2.3 Proposed Solution

TokenizeArt addresses these challenges by leveraging the BEP-721 token standard on BNB Chain:

- **Provenance** is established through the immutable transaction history recorded on the blockchain. Every transfer of ownership is permanently logged.
- **Authenticity** is guaranteed by the smart contract itself — each token has a unique ID and is linked to specific metadata via a cryptographic content address (IPFS CID).
- **Ownership** is enforced by the smart contract's `ownerOf()` function, which returns the current owner of any given token at any time.

---

## 3. Blockchain Fundamentals

### 3.1 What Is a Blockchain?

A blockchain is a distributed, append-only ledger maintained by a network of nodes that reach consensus on the state of the ledger without requiring a central authority. Each block contains a set of transactions and a cryptographic hash of the previous block, forming an immutable chain.

Key properties:
- **Decentralization** — No single entity controls the network.
- **Immutability** — Once data is written, it cannot be altered or deleted.
- **Transparency** — All transactions are publicly auditable.
- **Trustlessness** — Participants do not need to trust each other; they trust the protocol.

### 3.2 Smart Contracts

A smart contract is a program stored on the blockchain that executes automatically when predetermined conditions are met. On EVM-compatible chains (Ethereum, BNB Chain, Polygon, etc.), smart contracts are written in Solidity and compiled to EVM bytecode.

Smart contracts are:
- **Deterministic** — Given the same input, they always produce the same output.
- **Immutable** — Once deployed, the code cannot be changed (unless designed with upgrade patterns).
- **Self-executing** — They run automatically when called, without human intervention.

### 3.3 Non-Fungible Tokens (NFTs)

A fungible token (like BNB or ETH) is interchangeable — one unit is identical to any other unit. A non-fungible token is unique — each token has distinct properties and cannot be exchanged on a 1:1 basis with another.

NFTs are implemented as smart contracts that maintain a mapping from token IDs to owner addresses. The contract tracks:
- Who owns each token (`ownerOf`)
- How many tokens an address holds (`balanceOf`)
- Metadata associated with each token (`tokenURI`)
- Approval for transfers (`approve`, `setApprovalForAll`)

### 3.4 Token Standards: ERC-721 / BEP-721

ERC-721 (Ethereum Request for Comments 721) is the standard interface for non-fungible tokens, defined in EIP-721. BEP-721 is the BNB Chain equivalent, identical in interface and behavior.

The standard defines the following core interface:

```solidity
interface IERC721 {
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    function balanceOf(address owner) external view returns (uint256);
    function ownerOf(uint256 tokenId) external view returns (address);
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
    function transferFrom(address from, address to, uint256 tokenId) external;
    function approve(address to, uint256 tokenId) external;
    function setApprovalForAll(address operator, bool approved) external;
    function getApproved(uint256 tokenId) external view returns (address);
    function isApprovedForAll(address owner, address operator) external view returns (bool);
}
```

The metadata extension (`IERC721Metadata`) adds:

```solidity
interface IERC721Metadata {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function tokenURI(uint256 tokenId) external view returns (string memory);
}
```

---

## 4. Network Selection: BNB Chain

### 4.1 Why BNB Chain?

BNB Chain was selected for the following reasons:

| Criterion | BNB Chain | Ethereum | Polygon |
|-----------|-----------|----------|---------|
| EVM Compatibility | Full | Native | Full |
| Avg Block Time | ~3 seconds | ~12 seconds | ~2 seconds |
| Transaction Cost | Very Low (~$0.01) | High (~$1-50) | Very Low (~$0.01) |
| Testnet Faucet | Free tBNB | Free SepoliaETH | Free MATIC |
| Developer Tooling | Full Ethereum tooling | Native | Full Ethereum tooling |
| Assignment Requirement | Required | Not specified | Not specified |

BNB Chain provides full compatibility with Ethereum development tools (Hardhat, OpenZeppelin, viem) while offering practical advantages for development and testing.

### 4.2 BSC Testnet

BSC Testnet is a public test network that mirrors the BSC mainnet environment:

| Parameter | Value |
|-----------|-------|
| Chain ID | 97 |
| Currency | tBNB (test BNB, no real value) |
| RPC Endpoint | `https://data-seed-prebsc-1-s1.bnbchain.org:8545` |
| Block Explorer | `https://testnet.bscscan.com` |
| Faucet | `https://www.bnbchain.org/en/testnet-faucet` |

### 4.3 Comparison with Alternatives

Alternative development platforms considered:

- **Remix IDE** — Browser-based, good for prototyping but limited for project structure and testing.
- **Truffle** — Mature but declining in ecosystem support; Hardhat has surpassed it.
- **Foundry** — Fast and Solidity-native testing, but less TypeScript integration.
- **Hardhat** — Selected. Best TypeScript support, extensive plugin ecosystem, declarative deployment via Ignition.

---

## 5. Architecture

### 5.1 System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   MetaMask    │  │   Website    │  │    Scripts    │  │
│  │   (Wallet)    │  │  (React UI)  │  │  (mint-nft)  │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
└─────────┼─────────────────┼─────────────────┼───────────┘
          │                 │                 │
          ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────┐
│                BNB Chain (BSC Testnet)                   │
│  ┌─────────────────────┐  ┌─────────────────────────┐   │
│  │   TokenizeArt42     │  │  TokenizeArt42OnChain   │   │
│  │  (IPFS metadata)    │  │  (On-chain SVG + JSON)  │   │
│  │                     │  │                         │   │
│  │  mintNFT(to, uri)   │  │  mintNFT(to)            │   │
│  │  ownerOf(id)        │  │  ownerOf(id)            │   │
│  │  tokenURI(id)       │  │  tokenURI(id)           │   │
│  │  totalMinted()      │  │  totalMinted()          │   │
│  └─────────┬───────────┘  └─────────────────────────┘   │
└────────────┼────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│                IPFS (Pinata Pinning)                     │
│  ┌─────────────────────┐  ┌─────────────────────────┐   │
│  │   Image (SVG)       │  │   Metadata (JSON)       │   │
│  │   CID: QmWDH7Ka...  │  │   CID: QmUmA7VW...     │   │
│  └─────────────────────┘  └─────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 5.2 On-Chain Layer

The on-chain layer consists of two smart contracts deployed on BSC Testnet:

1. **TokenizeArt42** — Standard BEP-721 implementation using `ERC721URIStorage`. Token metadata (name, description, image URL) is stored off-chain on IPFS. The contract stores only the IPFS content identifier (CID) as the token URI.

2. **TokenizeArt42OnChain** — Advanced BEP-721 implementation that generates SVG artwork and JSON metadata entirely within the smart contract. The `tokenURI()` function returns a `data:application/json;base64,...` URI containing the complete metadata with an embedded `data:image/svg+xml;base64,...` image.

### 5.3 Off-Chain Storage Layer (IPFS)

IPFS (InterPlanetary File System) is a peer-to-peer distributed file system that uses content-addressing. Files are identified by their cryptographic hash (CID — Content Identifier), meaning:

- The same content always produces the same CID.
- Content cannot be modified after upload (any change produces a different CID).
- Content is addressable by hash, not by location.

Pinata is used as the IPFS pinning service to ensure content availability. Pinning guarantees that at least one node in the IPFS network retains and serves the content.

### 5.4 Client Layer (Website)

The minting website (bonus feature) is built with:

- **React 18** — UI framework
- **Vite** — Build tool
- **wagmi v2** — React hooks for Ethereum/BSC interaction
- **RainbowKit v2** — Wallet connection UI (MetaMask, WalletConnect, etc.)
- **viem** — TypeScript library for blockchain interaction

---

## 6. Smart Contract Design

### 6.1 TokenizeArt42 (IPFS-Based)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenizeArt42 is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    constructor() ERC721("42 TokenizeArt by keokim", "T42K") Ownable(msg.sender) {}

    function mintNFT(address to, string calldata _tokenURI)
        external onlyOwner returns (uint256)
    {
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        return tokenId;
    }

    function totalMinted() external view returns (uint256) {
        return _nextTokenId;
    }
}
```

**Design decisions:**

- **ERC721URIStorage** — Extends the base ERC721 to store a unique URI per token. This allows each NFT to point to different IPFS metadata.
- **Ownable** — Restricts minting to the contract deployer. The `onlyOwner` modifier ensures that only the owner address can call `mintNFT()`.
- **`_nextTokenId`** — A simple counter starting at 0 for gas-efficient sequential ID generation. No need for OpenZeppelin's Counters library (deprecated in v5).
- **`calldata`** — The `_tokenURI` parameter uses `calldata` instead of `memory` for gas savings on external function calls.
- **`_safeMint`** — Uses safe minting which checks that the recipient address (if a contract) implements `IERC721Receiver`, preventing tokens from being permanently locked.

### 6.2 TokenizeArt42OnChain (Fully On-Chain SVG)

The on-chain contract stores no external references. The entire NFT — image and metadata — is generated by the contract itself.

**Art generation pipeline:**

```
Token ID → Deterministic Hue Calculation → SVG Generation → Base64 Encoding → JSON Metadata → Base64 Encoding → data: URI
```

1. **Hue calculation:** `hue1 = (tokenId * 137 + 42) % 360` produces a unique starting hue. The multiplier 137 (a prime) ensures good distribution across the color wheel. Additional hues are offset by 120° and 240° for a triadic color scheme.

2. **SVG generation:** The contract assembles an SVG string with:
   - A gradient background using `hue1` and `hue2`
   - Geometric shapes (circles, triangle) using all three hues
   - The text "42" prominently displayed in white
   - The artist name "TokenizeArt by keokim"
   - The token ID number

3. **Base64 encoding:** The SVG is Base64-encoded and embedded as a data URI in the image field. The complete JSON metadata is then Base64-encoded and returned as a `data:application/json;base64,...` URI.

### 6.3 Inheritance Hierarchy

```
TokenizeArt42:
  ERC721URIStorage
    └── ERC721
        ├── ERC165 (interface detection)
        ├── IERC721 (core NFT interface)
        └── IERC721Metadata (name, symbol, tokenURI)
  Ownable
    └── Context (msg.sender abstraction)

TokenizeArt42OnChain:
  ERC721 (base, without URIStorage)
  Ownable
  Base64 (OpenZeppelin utility)
  Strings (uint256 to string conversion)
```

### 6.4 Access Control Model

| Function | Visibility | Access | Mechanism |
|----------|-----------|--------|-----------|
| `mintNFT()` | external | Owner only | `onlyOwner` modifier |
| `ownerOf()` | public view | Anyone | ERC-721 standard (read-only) |
| `tokenURI()` | public view | Anyone | ERC-721 standard (read-only) |
| `totalMinted()` | external view | Anyone | Custom (read-only) |
| `transferFrom()` | public | Owner/Approved | ERC-721 approval system |
| `transferOwnership()` | public | Owner only | Ownable (inherited) |
| `renounceOwnership()` | public | Owner only | Ownable (inherited) |

### 6.5 Gas Optimization

- **`viaIR: true`** — Enables the Yul IR compilation pipeline, required for the on-chain contract which would otherwise hit "stack too deep" errors due to the complex string concatenation in SVG generation.
- **Optimizer enabled (200 runs)** — Balances deployment cost against runtime cost.
- **`calldata` over `memory`** — Used for the tokenURI parameter in `mintNFT()`.
- **No Counters library** — Direct `uint256` increment is cheaper and Counters was deprecated in OpenZeppelin v5.
- **`string.concat`** — Solidity 0.8.12+ native string concatenation, avoiding `abi.encodePacked` overhead.

---

## 7. Token Metadata & Storage

### 7.1 ERC-721 Metadata Standard

The ERC-721 metadata JSON schema (defined in EIP-721) specifies:

```json
{
    "title": "Asset Metadata",
    "type": "object",
    "properties": {
        "name": { "type": "string", "description": "Name of the asset" },
        "description": { "type": "string", "description": "Description of the asset" },
        "image": { "type": "string", "description": "URI to the image" }
    }
}
```

Our metadata extends this with `artist` and `attributes` fields:

```json
{
    "name": "42 TokenizeArt Genesis",
    "description": "A unique NFT created for the 42 TokenizeArt project...",
    "artist": "keokim",
    "image": "ipfs://QmWDH7Ka2d3BvyDFtruUtNciMqBRiLp6A5yFSqPaDnpMUU",
    "attributes": [
        { "trait_type": "School", "value": "42" },
        { "trait_type": "Artist", "value": "keokim" },
        { "trait_type": "Collection", "value": "Genesis" },
        { "trait_type": "Network", "value": "BSC Testnet" }
    ]
}
```

### 7.2 IPFS Storage via Pinata

The upload pipeline (implemented in `mint/scripts/upload-to-ipfs.ts`):

1. Read the SVG image file from `mint/image/tokenizeart42.svg`
2. Upload to IPFS via Pinata's `pinFileToIPFS` API → receive Image CID
3. Update the metadata JSON with the actual `ipfs://<ImageCID>` URL
4. Upload the updated metadata JSON via `pinJSONToIPFS` → receive Metadata CID
5. The final token URI is `ipfs://<MetadataCID>`

### 7.3 On-Chain Metadata Encoding

For the on-chain contract, `tokenURI()` returns:

```
data:application/json;base64,eyJuYW1lIjoiNDIgVG9rZW5pemVBcnQg...
```

When decoded, this produces JSON with an embedded SVG image:

```json
{
    "name": "42 TokenizeArt OnChain #0",
    "description": "A fully on-chain NFT for the 42 TokenizeArt project.",
    "artist": "keokim",
    "image": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0i...",
    "attributes": [
        { "trait_type": "School", "value": "42" },
        { "trait_type": "Artist", "value": "keokim" },
        { "trait_type": "Type", "value": "On-Chain SVG" },
        { "trait_type": "Token ID", "value": "0" }
    ]
}
```

### 7.4 Content Addressing & Immutability

IPFS uses content-based addressing (CID v0 or v1). The CID is a cryptographic hash of the content itself. This means:

- If the content changes, the CID changes → the original content at the original CID remains intact.
- The token URI stored on-chain (`ipfs://QmUmA7VW...`) permanently points to the exact content that was uploaded.
- No server, including Pinata, can alter the content without changing the CID.

---

## 8. NFT Artwork

### 8.1 IPFS Image (Space Theme SVG)

The NFT artwork (`mint/image/tokenizeart42.svg`) is a 400x400 SVG featuring:

- A deep space background with a radial gradient (dark navy to near-black)
- Four colorful aurora-like nebula layers using Gaussian blur filters (purple, teal, deep blue, magenta)
- A field of stars (white pixels of varying opacity) scattered across the canvas
- Two shooting stars with pixel-art trails
- A large pixel-art **"42"** rendered in 16px blocks with a white-to-blue linear gradient and neon glow filter
- "TOKENIZE ART" and "by keokim" text labels
- Floating cosmic dust particles

The number **42** is clearly and prominently displayed as the central element, satisfying the assignment requirement.

### 8.2 On-Chain Generative Art

The on-chain contract generates unique art for each token ID using deterministic hue rotation. Each minted token receives a distinct triadic color scheme derived from `(tokenId * 137 + 42) % 360`. The art features gradient backgrounds, geometric shapes (circles, triangle), and the text "42" with the artist name.

---

## 9. Security Analysis

### 9.1 Smart Contract Security

Both contracts are built on **OpenZeppelin v5**, the most widely used and audited smart contract library in the Ethereum ecosystem. OpenZeppelin contracts have been:

- Audited by multiple independent security firms
- Battle-tested on mainnet securing billions of dollars in value
- Maintained with continuous security updates

### 9.2 Access Control

The `onlyOwner` modifier (from OpenZeppelin's `Ownable`) restricts the `mintNFT()` function to the contract deployer. Unauthorized callers receive a revert with `OwnableUnauthorizedAccount(caller)`.

The owner can:
- Mint new NFTs to any address
- Transfer ownership to another address (`transferOwnership`)
- Renounce ownership permanently (`renounceOwnership`)

### 9.3 Threat Model

| Threat | Risk Level | Mitigation |
|--------|-----------|------------|
| **Reentrancy** | Low | `_safeMint` follows checks-effects-interactions pattern. State (`_nextTokenId`) is updated before the external call to the receiver. |
| **Integer Overflow** | None | Solidity 0.8.28 has built-in overflow/underflow protection. The counter would need 2^256 increments to overflow (physically impossible). |
| **Access Control Bypass** | Low | OpenZeppelin's battle-tested `Ownable` implementation with custom Solidity 0.8+ error types. |
| **Front-running** | N/A | Only the owner can mint, so front-running minting transactions is not applicable. |
| **Denial of Service** | Low | No unbounded loops. On-chain SVG generation has constant gas cost regardless of input. |
| **Metadata Tampering** | None (IPFS) | IPFS CIDs are content-addressed hashes. Altering content changes the CID. On-chain metadata is immutable by nature. |

### 9.4 Key Management

- Private keys are stored in `.env` files, which are excluded from version control via `.gitignore`.
- Only `.env.example` (with placeholder values) is committed to the repository.
- The deployed contracts use BSC Testnet with test BNB (no real monetary value).

### 9.5 IPFS Security

- **Integrity:** Content is identified by its cryptographic hash (CID). Any modification produces a different CID.
- **Availability:** Pinata pinning ensures at least one node always serves the content.
- **Permanence:** As long as the content is pinned, it remains accessible through any IPFS gateway.

### 9.6 Known Limitations

1. **Centralized Minting:** Only the owner can mint. If the owner's private key is compromised, an attacker could mint unlimited tokens.
2. **No Pause Mechanism:** The contracts cannot be paused in an emergency. For production, consider OpenZeppelin's `Pausable`.
3. **No Token Burning:** Once minted, tokens cannot be destroyed. Consider `ERC721Burnable` for production.
4. **No Royalty Standard:** ERC-2981 royalties are not implemented (out of scope for this assignment).
5. **Single Owner:** No multi-sig or role-based access control. For production, consider `AccessControl`.

---

## 10. Development Stack

### 10.1 Toolchain

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Smart Contract Language | Solidity | ^0.8.28 | Latest stable with native overflow protection |
| Development Framework | Hardhat | 3.1.9 | Compilation, testing, deployment, verification |
| Contract Library | OpenZeppelin | v5.2.0 | Audited ERC-721, Ownable, Base64, Strings |
| Blockchain Interaction | viem | 2.43.0 | TypeScript-first Ethereum client |
| Deployment | Hardhat Ignition | 3.0.7 | Declarative, reproducible deployment |
| IPFS Pinning | Pinata | REST API | Free tier (1GB), reliable pinning |
| Testing | Node.js Test Runner | Native | Built-in, no extra dependencies |
| Frontend | React + Vite | 18 / 6 | Modern build tooling |
| Wallet Connection | RainbowKit + wagmi | 2.x | Industry-standard Web3 UI |

### 10.2 Testing Framework

The test suite uses Node.js native test runner (via `@nomicfoundation/hardhat-node-test-runner`) with Hardhat 3's viem integration:

```typescript
import hre from "hardhat";
const { viem } = await hre.network.connect();

const contract = await viem.deployContract("TokenizeArt42");
await contract.write.mintNFT([address, tokenURI]);
const owner = await contract.read.ownerOf([0n]);
```

**15 tests covering:**

TokenizeArt42 (8 tests):
1. Correct name and symbol
2. Deployer set as owner
3. Initial minted count is 0
4. Owner can mint with correct tokenURI
5. Mint to another address
6. Reject non-owner minting
7. Sequential token ID increment
8. Revert on non-existent token

TokenizeArt42OnChain (7 tests):
1. Correct name and symbol
2. Deployer set as owner
3. On-chain minting
4. Valid data URI format
5. Valid JSON metadata (name, artist, attributes)
6. Valid SVG content (contains "42" and "keokim")
7. Revert on non-existent token

### 10.3 Deployment Pipeline

```
1. npx hardhat compile          → Compile Solidity to EVM bytecode
2. npx hardhat test             → Run 15 automated tests
3. npx hardhat ignition deploy  → Deploy via Hardhat Ignition to BSC Testnet
4. npx tsx upload-to-ipfs.ts    → Upload image + metadata to IPFS
5. npx tsx mint-nft.ts          → Mint NFT #0 with IPFS token URI
6. ownerOf(0)                   → Verify ownership on-chain
```

---

## 11. Tokenomics

| Property | Value |
|----------|-------|
| Collection Name | 42 TokenizeArt by keokim |
| Symbol | T42K |
| Token Standard | BEP-721 (ERC-721) |
| Maximum Supply | Unlimited (owner-controlled) |
| Minting Access | Owner only (centralized) |
| Minting Cost | Gas fees only (no mint price) |
| Royalties | Not implemented |
| Initial Mint | Token #0 to deployer |
| Burn Mechanism | Not implemented |

The on-chain variant:

| Property | Value |
|----------|-------|
| Collection Name | 42 TokenizeArt OnChain by keokim |
| Symbol | T42O |
| Unique Art | Yes — each token has unique color scheme |
| External Dependencies | None — fully self-contained |

---

## 12. Deployment Record

| Field | Value |
|-------|-------|
| Network | BSC Testnet (Chain ID: 97) |
| TokenizeArt42 Address | `0xb95Fd55B6103AC0939441853eE78524D0Fb20233` |
| TokenizeArt42OnChain Address | `0x5cF188eeE62fDC0E2129CDD1cd8E7A75625d62EB` |
| Deployer Address | `0xE6CB80D7d2439512b36f841FF8F82a87500f220b` |
| Token #0 Owner | `0xE6CB80D7d2439512b36f841FF8F82a87500f220b` |
| Token #0 URI | `ipfs://QmUmA7VWfmZi221yoG1cwv63P3rM9yaTchxorLdLGp4KNg` |
| Image CID | `QmWDH7Ka2d3BvyDFtruUtNciMqBRiLp6A5yFSqPaDnpMUU` |
| Mint TX Hash | `0xea18bfca862cfd2515aa2c071ed906c194ed36b27b2b7fc8c5cf6a596149862c` |
| Block Number | 92115967 |
| Deployed At | 2026-02-23 |

BscScan Links:
- TokenizeArt42: `https://testnet.bscscan.com/address/0xb95Fd55B6103AC0939441853eE78524D0Fb20233`
- TokenizeArt42OnChain: `https://testnet.bscscan.com/address/0x5cF188eeE62fDC0E2129CDD1cd8E7A75625d62EB`
- Mint Transaction: `https://testnet.bscscan.com/tx/0xea18bfca862cfd2515aa2c071ed906c194ed36b27b2b7fc8c5cf6a596149862c`

---

## 13. Future Considerations

While this project serves as an educational exercise for the 42 school curriculum, potential production extensions include:

1. **ERC-2981 Royalty Standard** — Automatic royalty payments on secondary sales.
2. **Multi-chain Deployment** — Deploy to Polygon, Arbitrum, or Ethereum mainnet.
3. **Decentralized Minting** — Allow anyone to mint (with or without a mint price).
4. **Generative Art** — On-chain randomness (Chainlink VRF) for unique generative artwork.
5. **Marketplace Integration** — List on OpenSea, tofuNFT, or PancakeSwap NFT marketplace.
6. **Access Control Roles** — Replace `Ownable` with `AccessControl` for role-based permissions.
7. **Upgradeable Contracts** — Use OpenZeppelin's proxy pattern for future upgrades.
8. **Batch Minting** — Gas-efficient batch minting for multiple tokens in one transaction.

---

## 14. Conclusion

TokenizeArt demonstrates the complete lifecycle of non-fungible token creation on BNB Chain:

- **Smart Contract Development** — Two BEP-721 contracts with proper access control, gas optimization, and comprehensive NatSpec documentation.
- **Decentralized Storage** — NFT artwork and metadata stored on IPFS via Pinata, ensuring content integrity through content-addressing.
- **On-Chain Art** — A fully self-contained NFT with generative SVG artwork and Base64-encoded metadata, eliminating all external dependencies.
- **Testing** — 15 automated tests covering deployment, minting, access control, metadata encoding, and error handling.
- **Security** — Built on audited OpenZeppelin v5 libraries with owner-only access control and proper key management.
- **Documentation** — Comprehensive whitepaper and evaluation guide covering architecture, security, and operational procedures.
- **Bonus Features** — Minting website with wallet connection, on-chain SVG generation, and detailed project documentation.

The project successfully fulfills all mandatory requirements of the 42 TokenizeArt assignment and implements all three bonus features.

---

## 15. References

1. EIP-721: Non-Fungible Token Standard — https://eips.ethereum.org/EIPS/eip-721
2. OpenZeppelin Contracts v5 — https://docs.openzeppelin.com/contracts/5.x/
3. BNB Chain Documentation — https://docs.bnbchain.org/
4. Hardhat 3 Documentation — https://hardhat.org/docs
5. IPFS Documentation — https://docs.ipfs.tech/
6. Pinata Documentation — https://docs.pinata.cloud/
7. Solidity Documentation — https://docs.soliditylang.org/en/v0.8.28/
8. viem Documentation — https://viem.sh/
9. wagmi Documentation — https://wagmi.sh/
10. RainbowKit Documentation — https://www.rainbowkit.com/docs/
