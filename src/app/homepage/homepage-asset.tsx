import { AssetsProps } from "@/component/props";
import Loading from "../loading";
import { ListAssets } from ".";
import { Dispatch, SetStateAction } from "react";
import { Pagination } from "@/component/ui";

export function HomepageAsset({
  assets,
  loading,
  setLoading,
  stateCurrency,
  setSearch,
  setShow,
  limit,
  offset,
  setOffset,
  page,
  setPage,
}: {
  assetsAll: AssetsProps[];
  assets: AssetsProps[];
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setShow: Dispatch<SetStateAction<boolean>>;
  setSearch: Dispatch<SetStateAction<string>>;
  stateCurrency: {
    symbol: string | undefined;
    currencySymbol: string | undefined;
    price: string | undefined;
  };
  limit: number;
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
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
          <div className="flex flex-col gap-y-8 py-8">
            <ListAssets
              assets={assets}
              stateCurrency={stateCurrency}
              setSearch={setSearch}
              setShow={setShow}
              page={page}
            />

            <Pagination
              limit={limit}
              setOffset={setOffset}
              page={page}
              setPage={setPage}
              disabled={assets?.length < 100 || loading || page >= 23}
              setLoading={setLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
}
