import { Transaction, SuiClient } from '@mysten/sui';

export interface SuietProvider {
  account: {
    address: string;
    publicKey: Uint8Array; 
  };
  signAndExecuteTransaction(input: {
    transaction: Transaction;
    options?: any;
  }): Promise<{ digest: string }>;
}

/**
 * Initiates a SUI transfer using Suiet Wallet Kit
 */
export async function createSuiTransfer(
  provider: SuietProvider,
  to: string,
  amountSui: number,
  rpcUrl = 'https://fullnode.testnet.sui.io:443'
): Promise<string> {
  if (!provider.account?.address) throw new Error('Wallet not connected');
  if (!to || amountSui <= 0) throw new Error('Recipient and amount required');

  const client = new SuiClient({ url: rpcUrl });
  const tx = new Transaction();

  // Convert to mist 
  const mist = Math.round(amountSui * 1_000_000);

  tx.transferObjects(
    [tx.splitCoins(tx.gas, [tx.pure.u64(mist)])],
    tx.pure.address(to)
  );

  const result = await provider.signAndExecuteTransaction({
    transaction: tx,
    options: { showEffects: true },
  });

  return result.digest;
}
