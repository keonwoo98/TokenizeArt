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
    return (
      <div className="mint-area">
        <p className="mint-area__prompt">Connect your wallet to mint</p>
      </div>
    );
  }

  const busy = isPending || isConfirming;
  const label = isPending
    ? "Confirm in Wallet..."
    : isConfirming
      ? "Minting..."
      : "Mint NFT";

  return (
    <div className="mint-area">
      <button className="mint-btn" onClick={handleMint} disabled={busy}>
        {busy ? (
          <span className="loading__spinner" />
        ) : (
          <span className="mint-btn__icon">&#9670;</span>
        )}
        {label}
      </button>

      {isSuccess && hash && (
        <div className="mint-result mint-result--success">
          Minted successfully!
          <a
            href={`https://testnet.bscscan.com/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on BscScan &rarr;
          </a>
        </div>
      )}

      {error && (
        <div className="mint-result mint-result--error">
          {error.message.slice(0, 120)}
        </div>
      )}
    </div>
  );
}
