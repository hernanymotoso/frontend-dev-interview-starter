/* eslint-disable @typescript-eslint/no-explicit-any */
import { confirmTransfer } from "@/actions/solana/confirmTransfer";
import { prepareTransfer } from "@/actions/solana/prepareTransfer";
import { Transaction } from "@solana/web3.js";
import { useState } from "react";

export type ReownSolanaProvider = {
  publicKey: { toBase58(): string };
  signAndSendTransaction(tx: Transaction): Promise<{ signature: string }>;
};

export function useSolanaTransfer() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createTransfer = async (
    toAddress: string,
    amountSol: number,
    provider: ReownSolanaProvider | null
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!provider) throw new Error("Connect wallet first");

      const [prepareTransferData, prepareTransferError] = await prepareTransfer(
        {
          fromAddress: provider.publicKey.toBase58(),
          toAddress,
          amountSol,
        }
      );

      // TODO: Improve error handler
      if (prepareTransferError) {
        console.log({ prepareTransferError });
        throw new Error(prepareTransferError?.message || "any error");
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
        throw new Error(confirmTransferError?.message || "any error");
      }

      console.log("Sent tx:", signature);
      return { signature, confirmed: confirmTransferData.confirmed };
    } catch (error: any) {
      const errorMessage = error.message || "Erro desconhecido";
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
