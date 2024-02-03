"use client";
import { FormatManipulationComponent, roundToNDecimals } from "@/utils";
import { Loader } from "lucide-react";
import "./homepage-coinmarketcap.css";

export function CoinmarketCap({
  stateCurrency,
  isLoading,
  stateHeaderText,
}: {
  isLoading: boolean;
  stateCurrency: Record<string, string | undefined>;
  stateHeaderText: Record<string, number | undefined>;
}) {
  return (
    <div className="invisible-scrollbar hover:cursor-pointer">
      <div className="flex items-center gap-2">
        <h4 className="text-md font-medium whitespace-nowrap">Volume:</h4>
        {isLoading || !stateHeaderText?.volume ? (
          <Loader className="animate-spin" />
        ) : (
          <FormatManipulationComponent
            originPrice={Number(stateHeaderText?.volume)}
            currencyPrice={Number(stateCurrency?.price)}
            currencySymbol={stateCurrency?.currencySymbol}
            className="text-sm font-light"
          />
        )}
      </div>
      <div className="flex items-center gap-2">
        <h4 className="text-md font-medium whitespace-nowrap">
          BTC Dominance :
        </h4>
        {isLoading || !stateHeaderText?.btcDominance ? (
          <Loader className="animate-spin" />
        ) : (
          <h4 className="whitespace-nowrap text-[14px] text-[#333]">
            {roundToNDecimals(Number(stateHeaderText?.btcDominance), 2)} %
          </h4>
        )}
      </div>
      <div className="flex items-center gap-2">
        <h4 className="text-md font-medium whitespace-nowrap">
          ETH Dominance :
        </h4>
        {isLoading || !stateHeaderText?.ethDominance ? (
          <Loader className="animate-spin" />
        ) : (
          <h4 className="whitespace-nowrap text-[14px] text-[#333]">
            {roundToNDecimals(Number(stateHeaderText?.ethDominance), 2)} %
          </h4>
        )}
      </div>
    </div>
  );
}
