import z from "zod";

export const confirmTransferSchema = z.object({
  digest: z.string().min(1, "Digest is required"),
});
