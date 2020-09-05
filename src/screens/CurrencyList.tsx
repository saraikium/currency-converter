import React from "react";
import {FlatList, StatusBar, StyleSheet, View} from "react-native";
import {useSafeArea} from "react-native-safe-area-context";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RowItem, RowSeparator} from "../components/RowItem";
import colors from "../constants/colors";
import currencies from "../data/currencies.js";
import {ModalStackParamsList} from "../types/types.js";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  }
});

interface Props {
  navigation: StackNavigationProp<ModalStackParamsList, "CurrencyList">;
  route: RouteProp<ModalStackParamsList, "CurrencyList">;
}

export const CurrencyList = ({navigation}: Props) => {
  const insets = useSafeArea();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <FlatList
        data={currencies}
        renderItem={({item}) => {
          return (
            <RowItem
              title={item}
              onPress={() => {
                navigation.pop();
              }}
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
