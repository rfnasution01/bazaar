"use client";
import { GetExchange } from "@/api";
import { exchangeProps } from "@/component/props";
import { roundToNDecimals } from "@/utils";
import { debounce } from "lodash";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Select, { components } from "react-select";

export function SelectExchange({
  setIsOpen,
  setId,
  setPage,
  setOffset,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setId: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
  setOffset: Dispatch<SetStateAction<number>>;
}) {
  const [exchanges, setExchanges] = useState<exchangeProps[]>([]);
  const [query, setQuery] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalDisplayed, setTotalDisplayed] = useState<number>(20);

  useEffect(() => {
    const getData = async () => {
      const data = await GetExchange({
        setLoading: setIsLoading,
      });

      if (data) {
        setExchanges(data?.data.slice(0, totalDisplayed));
      }
    };

    const debouncedGetData = debounce(getData, 900);
    debouncedGetData();

    return () => {
      debouncedGetData.cancel();
    };
  }, [query, totalDisplayed]);

  let exchangesOption = [];
  exchangesOption = exchanges.map((item) => ({
    value: item?.id,
    label: item?.name,
    change: item?.percentTotalVolume,
    rank: item?.rank,
  }));

  const search = debounce((newValue: string) => {
    if (newValue !== query) {
      setQuery(newValue);
    }
  }, 300);

  const Option = (props: any) => {
    return (
      <components.Option {...props}>
        <div className="mb-0 flex cursor-pointer justify-between item-center gap-2 rounded-sm px-1 hover:bg-stone-300">
          <h5
            style={{
              fontFamily: "serif",
              fontSize: "14px",
              fontWeight: 600,
              color: "#333",
            }}
          >
            {props?.data?.label ?? "-"} -{" "}
            <span
              style={{
                backgroundColor: "grey",
                color: "white",
                padding: "4px",
                fontSize: "12px",
                fontWeight: 300,
                borderRadius: "4px",
              }}
            >
              #{props?.data?.rank ?? "-"}
            </span>
          </h5>
          <div className="flex items-center gap-2">
            <span
              style={{
                backgroundColor: props?.data?.change > 0 ? "green" : "red",
                color: "white",
                padding: "4px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 400,
              }}
            >
              {Number(props?.data?.change) > 0 && "+"}
              {roundToNDecimals(Number(props?.data?.change), 2)}
            </span>
          </div>
        </div>
      </components.Option>
    );
  };

  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      isLoading={isLoading}
      isClearable
      isSearchable
      name="exchanges"
      options={exchangesOption}
      placeholder="BTC / Bitcoin"
      onInputChange={search}
      onChange={(optionSelected) => {
        if (optionSelected) {
          setQuery(optionSelected?.value);
          setId(optionSelected?.value);
          setPage(1);
          setOffset(0);
          setIsOpen(false);
        }
      }}
      components={{ Option }}
      onMenuScrollToBottom={async () => {
        const newData = await GetExchange({
          setLoading: setIsLoading,
        });

        if (newData) {
          setExchanges((prevexchanges) => [...prevexchanges, ...newData.data]);
          setTotalDisplayed(totalDisplayed + 20);
        }
      }}
    />
  );
}
