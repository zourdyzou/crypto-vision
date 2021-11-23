import React, { useCallback, useEffect, useState } from "react";

import axios from "axios";

import { useGlobalContext } from "../../context/CryptoContext";
import { historicalChartURL } from "../../config/api";
import { HistoryChart } from "../../types/data-types";

interface Props {
  coin: any;
}

export const CoinInfo: React.FC<Props> = ({ coin }) => {
  const { currency }: any = useGlobalContext();

  const [days, setDays] = useState(1);
  const [historicalChart, setHistoricalChart] = useState<HistoryChart | any>(
    {}
  );

  const fetchCryptoDataHistory = useCallback(async () => {
    try {
      const results = await axios.get(
        historicalChartURL("bitcoin", days, currency),
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "coingecko.p.rapidapi.com",
            "x-rapidapi-key":
              "6d0a2dc270mshe9cc297632fb8cfp13a548jsn44fd6a2bd2a3",
          },
        }
      );

      if (results.status >= 301 && results.status <= 503) {
        throw new Error(
          "cannot fetch the data, maybe you need to forge your internet connection!"
        );
      }

      if (results.data) {
        setHistoricalChart(results.data);
        console.log(results.data);
      }
    } catch (error: TypeError | any) {
      throw new Error(
        `cannot fetch the data, maybe you need to forge your internet connection! ${error.message}`
      );
    }
  }, [currency, days]);

  useEffect(() => {
    fetchCryptoDataHistory();
  }, [fetchCryptoDataHistory, days]);

  return (
    <div>
      <h1>booo</h1>
    </div>
  );
};
