"use client";
import { useState } from "react";
import { useSolanaTransactions } from "@/hooks/useSolanaTransactions";
import { TransactionTable } from "@/components/shared/TransactionTable";
import { TransferCard } from "@/components/shared/TransferCard";
import { createSolanaTransfer } from "@/lib/solanaTransfer";
import { useReownSolanaProvider } from "@/lib/reown";
import ConnectWalletButton from "@/components/ConnectWalletButton";
import { Send } from "lucide-react";

export default function SolanaPage() {
  const provider = useReownSolanaProvider();
  const pubkey = provider?.publicKey?.toBase58() ?? null;
  const [showTransferModal, setShowTransferModal] = useState(false);

  console.log({ pubkey });

  const { data, loading, error, refetch } = useSolanaTransactions(
    pubkey ?? undefined
  );

  const [busy, setBusy] = useState(false);

  console.log({ data, loading, error, refetch });

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Solana</h1>

      <ConnectWalletButton />

      <div className="mb-6">
        <button
          onClick={() => setShowTransferModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
        >
          <Send className="w-4 h-4" />
          New Transfer
        </button>
      </div>

      {showTransferModal && (
        <TransferCard
          title="Solana Transfer"
          from={pubkey}
          unitLabel="SOL"
          onClose={() => setShowTransferModal(false)}
          onSubmit={async (to, amountSol) => {
            if (!provider) return alert("Connect wallet first");
            setBusy(true);
            try {
              const sig = await createSolanaTransfer(provider, to, amountSol);
              console.log("Sent tx:", sig);
              await refetch();
              setShowTransferModal(false);
            } catch (e: any) {
              alert(e.message || "Failed");
            } finally {
              setBusy(false);
            }
          }}
        />
      )}

      <div className="mt-8">
        <h2 className="text-xl mb-2">Recent Transactions</h2>
        {loading ? (
          <div>Loading…</div>
        ) : error ? (
          <div>Error: {String(error.message || error)}</div>
        ) : (
          <TransactionTable transactions={data as any} />
        )}
      </div>

      {busy && (
        <div className="mt-2 text-xs text-[var(--muted)]">Submitting…</div>
      )}
    </main>
  );
}
