import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";

export const useCultureGoodsListSearchParams = () => {
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

export const useCultureGoodsListQueryKey = () => {
  const [params] = useCultureGoodsListSearchParams();
  return ["new_year_culture_goods_list", params];
};

export const useCultureGoodsModal = () => {
  const [{ cultureGoodsCreate }, setCultureGoodsModalOpen] = useUrlQueryParams([
    "cultureGoodsCreate",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setCultureGoodsModalOpen({ cultureGoodsCreate: true }),
    [setCultureGoodsModalOpen]
  );
  const close = useCallback(
    () => setUrlParams({ cultureGoodsCreate: "" }),
    [setUrlParams]
  );

  return {
    cultureGoodsModalOpen: cultureGoodsCreate === "true",
    open,
    close,
  };
};
