import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";

export const useGoodsListSearchParams = () => {
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

export const useGoodsListQueryKey = () => {
  const [params] = useGoodsListSearchParams();
  return ["new_year_local_goods_list", params];
};

export const useGoodsModal = () => {
  const [{ localGoodsCreate }, setGoodsModalOpen] = useUrlQueryParams([
    "localGoodsCreate",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setGoodsModalOpen({ localGoodsCreate: true }),
    [setGoodsModalOpen]
  );
  const close = useCallback(
    () => setUrlParams({ localGoodsCreate: "" }),
    [setUrlParams]
  );

  return {
    ruralGoodsModalOpen: localGoodsCreate === "true",
    open,
    close,
  };
};
