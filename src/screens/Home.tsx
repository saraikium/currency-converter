import {format} from "date-fns";
import React, {useState, useEffect} from "react";
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import {StackNavigationProp} from "@react-navigation/stack";

import {
  startRatesRequest,
  setBaseCurrency,
  setQuoteCurrency
} from "../store/reducers/currency";

import {Button} from "../components/Button";
import {CurrencyInput} from "../components/CurrencyInput";
import {KeyboardAwareScrollView} from "../components/KeyboardAwareScrollView";
import colors from "../constants/colors";
import {MainStackParamsList} from "../types/types";
import {connect} from "react-redux";
import {RootState} from "../store/reducers";
import {IRates} from "../store/types/currency";
import {Logo} from "../components/Logo";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.blue,
    fontFamily: "Open Sans"
  },
  content: {
    paddingTop: screen.height * 0.01,
    paddingBottom: 10
  },
  textHeader: {
    color: colors.white,
    fontFamily: "OpenSans-Bold",
    fontWeight: "800",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20
  },
  text: {
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
    color: colors.white,
    textAlign: "center"
  },
  inputContainer: {
    marginBottom: 10,
    fontFamily: "Open Sans"
  },
  options: {
    alignItems: "flex-end",
    marginRight: 20
  }
});

type IProps = {
  baseCurrency: string;
  quoteCurrency: string;
  date: Date;
  conversionRate: number;
  rates: IRates;
  getLatestRates(currency: string): any;
  changeBaseCurrency(value: string): void;
  changeQuoteCurrency(value: string): void;
  navigation: StackNavigationProp<MainStackParamsList, "Home">;
};

const Home = ({
  navigation,
  baseCurrency,
  quoteCurrency,
  date,
  rates,
  changeBaseCurrency,
  changeQuoteCurrency,
  getLatestRates
}: IProps) => {
  const [currencyValue, setCurrencyValue] = useState("0");
  const [conversionRate, setConversionRate] = useState(1);
  // Swap currencies on reverse button Click
  const swapCurrencies = () => {
    getLatestRates(quoteCurrency);
    changeBaseCurrency(quoteCurrency);
    changeQuoteCurrency(baseCurrency);
  };

  useEffect(() => {
    getLatestRates(baseCurrency);
  }, []);

  useEffect(() => {
    let newRate: number = rates[quoteCurrency];
    if (!newRate) newRate = 1;
    setConversionRate(newRate);
  }, [quoteCurrency, baseCurrency, rates]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
        <View style={styles.options}>
          <TouchableOpacity onPress={() => navigation.navigate("Options")}>
            <Entypo name="cog" size={32} color={colors.white} />
          </TouchableOpacity>
        </View>
        <Logo />
        <Text style={styles.textHeader}>Currency Converter</Text>
        <View style={styles.inputContainer}>
          <CurrencyInput
            value={currencyValue}
            currency={baseCurrency}
            onChangeText={(text) => {
              const value = parseFloat(text);
              setCurrencyValue(value ? value.toString() : "0");
            }}
            keyboardType="numeric"
            onChangeCurrency={() => {
              navigation.push("CurrencyList", {
                title: "Base Currency",
                isBaseCurrency: true
              });
            }}
          />

          <CurrencyInput
            value={`${(parseFloat(currencyValue) * conversionRate).toFixed(2)}`}
            currency={quoteCurrency}
            disabled
            keyboardType="numeric"
            onChangeCurrency={() => {
              navigation.push("CurrencyList", {
                title: "Quote Currency",
                isBaseCurrency: false
              });
            }}
          />
        </View>
        <Text style={styles.text}>
          {`1 ${baseCurrency} = ${conversionRate} ${quoteCurrency} as of ${format(
            date,
            "MMM do, yyyy"
          )}`}
        </Text>
        <Button text="Reverse Currencies" onPress={swapCurrencies} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const mapStateTopProps = ({
  currency: {baseCurrency, quoteCurrency, rates, date, conversionRate}
}: RootState) => ({
  rates,
  quoteCurrency,
  baseCurrency,
  date,
  conversionRate
});

const mapDispatchToProps = (dispatch: any) => ({
  getLatestRates: (currency: string) => dispatch(startRatesRequest(currency)),
  changeBaseCurrency: (currency: string) => dispatch(setBaseCurrency(currency)),
  changeQuoteCurrency: (currency: string) =>
    dispatch(setQuoteCurrency(currency))
});

export const ConnectedHome = connect(
  mapStateTopProps,
  mapDispatchToProps
)(Home);
