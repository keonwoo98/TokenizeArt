import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("TokenizeArt42Module", (m) => {
  const tokenizeArt42 = m.contract("TokenizeArt42");
  const tokenizeArt42OnChain = m.contract("TokenizeArt42OnChain");

  return { tokenizeArt42, tokenizeArt42OnChain };
});
