import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useOrder, useShippingInfo } from "service/order";

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
    () => setUrlParams({ editingOrderId: "" }),
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

export const useDeliveryModal = () => {
  const [{ deliveryOrderId }, setDeliveryOrderId] = useUrlQueryParams([
    "deliveryOrderId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    (id: number) => setDeliveryOrderId({ deliveryOrderId: `${id}` }),
    [setDeliveryOrderId]
  );
  const close = useCallback(
    () => setUrlParams({ deliveryOrderId: "" }),
    [setUrlParams]
  );

  return {
    deliveryModalOpen: !!deliveryOrderId,
    deliveryOrderId,
    open,
    close,
  };
};

export const useShippingModal = () => {
  const [{ shippingOrderId }, setShippingOrderId] = useUrlQueryParams([
    "shippingOrderId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: shippingInfo,
    isLoading,
    error,
  } = useShippingInfo(Number(shippingOrderId));

  const open = useCallback(
    (id: number) => setShippingOrderId({ shippingOrderId: `${id}` }),
    [setShippingOrderId]
  );
  const close = useCallback(
    () => setUrlParams({ shippingOrderId: "" }),
    [setUrlParams]
  );

  return {
    orderModalOpen: !!shippingOrderId,
    shippingOrderId,
    shippingInfo,
    isLoading,
    error,
    open,
    close,
  };
};
