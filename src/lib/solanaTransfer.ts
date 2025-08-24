import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';

// Minimal shape of Reown’s injected Solana provider
export interface ReownSolanaProvider {
  publicKey: PublicKey;
  signAndSendTransaction(tx: Transaction): Promise<{ signature: string }>;
}

export async function createSolanaTransfer(
  provider: ReownSolanaProvider,
  to: string,
  amountSol: number,
  rpcUrl = 'https://api.mainnet-beta.solana.com'
): Promise<string> {
  if (!provider.publicKey) throw new Error('Wallet not connected');
  if (!to || amountSol <= 0) throw new Error('Recipient and amount required');

  const connection = new Connection(rpcUrl, 'confirmed');
  const lamports = Math.round(amountSol * LAMPORTS_PER_SOL);

  // Create transfer instruction
  const tx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: provider.publicKey,
      toPubkey: new PublicKey(to),
      lamports,
    })
  );

  tx.feePayer = provider.publicKey;
  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

  // Ask wallet to sign + send
  const { signature } = await provider.signAndSendTransaction(tx);

  // Optionally confirm
  await connection.confirmTransaction(signature, 'confirmed');

  return signature;
}
