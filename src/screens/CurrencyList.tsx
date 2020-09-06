import React from "react";
import {FlatList, StatusBar, StyleSheet, View} from "react-native";
import {useSafeArea} from "react-native-safe-area-context";
import Entypo from "react-native-vector-icons/Entypo";
import {connect} from "react-redux";
import {
  setBaseCurrency,
  setQuoteCurrency,
  startRatesRequest,
  setConversionRate,
  setCurrencies
} from "../store/reducers/currency";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

import {RowItem, RowSeparator} from "../components/RowItem";
import colors from "../constants/colors";
import currencies from "../data/currencies";
import {ModalStackParamsList} from "../types/types.js";
import {RootState} from "../store/reducers";
import {IRates} from "../store/types/currency";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue
  }
});

// Props interface
interface IProps {
  baseCurrency: string;
  quoteCurrency: string;
  rates: IRates;
  setNewRate(rate: number): void;
  setCurrencyList(list: string[]): void;
  getLatestRates(currency: string): void;
  changeBaseCurrency(currency: string): void;
  changeQuoteCurrency(currency: string): void;
  navigation: StackNavigationProp<ModalStackParamsList, "CurrencyList">;
  route: RouteProp<ModalStackParamsList, "CurrencyList">;
}

const getIcon = (selected: boolean) =>
  selected ? (
    <View style={styles.icon}>
      <Entypo name="check" size={20} color={colors.white} />
    </View>
  ) : null;

const CurrencyList = ({
  baseCurrency,
  quoteCurrency,
  changeBaseCurrency,
  changeQuoteCurrency,
  getLatestRates,
  navigation,
  setNewRate,
  setCurrencyList,
  rates,
  route
}: IProps) => {
  const insets = useSafeArea();
  const {isBaseCurrency} = route.params;

  const onPressItem = (item: string) => {
    if (isBaseCurrency) {
      changeBaseCurrency(item);
      if (baseCurrency === quoteCurrency) setNewRate(1);
      getLatestRates(item);
      const currencyList = Object.keys(rates);
      setCurrencyList(currencyList);
    } else {
      changeQuoteCurrency(item);
      const newRate = baseCurrency !== quoteCurrency ? rates[item] : 1;
      console.log(newRate);
      setNewRate(newRate);
    }
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <FlatList
        data={currencies}
        renderItem={({item}) => {
          let selected = false;

          if (isBaseCurrency && item === baseCurrency) {
            selected = true;
          } else if (!isBaseCurrency && item === quoteCurrency) {
            selected = true;
          }

          return (
            <RowItem
              title={item}
              onPress={() => onPressItem(item)}
              rightIcon={getIcon(selected)}
            />
          );
        }}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={() => <RowSeparator />}
        ListFooterComponent={() => (
          <View style={{paddingBottom: insets.bottom}} />
        )}
      />
    </View>
  );
};

const mapStateToProps = ({
  currency: {baseCurrency, quoteCurrency, rates}
}: RootState) => ({
  baseCurrency,
  quoteCurrency,
  rates
});

const mapDispatchToProps = (dispatch: any) => ({
  changeBaseCurrency: (currency: string) => dispatch(setBaseCurrency(currency)),
  changeQuoteCurrency: (currency: string) =>
    dispatch(setQuoteCurrency(currency)),
  getLatestRates: (currency: string) => dispatch(startRatesRequest(currency)),
  setNewRate: (rate: number) => dispatch(setConversionRate(rate)),
  setCurrencyList: (currencyList: string[]) =>
    dispatch(setCurrencies(currencyList))
});

export const ConnectedCurrencyList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyList);
