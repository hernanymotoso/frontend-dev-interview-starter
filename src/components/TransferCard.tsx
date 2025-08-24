'use client';
import { useState } from 'react';
import clsx from 'clsx';

type Props = {
  title: string;
  from: string | null;
  onSubmit: (to: string, amount: number) => Promise<void>;
  unitLabel: string; // SOL or SUI
};

// Intentionally janky: fixed width, cramped row, overflow hidden
export function TransferCard({ title, from, onSubmit, unitLabel }: Props) {
  const [to, setTo] = useState('');
  const [amt, setAmt] = useState<number>(0);

  return (
    <div className={clsx(
      'bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4',
      'w-[520px] overflow-hidden' // <--- fixed width + overflow = mobile sadness
    )}>
      <h3 className="text-xl mb-3">{title}</h3>
      <div className="text-xs text-[var(--muted)] mb-2">From</div>
      <div className="text-sm mb-4 truncate">{from ?? 'Disconnected'}</div>
      <div className="flex items-center gap-3 mb-3">
        <input
          className="bg-transparent border border-[var(--border)] rounded-lg px-3 py-2 text-sm flex-1"
          placeholder="Recipient address"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          className="bg-transparent border border-[var(--border)] rounded-lg px-3 py-2 text-sm w-40"
          placeholder={`Amount (${unitLabel})`}
          type="number"
          value={amt}
          onChange={(e) => setAmt(Number(e.target.value))}
        />
        <button
          className="bg-white/10 hover:bg-white/20 transition px-3 py-2 rounded-lg text-sm whitespace-nowrap"
          onClick={async () => { await onSubmit(to, amt); }}
        >
          Send
        </button>
      </div>
      <div className="text-[10px] text-[var(--muted)]">* Make it responsive (≤375px) as part of the task.</div>
    </div>
  );
}
