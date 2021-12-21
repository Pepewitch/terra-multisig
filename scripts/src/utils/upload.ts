import fs from "fs";

import { MsgStoreCode, StdFee } from "@terra-money/terra.js";

import { feeDenom, isMainnet, terra, wallet } from "../constant";
import { retry } from "./retry";

export const upload = async (path: string) => {
  const fee = new StdFee(5000000, "1000000uusd");

  const codeId = await retry(async () => {
    const tx = await wallet.createAndSignTx({
      msgs: [
        new MsgStoreCode(
          wallet.key.accAddress,
          fs.readFileSync(path, { encoding: "base64" })
        ),
      ],
      fee,
    });
    const res = await terra.tx.broadcast(tx);
    console.log(res);
    if (res.raw_log.includes("signature verification failed")) {
      throw res;
    }

    const logs = JSON.parse(res.raw_log);
    let codeId;
    for (const log of logs) {
      if (log.events) {
        for (const ev of log.events) {
          if (ev.type === "store_code") {
            codeId = ev.attributes.find((att) => att.key === "code_id")?.value;
            break;
          }
        }
      }
      if (codeId) {
        break;
      }
    }
    return codeId;
  });

  return Number(codeId);
};
