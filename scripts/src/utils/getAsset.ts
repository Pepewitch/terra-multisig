export const getAsset = (uusd: string) => ({
  info: { native_token: { denom: "uusd" } },
  amount: uusd,
});
