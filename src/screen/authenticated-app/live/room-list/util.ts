import { useMemo } from "react";
import { useUrlQueryParams } from "utils/url";

export const useLiveRoomListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "status",
    "title",
    "userId",
    "page",
    "limit",
  ]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        limit: Number(params.limit) || 10,
        ...params,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useLiveRoomListQueryKey = () => {
  const [params] = useLiveRoomListSearchParams();
  return ["live_room_list", params];
};
