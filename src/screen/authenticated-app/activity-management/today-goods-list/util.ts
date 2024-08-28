import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";

export const useTodayGoodsListSearchParams = () => {
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

export const useTodayGoodsListQueryKey = () => {
  const [params] = useTodayGoodsListSearchParams();
  return ["today_goods_list", params];
};

export const useTodayGoodsModal = () => {
  const [{ todayGoodsCreate }, setTodayGoodsModalOpen] = useUrlQueryParams([
    "todayGoodsCreate",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setTodayGoodsModalOpen({ todayGoodsCreate: true }),
    [setTodayGoodsModalOpen]
  );
  const close = useCallback(
    () => setUrlParams({ todayGoodsCreate: "" }),
    [setUrlParams]
  );

  return {
    todayGoodsModalOpen: todayGoodsCreate === "true",
    open,
    close,
  };
};
