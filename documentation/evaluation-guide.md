# TokenizeArt Evaluation Guide / 평가 가이드

**이 문서는 평가 시 사용하는 완전 가이드입니다.**
**This document is the complete guide for evaluation.**

읽으면서 그대로 따라하면 됩니다. 모든 개념 설명 + 시연 방법 + 예상 질문/답변이 포함되어 있습니다.

---

## Table of Contents / 목차

1. [Quick Reference / 빠른 참조](#1-quick-reference--빠른-참조)
2. [Core Concepts / 핵심 개념](#2-core-concepts--핵심-개념)
3. [Project Structure / 프로젝트 구조](#3-project-structure--프로젝트-구조)
4. [Mandatory Part Evaluation / 필수 파트 평가](#4-mandatory-part-evaluation--필수-파트-평가)
   - 4.1 [Creating the Image / 이미지 생성](#41-creating-the-image--이미지-생성)
   - 4.2 [Deploying the Contract / 컨트랙트 배포](#42-deploying-the-contract--컨트랙트-배포)
   - 4.3 [Minting the NFT / NFT 민팅](#43-minting-the-nft--nft-민팅)
5. [Code Review / 코드 리뷰](#5-code-review--코드-리뷰)
6. [Bonus Part Evaluation / 보너스 파트 평가](#6-bonus-part-evaluation--보너스-파트-평가)
   - 6.1 [Beautiful NFT / 아름다운 NFT](#61-beautiful-nft--아름다운-nft)
   - 6.2 [Minting Website / 민팅 웹사이트](#62-minting-website--민팅-웹사이트)
   - 6.3 [On-Chain Inscriptions / 온체인 인스크립션](#63-on-chain-inscriptions--온체인-인스크립션)
7. [Live Demo Script / 실제 시연 스크립트](#7-live-demo-script--실제-시연-스크립트)
8. [Expected Q&A / 예상 질문과 답변](#8-expected-qa--예상-질문과-답변)

---

## 1. Quick Reference / 빠른 참조

모든 주소와 링크를 한눈에 볼 수 있도록 정리했습니다.

| Item | Value |
|------|-------|
| **Network** | BSC Testnet (Chain ID: 97) |
| **TokenizeArt42** | `0xb95Fd55B6103AC0939441853eE78524D0Fb20233` |
| **TokenizeArt42OnChain** | `0x5cF188eeE62fDC0E2129CDD1cd8E7A75625d62EB` |
| **Deployer / Owner** | `0xE6CB80D7d2439512b36f841FF8F82a87500f220b` |
| **Token #0 Owner** | `0xE6CB80D7d2439512b36f841FF8F82a87500f220b` |
| **Token Standard** | BEP-721 (= ERC-721 on BSC) |
| **Collection Name** | 42 TokenizeArt by keokim |
| **Symbol** | T42K |

**BscScan Links:**
- Contract (IPFS): `https://testnet.bscscan.com/address/0xb95Fd55B6103AC0939441853eE78524D0Fb20233`
- Contract (OnChain): `https://testnet.bscscan.com/address/0x5cF188eeE62fDC0E2129CDD1cd8E7A75625d62EB`
- Mint TX: `https://testnet.bscscan.com/tx/0xea18bfca862cfd2515aa2c071ed906c194ed36b27b2b7fc8c5cf6a596149862c`

**IPFS Links:**
- Image: `https://gateway.pinata.cloud/ipfs/QmWDH7Ka2d3BvyDFtruUtNciMqBRiLp6A5yFSqPaDnpMUU`
- Metadata: `https://gateway.pinata.cloud/ipfs/QmUmA7VWfmZi221yoG1cwv63P3rM9yaTchxorLdLGp4KNg`

---

## 2. Core Concepts / 핵심 개념

평가자가 물어볼 수 있는 모든 핵심 개념을 설명합니다.

### 2.1 Blockchain / 블록체인

**EN:** A blockchain is a distributed, append-only ledger maintained by a network of computers (nodes) that reach consensus without a central authority. Each block contains transactions and a hash of the previous block, creating an immutable chain. Once data is recorded, it cannot be altered.

**KR:** 블록체인은 중앙 관리자 없이 전 세계 컴퓨터(노드)들이 합의를 통해 관리하는 분산형 장부입니다. 각 블록은 거래 내역과 이전 블록의 해시를 포함하여, 한번 기록되면 변경이 불가능한 체인을 형성합니다.

### 2.2 Smart Contract / 스마트 컨트랙트

**EN:** A smart contract is a self-executing program stored on the blockchain. Written in Solidity for EVM-compatible chains, it runs automatically when specific conditions are met. Once deployed, the code is immutable and publicly verifiable.

**KR:** 스마트 컨트랙트는 블록체인에 저장되어 자동으로 실행되는 프로그램입니다. EVM 호환 체인에서는 Solidity 언어로 작성하며, 한번 배포되면 코드를 변경할 수 없고 누구나 검증할 수 있습니다.

### 2.3 NFT (Non-Fungible Token)

**EN:** A Non-Fungible Token is a unique digital asset on the blockchain. Unlike fungible tokens (BNB, ETH) where each unit is identical, each NFT has a unique token ID and distinct properties. The smart contract maintains a mapping from token IDs to owner addresses, enabling verifiable digital ownership.

**KR:** NFT(대체 불가능 토큰)는 블록체인 위의 고유한 디지털 자산입니다. BNB나 ETH 같은 대체 가능 토큰과 달리, 각 NFT는 고유한 ID와 속성을 가집니다. 스마트 컨트랙트가 토큰 ID → 소유자 주소 매핑을 관리하여, 디지털 소유권을 검증 가능하게 합니다.

### 2.4 ERC-721 / BEP-721

**EN:** ERC-721 is the Ethereum standard for NFTs (defined in EIP-721). BEP-721 is the identical standard on BNB Chain. It defines core functions:
- `ownerOf(tokenId)` → Returns the owner address
- `balanceOf(address)` → Returns how many NFTs an address holds
- `tokenURI(tokenId)` → Returns the metadata URI
- `transferFrom(from, to, tokenId)` → Transfers ownership
- `approve(to, tokenId)` → Approves another address to transfer

**KR:** ERC-721은 이더리움의 NFT 표준이고, BEP-721은 BNB Chain에서 동일한 표준입니다. 핵심 함수:
- `ownerOf(tokenId)` → 소유자 주소 반환
- `balanceOf(address)` → 보유 NFT 수 반환
- `tokenURI(tokenId)` → 메타데이터 URI 반환
- `transferFrom(from, to, tokenId)` → 소유권 이전
- `approve(to, tokenId)` → 이전 권한 승인

### 2.5 IPFS

**EN:** IPFS (InterPlanetary File System) is a peer-to-peer distributed file storage network. Files are identified by their content hash (CID), not by location. This means the same content always produces the same address, and content cannot be modified without changing its address. We use Pinata as a pinning service to ensure our files remain available.

**KR:** IPFS(행성 간 파일 시스템)는 P2P 분산 파일 저장 네트워크입니다. 파일은 위치가 아닌 내용의 해시(CID)로 식별됩니다. 같은 내용은 항상 같은 주소를 생성하고, 내용이 바뀌면 주소도 바뀝니다. Pinata 핀닝 서비스로 파일 가용성을 보장합니다.

### 2.6 BNB Chain / BSC Testnet

**EN:** BNB Chain (formerly Binance Smart Chain) is an EVM-compatible blockchain with low fees and fast block times (~3s). BSC Testnet (Chain ID: 97) is its test network where we use free test BNB (tBNB) for development. It uses the same tools as Ethereum (Hardhat, OpenZeppelin, MetaMask).

**KR:** BNB Chain(구 바이낸스 스마트 체인)은 EVM 호환 블록체인으로, 낮은 수수료와 빠른 블록 생성(~3초)이 특징입니다. BSC Testnet(Chain ID: 97)은 테스트 네트워크로, 무료 테스트 BNB(tBNB)를 사용합니다. 이더리움과 동일한 도구(Hardhat, OpenZeppelin, MetaMask)를 사용합니다.

### 2.7 OpenZeppelin

**EN:** OpenZeppelin is the industry-standard library of audited smart contract implementations. Our contracts inherit from `ERC721URIStorage` (NFT with per-token metadata), `Ownable` (access control), `Base64` (encoding utility), and `Strings` (type conversion). These are battle-tested contracts securing billions of dollars on mainnet.

**KR:** OpenZeppelin은 감사(audit)를 거친 스마트 컨트랙트 라이브러리의 업계 표준입니다. 우리 컨트랙트는 `ERC721URIStorage`(토큰별 메타데이터 NFT), `Ownable`(접근 제어), `Base64`(인코딩 유틸리티), `Strings`(타입 변환)를 상속합니다.

### 2.8 Hardhat

**EN:** Hardhat is a development framework for Ethereum/EVM smart contracts. We use Hardhat 3 which provides native TypeScript support, viem integration, the Ignition deployment system, and the Node.js test runner. It handles compilation, testing, deployment, and contract verification.

**KR:** Hardhat은 이더리움/EVM 스마트 컨트랙트 개발 프레임워크입니다. Hardhat 3을 사용하며, 네이티브 TypeScript 지원, viem 통합, Ignition 배포 시스템, Node.js 테스트 러너를 제공합니다.

### 2.9 Gas / 가스

**EN:** Gas is the unit of computational work on EVM blockchains. Every operation (storing data, calling functions, deploying contracts) costs gas. On BSC Testnet we use free tBNB to pay for gas, so there's no real cost.

**KR:** 가스는 EVM 블록체인의 연산 비용 단위입니다. 데이터 저장, 함수 호출, 컨트랙트 배포 등 모든 작업에 가스가 소비됩니다. BSC Testnet에서는 무료 tBNB로 가스를 지불하므로 실제 비용이 없습니다.

### 2.10 Token Metadata / 토큰 메타데이터

**EN:** ERC-721 metadata is a JSON object describing the NFT. It contains `name`, `description`, `image` (URI to the artwork), and optional `attributes`. The `tokenURI()` function returns the URI pointing to this JSON. For IPFS-based NFTs, this is an `ipfs://` URI. For on-chain NFTs, it's a `data:application/json;base64,...` URI.

**KR:** ERC-721 메타데이터는 NFT를 설명하는 JSON 객체입니다. `name`, `description`, `image`(이미지 URI), `attributes`를 포함합니다. `tokenURI()` 함수가 이 JSON을 가리키는 URI를 반환합니다. IPFS 기반은 `ipfs://...`, 온체인은 `data:application/json;base64,...` URI입니다.

---

## 3. Project Structure / 프로젝트 구조

과제에서 요구하는 디렉토리 구조와 우리 프로젝트를 비교합니다.

**과제 요구사항 (PDF page 7):**
```
README.md
code/
deployment/
mint/
documentation/
```

**우리 프로젝트:**
```
TokenizeArt/
├── README.md                          ✅ 프로젝트 설명, 기술 선택 이유
├── code/                              ✅ 스마트 컨트랙트 (Hardhat 프로젝트)
│   ├── contracts/
│   │   ├── TokenizeArt42.sol          ✅ 메인 BEP-721 컨트랙트
│   │   └── TokenizeArt42OnChain.sol   ✅ 보너스: 온체인 SVG 컨트랙트
│   ├── test/
│   │   └── TokenizeArt42.test.ts      ✅ 15개 테스트
│   ├── ignition/modules/
│   │   └── TokenizeArt42.ts           ✅ Hardhat Ignition 배포 모듈
│   ├── hardhat.config.ts              ✅ Hardhat 3 설정
│   ├── package.json
│   └── .env.example                   ✅ 환경변수 템플릿 (키 미포함)
├── deployment/                        ✅ 배포 스크립트 & 기록
│   ├── deploy.sh                         배포 자동화 스크립트
│   └── deployed-address.json             배포된 컨트랙트 주소
├── mint/                              ✅ NFT 이미지, 메타데이터, 스크립트
│   ├── image/
│   │   └── tokenizeart42.svg             NFT 이미지 (42 포함)
│   ├── metadata/
│   │   └── 0.json                        ERC-721 메타데이터
│   ├── scripts/
│   │   ├── upload-to-ipfs.ts             IPFS 업로드 스크립트
│   │   └── mint-nft.ts                   NFT 민팅 스크립트
│   ├── ipfs-cids.json                    IPFS CID 기록
│   └── mint-record.json                  민팅 기록
├── documentation/                     ✅ 프로젝트 문서
│   ├── whitepaper.md                     백서 (전체 기술 문서)
│   └── evaluation-guide.md               평가 가이드 (이 파일)
└── website/                           ✅ 보너스: 민팅 웹사이트
    ├── src/
    │   ├── App.tsx
    │   ├── components/
    │   │   ├── ConnectWallet.tsx
    │   │   ├── MintButton.tsx
    │   │   ├── NftDisplay.tsx
    │   │   └── OwnerCheck.tsx
    │   └── config/
    │       ├── wagmi.ts
    │       └── contract.ts
    └── package.json
```

---

## 4. Mandatory Part Evaluation / 필수 파트 평가

### 4.1 Creating the Image / 이미지 생성

**과제 요구사항 (PDF IV.1):**
> - 이미지에 42가 포함되어야 한다
> - 이미지는 분산 레지스트리(IPFS)에 저장되어야 한다

**시연 방법:**

**Step 1:** NFT 이미지 확인
```bash
# 이미지 파일 열기
open mint/image/tokenizeart42.svg
```
→ 우주 테마 배경에 픽셀 스타일 **"42"** 가 중앙에 크게 표시됨을 확인.

**Step 2:** IPFS에 저장됨을 확인
```bash
# IPFS CID 기록 확인
cat mint/ipfs-cids.json
```
→ `imageCID`, `metadataCID` 확인

**Step 3:** IPFS gateway로 접근 가능 확인
```
브라우저에서 열기:
https://gateway.pinata.cloud/ipfs/QmWDH7Ka2d3BvyDFtruUtNciMqBRiLp6A5yFSqPaDnpMUU
```
→ SVG 이미지가 표시됨을 확인.

**평가자에게 설명:**

> "이미지는 SVG 포맷으로 제작했습니다. 우주 테마 배경에 42가 픽셀 아트 스타일로 중앙에 배치되어 있습니다. 이 이미지는 Pinata를 통해 IPFS에 업로드되었고, CID `QmWDH7Ka...`로 전 세계 어디서든 접근 가능합니다. IPFS는 내용 기반 주소 체계이므로, 이미지 내용이 바뀌면 CID도 바뀌어 무결성이 보장됩니다."
>
> "The image is in SVG format, featuring a space theme with 42 displayed prominently in pixel art style. It's uploaded to IPFS via Pinata with CID `QmWDH7Ka...`, accessible from any IPFS gateway. IPFS uses content-addressing, so the CID guarantees content integrity."

---

### 4.2 Deploying the Contract / 컨트랙트 배포

**과제 요구사항 (PDF IV.2):**
> - README.md에 선택 이유 설명
> - BEP-721 표준 준수
> - 메타데이터 관리 (artist = login, name에 42 포함)
> - code/ 폴더에 코드, 주석, 가독성 있는 변수/함수명
> - 보안 (ownership, privileges)
> - 공개 주소와 네트워크 Git에 기록

**시연 방법:**

**Step 1:** 코드 리뷰 보여주기
```bash
cat code/contracts/TokenizeArt42.sol
```

설명 포인트:
- Line 4-5: `ERC721URIStorage` + `Ownable` 상속 → BEP-721 표준 + 접근 제어
- Line 13: 컬렉션 이름 `"42 TokenizeArt by keokim"` → 42 포함, artist = keokim
- Line 19: `onlyOwner` 수정자 → 오너만 민팅 가능 (보안)
- Line 22: `_safeMint` → 안전한 민팅 (수신자가 ERC-721 처리 가능한지 확인)
- NatSpec 주석 (`@notice`, `@param`, `@return`) → 가독성

**Step 2:** 테스트 실행
```bash
cd code
npx hardhat test
```
→ 15개 테스트 모두 통과 (초록색 체크마크)

**Step 3:** BscScan에서 컨트랙트 확인
```
브라우저에서 열기:
https://testnet.bscscan.com/address/0xb95Fd55B6103AC0939441853eE78524D0Fb20233
```
→ 컨트랙트가 BSC Testnet에 배포되어 있음을 확인.

**Step 4:** README 확인
```bash
cat README.md
```
→ 기술 선택 이유(Why Hardhat 3, Why ERC721URIStorage, Why Ownable 등), 컨트랙트 주소, 네트워크 정보 포함 확인.

**Step 5:** 메타데이터 확인
```bash
cat mint/metadata/0.json
```
→ `"name": "42 TokenizeArt Genesis"` (42 + 제목 포함), `"artist": "keokim"` (로그인명) 확인.

**평가자에게 설명:**

> "컨트랙트는 OpenZeppelin v5의 ERC721URIStorage와 Ownable을 상속합니다. ERC721URIStorage는 각 토큰에 개별 메타데이터 URI를 저장할 수 있게 해주고, Ownable은 오너만 민팅할 수 있도록 접근 제어를 합니다.
>
> mintNFT 함수는 onlyOwner 수정자로 보호되어, 배포자만 호출할 수 있습니다. _safeMint를 사용하여 수신 주소가 컨트랙트일 경우 ERC-721 수신 인터페이스를 구현했는지 확인합니다. 이렇게 하면 토큰이 영구적으로 잠기는 것을 방지합니다.
>
> 메타데이터의 artist는 제 로그인 'keokim'이고, name은 '42 TokenizeArt Genesis'로 42와 제목을 포함합니다."

---

### 4.3 Minting the NFT / NFT 민팅

**과제 요구사항 (PDF IV.3):**
> - 배포 파일을 별도 폴더에
> - 공개 주소와 네트워크 기록
> - NFT 표시 가능
> - ownerOf로 소유자 확인 가능
> - documentation 폴더에 명확한 문서화

**시연 방법:**

**Step 1:** 민팅 기록 확인
```bash
cat mint/mint-record.json
```
→ tokenId, owner, transactionHash, contractAddress, network 확인

**Step 2:** BscScan에서 ownerOf 확인 (핵심!)

BscScan의 "Read Contract" 탭에서 확인:

```
1. 브라우저에서 열기:
   https://testnet.bscscan.com/address/0xb95Fd55B6103AC0939441853eE78524D0Fb20233#readContract

2. "ownerOf" 함수 찾기

3. tokenId에 "0" 입력

4. "Query" 클릭

5. 결과: 0xE6CB80D7d2439512b36f841FF8F82a87500f220b
   → 이것이 배포자(나)의 지갑 주소임을 확인
```

**Step 3:** tokenURI 확인

BscScan의 "Read Contract" 탭에서:
```
1. "tokenURI" 함수 찾기
2. tokenId에 "0" 입력
3. "Query" 클릭
4. 결과: ipfs://QmUmA7VWfmZi221yoG1cwv63P3rM9yaTchxorLdLGp4KNg
   → IPFS에 저장된 메타데이터를 가리킴
```

**Step 4:** IPFS 메타데이터 확인
```
브라우저에서 열기:
https://gateway.pinata.cloud/ipfs/QmUmA7VWfmZi221yoG1cwv63P3rM9yaTchxorLdLGp4KNg
```
→ JSON 메타데이터가 표시됨: name, artist, image (IPFS URI), attributes

**Step 5:** 배포 기록 확인
```bash
cat deployment/deployed-address.json
```
→ 네트워크(BSC Testnet), Chain ID(97), 컨트랙트 주소들 기록 확인

**Step 6:** 문서 확인
```bash
ls documentation/
```
→ whitepaper.md (백서), evaluation-guide.md (평가 가이드) 확인

**평가자에게 설명:**

> "Token #0이 성공적으로 민팅되었습니다. BscScan에서 ownerOf(0)을 호출하면 제 지갑 주소 0xE6CB...가 반환됩니다. 이것이 이 NFT의 소유자가 저임을 블록체인 상에서 증명하는 것입니다.
>
> tokenURI(0)는 ipfs://Qm...를 반환하며, 이 URI를 IPFS gateway를 통해 열면 메타데이터 JSON을 볼 수 있습니다. JSON의 image 필드가 다시 IPFS URI를 가리키고, 그것이 실제 NFT 이미지입니다.
>
> 모든 배포 기록은 deployment/deployed-address.json에, 민팅 기록은 mint/mint-record.json에 남아있습니다."

---

## 5. Code Review / 코드 리뷰

과제에서 "During your evaluation there will be a code review" 라고 명시되어 있습니다.

### 5.1 TokenizeArt42.sol 코드 설명

```solidity
// SPDX-License-Identifier: MIT
// → 오픈소스 MIT 라이선스

pragma solidity ^0.8.28;
// → Solidity 0.8.28 이상. 0.8.x는 내장 오버플로우 보호가 있음.

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// → OpenZeppelin의 ERC-721 + 토큰별 URI 저장소 확장
import "@openzeppelin/contracts/access/Ownable.sol";
// → OpenZeppelin의 소유자 접근 제어

contract TokenizeArt42 is ERC721URIStorage, Ownable {
// → 두 컨트랙트를 상속. ERC721URIStorage = NFT + URI, Ownable = 접근 제어

    uint256 private _nextTokenId;
    // → 다음 토큰 ID. 0부터 시작, 민팅할 때마다 1씩 증가.
    //   private이므로 외부에서 직접 접근 불가.

    constructor() ERC721("42 TokenizeArt by keokim", "T42K") Ownable(msg.sender) {}
    // → 배포 시 실행. 컬렉션 이름과 심볼 설정, 배포자를 오너로 설정.
    //   msg.sender = 이 트랜잭션을 보낸 주소 = 배포자

    function mintNFT(address to, string calldata _tokenURI)
        external onlyOwner returns (uint256)
    // → external: 외부에서만 호출 (가스 절약)
    //   onlyOwner: 오너만 호출 가능 (보안)
    //   calldata: memory보다 가스 효율적 (읽기 전용)
    {
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;
        // → 현재 ID 저장 후 증가 (checks-effects-interactions 패턴)
        //   상태 변경을 먼저 하고, 외부 호출(_safeMint)은 나중에

        _safeMint(to, tokenId);
        // → NFT 생성. 수신자가 컨트랙트면 ERC721Receiver 구현 확인
        //   일반 지갑이면 그냥 전송

        _setTokenURI(tokenId, _tokenURI);
        // → 이 토큰의 메타데이터 URI 설정 (IPFS 주소)

        return tokenId;
    }

    function totalMinted() external view returns (uint256) {
        return _nextTokenId;
    }
    // → view: 블록체인 상태를 읽기만 함 (가스 비용 없음)
}
```

### 5.2 TokenizeArt42OnChain.sol 핵심 설명

```solidity
function tokenURI(uint256 tokenId) public view override returns (string memory) {
    _requireOwned(tokenId);
    // → 존재하지 않는 토큰이면 revert

    string memory svg = _generateSVG(tokenId);
    // → tokenId로부터 결정적으로 SVG 생성

    string memory imageURI = string.concat(
        "data:image/svg+xml;base64,",
        Base64.encode(bytes(svg))
    );
    // → SVG를 Base64 인코딩하여 data URI 생성

    return string.concat(
        "data:application/json;base64,",
        Base64.encode(bytes(_buildJSON(tokenId, imageURI)))
    );
    // → JSON 메타데이터를 Base64 인코딩하여 data URI 반환
    // → 외부 서버(IPFS 포함) 의존 없이 완전 자체 완결적
}
```

**평가자에게 설명:**

> "온체인 컨트랙트는 tokenURI()를 호출하면 IPFS가 아닌, 컨트랙트 자체에서 SVG와 JSON을 실시간 생성합니다. tokenId에 따라 색상이 결정적으로 변하므로 각 토큰마다 고유한 아트워크가 생성됩니다. 결과는 data: URI로 반환되어, 외부 서버가 다운되어도 NFT가 영원히 존재합니다."

### 5.3 Hardhat 설정 설명

```typescript
solidity: {
    version: "0.8.28",
    settings: {
        viaIR: true,     // Yul IR 파이프라인 활성화
        optimizer: { enabled: true, runs: 200 }
    }
}
```

**viaIR: true** — 온체인 컨트랙트의 복잡한 문자열 연결 때문에 필요합니다. 일반 컴파일러는 "stack too deep" 오류가 발생하지만, IR 파이프라인은 이를 해결합니다.

### 5.4 테스트 설명

```bash
cd code && npx hardhat test
```

테스트 구성 (15개):
| # | 테스트 | 목적 |
|---|--------|------|
| 1 | name and symbol | 컬렉션 이름/심볼이 올바른지 |
| 2 | deployer as owner | 배포자가 오너로 설정되는지 |
| 3 | start with 0 | 초기 민팅 수가 0인지 |
| 4 | owner can mint | 오너가 민팅 + 메타데이터 설정 가능한지 |
| 5 | mint to another | 다른 주소에 민팅 가능한지 |
| 6 | reject non-owner | 오너 아닌 사람이 민팅하면 거절되는지 |
| 7 | increment IDs | 토큰 ID가 0, 1, 2 순서로 증가하는지 |
| 8 | revert non-existent | 존재하지 않는 토큰 조회 시 revert 하는지 |
| 9-15 | OnChain 테스트 | name/symbol, owner, mint, data URI 형식, JSON 파싱, SVG 내용("42", "keokim" 포함), revert |

---

## 6. Bonus Part Evaluation / 보너스 파트 평가

> **중요:** PDF에 "The bonus part will only be assessed if the mandatory part is PERFECT" 라고 명시. 필수 파트를 먼저 완벽히 보여준 후 보너스를 시연하세요.

### 6.1 Beautiful NFT / 아름다운 NFT

```bash
open mint/image/tokenizeart42.svg
```

SVG 아트워크 구성 요소:
- 어두운 우주 배경 (방사형 그라디언트)
- 4개의 다채로운 성운/오로라 레이어 (가우시안 블러)
- 24개 흰색 별 + 4개 색깔 별
- 2개의 유성
- 네온 글로우 필터가 적용된 **42** 픽셀 아트 (16px 블록, 흰색→파란색 그라디언트)
- "TOKENIZE ART" + "by keokim" 텍스트
- 부유하는 우주 먼지 입자

### 6.2 Minting Website / 민팅 웹사이트

**시연 방법:**

```bash
cd website
npm install
npm run dev
```
→ 브라우저에서 `http://localhost:5173` 열기

웹사이트 기능:
1. **지갑 연결** — RainbowKit의 "Connect Wallet" 버튼 → MetaMask 연결
2. **BSC Testnet 선택** — RainbowKit이 자동으로 네트워크 전환 제안
3. **Mint 버튼** — "Mint On-Chain NFT" 클릭 → MetaMask에서 트랜잭션 승인
4. **NFT 표시** — 민팅 후 Token ID 입력하면 온체인 SVG 이미지와 메타데이터 표시
5. **소유자 확인** — Token ID 입력 + "Check" 클릭 → 소유자 주소 표시

기술 스택:
- React 18 + Vite (빌드)
- wagmi v2 (블록체인 상호작용 React hooks)
- RainbowKit v2 (지갑 연결 UI)
- viem (블록체인 라이브러리)

**평가자에게 설명:**

> "웹사이트는 React로 구현했고, wagmi와 RainbowKit으로 MetaMask 지갑 연결을 지원합니다. Mint 버튼을 누르면 온체인 컨트랙트의 mintNFT 함수를 호출하고, MetaMask에서 트랜잭션을 승인하면 블록체인에 NFT가 생성됩니다. NFT Display 섹션에서 Token ID를 입력하면 온체인에서 직접 SVG 이미지를 불러와 표시합니다."

### 6.3 On-Chain Inscriptions / 온체인 인스크립션

**과제 보너스 요구사항:**
> "You need to manage your NFT Inscriptions, i.e. store your metadata and image storage directly on-chain"

**시연 방법:**

BscScan에서 확인:
```
1. 열기: https://testnet.bscscan.com/address/0x5cF188eeE62fDC0E2129CDD1cd8E7A75625d62EB#readContract

2. "tokenURI" 함수 → tokenId에 "0" 입력 → Query

3. 결과: data:application/json;base64,eyJuYW1lI... (매우 긴 Base64 문자열)
   → 이것이 메타데이터 전체가 블록체인에 저장되어 있다는 증거

4. 이 Base64를 디코딩하면 JSON이 나오고,
   JSON의 image 필드도 data:image/svg+xml;base64,... 로 시작
   → 이미지도 블록체인에 저장되어 있음
```

Base64 디코딩 시연 (선택사항):
```bash
# tokenURI 결과에서 Base64 부분 디코딩
echo "eyJuYW1lI..." | base64 -d
# → JSON 출력: {"name":"42 TokenizeArt OnChain #0","artist":"keokim",...}
```

**평가자에게 설명:**

> "TokenizeArt42OnChain 컨트랙트는 IPFS를 사용하지 않습니다. tokenURI()를 호출하면 컨트랙트가 실시간으로 SVG를 생성하고, JSON 메타데이터에 SVG를 Base64로 임베딩하여, 전체를 다시 Base64 인코딩한 data: URI로 반환합니다.
>
> 즉, 메타데이터와 이미지가 모두 블록체인 자체에 존재합니다. IPFS 노드가 다운되거나 Pinata가 서비스를 중단해도, 이 NFT는 블록체인이 존재하는 한 영원히 접근 가능합니다.
>
> 각 토큰은 tokenId 기반으로 고유한 색상 조합을 가지므로, 민팅할 때마다 다른 아트워크가 생성됩니다."

---

## 7. Live Demo Script / 실제 시연 스크립트

평가 당일 순서대로 따라하면 됩니다.

### Phase 1: 필수 파트 시연 (10-15분)

```
준비:
- 터미널을 TokenizeArt/ 디렉토리에서 열기
- 브라우저에서 BscScan 탭 미리 열어두기

[1] 프로젝트 구조 보여주기
$ ls -la
→ README.md, code/, deployment/, mint/, documentation/, website/ 확인

[2] 스마트 컨트랙트 코드 리뷰
$ cat code/contracts/TokenizeArt42.sol
→ ERC721URIStorage + Ownable 상속, onlyOwner, _safeMint 설명

[3] 테스트 실행
$ cd code && npx hardhat test
→ 15개 전부 통과 보여주기

[4] NFT 이미지 보여주기
$ open ../mint/image/tokenizeart42.svg
→ 42가 명확히 보이는 우주 테마 SVG

[5] IPFS 확인 (브라우저)
→ https://gateway.pinata.cloud/ipfs/QmWDH7Ka2d3BvyDFtruUtNciMqBRiLp6A5yFSqPaDnpMUU
→ 이미지가 IPFS에서 로드됨

[6] BscScan에서 ownerOf 확인 (핵심!)
→ https://testnet.bscscan.com/address/0xb95Fd55B6103AC0939441853eE78524D0Fb20233#readContract
→ ownerOf(0) → 0xE6CB80D7d2439512b36f841FF8F82a87500f220b

[7] tokenURI 확인
→ tokenURI(0) → ipfs://QmUmA7VWfmZi221yoG1cwv63P3rM9yaTchxorLdLGp4KNg
→ IPFS gateway에서 JSON 메타데이터 확인

[8] 배포 기록 + 문서
$ cat ../deployment/deployed-address.json
$ ls ../documentation/
```

### Phase 2: 보너스 파트 시연 (10분)

```
[9] 온체인 NFT 확인 (BscScan)
→ https://testnet.bscscan.com/address/0x5cF188eeE62fDC0E2129CDD1cd8E7A75625d62EB#readContract
→ tokenURI(0) → data:application/json;base64,... (메타데이터+이미지 전부 온체인)

[10] 웹사이트 시연
$ cd ../website && npm install && npm run dev
→ 브라우저에서 localhost:5173 열기
→ Connect Wallet (MetaMask)
→ Mint 버튼 클릭 (BSC Testnet에 tBNB 있어야 함)
→ NFT Display에서 Token ID 입력하여 온체인 SVG 확인
→ Owner Check에서 소유자 확인
```

---

## 8. Expected Q&A / 예상 질문과 답변

### Q1: "Why did you choose Hardhat over Truffle or Remix?"
### Q1: "왜 Truffle이나 Remix 대신 Hardhat을 선택했나요?"

> **EN:** Hardhat 3 provides native TypeScript support, the viem library for type-safe blockchain interaction, Hardhat Ignition for declarative deployment, and the Node.js native test runner. It has the largest ecosystem and most active development among Solidity frameworks.
>
> **KR:** Hardhat 3은 네이티브 TypeScript 지원, 타입 안전한 viem 라이브러리, 선언적 배포를 위한 Ignition, Node.js 네이티브 테스트 러너를 제공합니다. Solidity 프레임워크 중 가장 큰 생태계와 활발한 개발이 이루어지고 있습니다.

### Q2: "Why ERC721URIStorage instead of plain ERC721?"
### Q2: "왜 ERC721 대신 ERC721URIStorage를 사용했나요?"

> **EN:** Plain ERC721 has a single `_baseURI()` for all tokens, which means all tokens share the same metadata prefix. ERC721URIStorage allows setting a unique URI per token via `_setTokenURI()`, which is essential for IPFS-based NFTs where each token's metadata is uploaded separately and has a different CID.
>
> **KR:** 기본 ERC721은 모든 토큰이 같은 `_baseURI()`를 공유합니다. ERC721URIStorage는 `_setTokenURI()`로 토큰별로 다른 URI를 설정할 수 있어, 각 토큰이 다른 IPFS CID를 가지는 경우에 필수적입니다.

### Q3: "How does ownerOf work?"
### Q3: "ownerOf는 어떻게 동작하나요?"

> **EN:** `ownerOf(tokenId)` reads from the internal mapping `_owners[tokenId]` maintained by the ERC721 contract. When `_safeMint(to, tokenId)` is called, it sets `_owners[tokenId] = to`. This mapping is stored on-chain and is publicly readable by anyone. If the token doesn't exist, it reverts with `ERC721NonexistentToken`.
>
> **KR:** `ownerOf(tokenId)`는 ERC721 컨트랙트의 내부 매핑 `_owners[tokenId]`를 읽습니다. `_safeMint(to, tokenId)`가 호출되면 `_owners[tokenId] = to`로 설정됩니다. 이 매핑은 블록체인에 저장되어 누구나 읽을 수 있습니다. 토큰이 존재하지 않으면 `ERC721NonexistentToken`으로 revert됩니다.

### Q4: "What happens if IPFS goes down?"
### Q4: "IPFS가 다운되면 어떻게 되나요?"

> **EN:** For the IPFS-based contract (TokenizeArt42), the on-chain tokenURI still stores the `ipfs://` CID, but the metadata would be inaccessible if all IPFS nodes unpinned the content. This is why we also implemented the on-chain contract (TokenizeArt42OnChain) as a bonus — it stores everything in the contract itself with zero external dependencies.
>
> **KR:** IPFS 기반 컨트랙트(TokenizeArt42)는 온체인에 `ipfs://` CID가 저장되어 있지만, 모든 IPFS 노드가 핀을 해제하면 메타데이터에 접근할 수 없게 됩니다. 그래서 보너스로 온체인 컨트랙트(TokenizeArt42OnChain)를 구현했습니다. 외부 의존성 없이 컨트랙트 자체에 모든 것을 저장합니다.

### Q5: "What is the onlyOwner modifier?"
### Q5: "onlyOwner 수정자가 뭔가요?"

> **EN:** `onlyOwner` is a modifier from OpenZeppelin's `Ownable` contract. It checks that `msg.sender == owner()` before executing the function body. If the caller is not the owner, it reverts with `OwnableUnauthorizedAccount(caller)`. This ensures that only the contract deployer (or whoever ownership was transferred to) can mint new tokens.
>
> **KR:** `onlyOwner`는 OpenZeppelin의 `Ownable` 컨트랙트의 수정자입니다. 함수 본문 실행 전에 `msg.sender == owner()`를 확인합니다. 호출자가 오너가 아니면 `OwnableUnauthorizedAccount(caller)`로 revert됩니다. 이를 통해 컨트랙트 배포자만 새 토큰을 민팅할 수 있습니다.

### Q6: "What is _safeMint vs _mint?"
### Q6: "_safeMint와 _mint의 차이는?"

> **EN:** `_mint` simply creates the token and assigns ownership. `_safeMint` does the same but additionally checks: if the recipient address is a smart contract, it must implement the `IERC721Receiver` interface. This prevents tokens from being permanently locked in contracts that can't handle them.
>
> **KR:** `_mint`는 단순히 토큰을 생성하고 소유권을 할당합니다. `_safeMint`는 추가로 수신 주소가 스마트 컨트랙트인 경우 `IERC721Receiver` 인터페이스를 구현했는지 확인합니다. 이를 통해 NFT를 처리할 수 없는 컨트랙트에 토큰이 영구 잠기는 것을 방지합니다.

### Q7: "Why BSC Testnet?"
### Q7: "왜 BSC Testnet인가요?"

> **EN:** BSC Testnet is the assignment requirement. It's a test network of BNB Chain (Chain ID: 97) where we use free test BNB. It's EVM-compatible, so we can use standard Ethereum tools (Hardhat, OpenZeppelin, MetaMask) while having lower fees and faster confirmation times than Ethereum.
>
> **KR:** BSC Testnet은 과제 요구사항입니다. BNB Chain의 테스트 네트워크(Chain ID: 97)로, 무료 테스트 BNB를 사용합니다. EVM 호환이므로 이더리움 표준 도구를 그대로 사용하면서, 이더리움보다 수수료가 낮고 확인이 빠릅니다.

### Q8: "How does the on-chain SVG generation work?"
### Q8: "온체인 SVG 생성은 어떻게 동작하나요?"

> **EN:** The `_generateSVG(tokenId)` function uses the token ID to deterministically calculate color hues: `hue1 = (tokenId * 137 + 42) % 360`. It then assembles an SVG string with gradient backgrounds, geometric shapes, and the text "42". The SVG is Base64-encoded and embedded in JSON metadata, which is again Base64-encoded and returned as a `data:` URI. No external server is needed.
>
> **KR:** `_generateSVG(tokenId)` 함수는 토큰 ID에서 결정적으로 색상 hue를 계산합니다: `hue1 = (tokenId * 137 + 42) % 360`. 그라디언트 배경, 기하학적 도형, "42" 텍스트로 SVG 문자열을 조합합니다. SVG를 Base64 인코딩하여 JSON 메타데이터에 임베딩하고, JSON도 Base64 인코딩하여 `data:` URI로 반환합니다. 외부 서버가 필요 없습니다.

### Q9: "What security measures did you implement?"
### Q9: "어떤 보안 조치를 구현했나요?"

> **EN:**
> 1. **Access Control** — `onlyOwner` modifier restricts minting to the contract owner.
> 2. **Safe Minting** — `_safeMint` prevents tokens being locked in non-compatible contracts.
> 3. **Overflow Protection** — Solidity 0.8.28 has built-in overflow/underflow checks.
> 4. **Audited Libraries** — OpenZeppelin v5 contracts are battle-tested and audited.
> 5. **Key Management** — Private keys in `.env` (gitignored), only `.env.example` committed.
> 6. **Content Integrity** — IPFS CIDs are content-addressed hashes, ensuring immutability.
>
> **KR:**
> 1. **접근 제어** — `onlyOwner` 수정자로 오너만 민팅 가능
> 2. **안전한 민팅** — `_safeMint`로 호환되지 않는 컨트랙트에 토큰 잠김 방지
> 3. **오버플로우 보호** — Solidity 0.8.28의 내장 오버플로우/언더플로우 검사
> 4. **검증된 라이브러리** — OpenZeppelin v5는 보안 감사를 거친 업계 표준
> 5. **키 관리** — 프라이빗 키는 `.env`(gitignore)에 저장, `.env.example`만 커밋
> 6. **무결성 보장** — IPFS CID는 내용 기반 해시로 변조 불가

### Q10: "Can you explain the test that checks non-owner rejection?"
### Q10: "오너가 아닌 사람의 민팅 거절 테스트를 설명해주세요."

> **EN:** In the test `should reject minting from non-owner`:
> 1. We deploy the contract (deployer becomes owner).
> 2. We get a second wallet address (`wallets[1]`).
> 3. We create a contract instance connected to that second wallet.
> 4. We call `mintNFT()` from the second wallet.
> 5. We assert that the call reverts — meaning the blockchain rejects the transaction because the caller is not the owner.
>
> **KR:** `should reject minting from non-owner` 테스트:
> 1. 컨트랙트를 배포합니다 (배포자가 오너가 됨).
> 2. 두 번째 지갑 주소를 가져옵니다.
> 3. 두 번째 지갑으로 연결된 컨트랙트 인스턴스를 만듭니다.
> 4. 두 번째 지갑에서 `mintNFT()`를 호출합니다.
> 5. 호출이 revert되는 것을 확인합니다 — 블록체인이 호출자가 오너가 아니므로 트랜잭션을 거절한다는 뜻입니다.

---

**이 문서를 평가 전에 한번 읽고, 시연 순서를 따라하면 필수+보너스 모든 항목을 커버할 수 있습니다.**
