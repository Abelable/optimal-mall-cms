import { useQuery } from "react-query";
import { AuthForm, UserInfo } from "types/auth";
import { http, useHttp } from "./http";

const localStorageKey = "__auth_provider_token__";
const localStoragePermissionKey = "__auth_provider_permission__";

export const getToken = () => window.localStorage.getItem(localStorageKey);
export const removeToken = () =>
  window.localStorage.removeItem(localStorageKey);

export const getPermission = (): string[] => {
  const permissionStorage = window.localStorage.getItem(
    localStoragePermissionKey
  );
  return permissionStorage ? JSON.parse(permissionStorage) : [];
};
export const removePermission = () =>
  window.localStorage.removeItem(localStoragePermissionKey);

export const login = async (form: AuthForm) => {
  const { token, permission } = await http("auth/login", {
    method: "POST",
    data: form,
  });
  window.localStorage.setItem(localStorageKey, token);
  window.localStorage.setItem(localStoragePermissionKey, permission);
  return { token, permission: JSON.parse(permission) };
};

export const logout = async () => {
  await http("auth/logout", { token: getToken() as string });
  removeToken();
  removePermission();
};

export const refreshToken = async () => {
  const token = await http("auth/token_refresh");
  window.localStorage.setItem(localStorageKey, token);
};

export const useUserInfo = () => {
  const client = useHttp();
  return useQuery<UserInfo>(["useInfo"], () => client("auth/me"));
};
