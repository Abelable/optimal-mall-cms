import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddActivityGoodsConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import type {
  GoodsListResult,
  GoodsListSearchParams,
} from "types/themeZoneGoods";

export const useGoodsList = (params: Partial<GoodsListSearchParams>) => {
  const client = useHttp();
  return useQuery<GoodsListResult>(["theme_zone_goods_list", params], () =>
    client("mall/theme_zone/goods/list", { data: params, method: "POST" })
  );
};

export const useAddGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ themeId, goodsIds }: { themeId: number; goodsIds: number[] }) =>
      client("mall/theme_zone/goods/add", {
        data: { themeId, goodsIds },
        method: "POST",
      }),
    useAddActivityGoodsConfig(queryKey)
  );
};

export const useEditSort = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, sort }: { id: number; sort: number }) =>
      client("mall/theme_zone/goods/edit_sort", {
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
      client("mall/theme_zone/goods/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
