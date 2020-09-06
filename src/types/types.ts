import {IRates} from "../store/types/currency";

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

export interface ICommonProps {
  baseCurrency: string;
  quoteCurrency: string;
  rates: IRates;
  getLatestRates(currency: string): void;
  changeBaseCurrency(currency: string): void;
  changeQuoteCurrency(currency: string): void;
}
