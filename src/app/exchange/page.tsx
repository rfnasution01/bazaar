"use client";

import { GetExchange } from "@/api";
import { useEffect, useState } from "react";
import {
  HomepageDetail,
  HomepageInfo,
  HomepageSearch,
  HomepageTitle,
} from "../homepage";
import { debounce } from "lodash";
import { exchangeProps } from "@/component/props";
import { ExchangeList, ExchangeSearch } from ".";
import { SelectExchange } from "@/component/ui";

export default function Exchange() {
  const [show, setShow] = useState<boolean>(true);
  const [exchangeAll, setexchangeAll] = useState<exchangeProps[]>([]);
  const [exchange, setExchange] = useState<exchangeProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingExchange, setIsLoadingExchange] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [offset, setOffset] = useState<number>(0);
  const limit = 100;
  const [stateCurrency, setStateCurrency] = useState({
    symbol: "USD" as string | undefined,
    currencySymbol: "$" as string | undefined,
    price: "1" as string | undefined,
  });
  const [stateHeaderText, setHeaderText] = useState<
    Record<string, number | undefined>
  >({
    marketCap: undefined,
    volume: undefined,
    btcDominance: undefined,
    ethDominance: undefined,
  });
  const [stateCoinmarketcap, setStateCoinmarketcap] = useState({
    infoLoser: undefined as exchangeProps[] | undefined,
    infoGainer: undefined as exchangeProps[] | undefined,
    infoTrending: undefined as exchangeProps[] | undefined,
    infoTrendIndex: undefined as number | undefined,
    infoStatusTrendIndex: "" as string,
  });

  // useEffect(() => {
  //   const getDataInfo = async () => {
  //     const data = await GetExchange({
  //       stateReq: {
  //         search: "",
  //         limit: 2000,
  //         offset: 0,
  //       },
  //       setLoading: setIsLoading,
  //     });

  //     if (data?.data) {
  //       setexchangeAll(data?.data);
  //       const totalMarketCap = data?.data?.reduce(
  //         (acc: number, exchange: exchangeProps) => acc + Number(exchange.marketCapUsd),
  //         0
  //       );
  //       const totalVolume = data?.data?.reduce(
  //         (acc: number, exchange: exchangeProps) =>
  //           acc + Number(exchange.volumeUsd24Hr),
  //         0
  //       );

  //       // Perhitungan btcDominance
  //       const btcexchange = data?.data?.find(
  //         (exchange: exchangeProps) => exchange?.id === "bitcoin"
  //       );
  //       const btcDominance = btcexchange
  //         ? (Number(btcexchange.marketCapUsd) / totalMarketCap) * 100
  //         : 0;

  //       // Perhitungan ethDominance
  //       const ethexchange = data?.data?.find(
  //         (exchange: exchangeProps) => exchange.id === "ethereum"
  //       );
  //       const ethDominance = ethexchange
  //         ? (Number(ethexchange.marketCapUsd) / totalMarketCap) * 100
  //         : 0;

  //       setHeaderText((prevData) => ({
  //         ...prevData,
  //         marketCap: totalMarketCap,
  //         volume: totalVolume,
  //         btcDominance: btcDominance,
  //         ethDominance: ethDominance,
  //       }));

  //       // --- Top Loser ---
  //       const sortedDataLoser = [...data.data].sort((a, b) => {
  //         const changePercentA = Number(a.changePercent24Hr);
  //         const changePercentB = Number(b.changePercent24Hr);
  //         return changePercentA - changePercentB;
  //       });

  //       const top5Loser = sortedDataLoser.slice(0, 5);

  //       // --- Top Gainer ---
  //       const sortedDataGainer = [...data.data].sort((a, b) => {
  //         const changePercentA = Number(a.changePercent24Hr);
  //         const changePercentB = Number(b.changePercent24Hr);
  //         return changePercentB - changePercentA;
  //       });

  //       const top5Gainer = sortedDataGainer.slice(0, 5);

  //       // --- Trending ---
  //       const sortedDataByVolume = [...data.data].sort((a, b) => {
  //         const volumeA = Number(a.volumeUsd24Hr);
  //         const volumeB = Number(b.volumeUsd24Hr);
  //         return volumeB - volumeA;
  //       });

  //       const top5Trending = sortedDataByVolume.slice(0, 5);

  //       // --- Trend Index ---
  //       const totalIncrease = data?.data.reduce(
  //         (total: number, gainer: exchangeProps) => {
  //           if (Number(gainer.changePercent24Hr) >= 0) {
  //             return total + 1;
  //           }
  //           return total;
  //         },
  //         0
  //       );

  //       const totalDecrease = data?.data.reduce(
  //         (total: number, gainer: exchangeProps) => {
  //           if (Number(gainer.changePercent24Hr) < 0) {
  //             return total + 1;
  //           }
  //           return total;
  //         },
  //         0
  //       );

  //       const averageIncrease = Math.ceil(
  //         (totalIncrease / data?.data.length) * 100
  //       );
  //       const averageDecrease = Math.ceil(
  //         (totalDecrease / data?.data.length) * 100
  //       );

  //       setStateCoinmarketcap((prevState) => ({
  //         ...prevState,
  //         infoLoser: top5Loser,
  //         infoGainer: top5Gainer,
  //         infoTrending: top5Trending,
  //         infoTrendIndex: statusTrend(averageIncrease, averageDecrease),
  //       }));
  //     }
  //   };
  //   getDataInfo();
  // }, []);

  useEffect(() => {
    const getData = async () => {
      const data = await GetExchange({
        setLoading: setIsLoadingExchange,
      });

      if (data) {
        setExchange(data?.data);
      }
    };

    const debouncedGetData = debounce(getData, 900);
    debouncedGetData();

    return () => {
      debouncedGetData.cancel();
    };
  }, []);

  // const statusTrend = (increase: number, decrease: number) => {
  //   if (increase > decrease) {
  //     setStateCoinmarketcap((prevState) => ({
  //       ...prevState,
  //       infoStatusTrendIndex: "Bullish",
  //     }));
  //     return increase;
  //   }
  //   setStateCoinmarketcap((prevState) => ({
  //     ...prevState,
  //     infoStatusTrendIndex: "Bearish",
  //   }));
  //   return 100 - decrease;
  // };

  return (
    <div className="lg:px-24 px-10 flex flex-col gap-y-10">
      <HomepageTitle stateCurrency={stateCurrency} />
      <SelectExchange
        setIsOpen={setShow}
        setId={setId}
        setPage={setPage}
        setOffset={setOffset}
      />
      <div className="grid grid-cols-12 gap-x-8">
        <div className="lg:col-span-4 col-span-12">
          <ExchangeList
            limit={limit}
            setOffset={setOffset}
            page={page}
            setPage={setPage}
            isLoadingExchange={isLoadingExchange}
            setIsLoadingExchange={setIsLoadingExchange}
            exchanges={exchange}
            setId={setId}
            setShow={setShow}
            stateCurrency={stateCurrency}
          />
        </div>
        {/* <div className="col-span-8 lg:block hidden sticky top-0 lg:sticky lg:top-0 lg:right-0 lg:h-full border-l-2 lg:pl-8 py:8">
          <div className="lg:sticky lg:top-0 lg:right-0 lg:h-[100vh] bg-white">
            {show ? (
              <HomepageInfo
                isLoading={isLoading}
                stateCoinmarketcap={stateCoinmarketcap}
                stateCurrency={stateCurrency}
                stateHeaderText={stateHeaderText}
                setId={setId}
                setShow={setShow}
              />
            ) : (
              <HomepageDetail
                setShow={setShow}
                id={id}
                stateCurrency={stateCurrency}
                isLoadingexchangeAll={isLoading}
                stateHeaderText={stateHeaderText}
              />
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
}
