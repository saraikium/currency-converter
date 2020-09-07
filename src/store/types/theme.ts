export const SET_THEME = "SET_THEME";

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
