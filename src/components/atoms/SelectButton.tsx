import React from "react";
import { makeStyles } from "@material-ui/core";

interface Props {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => any;
}

export const SelectButton: React.FC<Props> = ({
  children,
  selected,
  onClick,
}) => {
  const useStyles = makeStyles(() => ({
    selectButton: {
      border: "1px solid gold",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "gold" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "gold",
        color: "black",
      },
      width: "22%",
      //   margin: 5,
    },
  }));

  const classes = useStyles();

  return (
    <button className={classes.selectButton} onClick={onClick}>
      {children}
    </button>
  );
};
