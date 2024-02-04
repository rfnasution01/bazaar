import { AssetsProps } from "@/component/props";
import { FormatManipulationComponent, roundToNDecimals } from "@/utils";
import { Link2, RotateCcw, Star } from "lucide-react";
import Link from "next/link";

export function HomepageDetailTitle({
  detail,
  stateCurrency,
}: {
  detail: AssetsProps;
  stateCurrency: Record<string, string | undefined>;
}) {
  return (
    <div className="flex items-start justify-between gap-2">
      <div className="flex items-center gap-4">
        <h5 className="py-1 px-2 bg-stone-500 text-white rounded-lg text-sm text-serif tracking-widest text-light">{`Rank #${
          detail?.rank ?? <RotateCcw className="animate-spin" />
        }`}</h5>
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
            currencyPrice={Number(stateCurrency?.price ?? 0)}
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
  );
}
