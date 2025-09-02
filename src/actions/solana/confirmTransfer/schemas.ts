import z from "zod";

export const confirmTransferSchema = z.object({
  signature: z.string().min(1, "Signature is required"),
  blockhash: z.string().min(1, "Blockhash is required"),
  lastValidBlockHeight: z
    .number()
    .int()
    .positive("Block height must be positive"),
});
