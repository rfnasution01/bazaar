"use client";
import { GetAsset, GetMarketById } from "@/api";
import { MarketProps } from "@/component/props";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";

export function SelectMarket({ id }: { id: string }) {
  const [market, setMarket] = useState<MarketProps[]>([]);
  const [query, setQuery] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalDisplayed, setTotalDisplayed] = useState<number>(20);

  useEffect(() => {
    const getData = async () => {
      const data = await GetMarketById({
        id: id,
        limit: 2000,
        offset: 0,
        setLoading: setIsLoading,
      });

      if (data) {
        setMarket(data?.data.slice(0, totalDisplayed));
      }
    };

    const debouncedGetData = debounce(getData, 900);
    debouncedGetData();

    return () => {
      debouncedGetData.cancel();
    };
  }, [query, totalDisplayed]);

  let marketOption = [];
  marketOption = market.map((item) => ({
    value: item?.exchangeId,
    label: item?.exchangeId,
    baseSymbol: item?.baseSymbol,
    quoteSymbol: item?.quoteSymbol,
  }));

  const search = debounce((newValue: string) => {
    if (newValue !== query) {
      setQuery(newValue);
    }
  }, 300);

  const Option = (props: any) => {
    return (
      <components.Option {...props}>
        <div className="mb-0 flex cursor-pointer flex-col hover:cursor-pointer rounded-sm px-1 hover:bg-stone-300">
          <h5
            style={{
              fontFamily: "serif",
              fontSize: "12px",
              fontWeight: 400,
              color: "grey",
            }}
          >
            {props?.data?.baseSymbol ?? "-"} -{" "}
            <span
              style={{
                fontFamily: "serif",
                fontSize: "12px",
                fontWeight: 400,
                color: "grey",
              }}
            >
              {props?.data?.quoteSymbol ?? "-"}
            </span>{" "}
          </h5>
          <h5
            style={{
              fontSize: "14px",
              fontWeight: 600,
              borderRadius: "4px",
            }}
          >
            {props?.data?.label ?? "-"}
          </h5>
        </div>
      </components.Option>
    );
  };

  return (
    <Select
      classNamePrefix="select"
      isLoading={isLoading}
      isClearable
      isSearchable
      name="Market"
      options={marketOption}
      placeholder="Binance"
      onInputChange={search}
      onChange={(optionSelected) => {
        if (optionSelected) {
          setQuery(optionSelected?.value);
        }
      }}
      components={{ Option }}
      onMenuScrollToBottom={async () => {
        const newData = await GetAsset({
          stateReq: {
            search: query || "",
            limit: 20,
            offset: totalDisplayed,
          },
          setLoading: setIsLoading,
        });

        if (newData) {
          setMarket((prevMarket) => [...prevMarket, ...newData.data]);
          setTotalDisplayed(totalDisplayed + 20);
        }
      }}
    />
  );
}
