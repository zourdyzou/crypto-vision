export interface ChartDays {
  label: string;
  value: number;
}

export interface TrendingCoins {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

export interface HistoryChart {
  market_caps: Array<Array<number>>;
  prices: Array<Array<number>>;
  total_volumes: Array<Array<number>>;
}

export interface SingleCoin {
  name: string;
  image: {
    large: string;
    thumb: string;
    small: string;
  };
  symbol: string;
  id: string;
  hashing_algorithm: string;
  description: {
    en: string;
    pl: string;
  };
  market_cap_rank: number;
  market_data: {
    current_price: {
      chf: number;
      eur: number;
      gbp: number;
      pln: number;
      usd: number;
    };
    market_cap: {
      chf: number;
      eur: number;
      gbp: number;
      pln: number;
      usd: number;
    };
  };
}
