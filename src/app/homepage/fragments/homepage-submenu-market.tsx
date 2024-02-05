"use client";
import { GetMarketById } from "@/api";
import Loading from "@/app/loading";
import { MarketProps } from "@/component/props";
import { Pagination } from "@/component/ui";
import {
  FormatManipulationComponent,
  capitalizeFirstLetterFromLowercase,
  roundToNDecimals,
} from "@/utils";
import { debounce } from "lodash";
import { useEffect, useState } from "react";

export function HomepageSubMenuMarket({
  id,
  stateCurrency,
}: {
  id: string;
  stateCurrency: Record<string, string | undefined>;
}) {
  const [market, setMarket] = useState<MarketProps[]>([]);
  const [isLoadingMarket, setIsLoadingMarket] = useState<boolean>(false);
  const [limit, _setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const getData = async () => {
      const data = await GetMarketById({
        id: id,
        limit: limit,
        offset: offset,
        setLoading: setIsLoadingMarket,
      });

      if (data) {
        setMarket(data?.data);
      }
    };

    const debouncedGetData = debounce(getData, 900);
    debouncedGetData();

    return () => {
      debouncedGetData.cancel();
    };
  }, [limit, offset, id]);

  return (
    <div className="flex flex-col gap-y-4">
      <div>
        {isLoadingMarket ? (
          <Loading />
        ) : market?.length === 0 ? (
          <Loading />
        ) : (
          <table className="table-auto w-full border">
            <thead className="border">
              <tr className="bg-sky-100">
                <th className="border">No</th>
                <th className="border">Exchange</th>
                <th className="border">Pairs</th>
                <th className="border">Price</th>
                <th className="border">Volume 24Hr</th>
                <th className="border">Volume %</th>
              </tr>
            </thead>
            <tbody>
              {market?.map((item, idx) => (
                <tr
                  key={idx}
                  className={`${
                    idx % 2 === 0 ? "bg-white" : "bg-stone-100"
                  } hover:bg-stone-200 hover:cursor-pointer`}
                >
                  <td className="text-center border-l">
                    {(page - 1) * limit + (idx + 1)}
                  </td>
                  <td className="text-center border-l">
                    {capitalizeFirstLetterFromLowercase(
                      item?.exchangeId.toLowerCase() ?? "-"
                    )}
                  </td>
                  <td className="text-center border-l">
                    <h1>
                      {item?.baseSymbol ?? "-"} / {item?.quoteSymbol ?? "-"}
                    </h1>
                  </td>
                  <td className="text-center border-l">
                    <FormatManipulationComponent
                      originPrice={Number(item?.priceUsd)}
                      currencyPrice={Number(stateCurrency.price)}
                      currencySymbol={stateCurrency?.currencySymbol}
                    />
                  </td>
                  <td className="text-center border-l">
                    <FormatManipulationComponent
                      originPrice={Number(item?.volumeUsd24Hr)}
                      currencyPrice={Number(stateCurrency.price)}
                      currencySymbol={stateCurrency?.currencySymbol}
                    />
                  </td>
                  <td className="text-center border-l">
                    <span
                      className={`p-1 text-sm font-light rounded-lg ${
                        Number(item?.volumePercent) > 0
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {Number(item?.volumePercent) > 0 && "+"}
                      {roundToNDecimals(Number(item?.volumePercent), 2)} %
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* <div className="flex justify-end items-center">
        <h1>Test</h1>
      </div> */}
      {!isLoadingMarket && (
        <Pagination
          limit={limit}
          setOffset={setOffset}
          setIsLoadingAssets={setIsLoadingMarket}
          page={page}
          setPage={setPage}
          disabled={market?.length < 10 || isLoadingMarket || page >= 23}
        />
      )}
    </div>
  );
}
