# Mini Transfers Challenge (Solana + SUI)

Welcome 👋  
This is a take-home coding challenge where you’ll build a simple frontend to transfer tokens on **Solana Devnet** and **SUI Testnet**, integrating with wallet providers.

---

## 🎯 Goal

Create a minimal web app where a user can:

- Connect a **Solana** wallet (via Reown AppKit)  
- Connect a **SUI** wallet (via Suiet Wallet Kit)  
- Input recipient + amount and send a transfer on each chain  
- View recent transactions in a table  

You’ll be working inside a Next.js + TypeScript repo with starter code for both chains.

---

## 🧰 Stack

- [Next.js 14](https://nextjs.org/) (App Router, TypeScript)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [@solana/web3.js](https://solana-labs.github.io/solana-web3.js/)  
- [@mysten/sui](https://www.npmjs.com/package/@mysten/sui)  
- [@reown/appkit-adapter-solana](https://www.npmjs.com/package/@reown/appkit-adapter-solana)  
- [@suiet/wallet-kit](https://kit.suiet.app/docs/QuickStart)  

---

## ⚡️ Test Networks

- **Solana:** Devnet  
  - Faucet: [https://solfaucet.com/](https://solfaucet.com/) or [https://faucet.solana.com/](https://faucet.solana.com/)  
  - RPC (used by default): `https://api.devnet.solana.com`

- **SUI:** Testnet  
  - Faucet: [https://faucet.sui.io/](https://faucet.sui.io/)  
  - RPC (used by default): `https://fullnode.testnet.sui.io`

---

## ✅ Candidate Tasks

1. **Dependency Management**
   - Resolve any dependency issues and ensure the app runs with `pnpm run dev`.

2. **Solana Integration**
   - Wire up Reown AppKit to connect a Solana devnet wallet.
   - Use the provided `createSolanaTransfer` helper to send SOL on devnet.
   - Show the connected public key in the UI.

3. **SUI Integration**
   - Wire up Suiet Wallet Kit to connect a SUI testnet wallet.
   - Use the provided `createSuiTransfer` helper to send SUI on testnet.
   - Show the connected address in the UI.

4. **Responsive Design**
   - Fix the `TransferCard` component so it works on small screens (≤375px).
   - No horizontal scrolling, inputs should stack nicely.

5. **Transaction History**
   - Complete the provided hooks (`useSolanaTransactions`, `useSuiTransactions`) so the app can display transactions for the connected account.
   - Show them in the `TransactionTable` component.

6. **Bug Hunt**
   - One of the Solana/SUI transfer helpers has a subtle bug 🐞. Identify and fix it.

7. **Documentation**
   - Add a short note in this README describing:
     - What changes you made
     - Any issues you ran into
     - How to run your solution

8. **Bonus Challenge**
   - Show off your design skills
     - Design a new homepage for the application
     - Make the transfer cards look nice  
---

## 🏃‍♀️ Getting Started

Install dependencies:

```bash
pnpm install


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
