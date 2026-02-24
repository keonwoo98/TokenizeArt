import { useReadContract } from "wagmi";
import { TOKEN_ART_ONCHAIN_ADDRESS, TOKEN_ART_ONCHAIN_ABI } from "../config/contract";

export function NftDisplay({ tokenId }: { tokenId: bigint }) {
  const { data: tokenURI, isLoading, error } = useReadContract({
    address: TOKEN_ART_ONCHAIN_ADDRESS,
    abi: TOKEN_ART_ONCHAIN_ABI,
    functionName: "tokenURI",
    args: [tokenId],
  });

  const { data: owner } = useReadContract({
    address: TOKEN_ART_ONCHAIN_ADDRESS,
    abi: TOKEN_ART_ONCHAIN_ABI,
    functionName: "ownerOf",
    args: [tokenId],
  });

  if (isLoading) return <p>Loading NFT...</p>;
  if (error) return <p style={{ color: "#ff4444" }}>Token #{tokenId.toString()} not found</p>;
  if (!tokenURI) return null;

  // Decode on-chain metadata
  let metadata: { name?: string; description?: string; image?: string } = {};
  try {
    const base64 = (tokenURI as string).replace("data:application/json;base64,", "");
    metadata = JSON.parse(atob(base64));
  } catch {
    return <p>Failed to decode metadata</p>;
  }

  return (
    <div
      style={{
        border: "1px solid #333",
        borderRadius: "16px",
        padding: "20px",
        maxWidth: "420px",
        margin: "20px auto",
        background: "#111",
      }}
    >
      {metadata.image && (
        <img
          src={metadata.image}
          alt={metadata.name || "NFT"}
          style={{ width: "100%", borderRadius: "12px" }}
        />
      )}
      <h3 style={{ color: "#fff", marginTop: "12px" }}>{metadata.name}</h3>
      <p style={{ color: "#888", fontSize: "14px" }}>{metadata.description}</p>
      {owner && (
        <p style={{ color: "#666", fontSize: "12px", wordBreak: "break-all" }}>
          Owner: {owner as string}
        </p>
      )}
    </div>
  );
}
