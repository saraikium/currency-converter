/* eslint-disable no-undef */
import styled from "styled-components/native";
import colors from "../constants/colors";

type IStyledText = {
  color?: string;
  fontSize?: string;
};

export const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

export const RegularText = styled.Text<IStyledText>`
  font-family: OpenSans-Regular;
  font-size: ${({fontSize = "16px"}) => fontSize};
  color: ${({color = "black"}) => color};
`;

export const BoldText = styled(RegularText)`
  font-family: OpenSans-Bold;
  font-weight: 900;
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
