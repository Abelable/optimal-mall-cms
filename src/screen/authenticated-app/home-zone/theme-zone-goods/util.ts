import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";

export const useGoodsListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["themeId", "page", "limit"]);
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

export const useGoodsListQueryKey = () => {
  const [params] = useGoodsListSearchParams();
  return ["theme_zone_goods_list", params];
};

export const useGoodsModal = () => {
  const [{ themeZoneGoodsCreate }, setGoodsModalOpen] = useUrlQueryParams([
    "themeZoneGoodsCreate",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setGoodsModalOpen({ themeZoneGoodsCreate: true }),
    [setGoodsModalOpen]
  );
  const close = useCallback(
    () => setUrlParams({ themeZoneGoodsCreate: "" }),
    [setUrlParams]
  );

  return {
    themeZoneGoodsModalOpen: themeZoneGoodsCreate === "true",
    open,
    close,
  };
};
