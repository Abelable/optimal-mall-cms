import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useApprovedRefundConfig,
  useDeleteConfig,
  useRejectRefundConfig,
} from "./use-optimistic-options";
import type {
  RefundDetail,
  RefundListResult,
  RefundListSearchParams,
} from "types/refund";

export const useRefundList = (params: Partial<RefundListSearchParams>) => {
  const client = useHttp();
  return useQuery<RefundListResult>(["refund_list", params], () =>
    client("refund/list", { data: params, method: "POST" })
  );
};

export const useRefund = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<RefundDetail>>(
    ["refund_detail", { id }],
    () => client(`refund/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useApprovedRefund = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("refund/approved", {
        data: { id },
        method: "POST",
      }),
    useApprovedRefundConfig(queryKey)
  );
};

export const useRejectRefund = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { id: number; failureReason: string }) =>
      client("refund/reject", {
        data,
        method: "POST",
      }),
    useRejectRefundConfig(queryKey)
  );
};

export const useDeleteRefund = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("refund/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
