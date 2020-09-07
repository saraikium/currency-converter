import React from "react";
import {TextInputProps} from "react-native";
import styled from "styled-components/native";
import {BoldText, Input} from "./styledComponents/StyledComponents";

import colors from "../constants/themes";
import {Themed} from "../types/styledComponentTypes";
import {useSelector} from "react-redux";
import {themeSelector} from "../store/selectors";

const InputButton = styled.TouchableOpacity<Themed>`
  background-color: ${(props) => props.theme.white};
  padding: 15px;
  border-color: ${({theme}) => theme.themeColor};
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
  const theme = useSelector(themeSelector);
  return (
    <InputContainer disabled={disabled}>
      <InputButton onPress={onChangeCurrency}>
        <BoldText color={theme.themeColor}>{currency}</BoldText>
      </InputButton>
      <Input editable={!disabled} {...props} />
    </InputContainer>
  );
};
