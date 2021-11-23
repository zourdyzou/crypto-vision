import React, { useCallback, useEffect, useState } from "react";

import axios from "axios";

import { Line } from "react-chartjs-2";
import { useGlobalContext } from "../../context/CryptoContext";
import { historicalChartURL } from "../../config/api";
import { HistoryChart, SingleCoin } from "../../types/data-types";
import {
  CircularProgress,
  createTheme,
  makeStyles,
  Theme,
  ThemeProvider,
} from "@material-ui/core";
import { chartDays } from "../../config/data";
import { SelectButton } from "../atoms/SelectButton";

interface Props {
  coin: SingleCoin;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

export const CoinInfo: React.FC<Props> = ({ coin }) => {
  const { currency }: any = useGlobalContext();
  const classes = useStyles();

  const [days, setDays] = useState(1);
  const [historicalChart, setHistoricalChart] = useState<HistoryChart>();

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
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {historicalChart?.prices ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicalChart?.prices.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;

                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicalChart?.prices.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />

            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => {
                return (
                  <SelectButton
                    key={day.value}
                    onClick={() => setDays(day.value)}
                    selected={day.value === days}
                  >
                    {day.label}
                  </SelectButton>
                );
              })}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};
