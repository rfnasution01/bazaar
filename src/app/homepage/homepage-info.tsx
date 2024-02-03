"use client";
import { stateCoinmarketcap } from "@/component/props";
import { listMarketCap } from "@/const";
import Loading from "../loading";
import { convertSlugToText, roundToNDecimals } from "@/utils";
import { Gauge } from "@/component/ui";
import { CoinmarketCap } from ".";

export function HomepageInfo({
  isLoading,
  stateCurrency,
  stateCoinmarketcap,
  stateHeaderText,
}: {
  isLoading: boolean;
  stateCurrency: Record<string, string | undefined>;
  stateHeaderText: Record<string, number | undefined>;
  stateCoinmarketcap: stateCoinmarketcap;
}) {
  return (
    <div className="h-full flex flex-col gap-y-4 lg:max-h-full">
      <CoinmarketCap
        stateCurrency={stateCurrency}
        isLoading={isLoading}
        stateHeaderText={stateHeaderText}
      />
      <div className="lg:grid-cols-12 lg:grid lg:gap-8 lg:overflow-y-auto px-1">
        {listMarketCap.map((item, idx) => (
          <div
            key={idx}
            className="shadow lg:p-4 rounded-lg hover:shadow-lg hover:cursor-pointer lg:col-span-6"
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
            {isLoading ? (
              <Loading />
            ) : idx === 0 ? (
              <div className="flex flex-col justify-center items-start gap-2 mt-4">
                {stateCoinmarketcap?.infoGainer &&
                  stateCoinmarketcap?.infoGainer?.map((items, idx) => (
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
                {stateCoinmarketcap?.infoLoser &&
                  stateCoinmarketcap?.infoLoser?.map((items, idx) => (
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
                {stateCoinmarketcap?.infoTrending &&
                  stateCoinmarketcap?.infoTrending?.map((items, idx) => (
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
                {stateCoinmarketcap?.infoTrendIndex && (
                  <Gauge
                    series={[stateCoinmarketcap?.infoTrendIndex]}
                    status={stateCoinmarketcap?.infoStatusTrendIndex}
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
