import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useThemeZone } from "service/themeZone";

export const useThemeZoneListSearchParams = () => {
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

export const useThemeZoneListQueryKey = () => {
  const [params] = useThemeZoneListSearchParams();
  return ["theme_zone_list", params];
};

export const useThemeZoneModal = () => {
  const [{ themeZoneCreate }, setThemeZoneModalOpen] = useUrlQueryParams([
    "themeZoneCreate",
  ]);
  const [{ editingThemeZoneId }, setEditingThemeZoneId] = useUrlQueryParams([
    "editingThemeZoneId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingThemeZone, isLoading } = useThemeZone(
    Number(editingThemeZoneId)
  );

  const open = useCallback(
    () => setThemeZoneModalOpen({ themeZoneCreate: true }),
    [setThemeZoneModalOpen]
  );
  const startEdit = useCallback(
    (id: number) => setEditingThemeZoneId({ editingThemeZoneId: `${id}` }),
    [setEditingThemeZoneId]
  );
  const close = useCallback(
    () => setUrlParams({ themeZoneCreate: "", editingThemeZoneId: "" }),
    [setUrlParams]
  );

  return {
    themeZoneModalOpen: themeZoneCreate === "true" || !!editingThemeZoneId,
    editingThemeZoneId,
    editingThemeZone,
    isLoading,
    open,
    startEdit,
    close,
  };
};
