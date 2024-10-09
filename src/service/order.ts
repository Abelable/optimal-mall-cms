import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useDeleteConfig,
  useCancelOrderConfig,
  useConfirmOrderConfig,
  useDeliveryOrderConfig,
} from "./use-optimistic-options";
import type {
  OrderDetail,
  OrderListResult,
  OrderListSearchParams,
} from "types/order";
import type { ShippingInfo } from "types/common";

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
    useDeliveryOrderConfig(queryKey)
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
    useConfirmOrderConfig(queryKey)
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
    useDeleteConfig(queryKey)
  );
};

export const useExportOrder = () => {
  const client = useHttp();
  return (ids: number[]) =>
    client("order/export", {
      data: { ids },
      method: "POST",
      headers: {
        responseType: "arraybuffer",
      },
    });
};
