import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";
import type {
  LiveUserListResult,
  LiveUserListSearchParams,
} from "types/liveUser";

export const useLiveUserList = (params: Partial<LiveUserListSearchParams>) => {
  const client = useHttp();
  return useQuery<LiveUserListResult>(["live_user_list", params], () =>
    client("live/user/list", { data: params, method: "POST" })
  );
};

export const useAddLiveUser = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ userIds }: { userIds: number[] }) =>
      client("live/user/add", {
        data: { userIds },
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteLiveUser = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("live/user/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useLiveUserOptions = () => {
  const client = useHttp();
  return useQuery<
    { id: number; userId: number; avatar: string; nickname: string }[]
  >(["live_user_options"], () => client("live/user/options"));
};
