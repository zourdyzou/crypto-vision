import React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Theme,
  Select,
  MenuItem,
} from "@material-ui/core";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useGlobalContext } from "../../context/CryptoContext";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
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

export const Header: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const { currency, setCurrency }: any = useGlobalContext();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => history.push(`/`)}
              variant="h6"
              className={classes.title}
            >
              Crypto Vision
            </Typography>

            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              style={{ width: 100, height: 40, marginLeft: 15 }}
              onChange={(
                e: React.ChangeEvent<{
                  value: unknown;
                }>
              ) => setCurrency(e.target.value as string)}
            >
              <MenuItem value={"PLN"}>PLN</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
