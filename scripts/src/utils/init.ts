import { MsgInstantiateContract, StdFee } from "@terra-money/terra.js";

import { feeDenom, isMainnet, terra, wallet } from "../constant";
import { retry } from "./retry";

export const init = async (
  codeId: number,
  msgObj: any,
  initCoins = [],
  migratable = false
) => {
  const migrationAddress = migratable ? wallet.key.accAddress : undefined;
  const msgs = [
    new MsgInstantiateContract(
      wallet.key.accAddress,
      migrationAddress,
      codeId,
      msgObj,
      initCoins
    ),
  ];
  const fee = isMainnet
    ? new StdFee(1000000, "300000uusd")
    : await retry(async () => {
      return terra.tx.estimateFee(wallet.key.accAddress, msgs, {
        feeDenoms: [feeDenom],
      });
    }).catch(() => new StdFee(1000000, "300000uusd"));

  const address = await retry(async () => {
    const tx = await wallet.createAndSignTx({
      msgs,
      fee,
    });
    const result = await terra.tx.broadcast(tx);
    if (result.raw_log.includes("signature verification failed")) {
      throw result;
    }
    const logs = JSON.parse(result.raw_log);
    let addr;
    for (const log of logs) {
      if (log.events) {
        for (const ev of log.events) {
          if (ev.type === "instantiate_contract") {
            addr = ev.attributes.find(
              (att) => att.key === "contract_address"
            )?.value;
            break;
          }
        }
      }
      if (addr) {
        break;
      }
    }
    return addr;
  });

  return address;
};
