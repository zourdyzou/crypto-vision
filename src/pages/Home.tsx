import axios from "axios";
import React from "react";
import { Banner } from "../components/atoms/Banner";

export const HomePage: React.FC = () => {
  const fetchData = React.useCallback(async (currency) => {
    const result = await axios.get(
      `https://coingecko.p.rapidapi.com/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "coingecko.p.rapidapi.com",
          "x-rapidapi-key":
            "6d0a2dc270mshe9cc297632fb8cfp13a548jsn44fd6a2bd2a3",
        },
      }
    );

    const { data } = result;

    console.log(data);
  }, []);

  // React.useEffect(() => {
  //   fetchData("USD");
  // }, [fetchData]);

  return (
    <>
      <Banner />
    </>
  );
};
