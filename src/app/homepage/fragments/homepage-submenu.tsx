"use client";
import { listSubMenu } from "@/const/homepage-submenu";
import { Dispatch, SetStateAction, useState } from "react";
import { HomepageDetailContent, HomepageDetailFilter } from ".";
import { Filter } from "lucide-react";
import { Searching, SelectMarket } from "@/component/ui";

export function HomepageSubMenu({
  subMenu,
  setSubMenu,
  isShowFilter,
  setIsShowFilter,
  id,
  interval,
  stateCurrency,
  setInterval,
}: {
  subMenu: string;
  setSubMenu: Dispatch<SetStateAction<string>>;
  isShowFilter: boolean;
  setIsShowFilter: Dispatch<SetStateAction<boolean>>;
  setInterval: Dispatch<SetStateAction<string>>;
  id: string;
  interval: string;
  stateCurrency: Record<string, string | undefined>;
}) {
  return (
    <div className="flex flex-col mt-8 gap-y-3">
      <h2 className="text-2xl font-bold tracking-widest">{subMenu}</h2>
      <div className="flex items-center justify-between gap-2">
        <div className="flex bg-stone-100 rounded-lg min-w-[500px]">
          {listSubMenu?.map((item, idx) => (
            <div
              className={`flex-1 py-2 px-2 ${
                item === subMenu ? "bg-stone-200" : "bg-stone-100"
              } text-black rounded-lg hover:cursor-pointer flex justify-center gap-2 hover:bg-stone-200 text-sm text-serif tracking-widest text-medium`}
              key={idx}
              onClick={() => {
                setSubMenu(item);
                setIsShowFilter(false);
              }}
            >
              {item}
            </div>
          ))}
        </div>
        {isShowFilter ? (
          <HomepageDetailFilter
            setInterval={setInterval}
            setIsShowFilter={setIsShowFilter}
          />
        ) : (
          <div className="flex items-center gap-4">
            {subMenu === "Market" ? (
              <div className="bg-red-300 min-w-[300px]">
                <SelectMarket id={id} />
              </div>
            ) : (
              <span
                className="hover:cursor-pointer"
                onClick={() => setIsShowFilter(true)}
              >
                <Filter />
              </span>
            )}
          </div>
        )}
      </div>
      <HomepageDetailContent
        stateCurrency={stateCurrency}
        subMenu={subMenu}
        id={id}
        interval={interval}
      />
    </div>
  );
}
