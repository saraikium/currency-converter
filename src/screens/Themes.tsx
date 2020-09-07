import React from "react";
import {FlatList} from "react-native-gesture-handler";
import styled, {ThemeProvider} from "styled-components/native";

import {RowItem} from "../components/RowItem";
import {Separator} from "../components/styledComponents/StyledComponents";
import {useDispatch, useSelector} from "react-redux";
import {setTheme} from "../store/reducers/theme";
import {ThemeName} from "../store/types/theme";
import {themeSelector} from "../store/selectors";

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
  const dispatch = useDispatch();
  const theme = useSelector(themeSelector);

  return (
    <ThemeProvider theme={theme}>
      <FlatList
        data={themes}
        keyExtractor={(item) => item.color}
        renderItem={({item}) => (
          <RowItem
            title={item.name}
            onPress={() => {
              dispatch(setTheme(item.name.toLocaleLowerCase() as ThemeName));
            }}
            rightIcon={<Preview color={item.color} />}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
    </ThemeProvider>
  );
};
