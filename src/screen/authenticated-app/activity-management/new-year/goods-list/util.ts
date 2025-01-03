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
  return ["new_year_goods_list", params];
};

export const useGoodsModal = () => {
  const [{ newYearGoodsCreate }, setGoodsModalOpen] = useUrlQueryParams([
    "newYearGoodsCreate",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setGoodsModalOpen({ newYearGoodsCreate: true }),
    [setGoodsModalOpen]
  );
  const close = useCallback(
    () => setUrlParams({ newYearGoodsCreate: "" }),
    [setUrlParams]
  );

  return {
    newYearGoodsModalOpen: newYearGoodsCreate === "true",
    open,
    close,
  };
};
