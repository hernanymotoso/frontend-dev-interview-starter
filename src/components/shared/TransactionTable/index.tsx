"use client";

import { FileText } from "lucide-react";
import { TransactionTableProps } from "./types";
import { buildAddressString } from "@/helpers/string";

export function TransactionTable({ transactions }: TransactionTableProps) {
  if (!transactions || transactions?.length === 0) {
    return (
      <div className="bg-[#1d1e2c]/40 backdrop-blur-md border border-gray-800 rounded-2xl p-8">
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-gray-500" />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-white mb-2">
            No Transactions Yet
          </h3>

          <p className="text-gray-400 text-sm mb-4">
            Your transaction history will appear here once you make your first
            transfer.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1d1e2c]/40 backdrop-blur-md  border border-gray-800 rounded-2xl p-6">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-3 px-4 text-gray-400 font-medium min-w-[80px]">
                Chain
              </th>

              <th className="text-left py-3 px-4 text-gray-400 font-medium min-w-[120px]">
                From
              </th>

              <th className="text-left py-3 px-4 text-gray-400 font-medium min-w-[120px]">
                To
              </th>

              <th className="text-left py-3 px-4 text-gray-400 font-medium min-w-[140px] whitespace-nowrap">
                Amount
              </th>

              <th className="text-left py-3 px-4 text-gray-400 font-medium min-w-[160px] whitespace-nowrap">
                Time
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction, index) => (
              <tr
                key={index}
                className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
              >
                <td className="py-4 px-4 min-w-[80px]">
                  <span className="text-gray-300">{transaction.chain}</span>
                </td>

                <td className="py-4 px-4 min-w-[120px]">
                  <span
                    className="text-pink-400 font-mono text-xs"
                    title={transaction.from}
                  >
                    {buildAddressString(transaction.from)}
                  </span>
                </td>

                <td className="py-4 px-4 min-w-[120px]">
                  <span
                    className="text-pink-400 font-mono text-xs"
                    title={transaction.to}
                  >
                    {buildAddressString(transaction.to)}
                  </span>
                </td>

                <td className="py-4 px-4 min-w-[140px] whitespace-nowrap">
                  <span className="text-white font-medium">
                    {transaction.amount} {transaction.unit}
                  </span>
                </td>

                <td className="py-4 px-4 min-w-[160px] whitespace-nowrap">
                  <span className="text-gray-400">
                    {new Date(transaction.blockTime).toLocaleString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
