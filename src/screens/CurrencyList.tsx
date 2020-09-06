import React from "react";
import {FlatList, StatusBar, View} from "react-native";
import {useSafeArea} from "react-native-safe-area-context";
import {connect} from "react-redux";
import styled from "styled-components/native";
import Entypo from "react-native-vector-icons/Entypo";

import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

import {RowItem} from "../components/RowItem";
import {Separator} from "../components/StyledComponents";
import colors from "../constants/colors";
import {RootState} from "../store/reducers";
import {
  setBaseCurrency,
  setQuoteCurrency,
  startRatesRequest
} from "../store/reducers/currency";
import {ICommonProps, ModalStackParamsList} from "../types/types.js";

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
interface IProps extends ICommonProps {
  currencies: string[];
  navigation: StackNavigationProp<ModalStackParamsList, "CurrencyList">;
  route: RouteProp<ModalStackParamsList, "CurrencyList">;
}

const getIcon = (selected: boolean) =>
  selected ? (
    <Icon>
      <Entypo name="check" size={20} color={colors.white} />
    </Icon>
  ) : null;

const CurrencyList = (props: IProps) => {
  const {
    baseCurrency,
    quoteCurrency,
    changeBaseCurrency,
    changeQuoteCurrency,
    getLatestRates,
    currencies,
    navigation,
    route
  } = props;

  const insets = useSafeArea();
  const {isBaseCurrency} = route.params;

  const onPressItem = (item: string) => {
    if (isBaseCurrency) {
      changeBaseCurrency(item);
      getLatestRates(item);
    } else {
      changeQuoteCurrency(item);
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

const mapStateToProps = ({
  currency: {baseCurrency, quoteCurrency, currencies}
}: RootState) => ({
  baseCurrency,
  quoteCurrency,
  currencies
});

const mapDispatchToProps = (dispatch: any) => ({
  changeBaseCurrency: (currency: string) => dispatch(setBaseCurrency(currency)),
  changeQuoteCurrency: (currency: string) =>
    dispatch(setQuoteCurrency(currency)),
  getLatestRates: (currency: string) => dispatch(startRatesRequest(currency))
});

export const ConnectedCurrencyList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyList);
