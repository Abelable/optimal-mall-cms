import { useCallback, useMemo } from "react";
import { useActivity } from "service/activity";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";

export const useActivityListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "name",
    "status",
    "tag",
    "goodsTag",
    "goodsId",
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

export const useActivityListQueryKey = () => {
  const [params] = useActivityListSearchParams();
  return ["activity_list", params];
};

export const useActivityModal = () => {
  const [{ activityCreate }, setActivityModalOpen] = useUrlQueryParams([
    "activityCreate",
  ]);
  const [{ editingActivityId }, setEditingActivityId] = useUrlQueryParams([
    "editingActivityId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: editingActivity,
    isLoading,
    error,
  } = useActivity(Number(editingActivityId));

  const open = useCallback(
    () => setActivityModalOpen({ activityCreate: true }),
    [setActivityModalOpen]
  );
  const startEdit = useCallback(
    (id: number) => setEditingActivityId({ editingActivityId: `${id}` }),
    [setEditingActivityId]
  );
  const close = useCallback(
    () => setUrlParams({ activityCreate: "", editingActivityId: "" }),
    [setUrlParams]
  );

  return {
    activityModalOpen: activityCreate === "true" || !!editingActivityId,
    editingActivityId,
    editingActivity,
    isLoading,
    error,
    open,
    startEdit,
    close,
  };
};
