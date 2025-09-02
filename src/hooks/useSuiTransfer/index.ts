import { confirmTransfer } from "@/actions/sui/confirmTransfer";
import { prepareTransfer } from "@/actions/sui/prepareTransfer";
import { Transaction } from "@mysten/sui/transactions";
import { useState } from "react";
import {
  CreateTransferResponse,
  SuietProvider,
  UseSuiTransferParams,
} from "./types";

export function useSuiTransfer(params?: UseSuiTransferParams) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createTransfer = async (
    toAddress: string,
    amountSui: number,
    provider: SuietProvider | null
  ): Promise<CreateTransferResponse | undefined> => {
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

      const response = {
        digest: result.digest,
        confirmed: confirmed || false,
        status: status || "unknown",
      };
      if (params?.onSuccess) params.onSuccess(response);
      return response;
    } catch (error: any) {
      console.log("error", error);
      const errorMessage = error.message || "unknown error";
      setError(errorMessage);
      if (params?.onError) params.onError(error);
      setIsLoading(false);
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
