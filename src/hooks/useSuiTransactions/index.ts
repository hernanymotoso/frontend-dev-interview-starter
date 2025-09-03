import { useCallback, useEffect, useState } from "react";
import { parseTransaction } from "./helpers";
import { TransactionData } from "../useSolanaTransactions/types";

export const useSuiTransactions = (address?: string) => {
  const [data, setData] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);

  const fetchTransactions = useCallback(async () => {
    if (!address) return;

    setLoading(true);
    setError(null);

    try {
      // TODO: move all to the backend
      const response = await fetch(process.env.NEXT_PUBLIC_SUI_RPC_ENDPOINT!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "suix_queryTransactionBlocks",
          params: [
            {
              filter: {
                FromAddress: address,
              },
              options: {
                showBalanceChanges: true,
              },
            },
            null,
            8,
            true,
          ],
        }),
      });

      console.log({ response });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log({ data });

      if (data.error) {
        throw new Error(data.error.message);
      }

      const transactions = data.result?.data || [];
      const parsedTransactions = transactions.map((tx: any) =>
        parseTransaction(tx, address)
      );

      setData(parsedTransactions);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Internal server error");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [address]);

  const refetch = () => {
    fetchTransactions();
  };

  useEffect(() => {
    if (!address) return;
    fetchTransactions();
  }, [fetchTransactions, address]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};
