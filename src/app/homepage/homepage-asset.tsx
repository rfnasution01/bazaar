import { AssetsProps, stateCurrency } from "@/component/props";
import Loading from "../loading";
import { ListAssets } from ".";
import { Dispatch, SetStateAction } from "react";
import { Pagination } from "@/component/ui";

export function HomepageAsset({
  limit,
  setOffset,
  page,
  setPage,
  isLoadingAssets,
  setIsLoadingAssets,
  assets,
  setId,
  setShow,
  stateCurrency,
}: {
  limit: number;
  setOffset: Dispatch<SetStateAction<number>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  isLoadingAssets: boolean;
  setIsLoadingAssets: Dispatch<SetStateAction<boolean>>;
  setId: Dispatch<SetStateAction<string>>;
  setShow: Dispatch<SetStateAction<boolean>>;
  assets: AssetsProps[];
  stateCurrency: stateCurrency;
}) {
  return (
    <div className="h-full flex flex-col gap-y-4">
      <div>
        {isLoadingAssets ? (
          <Loading />
        ) : assets?.length <= 0 ? (
          "Data Not Found"
        ) : (
          <div className="flex flex-col gap-y-8 pb-8">
            <ListAssets
              assets={assets}
              stateCurrency={stateCurrency}
              setShow={setShow}
              page={page}
              setId={setId}
              limit={limit}
            />

            <Pagination
              limit={limit}
              setOffset={setOffset}
              setIsLoadingAssets={setIsLoadingAssets}
              page={page}
              setPage={setPage}
              disabled={assets?.length < 100 || isLoadingAssets || page >= 23}
            />
          </div>
        )}
      </div>
    </div>
  );
}
