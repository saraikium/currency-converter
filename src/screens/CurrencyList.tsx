import React from "react";
import {FlatList, StatusBar, View} from "react-native";
import {useSafeArea} from "react-native-safe-area-context";
import styled, {ThemeProvider} from "styled-components/native";
import Entypo from "react-native-vector-icons/Entypo";

import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

import {RowItem} from "../components/RowItem";
import {Separator} from "../components/styledComponents/StyledComponents";
import colors from "../constants/themes";
import {
  setBaseCurrency,
  setQuoteCurrency,
  startRatesRequest
} from "../store/reducersAndActions/currency";

import {ModalStackParamsList} from "../types/types.js";
import {useSelector, useDispatch} from "react-redux";
import {currencySelector, themeSelector} from "../store/selectors";

const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
`;
const Icon = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.blue};
`;

// Props interface
interface IProps {
  navigation: StackNavigationProp<ModalStackParamsList, "CurrencyList">;
  route: RouteProp<ModalStackParamsList, "CurrencyList">;
}

const getIcon = (selected: boolean) =>
  selected ? (
    <Icon>
      <Entypo name="check" size={20} color={colors.white} />
    </Icon>
  ) : null;

export const CurrencyList: React.FC<IProps> = ({navigation, route}) => {
  const insets = useSafeArea();
  const {isBaseCurrency} = route.params;

  //global state
  const dispatch = useDispatch();
  const theme = useSelector(themeSelector);
  const {baseCurrency, quoteCurrency, currencies} = useSelector(
    currencySelector
  );

  const onPressItem = (item: string) => {
    if (isBaseCurrency) {
      dispatch(setBaseCurrency(item));
      dispatch(startRatesRequest(item));
    } else {
      dispatch(setQuoteCurrency(item));
    }
    navigation.pop();
  };

  const renderItem = (item: string) => {
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
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <FlatList
        data={currencies}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={() => <Separator />}
        ListFooterComponent={() => (
          <View style={{paddingBottom: insets.bottom}} />
        )}
      />
    </Container>
  );
};
