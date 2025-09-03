import { ConfirmedSignatureInfo, Connection, PublicKey } from "@solana/web3.js";
import { useCallback, useEffect, useMemo, useState } from "react";
import { parseTransactionDetails } from "./helpers";
import { TransactionData } from "./types";

export const useSolanaTransactions = (publicKey?: string) => {
  const [data, setData] = useState<TransactionData[] | null>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);

  const connection = useMemo(
    () =>
      new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT!, "confirmed"),
    []
  );

  // TODO: move all to the backend
  const fetchTransactions = useCallback(async (): Promise<void> => {
    if (!publicKey) {
      setData([]);
      setError(publicKey ? "Invalid public" : null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const pubkey = new PublicKey(publicKey);
      const signatures = await connection.getSignaturesForAddress(pubkey, {
        limit: 8,
      });

      if (signatures.length === 0) {
        setData([]);
        setLoading(false);
        setError(null);
        return;
      }

      const parseSignatures = async (signature: ConfirmedSignatureInfo) => {
        const transaction = await connection.getParsedTransaction(
          signature.signature,
          {
            commitment: "confirmed",
            maxSupportedTransactionVersion: 0,
          }
        );

        if (!transaction) throw new Error("Transaction not found");

        const parsedData = parseTransactionDetails(
          transaction,
          signature,
          publicKey
        );

        return parsedData;
      };

      const parsedSignaturesPromises = signatures.map(parseSignatures);
      const parsedSignatures = await Promise.all(parsedSignaturesPromises);
      setData(parsedSignatures);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch transactions";

      setError(errorMessage);
      setData([]);
      console.error("Error fetching Solana transactions:", err);
    } finally {
      setLoading(false);
    }
  }, [connection, publicKey]);

  const refetch = useCallback(async (): Promise<void> => {
    await fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    if (!publicKey) return;
    fetchTransactions();
  }, [fetchTransactions, publicKey]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};
