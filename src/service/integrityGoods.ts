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

export const useIntegrityGoodsList = (
  params: Partial<GoodsListSearchParams>
) => {
  const client = useHttp();
  return useQuery<GoodsListResult>(["integrity_goods_list", params], () =>
    client("integrity/goods/list", { data: params, method: "POST" })
  );
};

export const useAddIntegrityGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ goodsIds }: { goodsIds: number[] }) =>
      client("integrity/goods/add", {
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
      client("integrity/goods/edit_sort", {
        data: { id, sort },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteIntegrityGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("integrity/goods/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
