import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useTeamLeader } from "service/teamLeader";

export const useTeamLeadersSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "status",
    "name",
    "mobile",
    "page",
    "limit",
  ]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        limit: Number(params.limit) || 10,
        ...params,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useTeamLeadersQueryKey = () => {
  const [params] = useTeamLeadersSearchParams();
  return ["team_leaders", params];
};

export const useTeamLeaderModal = () => {
  const [{ editingTeamLeaderId }, setEditingTeamLeaderId] = useUrlQueryParams([
    "editingTeamLeaderId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: editingTeamLeader,
    isLoading,
    error,
  } = useTeamLeader(Number(editingTeamLeaderId));

  const open = useCallback(
    (id: number) => setEditingTeamLeaderId({ editingTeamLeaderId: `${id}` }),
    [setEditingTeamLeaderId]
  );
  const close = useCallback(
    () => setUrlParams({ teamLeaderCreate: "", editingTeamLeaderId: "" }),
    [setUrlParams]
  );

  return {
    teamLeaderModalOpen: !!editingTeamLeaderId,
    editingTeamLeaderId,
    editingTeamLeader,
    isLoading,
    error,
    open,
    close,
  };
};

export const useRejectModal = () => {
  const [{ rejectTeamLeaderId }, setRejectTeamLeaderId] = useUrlQueryParams([
    "rejectTeamLeaderId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    (id: number) => setRejectTeamLeaderId({ rejectTeamLeaderId: `${id}` }),
    [setRejectTeamLeaderId]
  );
  const close = useCallback(
    () => setUrlParams({ rejectTeamLeaderId: "" }),
    [setUrlParams]
  );

  return {
    rejectModalOpen: !!rejectTeamLeaderId,
    rejectTeamLeaderId,
    open,
    close,
  };
};
