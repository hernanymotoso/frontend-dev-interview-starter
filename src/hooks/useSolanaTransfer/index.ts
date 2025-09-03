import { confirmTransfer } from "@/actions/solana/confirmTransfer";
import { prepareTransfer } from "@/actions/solana/prepareTransfer";
import { Transaction } from "@solana/web3.js";
import { useState } from "react";
import {
  CreateTransferResponse,
  ReownSolanaProvider,
  UseSolanaTransferParams,
} from "./types";

export function useSolanaTransfer(params?: UseSolanaTransferParams) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createTransfer = async (
    toAddress: string,
    amount: number,
    provider: ReownSolanaProvider | null
  ): Promise<CreateTransferResponse | undefined> => {
    try {
      setIsLoading(true);
      setError(null);

      if (!provider) throw new Error("Connect wallet first");

      const [prepareTransferData, prepareTransferError] = await prepareTransfer(
        {
          fromAddress: provider.publicKey.toBase58(),
          toAddress,
          amount,
        }
      );

      // TODO: Improve error handler
      if (prepareTransferError) {
        console.log({ prepareTransferError });
        if (!prepareTransferError?.fieldErrors) {
          throw new Error(prepareTransferError.message);
        }
        throw new Error("Internal server error");
      }

      const { serializedTransaction, blockhash, lastValidBlockHeight } =
        prepareTransferData;

      const transaction = Transaction.from(
        Buffer.from(serializedTransaction, "base64")
      );

      const { signature } = await provider.signAndSendTransaction(transaction);

      const [confirmTransferData, confirmTransferError] = await confirmTransfer(
        {
          blockhash,
          lastValidBlockHeight,
          signature,
        }
      );

      // TODO: Improve error handler
      if (confirmTransferError) {
        console.log({ confirmTransferError });
        if (!confirmTransferError?.fieldErrors) {
          throw new Error(confirmTransferError.message);
        }
        throw new Error("Internal server error");
      }

      console.log("Sent tx:", signature);

      const response = { signature, confirmed: confirmTransferData.confirmed };
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
