import { ChevronDown } from "lucide-react";

export function HomepageCurrency({
  stateCurrency,
}: {
  stateCurrency: Record<string, string | undefined>;
}) {
  return (
    <div className="bg-stone-100 hover:bg-stone-200 rounded-lg py-2 px-4 hover:cursor-pointer flex items-center gap-2">
      <h5>{stateCurrency?.symbol}</h5>
      <span>
        <ChevronDown />
      </span>
    </div>
  );
}
