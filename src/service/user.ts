import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useDeleteConfig, useEditConfig } from "./use-optimistic-options";

import type { User, UsersResult, UsersSearchParams } from "types/user";

export const useUsers = (params: Partial<UsersSearchParams>) => {
  const client = useHttp();
  return useQuery<UsersResult>(["users", params], () =>
    client("user/list", { data: params, method: "POST" })
  );
};

export const useUser = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<User>>(
    ["user", { id }],
    () => client(`user/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useDeleteUser = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("user/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useUserOptions = () => {
  const client = useHttp();
  return useQuery<{ id: number; avatar: string; nickname: string }[]>(
    ["user_options"],
    () => client("user/options")
  );
};

export const useUserNormalOptions = () => {
  const client = useHttp();
  return useQuery<{ id: number; avatar: string; nickname: string }[]>(
    ["user_normal_options"],
    () => client("user/normal_options")
  );
};

export const useBindSuperior = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { userId: number; superiorId: number }) =>
      client("user/bind_superior", {
        data,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteSuperior = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { userId: number; superiorId: number }) =>
      client("user/delete_superior", {
        data,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};
