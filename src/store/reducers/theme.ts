import {ISetThemeAction, SET_THEME, ITheme, ThemeName} from "../types/theme";
import * as themes from "../../constants/themes";

export const setTheme = (themeName: ThemeName): ISetThemeAction => ({
  type: SET_THEME,
  payload: themeName
});

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
