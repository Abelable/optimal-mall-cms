import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useApprovedConfig, useRejectConfig } from "./use-optimistic-options";
import type {
  EnterpriseInfoDetail,
  EnterpriseInfoListResult,
  EnterpriseInfoListSearchParams,
} from "types/enterpriseInfo";

export const useEnterpriseInfoList = (
  params: Partial<EnterpriseInfoListSearchParams>
) => {
  const client = useHttp();
  return useQuery<EnterpriseInfoListResult>(
    ["enterprise_info_list", params],
    () => client("enterprise_info/list", { data: params, method: "POST" })
  );
};

export const useEnterpriseInfo = (id: number) => {
  const client = useHttp();
  return useQuery<EnterpriseInfoDetail>(
    ["enterprise_info", { id }],
    () => client(`enterprise_info/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useApprovedEnterpriseInfo = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("enterprise_info/approved", {
        data: { id },
        method: "POST",
      }),
    useApprovedConfig(queryKey)
  );
};

export const useRejectEnterpriseInfo = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { id: number; failureReason: string }) =>
      client("enterprise_info/reject", {
        data,
        method: "POST",
      }),
    useRejectConfig(queryKey)
  );
};

export const useEnterpriseInfoPendingCount = () => {
  const client = useHttp();
  return useQuery(["enterprise_info_pending_count"], () =>
    client("enterprise_info/pending_count")
  );
};
