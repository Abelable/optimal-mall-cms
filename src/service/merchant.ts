import { QueryKey, useMutation, useQuery } from "react-query";
import { cleanObject } from "utils/index";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

import type {
  Merchant,
  MerchantListResult,
  MerchantListSearchParams,
} from "types/merchant";

export const useMerchantList = (params: Partial<MerchantListSearchParams>) => {
  const client = useHttp();
  return useQuery<MerchantListResult>(["merchant_list", params], () =>
    client("merchant/list", { data: params, method: "POST" })
  );
};

export const useMerchant = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<Merchant>>(
    ["merchant", { id }],
    () => client(`merchant/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddMerchant = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Merchant>) =>
      client("merchant/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditMerchant = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Merchant>) =>
      client("merchant/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteMerchant = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("merchant/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useMerchantOptions = () => {
  const client = useHttp();
  return useQuery<Merchant[]>(["merchant_options"], () =>
    client("merchant/options")
  );
};
