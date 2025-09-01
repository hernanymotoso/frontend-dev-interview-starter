import { Wallet } from "lucide-react";
import { ConnectWalletProps } from "./types";

export function ConnectWallet({ chain }: ConnectWalletProps) {
  const isSui = chain === "sui";

  const buttonStyles = isSui
    ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
    : "bg-gray-800 hover:bg-gray-700 text-white";

  const chainName = chain.charAt(0).toUpperCase() + chain.slice(1);

  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-3 sm:px-4">
      <div className="text-center">
        <div className="mb-4 sm:mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <Wallet className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4 px-2">
          Connect Your {chainName} Wallet
        </h2>

        <p className="text-gray-400 mb-6 sm:mb-8 max-w-sm sm:max-w-md mx-auto px-2 text-sm sm:text-base">
          Connect your wallet to view transactions and make transfers on the{" "}
          {chainName} network.
        </p>

        <button
          className={`${buttonStyles} px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-base sm:text-lg transition-all duration-200 hover:scale-105`}
        >
          Connect {chainName} Wallet
        </button>
      </div>
    </main>
  );
}
