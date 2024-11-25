import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useBankCard, useWithdraw } from "service/withdraw";

export const useWithdrawListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "status",
    "scene",
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

export const useWithdrawListQueryKey = () => {
  const [params] = useWithdrawListSearchParams();
  return ["withdraw_list", params];
};

export const useWithdrawModal = () => {
  const [{ editingWithdrawId }, setEditingWithdrawId] = useUrlQueryParams([
    "editingWithdrawId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: withdrawInfo,
    isLoading,
    error,
  } = useWithdraw(Number(editingWithdrawId));

  const open = useCallback(
    (id: number) => setEditingWithdrawId({ editingWithdrawId: `${id}` }),
    [setEditingWithdrawId]
  );
  const close = useCallback(
    () => setUrlParams({ editingWithdrawId: "" }),
    [setUrlParams]
  );

  return {
    withdrawModalOpen: !!editingWithdrawId,
    editingWithdrawId,
    withdrawInfo,
    isLoading,
    error,
    open,
    close,
  };
};

export const useRejectModal = () => {
  const [{ rejectWithdrawId }, setRejectWithdrawId] = useUrlQueryParams([
    "rejectWithdrawId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    (id: number) => setRejectWithdrawId({ rejectWithdrawId: `${id}` }),
    [setRejectWithdrawId]
  );
  const close = useCallback(
    () => setUrlParams({ rejectWithdrawId: "" }),
    [setUrlParams]
  );

  return {
    rejectModalOpen: !!rejectWithdrawId,
    rejectWithdrawId,
    open,
    close,
  };
};

export const useBankCardModal = () => {
  const [{ bankCardOwnerId }, setBankCardOwnerId] = useUrlQueryParams([
    "bankCardOwnerId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: bankCardInfo,
    isLoading,
    error,
  } = useBankCard(Number(bankCardOwnerId));

  const open = useCallback(
    (id: number) => setBankCardOwnerId({ bankCardOwnerId: `${id}` }),
    [setBankCardOwnerId]
  );
  const close = useCallback(
    () => setUrlParams({ bankCardOwnerId: "" }),
    [setUrlParams]
  );

  return {
    bankCardModalOpen: !!bankCardOwnerId,
    bankCardOwnerId,
    bankCardInfo,
    isLoading,
    error,
    open,
    close,
  };
};
