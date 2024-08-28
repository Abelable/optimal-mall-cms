import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";

export const useAdvanceGoodsListSearchParams = () => {
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

export const useAdvanceGoodsListQueryKey = () => {
  const [params] = useAdvanceGoodsListSearchParams();
  return ["advance_goods_list", params];
};

export const useAdvanceGoodsModal = () => {
  const [{ advanceGoodsCreate }, setAdvanceGoodsModalOpen] = useUrlQueryParams([
    "advanceGoodsCreate",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setAdvanceGoodsModalOpen({ advanceGoodsCreate: true }),
    [setAdvanceGoodsModalOpen]
  );
  const close = useCallback(
    () => setUrlParams({ advanceGoodsCreate: "" }),
    [setUrlParams]
  );

  return {
    advanceGoodsModalOpen: advanceGoodsCreate === "true",
    open,
    close,
  };
};
