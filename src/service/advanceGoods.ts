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

export const useAdvanceGoodsList = (params: Partial<GoodsListSearchParams>) => {
  const client = useHttp();
  return useQuery<GoodsListResult>(["advance_goods_list", params], () =>
    client("mall/advance_goods/list", { data: params, method: "POST" })
  );
};

export const useAddAdvanceGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ goodsIds, type }: { goodsIds: number[]; type: number }) =>
      client("mall/advance_goods/add", {
        data: { goodsIds, type },
        method: "POST",
      }),
    useAddActivityGoodsConfig(queryKey)
  );
};

export const useDeleteAdvanceGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("mall/advance_goods/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
