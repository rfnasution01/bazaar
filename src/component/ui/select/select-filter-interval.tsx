"use client";
import { listInterval } from "@/const";
import { debounce } from "lodash";
import React, { Dispatch, SetStateAction, useState } from "react";
import Select, { components } from "react-select";

export function SelectInterval({
  setInterval,
}: {
  setInterval: Dispatch<SetStateAction<string>>;
}) {
  const [query, setQuery] = useState<string | null>(null);
  let intervalOption = [];
  intervalOption = listInterval.map((item) => ({
    value: item,
    label: item,
  }));

  const search = debounce((newValue: string) => {
    if (newValue !== query) {
      setQuery(newValue);
    }
  }, 300);

  const Option = (props: any) => {
    return (
      <components.Option {...props}>
        <span
          style={{
            fontFamily: "serif",
            fontSize: "12px",
            fontWeight: 400,
          }}
        >
          {props?.label ?? "-"}
        </span>
      </components.Option>
    );
  };

  return (
    <Select
      classNamePrefix="select"
      isClearable
      isSearchable
      name="assets"
      options={intervalOption}
      placeholder="h1"
      onInputChange={search}
      onChange={(optionSelected) => {
        if (optionSelected) {
          setInterval(optionSelected?.value);
        }
      }}
      components={{ Option }}
    />
  );
}
