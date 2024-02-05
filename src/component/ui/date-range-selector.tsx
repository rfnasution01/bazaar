"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import dayjs from "dayjs";
import { DataItem } from "../props";

export function DateRangeSelector({
  setDateFrom,
  setDateTo,
  dateFrom,
  dateTo,
}: {
  setDateFrom: Dispatch<SetStateAction<string>>;
  setDateTo: Dispatch<SetStateAction<string>>;
  dateFrom: string;
  dateTo: string;
}) {
  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFrom(e.target.value);
  };

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateTo(e.target.value);
  };

  return (
    <div className="flex items-center gap-4">
      <div
        className="flex items-center shadow rounded gap-1"
        style={{
          padding: "5px 12px",
          border: "1px solid rgb(203 213 225)",
        }}
      >
        <label htmlFor="dateFrom">From:</label>
        <input
          type="date"
          id="dateFrom"
          value={dateFrom}
          onChange={handleDateFromChange}
        />
      </div>

      <div
        className="flex items-center shadow rounded gap-1"
        style={{
          padding: "5px 12px",
          border:
            dateFrom !== "" && dateTo === ""
              ? "1px solid red"
              : "1px solid rgb(203 213 225)",
        }}
      >
        <label htmlFor="dateTo">To:</label>
        <input
          type="date"
          id="dateTo"
          value={dateTo}
          onChange={handleDateToChange}
        />
      </div>
    </div>
  );
}
