import { buildAddressString } from "@/helpers/string";
import { ConnectModal, useWallet } from "@suiet/wallet-kit";
import { useState } from "react";
import { ButtonProps, SuiWalletProps } from "./types";
import clsx from "clsx";

export function SuiWallet({ isHidden }: SuiWalletProps) {
  const { connected, address, disconnect } = useWallet();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleDisconect = async () => {
    await disconnect();
    setShowModal(false);
  };

  return (
    <div className={clsx("md:flex items-center gap-4", isHidden && "hidden")}>
      {connected ? (
        <>
          {address && (
            <span className="text-sm text-gray-400 mr-2" title={address}>
              {buildAddressString(address)}
            </span>
          )}

          <Button label="Disconect" onClick={handleDisconect} />
        </>
      ) : (
        <ConnectModal
          open={showModal}
          onOpenChange={(open) => setShowModal(open)}
        >
          <Button label="Connect" onClick={() => setShowModal(true)} />
        </ConnectModal>
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
