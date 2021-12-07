import { Coins, MsgMigrateContract, StdFee } from "@terra-money/terra.js";
import { feeDenom, terra, wallet } from "../constant";
import { retry } from "./retry";

export const migrate = async (address: string, codeId: number) => {
  const txHash = await retry(async () => {
    const tx = await wallet.createAndSignTx({
      msgs: [
        new MsgMigrateContract(wallet.key.accAddress, address, codeId, {}),
      ],
      fee: new StdFee(1000000, "500000uusd"),
    });
    const result = await terra.tx.broadcast(tx);
    if (result.raw_log.includes("signature verification failed")) {
      throw result;
    }
    const txHash = result.txhash;
    return txHash;
  });

  return txHash;
};
