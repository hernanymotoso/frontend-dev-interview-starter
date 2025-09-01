/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useSuiTransactions } from "@/hooks/useSuiTransactions";
import { TransactionTable } from "@/components/shared/TransactionTable";
import { TransferCard } from "@/components/shared/TransferCard";
import { createSuiTransfer } from "@/lib/suiTransfer";
import { useSuietProvider } from "@/lib/suiet";
import { Send } from "lucide-react";
import { ConnectButton } from "@suiet/wallet-kit";

export default function SuiPage() {
  const provider = useSuietProvider();
  const address = provider?.account.address ?? null;
  const [showTransferModal, setShowTransferModal] = useState(false);

  const { data, loading, error, refetch } = useSuiTransactions(
    address ?? undefined
  );
  const [busy, setBusy] = useState(false);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold mb-6">SUI</h1>

      <ConnectButton />

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
          title="SUI Transfer"
          from={address}
          unitLabel="SUI"
          onClose={() => setShowTransferModal(false)}
          onSubmit={async (to, amountSui) => {
            if (!provider) return alert("Connect wallet first");
            if (!to || amountSui <= 0)
              return alert("Recipient and amount required");
            setBusy(true);
            try {
              const digest = await createSuiTransfer(provider, to, amountSui);
              console.log("Sent tx digest:", digest);
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
