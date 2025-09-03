import z from "zod";
import { solanaAddressValidator } from "./helpers";

export const solanaAddressSchema = z
  .string()
  .min(1, "Address is required")
  .refine(solanaAddressValidator, "Invalid address");

export const prepareTransferSchema = z
  .object({
    fromAddress: solanaAddressSchema,
    toAddress: solanaAddressSchema,
    amount: z.number().positive("Amount must be greater than zero"),
  })
  .refine((data) => data.fromAddress !== data.toAddress, {
    message: "Source and destination addresses must be different",
    path: ["toAddress"],
  });
