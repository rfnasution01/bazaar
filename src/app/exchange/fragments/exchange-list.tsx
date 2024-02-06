import { exchangeProps, stateCurrency } from "@/component/props";
import { Dispatch, SetStateAction } from "react";
import { Pagination } from "@/component/ui";
import Loading from "@/app/loading";
import { ExchangeListData } from ".";

export function ExchangeList({
  limit,
  setOffset,
  page,
  setPage,
  isLoadingExchange,
  setIsLoadingExchange,
  exchanges,
  setId,
  setShow,
  stateCurrency,
}: {
  limit: number;
  setOffset: Dispatch<SetStateAction<number>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  isLoadingExchange: boolean;
  setIsLoadingExchange: Dispatch<SetStateAction<boolean>>;
  setId: Dispatch<SetStateAction<string>>;
  setShow: Dispatch<SetStateAction<boolean>>;
  exchanges: exchangeProps[];
  stateCurrency: stateCurrency;
}) {
  return (
    <div className="h-full flex flex-col gap-y-4">
      <div>
        {isLoadingExchange ? (
          <Loading />
        ) : exchanges?.length <= 0 ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-y-8 pb-8">
            <ExchangeListData
              exchanges={exchanges}
              stateCurrency={stateCurrency}
              setShow={setShow}
              page={page}
              setId={setId}
              limit={limit}
            />

            <Pagination
              limit={limit}
              setOffset={setOffset}
              setIsLoadingAssets={setIsLoadingExchange}
              page={page}
              setPage={setPage}
              disabled={
                exchanges?.length < 100 || isLoadingExchange || page >= 23
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
