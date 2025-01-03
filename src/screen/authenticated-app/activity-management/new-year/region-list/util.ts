import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useRegion } from "service/newYearLocalRegion";

export const useRegionListSearchParams = () => {
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

export const useRegionListQueryKey = () => {
  const [params] = useRegionListSearchParams();
  return ["new_year_local_region_list", params];
};

export const useRegionModal = () => {
  const [{ regionCreate }, setRuralRegionModalOpen] = useUrlQueryParams([
    "regionCreate",
  ]);
  const [{ editingRegionId }, setEditingRuralRegionId] = useUrlQueryParams([
    "editingRegionId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingRuralRegion, isLoading } = useRegion(
    Number(editingRegionId)
  );

  const open = useCallback(
    () => setRuralRegionModalOpen({ regionCreate: true }),
    [setRuralRegionModalOpen]
  );
  const startEdit = useCallback(
    (id: number) => setEditingRuralRegionId({ editingRegionId: `${id}` }),
    [setEditingRuralRegionId]
  );
  const close = useCallback(
    () => setUrlParams({ regionCreate: "", editingRegionId: "" }),
    [setUrlParams]
  );

  return {
    ruralRegionModalOpen: regionCreate === "true" || !!editingRegionId,
    editingRegionId,
    editingRuralRegion,
    isLoading,
    open,
    startEdit,
    close,
  };
};
