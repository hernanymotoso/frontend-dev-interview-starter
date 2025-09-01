"use client";
import { useState } from "react";
import { useSolanaTransactions } from "@/hooks/useSolanaTransactions";
import { TransactionTable } from "@/components/shared/TransactionTable";
import { TransferCard } from "@/components/shared/TransferCard";
import { createSolanaTransfer } from "@/lib/solanaTransfer";
import { useReownSolanaProvider } from "@/lib/reown";
import { Send } from "lucide-react";
import { TransactionLoading } from "@/components/shared/TransactionLoading";
import { TransactionError } from "@/components/shared/TransactionError";
import { extractErrorMessage } from "@/helpers/error";
import { useAppKitAccount } from "@reown/appkit/react";
import { ConnectWallet } from "@/components/shared/ConnectWallet";

export default function SolanaPage() {
  const provider = useReownSolanaProvider();
  const { address, isConnected } = useAppKitAccount();
  const [showTransferModal, setShowTransferModal] = useState(false);

  const { data, loading, error, refetch } = useSolanaTransactions(
    address ?? undefined
  );

  const [busy, setBusy] = useState(false);

  console.log({ data, loading, error, refetch });

  if (!isConnected) return <ConnectWallet chain="solana" />;

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-6">Solana</h1>

      {showTransferModal && (
        <TransferCard
          title="Solana Transfer"
          from={address!}
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl">Recent Transactions</h2>

          <button
            onClick={() => setShowTransferModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300
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
            errorMessage={String(
              error?.message || extractErrorMessage(error) || error
            )}
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
