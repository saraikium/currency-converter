import {Alert} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import * as themes from "../../constants/themes";
import {
  ISetThemeAction,
  ITheme,
  SET_THEME,
  ThemeName,
  GET_THEME_FROM_ASYNC_STORAGE,
  ILoadThemeAction,
  CHANGE_THEME,
  IChangeThemeAction
} from "../types/theme";

export const setTheme = (themeName: ThemeName): ISetThemeAction => ({
  type: SET_THEME,
  payload: themeName
});

export const changeTheme = (themeName: ThemeName): IChangeThemeAction => ({
  type: CHANGE_THEME,
  payload: themeName
});

export const loadTheme = (): ILoadThemeAction => ({
  type: GET_THEME_FROM_ASYNC_STORAGE
});

const key = "ui_theme";

export const saveThemeToAsyncStorage = async (name: ThemeName) => {
  try {
    await AsyncStorage.setItem(key, name);
  } catch (error) {
    Alert.alert(error);
  }
};

export const getThemeFromAsyncStorage = async () => {
  try {
    let theme = await AsyncStorage.getItem(key);
    if (!theme) {
      theme = "blue";
    }
    return theme;
  } catch (error) {
    Alert.alert(error);
  }
};

export const themesReducer = (
  state = themes.blue,
  action: ISetThemeAction
): ITheme => {
  switch (action.type) {
    case SET_THEME:
      return themes[action.payload];
    default:
      return state;
  }
};
