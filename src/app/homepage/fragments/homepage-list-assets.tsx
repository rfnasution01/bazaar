import { AssetsProps } from "@/component/props";
import { FormatManipulationComponent, roundToNDecimals } from "@/utils";

export function ListAssets({
  assets,
  stateCurrency,
}: {
  assets: AssetsProps[];
  stateCurrency: {
    symbol: string | undefined;
    currencySymbol: string | undefined;
    price: string | undefined;
  };
}) {
  return (
    <div className="flex flex-col gap-y-4">
      {assets?.map((item, idx) => (
        <div
          className="flex gap-4 lg:gap-8 p-4 lg:p-8 shadow hover:cursor-pointer hover:shadow-lg"
          key={idx}
        >
          <div className="flex items-center">
            <h5 className="text-xl">{idx + 1}.</h5>
          </div>
          <div className="flex flex-col flex-1" key={idx}>
            {/* Row 1 */}
            <div className="flex justify-between items-center">
              <div className="flex items-end gap-2">
                <h4 className="font-serif text-xl font-semibold text-black">
                  {item?.name}
                </h4>
                <h4 className="text-md font-light text-stone-400">
                  {item?.symbol}
                </h4>
              </div>

              <span
                className={`p-1 text- font-light rounded-lg text-white ${
                  Number(item?.changePercent24Hr) > 0
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              >
                {Number(item?.changePercent24Hr) > 0 && "+"}
                {roundToNDecimals(Number(item?.changePercent24Hr), 2)}
              </span>
            </div>
            {/* Row 2 */}
            <div className="flex justify-between items-center">
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
