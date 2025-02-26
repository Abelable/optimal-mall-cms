import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useApprovedConfig, useRejectConfig } from "./use-optimistic-options";
import type {
  AuthInfoDetail,
  AuthInfoListResult,
  AuthInfoListSearchParams,
} from "types/authInfo";

export const useAuthInfoList = (params: Partial<AuthInfoListSearchParams>) => {
  const client = useHttp();
  return useQuery<AuthInfoListResult>(["auth_info_list", params], () =>
    client("auth_info/list", { data: params, method: "POST" })
  );
};

export const useAuthInfo = (id: number) => {
  const client = useHttp();
  return useQuery<AuthInfoDetail>(
    ["auth_info", { id }],
    () => client(`auth_info/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useApprovedAuthInfo = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("auth_info/approved", {
        data: { id },
        method: "POST",
      }),
    useApprovedConfig(queryKey)
  );
};

export const useRejectAuthInfo = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { id: number; failureReason: string }) =>
      client("auth_info/reject", {
        data,
        method: "POST",
      }),
    useRejectConfig(queryKey)
  );
};

export const useAuthInfoPendingCount = () => {
  const client = useHttp();
  return useQuery(["auth_info_pending_count"], () =>
    client("auth_info/pending_count")
  );
};
