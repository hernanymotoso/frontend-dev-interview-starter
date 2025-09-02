/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useSuiTransactions } from "@/hooks/useSuiTransactions";
import { TransactionTable } from "@/components/shared/TransactionTable";
import { TransferCard } from "@/components/shared/TransferCard";
import { useSuietProvider } from "@/lib/suiet";
import { Send } from "lucide-react";
import { TransactionLoading } from "@/components/shared/TransactionLoading";
import { TransactionError } from "@/components/shared/TransactionError";
import { ConnectWallet } from "@/components/shared/ConnectWallet";
import { useWallet } from "@suiet/wallet-kit";
import { useSuiTransfer } from "@/hooks/useSuiTransfer";

export default function SuiPage() {
  const provider = useSuietProvider();
  const { connected, address } = useWallet();
  const [showTransferModal, setShowTransferModal] = useState(false);

  const { data, loading, error, refetch } = useSuiTransactions(
    address ?? undefined
  );
  const [busy, setBusy] = useState(false);

  const {
    createTransfer,
    isLoading,
    error: createTransferError,
  } = useSuiTransfer();

  console.log({ isLoading, createTransferError });

  if (!connected) return <ConnectWallet chain="sui" />;

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-6">SUI</h1>

      {showTransferModal && (
        <TransferCard
          title="SUI Transfer"
          from={address!}
          unitLabel="SUI"
          onClose={() => setShowTransferModal(false)}
          onSubmit={async (to, amountSui) => {
            if (!to || amountSui <= 0)
              return alert("Recipient and amount required");
            setBusy(true);
            try {
              const digest = await createTransfer(to, amountSui, provider);
              console.log("Sent tx digest:", digest);
              await refetch();
              setShowTransferModal(false);
            } catch (e: any) {
              console.log("errorrrrr", e);
              alert(e.message || "Failed");
            } finally {
              setBusy(false);
            }
          }}
        />
      )}

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl">Recent Transactions</h2>

          <button
            onClick={() => setShowTransferModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r cursor-pointer from-gray-200 to-gray-300 hover:from-gray-300
            hover:to-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform 
            hover:scale-105 text-xs sm:text-base"
          >
            <Send className="w-4 h-4" />
            New Transfer
          </button>
        </div>

        {loading ? (
          <TransactionLoading />
        ) : error ? (
          <TransactionError
            refetch={refetch}
            errorMessage={String(error?.message || error)}
          />
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
