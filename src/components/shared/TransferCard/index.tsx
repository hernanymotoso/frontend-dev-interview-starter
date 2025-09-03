"use client";

import { X, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TransferCardProps,
  TransferCardRef,
  TransferFormData,
  createTransferFormSchema,
} from "./types";
import { forwardRef, useImperativeHandle } from "react";

const TransferCard = forwardRef<TransferCardRef, TransferCardProps>(function (
  { title, from, unitLabel, isLoading, onSubmit, onClose },
  ref
) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isValid },
  } = useForm<TransferFormData>({
    resolver: zodResolver(createTransferFormSchema(unitLabel)),
    defaultValues: {
      toAddress: "",
      amount: 0,
    },
    mode: "onTouched",
  });

  useImperativeHandle(ref, () => ({
    formReset(data) {
      reset(data);
    },
    formSetError(field, message) {
      setError(field, { type: "manual", message });
    },
  }));

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

        <form
          id="transfer-form"
          onSubmit={handleSubmit(({ toAddress, amount }) =>
            onSubmit(toAddress, amount)
          )}
          className="space-y-4 mb-6"
        >
          <div>
            <label className="block text-gray-400 text-sm mb-2">To</label>

            <input
              {...register("toAddress")}
              className={`w-full bg-gray-900/50 border rounded-xl px-4 py-3 text-white text-sm 
              placeholder-gray-500 focus:outline-none transition-colors disabled:opacity-50 
                disabled:cursor-not-allowed ${
                  errors.toAddress
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-700 focus:border-blue-500"
                }`}
              placeholder="Enter recipient address"
              disabled={isLoading}
            />

            {errors.toAddress && (
              <p className="text-red-500 text-xs mt-1">
                {errors.toAddress.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Amount ({unitLabel})
            </label>

            <input
              {...register("amount", { valueAsNumber: true })}
              className={`w-full bg-gray-900/50 border rounded-xl px-4 py-3 text-white text-sm 
              placeholder-gray-500 focus:outline-none transition-colors disabled:opacity-50 
                disabled:cursor-not-allowed ${
                  errors.amount
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-700 focus:border-blue-500"
                }`}
              type="number"
              step="0.000001"
              disabled={isLoading}
            />

            {errors.amount && (
              <p className="text-red-500 text-xs mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>
        </form>

        <div className="text-xs text-gray-500 mb-6 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          ⚠️ Please double-check the recipient address before sending.
        </div>

        <button
          type="submit"
          form="transfer-form"
          className="w-full bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400
           text-gray-800 font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] 
           disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
          disabled={!isValid || isLoading}
        >
          {isLoading && <Loader className="w-4 h-4 animate-spin" />}
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
});

TransferCard.displayName = "TransferCard";
export default TransferCard;
