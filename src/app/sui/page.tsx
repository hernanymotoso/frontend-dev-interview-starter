'use client';
import { useState } from 'react';
import { useSuiTransactions } from '@/hooks/useSuiTransactions';
import { TransactionTable } from '@/components/TransactionTable';
import { TransferCard } from '@/components/TransferCard';
import { createSuiTransfer } from '@/lib/suiTransfer';
import { useSuietProvider } from '@/lib/suiet';

export default function SuiPage() {
  const provider = useSuietProvider();
  const address = provider?.account.address ?? null;

  const { data, loading, error, refetch } = useSuiTransactions(address ?? undefined);
  const [busy, setBusy] = useState(false);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold mb-6">SUI</h1>
      <div className="mb-4 text-sm text-[var(--muted)]">
        Connected: {address ?? 'Disconnected'}
      </div>

      <TransferCard
        title="SUI Transfer"
        from={address}
        unitLabel="SUI"
        onSubmit={async (to, amountSui) => {
          if (!provider) return alert('Connect wallet first');
          if (!to || amountSui <= 0) return alert('Recipient and amount required');
          setBusy(true);
          try {
            const digest = await createSuiTransfer(provider, to, amountSui);
            console.log('Sent tx digest:', digest);
            await refetch();
          } catch (e: any) {
            alert(e.message || 'Failed');
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

      {busy && <div className="mt-2 text-xs text-[var(--muted)]">Submitting…</div>}
    </main>
  );
}
