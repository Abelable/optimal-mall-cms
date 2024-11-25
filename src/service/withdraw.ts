import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useApprovedConfig,
  useDeleteConfig,
  useRejectWithdrawConfig,
} from "./use-optimistic-options";
import type {
  WithdrawDetail,
  WithdrawListResult,
  WithdrawListSearchParams,
} from "types/withdraw";
import type { ShippingInfo } from "types/common";

export const useWithdrawList = (params: Partial<WithdrawListSearchParams>) => {
  const client = useHttp();
  return useQuery<WithdrawListResult>(["withdraw_list", params], () =>
    client("withdraw/list", { data: params, method: "POST" })
  );
};

export const useWithdraw = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<WithdrawDetail>>(
    ["withdraw_detail", { id }],
    () => client(`withdraw/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useApprovedWithdraw = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("withdraw/approved", {
        data: { id },
        method: "POST",
      }),
    useApprovedConfig(queryKey)
  );
};

export const useShippingInfo = (id: number) => {
  const client = useHttp();
  return useQuery<ShippingInfo>(
    ["shipping_info", { id }],
    () => client(`withdraw/shipping_info`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useRejectWithdraw = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { id: number; failureReason: string }) =>
      client("withdraw/reject", {
        data,
        method: "POST",
      }),
    useRejectWithdrawConfig(queryKey)
  );
};

export const useDeleteWithdraw = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("withdraw/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
