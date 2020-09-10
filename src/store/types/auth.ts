export const REQUEST_USER_LOGIN = "REQUEST_USER_LOGIN";
export const USER_LOGIN = "COUSER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const LOAD_USER_FROM_STORAGE = "LOAD_USER_FROM_STORAGE";

export interface IUser {
  email: string;
  password: string;
}

export interface IRequestUserLoginAction {
  type: typeof REQUEST_USER_LOGIN;
  payload: IUser;
}

export interface IUserLoginAction {
  type: typeof USER_LOGIN;
  payload: IUser;
}

export interface IUserLogoutAction {
  type: typeof USER_LOGOUT;
}

export interface ILoadUserAction {
  type: typeof LOAD_USER_FROM_STORAGE;
}

export type AuthActionTypes = IUserLoginAction | IUserLogoutAction;
