import hre, { ethers } from "hardhat";

async function main() {
  const SLVToken = await ethers.getContractFactory("SLVToken");
  // initialSupply = 2,717 SLVs
  const slvtoken = await SLVToken.deploy(2712 * 10 ** 18);
  await slvtoken.deployed();
  console.log("SLVToken deployed to:", slvtoken.address);
  // verifiy on etherscan
  await hre.run("verify:verify", {
    address: slvtoken.address,
    constructorArguments: [2717],
    contract: "contracts/SLVToken.sol:SLVToken",
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
