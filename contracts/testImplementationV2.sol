// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

contract testImplementationV2 is ERC721Upgradeable {
    bool public iAmInitialized;

    function initialize() public initializer {
        __ERC721_init("testImplementation", "TESTImplementation");
        iAmInitialized = true;
    }

    function mint(uint256 tokenId) external {
        _mint(msg.sender, tokenId);
    }

    function checkVersion() external pure returns (string memory) {
        return "v2";
    }
}
