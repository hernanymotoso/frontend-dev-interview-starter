import { buildAddressString } from "@/helpers/string";
import { ConnectModal, useWallet } from "@suiet/wallet-kit";
import { useState } from "react";

export function SuiWallet() {
  const { connected, address, disconnect } = useWallet();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleDisconect = async () => {
    await disconnect();
    setShowModal(false);
  };

  if (connected) {
    return (
      <div className="hidden md:flex items-center gap-4">
        {address && (
          <span className="text-sm text-gray-400" title={address}>
            {buildAddressString(address)}
          </span>
        )}

        <Button label="Disconect" onClick={handleDisconect} />
      </div>
    );
  } else {
    return (
      <div className="hidden md:flex items-center gap-4">
        <ConnectModal
          open={showModal}
          onOpenChange={(open) => setShowModal(open)}
        >
          <Button label="Connect" onClick={() => setShowModal(true)} />
        </ConnectModal>
      </div>
    );
  }
}

// Maybe move this to own component
type ButtonProps = {
  label: string;
  onClick?: () => void;
};

function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg bg-[#1d1e2c] px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-700"
    >
      {label}
    </button>
  );
}
