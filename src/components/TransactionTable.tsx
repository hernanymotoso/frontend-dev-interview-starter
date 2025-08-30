"use client";
export function TransactionTable({ rows }: { rows: any[] | null }) {
  if (!rows || rows.length === 0)
    return <div className="text-sm text-[var(--muted)]">No transactions</div>;
  return (
    <div className="mt-4 border border-[var(--border)] rounded-xl p-3 overflow-x-auto">
      <table className="min-w-[520px] text-sm">
        <thead>
          <tr className="text-left">
            <th className="py-2 pr-3">Chain</th>
            <th className="py-2 pr-3">From</th>
            <th className="py-2 pr-3">To</th>
            <th className="py-2 pr-3">Amount</th>
            <th className="py-2 pr-3">Unit</th>
            <th className="py-2 pr-3">Time</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-[var(--border)]">
              <td className="py-2 pr-3">{r.chain}</td>
              <td className="py-2 pr-3">{r.from}</td>
              <td className="py-2 pr-3">{r.to}</td>
              <td className="py-2 pr-3">{r.amount}</td>
              <td className="py-2 pr-3">{r.unit}</td>
              <td className="py-2 pr-3">
                {new Date(r.blockTime * 1000).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
