import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { createPublicClient, createWalletClient, http, type Address } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { bscTestnet } from "viem/chains";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load contract ABI and address
const deployedPath = path.resolve(__dirname, "../../deployment/deployed-address.json");
const artifactPath = path.resolve(
  __dirname,
  "../../code/artifacts/contracts/TokenizeArt42.sol/TokenizeArt42.json"
);

function loadConfig() {
  if (!fs.existsSync(deployedPath)) {
    throw new Error("deployed-address.json not found. Deploy the contract first.");
  }
  if (!fs.existsSync(artifactPath)) {
    throw new Error("Contract artifact not found. Compile the contract first.");
  }

  const deployed = JSON.parse(fs.readFileSync(deployedPath, "utf-8"));
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf-8"));

  return {
    contractAddress: deployed.TokenizeArt42 as Address,
    abi: artifact.abi,
  };
}

async function main() {
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("PRIVATE_KEY not set in environment");
  }

  const { contractAddress, abi } = loadConfig();
  const account = privateKeyToAccount(`0x${privateKey.replace("0x", "")}`);

  const publicClient = createPublicClient({
    chain: bscTestnet,
    transport: http("https://data-seed-prebsc-1-s1.bnbchain.org:8545"),
  });

  const walletClient = createWalletClient({
    account,
    chain: bscTestnet,
    transport: http("https://data-seed-prebsc-1-s1.bnbchain.org:8545"),
  });

  // Load token URI from IPFS CIDs
  const cidsPath = path.resolve(__dirname, "../ipfs-cids.json");
  let tokenURI: string;

  if (fs.existsSync(cidsPath)) {
    const cids = JSON.parse(fs.readFileSync(cidsPath, "utf-8"));
    tokenURI = cids.tokenURI;
    console.log(`Using token URI from IPFS: ${tokenURI}`);
  } else {
    tokenURI = "ipfs://QmPlaceholder";
    console.log("Warning: ipfs-cids.json not found, using placeholder URI");
  }

  console.log(`\nMinting NFT...`);
  console.log(`  Contract: ${contractAddress}`);
  console.log(`  To: ${account.address}`);
  console.log(`  Token URI: ${tokenURI}`);

  const hash = await walletClient.writeContract({
    address: contractAddress,
    abi,
    functionName: "mintNFT",
    args: [account.address, tokenURI],
  });

  console.log(`\nTransaction hash: ${hash}`);
  console.log("Waiting for confirmation...");

  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  console.log(`Transaction confirmed in block: ${receipt.blockNumber}`);

  // Verify ownership
  const totalMinted = await publicClient.readContract({
    address: contractAddress,
    abi,
    functionName: "totalMinted",
  });

  const tokenId = Number(totalMinted) - 1;
  const owner = await publicClient.readContract({
    address: contractAddress,
    abi,
    functionName: "ownerOf",
    args: [BigInt(tokenId)],
  });

  console.log(`\nMint successful!`);
  console.log(`  Token ID: ${tokenId}`);
  console.log(`  Owner: ${owner}`);
  console.log(`  Total minted: ${totalMinted}`);

  // Save mint record
  const mintRecord = {
    tokenId,
    owner,
    tokenURI,
    transactionHash: hash,
    blockNumber: Number(receipt.blockNumber),
    contractAddress,
    network: "BSC Testnet",
    mintedAt: new Date().toISOString(),
  };

  const recordPath = path.resolve(__dirname, "../mint-record.json");
  fs.writeFileSync(recordPath, JSON.stringify(mintRecord, null, 2) + "\n");
  console.log(`\nMint record saved to: ${recordPath}`);
}

main().catch((error) => {
  console.error("Minting failed:", error);
  process.exit(1);
});
