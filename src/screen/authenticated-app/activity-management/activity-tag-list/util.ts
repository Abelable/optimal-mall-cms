import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useActivityTag } from "service/activityTag";

export const useActivityTagListSearchParams = () => {
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

export const useActivityTagListQueryKey = () => {
  const [params] = useActivityTagListSearchParams();
  return ["activity_tag_list", params];
};

export const useActivityTagModal = () => {
  const [{ activityTagCreate }, setActivityTagModalOpen] = useUrlQueryParams([
    "activityTagCreate",
  ]);
  const [{ editingActivityTagId }, setEditingActivityTagId] = useUrlQueryParams(
    ["editingActivityTagId"]
  );
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingActivityTag, isLoading } = useActivityTag(
    Number(editingActivityTagId)
  );

  const open = useCallback(
    () => setActivityTagModalOpen({ activityTagCreate: true }),
    [setActivityTagModalOpen]
  );
  const startEdit = useCallback(
    (id: number) => setEditingActivityTagId({ editingActivityTagId: `${id}` }),
    [setEditingActivityTagId]
  );
  const close = useCallback(
    () => setUrlParams({ activityTagCreate: "", editingActivityTagId: "" }),
    [setUrlParams]
  );

  return {
    activityTagModalOpen:
      activityTagCreate === "true" || !!editingActivityTagId,
    editingActivityTagId,
    editingActivityTag,
    isLoading,
    open,
    startEdit,
    close,
  };
};
