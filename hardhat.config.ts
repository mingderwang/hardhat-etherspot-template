import * as dotenv from "dotenv";

import {
  randomPrivateKey,
  NetworkNames,
  EnvNames,
  MetaMaskWalletProvider,
} from "etherspot";

import {
  ContractNames,
  getContractAbi,
  getContractAddress,
  getContractByteCode,
} from "@etherspot/contracts";

import "xdeployer";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@muzamint/hardhat-etherspot";

dotenv.config();
const defaultNetwork = "hardhat";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("mchain", "multi-chain tests", async (_, { Sdk }) => {
  console.log("ContractNames", ContractNames);
  console.log(
    "PersonalAccountRegistry mainnet address:",
    getContractAddress(ContractNames.PersonalAccountRegistry)
  );
  console.log(
    "PersonalAccountRegistry etherspot address:",
    getContractAddress(ContractNames.PersonalAccountRegistry, "4386")
  );
});

// require import "@muzamint/hardhat-etherspot";
//  window is not defined (only for browser app)
task("meta", "Run all etherspot transaction tests", async (_, { Sdk }) => {
  if (!MetaMaskWalletProvider.detect()) {
    console.log("MetaMask not detected");
    return;
  }

  const walletProvider = await MetaMaskWalletProvider.connect();

  const sdk = new Sdk(walletProvider);
  const { state } = sdk;

  console.info("SDK created, state", state);
  const nativeCurrencies = await sdk.getNativeCurrencies();

  console.log("Native Currencies:", nativeCurrencies);
});

// require import "@muzamint/hardhat-etherspot";
task("tx", "Run all etherspot transaction tests", async (_, { Sdk }) => {
  const privateKey =
    "0x398dd483a53fef9b5b37c142bdbabcef69a9b5e133885ffb62981f6484ee7aa1";
  var batchHash: string = "xxx";
  const sdk = new Sdk(privateKey, {
    env: EnvNames.TestNets,
    networkName: NetworkNames.Ropsten,
  });
  console.log("Supported test networks ", sdk.supportedNetworks);
  const { state } = sdk;
  console.log("state", state);

  await sdk.computeContractAccount({ sync: true });
  console.log("Smart wallet", state.account);
  console.log("Account balances ", await sdk.getAccountBalances());

  const receiver = "0x940d89BFAB20d0eFd076399b6954cCc42Acd8e15"; // Replace with address of your choice

  const amtInWei = "500000000000000000"; //Send 0.5 ETH
  //this method will add the transaction to a batch, which has to be executed later.

  // step 1 - create the transaction and add to the batch queue
  const transaction = await sdk.batchExecuteAccountTransaction({
    to: receiver, //wallet address
    value: amtInWei, //in wei
  });

  // step 1.1 - you can add more transations as above step 1, before you estimate gas price and submit the whole batch.

  console.log("Estimating transaction");

  // step 2 - estimate gas price for the whole batch queue
  await sdk
    .estimateGatewayBatch()
    .then(async (result) => {
      console.log("Estimation ", result.estimation);

      // step 3 - if there is an estimated gas receive, then you can start to submit the whole batch.
      batchHash = (await sdk.submitGatewayBatch()).hash;
      console.log("Transaction submitted, hash: ", batchHash);
    })
    .catch((error) => {
      console.log("Transaction estimation failed with error ", error.message);
    });

  // step 4 - loop and check (or use notification instead) to see the batch submit in process

  console.log("hash", batchHash);
  var xx: string = "wait";

  // step 4.1 you will see Sent if the whole batch is sent.
  while (xx !== "Sent") {
    await new Promise((r) => setTimeout(r, 2000));
    console.log(xx);
    sdk
      .getGatewaySubmittedBatch({
        hash: batchHash,
      })
      .then((x) => {
        console.log("🙉 batch process: ", x.state);
        xx = x.state;
      })
      .catch(console.error);
  }
});

// require import "@muzamint/hardhat-etherspot";
task("sdk", "Run all etherspot tests", async (_, { Sdk }) => {
  const sdk = new Sdk(randomPrivateKey(), {
    env: EnvNames.TestNets,
    networkName: NetworkNames.Ropsten,
  });
  const signature = await sdk.signMessage({
    message:
      "amet nostrud mollit ipsum ea nulla veniam proident est adipisicing",
  });

  console.log("signature: ", signature);
  const output = await sdk.createSession();

  console.log("session object", output);
  console.log("session graphql headers", {
    ["x-auth-token"]: output.token,
  });

  const address = await sdk.computeContractAccount();

  console.log("contract account: ", address);

  const { account } = sdk.state; // current contract account
  console.log("account: ", account);

  sdk.notifications$.subscribe(console.log);
  /*
  await sdk
    .batchExecuteAccountTransaction({
      to: "0x9E4C996EFD1Adf643467d1a1EA51333C72a25453", // Destination Ethereum address
      value: 100, // This value is in wei
      data: undefined, // Optional contract data payload
    })
    .catch(console.error);
    */
  console.log("Supported networks ", sdk.supportedNetworks);
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  defaultNetwork,
  solidity: {
    version: "0.8.13",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    localhost: {
      url: "[::1]",
    },
    polygon: {
      url: process.env.POLYGON_URL || "",
      chainId: 137,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    polygonMumbai: {
      url: process.env.POLYGON_TEST_URL || "",
      chainId: 80001,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    hardhat: {
      forking: {
        url:
          `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}` ||
          "",
      },
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      ropsten: process.env.ETHERSCAN_API_KEY,
      polygon: process.env.POLYGONSCAN_API_KEY,
      polygonMumbai: process.env.POLYGONSCAN_API_KEY,
    },
  },
};

export default config;
