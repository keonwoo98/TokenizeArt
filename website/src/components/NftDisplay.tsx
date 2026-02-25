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

  if (isLoading) {
    return (
      <div className="loading">
        <span className="loading__spinner" />
        Loading NFT...
      </div>
    );
  }

  if (error) {
    return (
      <div className="owner-result owner-result--not-found" style={{ marginTop: 24 }}>
        Token #{tokenId.toString()} does not exist
      </div>
    );
  }

  if (!tokenURI) return null;

  let metadata: { name?: string; description?: string; image?: string } = {};
  try {
    const base64 = (tokenURI as string).replace("data:application/json;base64,", "");
    metadata = JSON.parse(atob(base64));
  } catch {
    return (
      <div className="owner-result owner-result--not-found" style={{ marginTop: 24 }}>
        Failed to decode metadata
      </div>
    );
  }

  return (
    <div className="nft-card">
      {metadata.image && (
        <img
          className="nft-card__image"
          src={metadata.image}
          alt={metadata.name || "NFT"}
        />
      )}
      <div className="nft-card__body">
        <h3 className="nft-card__name">{metadata.name}</h3>
        <p className="nft-card__desc">{metadata.description}</p>
        {owner && (
          <div className="nft-card__owner">
            <span className="nft-card__owner-label">Owner</span>
            <span className="nft-card__owner-addr">{owner as string}</span>
          </div>
        )}
      </div>
    </div>
  );
}
