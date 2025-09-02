import { Transaction } from "@mysten/sui/transactions";

export type SuietProvider = {
  account: {
    address: string;
    publicKey: Uint8Array;
  };
  signAndExecuteTransaction(input: {
    transaction: Transaction;
    options?: any;
  }): Promise<{ digest: string }>;
};
