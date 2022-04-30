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
Env.defaultName = EnvNames.MainNets;

async function main() {
  const sdk = new Sdk(randomPrivateKey(), {
    networkName: NetworkNames.Mainnet,
  });

  const routes = await sdk.findCrossChainBridgeRoutes({
    fromTokenAddress: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    fromChainId: 56,
    toTokenAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    fromAmount: "100000000000000000000",
    userAddress: "0x3e8cB4bd04d81498aB4b94a392c334F5328b237b",
    toChainId: 137,
    disableSwapping: false,
  });
  console.log(routes);
  // const callDataPayload = await sdk.buildCrossChainBridgeTransaction(routes[0]);
  // console.log(callDataPayload);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
