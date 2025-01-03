import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";

export const useRuralGoodsListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["regionId", "page", "limit"]);
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

export const useRuralGoodsListQueryKey = () => {
  const [params] = useRuralGoodsListSearchParams();
  return ["rural_goods_list", params];
};

export const useRuralGoodsModal = () => {
  const [{ ruralGoodsCreate }, setRuralGoodsModalOpen] = useUrlQueryParams([
    "ruralGoodsCreate",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setRuralGoodsModalOpen({ ruralGoodsCreate: true }),
    [setRuralGoodsModalOpen]
  );
  const close = useCallback(
    () => setUrlParams({ ruralGoodsCreate: "" }),
    [setUrlParams]
  );

  return {
    ruralGoodsModalOpen: ruralGoodsCreate === "true",
    open,
    close,
  };
};
