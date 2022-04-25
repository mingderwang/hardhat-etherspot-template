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
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
