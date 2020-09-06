/* eslint-disable no-undef */
import styled from "styled-components/native";
import {View} from "react-native";

type IStyledText = {
  color?: string;
  fontSize?: string;
};

export const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

// eslint-disable-next-line no-undef
export const RegularText = styled.Text<IStyledText>`
  font-family: OpenSans-Regular;
  font-size: ${({fontSize = "16px"}) => fontSize};
  color: ${({color = "black"}) => color};
`;

export const BoldText = styled(RegularText)`
  font-family: OpenSans-Bold;
`;
