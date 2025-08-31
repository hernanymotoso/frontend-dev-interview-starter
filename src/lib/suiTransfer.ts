import { SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";

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
  rpcUrl = process.env.NEXT_PUBLIC_SUI_RPC_ENDPOINT!
): Promise<string> {
  if (!provider.account?.address) throw new Error("Wallet not connected");
  if (!to || amountSui <= 0) throw new Error("Recipient and amount required");

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
