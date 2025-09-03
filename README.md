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

[🎥 01 - Watch Full Demo 09-03-2025](https://drive.google.com/file/d/1p5aKdyeIJ1pVze5Co_srZEhL1CGt8VjL/view?usp=sharing)

Prerequisites:

```bash
Node v20.18.1
Pnpm 10.15.0
git version 2.51.0
```

Downloading the project:

```bash
git clone git@github.com:hernanymotoso/frontend-dev-interview-starter.git
cd frontend-dev-interview-starter
git fetch origin
```

Running using npm:

```bash
1 - Rename the .env.example file to .env and fill the variables with valid data

2 - pnpm install

3 - pnpm run dev

## The app will run at: http://localhost:3000
```

Running using docker:

```bash
1 - Fill the environment variables with valid data

2 - docker-compose up

## The app will run at: http://localhost:3000
```

---

## 🧰 Working Process

My work process is like, make the things work, make the things right and only then... make the things faster.

So for this project I did:

**Make the things work**

- Fix/Update dependencies
- Implement ConnectWallet buttons to ensure connecting wallets
- createSolanaTransfer fix rpcUrl
- implement all useSolanaTransactions and ensure return right data to render on table.
- createSuiTransfer fix SUI mist, the SUI decimal was wrong, 1 SUI is 1.000.000.000 MIST not 1.000.000
- implement all useSuiTransactions and ensure return right data to render on table.

**Make the things right**

- Improve layout, make things responsive, like Transaction Card, Table and Header
- Use forms to manage data input. To manage the forms I used react-hook-form + zod to validation
- Use zod to validate data on the frontend as well as on the backend(server-actions)
- Refactor frontend, move all the business logic to the backend using server actions. The frontend only signs the transactions when needed.
- To create server actions I used zsa. With zsa we can make server action in a cool way ensuring strong typing through backend to frontend and another things.

**Make the things faster (TODO)**

- Engineering process to improve the backend and frontend
- Apply some architecture, like clean architecture etc.
- Apply Service Locator pattern to ensure better performance on serverless infrastructure, because its allow dependencies cache through requests
