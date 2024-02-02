import { StyleProps } from "@/component/props";
import { numberDecimalSetting } from ".";

interface FormatManipulationComponentProps extends StyleProps {
  originPrice: number;
  currencyPrice: number;
  currencySymbol: string | undefined;
}

export function FormatManipulationComponent({
  originPrice,
  currencyPrice,
  currencySymbol,
  style,
  className,
}: FormatManipulationComponentProps) {
  const price = numberDecimalSetting(originPrice, currencyPrice);
  const splitPrice = price?.toString().split(".");
  return (
    <h5 className={`whitespace-nowrap ${className}`} style={{ ...style }}>
      <span className="text-[14px] text-[#333]">{currencySymbol}</span>{" "}
      <span className="text-[14px] text-[#333]">
        {Number(splitPrice[0]).toLocaleString("en-US")}
      </span>
      {splitPrice[1] && (
        <span className="text-[13px] text-neutral-400">.{splitPrice[1]}</span>
      )}
    </h5>
  );
}
