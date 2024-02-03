import { SelectAssets } from "@/component/ui";
import { Dispatch, SetStateAction } from "react";

export function HomepageSearch({
  setIsOpen,
  setId,
  stateCurrency,
  setOffset,
  setPage,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setId: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
  setOffset: Dispatch<SetStateAction<number>>;
  stateCurrency: {
    symbol: string | undefined;
    currencySymbol: string | undefined;
    price: string | undefined;
  };
}) {
  return (
    <div className="">
      <SelectAssets
        setId={setId}
        setIsOpen={setIsOpen}
        stateCurrency={stateCurrency}
        setPage={setPage}
        setOffset={setOffset}
      />
    </div>
  );
}
