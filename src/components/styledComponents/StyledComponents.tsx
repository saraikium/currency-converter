/* eslint-disable no-undef */
import React from "react";
import {StyleSheet} from "react-native";
import styled from "styled-components/native";
import colors from "../../constants/themes";
import {Themed} from "../../types/styledComponentTypes";

type IStyledText = {
  color?: string;
  fontSize?: string;
};

export const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

export const RegularText = styled.Text<IStyledText>`
  font-family: OpenSans-Regular;
  text-align: center;
  font-size: ${({fontSize = "16px"}) => fontSize};
  color: ${({color = "black"}) => color};
`;

export const BoldText = styled(RegularText)`
  font-family: OpenSans-Bold;
  font-weight: 900;
`;

export const HeaderText = styled(BoldText)`
  font-family: "OpenSans-Bold";
  color: ${colors.white};
  font-size: 30px;
  margin-bottom: 20px;
  margin-top: 10px;
  text-align: center;
`;

export const Container = styled.View`
  border-radius: 5px;
  flex-direction: "row";
  justify-content: "flex-start";
`;

export const Input = styled.TextInput`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  font-weight: 600;
  font-family: OpenSans-Regular;
  color: ${colors.textLight};
`;

const StyledSeparator = styled.View<Themed>`
  background-color: ${({theme}) => theme.themeColor};
  margin: 0px 20px;
`;

export const Separator = () => (
  <StyledSeparator style={{height: StyleSheet.hairlineWidth}} />
);
