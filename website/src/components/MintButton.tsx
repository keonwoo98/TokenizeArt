import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import { TOKEN_ART_ONCHAIN_ADDRESS, TOKEN_ART_ONCHAIN_ABI } from "../config/contract";

export function MintButton() {
  const { address, isConnected } = useAccount();
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  function handleMint() {
    if (!address) return;
    writeContract({
      address: TOKEN_ART_ONCHAIN_ADDRESS,
      abi: TOKEN_ART_ONCHAIN_ABI,
      functionName: "mintNFT",
      args: [address],
    });
  }

  if (!isConnected) {
    return <p style={{ color: "#888" }}>Connect your wallet to mint</p>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <button
        onClick={handleMint}
        disabled={isPending || isConfirming}
        style={{
          padding: "16px 48px",
          fontSize: "18px",
          fontWeight: "bold",
          background: isPending || isConfirming
            ? "#555"
            : "linear-gradient(135deg, #00d4ff, #7b2ff7)",
          color: "white",
          border: "none",
          borderRadius: "12px",
          cursor: isPending || isConfirming ? "not-allowed" : "pointer",
          transition: "opacity 0.2s",
        }}
      >
        {isPending ? "Confirm in Wallet..." : isConfirming ? "Minting..." : "Mint On-Chain NFT"}
      </button>

      {isSuccess && hash && (
        <p style={{ color: "#00d4ff", marginTop: "16px" }}>
          Minted!{" "}
          <a
            href={`https://testnet.bscscan.com/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#7b2ff7" }}
          >
            View on BscScan
          </a>
        </p>
      )}

      {error && (
        <p style={{ color: "#ff4444", marginTop: "16px", fontSize: "14px" }}>
          Error: {error.message.slice(0, 100)}
        </p>
      )}
    </div>
  );
}
