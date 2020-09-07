import React from "react";
import styled from "styled-components/native";
import {RegularText} from "./styledComponents/StyledComponents";
import {Themed} from "../types/styledComponentTypes";
import {useSelector} from "react-redux";
import {themeSelector} from "../store/selectors";

const Row = styled.TouchableOpacity<Themed>`
  padding: 16px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({theme}) => theme.white};
`;

interface IProps {
  title: string;
  onPress(): void;
  rightIcon?: React.ReactElement | null;
}

export const RowItem = ({title, onPress, rightIcon}: IProps) => {
  const theme = useSelector(themeSelector);
  return (
    <Row onPress={onPress}>
      <RegularText color={theme.themeColor}>{title}</RegularText>
      {rightIcon}
    </Row>
  );
};
