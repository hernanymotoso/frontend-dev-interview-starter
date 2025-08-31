import { Transaction } from "@mysten/sui/transactions";

const SUI_DECIMALS = 1_000_000_000;

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
  amountSui: number
): Promise<string> {
  if (!provider.account?.address) throw new Error("Wallet not connected");
  if (!to || amountSui <= 0) throw new Error("Recipient and amount required");

  const tx = new Transaction();

  // fix sui decimals
  const mist = Math.round(amountSui * SUI_DECIMALS);

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
