import hre, { ethers } from "hardhat";
DEPLOYED_CONTRACT_ADDRESS="0x8e27e27E95c05F6EF855BE81a04c7fdd0d488f77";

async function main() {
  await hre.run("verify:verify", {
    address: DEPLOYED_CONTRACT_ADDRESS,
    constructorArguments: [2712*10**18],
    contract: "contracts/SLVToken.sol:SLVToken",
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
