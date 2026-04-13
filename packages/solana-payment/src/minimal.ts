import { type Plugin, elizaLogger } from "@elizaos/core";

export const minimalPlugin: Plugin = {
  name: "minimal-solana",
  description: "Minimal Solana payment agent without embedding requirements",
  actions: [],
  providers: [],
  evaluators: [],
};

export default minimalPlugin;
