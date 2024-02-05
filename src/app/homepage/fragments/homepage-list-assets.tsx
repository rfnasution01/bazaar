import { AssetsProps, stateCurrency } from "@/component/props";
import { FormatManipulationComponent, roundToNDecimals } from "@/utils";
import { Dispatch, SetStateAction } from "react";

export function ListAssets({
  assets,
  stateCurrency,
  setShow,
  page,
  setId,
  limit,
}: {
  assets: AssetsProps[];
  stateCurrency: stateCurrency;
  setShow: Dispatch<SetStateAction<boolean>>;
  setId: Dispatch<SetStateAction<string>>;
  page: number;
  limit: number;
}) {
  return (
    <div className="flex flex-col gap-y-4">
      {assets?.map((item, idx) => (
        <div
          className="flex gap-4 lg:gap-8 p-4 lg:p-8 shadow hover:cursor-pointer hover:shadow-lg"
          key={idx}
          onClick={() => {
            setId(item?.id);
            setShow(false);
          }}
        >
          <div className="flex items-center">
            <h5 className="text-xl">{(page - 1) * limit + (idx + 1)}.</h5>
          </div>
          <div className="flex flex-col flex-1" key={idx}>
            {/* Row 1 */}
            <div className="">
              <div className="flex items-end gap-2">
                <h4 className="font-serif text-xl font-semibold text-black">
                  {item?.name}
                </h4>
                <h4 className="text-md font-light text-stone-400">
                  {item?.symbol}
                </h4>
              </div>
              <FormatManipulationComponent
                originPrice={Number(item?.volumeUsd24Hr)}
                currencyPrice={Number(stateCurrency.price)}
                currencySymbol={stateCurrency?.currencySymbol}
              />
            </div>
          </div>
          <div className="text-right">
            <span
              className={`p-1 text-sm text-right font-light rounded-lg text-white ${
                Number(item?.changePercent24Hr) > 0
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {Number(item?.changePercent24Hr) > 0 && "+"}
              {roundToNDecimals(Number(item?.changePercent24Hr), 2)}
            </span>
            <div className="mt-1">
              <FormatManipulationComponent
                originPrice={Number(item?.priceUsd)}
                currencyPrice={Number(stateCurrency.price)}
                currencySymbol={stateCurrency?.currencySymbol}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
