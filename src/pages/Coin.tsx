import React from "react";
import { CoinInfo } from "../components/organisms/Coininfo";

export const CoinPage: React.FC = () => {
  return (
    <div>
      <h1>Coin Page</h1>
      <CoinInfo coin={"bitcoin"} />
    </div>
  );
};
