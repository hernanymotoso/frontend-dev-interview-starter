import { solanaProcedure } from "@/lib/zsa-procedures";
import { confirmTransferSchema } from "./schemas";

export const confirmTransfer = solanaProcedure
  .createServerAction()
  .input(confirmTransferSchema)
  .handler(async ({ input, ctx }) => {
    const { connection } = ctx;
    const { blockhash, signature, lastValidBlockHeight } = input;

    const confirmation = await connection.confirmTransaction(
      {
        signature,
        blockhash,
        lastValidBlockHeight,
      },
      "confirmed"
    );

    return { success: true, confirmed: !confirmation.value.err };
  });
