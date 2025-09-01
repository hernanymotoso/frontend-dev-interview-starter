import { buildAddressString } from "@/helpers/string";
import {
  useAppKit,
  useAppKitAccount,
  useDisconnect,
} from "@reown/appkit/react";
import clsx from "clsx";
import { ButtonProps, SolanaWalletProps } from "./types";

export function SolanaWallet({ isHidden }: SolanaWalletProps) {
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAppKitAccount();

  const handleConnect = async () => {
    open({ view: "Connect", namespace: "solana" });
  };

  const handleDisconect = async () => disconnect({ namespace: "solana" });

  return (
    <div className={clsx("md:flex items-center gap-4", isHidden && "hidden")}>
      {isConnected ? (
        <>
          <span className="text-sm text-gray-400 mr-2" title={address}>
            {buildAddressString(address)}
          </span>

          <Button label="Disconect" onClick={handleDisconect} />
        </>
      ) : (
        <Button label="Connect" onClick={handleConnect} />
      )}
    </div>
  );
}

// Maybe move this to own component
function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg bg-[#1d1e2c] px-4 py-2 cursor-pointer text-sm font-medium transition-colors hover:bg-gray-700"
    >
      {label}
    </button>
  );
}
