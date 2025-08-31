/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useEffect, useState } from "react";

// Documentation: https://docs.sui.io/sui-api-ref#suix_querytransactionblocks

export const useSuiTransactions = (address?: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);

  const fetchTransactions = useCallback(async () => {
    if (!address) return;

    setLoading(true);
    setError(null);

    try {
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
            },
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

      const mappedTransactions = data.result.data.map((tx: any) => ({
        digest: tx.digest,
        blockTime: tx.timestampMs,
        status: tx.effects?.status?.status || "unknown",
        gasUsed: parseInt(tx.effects?.gasUsed?.computationCost || "0"),
        sender: tx.transaction?.data?.sender || address,
      }));

      setData(mappedTransactions);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
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
