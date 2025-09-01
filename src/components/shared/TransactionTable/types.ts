export type Transaction = {
  chain: string;
  from: string;
  to: string;
  amount: number;
  unit: string;
  blockTime: number;
};

export type TransactionTableProps = {
  transactions: Transaction[] | null;
};
