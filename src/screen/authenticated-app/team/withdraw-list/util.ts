import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useWithdraw, useShippingInfo } from "service/withdraw";

export const useWithdrawListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["status", "page", "limit"]);
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

export const useShippingModal = () => {
  const [{ shippingWithdrawId }, setShippingWithdrawId] = useUrlQueryParams([
    "shippingWithdrawId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: shippingInfo,
    isLoading,
    error,
  } = useShippingInfo(Number(shippingWithdrawId));

  const open = useCallback(
    (id: number) => setShippingWithdrawId({ shippingWithdrawId: `${id}` }),
    [setShippingWithdrawId]
  );
  const close = useCallback(
    () => setUrlParams({ shippingWithdrawId: "" }),
    [setUrlParams]
  );

  return {
    shippingModalOpen: !!shippingWithdrawId,
    shippingWithdrawId,
    shippingInfo,
    isLoading,
    error,
    open,
    close,
  };
};