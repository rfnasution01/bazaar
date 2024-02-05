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
  HomepageSubMenu,
} from ".";

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
  const [isShowFilter, setIsShowFilter] = useState<boolean>(false);
  const [interval, setInterval] = useState<string>("m1");

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

  // const [dataFrom, setDataFrom] = useState<string>("");
  // const [dataTo, setDataTo] = useState<string>("");

  return (
    <div className="flex flex-col gap-y-4 lg:max-h-full">
      <CoinmarketCap
        isLoading={isLoadingAssetAll}
        stateCurrency={stateCurrency}
        stateHeaderText={stateHeaderText}
      />
      <div className="lg:overflow-y-auto">
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
            <HomepageSubMenu
              subMenu={subMenu}
              setSubMenu={setSubMenu}
              isShowFilter={isShowFilter}
              setIsShowFilter={setIsShowFilter}
              id={id}
              interval={interval}
              stateCurrency={stateCurrency}
              setInterval={setInterval}
            />
          </div>
        )}
      </div>
    </div>
  );
}
