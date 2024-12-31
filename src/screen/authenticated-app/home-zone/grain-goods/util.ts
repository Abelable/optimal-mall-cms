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
  return ["village_grain_goods_list", params];
};

export const useGoodsModal = () => {
  const [{ grainGoodsCreate }, setGoodsModalOpen] = useUrlQueryParams([
    "grainGoodsCreate",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setGoodsModalOpen({ grainGoodsCreate: true }),
    [setGoodsModalOpen]
  );
  const close = useCallback(
    () => setUrlParams({ grainGoodsCreate: "" }),
    [setUrlParams]
  );

  return {
    grainGoodsModalOpen: grainGoodsCreate === "true",
    open,
    close,
  };
};
