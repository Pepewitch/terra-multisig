import { Msg, MsgInstantiateContract } from "@terra-money/terra.js";
import { isMainnet, wallet } from "./constant";
import { upload } from "./utils/upload";
import { join } from "path";
import { init } from "./utils/init";
import { execute } from "./utils/execute";

const run = async () => {
  const codeId = await upload(
    join(__dirname, "../../artifacts/cw3_fixed_multisig.wasm")
  );
  const govAddress = await init(
    codeId,
    {
      voters: [
        {
          addr: wallet.key.accAddress,
          weight: 5,
        },
      ],
      required_weight: 5,
      max_voting_period: {
        time: 24 * 60 * 60,
      },
    },
    [],
    false
  );
  console.log("govAddress", govAddress);
};

run().catch((err) => console.log(err));
