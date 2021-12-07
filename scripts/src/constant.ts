import dotenv from "dotenv";

import { LCDClient, MnemonicKey } from "@terra-money/terra.js";

import config from "../config.json";

dotenv.config();

export const isMainnet = process.env.NETWORK === "mainnet";

export const network = isMainnet
  ? config.network.mainnet
  : config.network.testnet;

export const terra = new LCDClient({
  URL: network.lcd,
  chainID: network.chainID,
  gasAdjustment: config.gas_adjustment || 1.5,
});

const key = new MnemonicKey({
  mnemonic: process.env.MNEMONIC,
});

export const wallet = terra.wallet(key);
export const feeDenom = config.fee_denom || "uusd";
