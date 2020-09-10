import React from "react";
import {FlatList} from "react-native-gesture-handler";
import {useDispatch} from "react-redux";
import styled from "styled-components/native";

import {RowItem} from "../components/RowItem";
import {Separator} from "../components/styledComponents/Misc";
import {changeTheme} from "../store/reducersAndActions/theme";
import {ThemeName} from "../store/types/theme";

const themes = [
  {name: "Blue", color: "#4f6d7a"},
  {name: "Orange", color: "#d37a68"},
  {name: "Green", color: "#1dbc9c"},
  {name: "Purple", color: "#9c788f"}
];

type PreviewProps = {color: string};

const Preview = styled.View<PreviewProps>`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${({color}) => color};
`;

export const Themes: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <FlatList
      data={themes}
      keyExtractor={(item) => item.color}
      renderItem={({item}) => (
        <RowItem
          title={item.name}
          onPress={() => {
            dispatch(changeTheme(item.name.toLocaleLowerCase() as ThemeName));
          }}
          rightIcon={<Preview color={item.color} />}
        />
      )}
      ItemSeparatorComponent={() => <Separator />}
    />
  );
};
