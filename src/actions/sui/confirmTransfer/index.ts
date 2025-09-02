import { suiProcedure } from "@/lib/zsa-procedures";
import { confirmTransferSchema } from "./schemas";

export const confirmTransfer = suiProcedure
  .createServerAction()
  .input(confirmTransferSchema)
  .handler(async ({ input, ctx }) => {
    const { connection } = ctx;
    const { digest } = input;

    const result = await connection.waitForTransaction({
      digest,
      options: {
        showEffects: true,
        showEvents: true,
      },
    });

    const isConfirmed = result.effects?.status?.status === "success";

    return {
      confirmed: isConfirmed,
      status: result.effects?.status?.status || "unknown",
    };
  });
