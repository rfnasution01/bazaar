"use client";
import { GetHiistoryById } from "@/api";
import Loading from "@/app/loading";
import { FromToDateTime, HistoryProps } from "@/component/props";
import { FormatManipulationComponent, convertUnixToDateTime } from "@/utils";
import { debounce } from "lodash";
import { useEffect, useState } from "react";

export function HomepageSubMenuHistory({
  id,
  stateCurrency,
  interval,
  fromToDateTime,
}: {
  id: string;
  stateCurrency: Record<string, string | undefined>;
  interval: string;
  fromToDateTime?: FromToDateTime;
}) {
  const [history, setHistory] = useState<HistoryProps[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);

  console.log(fromToDateTime);

  useEffect(() => {
    const getData = async () => {
      const data = await GetHiistoryById({
        id: id,
        interval: interval ?? "m5",
        start: fromToDateTime?.start,
        end: fromToDateTime?.end,
        setLoading: setIsLoadingHistory,
      });

      if (data) {
        const sortedData = data?.data?.sort(
          (a: any, b: any) => b.time - a.time
        );
        const trimmedData = sortedData?.slice(0, 10);
        setHistory(trimmedData);
      }
    };

    const debouncedGetData = debounce(getData, 900);
    debouncedGetData();

    return () => {
      debouncedGetData.cancel();
    };
  }, [interval, fromToDateTime, id]);

  return (
    <div className="">
      {isLoadingHistory ? (
        <Loading />
      ) : history?.length === 0 ? (
        <Loading />
      ) : (
        <table className="table-fixed w-full border">
          <thead className="border">
            <tr className="bg-sky-100">
              <th className="border">Time</th>
              <th className="border">Price</th>
            </tr>
          </thead>
          <tbody>
            {history?.map((item, idx) => (
              <tr key={idx}>
                <td className="text-center border-l">
                  {convertUnixToDateTime(item?.time)}
                </td>
                <td className="text-center border-l">
                  <FormatManipulationComponent
                    originPrice={Number(item?.priceUsd)}
                    currencyPrice={Number(stateCurrency?.price ?? 0)}
                    currencySymbol={stateCurrency?.currencySymbol}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
