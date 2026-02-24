import { useState } from "react";
import { useReadContract } from "wagmi";
import { ConnectWallet } from "./components/ConnectWallet";
import { MintButton } from "./components/MintButton";
import { NftDisplay } from "./components/NftDisplay";
import { OwnerCheck } from "./components/OwnerCheck";
import { TOKEN_ART_ONCHAIN_ADDRESS, TOKEN_ART_ONCHAIN_ABI } from "./config/contract";

export default function App() {
  const [viewTokenId, setViewTokenId] = useState("0");

  const { data: totalMinted } = useReadContract({
    address: TOKEN_ART_ONCHAIN_ADDRESS,
    abi: TOKEN_ART_ONCHAIN_ABI,
    functionName: "totalMinted",
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a2e",
        color: "#ffffff",
        fontFamily: "'Helvetica Neue', sans-serif",
      }}
    >
      <ConnectWallet />

      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "40px 20px" }}>
        <header style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1
            style={{
              fontSize: "48px",
              fontFamily: "monospace",
              background: "linear-gradient(135deg, #00d4ff, #7b2ff7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "8px",
            }}
          >
            42
          </h1>
          <h2 style={{ fontSize: "24px", fontWeight: 300, color: "#ccc" }}>
            TokenizeArt
          </h2>
          <p style={{ color: "#888", marginTop: "8px" }}>
            On-Chain NFT Minting on BSC Testnet
          </p>
          {totalMinted !== undefined && (
            <p style={{ color: "#00d4ff", fontSize: "14px", marginTop: "4px" }}>
              {totalMinted.toString()} NFTs minted
            </p>
          )}
        </header>

        <section style={{ marginBottom: "48px" }}>
          <MintButton />
        </section>

        <section style={{ marginBottom: "48px" }}>
          <h3 style={{ color: "#fff", textAlign: "center" }}>View NFT</h3>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "12px" }}>
            <input
              type="number"
              min="0"
              placeholder="Token ID"
              value={viewTokenId}
              onChange={(e) => setViewTokenId(e.target.value)}
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
          </div>
          {viewTokenId && !isNaN(parseInt(viewTokenId)) && (
            <NftDisplay tokenId={BigInt(viewTokenId)} />
          )}
        </section>

        <section>
          <OwnerCheck />
        </section>

        <footer style={{ textAlign: "center", marginTop: "64px", color: "#555", fontSize: "12px" }}>
          <p>TokenizeArt42 by keokim | 42 School | BSC Testnet</p>
        </footer>
      </div>
    </div>
  );
}
