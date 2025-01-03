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
  LocalGoodsListResult,
  LocalGoodsListSearchParams,
} from "types/newYearGoods";

export const useGoodsList = (params: Partial<GoodsListSearchParams>) => {
  const client = useHttp();
  return useQuery<GoodsListResult>(["new_year_goods_list", params], () =>
    client("new_year/goods/list", { data: params, method: "POST" })
  );
};

export const useAddGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ goodsIds }: { goodsIds: number[] }) =>
      client("new_year/goods/add", {
        data: cleanObject({ goodsIds }),
        method: "POST",
      }),
    useAddActivityGoodsConfig(queryKey)
  );
};

export const useEditGoodsSort = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, sort }: { id: number; sort: number }) =>
      client("new_year/goods/edit_sort", {
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
      client("new_year/goods/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useCultureGoodsList = (params: Partial<GoodsListSearchParams>) => {
  const client = useHttp();
  return useQuery<GoodsListResult>(
    ["new_year_culture_goods_list", params],
    () =>
      client("new_year/culture_goods/list", { data: params, method: "POST" })
  );
};

export const useAddCultureGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ goodsIds }: { goodsIds: number[] }) =>
      client("new_year/culture_goods/add", {
        data: cleanObject({ goodsIds }),
        method: "POST",
      }),
    useAddActivityGoodsConfig(queryKey)
  );
};

export const useEditCultureGoodsSort = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, sort }: { id: number; sort: number }) =>
      client("new_year/culture_goods/edit_sort", {
        data: { id, sort },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteCultureGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("new_year/culture_goods/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useLocalGoodsList = (
  params: Partial<LocalGoodsListSearchParams>
) => {
  const client = useHttp();
  return useQuery<LocalGoodsListResult>(
    ["new_year_local_goods_list", params],
    () => client("new_uear/local_goods/list", { data: params, method: "POST" })
  );
};

export const useAddLocalGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ regionId, goodsIds }: { regionId: number; goodsIds: number[] }) =>
      client("new_uear/local_goods/add", {
        data: cleanObject({ regionId, goodsIds }),
        method: "POST",
      }),
    useAddActivityGoodsConfig(queryKey)
  );
};

export const useDeleteLocalGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("new_uear/local_goods/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
