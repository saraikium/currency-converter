/* eslint-disable */
import {format} from "date-fns";
import React, {useState} from "react";
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {TouchableOpacity} from "react-native-gesture-handler";
import Entypo from "react-native-vector-icons/Entypo";
//
import backgroundImage from "../assets/images/background.png";
import logo from "../assets/images/logo.png";
import {Button} from "../components/Button";
import {CurrencyInput} from "../components/CurrencyInput";
import {KeyboardAwareScrollView} from "../components/KeyboardAwareScrollView";
import colors from "../constants/colors";
import {StackNavigationProp} from "@react-navigation/stack";
import {MainStackParamsList} from "../types/types";

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
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [quoteCurrency, setQuoteCurrency] = useState("GBP");
  const [conversionRate, setConvertionRate] = useState(0.843);
  const [date, setDate] = useState(new Date("2020-09-04"));

  const swapCurrencies = () => {};
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
            value="123"
            currency="USD"
            onChangeCurrency={() => {
              navigation.push("CurrencyList", {
                title: "Base Currency",
                activeCurrency: baseCurrency
              });
            }}
          />
          <CurrencyInput
            value="123"
            currency="GBP"
            disabled
            onChangeCurrency={() => {
              navigation.push("CurrencyList", {
                title: "Quote Currency",
                activeCurrency: quoteCurrency
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
        <Button text="Reverse Currencies" onPress={() => swapCurrencies()} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
