import { AssetsProps } from "@/component/props";
import { SelectAssets } from "@/component/ui";
import { Dispatch, SetStateAction } from "react";

export function HomepageSearch({
  assets,
  setIsOpen,
  loading,
  setSearch,
  stateCurrency,
}: {
  assets: AssetsProps[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setSearch: Dispatch<SetStateAction<string>>;
  stateCurrency: {
    symbol: string | undefined;
    currencySymbol: string | undefined;
    price: string | undefined;
  };
}) {
  return (
    <div className="">
      <SelectAssets
        assets={assets}
        setIsOpen={setIsOpen}
        loading={loading}
        setSearch={setSearch}
        stateCurrency={stateCurrency}
      />
    </div>
  );
}
