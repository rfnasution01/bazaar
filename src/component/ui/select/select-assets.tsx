"use client";
import { AssetsProps } from "@/component/props";
import { FormatManipulationComponent, roundToNDecimals } from "@/utils";
import { debounce } from "lodash";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Select, { components } from "react-select";

export function SelectAssets({
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
  const [query, setQuery] = useState<string | null>(null);

  let assetsOption = [];
  assetsOption = assets.map((item) => ({
    value: item?.id,
    label: item?.name,
    symbol: item?.symbol,
    price: item?.priceUsd,
    change: item?.changePercent24Hr,
    rank: item?.rank,
  }));

  const search = debounce((newValue: string) => {
    if (newValue !== query) {
      setQuery(newValue);
    }
  }, 300);
  console.log({ query });

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
            {props?.data?.value.toUpperCase() ?? "-"} -{" "}
            <span
              style={{
                fontFamily: "serif",
                fontSize: "12px",
                fontWeight: 400,
                color: "grey",
              }}
            >
              {props?.data?.symbol ?? "-"}
            </span>{" "}
            <span
              style={{
                backgroundColor: "grey",
                color: "white",
                padding: "4px",
                fontFamily: "serif",
                fontSize: "12px",
                fontWeight: 300,
                borderRadius: "4px",
              }}
            >
              #{props?.data?.rank ?? "-"}
            </span>
          </h5>
          <div className="flex items-center gap-2">
            <FormatManipulationComponent
              originPrice={Number(props?.data?.price)}
              currencyPrice={Number(stateCurrency.price)}
              currencySymbol={stateCurrency?.currencySymbol}
            />
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
      isLoading={loading}
      isClearable
      isSearchable
      name="assets"
      options={assetsOption}
      placeholder="BTC / Bitcoin"
      onInputChange={search}
      onChange={(optionSelected) => {
        if (optionSelected) {
          setQuery(optionSelected?.value);
          setSearch(optionSelected?.value);
          setIsOpen(false);
        }
      }}
      components={{ Option }}
    />
  );
}
