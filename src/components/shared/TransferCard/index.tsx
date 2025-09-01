"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { TransferCardProps } from "./types";

export function TransferCard({
  title,
  from,
  onSubmit,
  unitLabel,
  onClose,
}: TransferCardProps) {
  const [to, setTo] = useState("");
  const [amt, setAmt] = useState<number>(0);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 w-full max-w-md mx-auto shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div></div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 cursor-pointer hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-xl">
            <span className="text-gray-400 text-sm">From</span>
            <div className="flex items-center gap-2">
              <span
                className="text-white text-sm font-medium"
                title={from || "Disconnected"}
              >
                {from
                  ? `${from.slice(0, 6)}...${from.slice(-4)}`
                  : "Disconnected"}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">To</label>
            <input
              className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Enter recipient address"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Amount ({unitLabel})
            </label>

            <input
              className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              type="number"
              value={amt}
              onChange={(e) => setAmt(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="text-xs text-gray-500 mb-6 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          ⚠️ Please double-check the recipient address before sending.
        </div>

        <button
          className="w-full bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400
           text-gray-800 font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] 
           disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          onClick={async () => {
            if (to && amt > 0) {
              await onSubmit(to, amt);
            }
          }}
          disabled={!to || amt <= 0}
        >
          Send
        </button>
      </div>
    </div>
  );
}
