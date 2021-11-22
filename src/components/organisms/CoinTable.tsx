import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";

import {
  Container,
  LinearProgress,
  Paper,
  Table,
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
import { createTheme, Theme } from "@material-ui/core";

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
  const { currency }: any = useGlobalContext();

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
          onChange={(e) => setSearch(e.target.value)}
        />
      </Container>

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
          </Table>
        )}
      </TableContainer>
    </ThemeProvider>
  );
};
