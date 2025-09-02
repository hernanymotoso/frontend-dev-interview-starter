import { Transaction } from "@solana/web3.js";

export type ReownSolanaProvider = {
  publicKey: { toBase58(): string };
  signAndSendTransaction(tx: Transaction): Promise<{ signature: string }>;
};

export type UseSolanaTransferParams = {
  onSuccess?: (data: CreateTransferResponse) => void;
  onError?: (error: any) => void;
};

export type CreateTransferResponse = {
  signature: string;
  confirmed: boolean;
};
