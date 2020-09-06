import React from "react";
import {FlatList} from "react-native-gesture-handler";
import styled from "styled-components/native";

import {RowItem} from "../components/RowItem";
import {Separator} from "../components/StyledComponents";

const themes = [
  {name: "Blue", color: "#4f6d7a"},
  {name: "Orange", color: "#d37a68"},
  {name: "Green", color: "#1dbc9c"},
  {name: "Purple", color: "#9c788f"}
];

type PreviewProps = {color: string};
// eslint-disable-next-line no-undef
const Preview = styled.View<PreviewProps>`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${({color}) => color};
`;

export const Themes: React.FC = () => {
  return (
    <FlatList
      data={themes}
      keyExtractor={(item) => item.color}
      renderItem={({item}) => (
        <RowItem
          title={item.name}
          onPress={() => {}}
          rightIcon={<Preview color={item.color} />}
        />
      )}
      ItemSeparatorComponent={() => <Separator />}
    />
  );
};
