import React from "react";
import {TextInputProps} from "react-native";
import styled from "styled-components/native";
import {BoldText, Input} from "./StyledComponents";

import colors from "../constants/colors";

const InputButton = styled.TouchableOpacity`
  background-color: ${colors.white};
  padding: 15px;
  border-color: ${colors.border};
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-right-width: 1px;
`;

interface IContainerProps {
  disabled: boolean;
}
// eslint-disable-next-line no-undef
const InputContainer = styled.View<IContainerProps>`
  border-radius: 5px;
  flex-direction: row;
  justify-content: flex-start;
  margin: 10px 20px;
  background-color: ${({disabled}) =>
    disabled ? colors.offWhite : colors.white};
`;

interface ICurrencyInputProps extends TextInputProps {
  currency: string;
  value: string;
  disabled?: boolean;
  onChangeCurrency(): void;
}

export const CurrencyInput = ({
  currency,
  disabled = false,
  onChangeCurrency,
  ...props
}: ICurrencyInputProps) => {
  return (
    <InputContainer disabled={disabled}>
      <InputButton onPress={onChangeCurrency}>
        <BoldText color={colors.blue}>{currency}</BoldText>
      </InputButton>
      <Input editable={!disabled} {...props} />
    </InputContainer>
  );
};
