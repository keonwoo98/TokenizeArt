// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/// @title TokenizeArt42OnChain
/// @notice Fully on-chain BEP-721 NFT with SVG art stored in the contract
/// @dev Generates SVG and metadata entirely on-chain using Base64 encoding
contract TokenizeArt42OnChain is ERC721, Ownable {
    using Strings for uint256;

    uint256 private _nextTokenId;

    constructor() ERC721("42 TokenizeArt OnChain by keokim", "T42O") Ownable(msg.sender) {}

    /// @notice Mint a new on-chain NFT
    /// @param to The address that will receive the minted NFT
    /// @return tokenId The ID of the newly minted token
    function mintNFT(address to) external onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;
        _safeMint(to, tokenId);
        return tokenId;
    }

    /// @notice Returns the total number of NFTs minted
    function totalMinted() external view returns (uint256) {
        return _nextTokenId;
    }

    /// @notice Returns fully on-chain token URI with SVG image
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);

        string memory svg = _generateSVG(tokenId);
        string memory imageURI = string.concat(
            "data:image/svg+xml;base64,",
            Base64.encode(bytes(svg))
        );

        return string.concat(
            "data:application/json;base64,",
            Base64.encode(bytes(_buildJSON(tokenId, imageURI)))
        );
    }

    function _buildJSON(uint256 tokenId, string memory imageURI) internal pure returns (string memory) {
        return string.concat(
            '{"name":"42 TokenizeArt OnChain #', tokenId.toString(),
            '","description":"A fully on-chain NFT for the 42 TokenizeArt project.",',
            '"artist":"keokim","image":"', imageURI,
            '","attributes":', _buildAttributes(tokenId), '}'
        );
    }

    function _buildAttributes(uint256 tokenId) internal pure returns (string memory) {
        return string.concat(
            '[{"trait_type":"School","value":"42"},',
            '{"trait_type":"Artist","value":"keokim"},',
            '{"trait_type":"Type","value":"On-Chain SVG"},',
            '{"trait_type":"Token ID","value":"', tokenId.toString(), '"}]'
        );
    }

    function _generateSVG(uint256 tokenId) internal pure returns (string memory) {
        uint256 hue1 = (tokenId * 137 + 42) % 360;
        uint256 hue2 = (hue1 + 120) % 360;
        uint256 hue3 = (hue1 + 240) % 360;

        return string.concat(
            _svgHeader(hue1, hue2),
            _svgShapes(hue1, hue2, hue3),
            _svgText(hue3, tokenId),
            '</svg>'
        );
    }

    function _svgHeader(uint256 hue1, uint256 hue2) internal pure returns (string memory) {
        return string.concat(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">',
            '<defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">',
            '<stop offset="0%" style="stop-color:hsl(', hue1.toString(), ',70%,15%)"/>',
            '<stop offset="100%" style="stop-color:hsl(', hue2.toString(), ',70%,25%)"/>',
            '</linearGradient></defs>',
            '<rect width="400" height="400" fill="url(#bg)"/>'
        );
    }

    function _svgShapes(uint256 hue1, uint256 hue2, uint256 hue3) internal pure returns (string memory) {
        return string.concat(
            '<circle cx="200" cy="200" r="150" fill="none" stroke="hsl(',
            hue3.toString(), ',80%,60%)" stroke-width="2" opacity="0.3"/>',
            '<circle cx="200" cy="200" r="120" fill="none" stroke="hsl(',
            hue1.toString(), ',80%,60%)" stroke-width="1" opacity="0.2"/>',
            '<polygon points="200,60 340,260 60,260" fill="none" stroke="hsl(',
            hue2.toString(), ',70%,50%)" stroke-width="1.5" opacity="0.25"/>'
        );
    }

    function _svgText(uint256 hue3, uint256 tokenId) internal pure returns (string memory) {
        return string.concat(
            '<text x="200" y="220" font-family="monospace" font-size="120" font-weight="bold" ',
            'fill="white" text-anchor="middle" dominant-baseline="middle" opacity="0.95">42</text>',
            '<text x="200" y="310" font-family="sans-serif" font-size="16" fill="hsl(',
            hue3.toString(), ',80%,70%)" text-anchor="middle">TokenizeArt by keokim</text>',
            '<text x="200" y="340" font-family="monospace" font-size="12" ',
            'fill="white" text-anchor="middle" opacity="0.5">#', tokenId.toString(), '</text>'
        );
    }
}
