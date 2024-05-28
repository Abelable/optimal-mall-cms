import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useApprovedConfig, useRejectConfig } from "./use-optimistic-options";
import type {
  TeamLeaderDetail,
  TeamLeadersResult,
  TeamLeadersSearchParams,
} from "types/teamLeader";

export const useTeamLeaders = (params: Partial<TeamLeadersSearchParams>) => {
  const client = useHttp();
  return useQuery<TeamLeadersResult>(["team_leaders", params], () =>
    client("team_leader/list", { data: params, method: "POST" })
  );
};

export const useTeamLeader = (id: number) => {
  const client = useHttp();
  return useQuery<TeamLeaderDetail>(
    ["team_leader", { id }],
    () => client("team_leader/detail", { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useApprovedTeamLeader = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("team_leader/approved", {
        data: { id },
        method: "POST",
      }),
    useApprovedConfig(queryKey)
  );
};

export const useRejectTeamLeader = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { id: number; failureReason: string }) =>
      client("team_leader/reject", {
        data,
        method: "POST",
      }),
    useRejectConfig(queryKey)
  );
};
