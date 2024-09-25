import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useDeleteOrderConfig,
  useCancelOrderConfig,
  useRejectConfig,
} from "./use-optimistic-options";
import type {
  OrderDetail,
  OrderListResult,
  OrderListSearchParams,
  ShippingInfo,
} from "types/order";

export const useOrderList = (params: Partial<OrderListSearchParams>) => {
  const client = useHttp();
  return useQuery<OrderListResult>(["order_list", params], () =>
    client("order/list", { data: params, method: "POST" })
  );
};

export const useOrder = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<OrderDetail>>(
    ["order_detail", { id }],
    () => client(`order/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useRejectOrder = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { id: number; failureReason: string }) =>
      client("order/reject", {
        data,
        method: "POST",
      }),
    useRejectConfig(queryKey)
  );
};

export const useDeliveryOrder = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: {
      id: number;
      shipChannel: string;
      shipCode: string;
      shipSn: string;
    }) =>
      client("order/delivery", {
        data,
        method: "POST",
      }),
    useRejectConfig(queryKey)
  );
};

export const useCancelOrder = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (ids: number[]) =>
      client("order/cancel", {
        data: { ids },
        method: "POST",
      }),
    useCancelOrderConfig(queryKey)
  );
};

export const useShippingInfo = (id: number) => {
  const client = useHttp();
  return useQuery<ShippingInfo>(
    ["shipping_info", { id }],
    () => client(`order/shipping_info`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useConfirmOrder = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (ids: number[]) =>
      client("order/confirm", {
        data: { ids },
        method: "POST",
      }),
    useCancelOrderConfig(queryKey)
  );
};

export const useDeleteOrder = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (ids: number[]) =>
      client("order/delete", {
        data: { ids },
        method: "POST",
      }),
    useDeleteOrderConfig(queryKey)
  );
};
