import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY;

if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
  console.error("Missing PINATA_API_KEY or PINATA_SECRET_KEY in environment");
  process.exit(1);
}

async function uploadFile(filePath: string, name: string): Promise<string> {
  const fileContent = fs.readFileSync(filePath);
  const blob = new Blob([fileContent]);

  const formData = new FormData();
  formData.append("file", blob, path.basename(filePath));
  formData.append(
    "pinataMetadata",
    JSON.stringify({ name })
  );

  const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      pinata_api_key: PINATA_API_KEY!,
      pinata_secret_api_key: PINATA_SECRET_KEY!,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Pinata upload failed: ${response.status} ${await response.text()}`);
  }

  const result = (await response.json()) as { IpfsHash: string };
  return result.IpfsHash;
}

async function uploadJSON(json: object, name: string): Promise<string> {
  const response = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      pinata_api_key: PINATA_API_KEY!,
      pinata_secret_api_key: PINATA_SECRET_KEY!,
    },
    body: JSON.stringify({
      pinataContent: json,
      pinataMetadata: { name },
    }),
  });

  if (!response.ok) {
    throw new Error(`Pinata JSON upload failed: ${response.status} ${await response.text()}`);
  }

  const result = (await response.json()) as { IpfsHash: string };
  return result.IpfsHash;
}

async function main() {
  console.log("Uploading image to IPFS via Pinata...");

  // 1. Upload SVG image
  const imagePath = path.resolve(__dirname, "../image/tokenizeart42.svg");
  const imageCID = await uploadFile(imagePath, "TokenizeArt42-Image");
  console.log(`Image uploaded! CID: ${imageCID}`);
  console.log(`Image URL: https://gateway.pinata.cloud/ipfs/${imageCID}`);

  // 2. Read and update metadata with actual image CID
  const metadataPath = path.resolve(__dirname, "../metadata/0.json");
  const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8"));
  metadata.image = `ipfs://${imageCID}`;

  // 3. Upload metadata JSON
  const metadataCID = await uploadJSON(metadata, "TokenizeArt42-Metadata");
  console.log(`\nMetadata uploaded! CID: ${metadataCID}`);
  console.log(`Metadata URL: https://gateway.pinata.cloud/ipfs/${metadataCID}`);
  console.log(`Token URI: ipfs://${metadataCID}`);

  // 4. Save updated metadata locally
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2) + "\n");

  // 5. Save CIDs for reference
  const cidRecord = {
    imageCID,
    metadataCID,
    imageURI: `ipfs://${imageCID}`,
    tokenURI: `ipfs://${metadataCID}`,
    imageGatewayURL: `https://gateway.pinata.cloud/ipfs/${imageCID}`,
    metadataGatewayURL: `https://gateway.pinata.cloud/ipfs/${metadataCID}`,
    uploadedAt: new Date().toISOString(),
  };

  const cidPath = path.resolve(__dirname, "../ipfs-cids.json");
  fs.writeFileSync(cidPath, JSON.stringify(cidRecord, null, 2) + "\n");
  console.log(`\nCID record saved to: ${cidPath}`);
}

main().catch((error) => {
  console.error("Upload failed:", error);
  process.exit(1);
});
