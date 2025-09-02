import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import type {
  LiveRoomListResult,
  LiveRoomListSearchParams,
} from "types/liveRoom";
import { useDeleteConfig } from "./use-optimistic-options";

export const useLiveRoomList = (params: Partial<LiveRoomListSearchParams>) => {
  const client = useHttp();
  return useQuery<LiveRoomListResult>(["live_room_list", params], () =>
    client("live/list", { data: params, method: "POST" })
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
