import { useCallback, useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";

// TODO: improve to return more details
export const useSolanaTransactions = (publicKey?: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);

  const connection = new Connection(
    process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT!,
    "confirmed"
  );

  const fetchTransactions = useCallback(async (): Promise<void> => {
    if (!publicKey) {
      setData([]);
      setError(publicKey ? "Invalid public key format" : null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const pubkey = new PublicKey(publicKey);
      const signatures = await connection.getSignaturesForAddress(pubkey);
      setData(signatures);
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
  }, [publicKey]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};
