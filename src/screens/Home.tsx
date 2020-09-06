import {format} from "date-fns";
import React, {useState, useEffect} from "react";
import {StatusBar, TouchableOpacity} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import {StackNavigationProp} from "@react-navigation/stack";

import {
  startRatesRequest,
  setBaseCurrency,
  setQuoteCurrency,
  setCurrencies
} from "../store/reducers/currency";

import {Button} from "../components/Button";
import {CurrencyInput} from "../components/CurrencyInput";
import {KeyboardAwareScrollView} from "../components/KeyboardAwareScrollView";
import colors from "../constants/colors";
import {MainStackParamsList, ICommonProps} from "../types/types";
import {connect} from "react-redux";
import {RootState} from "../store/reducers";
import {Logo} from "../components/Logo";
import {HeaderText, RegularText} from "../components/StyledComponents";
import styled from "styled-components/native";
import {IRates} from "../store/types/currency";

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  background-color: ${colors.blue};
`;

const InputContainer = styled.View`
  margin-bottom: 10px;
`;

const OptionsContainer = styled.View`
  align-items: flex-end;
  margin-right: 20px;
`;

interface IProps extends ICommonProps {
  date: Date;
  rates: IRates;
  currencies: string[];
  conversionRate: number;
  setCurrencyList(list: string[]): void;
  navigation: StackNavigationProp<MainStackParamsList, "Home">;
}

const Home = (props: IProps) => {
  const {
    navigation,
    baseCurrency,
    quoteCurrency,
    date,
    rates,
    changeBaseCurrency,
    changeQuoteCurrency,
    getLatestRates,
    setCurrencyList
  } = props;
  const [currencyValue, setCurrencyValue] = useState("0");
  const [conversionRate, setConversionRate] = useState(1);
  // Swap currencies on reverse button Click
  const swapCurrencies = () => {
    getLatestRates(quoteCurrency);
    changeBaseCurrency(quoteCurrency);
    changeQuoteCurrency(baseCurrency);
    const currencyList = Object.keys(rates);
    setCurrencyList(currencyList);
  };

  useEffect(() => {
    getLatestRates(baseCurrency);
  }, []);

  useEffect(() => {
    let newRate: number = rates[quoteCurrency];
    if (!newRate) newRate = 1;
    setConversionRate(newRate);
    const currencyList = Object.keys(rates);
    setCurrencyList(currencyList);
  }, [quoteCurrency, baseCurrency, rates]);

  return (
    <StyledSafeAreaView>
      <KeyboardAwareScrollView>
        <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
        <OptionsContainer>
          <TouchableOpacity onPress={() => navigation.navigate("Options")}>
            <Entypo name="cog" size={32} color={colors.white} />
          </TouchableOpacity>
        </OptionsContainer>
        <Logo />
        <HeaderText>Currency Converter</HeaderText>
        <InputContainer>
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
        </InputContainer>
        <RegularText fontSize="14px" color={colors.white}>
          {`1 ${baseCurrency} = ${conversionRate} ${quoteCurrency} as of ${format(
            date,
            "MMM do, yyyy"
          )}`}
        </RegularText>
        <Button text="Reverse Currencies" onPress={swapCurrencies} />
      </KeyboardAwareScrollView>
    </StyledSafeAreaView>
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
    dispatch(setQuoteCurrency(currency)),
  setCurrencyList: (currencyList: string[]) =>
    dispatch(setCurrencies(currencyList))
});

export const ConnectedHome = connect(
  mapStateTopProps,
  mapDispatchToProps
)(Home);
