"use client";
import { GetHiistoryById } from "@/api";
import Loading from "@/app/loading";
import { HistoryProps } from "@/component/props";
import { FormatManipulationComponent, convertUnixToDateTime } from "@/utils";
import { debounce } from "lodash";
import { useEffect, useState } from "react";

export function HomepageSubMenuHistory({
  id,
  stateCurrency,
}: {
  id: string;
  stateCurrency: Record<string, string | undefined>;
}) {
  const [history, setHistory] = useState<HistoryProps[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);
  const [interval, setInterval] = useState<string>("m1");
  const [start, setStart] = useState<number | undefined>(undefined);
  const [end, setEnd] = useState<number | undefined>(undefined);

  useEffect(() => {
    const getData = async () => {
      const data = await GetHiistoryById({
        id: id,
        interval: interval,
        start: start,
        end: end,
        setLoading: setIsLoadingHistory,
      });

      if (data) {
        const sortedData = data.data.sort((a: any, b: any) => b.time - a.time);
        const trimmedData = sortedData.slice(0, 10);
        setHistory(trimmedData);
      }
    };

    const debouncedGetData = debounce(getData, 900);
    debouncedGetData();

    return () => {
      debouncedGetData.cancel();
    };
  }, [interval, start, end, id]);

  return (
    <div className="">
      {isLoadingHistory ? (
        <Loading />
      ) : history.length === 0 ? (
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
