import { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { TOKEN_ART_ONCHAIN_ADDRESS, TOKEN_ART_ONCHAIN_ABI } from "../config/contract";

export function OwnerCheck() {
  const [input, setInput] = useState("");
  const [queryId, setQueryId] = useState<bigint | undefined>();

  useEffect(() => {
    const id = parseInt(input, 10);
    if (!isNaN(id) && id >= 0) {
      setQueryId(BigInt(id));
    } else {
      setQueryId(undefined);
    }
  }, [input]);

  const { data: owner, isLoading, error } = useReadContract({
    address: TOKEN_ART_ONCHAIN_ADDRESS,
    abi: TOKEN_ART_ONCHAIN_ABI,
    functionName: "ownerOf",
    args: queryId !== undefined ? [queryId] : undefined,
    query: { enabled: queryId !== undefined },
  });

  return (
    <div>
      <div className="input-group">
        <span className="input-group__prefix">#</span>
        <input
          className="input-group__field"
          type="number"
          min="0"
          placeholder="Enter token ID to check owner"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      {isLoading && queryId !== undefined && (
        <div className="loading">
          <span className="loading__spinner" />
          Checking...
        </div>
      )}

      {error && queryId !== undefined && (
        <div className="owner-result owner-result--not-found">
          Token #{queryId.toString()} does not exist
        </div>
      )}

      {owner && queryId !== undefined && (
        <div className="owner-result owner-result--found">
          <div className="owner-result__label">Owner of #{queryId.toString()}</div>
          {owner as string}
        </div>
      )}
    </div>
  );
}
