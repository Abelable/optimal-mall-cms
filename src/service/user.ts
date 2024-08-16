import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useDeleteConfig } from "./use-optimistic-options";

import type {
  SuperiorOption,
  User,
  UsersResult,
  UsersSearchParams,
} from "types/user";

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

export const useSuperiorOptions = () => {
  const client = useHttp();
  return useQuery<SuperiorOption[]>(["superior_options"], () =>
    client("user/superior_options")
  );
};
