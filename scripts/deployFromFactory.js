const { ethers } = require("hardhat");

async function main() {
  /// deploying the implementation contract
  const testImplementation = await ethers.deployContract("testImplementation");
  await testImplementation.waitForDeployment();
  console.log("testImplementation deployed to:", testImplementation.target);

  /// deploying the beacon contract
  const testBeacon = await ethers.deployContract("testBeacon", [
    testImplementation.target,
  ]);
  await testBeacon.waitForDeployment();
  console.log("testBeacon deployed to:", testBeacon.target);

  /// deploying the factory contract
  const testFactory = await ethers.deployContract("testFactory", [
    testBeacon.target,
  ]);
  await testFactory.waitForDeployment();
  console.log("testFactory deployed to:", testFactory.target);

  /// deploying a proxy contract using the factory
  await testFactory.deployProxy();
  const testProxyAddress = await testFactory.deployedProxies(0);
  const proxy = await ethers.getContractAt(
    "testImplementation",
    testProxyAddress
  );

  /// checking the proxy is deployed by checking name
  const proxyName = await proxy.name();
  console.log("proxyName:", proxyName);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
