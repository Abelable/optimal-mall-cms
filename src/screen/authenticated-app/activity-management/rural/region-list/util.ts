import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useRuralRegion } from "service/ruralRegion";

export const useRuralRegionListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["page", "limit"]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        limit: Number(params.limit) || 10,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useRuralRegionListQueryKey = () => {
  const [params] = useRuralRegionListSearchParams();
  return ["rural_region_list", params];
};

export const useRuralRegionModal = () => {
  const [{ ruralRegionCreate }, setRuralRegionModalOpen] = useUrlQueryParams([
    "ruralRegionCreate",
  ]);
  const [{ editingRuralRegionId }, setEditingRuralRegionId] = useUrlQueryParams(
    ["editingRuralRegionId"]
  );
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingRuralRegion, isLoading } = useRuralRegion(
    Number(editingRuralRegionId)
  );

  const open = useCallback(
    () => setRuralRegionModalOpen({ ruralRegionCreate: true }),
    [setRuralRegionModalOpen]
  );
  const startEdit = useCallback(
    (id: number) => setEditingRuralRegionId({ editingRuralRegionId: `${id}` }),
    [setEditingRuralRegionId]
  );
  const close = useCallback(
    () => setUrlParams({ ruralRegionCreate: "", editingRuralRegionId: "" }),
    [setUrlParams]
  );

  return {
    ruralRegionModalOpen:
      ruralRegionCreate === "true" || !!editingRuralRegionId,
    editingRuralRegionId,
    editingRuralRegion,
    isLoading,
    open,
    startEdit,
    close,
  };
};
