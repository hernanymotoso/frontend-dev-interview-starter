import { ArrowUpRight } from "lucide-react";

export default function Page() {
  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
        <div className="mb-8 sm:mb-12">
          <h1
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-300 
            via-gray-500 to-gray-300 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight relative"
          >
            Global Crypto Transfers
            <br />
            with Sui & Solana
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
            Experience borderless payments with{" "}
            <span className="text-white font-semibold">GlobalTransfer</span>.
            Our platform makes{" "}
            <span className="text-blue-400 font-semibold">
              transactions simple, fast and secure
            </span>
            .
          </p>

          <div className="text-center mb-3 sm:mb-4">
            <p className="text-xs sm:text-sm text-gray-400 font-medium">
              Get started with
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <a
              href="/sui"
              className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 
                md:py-3 rounded-lg font-semibold text-sm sm:text-sm md:text-base hover:bg-gray-300 transition-all 
                duration-200 hover:scale-105 w-full sm:max-w-[160px] md:max-w-[220px] justify-center"
            >
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
              Sui
            </a>

            <a
              href="/solana"
              className="flex items-center gap-2 bg-gray-800 text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 
                rounded-lg font-semibold text-sm sm:text-sm md:text-base hover:bg-gray-700 transition-all duration-200 
                hover:scale-105 w-full sm:max-w-[160px] md:max-w-[220px] justify-center"
            >
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
              Solana
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
