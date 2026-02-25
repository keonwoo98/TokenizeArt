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
    <div className="app">
      {/* Animated background */}
      <div className="scene">
        <div className="scene__orb scene__orb--cyan" />
        <div className="scene__orb scene__orb--violet" />
        <div className="scene__orb scene__orb--gold" />
        <div className="scene__grain" />
      </div>

      <nav className="app__nav">
        <ConnectWallet />
      </nav>

      <main className="app__container">
        <header className="header">
          <div className="header__logo">42</div>
          <h1 className="header__title">TokenizeArt</h1>
          <p className="header__subtitle">On-Chain NFT Minting on BSC Testnet</p>
          {totalMinted !== undefined && (
            <div className="header__stats">
              <span className="header__stats-dot" />
              {totalMinted.toString()} minted
            </div>
          )}
        </header>

        <section className="card">
          <div className="card__label">Mint</div>
          <MintButton />
        </section>

        <section className="card">
          <div className="card__label">Explorer</div>
          <div className="input-group">
            <span className="input-group__prefix">#</span>
            <input
              className="input-group__field"
              type="number"
              min="0"
              placeholder="Enter token ID"
              value={viewTokenId}
              onChange={(e) => setViewTokenId(e.target.value)}
            />
          </div>
          {viewTokenId && !isNaN(parseInt(viewTokenId)) && parseInt(viewTokenId) >= 0 && (
            <NftDisplay tokenId={BigInt(viewTokenId)} />
          )}
        </section>

        <section className="card">
          <div className="card__label">Ownership</div>
          <OwnerCheck />
        </section>

        <footer className="footer">
          <p className="footer__text">TokenizeArt42 by keokim &middot; 42 School &middot; BSC Testnet</p>
          <div className="footer__links">
            <a
              className="footer__link"
              href={`https://testnet.bscscan.com/address/${TOKEN_ART_ONCHAIN_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              BscScan
            </a>
            <a
              className="footer__link"
              href="https://github.com/keonwoo98/TokenizeArt"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
