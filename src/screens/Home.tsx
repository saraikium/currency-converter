import {format} from "date-fns";
import React, {useEffect, useState, useCallback} from "react";
import {StatusBar, TouchableOpacity} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components/native";
import {StackNavigationProp} from "@react-navigation/stack";

import {Button} from "../components/Button";
import {CurrencyInput} from "../components/CurrencyInput";
import {KeyboardAwareScrollView} from "../components/KeyboardAwareScrollView";
import {Logo} from "../components/Logo";
import {HeaderText, RegularText} from "../components/StyledComponents";
import colors from "../constants/colors";
import {
  setBaseCurrency,
  setCurrencies,
  setQuoteCurrency,
  startRatesRequest
} from "../store/reducers/currency";
import {currencySelector} from "../store/selectors";

import {MainStackParamsList} from "../types/types";

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

interface IProps {
  navigation: StackNavigationProp<MainStackParamsList, "Home">;
}

export const Home = ({navigation}: IProps) => {
  //local state
  const [currencyValue, setCurrencyValue] = useState("0");
  const [conversionRate, setConversionRate] = useState(1);

  // Access the global state

  const dispatch = useDispatch();
  const {quoteCurrency, baseCurrency, rates, date} = useSelector(
    currencySelector
  );

  // Swap currencies on reverse button Click
  const swapCurrencies = useCallback(() => {
    dispatch(startRatesRequest(quoteCurrency));
    dispatch(setBaseCurrency(quoteCurrency));
    dispatch(setQuoteCurrency(baseCurrency));
    const currencyList = Object.keys(rates);
    dispatch(setCurrencies(currencyList));
  }, [quoteCurrency, baseCurrency, rates, dispatch]);

  useEffect(() => {
    dispatch(startRatesRequest(baseCurrency));
  }, []);

  useEffect(() => {
    let newRate: number = rates[quoteCurrency];
    if (!newRate) newRate = 1;
    setConversionRate(newRate);
    const currencyList = Object.keys(rates);
    setCurrencies(currencyList);
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
