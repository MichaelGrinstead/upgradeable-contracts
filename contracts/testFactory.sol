// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";
import "./testImplementation.sol";

contract testFactory {
    address[] public deployedProxies;
    address public beaconAddress;

    constructor(address _beaconAddress) {
        beaconAddress = _beaconAddress;
    }

    function deployProxy() external {
        address proxy = address(new BeaconProxy(beaconAddress, ""));
        testImplementation(proxy).initialize();
        deployedProxies.push(proxy);
    }
}
