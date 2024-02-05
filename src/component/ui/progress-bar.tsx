import { roundToNDecimals } from "@/utils";

export function ProgressBar({
  percent,
  color = "bg-emerald-500",
}: {
  percent: number;
  color?: string;
}) {
  return (
    <div className="h-4 w-full bg-stone-200 rounded-full">
      <div
        className={`${color} text-xs h-4`}
        style={{ width: `${percent}%`, padding: "4px", textAlign: "center" }}
      >
        {`${roundToNDecimals(percent, 2)}%`}
      </div>
    </div>
  );
}
