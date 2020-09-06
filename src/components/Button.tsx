import React from "react";
import styled from "styled-components/native";
import {BoldText} from "./StyledComponents";
import colors from "../constants/colors";
import reverseIcon from "../assets/images/reverse.png";

const ButtonIcon = styled.Image`
  margin-right: 10px;
  width: 20px;
  height: 20px;
`;

const StyledButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

interface ButtonProps {
  text: string;
  onPress(): void;
}

export const Button = ({onPress, text}: ButtonProps) => {
  return (
    <StyledButton onPress={onPress}>
      <ButtonIcon source={reverseIcon} resizeMode="contain" />
      <BoldText color={colors.white}>{text}</BoldText>
    </StyledButton>
  );
};
