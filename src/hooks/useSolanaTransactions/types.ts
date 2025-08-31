export type TransactionData = {
  chain: string;
  from: string | null;
  to: string | null;
  amount: number | null;
  unit: string;
  blockTime: number | null;
};
