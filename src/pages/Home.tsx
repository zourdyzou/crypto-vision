import React from "react";
import { Banner } from "../components/atoms/Banner";
import { CoinTable } from "../components/organisms/CoinTable";

export const HomePage: React.FC = () => {
  return (
    <>
      <Banner />
      <CoinTable />
    </>
  );
};
