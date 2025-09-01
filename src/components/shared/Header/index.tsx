"use client";

import Link from "next/link";
import { useState, useEffect, useRef, forwardRef } from "react";
import { usePathname } from "next/navigation";
import { MenuButtonProps, MenuDropDownProps } from "./types";
import { SuiWallet } from "./components/SuiWallet";
import { SolanaWallet } from "./components/SolanaWallet";

export function Header() {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isSui = pathname === "/sui";
  const isSolana = pathname === "/solana";
  const showWalletSection = isSui || isSolana;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="relative">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="relative text-xl font-bold transition-all duration-200 hover:text-white hover:scale-105"
        >
          Mini Transfer
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/sui"
            className="relative text-base font-semibold transition-all duration-200 hover:text-white hover:scale-105"
          >
            <span className="relative z-10">Sui</span>
          </Link>

          <Link
            href="/solana"
            className="relative text-base font-semibold transition-all duration-200 hover:text-white hover:scale-105"
          >
            <span className="relative z-10">Solana</span>
          </Link>
        </nav>

        {showWalletSection && isSui && <SuiWallet />}

        {showWalletSection && isSolana && <SolanaWallet isHidden />}

        <MenuButton isOpen={isMenuOpen} toggle={toggleMenu} ref={buttonRef} />
      </div>

      <MenuDropDown
        isOpen={isMenuOpen}
        toggle={toggleMenu}
        showWalletSection={showWalletSection}
        isSui={isSui}
        isSolana={isSolana}
        ref={menuRef}
      />
    </header>
  );
}

const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ isOpen, toggle }, ref) => {
    return (
      <button
        ref={ref}
        onClick={toggle}
        className={`md:hidden flex flex-col justify-center items-center cursor-pointer w-10 h-10 rounded-lg transition-all duration-200 ${
          isOpen ? "bg-gray-800" : "hover:bg-gray-800"
        }`}
        aria-label="Toggle mobile menu"
      >
        <div className="relative w-6 h-5">
          <span
            className={`absolute top-0 left-0 w-6 h-0.5 bg-gray-300 transition-all duration-300 ease-in-out ${
              isOpen ? "rotate-45 translate-y-2 bg-white" : ""
            }`}
          ></span>
          <span
            className={`absolute top-2 left-0 w-6 h-0.5 bg-gray-300 transition-all duration-300 ease-in-out ${
              isOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`absolute top-4 left-0 w-6 h-0.5 bg-gray-300 transition-all duration-300 ease-in-out ${
              isOpen ? "-rotate-45 -translate-y-2 bg-white" : ""
            }`}
          ></span>
        </div>
      </button>
    );
  }
);

MenuButton.displayName = "MenuButton";

const MenuDropDown = forwardRef<HTMLDivElement, MenuDropDownProps>(
  ({ isOpen, toggle, isSui, isSolana, showWalletSection }, ref) => {
    console.log({ isSui, isSolana, showWalletSection });
    return (
      <div
        ref={ref}
        className={`md:hidden fixed top-16 left-0 right-0 bottom-0 bg-[#1d1e2c] transform transition-all duration-300 ease-in-out z-50 ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full">
          <nav className="flex-1 p-4 space-y-2">
            <Link
              href="/solana"
              className="flex items-center text-base font-semibold text-gray-300 transition-all duration-200 hover:text-white py-3 px-4 rounded-lg hover:bg-gray-800"
              onClick={toggle}
            >
              <span className="ml-2">Solana</span>
            </Link>

            <Link
              href="/sui"
              className="flex items-center text-base font-semibold text-gray-300 transition-all duration-200 hover:text-white py-3 px-4 rounded-lg hover:bg-gray-800"
              onClick={toggle}
            >
              <span className="ml-2">Sui</span>
            </Link>
          </nav>

          <div className="w-full p-4 border-t border-gray-700 bg-[#1d1e2c] flex flex-col items-end">
            {showWalletSection && isSui && <SuiWallet />}

            {showWalletSection && isSolana && <SolanaWallet />}
          </div>
        </div>
      </div>
    );
  }
);

MenuDropDown.displayName = "MenuDropDown";
