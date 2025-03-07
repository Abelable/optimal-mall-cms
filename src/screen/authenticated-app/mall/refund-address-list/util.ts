import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useRefundAddress } from "service/merchant";

export const useRefundAddressListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "merchantId",
    "page",
    "limit",
  ]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        limit: Number(params.limit) || 10,
        merchantId: Number(params.merchantId) || 0,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useRefundAddressListQueryKey = () => {
  const [params] = useRefundAddressListSearchParams();
  return ["merchant_refund_address_list", params];
};

export const useRefundAddressModal = () => {
  const [{ refundAddressCreate }, setRefundAddressModalOpen] =
    useUrlQueryParams(["refundAddressCreate"]);
  const [{ editingRefundAddressId }, setEditingRefundAddressId] =
    useUrlQueryParams(["editingRefundAddressId"]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingRefundAddress, isLoading } = useRefundAddress(
    Number(editingRefundAddressId)
  );

  const open = useCallback(
    () => setRefundAddressModalOpen({ refundAddressCreate: true }),
    [setRefundAddressModalOpen]
  );
  const startEdit = useCallback(
    (id: number) =>
      setEditingRefundAddressId({ editingRefundAddressId: `${id}` }),
    [setEditingRefundAddressId]
  );
  const close = useCallback(
    () => setUrlParams({ refundAddressCreate: "", editingRefundAddressId: "" }),
    [setUrlParams]
  );

  return {
    refundAddressModalOpen:
      refundAddressCreate === "true" || !!editingRefundAddressId,
    editingRefundAddressId,
    editingRefundAddress,
    isLoading,
    open,
    startEdit,
    close,
  };
};
