import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDownConfig,
  useUpConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";
import type {
  Goods,
  GoodsListResult,
  GoodsListSearchParams,
  GoodsOption,
} from "types/goods";

export const useGoodsList = (params: Partial<GoodsListSearchParams>) => {
  const client = useHttp();
  return useQuery<GoodsListResult>(["goods_list", params], () =>
    client("goods/list", { data: params, method: "POST" })
  );
};

export const useGoods = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<Goods>>(
    ["goods", { id }],
    () => client(`goods/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useUpGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("goods/up", {
        data: { id },
        method: "POST",
      }),
    useUpConfig(queryKey)
  );
};

export const useDownGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("goods/down", {
        data: { id },
        method: "POST",
      }),
    useDownConfig(queryKey)
  );
};

export const useAddGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Goods>) =>
      client("goods/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Goods>) =>
      client("goods/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("goods/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useGoodsOptions = ({ keywords }: { keywords: string }) => {
  const client = useHttp();
  return useQuery<GoodsOption[]>(["goods_options", { keywords }], () =>
    client("goods/options", {
      data: { keywords },
    })
  );
};
