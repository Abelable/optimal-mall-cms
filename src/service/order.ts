import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useDeleteConfig,
  useCancelOrderConfig,
  useConfirmOrderConfig,
  useDeliveryOrderConfig,
  useExportOrderConfig,
  useRefundOrderConfig,
} from "./use-optimistic-options";
import type {
  OrderDetail,
  OrderListResult,
  OrderListSearchParams,
} from "types/order";
import type { ShippingInfo } from "types/common";
import { GoodsOption } from "types/goods";

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
      isAllDelivered: string;
      packageList: {
        shipChannel: string;
        shipCode: string;
        shipSn: string;
        goodsList: string;
      }[];
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

export const useRefundOrder = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (ids: number[]) =>
      client("order/refund", {
        data: { ids },
        method: "POST",
      }),
    useRefundOrderConfig(queryKey)
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

export const useExportOrder = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (ids: number[]) =>
      client("order/export", {
        data: { ids },
        method: "POST",
        headers: {
          responseType: "arraybuffer",
        },
      }),
    useExportOrderConfig(queryKey)
  );
  // return (ids: number[]) =>
  //   client("order/export", {
  //     data: { ids },
  //     method: "POST",
  //     headers: {
  //       responseType: "arraybuffer",
  //     },
  //   });
};

export const useOrderedUserOptions = () => {
  const client = useHttp();
  return useQuery<{ id: number; avatar: string; nickname: string }[]>(
    ["ordered_user_options"],
    () => client("order/user_options")
  );
};

export const useOrderedGoodsOptions = () => {
  const client = useHttp();
  return useQuery<GoodsOption[]>(["ordered_goods_options"], () =>
    client("order/goods_options")
  );
};

export const useShipOrderCount = () => {
  const client = useHttp();
  return useQuery(["ship_order_count"], () => client("order/ship_order_count"));
};

export const useModifyOrderAddressInfo = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: {
      id: number;
      consignee: string;
      mobile: string;
      address: string;
    }) =>
      client("order/modify_address_info", {
        data,
        method: "POST",
      }),
    useDeliveryOrderConfig(queryKey)
  );
};
