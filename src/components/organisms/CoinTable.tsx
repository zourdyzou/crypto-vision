import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

import { TrendingCoins } from "../../types/data-types";

import {
  Container,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";

import { coinLists } from "../../config/api";
import { useGlobalContext } from "../../context/CryptoContext";
import { numberWithCommas } from "../../helper/numberWithCommas";
import { createTheme, Theme } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) => ({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
}));

export const CoinTable: React.FC = () => {
  const { currency, symbol }: any = useGlobalContext();

  const classes = useStyles();
  const history = useHistory();

  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const fetchCoinsData = useCallback(async () => {
    try {
      setLoading(true);

      const results = await axios.get(coinLists(currency), {
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
        setLoading(false);
        setCoins(results.data);
      }
    } catch (error: TypeError | any) {
      setLoading(false);
      throw new Error(
        `cannot fetch the data, maybe you need to forge your internet connection! ${error.message}`
      );
    }
  }, [currency]);

  useEffect(() => {
    fetchCoinsData();
  }, [fetchCoinsData, currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin: { name: string; symbol: string }) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search your favourite crypto currency..."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table aria-label="simple-table">
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? undefined : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10) // pagination
                  .map((row: TrendingCoins) => {
                    const profit =
                      row?.price_change_percentage_24h >= 0
                        ? row?.price_change_percentage_24h
                        : 0;

                    return (
                      <TableRow
                        onClick={() => history.push(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination
          count={Number((handleSearch()?.length / 10).toFixed(0))}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};
