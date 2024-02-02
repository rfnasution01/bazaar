"use client";
import { FormatManipulationComponent, roundToNDecimals } from "@/utils";
import { Loader } from "lucide-react";
import "./homepage-coinmarketcap.css";
import { useEffect, useState } from "react";
import { GetAsset } from "../../api";
import { AssetsProps } from "@/component/props";

export function CoinmarketCap({
  stateCurrency,
}: {
  stateCurrency: Record<string, string | undefined>;
}) {
  const [stateHeaderText, setHeaderText] = useState<
    Record<string, number | undefined>
  >({
    marketCap: undefined,
    volume: undefined,
    btcDominance: undefined,
    ethDominance: undefined,
  });

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getDataAsset = async () => {
      const data = await GetAsset({
        stateReq: {
          limit: 2000,
          search: "",
          offset: 0,
        },
        setLoading,
      });

      if (data) {
        const totalMarketCap = data?.data?.reduce(
          (acc: number, asset: AssetsProps) => acc + Number(asset.marketCapUsd),
          0
        );
        const totalVolume = data?.data?.reduce(
          (acc: number, asset: AssetsProps) =>
            acc + Number(asset.volumeUsd24Hr),
          0
        );

        // Perhitungan btcDominance
        const btcAsset = data?.data?.find(
          (asset: AssetsProps) => asset?.id === "bitcoin"
        );
        const btcDominance = btcAsset
          ? (Number(btcAsset.marketCapUsd) / totalMarketCap) * 100
          : 0;

        // Perhitungan ethDominance
        const ethAsset = data?.data?.find(
          (asset: AssetsProps) => asset.id === "ethereum"
        );
        const ethDominance = ethAsset
          ? (Number(ethAsset.marketCapUsd) / totalMarketCap) * 100
          : 0;

        setHeaderText((prevData) => ({
          ...prevData,
          marketCap: totalMarketCap,
          volume: totalVolume,
          btcDominance: btcDominance,
          ethDominance: ethDominance,
        }));
      }
    };
    getDataAsset();
  }, []);

  return (
    <div className="invisible-scrollbar hover:cursor-pointer">
      <div className="flex items-center gap-2">
        <h4 className="text-md font-medium whitespace-nowrap">Volume :</h4>
        {loading || !stateHeaderText.volume ? (
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
        {loading || !stateHeaderText?.btcDominance ? (
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
        {loading || !stateHeaderText.ethDominance ? (
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
