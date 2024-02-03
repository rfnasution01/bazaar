"use client";
import { useEffect, useState } from "react";
import { HomepageAsset, HomepageDetail, HomepageInfo, HomepageSearch } from ".";
import { GetAsset } from "@/api";
import { AssetsProps } from "@/component/props";
import { debounce } from "lodash";

export function Homepage() {
  const [show, setShow] = useState<boolean>(true);
  const [assetsAll, setAssetsAll] = useState<AssetsProps[]>([]);
  const [assets, setAssets] = useState<AssetsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingAsset, setLoadingAsset] = useState<boolean>(false);
  const [infoLoser, setInfoLoser] = useState<AssetsProps[]>([]);
  const [infoGainer, setInfoGainer] = useState<AssetsProps[]>([]);
  const [infoTrending, setTrending] = useState<AssetsProps[]>([]);
  const [infoTrendIndex, setInfoTrendingIndex] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [offset, setOffset] = useState<number>(0);
  const limit = 100;
  const [infoStatusTrendIndex, setInfoStatusTrendingIndex] =
    useState<string>("");
  const [stateCurrency, setStateCurrency] = useState({
    symbol: "USD" as string | undefined,
    currencySymbol: "$" as string | undefined,
    price: "1" as string | undefined,
  });

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
        setAssetsAll(data?.data);
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

  useEffect(() => {
    const getData = async () => {
      const data = await GetAsset({
        stateReq: {
          search: "",
          limit: limit,
          offset: offset,
        },
        setLoading: setLoadingAsset,
      });

      if (data) {
        // const filteredData = filterAssets(
        //   data?.data as AssetsProps[],
        //   stateFilter
        // );
        setAssets(data?.data);
      }
    };

    const debouncedGetData = debounce(getData, 900);
    debouncedGetData();

    return () => {
      debouncedGetData.cancel();
    };
  }, [limit, offset, search]);

  const statusTrend = (increase: number, decrease: number) => {
    if (increase > decrease) {
      setInfoStatusTrendingIndex("Bullish");
      return increase;
    }
    setInfoStatusTrendingIndex("Bearish");
    return 100 - decrease;
  };

  return (
    <div className="lg:px-24 px-10 flex flex-col gap-y-10">
      <HomepageSearch
        assets={assetsAll}
        setIsOpen={setShow}
        loading={loading}
        setSearch={setSearch}
        stateCurrency={stateCurrency}
        setPage={setPage}
        setOffset={setOffset}
      />
      <div className="grid grid-cols-12 gap-x-8">
        <div className="lg:col-span-4 col-span-12">
          <HomepageAsset
            assetsAll={assetsAll}
            assets={assets}
            loading={loadingAsset}
            setLoading={setLoadingAsset}
            setSearch={setSearch}
            setShow={setShow}
            stateCurrency={stateCurrency}
            limit={limit}
            offset={offset}
            setOffset={setOffset}
            page={page}
            setPage={setPage}
          />
        </div>
        <div className="col-span-8 lg:block hidden sticky top-0 lg:sticky lg:top-0 lg:right-0 lg:h-full border-l-2 lg:pl-8 py:8">
          <div className="lg:sticky lg:top-0 lg:right-0 lg:h-[100vh] bg-white">
            {show ? (
              <HomepageInfo
                loading={loading}
                infoLoser={infoLoser}
                infoGainer={infoGainer}
                infoTrending={infoTrending}
                infoTrendIndex={infoTrendIndex}
                infoStatusTrendIndex={infoStatusTrendIndex}
                stateCurrency={stateCurrency}
              />
            ) : (
              <HomepageDetail setShow={setShow} search={search} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
