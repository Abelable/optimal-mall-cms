import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useOrder } from "service/order";

export const useOrderListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "orderSn",
    "status",
    "consignee",
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

export const useOrderListQueryKey = () => {
  const [params] = useOrderListSearchParams();
  return ["order_list", params];
};

export const useOrderModal = () => {
  const [{ editingOrderId }, setEditingOrderId] = useUrlQueryParams([
    "editingOrderId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: orderInfo,
    isLoading,
    error,
  } = useOrder(Number(editingOrderId));

  const open = useCallback(
    (id: number) => setEditingOrderId({ editingOrderId: `${id}` }),
    [setEditingOrderId]
  );
  const close = useCallback(
    () => setUrlParams({ orderCreate: "", editingOrderId: "" }),
    [setUrlParams]
  );

  return {
    orderModalOpen: !!editingOrderId,
    editingOrderId,
    orderInfo,
    isLoading,
    error,
    open,
    close,
  };
};

export const useRejectModal = () => {
  const [{ rejectOrderId }, setRejectOrderId] = useUrlQueryParams([
    "rejectOrderId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    (id: number) => setRejectOrderId({ rejectOrderId: `${id}` }),
    [setRejectOrderId]
  );
  const close = useCallback(
    () => setUrlParams({ rejectOrderId: "" }),
    [setUrlParams]
  );

  return {
    rejectModalOpen: !!rejectOrderId,
    rejectOrderId,
    open,
    close,
  };
};
