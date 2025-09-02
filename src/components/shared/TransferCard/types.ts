export type TransferCardProps = {
  title: string;
  from: string | null;
  onSubmit: (to: string, amount: number) => Promise<void>;
  unitLabel: string; // SOL or SUI
  onClose?: () => void;
  isLoading?: boolean;
};
