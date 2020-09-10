import React from "react";
import {TextInputProps} from "react-native";
import {useSelector} from "react-redux";
import styled from "styled-components/native";

import {Input, InputContainer} from "../components/styledComponents";
import {themeSelector} from "../store/selectors";
import {Themed} from "../types/styledComponentTypes";
import {TextBold} from "./styledComponents";

const InputButton = styled.TouchableOpacity<Themed>`
  background-color: ${(props) => props.theme.white};
  padding: 15px;
  border-color: ${({theme}) => theme.themeColor};
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-right-width: 1px;
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
        <TextBold color={theme.themeColor}>{currency}</TextBold>
      </InputButton>
      <Input editable={!disabled} {...props} />
    </InputContainer>
  );
};
