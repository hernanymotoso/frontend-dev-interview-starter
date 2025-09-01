type TransactionErrorProps = {
  refetch: () => void;
  errorMessage: string;
};

export function TransactionError({
  refetch,
  errorMessage,
}: TransactionErrorProps) {
  return (
    <div className="bg-[#1d1e2c]/40 backdrop-blur-md border border-red-800/50 rounded-2xl p-8">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto bg-red-900/30 rounded-full flex items-center justify-center mb-4">
          <div className="w-8 h-8 text-red-400">⚠️</div>
        </div>

        <h3 className="text-lg font-semibold text-white mb-2">
          Error Loading Transactions
        </h3>

        <p className="text-gray-400 text-sm mb-4">{errorMessage}</p>

        <button
          onClick={refetch}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
