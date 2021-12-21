import { Coin, MsgExecuteContract, MsgSend } from "@terra-money/terra.js";
import { multisigAddress } from "./constant";
import { execute } from "./utils/execute";

export const run = async () => {
  const res = await execute(multisigAddress, {
    execute: {
      proposal_id: 1,
    },
  });
  console.log(res);
};

run().catch((err) => console.log(err));
