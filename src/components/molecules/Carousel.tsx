import React, { useState, useCallback, useEffect } from "react";

import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { Link } from "react-router-dom";
import { TrendingCoins } from "../../types/data-types";
import { trendingCoins } from "../../config/api";
import { useGlobalContext } from "../../context/CryptoContext";
import { numberWithCommas } from "../../helper/numberWithCommas";
import { makeStyles, Theme } from "@material-ui/core";

export const CarouselCard: React.FC = () => {
  const useStyles = makeStyles((theme: Theme) => ({
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
    },
    cardCarousel: {
      padding: "10px 0",
      paddingBottom: "2rem",
    },
  }));

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  const classes = useStyles();
  const [trending, setTrending] = useState<Array<TrendingCoins> | any>([]);
  const { currency, symbol }: any = useGlobalContext();

  const fetchTrendingCoins = useCallback(async () => {
    const result = await axios.get(trendingCoins(currency), {
      method: "GET",
      headers: {
        "x-rapidapi-host": "coingecko.p.rapidapi.com",
        "x-rapidapi-key": "6d0a2dc270mshe9cc297632fb8cfp13a548jsn44fd6a2bd2a3",
      },
    });

    if (result.status >= 301 && result.status <= 503) {
      throw new Error(
        "cannot fetch the data, maybe you need to forge your internet connection!"
      );
    }

    if (result.data) {
      setTrending(result.data);
    }
  }, [currency]);

  useEffect(() => {
    fetchTrendingCoins();
  }, [fetchTrendingCoins, currency]);

  return (
    <Carousel
      infinite
      autoPlay
      responsive={responsive}
      itemClass={classes.cardCarousel}
      arrows={false}
      swipeable={true}
    >
      {trending.map((coin: TrendingCoins) => {
        let profit =
          coin?.price_change_percentage_24h >= 0
            ? coin?.price_change_percentage_24h
            : 0;

        return (
          <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
            <img
              src={coin?.image}
              alt={coin.name}
              height="80"
              style={{ marginBottom: 10 }}
            />
            <span>
              {coin?.symbol}
              &nbsp;
              <span
                style={{
                  color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                  fontWeight: 500,
                }}
              >
                {profit && "+"}
                {coin?.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </span>
            <span style={{ fontSize: 22, fontWeight: 500 }}>
              {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
            </span>
          </Link>
        );
      })}
    </Carousel>
  );
};
