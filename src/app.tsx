import { makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { Header } from "./components/molecules/Header";
import { CoinPage } from "./pages/Coin";
import { HomePage } from "./pages/Home";

import "./app.css";

const useStyles = makeStyles((theme: Theme) => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

export const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.App}>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/coins/:id" component={CoinPage} />
      </Switch>
    </div>
  );
};
