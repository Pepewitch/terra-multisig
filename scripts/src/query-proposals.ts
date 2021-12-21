import { multisigAddress, terra, wallet } from "./constant";
import { execute } from "./utils/execute";

const run = async () => {
  const res = await terra.wasm.contractQuery(multisigAddress, {
    list_proposals: {},
  });
  console.log(res);
};

run();
