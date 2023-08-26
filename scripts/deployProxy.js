const { ethers, upgrades } = require("hardhat");

async function main() {
  const TestImplementation = await ethers.getContractFactory(
    "testImplementation"
  );

  /// deploys testImplementation and a testImplementation proxy
  const testImplementation = await upgrades.deployProxy(TestImplementation);
  await testImplementation.waitForDeployment();

  console.log(
    "testImplementation proxy deployed to:",
    testImplementation.target
  );
  console.log(
    "testImplementation deployed to:",
    await upgrades.erc1967.getImplementationAddress(testImplementation.target)
  );

  /// new testImplemenation to upgrade to
  const TestImplementationV2 = await ethers.getContractFactory(
    "testImplementationV2"
  );

  /// upgrading the testImplementation proxy to testImplementationV2
  const testImplementationV2 = await upgrades.upgradeProxy(
    testImplementation.target,
    TestImplementationV2
  );
  await testImplementationV2.waitForDeployment();

  /// checking the new implementation for upgraded functionality
  const version = await testImplementationV2.checkVersion();
  console.log("version:", version);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
