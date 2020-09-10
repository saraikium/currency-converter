import {Alert} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import {
  AuthActionTypes,
  ILoadUserAction,
  IRequestUserLoginAction,
  IUser,
  IUserLoginAction,
  IUserLogoutAction,
  LOAD_USER_FROM_STORAGE,
  REQUEST_USER_LOGIN,
  USER_LOGIN,
  USER_LOGOUT,
  IUserLogoutRequestAction,
  REQUEST_USER_LOGOUT
} from "../types/auth";

export const requestLogin = (user: IUser): IRequestUserLoginAction => ({
  type: REQUEST_USER_LOGIN,
  payload: user
});

export const completeUserLogin = (user: IUser): IUserLoginAction => ({
  type: USER_LOGIN,
  payload: user
});

export const requestUserLogout = (): IUserLogoutRequestAction => ({
  type: REQUEST_USER_LOGOUT
});

export const logoutUser = (): IUserLogoutAction => ({
  type: USER_LOGOUT
});

export const loadUser = (): ILoadUserAction => ({
  type: LOAD_USER_FROM_STORAGE
});

//
const key = "user";
export const saveUserToStorage = async (user: IUser) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(user));
  } catch (error) {
    Alert.alert(error);
  }
};

export const getUserFromStorage = async () => {
  try {
    let user = await AsyncStorage.getItem(key);
    if (user) return JSON.parse(user);
    return null;
  } catch (error) {
    Alert.alert(error);
  }
};

export const removeUserFromStorage = async () => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    Alert.alert(error);
  }
};

const defaultState: IUser = null;

export const userReducer = (
  state = defaultState,
  action: AuthActionTypes
): IUser => {
  switch (action.type) {
    case USER_LOGIN:
      return action.payload;
    case USER_LOGOUT:
      return null;
    default:
      return state;
  }
};
