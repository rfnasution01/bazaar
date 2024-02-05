import {
  HomepageSubMenuHistory,
  HomepageSubMenuMarket,
  HomepageSubMenuOverview,
} from ".";

export function HomepageDetailContent({
  subMenu,
  id,
  stateCurrency,
  interval,
}: {
  subMenu: string;
  id: string;
  stateCurrency: Record<string, string | undefined>;
  interval: string;
}) {
  return (
    <div className="">
      {subMenu === "Overview" ? (
        <HomepageSubMenuOverview />
      ) : subMenu === "Trades" ? (
        <HomepageSubMenuHistory
          id={id}
          stateCurrency={stateCurrency}
          interval={interval}
          // fromToDateTime={
          //   dataFrom !== "" && dataTo !== ""
          //     ? {
          //         start: convertDateToUnixTime(dataFrom),
          //         end: convertDateToUnixTime(dataTo),
          //       }
          //     : undefined
          // }
        />
      ) : subMenu === "Market" ? (
        <HomepageSubMenuMarket id={id} stateCurrency={stateCurrency} />
      ) : (
        <HomepageSubMenuOverview />
      )}
    </div>
  );
}
