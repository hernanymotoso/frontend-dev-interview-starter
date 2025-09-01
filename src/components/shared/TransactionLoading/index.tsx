export function TransactionLoading() {
  return (
    <div className="bg-[#1d1e2c]/40 backdrop-blur-md border border-gray-800 rounded-2xl p-8">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>

        <h3 className="text-lg font-semibold text-white mb-2">
          Loading Transactions
        </h3>

        <p className="text-gray-400 text-sm">
          Please wait while we fetch your transaction history...
        </p>
      </div>
    </div>
  );
}
