import {
  ConfirmedSignatureInfo,
  LAMPORTS_PER_SOL,
  ParsedMessageAccount,
  ParsedTransactionWithMeta,
} from "@solana/web3.js";
import { TransactionData } from "./types";

export function parseTransactionDetails(
  transaction: ParsedTransactionWithMeta,
  signature: ConfirmedSignatureInfo,
  userWallet: string
) {
  const baseTransaction: TransactionData = {
    chain: "Solana",
    from: null,
    to: null,
    amount: null,
    unit: "SOL",
    blockTime: signature?.blockTime ? signature.blockTime * 1000 : null,
  };

  try {
    const accountKeys = transaction.transaction?.message?.accountKeys || [];
    const balanceChange = analyzeBalanceChanges(
      transaction,
      userWallet,
      accountKeys
    );

    if (balanceChange) {
      return {
        ...baseTransaction,
        ...balanceChange,
      };
    }

    return baseTransaction;
  } catch (error) {
    console.error("Error parsing transaction details:", error);
    return baseTransaction;
  }
}

export function analyzeBalanceChanges(
  transaction: ParsedTransactionWithMeta,
  userWallet: string,
  accountKeys: ParsedMessageAccount[]
) {
  try {
    const preBalances = transaction.meta?.preBalances || [];
    const postBalances = transaction.meta?.postBalances || [];

    if (preBalances.length !== postBalances.length) return null;

    let userIndex = -1;
    for (let i = 0; i < accountKeys.length; i++) {
      if (
        accountKeys[i].pubkey?.toString() === userWallet ||
        accountKeys[i].toString() === userWallet
      ) {
        userIndex = i;
        break;
      }
    }

    if (userIndex === -1) return null;

    const balanceChange = postBalances[userIndex] - preBalances[userIndex];

    if (Math.abs(balanceChange) < 1000) return null;

    let otherAccount = null;
    for (let i = 0; i < preBalances.length; i++) {
      if (i === userIndex) continue;

      const otherChange = postBalances[i] - preBalances[i];
      if (Math.abs(otherChange) > 1000) {
        otherAccount =
          accountKeys[i]?.pubkey?.toString() || accountKeys[i]?.toString();
        break;
      }
    }

    const amount = Math.abs(balanceChange) / LAMPORTS_PER_SOL;
    const isReceived = balanceChange > 0;

    return {
      from: isReceived ? otherAccount : userWallet,
      to: isReceived ? userWallet : otherAccount,
      amount,
      unit: "SOL",
      type: "transfer" as const,
    };
  } catch (error) {
    console.log("analyzeBalanceChanges error", error);
    return null;
  }
}
