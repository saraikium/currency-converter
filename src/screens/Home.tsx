import React, {useState, useContext} from "react";
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {SafeAreaView} from "react-native-safe-area-context";
import Entypo from "react-native-vector-icons/Entypo";
import {format} from "date-fns";
import {StackNavigationProp} from "@react-navigation/stack";

import backgroundImage from "../assets/images/background.png";
import logo from "../assets/images/logo.png";
import {Button} from "../components/Button";
import {CurrencyInput} from "../components/CurrencyInput";
import {KeyboardAwareScrollView} from "../components/KeyboardAwareScrollView";
import colors from "../constants/colors";
import {MainStackParamsList} from "../types/types";
import {CurrencyContext} from "../context/CurrencyContext";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.blue
  },
  content: {
    paddingTop: screen.height * 0.1,
    paddingBottom: 20
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  logoBackground: {
    width: screen.width * 0.45,
    height: screen.height * 0.45
  },
  logo: {
    position: "absolute",
    width: screen.width * 0.25,
    height: screen.height * 0.25
  },
  textHeader: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20
  },
  text: {
    fontSize: 14,
    color: colors.white,
    textAlign: "center"
  },
  inputContainer: {
    marginBottom: 10
  },
  options: {
    alignItems: "flex-end",
    marginRight: 20
  }
});

type HomeProps = {
  navigation: StackNavigationProp<MainStackParamsList, "Home">;
};

export function Home({navigation}: HomeProps) {
  const [currencyValue, setCurrencyValue] = useState("0");
  const [conversionRate] = useState(0.843);
  const [date] = useState(new Date("2020-09-04"));
  const {baseCurrency, quoteCurrency, swapCurrencies} = useContext(
    CurrencyContext
  );

  // Reverse currencies
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
        <View style={styles.options}>
          <TouchableOpacity onPress={() => navigation.navigate("Options")}>
            <Entypo name="cog" size={32} color={colors.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={backgroundImage}
            style={styles.logoBackground}
            resizeMode="contain"
          />
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </View>
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
}
