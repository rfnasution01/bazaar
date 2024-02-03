export interface AssetsProps {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  explorer: string;
}

export interface stateCurrency {
  symbol: string | undefined;
  currencySymbol: string | undefined;
  price: string | undefined;
}

export interface stateCoinmarketcap {
  infoLoser: AssetsProps[] | undefined;
  infoGainer: AssetsProps[] | undefined;
  infoTrending: AssetsProps[] | undefined;
  infoTrendIndex: number | undefined;
  infoStatusTrendIndex: string;
}
