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
  PickupAddress,
  PickupAddressListResult,
  PickupAddressListSearchParams,
  RefundAddress,
  RefundAddressListResult,
  RefundAddressListSearchParams,
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

export const useRefundAddressList = (
  params: Partial<RefundAddressListSearchParams>
) => {
  const client = useHttp();
  return useQuery<RefundAddressListResult>(
    ["merchant_refund_address_list", params],
    () =>
      client("merchant/refund_address/list", { data: params, method: "POST" })
  );
};

export const useRefundAddress = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<RefundAddress>>(
    ["merchant_refund_address", { id }],
    () => client(`merchant/refund_address/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddRefundAddress = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<RefundAddress>) =>
      client("merchant/refund_address/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditRefundAddress = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<RefundAddress>) =>
      client("merchant/refund_address/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteRefundAddress = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("merchant/refund_address/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const usePickupAddressList = (
  params: Partial<PickupAddressListSearchParams>
) => {
  const client = useHttp();
  return useQuery<PickupAddressListResult>(
    ["merchant_pickup_address_list", params],
    () =>
      client("merchant/pickup_address/list", { data: params, method: "POST" })
  );
};

export const usePickupAddress = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<PickupAddress>>(
    ["merchant_pickup_address", { id }],
    () => client(`merchant/pickup_address/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddPickupAddress = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<PickupAddress>) =>
      client("merchant/pickup_address/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditPickupAddress = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<PickupAddress>) =>
      client("merchant/pickup_address/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeletePickupAddress = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("merchant/pickup_address/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
