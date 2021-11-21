import React, {
  useState,
  useEffect,
  createContext,
  SetStateAction,
  Dispatch,
  useContext,
} from "react";

export interface AppContextTypes {
  currency: string | null;
  symbol: string | null;
  setCurrency: Dispatch<SetStateAction<string>> | null;
  setSymbol: Dispatch<SetStateAction<string>> | null;
}

interface Props {
  children: React.ReactNode;
}

export const AppContext = createContext<AppContextTypes | null>(null);

export const AppProvider = ({ children }: Props): JSX.Element => {
  const [currency, setCurrency] = useState<string>("PLN");
  const [symbol, setSymbol] = useState<string>("zł");

  useEffect(() => {
    if (currency === "PLN") {
      setSymbol("zł");
    } else if (currency === "USD") {
      setSymbol("$");
    } else if (currency === "EUR") {
      setSymbol("€");
    } else if (currency === "GBP") {
      setSymbol("£");
    } else if (currency === "CHF") {
      setSymbol("Fr.");
    }
  }, [currency]);

  return (
    <AppContext.Provider
      value={{
        symbol,
        currency,
        setSymbol,
        setCurrency,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
