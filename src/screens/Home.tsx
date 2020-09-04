import {format} from "date-fns";
import React, {useState} from "react";
import {
  Alert,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";

import backgroundImage from "../assets/images/background.png";
import logo from "../assets/images/logo.png";
import {Button} from "../components/Button";
import {CurrencyInput} from "../components/CurrencyInput";
import {KeyboardAwareScrollView} from "../components/KeyboardAwareScrollView";
import colors from "../constants/colors";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.blue
  },
  content: {
    paddingTop: screen.height * 0.2,
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
  }
});

export function Home() {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [quoteCurrency, setQuoteCurrency] = useState("GBP");
  const [conversionRate, setConvertionRate] = useState(0.843);
  const [date, setDate] = useState(new Date("2020-09-04"));

  const swapCurrencies = () => {};
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
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
            value="123"
            currency="USD"
            onChangeCurrency={() => {
              Alert.alert("it works!");
            }}
          />
          <CurrencyInput
            value="123"
            currency="GBP"
            disabled
            onChangeCurrency={() => {
              Alert.alert("it works!");
            }}
          />
        </View>
        <Text style={styles.text}>
          {`1 ${baseCurrency} = ${conversionRate} ${quoteCurrency} as of ${format(
            date,
            "MMM do, yyyy"
          )}`}
        </Text>
        <Button text="Reverse Currencies" onPress={() => swapCurrencies()} />
      </KeyboardAwareScrollView>
    </View>
  );
}
