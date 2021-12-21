import { Coin, MsgExecuteContract, MsgSend } from "@terra-money/terra.js";
import { multisigAddress } from "./constant";
import { execute } from "./utils/execute";

export const run = async () => {
  const res = await execute(multisigAddress, {
    vote: {
      proposal_id: 1,
      vote: "yes"
    },
  });
  console.log(res);
};

run().catch((err) => console.log(err));
