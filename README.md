# Aeploy contract to multiple networks with same address
```
npx hardhat xdeployer
```
> result
```
Nothing to compile
No need to generate any newer typings.

The deployment is starting... Please bear with me, this may take a minute or two. Anyway, WAGMI!

Your deployment parameters will lead to the following contract address: 0x8e27e27E95c05F6EF855BE81a04c7fdd0d488f77

=> If this does not match your expectation, given a previous deployment, you have either changed the value of
the salt parameter or the bytecode of the contract!


----------------------------------------------------------
><><><><           XDEPLOY DEPLOYMENT 1           ><><><><
----------------------------------------------------------

Deployment status: successful

Network: rinkeby

Chain ID: 4

Contract name: SLVToken

Contract creation transaction hash: https://rinkeby.etherscan.io/tx/0x0ebd341af5f29852b6d1e82bf9e3bf8859e51adef48aeb846b4d1ca072ab499b

Contract address: https://rinkeby.etherscan.io/address/0x8e27e27E95c05F6EF855BE81a04c7fdd0d488f77

Transaction details written to: /Users/mingderwang/src/ming/key-templates/hardhat-etherspot-template/deployments/rinkeby_deployment.json


Your deployment parameters will lead to the following contract address: 0x8e27e27E95c05F6EF855BE81a04c7fdd0d488f77

=> If this does not match your expectation, given a previous deployment, you have either changed the value of
the salt parameter or the bytecode of the contract!


----------------------------------------------------------
><><><><           XDEPLOY DEPLOYMENT 2           ><><><><
----------------------------------------------------------

Deployment status: successful

Network: ropsten

Chain ID: 3

Contract name: SLVToken

Contract creation transaction hash: https://ropsten.etherscan.io/tx/0x8168ef55619f0d3ec45999520cbe8141cf1e43f2e8ba9b46859439e41c2f2ba8

Contract address: https://ropsten.etherscan.io/address/0x8e27e27E95c05F6EF855BE81a04c7fdd0d488f77

Transaction details written to: /Users/mingderwang/src/ming/key-templates/hardhat-etherspot-template/deployments/ropsten_deployment.json


Your deployment parameters will lead to the following contract address: 0x8e27e27E95c05F6EF855BE81a04c7fdd0d488f77

=> If this does not match your expectation, given a previous deployment, you have either changed the value of
the salt parameter or the bytecode of the contract!


----------------------------------------------------------
><><><><           XDEPLOY DEPLOYMENT 3           ><><><><
{
----------------------------------------------------------

Deployment status: successful

Network: mumbai

Chain ID: 80001

Contract name: SLVToken

Contract creation transaction hash: https://mumbai.polygonscan.com/tx/0xe0a7ab967ccbedf214a38de01df119de64de9838b29da15dbc209c5bb8fe898d

Contract address: https://mumbai.polygonscan.com/address/0x8e27e27E95c05F6EF855BE81a04c7fdd0d488f77

Transaction details written to: /Users/mingderwang/src/ming/key-templates/hardhat-etherspot-template/deployments/mumbai_deployment.json
```
# code verification
## Rinkeby
```
$ npx hardhat verify --contract contracts/SLVToken.sol:SLVToken --network rinkeby  0x8e27e27E95c05F6EF855BE81a04c7fdd0d488f77 --constructor-args arguments.js
Nothing to compile
No need to generate any newer typings.
Successfully submitted source code for contract
contracts/SLVToken.sol:SLVToken at 0x8e27e27E95c05F6EF855BE81a04c7fdd0d488f77
for verification on the block explorer. Waiting for verification result...

Successfully verified contract SLVToken on Etherscan.
https://rinkeby.etherscan.io/address/0x8e27e27E95c05F6EF855BE81a04c7fdd0d488f77#code

```
# Polygon Mumbai
```
$ npx hardhat verify --contract contracts/SLVToken.sol:SLVToken --network polygonMumbai  0x8e27e27E95c05F6EF855BE81a04c7fdd0d488f77 --constructor-args arguments.js
Nothing to compile
No need to generate any newer typings.
Successfully submitted source code for contract
contracts/SLVToken.sol:SLVToken at 0x8e27e27E95c05F6EF855BE81a04c7fdd0d488f77
for verification on the block explorer. Waiting for verification result...

Successfully verified contract SLVToken on Etherscan.
https://mumbai.polygonscan.com/address/0x8e27e27E95c05F6EF855BE81a04c7fdd0d488f77#code
```
## Ropsten
```
✗ npx hardhat verify --contract contracts/SLVToken.sol:SLVToken --network ropsten  0x8e27e27E95c05F6EF855BE81a04c7fdd0d488f77 --constructor-args arguments.js
Nothing to compile
No need to generate any newer typings.
Error in plugin @nomiclabs/hardhat-etherscan: Contract source code already verified
```
# Advanced Sample Hardhat Project

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/deploy.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).
