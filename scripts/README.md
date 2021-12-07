# TERRA CONTRACT UTILS
Utilities for Terra blockchain interactions such as upload, init, query smart contract implemented with Typescript.

### How to use?
1. Clone this repository to your machine. (I usually make a `scripts` folder under the smart contract repository for this utils.)
2. Install dependencies using `yarn install`
3. Setup artifact path and other params in `config.json`
4. Add mnemonic (seed phase) in .env file (copy the `.env.example` to `.env` and change the mnemonic to your own) ***Do not push or commit .env file to github***
5. If you using testnet, you can request UST for testing at `https://faucet.terra.money/` (Change the network at the top-right to `bombay-11` before requesting)
6. Run `yarn ts-node <filename>` to apply the script.

### Example
Run `yarn ts-node src/deploy.ts` to upload the artifact and init the smart contract with a single command.