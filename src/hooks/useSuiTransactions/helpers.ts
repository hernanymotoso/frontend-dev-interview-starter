import { TransactionData } from "../useSolanaTransactions/types";

const SUI_DECIMALS = 1_000_000_000;

export function parseTransaction(
  tx: any,
  userAddress: string
): TransactionData {
  const base: TransactionData = {
    chain: "Sui",
    from: userAddress,
    to: "Unknown",
    amount: null,
    unit: "SUI",
    blockTime: tx.timestampMs ? parseInt(tx.timestampMs) : null,
  };

  try {
    const balanceChanges = tx.balanceChanges || [];

    if (balanceChanges.length >= 2) {
      let userAmount = 0;
      let recipientAddress = "Unknown";

      for (const change of balanceChanges) {
        const owner = change.owner?.AddressOwner || change.owner;
        const amount = parseInt(change.amount || "0");

        if (owner === userAddress) {
          userAmount = amount;
        } else if (amount > 0) {
          recipientAddress = owner;
        }
      }

      if (userAmount < 0 && recipientAddress !== "Unknown") {
        return {
          ...base,
          to: recipientAddress,
          amount: Math.abs(userAmount) / SUI_DECIMALS,
        };
      }
    }

    return base;
  } catch (error) {
    console.error("Parse error:", error);
    return base;
  }
}
