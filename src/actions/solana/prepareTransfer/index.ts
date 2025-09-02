import { solanaProcedure } from "@/lib/zsa-procedures";
import { prepareTransferSchema } from "./schemas";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

export const prepareTransfer = solanaProcedure
  .createServerAction()
  .input(prepareTransferSchema)
  .handler(async ({ input, ctx }) => {
    const { connection } = ctx;
    const fromPubkey = new PublicKey(input.fromAddress);
    const toPubkey = new PublicKey(input.toAddress);
    const lamports = Math.round(input.amountSol * LAMPORTS_PER_SOL);

    const balance = await connection.getBalance(fromPubkey);
    if (balance < lamports) throw new Error("Insufficient balance");

    const latestBlockhash = await connection.getLatestBlockhash();

    const transaction = new Transaction({
      feePayer: fromPubkey,
      blockhash: latestBlockhash.blockhash,
      lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
    });

    transaction.add(
      SystemProgram.transfer({
        fromPubkey,
        toPubkey,
        lamports,
      })
    );

    const serializedTransaction = transaction
      .serialize({ requireAllSignatures: false })
      .toString("base64");

    return {
      serializedTransaction,
      blockhash: latestBlockhash.blockhash,
      lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
    };
  });
