interface CurrencyListProps {
  title: string;
  activeCurrency: string;
}

export type MainStackParamsList = {
  Home: undefined;
  Options: undefined;
  CurrencyList: CurrencyListProps;
};

export type ModalStackParamsList = {
  Main: undefined;
  CurrencyList: CurrencyListProps;
};
