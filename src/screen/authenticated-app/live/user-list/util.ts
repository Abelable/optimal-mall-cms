import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";

export const useLiveUserListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["page", "limit"]);
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

export const useLiveUserListQueryKey = () => {
  const [params] = useLiveUserListSearchParams();
  return ["live_user_list", params];
};

export const useLiveUserModal = () => {
  const [{ liveUserCreate }, setLiveUserModalOpen] = useUrlQueryParams([
    "liveUserCreate",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setLiveUserModalOpen({ liveUserCreate: true }),
    [setLiveUserModalOpen]
  );
  const close = useCallback(
    () => setUrlParams({ liveUserCreate: "" }),
    [setUrlParams]
  );

  return {
    liveUserModalOpen: liveUserCreate === "true",
    open,
    close,
  };
};
