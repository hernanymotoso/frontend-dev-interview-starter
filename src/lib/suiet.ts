'use client';

import { useWallet } from '@suiet/wallet-kit';
import { SuietProvider } from './suiTransfer';

export function useSuietProvider(): SuietProvider | null {
  const wallet = useWallet();

  if (!wallet.connected || !wallet.account) return null;

  return {
    account: {
      address: wallet.account.address,
      publicKey: wallet.account.publicKey as Uint8Array, 
    },
    signAndExecuteTransaction: wallet.signAndExecuteTransaction,
  };
}

export function useSuietAddress(): string | null {
  const wallet = useWallet();
  return wallet.connected ? wallet.account?.address ?? null : null;
}
