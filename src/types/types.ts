interface CurrencyListProps {
  title: string;
  isBaseCurrency: boolean;
}

export type MainStackParamsList = {
  Home: undefined;
  Options: undefined;
  Themes: undefined;
  CurrencyList: CurrencyListProps;
};

export type ModalStackParamsList = {
  Main: undefined;
  CurrencyList: CurrencyListProps;
};

export type AuthStackParamsList = {
  Modal: undefined;
  LoginScreen: undefined;
};

export interface ICommonProps {
  baseCurrency: string;
  quoteCurrency: string;
  getLatestRates(currency: string): void;
  changeBaseCurrency(currency: string): void;
  changeQuoteCurrency(currency: string): void;
}
