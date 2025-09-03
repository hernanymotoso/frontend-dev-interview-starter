import { z } from "zod";
import { solanaAddressSchema } from "@/actions/solana/prepareTransfer/schemas";
import { suiAddressSchema } from "@/actions/sui/prepareTransfer/schemas";

export const createTransferFormSchema = (unitLabel: "SOL" | "SUI") => {
  const addressSchema =
    unitLabel === "SOL" ? solanaAddressSchema : suiAddressSchema;

  return z.object({
    toAddress: addressSchema,
    amount: z.number().positive("Amount must be greater than zero"),
  });
};

export type TransferFormData = {
  toAddress: string;
  amount: number;
};

export type TransferCardRef = {
  formReset: (data?: TransferFormData) => void;
  formSetError: (field: keyof TransferFormData, message: string) => void;
};

export type TransferCardProps = {
  title: string;
  from: string | null;
  onSubmit: (toAddress: string, amount: number) => Promise<void>;
  unitLabel: "SOL" | "SUI"; // SOL or SUI
  onClose?: () => void;
  isLoading?: boolean;
};
