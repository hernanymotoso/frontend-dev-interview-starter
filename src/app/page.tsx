import Image from "next/image";

export default function Page() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Mini Transfers</h1>
      <div className="grid gap-4">
        <a className="underline" href="/solana">Go to Solana</a>
        <a className="underline" href="/sui">Go to SUI</a>
      </div>
    </main>
  );
}