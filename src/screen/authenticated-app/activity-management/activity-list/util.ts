import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";

export const useActivityListSearchParams = () => {
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

export const useActivityListQueryKey = () => {
  const [params] = useActivityListSearchParams();
  return ["activity_list", params];
};

export const useActivityModal = () => {
  const [{ activityCreate }, setActivityModalOpen] = useUrlQueryParams([
    "activityCreate",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setActivityModalOpen({ activityCreate: true }),
    [setActivityModalOpen]
  );
  const close = useCallback(
    () => setUrlParams({ activityCreate: "" }),
    [setUrlParams]
  );

  return {
    activityModalOpen: activityCreate === "true",
    open,
    close,
  };
};
