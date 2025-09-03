import { z } from "zod";
import { suiAddressValidator } from "./helpers";

export const suiAddressSchema = z
  .string()
  .min(1, "Address is required")
  .refine(suiAddressValidator, "Invalid SUI address");

export const prepareTransferSchema = z
  .object({
    fromAddress: suiAddressSchema,
    toAddress: suiAddressSchema,
    amount: z.number().positive("Amount must be greater than zero"),
  })
  .refine((data) => data.fromAddress !== data.toAddress, {
    message: "Source and destination addresses must be different",
    path: ["toAddress"],
  });
