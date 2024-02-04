"use client";
import { GetAssetById } from "@/api";
import { AssetsProps } from "@/component/props";
import { debounce } from "lodash";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Loading from "../loading";
import {
  CoinmarketCap,
  HomepageDetailBreadcrumb,
  HomepageDetailInfo,
  HomepageDetailTitle,
  HomepageSubMenuHistory,
  HomepageSubMenuMarket,
  HomepageSubMenuOverview,
} from ".";
import { listSubMenu } from "@/const/homepage-submenu";

export function HomepageDetail({
  id,
  setShow,
  stateCurrency,
  stateHeaderText,
  isLoadingAssetAll,
}: {
  id: string;
  setShow: Dispatch<SetStateAction<boolean>>;
  stateCurrency: Record<string, string | undefined>;
  stateHeaderText: Record<string, number | undefined>;
  isLoadingAssetAll: boolean;
}) {
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);
  const [detail, setDetail] = useState<AssetsProps | undefined>(undefined);
  const [subMenu, setSubMenu] = useState<string>("Overview");

  useEffect(() => {
    const getData = async () => {
      const data = await GetAssetById({
        id,
        setLoading: setIsLoadingDetail,
      });

      if (data) {
        setDetail(data?.data);
      }
    };

    const debouncedGetData = debounce(getData, 900);
    debouncedGetData();

    return () => {
      debouncedGetData.cancel();
    };
  }, [id]);

  const marketCap = 100;
  const dominance = stateHeaderText?.marketCap
    ? (Number(detail?.marketCapUsd) / stateHeaderText?.marketCap) * 100
    : 0;
  const supply = (Number(detail?.supply) / Number(detail?.maxSupply)) * 100;
  const volume24H = stateHeaderText?.volume
    ? (Number(detail?.volumeUsd24Hr) / stateHeaderText?.volume) * 100
    : 0;

  return (
    <div className="flex flex-col gap-y-4">
      <CoinmarketCap
        isLoading={isLoadingAssetAll}
        stateCurrency={stateCurrency}
        stateHeaderText={stateHeaderText}
      />
      <div>
        {isLoadingDetail ? (
          <Loading />
        ) : detail === undefined ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-1">
            {/* Breadcrumb */}
            <HomepageDetailBreadcrumb setShow={setShow} />
            {/* Data */}
            <HomepageDetailTitle
              detail={detail}
              stateCurrency={stateCurrency}
            />
            {/* Info  */}
            <HomepageDetailInfo
              stateCurrency={stateCurrency}
              supply={supply}
              marketCap={marketCap}
              dominance={dominance}
              detail={detail}
              volume24H={volume24H}
            />
            {/* Sub Menu  */}
            <div className="flex flex-col mt-8 gap-y-4">
              <h2 className="text-2xl font-bold tracking-widest">{subMenu}</h2>
              <div className="flex bg-stone-100 w-[20vw] rounded-lg">
                {listSubMenu?.map((item, idx) => (
                  <div
                    className={`flex-1 py-1 px-2 ${
                      item === subMenu ? "bg-stone-200" : "bg-stone-100"
                    } text-black rounded-lg hover:cursor-pointer flex justify-center gap-2 hover:bg-stone-200 text-sm text-serif tracking-widest text-medium`}
                    key={idx}
                    onClick={() => setSubMenu(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="">
                {subMenu === "Overview" ? (
                  <HomepageSubMenuOverview />
                ) : subMenu === "History" ? (
                  <HomepageSubMenuHistory />
                ) : subMenu === "Market" ? (
                  <HomepageSubMenuMarket />
                ) : (
                  <HomepageSubMenuOverview />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
