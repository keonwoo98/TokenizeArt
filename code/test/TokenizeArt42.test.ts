import { describe, it } from "node:test";
import assert from "node:assert/strict";
import hre from "hardhat";

const { viem } = await hre.network.connect();

describe("TokenizeArt42", function () {
  it("should set the correct name and symbol", async function () {
    const contract = await viem.deployContract("TokenizeArt42");
    assert.equal(await contract.read.name(), "42 TokenizeArt by keokim");
    assert.equal(await contract.read.symbol(), "T42K");
  });

  it("should set the deployer as owner", async function () {
    const contract = await viem.deployContract("TokenizeArt42");
    const [deployer] = await viem.getWalletClients();
    const owner = await contract.read.owner();
    assert.equal(owner.toLowerCase(), deployer.account.address.toLowerCase());
  });

  it("should start with 0 minted tokens", async function () {
    const contract = await viem.deployContract("TokenizeArt42");
    assert.equal(await contract.read.totalMinted(), 0n);
  });

  it("should allow owner to mint an NFT", async function () {
    const contract = await viem.deployContract("TokenizeArt42");
    const [deployer] = await viem.getWalletClients();
    const tokenURI = "ipfs://QmTest123";

    await contract.write.mintNFT([deployer.account.address, tokenURI]);

    assert.equal(await contract.read.totalMinted(), 1n);
    const nftOwner = await contract.read.ownerOf([0n]);
    assert.equal(nftOwner.toLowerCase(), deployer.account.address.toLowerCase());
    assert.equal(await contract.read.tokenURI([0n]), tokenURI);
  });

  it("should mint to another address", async function () {
    const contract = await viem.deployContract("TokenizeArt42");
    const wallets = await viem.getWalletClients();
    const other = wallets[1];

    await contract.write.mintNFT([other.account.address, "ipfs://QmTest456"]);

    const nftOwner = await contract.read.ownerOf([0n]);
    assert.equal(nftOwner.toLowerCase(), other.account.address.toLowerCase());
  });

  it("should reject minting from non-owner", async function () {
    const contract = await viem.deployContract("TokenizeArt42");
    const wallets = await viem.getWalletClients();
    const other = wallets[1];

    const contractAsOther = await viem.getContractAt(
      "TokenizeArt42",
      contract.address,
      { client: { wallet: other } }
    );

    await assert.rejects(async () => {
      await contractAsOther.write.mintNFT([other.account.address, "ipfs://QmFail"]);
    });
  });

  it("should increment token IDs correctly", async function () {
    const contract = await viem.deployContract("TokenizeArt42");
    const [deployer] = await viem.getWalletClients();

    await contract.write.mintNFT([deployer.account.address, "ipfs://QmFirst"]);
    await contract.write.mintNFT([deployer.account.address, "ipfs://QmSecond"]);
    await contract.write.mintNFT([deployer.account.address, "ipfs://QmThird"]);

    assert.equal(await contract.read.totalMinted(), 3n);
    assert.equal(await contract.read.tokenURI([0n]), "ipfs://QmFirst");
    assert.equal(await contract.read.tokenURI([1n]), "ipfs://QmSecond");
    assert.equal(await contract.read.tokenURI([2n]), "ipfs://QmThird");
  });

  it("should revert tokenURI for non-existent token", async function () {
    const contract = await viem.deployContract("TokenizeArt42");
    await assert.rejects(async () => {
      await contract.read.tokenURI([999n]);
    });
  });
});

describe("TokenizeArt42OnChain", function () {
  it("should set the correct name and symbol", async function () {
    const contract = await viem.deployContract("TokenizeArt42OnChain");
    assert.equal(await contract.read.name(), "42 TokenizeArt OnChain by keokim");
    assert.equal(await contract.read.symbol(), "T42O");
  });

  it("should set the deployer as owner", async function () {
    const contract = await viem.deployContract("TokenizeArt42OnChain");
    const [deployer] = await viem.getWalletClients();
    const owner = await contract.read.owner();
    assert.equal(owner.toLowerCase(), deployer.account.address.toLowerCase());
  });

  it("should mint an on-chain NFT", async function () {
    const contract = await viem.deployContract("TokenizeArt42OnChain");
    const [deployer] = await viem.getWalletClients();

    await contract.write.mintNFT([deployer.account.address]);

    assert.equal(await contract.read.totalMinted(), 1n);
    const nftOwner = await contract.read.ownerOf([0n]);
    assert.equal(nftOwner.toLowerCase(), deployer.account.address.toLowerCase());
  });

  it("should return a valid data URI for tokenURI", async function () {
    const contract = await viem.deployContract("TokenizeArt42OnChain");
    const [deployer] = await viem.getWalletClients();
    await contract.write.mintNFT([deployer.account.address]);

    const uri: string = await contract.read.tokenURI([0n]);
    assert.ok(uri.startsWith("data:application/json;base64,"));
  });

  it("should contain valid JSON metadata when decoded", async function () {
    const contract = await viem.deployContract("TokenizeArt42OnChain");
    const [deployer] = await viem.getWalletClients();
    await contract.write.mintNFT([deployer.account.address]);

    const uri: string = await contract.read.tokenURI([0n]);
    const base64Data = uri.replace("data:application/json;base64,", "");
    const json = JSON.parse(Buffer.from(base64Data, "base64").toString());

    assert.equal(json.name, "42 TokenizeArt OnChain #0");
    assert.ok(json.description.includes("42 TokenizeArt"));
    assert.equal(json.artist, "keokim");
    assert.ok(json.image.startsWith("data:image/svg+xml;base64,"));
    assert.ok(Array.isArray(json.attributes));

    const schoolAttr = json.attributes.find((a: any) => a.trait_type === "School");
    assert.equal(schoolAttr.value, "42");
  });

  it("should contain valid SVG in the image", async function () {
    const contract = await viem.deployContract("TokenizeArt42OnChain");
    const [deployer] = await viem.getWalletClients();
    await contract.write.mintNFT([deployer.account.address]);

    const uri: string = await contract.read.tokenURI([0n]);
    const base64Data = uri.replace("data:application/json;base64,", "");
    const json = JSON.parse(Buffer.from(base64Data, "base64").toString());

    const svgBase64 = json.image.replace("data:image/svg+xml;base64,", "");
    const svg = Buffer.from(svgBase64, "base64").toString();

    assert.ok(svg.includes("<svg"));
    assert.ok(svg.includes("42"));
    assert.ok(svg.includes("keokim"));
  });

  it("should revert tokenURI for non-existent token", async function () {
    const contract = await viem.deployContract("TokenizeArt42OnChain");
    await assert.rejects(async () => {
      await contract.read.tokenURI([999n]);
    });
  });
});
