import { useQuery } from "react-query";
import { useHttp } from "./http";
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
