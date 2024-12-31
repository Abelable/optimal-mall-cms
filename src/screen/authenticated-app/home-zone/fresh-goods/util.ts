import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";

export const useGoodsListSearchParams = () => {
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

export const useGoodsListQueryKey = () => {
  const [params] = useGoodsListSearchParams();
  return ["village_fresh_goods_list", params];
};

export const useGoodsModal = () => {
  const [{ freshGoodsCreate }, setGoodsModalOpen] = useUrlQueryParams([
    "freshGoodsCreate",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setGoodsModalOpen({ freshGoodsCreate: true }),
    [setGoodsModalOpen]
  );
  const close = useCallback(
    () => setUrlParams({ freshGoodsCreate: "" }),
    [setUrlParams]
  );

  return {
    freshGoodsModalOpen: freshGoodsCreate === "true",
    open,
    close,
  };
};
