import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useEnterpriseInfo } from "service/enterpriseInfo";

export const useEnterpriseInfoListSearchParams = () => {
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

export const useEnterpriseInfoListQueryKey = () => {
  const [params] = useEnterpriseInfoListSearchParams();
  return ["auth_info_list", params];
};

export const useEnterpriseInfoModal = () => {
  const [{ editingEnterpriseInfoId }, setEditingEnterpriseInfoId] =
    useUrlQueryParams(["editingEnterpriseInfoId"]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: editingEnterpriseInfo,
    isLoading,
    error,
  } = useEnterpriseInfo(Number(editingEnterpriseInfoId));

  const open = useCallback(
    (id: number) =>
      setEditingEnterpriseInfoId({ editingEnterpriseInfoId: `${id}` }),
    [setEditingEnterpriseInfoId]
  );
  const close = useCallback(
    () => setUrlParams({ merchantCreate: "", editingEnterpriseInfoId: "" }),
    [setUrlParams]
  );

  return {
    merchantModalOpen: !!editingEnterpriseInfoId,
    editingEnterpriseInfoId,
    editingEnterpriseInfo,
    isLoading,
    error,
    open,
    close,
  };
};

export const useRejectModal = () => {
  const [{ rejectEnterpriseInfoId }, setRejectEnterpriseInfoId] =
    useUrlQueryParams(["rejectEnterpriseInfoId"]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    (id: number) =>
      setRejectEnterpriseInfoId({ rejectEnterpriseInfoId: `${id}` }),
    [setRejectEnterpriseInfoId]
  );
  const close = useCallback(
    () => setUrlParams({ rejectEnterpriseInfoId: "" }),
    [setUrlParams]
  );

  return {
    rejectModalOpen: !!rejectEnterpriseInfoId,
    rejectEnterpriseInfoId,
    open,
    close,
  };
};
