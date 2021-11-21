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
