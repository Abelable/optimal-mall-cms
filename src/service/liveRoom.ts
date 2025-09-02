import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useDeleteConfig, useEditConfig } from "./use-optimistic-options";

import type {
  LiveRoomListResult,
  LiveRoomListSearchParams,
} from "types/liveRoom";

export const useLiveRoomList = (params: Partial<LiveRoomListSearchParams>) => {
  const client = useHttp();
  return useQuery<LiveRoomListResult>(["live_room_list", params], () =>
    client("live/list", { data: params, method: "POST" })
  );
};

export const useEditViews = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, views }: { id: number; views: number }) =>
      client("live/edit_views", {
        data: { id, views },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditPraise = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, praise }: { id: number; praise: number }) =>
      client("live/edit_praise", {
        data: { id, praise },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteLiveRoom = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("live/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
