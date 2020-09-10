import React from "react";
import styled from "styled-components/native";
import {TextBold} from "./styledComponents";
import colors from "../constants/themes";
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

export const ReverseButton = ({onPress, text}: ButtonProps) => {
  return (
    <StyledButton onPress={onPress}>
      <ButtonIcon source={reverseIcon} resizeMode="contain" />
      <TextBold color={colors.white}>{text}</TextBold>
    </StyledButton>
  );
};
