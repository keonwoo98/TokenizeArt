// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title TokenizeArt42
/// @notice BEP-721 NFT contract for the 42 TokenizeArt project on BSC
/// @dev Uses ERC721URIStorage for IPFS-based metadata and Ownable for access control
contract TokenizeArt42 is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    constructor() ERC721("42 TokenizeArt by keokim", "T42K") Ownable(msg.sender) {}

    /// @notice Mint a new NFT with the given token URI
    /// @param to The address that will receive the minted NFT
    /// @param _tokenURI The IPFS URI pointing to the token metadata
    /// @return tokenId The ID of the newly minted token
    function mintNFT(address to, string calldata _tokenURI) external onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        return tokenId;
    }

    /// @notice Returns the total number of NFTs minted
    /// @return The total minted count
    function totalMinted() external view returns (uint256) {
        return _nextTokenId;
    }
}
