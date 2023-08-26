// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";

contract testBeacon is UpgradeableBeacon {
    constructor(
        address _implementationAddress
    ) UpgradeableBeacon(_implementationAddress) {}
}
