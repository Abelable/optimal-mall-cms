import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { usePickupAddress } from "service/merchant";

export const usePickupAddressListSearchParams = () => {
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

export const usePickupAddressListQueryKey = () => {
  const [params] = usePickupAddressListSearchParams();
  return ["merchant_refund_address_list", params];
};

export const usePickupAddressModal = () => {
  const [{ pickupAddressCreate }, setPickupAddressModalOpen] =
    useUrlQueryParams(["pickupAddressCreate"]);
  const [{ editingPickupAddressId }, setEditingPickupAddressId] =
    useUrlQueryParams(["editingPickupAddressId"]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingPickupAddress, isLoading } = usePickupAddress(
    Number(editingPickupAddressId)
  );

  const open = useCallback(
    () => setPickupAddressModalOpen({ pickupAddressCreate: true }),
    [setPickupAddressModalOpen]
  );
  const startEdit = useCallback(
    (id: number) =>
      setEditingPickupAddressId({ editingPickupAddressId: `${id}` }),
    [setEditingPickupAddressId]
  );
  const close = useCallback(
    () => setUrlParams({ pickupAddressCreate: "", editingPickupAddressId: "" }),
    [setUrlParams]
  );

  return {
    pickupAddressModalOpen:
      pickupAddressCreate === "true" || !!editingPickupAddressId,
    editingPickupAddressId,
    editingPickupAddress,
    isLoading,
    open,
    startEdit,
    close,
  };
};
