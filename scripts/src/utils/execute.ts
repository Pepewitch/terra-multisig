import {
  Coins,
  MsgExecuteContract,
  MsgSend,
  StdFee,
} from "@terra-money/terra.js";

import { feeDenom, terra, wallet } from "../constant";
import { retry } from "./retry";

export const execute = async (
  address: string,
  msgObj: any,
  coins?: Coins.Input
) => {
  const tx = await wallet.createAndSignTx({
    msgs: [
      new MsgExecuteContract(wallet.key.accAddress, address, msgObj, coins),
    ],
    fee: new StdFee(2000000, "500000uusd"),
  });

  const result = await terra.tx.broadcast(tx);
  if (result.raw_log.includes("failed")) {
    throw result;
  }
  return result;
};

export const send = async (address: string, coins?: Coins.Input) => {
  const tx = await wallet.createAndSignTx({
    msgs: [new MsgSend(wallet.key.accAddress, address, coins)],
    fee: new StdFee(1000000, "500000uusd"),
  });

  const result = await terra.tx.broadcast(tx);
  if (result.raw_log.includes("failed")) {
    throw result;
  }
  return result;
};
