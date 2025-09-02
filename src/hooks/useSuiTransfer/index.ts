import { confirmTransfer } from "@/actions/sui/confirmTransfer";
import { prepareTransfer } from "@/actions/sui/prepareTransfer";
import { Transaction } from "@mysten/sui/transactions";
import { useState } from "react";
import { SuietProvider } from "./types";

export function useSuiTransfer() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createTransfer = async (
    toAddress: string,
    amountSui: number,
    provider: SuietProvider | null
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!provider) throw new Error("Connect wallet first");

      const [prepareTransferData, prepareTransferError] = await prepareTransfer(
        {
          fromAddress: provider.account.address,
          toAddress,
          amountSui,
        }
      );

      // TODO: Improve error handler
      if (prepareTransferError) {
        console.log({ prepareTransferError });
        throw new Error(prepareTransferError?.message || "any error");
      }

      const { serializedTransaction } = prepareTransferData;
      const transaction = Transaction.from(serializedTransaction);

      const result = await provider.signAndExecuteTransaction({
        transaction,
        options: {
          showEffects: true,
        },
      });

      const [confirmTransferData, confirmTransferError] = await confirmTransfer(
        { digest: result.digest }
      );

      // TODO: Improve error handler
      if (confirmTransferError) {
        console.log({ confirmTransferError });
        throw new Error(confirmTransferError?.message || "any error");
      }

      const { confirmed, status } = confirmTransferData;

      console.log("Sent tx digest:", result.digest);

      return {
        digest: result.digest,
        confirmed: confirmed || false,
        status: status || "unknown",
      };
    } catch (error: any) {
      const errorMessage = error.message || "unknown error";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createTransfer,
    isLoading,
    error,
  };
}
