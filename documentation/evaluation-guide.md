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
9. [Deep Concepts / 심화 개념 완전 정복](#9-deep-concepts--심화-개념-완전-정복)
10. [Line-by-Line Code Review / 코드 라인별 리뷰 대비](#10-line-by-line-code-review--코드-라인별-리뷰-대비)
11. [Self-Check & Safety / 자가 점검과 안전 수칙](#11-self-check--safety--자가-점검과-안전-수칙)

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

> **평가는 영어로 진행됩니다.** 각 단계마다 **명령을 치기 전에 영어로 무엇을 보여줄지 먼저 말하고**, 결과가 나오면 영어로 해석해 주세요. 아래 `🗣 Say:` 가 그대로 읽으면 되는 영어 멘트입니다. 침묵하고 명령만 치지 마세요 — 항상 말하면서 보여주세요.

> ⚠️ **Demo principle / 시연 원칙:** Do NOT redeploy. The already-deployed and minted contracts on BSC Testnet are the strongest evidence. The whole demo works with just BscScan + the website (MetaMask), no `.env` needed. (재배포 금지 — 9.12, 9.13 참고)

### Phase 1: Mandatory Part / 필수 파트 (10-15분)

**[Intro] 시작 멘트**
> 🗣 Say: *"Hi, this is my TokenizeArt project — a BEP-721 NFT built on BNB Chain's BSC Testnet. I'll walk you through the image, the smart contract, the proof of ownership on-chain, and then the bonus features. Let me start with the project structure."*

**[1] Project structure / 프로젝트 구조**
```bash
ls -la
```
> 🗣 Say: *"The repository follows the exact folder structure from the subject PDF: a README, a `code` folder with the contracts, `deployment`, `mint`, `documentation`, and a bonus `website` folder."*

**[2] Smart contract code / 스마트 컨트랙트 코드**
```bash
cat code/contracts/TokenizeArt42.sol
```
> 🗣 Say: *"This is the main contract. It inherits from OpenZeppelin's ERC721URIStorage, which is the BEP-721 NFT standard with per-token metadata, and Ownable for access control. The `mintNFT` function is protected by the `onlyOwner` modifier, so only I — the deployer — can mint. I use `_safeMint` so that if the receiver is a contract, it must be able to handle NFTs, which prevents tokens from getting locked forever."*

**[3] Run tests / 테스트 실행**
```bash
cd code && npx hardhat test
```
> 🗣 Say: *"Here are my 15 automated tests, all passing. They cover deployment, owner-only minting, token ID incrementing, metadata, and the on-chain SVG generation. Notice test number six — it verifies that a non-owner is rejected when trying to mint, which is the security requirement from the subject."*

**[4] NFT image / NFT 이미지**
```bash
open ../mint/image/tokenizeart42.svg
```
> 🗣 Say: *"This is my NFT artwork. It's a space-themed SVG with the number 42 in pixel-art style right in the center, which is the mandatory constraint from the subject."*

**[5] Image on IPFS / IPFS 이미지 확인 (브라우저)**
`https://gateway.pinata.cloud/ipfs/QmWDH7Ka2d3BvyDFtruUtNciMqBRiLp6A5yFSqPaDnpMUU`
> 🗣 Say: *"The image is stored on IPFS, a distributed storage network, as the subject requires. This `Qm...` part of the URL is the content hash, or CID. Because the address is derived from the file's content, the content can't be changed without changing the address — that guarantees integrity."*

**[6] Prove ownership with ownerOf / 소유권 증명 (핵심!)**
`https://testnet.bscscan.com/address/0xb95Fd55B6103AC0939441853eE78524D0Fb20233#readContract`
> 🗣 Say: *"Now the most important part. On BscScan's Read Contract tab, I'll call `ownerOf` with token ID zero. It returns `0xE6CB80...220b`, which is my wallet. This is the proof of ownership the subject asks for, recorded permanently on the blockchain — nobody can erase it."*

**[7] tokenURI / 메타데이터 주소 확인**
> 🗣 Say: *"Next I call `tokenURI(0)`. It returns `ipfs://QmUmA7...`, the IPFS address of the metadata. If I open that, I get the JSON with the name, the artist — my login keokim — and the image field, which points to the artwork we just saw."*

**[8] Deployment record + docs / 배포 기록 + 문서**
```bash
cat ../deployment/deployed-address.json
ls ../documentation/
```
> 🗣 Say: *"All deployment info — network, chain ID 97, and both contract addresses — is recorded here. And the documentation folder has a full whitepaper and this evaluation guide."*

### Phase 2: Bonus Part / 보너스 파트 (10분)

> 🗣 Say: *"The subject says bonuses are only assessed if the mandatory part is perfect. Since everything mandatory works, let me show the three bonus features: a beautiful NFT, a minting website, and a fully on-chain NFT."*

**[9] Fully on-chain NFT / 온체인 NFT 확인 (BscScan)**
`https://testnet.bscscan.com/address/0x5cF188eeE62fDC0E2129CDD1cd8E7A75625d62EB#readContract`
> 🗣 Say: *"This second contract stores everything on-chain. When I call `tokenURI(0)`, it returns a `data:application/json;base64` string — that's the metadata generated by the contract itself, not from IPFS. If I decode the Base64, the image field is also a `data:image/svg+xml;base64` string, which proves the artwork lives entirely inside the blockchain. So even if IPFS or Pinata disappears, this NFT survives forever."*

**[10] Minting website / 민팅 웹사이트**
```bash
cd ../website && npm run dev
```
> 🗣 Say: *"This is my minting website, built with React, wagmi, and RainbowKit. I click Connect Wallet to link MetaMask, then click Mint — MetaMask asks me to sign and pay gas in test BNB. After a few seconds the NFT is minted. In the Explorer section I enter the token ID and the on-chain SVG loads directly from the contract. In the Ownership section I can check any token's owner — that's the `ownerOf` function with a graphical interface."*

> 🗣 Note: *"This minting goes through MetaMask, so it signs the transaction — I don't even need my private key in a `.env` file for this."*

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

## 9. Deep Concepts / 심화 개념 완전 정복

> 이 섹션은 평가관이 "왜?"를 깊게 파고들 때, 또는 내가 개념이 헷갈릴 때 보는 곳입니다. 각 개념을 **일상 비유 → 정확한 설명 → 우리 프로젝트 적용** 순서로 정리했습니다.

### 9.0 외워두면 만능인 5가지 비유

평가 내내 어려운 단어가 나오면 이 비유로 끌어오세요.

| 개념 | 한 줄 비유 |
|------|-----------|
| **블록체인** | 전 세계가 공유하는, 한 번 쓰면 못 지우는 구글 시트 |
| **스마트 컨트랙트** | 블록체인 위에 올라간 자판기 프로그램 (조건 맞으면 자동 실행) |
| **NFT** | 그림이 아니라 "이 그림의 주인은 OOO"라는 디지털 등기부등본 |
| **IPFS** | 파일 내용으로 주소가 만들어지는, 토렌트 같은 분산 저장소 |
| **BSC Testnet** | 가짜 코인(tBNB)으로 연습하는 연습용 블록체인 |

### 9.1 NFT는 "그림"이 아니라 "소유권 기록"이다

NFT의 본질은 블록체인 위의 표 한 줄입니다:

| 토큰 ID | 주인 주소 | 정보 위치(tokenURI) |
|---------|-----------|--------------------|
| 0 | 0xE6CB80... (keokim) | ipfs://QmUmA7... |

- 그림 파일 자체는 NFT가 아님. 그림은 IPFS에 있는 부속물.
- **이 표를 관리하고 새 줄을 추가하는 프로그램 = 스마트 컨트랙트.**
- NFT의 진짜 식별자 = `(컨트랙트 주소, 토큰 ID)` 페어. 토큰 ID만으로는 식별 불가.
  - "메인 컨트랙트의 #0"과 "온체인 컨트랙트의 #0"은 **완전히 다른 NFT** (회사가 다른데 사번이 같은 격).

### 9.2 블록체인 vs IPFS — 무엇이 어디에 저장되나

**가장 자주 헷갈리는 부분.** 메타데이터는 블록체인이 아니라 **IPFS**에 있습니다. 블록체인에는 "IPFS 주소 한 줄"만 있어요.

```
블록체인 (BSC)
  └─ 토큰 #0 → 주인: keokim, tokenURI: "ipfs://Qm222"  ← 주소만 저장
                                              │
                                              ▼
                            IPFS: 메타데이터 JSON { "image": "ipfs://Qm111" }
                                              │
                                              ▼
                            IPFS: 실제 SVG 이미지 파일
```

| 무엇이 | 어디에 |
|--------|--------|
| 컨트랙트 코드, 소유권, tokenURI(IPFS 주소 문자열) | **블록체인** |
| 메타데이터 JSON (이름/작가/설명) | **IPFS** |
| 이미지(SVG) | **IPFS** |

이유: 블록체인은 저장이 비싸서 큰 파일(이미지/JSON)을 못 올림. 그래서 핵심(소유권+주소)만 올리고 나머지는 IPFS에.

**블록체인과 IPFS는 완전히 별개 시스템입니다.** 컨트랙트는 IPFS를 알지도 못함. 그냥 `"ipfs://..."`라는 평범한 문자열을 들고 있을 뿐.

### 9.3 IPFS와 Pinata의 관계 (이메일 비유)

| 우리 세계 | 이메일 세계 | 정체 |
|-----------|-------------|------|
| **IPFS** | SMTP | 프로토콜(기술 규약). 회사 아님 |
| **Pinata** | Gmail | IPFS 위에서 보관 서비스 하는 회사 |
| **AWS** | Google 데이터센터 | Pinata가 빌려쓰는 물리적 인프라 |

→ **Pinata는 AWS 같은 클라우드를 빌려서 그 위에 IPFS 노드를 돌리는 회사**예요. 우리는 Pinata API로 파일을 업로드하고 Pinata가 그 파일을 "핀(pin)"으로 영구 보관합니다.

### 9.4 IPFS는 왜 영구성이 약한가 (토렌트 비유)

IPFS는 **누군가가 파일을 들고 있어야만 받을 수 있는** 토렌트 같은 시스템입니다.

| 방식 | 의미 | 영구 보관? |
|------|------|-----------|
| **캐시** | 누가 요청해서 잠깐 들고 있음 | ❌ 디스크 차면 자동 삭제(garbage collection) |
| **핀(pin)** | "영구히 들고 있겠다" 명시 설정 | ⭕ 핀 풀기 전까지 보관 |

- 블록체인 노드는 데이터 보관 **의무**가 있음(합의 규칙). IPFS 노드는 의무 없음.
- 무명의 NFT는 사실상 **Pinata 하나만** 핀하고 있어서, Pinata가 핀을 풀면 그림이 사라짐.
- → **이게 보너스 온체인 컨트랙트를 만든 이유.** 그림을 블록체인에 박아서 Pinata 의존 제거.

> **Say (EN):** *"IPFS isn't automatic permanent storage. Only nodes that explicitly pin a file keep it, so an unpopular file can disappear if Pinata unpins it. That's exactly why I also built the on-chain contract that removes the IPFS dependency entirely."*
> **평가 답변 (KR):** "IPFS는 자동 영구 보관이 아니에요. 명시적으로 핀한 노드만 들고 있고, 인기 없는 파일은 Pinata가 핀 풀면 사라집니다. 그래서 온체인 컨트랙트로 IPFS 의존을 없앤 버전도 만들었습니다."

### 9.5 "탈중앙화"의 진짜 의미 (물리적 분산 ≠ 탈중앙)

**현실: 블록체인 노드도, Pinata도 대부분 AWS/GCP 같은 데이터센터에서 돌아갑니다.** 그럼 뭐가 탈중앙이냐? 3가지 차원으로 나눠 봐야 합니다.

| 차원 | AWS S3 | 블록체인 |
|------|--------|----------|
| ① 물리적 분산 | ❌ AWS만 | △ (사실 데이터센터 의존 큼) |
| ② 한 주체가 좌우 가능? | ⭕ AWS가 다 결정 | ❌ 합의 필요 (여러 운영사) |
| ③ 데이터 변경/삭제 가능? | ⭕ 마음대로 | ❌ 합의 없이 불가, 한 번 쓰면 영구 |

→ **블록체인의 탈중앙화 = "물리적 분산"이 아니라 "한 주체가 좌우 못 함 + 데이터 변경 불가"(거버넌스적 의미).** AWS는 한 회사가 데이터를 지울 수 있지만, 블록체인은 노드 다수가 동의해야만 바뀜.

> **Say (EN):** *"It's true the nodes run in data centers. The point of decentralization isn't physical distribution — it's governance: no single company controls it, and no data can change without consensus. That's the real difference from AWS, where one company can delete anything."*
> **평가 답변 (KR):** "노드도 데이터센터에서 돌아가는 건 맞아요. 핵심은 한 회사가 좌우 못 하고, 합의 없이 데이터를 못 바꾼다는 거버넌스 차이입니다."

### 9.6 합의(Consensus)는 어떻게 이루어지나 — BSC의 PoSA

**왜 필요?** 중앙 관리자가 없으니, "다음 블록을 누가 쓸 권한을 갖느냐"를 규칙으로 정해야 함.

**주요 방식 3가지:**
| 방식 | 체인 | 설명 |
|------|------|------|
| PoW (작업증명) | 비트코인 | 수학 퍼즐 먼저 푼 사람이 블록 생성 |
| PoS (지분증명) | 이더리움 | 32 ETH 스테이킹한 사람 중 무작위 추첨 |
| **PoSA (지분증명+권한)** | **BSC** | **인증된 21명 validator가 3초마다 돌아가며 생성** |

**우리 mintNFT가 합의되는 과정 (시간순):**
```
t=0    트랜잭션 생성 + 서명 → BSC RPC 전송
t=0.1  멤풀(대기실) 진입, 노드들에 전파
t=1~3  차례인 validator가 멤풀에서 골라 블록에 담음
t=3~6  다른 validator 20명이 검증:
         - 서명이 진짜 owner 것인가?
         - onlyOwner 통과? 가스비 충분?
t=6    다수(2/3+) 동의 → 블록 영구 확정 → "토큰 #0 주인=keokim" 영구 기록
```

- 위변조 불가 이유: 거짓 블록은 다른 validator가 검증 시 들통. 11명 이상 매수해야 점령 가능(사실상 불가).
- 삭제 불가 이유: 블록은 이전 블록 해시를 포함 → 과거를 바꾸려면 이후 모든 블록을 다시 만들어야 함.

> **Say (EN):** *"BSC uses Proof of Staked Authority. 21 validators take turns producing a block every 3 seconds, the others verify it, and once a supermajority agrees, the block is final. My mint transaction was verified by them — they checked I'm the owner and have enough gas — before it was permanently recorded."*

### 9.7 비트코인 > 이더리움 > BSC 탈중앙화 차이

| | 비트코인 | 이더리움 | BSC |
|---|---|---|---|
| 합의 주체 수 | 수많은 채굴자 | 약 100만 validator | **약 21~41명** |
| 진입 장벽 | 채굴기만 있으면 | 32 ETH면 누구나(무허가) | **Binance 인증 필요(허가제)** |
| 거버넌스 | 누구도 단독 결정 불가 | 커뮤니티 합의 | Binance 영향력 큼 |

→ BSC가 덜 탈중앙인 이유: ① validator가 21명뿐, ② 그 21명이 Binance 인증을 받아야 함("Authority"의 의미), ③ Binance가 사실상 좌우. 대신 빠르고 가스비 쌈.

> **Say (EN):** *"BSC is great on speed and cost, but it has few validators and they're permissioned, so decentralization goes Bitcoin, then Ethereum, then BSC. I chose it because the subject is a BNB Chain partnership, and the same code runs on Ethereum unchanged since it's EVM-compatible."*
> **평가 답변 (KR):** "BSC는 속도·비용은 우수하지만 validator가 적고 허가제라 탈중앙화 정도는 비트코인 ≫ 이더리움 > BSC 순입니다. 과제가 BNB Chain 파트너십이라 골랐고, 같은 코드를 이더리움에도 그대로 올릴 수 있어요."

### 9.8 가스비 원리 — 왜 온체인 NFT가 싸게 만들어졌나

**가스비는 "블록체인에 데이터를 쓸 때" 발생.** 읽기(view)는 무료.

| 행위 | 가스비 |
|------|--------|
| 데이터 저장(쓰기), 컨트랙트 배포 | 비쌈 |
| 데이터 읽기 (`view` 함수: ownerOf, tokenURI) | **무료** |

**온체인 컨트랙트의 핵심 트릭:** SVG 이미지(8KB)를 통째로 저장하지 않고, **"토큰 ID로 그림을 생성하는 공식"(1.5KB)만** 저장.
```solidity
uint256 hue1 = (tokenId * 137 + 42) % 360;  // 그림 데이터가 아니라 "공식"을 저장
```
- 100만 개 NFT를 발행해도 컨트랙트 크기는 그대로(공식은 한 번만 저장).
- `tokenURI`는 `view` 함수라 호출(그림 보기)은 가스 무료.
- 의외로 mint 자체는 온체인이 더 쌈(IPFS 문자열 저장 안 하니까). 배포만 메인보다 2~3배 비쌈.

> **Say (EN):** *"I store the formula that generates the image, not the image data itself — stored once, computed on each call. So no matter how many NFTs are minted, the contract size stays the same, and reading is free because tokenURI is a view function."*
> **평가 답변 (KR):** "이미지 데이터가 아니라 이미지를 만드는 공식만 저장해서, 한 번만 저장하고 매번 계산합니다. 그래서 NFT가 아무리 많아도 컨트랙트 크기는 그대로고, 조회는 view 함수라 무료입니다."

### 9.9 온체인 그림은 매번 다른가? — 결정론적 생성

**아니요. 같은 토큰은 영원히 같은 그림, 토큰끼리만 다릅니다.**

```
tokenId=0 → hue1 = (0*137+42)%360 = 42   → 항상 같은 색
tokenId=1 → hue1 = (1*137+42)%360 = 179  → 다른 색
tokenId=2 → hue1 = (2*137+42)%360 = 316  → 또 다른 색
```

- "즉석 생성"의 의미 = **미리 저장 안 함, 호출 시 공식으로 계산**. 무작위가 아님.
- 블록체인은 **결정론적**이어야 함 — 모든 노드가 같은 결과를 내야 합의 가능. 그래서 Solidity엔 진짜 랜덤 함수가 없음(필요하면 Chainlink VRF 같은 오라클 사용).

> **Say (EN):** *"No — the same token always renders the same image; only different tokens differ. The generation is deterministic: it's computed from the token ID, not random. Blockchains must be deterministic so every node reaches the same result for consensus, which is why Solidity has no true randomness."*

### 9.10 mint 인자: 메인 2개 vs 온체인 1개

| | 메인 컨트랙트 | 온체인 컨트랙트 |
|---|---|---|
| 함수 | `mintNFT(address to, string _tokenURI)` | `mintNFT(address to)` |
| 인자 | **2개** (받는사람 + 메타데이터 IPFS주소) | **1개** (받는사람만) |
| 이미지 주소는? | 메타데이터 JSON **안에** 들어있음 → mint엔 안 넘김 | 컨트랙트가 알아서 생성 |

→ 메인도 mint엔 **메타데이터 주소 1개만** 넘김. 이미지 주소는 메타데이터 안에 이미 있어서 따로 안 넘김. 그 메타데이터를 따라가면 이미지로 자연스럽게 이어짐.

### 9.11 새 NFT 발행 절차 (메인 5단계 vs 온체인 1단계)

| 작업 | 메인 | 온체인 |
|------|------|--------|
| 1. 이미지 만들기 | ✅ | ❌ (공식이 생성) |
| 2. 이미지 IPFS 업로드 | ✅ | ❌ |
| 3. 메타데이터 작성 | ✅ | ❌ (컨트랙트가 생성) |
| 4. 메타데이터 IPFS 업로드 | ✅ | ❌ |
| 5. mint 호출 | ✅ (인자 2개) | ✅ (인자 1개) |

→ mint는 IPFS에 뭘 새로 안 만듦. **이미 올린 메타데이터 주소를 표에 등록할 뿐.** 발행마다 `_nextTokenId`가 0→1→2 자동 증가하며 블록체인에 영구 저장.

### 9.12 .env는 언제 필요한가 + MetaMask와의 차이

`.env`는 **비밀 정보(private key, API 키)를 코드에 안 박으려고** 쓰는 파일. `.gitignore`로 GitHub 차단. 동작 시 `process.env`로 읽음.

| 동작 | `.env` 필요? | 이유 |
|------|-------------|------|
| compile, test | ❌ | 로컬 작업 (test는 in-memory 체인) |
| BscScan read, 웹사이트 띄우기 | ❌ | 외부 조회만 |
| **웹사이트에서 Mint (MetaMask)** | ❌ | **MetaMask가 서명** — 내 .env 무관 |
| 스크립트로 mint/deploy/IPFS 업로드 | ✅ | 스크립트가 직접 서명/인증 |

**핵심:** 트랜잭션을 **스크립트가 서명**하면 `.env`의 PRIVATE_KEY 필요, **MetaMask가 서명**하면 불필요. → 평가 때 웹사이트+BscScan 중심으로 가면 `.env` 거의 안 씀.

### 9.13 deploy.sh를 다시 실행하면 새 주소로 배포되나?

| 상황 | 결과 |
|------|------|
| 내 PC에서 재실행 | ❌ **재배포 안 됨** (기존 주소 재사용) |
| git clone한 깨끗한 환경 | ⭕ **새 주소로 배포됨** |

- Hardhat Ignition은 배포 기록을 `code/ignition/deployments/chain-97/`에 남김(멱등성). 기록이 있으면 재사용.
- 그 기록은 `.gitignore`로 제외 → clone하면 없음 → 새로 배포됨.
- **⚠️ 평가에선 재배포 금지.** 이미 배포된 주소가 README/웹사이트/문서에 박혀 있어서, 재배포하면 주소 불일치로 시연이 꼬임. **BscScan의 기존 기록이 최고의 증거.**

### 9.14 파일이 11만 개인 이유

| 분류 | 개수 | Git에 올라감? |
|------|------|--------------|
| 내가 작성한 핵심 파일 | 약 37개 | ✅ |
| node_modules (자동 설치 라이브러리) | 약 116,000개 | ❌ (.gitignore) |
| artifacts/dist/cache (빌드 생성물) | 약 100개 | ❌ |

→ 99.8%가 `npm install`로 깔린 외부 라이브러리. React/Hardhat이 의존하는 라이브러리가 줄줄이 딸려와 11만 개. **GitHub엔 내가 만든 37개만 올라감.** `npm install` 한 번이면 복원.

---

## 10. Line-by-Line Code Review / 코드 라인별 리뷰 대비

> When the evaluator points at a line and asks "what is this?", read the **Say (EN)** column out loud. KR is for your own recall. / 평가관이 줄을 짚으며 물으면 Say(EN)을 읽으세요. KR은 본인 이해용.

### 10.1 TokenizeArt42.sol

| Code | Say (EN) | KR |
|------|----------|----|
| `// SPDX-License-Identifier: MIT` | "Open-source MIT license — a Solidity best practice." | 오픈소스 MIT 라이선스 |
| `pragma solidity ^0.8.28;` | "The compiler version. 0.8 and above have built-in overflow checks." | 0.8+는 오버플로우 검사 내장 |
| `import "@openzeppelin/..."` | "Audited, battle-tested NFT building blocks — safer than writing them myself." | 검증된 표준 라이브러리 |
| `is ERC721URIStorage, Ownable` | "Inheritance. ERC721URIStorage is an NFT with per-token URIs; Ownable gives owner-only access." | 상속: NFT+URI / 접근제어 |
| `uint256 private _nextTokenId;` | "A counter for the next token ID. It's private, exposed through `totalMinted()`." | 토큰 번호 카운터 |
| `constructor() ERC721("42 TokenizeArt by keokim","T42K") Ownable(msg.sender)` | "Runs once at deploy. Sets the collection name and symbol, and makes the deployer the owner." | 배포 시 1회: 이름/심볼/owner 설정 |
| `external` | "Callable only from outside — saves gas since it's not called internally." | 외부 전용, 가스 절약 |
| `onlyOwner` | "Only the owner can call this. It stops anyone from minting — the security requirement." | owner만 민팅 (보안) |
| `string calldata _tokenURI` | "The metadata's IPFS address. `calldata` is read-only, cheaper than memory." | calldata가 더 쌈 |
| `tokenId = _nextTokenId; _nextTokenId++;` | "Use the current ID, then increment — state change first, the checks-effects-interactions pattern." | CEI 패턴 |
| `_safeMint(to, tokenId)` | "Mints the NFT. If the receiver is a contract, it checks the receiver can handle NFTs, preventing locked tokens." | 토큰 분실 방지 |
| `_setTokenURI(tokenId, _tokenURI)` | "Links this token to its metadata address." | 토큰-메타데이터 연결 |
| `function totalMinted() external view` | "Returns the total minted. It's a view function, so reading is free." | view라 무료 |

### 10.2 TokenizeArt42OnChain.sol

| Code | Say (EN) | KR |
|------|----------|----|
| `_requireOwned(tokenId)` | "Reverts if the token doesn't exist — a safety guard." | 비존재 토큰 revert |
| `_generateSVG(tokenId)` | "Generates the SVG on the fly from the token ID — nothing is pre-stored." | 즉석 생성 |
| `(tokenId * 137 + 42) % 360` | "The per-token color formula. 137 is prime so hues spread out, and +42 gives token zero a color too." | 토큰별 색상 공식 |
| `Base64.encode(bytes(svg))` | "Base64-encodes the SVG so it can be a data URI." | data URI용 인코딩 |
| `"data:application/json;base64,"` | "Metadata returned by the contract itself, no external server — proof it's fully on-chain." | 완전 온체인 증거 |
| `_svgHeader/_svgShapes/_svgText` split | "Split to avoid the stack-too-deep error and for readability — same reason I enabled viaIR." | stack-too-deep 회피 |

### 10.3 hardhat.config.ts

| Setting | Say (EN) | KR |
|---------|----------|----|
| `version: "0.8.28"` | "The Solidity compiler version." | 컴파일러 버전 |
| `viaIR: true` | "Required to compile the on-chain contract's long string concatenations — otherwise stack-too-deep." | 긴 문자열 컴파일용 |
| `optimizer: { runs: 200 }` | "Gas optimization; 200 balances deploy cost against runtime cost." | 가스 최적화 |
| `networks.bscTestnet` | "Registers BSC Testnet so I can target it with --network bscTestnet." | BSC Testnet 등록 |
| `configVariable("PRIVATE_KEY")` | "Reads the secret from .env so no keys are hard-coded." | .env에서 키 읽음 |

### 10.4 테스트 15개 (코드 검증)

```bash
cd code && npx hardhat test   # 15개 전부 통과
```

| 그룹 | 검증 |
|------|------|
| 메인 1~8 | name/symbol, owner=deployer, 초기 0, 민팅+ownerOf+tokenURI, 타 주소 민팅, **비-owner 민팅 revert(보안)**, ID 증가, 비존재 토큰 revert |
| 온체인 9~15 | name/symbol, owner, 민팅, `data:` URI 시작, **JSON 디코딩 후 필드 검증**, **SVG에 `42`/`keokim` 포함 검증**, 비존재 토큰 revert |

---

## 11. Self-Check & Safety / 자가 점검과 안전 수칙

### 11.1 평가 직전 체크리스트

- [ ] **위 5가지 비유(9.0)** 입으로 한 번씩 말해보기
- [ ] 브라우저 탭 미리 열기: IPFS 이미지/메타데이터, 컨트랙트 2개, Mint TX, localhost
- [ ] MetaMask가 **BSC Testnet** 연결 + 배포자 지갑 + **tBNB 잔액** 확인
- [ ] `cd code && npx hardhat test` → 15개 통과 확인
- [ ] `cd website && npm run dev` 정상 동작 확인
- [ ] (스크립트 mint 시연 시) `code/.env`에 PRIVATE_KEY, PINATA 키 확인

### 11.2 절대 하지 말 것

- ❌ **평가 중 재배포(deploy)** — 새 주소 생성되어 모든 문서와 불일치. 9.13 참고.
- ❌ **`.env`를 git에 커밋** — private key 노출 = 자산 도난. (현재 .gitignore로 막혀 있음, 확인됨)
- ❌ 당황해서 "모릅니다"로 끝내기 — "정확힌 모르지만 BscScan에서 보여드릴게요"로 받기.

### 11.3 위기 대응

| 상황 | 대응 |
|------|------|
| MetaMask가 BSC Testnet 인식 못 함 | Chainlist 또는 수동 추가 (Chain ID 97, RPC `https://data-seed-prebsc-1-s1.bnbchain.org:8545`) |
| tBNB 부족 | `https://www.bnbchain.org/en/testnet-faucet`에서 무료 충전 |
| Pinata 게이트웨이 느림 | 대체: `https://ipfs.io/ipfs/<CID>` |
| 웹사이트 안 뜸 | BscScan Read/Write Contract로 모든 시연 가능 (백업) |
| 모든 게 실패 | **이미 배포·민팅된 BscScan 기록이 진짜 증거.** "이미 mint된 #0이 영구히 살아있습니다." |

### 11.4 만능 답변 3종 (universal fallback lines, in English)

1. **Concept question / 개념 질문**: *"The simplest way to put it is, it's like ___."* (use the analogies in 9.0)
2. **Don't know / 모르는 질문**: *"I'm not 100% sure of the internal details — that part is handled by the audited OpenZeppelin library — but in my code I use it like this."*
3. **Asked to prove it / 검증 요청**: *"Let me show you directly on BscScan."* → click

### 11.5 영어 시연 팁 (delivery tips)

- 명령을 치기 **전에** 한 문장으로 무엇을 할지 먼저 말하기: *"Now I'll show you ..."*
- 결과가 나오면 한 문장으로 해석: *"As you can see, this returns ... which means ..."*
- 막히면 천천히: *"Let me show you on BscScan"* 하고 클릭으로 증명. 침묵보다 행동.
- 핵심 동사: **deploy**(배포), **mint**(발행), **verify/prove ownership**(소유권 증명), **store on IPFS / on-chain**(저장).

---

**이 문서를 평가 전에 한번 읽고, 시연 순서를 따라하면 필수+보너스 모든 항목을 커버할 수 있습니다.**
