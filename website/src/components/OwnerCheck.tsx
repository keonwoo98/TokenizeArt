import { useState } from "react";
import { useReadContract } from "wagmi";
import { TOKEN_ART_ONCHAIN_ADDRESS, TOKEN_ART_ONCHAIN_ABI } from "../config/contract";

export function OwnerCheck() {
  const [tokenId, setTokenId] = useState("");
  const [queryId, setQueryId] = useState<bigint | undefined>();

  const { data: owner, isLoading, error } = useReadContract({
    address: TOKEN_ART_ONCHAIN_ADDRESS,
    abi: TOKEN_ART_ONCHAIN_ABI,
    functionName: "ownerOf",
    args: queryId !== undefined ? [queryId] : undefined,
    query: { enabled: queryId !== undefined },
  });

  function handleCheck() {
    const id = parseInt(tokenId, 10);
    if (!isNaN(id) && id >= 0) {
      setQueryId(BigInt(id));
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "32px" }}>
      <h3 style={{ color: "#fff" }}>Check NFT Owner</h3>
      <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "12px" }}>
        <input
          type="number"
          min="0"
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid #444",
            background: "#222",
            color: "#fff",
            fontSize: "16px",
            width: "120px",
          }}
        />
        <button
          onClick={handleCheck}
          style={{
            padding: "10px 24px",
            borderRadius: "8px",
            border: "none",
            background: "#7b2ff7",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Check
        </button>
      </div>

      {isLoading && <p style={{ color: "#888", marginTop: "12px" }}>Checking...</p>}

      {error && queryId !== undefined && (
        <p style={{ color: "#ff4444", marginTop: "12px" }}>
          Token #{queryId.toString()} does not exist
        </p>
      )}

      {owner && (
        <p style={{ color: "#00d4ff", marginTop: "12px", wordBreak: "break-all" }}>
          Owner of #{queryId?.toString()}: {owner as string}
        </p>
      )}
    </div>
  );
}
