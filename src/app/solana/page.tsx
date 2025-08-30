"use client";
import { useState } from "react";
import { useSolanaTransactions } from "@/hooks/useSolanaTransactions";
import { TransactionTable } from "@/components/TransactionTable";
import { TransferCard } from "@/components/TransferCard";
import { createSolanaTransfer } from "@/lib/solanaTransfer";
import { useReownSolanaProvider } from "@/lib/reown";
import ConnectWalletButton from "@/components/ConnectWalletButton";

export default function SolanaPage() {
  const provider = useReownSolanaProvider();
  const pubkey = provider?.publicKey?.toBase58() ?? null;

  console.log({ pubkey });

  const { data, loading, error, refetch } = useSolanaTransactions(
    pubkey ?? undefined
  );

  const [busy, setBusy] = useState(false);

  console.log({ data, loading, error, refetch });

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Solana</h1>
      <div className="mb-4 text-sm text-[var(--muted)]">
        Connected: {pubkey ?? "Disconnected"}
      </div>

      <ConnectWalletButton />

      <TransferCard
        title="Solana Transfer"
        from={pubkey}
        unitLabel="SOL"
        onSubmit={async (to, amountSol) => {
          if (!provider) return alert("Connect wallet first");
          setBusy(true);
          try {
            const sig = await createSolanaTransfer(provider, to, amountSol);
            console.log("Sent tx:", sig);
            await refetch();
          } catch (e: any) {
            alert(e.message || "Failed");
          } finally {
            setBusy(false);
          }
        }}
      />

      <div className="mt-8">
        <h2 className="text-xl mb-2">Recent Transactions</h2>
        {loading ? (
          <div>Loading…</div>
        ) : error ? (
          <div>Error: {String(error.message || error)}</div>
        ) : (
          <TransactionTable rows={data} />
        )}
      </div>

      {busy && (
        <div className="mt-2 text-xs text-[var(--muted)]">Submitting…</div>
      )}
    </main>
  );
}
