import React from "react";
import styled from "styled-components/native";
import colors from "../constants/colors";
import {RegularText} from "./StyledComponents";

const Row = styled.TouchableOpacity`
  padding: 16px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.white};
`;

interface IProps {
  title: string;
  onPress(): void;
  rightIcon?: React.ReactElement | null;
}

export const RowItem = ({title, onPress, rightIcon}: IProps) => (
  <Row onPress={onPress}>
    <RegularText color={colors.text}>{title}</RegularText>
    {rightIcon}
  </Row>
);
