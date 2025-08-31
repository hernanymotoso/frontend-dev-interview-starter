"use client";

import Link from "next/link";

export function Header() {
  return (
    <header>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="relative text-xl font-bold transition-all duration-200 hover:text-white hover:scale-105"
        >
          Mini Transfer
        </Link>

        <nav className="flex items-center gap-8">
          <Link
            href="/solana"
            className="relative text-base font-semibold  transition-all duration-200 hover:text-white hover:scale-105"
          >
            <span className="relative z-10">Solana</span>
          </Link>
          <Link
            href="/sui"
            className="relative text-base font-semibold transition-all duration-200 hover:text-white hover:scale-105"
          >
            <span className="relative z-10">Sui</span>
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">connected wallet</span>

          <button className="rounded-lg bg-[#1d1e2c] px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-700">
            Disconect
          </button>
        </div>
      </div>
    </header>
  );
}
