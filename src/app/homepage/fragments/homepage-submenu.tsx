import { listSubMenu } from "@/const/homepage-submenu";
import { Dispatch, SetStateAction } from "react";
import { HomepageDetailContent, HomepageDetailFilter } from ".";
import { Filter } from "lucide-react";

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
    <div className="flex flex-col mt-8 gap-y-4">
      <h2 className="text-2xl font-bold tracking-widest">{subMenu}</h2>
      <div className="flex items-center justify-between gap-2">
        <div className="flex bg-stone-100 rounded-lg">
          {listSubMenu?.map((item, idx) => (
            <div
              className={`flex-1 py-1 px-2 ${
                item === subMenu ? "bg-stone-200" : "bg-stone-100"
              } text-black rounded-lg hover:cursor-pointer flex justify-center gap-2 hover:bg-stone-200 text-sm text-serif tracking-widest text-medium`}
              key={idx}
              onClick={() => setSubMenu(item)}
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
          <span
            className="hover:cursor-pointer"
            onClick={() => setIsShowFilter(true)}
          >
            <Filter />
          </span>
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
