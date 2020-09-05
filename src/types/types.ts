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
