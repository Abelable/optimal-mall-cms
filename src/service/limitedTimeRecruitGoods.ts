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
} from "types/limitedTimeRecruitGoods";

export const useGoodsList = (params: Partial<GoodsListSearchParams>) => {
  const client = useHttp();
  return useQuery<GoodsListResult>(
    ["limited_time_recruit_goods_list", params],
    () =>
      client("limited_time_recruit/goods/list", {
        data: params,
        method: "POST",
      })
  );
};

export const useAddGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ categoryId, goodsIds }: { categoryId: number; goodsIds: number[] }) =>
      client("limited_time_recruit/goods/add", {
        data: cleanObject({ categoryId, goodsIds }),
        method: "POST",
      }),
    useAddActivityGoodsConfig(queryKey)
  );
};

export const useDeleteGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("limited_time_recruit/goods/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
