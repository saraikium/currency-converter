import React from "react";
import {StyleSheet} from "react-native";
import styled from "styled-components/native";
import {Themed} from "../../types/styledComponentTypes";

export const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

export const Container = styled.View`
  border-radius: 5px;
  flex-direction: "row";
  justify-content: "flex-start";
`;

const StyledSeparator = styled.View<Themed>`
  background-color: ${({theme}) => theme.themeColor};
  margin: 0px 20px;
`;

export const Separator = () => (
  <StyledSeparator style={{height: StyleSheet.hairlineWidth}} />
);
