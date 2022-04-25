import hre, { ethers } from "hardhat";
import {
  SessionStorage,
  Sdk,
  Env,
  EnvNames,
  MetaMaskWalletProvider,
  NetworkNames,
  sleep,
  randomPrivateKey,
} from "etherspot";

const logger = console;
Env.defaultName = EnvNames.TestNets;

async function main() {
  const sdk = new Sdk(randomPrivateKey(), {
    networkName: NetworkNames.Etherspot,
    sessionStorage: new SessionStorage(),
  });

  logger.log("create session", await sdk.createSession());

  logger.log(
    "create session with ttl",
    await sdk.createSession({
      ttl: 100,
    })
  );

  logger.log(
    "create session with fcm token",
    await sdk.createSession({
      fcmToken: "",
    })
  );

  logger.log("account", await sdk.syncAccount());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
