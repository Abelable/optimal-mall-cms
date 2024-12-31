import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddActivityGoodsConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";
import type {
  GoodsListResult,
  GoodsListSearchParams,
} from "types/activityGoods";

export const useGoodsList = (params: Partial<GoodsListSearchParams>) => {
  const client = useHttp();
  return useQuery<GoodsListResult>(["village_snack_goods_list", params], () =>
    client("village/snack_goods/list", { data: params, method: "POST" })
  );
};

export const useAddGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ goodsIds }: { goodsIds: number[] }) =>
      client("village/snack_goods/add", {
        data: cleanObject({ goodsIds }),
        method: "POST",
      }),
    useAddActivityGoodsConfig(queryKey)
  );
};

export const useEditSort = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, sort }: { id: number; sort: number }) =>
      client("village/snack_goods/edit_sort", {
        data: { id, sort },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("village/snack_goods/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
