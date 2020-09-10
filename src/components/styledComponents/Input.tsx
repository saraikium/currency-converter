import styled from "styled-components/native";
import {Themed} from "../../types/styledComponentTypes";
import colors from "../../constants/themes";

interface InputContainer {
  disabled: boolean;
}

export const Input = styled.TextInput<Themed>`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  font-weight: 600;
  font-family: OpenSans-Regular;
  color: ${({theme}) => theme.textLight};
`;

export const InputContainer = styled.View<InputContainer>`
  border-radius: 5px;
  flex-direction: row;
  justify-content: flex-start;
  margin: 10px 20px;
  background-color: ${({disabled}) =>
    disabled ? colors.offWhite : colors.white};
`;
