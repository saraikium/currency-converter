export const SET_THEME = "SET_THEME";

export const CHANGE_THEME = "CHANGE_THEME";
export const GET_THEME_FROM_ASYNC_STORAGE = "GET_THEME_FROM_ASYNC_STORAGE";

export interface ITheme {
  name: string;
  text: string;
  border: string;
  themeColor: string;
  white: string;
  textLight: string;
  buttonDisabled: string;
}

export type ThemeName = "blue" | "orange" | "purple" | "green";

export interface ISetThemeAction {
  type: typeof SET_THEME;
  payload: ThemeName;
}

export interface IChangeThemeAction {
  type: typeof CHANGE_THEME;
  payload: ThemeName;
}

export interface ILoadThemeAction {
  type: typeof GET_THEME_FROM_ASYNC_STORAGE;
}
