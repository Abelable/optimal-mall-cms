import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddActivityGoodsConfig,
  useDeleteConfig,
} from "./use-optimistic-options";
import type {
  GoodsListResult,
  GoodsListSearchParams,
} from "types/activityGoods";

export const useGiftGoodsList = (params: Partial<GoodsListSearchParams>) => {
  const client = useHttp();
  return useQuery<GoodsListResult>(["gift_goods_list", params], () =>
    client("team/goods/list", { data: params, method: "POST" })
  );
};

export const useAddGiftGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ type, goodsIds }: { type: number; goodsIds: number[] }) =>
      client("team/goods/add", {
        data: { type, goodsIds },
        method: "POST",
      }),
    useAddActivityGoodsConfig(queryKey)
  );
};

export const useDeleteGiftGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("team/goods/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
