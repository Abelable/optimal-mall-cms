import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";
import { cleanObject } from "utils/index";
import type {
  RuralGoodsListResult,
  RuralGoodsListSearchParams,
} from "types/ruralGoods";

export const useRuralGoodsList = (
  params: Partial<RuralGoodsListSearchParams>
) => {
  const client = useHttp();
  return useQuery<RuralGoodsListResult>(["rural_goods_list", params], () =>
    client("rural/goods/list", { data: params, method: "POST" })
  );
};

export const useAddRuralGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ regionId, goodsIds }: { regionId: number; goodsIds: number[] }) =>
      client("rural/goods/add", {
        data: cleanObject({ regionId, goodsIds }),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteRuralGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("rural/goods/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
