import React, {useContext} from "react";
import {FlatList, StatusBar, StyleSheet, View} from "react-native";
import {useSafeArea} from "react-native-safe-area-context";
import Entypo from "react-native-vector-icons/Entypo";

import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

import {RowItem, RowSeparator} from "../components/RowItem";
import colors from "../constants/colors";
import currencies from "../data/currencies.js";
import {ModalStackParamsList} from "../types/types.js";
import {CurrencyContext} from "../context/CurrencyContext";

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

interface Props {
  navigation: StackNavigationProp<ModalStackParamsList, "CurrencyList">;
  route: RouteProp<ModalStackParamsList, "CurrencyList">;
}

const getIcon = (selected: boolean) =>
  selected ? (
    <View style={styles.icon}>
      <Entypo name="check" size={20} color={colors.white} />
    </View>
  ) : null;

export const CurrencyList = ({navigation, route}: Props) => {
  const insets = useSafeArea();
  const {
    baseCurrency,
    quoteCurrency,
    setBaseCurrency,
    setQuoteCurrency
  } = useContext(CurrencyContext);

  const {isBaseCurrency} = route.params;

  const onPressItem = (item: string) => {
    if (isBaseCurrency) {
      setBaseCurrency(item);
    } else {
      setQuoteCurrency(item);
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
