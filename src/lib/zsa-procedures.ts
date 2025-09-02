import { SuiClient } from "@mysten/sui/client";
import { Connection } from "@solana/web3.js";
import { createServerActionProcedure } from "zsa";

export const solanaProcedure = createServerActionProcedure().handler(
  async () => {
    const connection = new Connection(
      process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT!
    );
    return { connection };
  }
);

export const suiProcedure = createServerActionProcedure().handler(async () => {
  const connection = new SuiClient({
    url: process.env.NEXT_PUBLIC_SUI_RPC_ENDPOINT!,
  });

  return { connection };
});
