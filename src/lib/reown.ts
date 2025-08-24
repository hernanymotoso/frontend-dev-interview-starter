'use client';

import { useAppKitProvider } from '@reown/appkit/react';
import type { Provider } from '@reown/appkit-adapter-solana/react';
import { PublicKey, Transaction } from '@solana/web3.js';

/**
 * Normalized Reown Solana provider
 */
export interface ReownSolanaProvider {
  publicKey: PublicKey;
  signAndSendTransaction(tx: Transaction): Promise<{ signature: string }>;
}

export function useReownSolanaProvider(): ReownSolanaProvider | null {
  const { walletProvider } = useAppKitProvider<Provider>('solana');

  if (!walletProvider) return null;

  return {
    publicKey: walletProvider.publicKey as PublicKey,
    signAndSendTransaction: async (tx: Transaction) => {
      const sig = await walletProvider.signAndSendTransaction(tx);
      return { signature: sig };
    },
  };
}
