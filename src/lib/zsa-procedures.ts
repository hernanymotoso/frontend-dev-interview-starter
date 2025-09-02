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
