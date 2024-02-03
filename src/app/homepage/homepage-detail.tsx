"use client";
import { GetAssetById } from "@/api";
import { AssetsProps, stateCurrency } from "@/component/props";
import { debounce } from "lodash";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Loading from "../loading";
import { ArrowLeft, Link2, Star } from "lucide-react";
import Link from "next/link";
import { FormatManipulationComponent, roundToNDecimals } from "@/utils";

export function HomepageDetail({
  id,
  setShow,
  stateCurrency,
}: {
  id: string;
  setShow: Dispatch<SetStateAction<boolean>>;
  stateCurrency: stateCurrency;
}) {
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);
  const [detail, setDetail] = useState<AssetsProps | undefined>(undefined);

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

  return (
    <>
      {isLoadingDetail ? (
        <Loading />
      ) : (
        <div>
          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 hover:cursor-pointer hover:text-stone-600 mb-4"
            onClick={() => setShow(false)}
          >
            <span>
              <ArrowLeft />
            </span>
            <h4 className="text-lg font-medium tracking-widest">Back</h4>
          </div>
          {/* Data */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-4">
              <h5 className="py-1 px-2 bg-stone-500 text-white rounded-lg text-sm text-serif tracking-widest text-light">{`Rank #${detail?.rank}`}</h5>
              <Link
                href={detail?.explorer ?? "#"}
                target="_blank"
                className="py-1 px-2 bg-stone-100 text-black rounded-lg flex items-center gap-2 hover:bg-stone-200 text-sm text-serif tracking-widest text-medium"
              >
                <span>
                  <Link2 />
                </span>
                <h5>Explorer</h5>
              </Link>
              <div className="py-1 px-2 bg-stone-100 flex hover:cursor-pointer items-center text-black rounded-lg flex items-center gap-2 hover:bg-stone-200 text-sm text-serif tracking-widest text-medium">
                <span>
                  <Star />
                </span>
                <h5>Watchlist</h5>
              </div>
            </div>
            <div className="">
              <h4 className="text-xl font-semibold tracking-wider">
                {detail?.name} Price ({detail?.symbol})
              </h4>
              <div className="flex items-center justify-end gap-2">
                <FormatManipulationComponent
                  originPrice={Number(detail?.priceUsd)}
                  currencyPrice={Number(stateCurrency.price)}
                  currencySymbol={stateCurrency?.currencySymbol}
                />
                <span
                  style={{
                    backgroundColor:
                      Number(detail?.changePercent24Hr) > 0 ? "green" : "red",
                    color: "white",
                    padding: "4px 8px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: 400,
                  }}
                >
                  {Number(detail?.changePercent24Hr) > 0 && "+"}
                  {roundToNDecimals(Number(detail?.changePercent24Hr), 2)}
                </span>
              </div>
            </div>
          </div>
          <div className=""></div>
          <div className=""></div>
        </div>
      )}
    </>
  );
}
