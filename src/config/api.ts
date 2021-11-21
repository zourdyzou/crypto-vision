export const coinLists = (currency: string) =>
  `https://coingecko.p.rapidapi.com/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const singleCoin = (id: string) =>
  `https://coingecko.p.rapidapi.com/coins/${id}`;

export const historicalChart = (
  id: string,
  days: number = 365,
  currency: string
) =>
  `https://coingecko.p.rapidapi.com/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const trendingCoins = (currency: string) =>
  `https://coingecko.p.rapidapi.com/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
