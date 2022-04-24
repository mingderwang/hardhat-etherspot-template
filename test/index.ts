import { expect } from "chai";
import { ethers } from "hardhat";

describe("MingCollectible", function () {
  it("should return an NFT token with a correct name and symbol", async function () {
    const MingCL = await ethers.getContractFactory("MingCollectible");
    const mcl = await MingCL.deploy();
    console.log("MingCollectible deployed to:", mcl.address);

    expect(await mcl.name()).to.equal("MingCollectible");
    expect(await mcl.symbol()).to.equal("MCL");

    // wait until the transaction is mined
    //await setGreetingTx.wait();
  });
});
