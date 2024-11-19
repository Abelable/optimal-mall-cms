import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useUser } from "service/user";

export const useUsersSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "nickname",
    "mobile",
    "level",
    "superiorId",
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

export const useUsersQueryKey = () => {
  const [params] = useUsersSearchParams();
  return ["users", params];
};

export const useBindModal = () => {
  const [{ bindUserId }, setBindUserId] = useUrlQueryParams(["bindUserId"]);
  const setUrlParams = useSetUrlSearchParams();

  const { data: bindUserInfo, isLoading, error } = useUser(Number(bindUserId));

  const open = useCallback(
    (id: number) => setBindUserId({ bindUserId: `${id}` }),
    [setBindUserId]
  );
  const close = useCallback(
    () => setUrlParams({ bindUserId: "" }),
    [setUrlParams]
  );

  return {
    bindModalOpen: !!bindUserId,
    bindUserInfo,
    isLoading,
    error,
    open,
    close,
  };
};
