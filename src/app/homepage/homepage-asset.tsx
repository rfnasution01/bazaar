"use client";
import { GetAsset } from "@/api";
import { AssetsProps } from "@/component/props";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import Loading from "../loading";
import { ListAssets } from ".";

export function HomepageAsset() {
  const [assets, setAssets] = useState<AssetsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [stateFilter, setStateFilter] = useState<
    Record<string, boolean | undefined>
  >({
    no: undefined,
    nama: undefined,
    simbol: undefined,
    harga: undefined,
    kenaikan: undefined,
    marketCap: undefined,
    volume: undefined,
  });

  const [search, setSearch] = useState<string | undefined>("");
  const [page, setPage] = useState<number>(1);
  const [offset, setOffset] = useState<number>(0);
  const [limit, _setLimit] = useState<number>(100);

  useEffect(() => {
    const getData = async () => {
      const data = await GetAsset({
        stateReq: {
          search: search,
          limit: limit,
          offset: offset,
        },
        setLoading,
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
  }, [limit, offset, search, stateFilter]);

  console.log({ assets });

  return (
    <div className="h-full flex flex-col gap-y-4">
      <div>Test</div>
      <div className="">
        {loading ? (
          <Loading />
        ) : assets?.length <= 0 ? (
          "Data Not Found"
        ) : (
          <ListAssets assets={assets} />
        )}
      </div>
    </div>
  );
}
