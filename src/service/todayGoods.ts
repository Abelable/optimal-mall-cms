import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddActivityGoodsConfig,
  useDeleteConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";
import type {
  GoodsListResult,
  GoodsListSearchParams,
} from "types/activityGoods";

export const useTodayGoodsList = (params: Partial<GoodsListSearchParams>) => {
  const client = useHttp();
  return useQuery<GoodsListResult>(["today_goods_list", params], () =>
    client("mall/today_goods/list", { data: params, method: "POST" })
  );
};

export const useAddTodayGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ goodsIds }: { goodsIds: number[] }) =>
      client("mall/today_goods/add", {
        data: cleanObject({ goodsIds }),
        method: "POST",
      }),
    useAddActivityGoodsConfig(queryKey)
  );
};

export const useDeleteTodayGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("mall/today_goods/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
