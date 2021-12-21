import { Coin, MsgExecuteContract, MsgSend } from "@terra-money/terra.js";
import { multisigAddress } from "./constant";
import { execute } from "./utils/execute";

export const run = async () => {
  const res = await execute(multisigAddress, {
    propose: {
      title: "Send 1 UST",
      description: "testing",
      msgs: [
        {
          bank: {
            send: {
              to_address: "terra1x6y6h2xyw5hhl5rnulef0nr722ysgxraweqyvq",
              amount: [
                {
                  denom: "uusd",
                  amount: "1000000",
                },
              ],
            },
          },
        },
      ],
    },
  });
  console.log(res);
};

run().catch((err) => console.log(err));
