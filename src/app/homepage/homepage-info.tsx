"use client";
import { GetAsset } from "@/api";
import { AssetsProps } from "@/component/props";
import { listMarketCap } from "@/const";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { convertSlugToText, roundToNDecimals } from "@/utils";
import { Gauge } from "@/component/ui";

export function HomepageInfo() {
  const [loading, setLoading] = useState<boolean>(false);
  const [infoLoser, setInfoLoser] = useState<AssetsProps[]>([]);
  const [infoGainer, setInfoGainer] = useState<AssetsProps[]>([]);
  const [infoTrending, setTrending] = useState<AssetsProps[]>([]);
  const [infoTrendIndex, setInfoTrendingIndex] = useState<number>(0);
  const [infoStatusTrendIndex, setInfoStatusTrendingIndex] =
    useState<string>("");

  useEffect(() => {
    const getDataInfo = async () => {
      const data = await GetAsset({
        stateReq: {
          search: "",
          limit: 2000,
          offset: 0,
        },
        setLoading,
      });

      if (data?.data) {
        // --- Top Loser ---
        const sortedDataLoser = [...data.data].sort((a, b) => {
          const changePercentA = Number(a.changePercent24Hr);
          const changePercentB = Number(b.changePercent24Hr);
          return changePercentA - changePercentB;
        });

        const top5Loser = sortedDataLoser.slice(0, 5);
        setInfoLoser(top5Loser);

        // --- Top Gainer ---
        const sortedDataGainer = [...data.data].sort((a, b) => {
          const changePercentA = Number(a.changePercent24Hr);
          const changePercentB = Number(b.changePercent24Hr);
          return changePercentB - changePercentA;
        });

        const top5Gainer = sortedDataGainer.slice(0, 5);
        setInfoGainer(top5Gainer);

        // --- Trending ---
        const sortedDataByVolume = [...data.data].sort((a, b) => {
          const volumeA = Number(a.volumeUsd24Hr);
          const volumeB = Number(b.volumeUsd24Hr);
          return volumeB - volumeA;
        });

        const top5Trending = sortedDataByVolume.slice(0, 5);
        setTrending(top5Trending);

        // --- Trend Index ---
        const totalIncrease = data?.data.reduce(
          (total: number, gainer: AssetsProps) => {
            if (Number(gainer.changePercent24Hr) >= 0) {
              return total + 1;
            }
            return total;
          },
          0
        );

        const totalDecrease = data?.data.reduce(
          (total: number, gainer: AssetsProps) => {
            if (Number(gainer.changePercent24Hr) < 0) {
              return total + 1;
            }
            return total;
          },
          0
        );

        const averageIncrease = Math.ceil(
          (totalIncrease / data?.data.length) * 100
        );
        const averageDecrease = Math.ceil(
          (totalDecrease / data?.data.length) * 100
        );

        setInfoTrendingIndex(statusTrend(averageIncrease, averageDecrease));
      }
    };
    getDataInfo();
  }, []);

  const statusTrend = (increase: number, decrease: number) => {
    if (increase > decrease) {
      setInfoStatusTrendingIndex("Bullish");
      return increase;
    }
    setInfoStatusTrendingIndex("Bearish");
    return 100 - decrease;
  };

  return (
    <div className="h-full flex flex-col gap-y-4 lg:max-h-[80vh]">
      <h1>CoinmarketCap</h1>
      <div className="lg:grid-cols-12 lg:grid lg:gap-8 pr-8 pb-4 lg:overflow-y-auto">
        {listMarketCap.map((item, idx) => (
          <div
            key={idx}
            className="shadow-md lg:p-4 md:p-3 p-3 rounded-lg hover:shadow-lg hover:cursor-pointer lg:col-span-6"
          >
            <div className="flex items-center gap-2">
              <span
                className={`${
                  idx === 0
                    ? "text-emerald-700"
                    : idx === 1
                    ? "text-yellow-700"
                    : idx === 2
                    ? "text-red-500"
                    : "text-sky-700"
                }`}
              >
                {item?.icon}
              </span>
              <h5 className="lg:text-xl text-left font-semibold">
                {item?.name}
              </h5>
            </div>
            {loading ? (
              <Loading />
            ) : idx === 0 ? (
              <div className="flex flex-col justify-center items-start gap-2 mt-4">
                {infoGainer &&
                  infoGainer?.map((items, idx) => (
                    <div className="flex items-center gap-2 w-full" key={idx}>
                      <h5 className="min-w-[5%]">{idx + 1}.</h5>
                      <div className="flex flex-1 flex-col items-start">
                        <h5 className="text-left text-md font-medium">
                          {convertSlugToText(items?.id)}
                        </h5>
                        <h5 className="text-xs font-light">{items?.symbol}</h5>
                      </div>
                      <h5 className="text-emerald-700">
                        {roundToNDecimals(Number(items?.changePercent24Hr), 2)}%
                      </h5>
                    </div>
                  ))}
              </div>
            ) : idx === 1 ? (
              <div className="flex flex-col justify-center items-start gap-2 mt-4">
                {infoLoser &&
                  infoLoser?.map((items, idx) => (
                    <div className="flex items-center gap-2 w-full" key={idx}>
                      <h5 className="min-w-[5%]">{idx + 1}.</h5>
                      <div className="flex flex-1 flex-col items-start">
                        <h5 className="text-left text-md font-medium">
                          {convertSlugToText(items?.id)}
                        </h5>
                        <h5 className="text-xs font-light">{items?.symbol}</h5>
                      </div>
                      <h5 className="text-red-700">
                        {roundToNDecimals(Number(items?.changePercent24Hr), 2)}%
                      </h5>
                    </div>
                  ))}
              </div>
            ) : idx === 2 ? (
              <div className="flex flex-col justify-center items-start gap-2 mt-4">
                {infoTrending &&
                  infoTrending?.map((items, idx) => (
                    <div className="flex items-center gap-2 w-full" key={idx}>
                      <h5 className="min-w-[5%]">{idx + 1}.</h5>
                      <div className="flex flex-1 flex-col items-start">
                        <h5 className="text-left text-md font-medium">
                          {convertSlugToText(items?.id)}
                        </h5>
                        <h5 className="text-xs font-light">{items?.symbol}</h5>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="flex justify-center items-start gap-2 mt-4">
                {infoTrendIndex && (
                  <Gauge
                    series={[infoTrendIndex]}
                    status={infoStatusTrendIndex}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
