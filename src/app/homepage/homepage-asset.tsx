import { AssetsProps } from "@/component/props";
import Loading from "../loading";
import { ListAssets } from ".";
import { Dispatch, SetStateAction } from "react";

export function HomepageAsset({
  assets,
  loading,
  stateCurrency,
}: {
  assetsAll: AssetsProps[];
  assets: AssetsProps[];
  loading: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setSearch: Dispatch<SetStateAction<string>>;
  stateCurrency: {
    symbol: string | undefined;
    currencySymbol: string | undefined;
    price: string | undefined;
  };
}) {
  // const [stateFilter, setStateFilter] = useState<
  //   Record<string, boolean | undefined>
  // >({
  //   no: undefined,
  //   nama: undefined,
  //   simbol: undefined,
  //   harga: undefined,
  //   kenaikan: undefined,
  //   marketCap: undefined,
  //   volume: undefined,
  // });

  return (
    <div className="h-full flex flex-col gap-y-4">
      <div>
        {loading ? (
          <Loading />
        ) : assets?.length <= 0 ? (
          "Data Not Found"
        ) : (
          <ListAssets assets={assets} stateCurrency={stateCurrency} />
        )}
      </div>
    </div>
  );
}
