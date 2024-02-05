import { AssetsProps } from "@/component/props";
import { ProgressBar } from "@/component/ui";
import {
  FormatManipulationComponent,
  convertNumberToString,
  roundToNDecimals,
} from "@/utils";
import { BarChart2, Container, LineChart, PieChart } from "lucide-react";

export function HomepageDetailInfo({
  stateCurrency,
  detail,
  dominance,
  supply,
  marketCap,
  volume24H,
}: {
  stateCurrency: Record<string, string | undefined>;
  detail: AssetsProps;
  marketCap: number;
  dominance: number;
  supply: number;
  volume24H: number;
}) {
  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Market Cap */}
      <div className="col-span-3 p-4 shadow hover:shadow-lg border hover:cursor-pointer flex flex-col gap-y-2">
        <div className="flex items-center">
          <div className="flex-1">
            <h4 className="font-serif text-lg font-semibold">Market Cap</h4>
            <FormatManipulationComponent
              originPrice={Number(detail?.volumeUsd24Hr)}
              currencyPrice={Number(stateCurrency?.price ?? 0)}
              currencySymbol={stateCurrency?.currencySymbol}
            />
          </div>
          <span>
            <BarChart2 size={40} />
          </span>
        </div>
        <ProgressBar percent={marketCap} color="bg-sky-300" />
      </div>
      {/* Dominance */}
      <div className="col-span-3 p-4 shadow hover:shadow-lg border hover:cursor-pointer flex flex-col gap-y-2">
        <div className="flex items-center">
          <div className="flex-1">
            <h4 className="font-serif text-lg font-semibold">Dominance</h4>
            <h5>{roundToNDecimals(dominance, 2)}%</h5>
          </div>
          <span>
            <PieChart size={40} />
          </span>
        </div>
        <ProgressBar percent={dominance} color="bg-sky-300" />
      </div>
      {/* Supply */}
      <div className="col-span-3 p-4 shadow hover:shadow-lg border hover:cursor-pointer flex flex-col gap-y-2">
        <div className="flex items-center">
          <div className="flex-1">
            <h4 className="font-serif text-lg font-semibold">Supply</h4>
            <h5>
              {detail?.maxSupply ? (
                `${convertNumberToString(Number(detail?.supply))} ${
                  detail?.symbol
                }`
              ) : (
                <span className="text-stone-500">
                  Unlimited {detail?.symbol}
                </span>
              )}
            </h5>
          </div>
          <span>
            <Container size={40} />
          </span>
        </div>
        <ProgressBar
          percent={detail?.maxSupply ? supply : 100}
          color="bg-sky-300"
        />
      </div>
      {/* Volume 24H */}
      <div className="col-span-3 p-4 shadow hover:shadow-lg border hover:cursor-pointer flex flex-col gap-y-2">
        <div className="flex items-center">
          <div className="flex-1">
            <h4 className="text-lg font-semibold">Volume 24Hr</h4>
            <h5>
              {stateCurrency?.currencySymbol}{" "}
              {convertNumberToString(Number(detail?.volumeUsd24Hr))}
            </h5>
          </div>
          <span>
            <LineChart size={40} />
          </span>
        </div>
        <ProgressBar percent={volume24H} color="bg-sky-300" />
      </div>
    </div>
  );
}
