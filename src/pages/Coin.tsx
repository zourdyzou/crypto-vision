import React, { useState, useCallback, useEffect } from "react";

import axios from "axios";
import ReactHtmlParser from "react-html-parser";

import { useParams } from "react-router-dom";
import {
  LinearProgress,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";

import { CoinInfo } from "../components/organisms/Coininfo";
import { useGlobalContext } from "../context/CryptoContext";
import { SingleCoin } from "../types/data-types";
import { singleCoinURL } from "../config/api";
import { numberWithCommas } from "../helper/numberWithCommas";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },
}));

export const CoinPage: React.FC = () => {
  const { id }: any = useParams();
  const { currency, symbol }: any = useGlobalContext();

  const [singleCoin, setSingleCoin] = useState<SingleCoin | any>();

  const classes = useStyles();

  const fetchCryptoDataHistory = useCallback(async () => {
    try {
      const results = await axios.get(singleCoinURL(id), {
        method: "GET",
        headers: {
          "x-rapidapi-host": "coingecko.p.rapidapi.com",
          "x-rapidapi-key":
            "6d0a2dc270mshe9cc297632fb8cfp13a548jsn44fd6a2bd2a3",
        },
      });

      if (results.status >= 301 && results.status <= 503) {
        throw new Error(
          "cannot fetch the data, maybe you need to forge your internet connection!"
        );
      }

      if (results.data) {
        setSingleCoin(results.data);
        console.log(results.data);
      }
    } catch (error: TypeError | any) {
      throw new Error(
        `cannot fetch the data, maybe you need to forge your internet connection! ${error.message}`
      );
    }
  }, [id]);

  useEffect(() => {
    fetchCryptoDataHistory();
  }, [fetchCryptoDataHistory]);

  if (!singleCoin) {
    return <LinearProgress style={{ backgroundColor: "gold" }} />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={singleCoin?.image.large}
          alt={singleCoin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {singleCoin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(singleCoin?.description.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(singleCoin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                Number(
                  singleCoin?.market_data.current_price[currency.toLowerCase()]
                )
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                Number(
                  singleCoin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )
              )}
              M
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={singleCoin} />
    </div>
  );
};
