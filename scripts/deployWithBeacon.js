const { ethers, upgrades } = require("hardhat");

async function main() {
  const TestImplementation = await ethers.getContractFactory(
    "testImplementation"
  );

  /// deploys beacon that holds the implementation address
  const beacon = await upgrades.deployBeacon(TestImplementation);
  await beacon.waitForDeployment();
  console.log("beacon deployed to:", await beacon.getAddress());

  /// returning the implementation address from the beacon
  const implementationAddress = await beacon.implementation();
  console.log("implementationAddress:", implementationAddress);

  /// deploying a beacon proxy that points to the beacon
  const implementation = await upgrades.deployBeaconProxy(
    beacon,
    TestImplementation
  );
  await implementation.waitForDeployment();

  /// test beacon proxy is deployed by checking name
  const name = await implementation.name();

  console.log("name:", name);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
