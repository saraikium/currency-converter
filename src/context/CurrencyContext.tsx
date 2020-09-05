import React, {createContext, useState, Dispatch, SetStateAction} from "react";

interface ICurrencyContext {
  baseCurrency: string;
  quoteCurrency: string;
  setBaseCurrency: Dispatch<SetStateAction<string>>;
  setQuoteCurrency: Dispatch<SetStateAction<string>>;
  swapCurrencies(): void;
}

const defaultContextValue: ICurrencyContext = {
  baseCurrency: "USD",
  quoteCurrency: "GBP",
  setQuoteCurrency: () => {},
  setBaseCurrency: () => {},
  swapCurrencies: () => {}
};

export const CurrencyContext = createContext(defaultContextValue);

export const CurrencyContextProvider: React.FC = ({children}) => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [quoteCurrency, setQuoteCurrency] = useState("GBP");

  const swapCurrencies = () => {
    setBaseCurrency(quoteCurrency);
    setQuoteCurrency(baseCurrency);
  };

  const context: ICurrencyContext = {
    baseCurrency,
    setBaseCurrency,
    quoteCurrency,
    setQuoteCurrency,
    swapCurrencies
  };

  return (
    <CurrencyContext.Provider value={context}>
      {children}
    </CurrencyContext.Provider>
  );
};
