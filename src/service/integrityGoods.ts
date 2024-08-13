import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddIntegrityGoodsConfig,
  useDeleteConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";
import type {
  IntegrityGoodsListResult,
  IntegrityGoodsListSearchParams,
} from "types/integrityGoods";

export const useIntegrityGoodsList = (
  params: Partial<IntegrityGoodsListSearchParams>
) => {
  const client = useHttp();
  return useQuery<IntegrityGoodsListResult>(
    ["integrity_goods_list", params],
    () => client("integrity/goods/list", { data: params, method: "POST" })
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
    useAddIntegrityGoodsConfig(queryKey)
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
