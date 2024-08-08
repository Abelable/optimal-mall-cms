import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useApprovedConfig,
  useCancelOrderConfig,
  useDeleteConfig,
  useEditConfig,
  useRejectConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";
import type {
  Order,
  OrderDetail,
  OrderListResult,
  OrderListSearchParams,
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
    ["order", { id }],
    () => client(`order/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useApprovedOrder = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("order/up", {
        data: { id },
        method: "POST",
      }),
    useApprovedConfig(queryKey)
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

export const useAddOrder = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Order>) =>
      client("order/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditOrder = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Order>) =>
      client("order/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
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

export const useCancelOrder = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("order/cancel", {
        data: { id },
        method: "POST",
      }),
    useCancelOrderConfig(queryKey)
  );
};
