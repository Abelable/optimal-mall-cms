import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useMerchant } from "service/merchant";

export const useMerchantListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["page", "limit"]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        limit: Number(params.limit) || 10,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useMerchantListQueryKey = () => {
  const [params] = useMerchantListSearchParams();
  return ["merchant_list", params];
};

export const useMerchantModal = () => {
  const [{ merchantCreate }, setMerchantModalOpen] = useUrlQueryParams([
    "merchantCreate",
  ]);
  const [{ editingMerchantId }, setEditingMerchantId] = useUrlQueryParams([
    "editingMerchantId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingMerchant, isLoading } = useMerchant(
    Number(editingMerchantId)
  );

  const open = useCallback(
    () => setMerchantModalOpen({ merchantCreate: true }),
    [setMerchantModalOpen]
  );
  const startEdit = useCallback(
    (id: number) => setEditingMerchantId({ editingMerchantId: `${id}` }),
    [setEditingMerchantId]
  );
  const close = useCallback(
    () => setUrlParams({ merchantCreate: "", editingMerchantId: "" }),
    [setUrlParams]
  );

  return {
    merchantModalOpen: merchantCreate === "true" || !!editingMerchantId,
    editingMerchantId,
    editingMerchant,
    isLoading,
    open,
    startEdit,
    close,
  };
};
