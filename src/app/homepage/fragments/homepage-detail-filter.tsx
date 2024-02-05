import { SelectInterval } from "@/component/ui";
import { FilterX } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export function HomepageDetailFilter({
  setIsShowFilter,
  setInterval,
}: {
  setIsShowFilter: Dispatch<SetStateAction<boolean>>;
  setInterval: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="flex items-center gap-4 justify-end">
      <SelectInterval setInterval={setInterval} />
      {/* <DateRangeSelector
      dateFrom={dataFrom}
      dateTo={dataTo}
      setDateFrom={setDataFrom}
      setDateTo={setDataTo}
    /> */}
      <span
        className="hover:cursor-pointer"
        onClick={() => {
          setIsShowFilter(false);
          setInterval("m1");
        }}
      >
        <FilterX />
      </span>
    </div>
  );
}
