import { suiProcedure } from "@/lib/zsa-procedures";
import { prepareTransferSchema } from "./schemas";
import { Transaction } from "@mysten/sui/transactions";

const SUI_DECIMALS = 1_000_000_000;

export const prepareTransfer = suiProcedure
  .createServerAction()
  .input(prepareTransferSchema)
  .handler(async ({ input, ctx }) => {
    const { connection } = ctx;
    const { fromAddress, toAddress, amount } = input;

    const balance = await connection.getBalance({ owner: fromAddress });
    const totalBalance = parseInt(balance.totalBalance);

    const mist = Math.round(amount * SUI_DECIMALS);

    if (totalBalance < mist) throw new Error("Insufficient balance");

    const tx = new Transaction();
    tx.transferObjects(
      [tx.splitCoins(tx.gas, [tx.pure.u64(mist)])],
      tx.pure.address(toAddress)
    );
    tx.setSender(fromAddress);

    const serializedTransaction = await tx.toJSON();

    return {
      serializedTransaction,
    };
  });
