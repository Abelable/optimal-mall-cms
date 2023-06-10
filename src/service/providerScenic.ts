import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useApprovedConfig, useRejectConfig } from "./use-optimistic-options";
import type {
  ProviderScenicListSearchParams,
  ProviderScenicListResult,
} from "types/providerScenic";

export const useProviderScenicList = (
  params: Partial<ProviderScenicListSearchParams>
) => {
  const client = useHttp();
  return useQuery<ProviderScenicListResult>(
    ["provider_scenic_list", params],
    () =>
      client("scenic/provider/scenic/list", { data: params, method: "POST" })
  );
};

export const useApprovedProviderScenic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("scenic/provider/scenic/approved", {
        data: { id },
        method: "POST",
      }),
    useApprovedConfig(queryKey)
  );
};

export const useRejectProviderScenic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { id: number; failureReason: string }) =>
      client("scenic/provider/scenic/reject", {
        data,
        method: "POST",
      }),
    useRejectConfig(queryKey)
  );
};

export const useDeleteProviderScenic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("scenic/provider/scenic/delete", {
        data: { id },
        method: "POST",
      }),
    useRejectConfig(queryKey)
  );
};
