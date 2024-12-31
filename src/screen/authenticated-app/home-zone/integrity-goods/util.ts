import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";

export const useIntegrityGoodsListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["page", "limit"]);
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

export const useIntegrityGoodsListQueryKey = () => {
  const [params] = useIntegrityGoodsListSearchParams();
  return ["integrity_goods_list", params];
};

export const useIntegrityGoodsModal = () => {
  const [{ integrityGoodsCreate }, setIntegrityGoodsModalOpen] =
    useUrlQueryParams(["integrityGoodsCreate"]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setIntegrityGoodsModalOpen({ integrityGoodsCreate: true }),
    [setIntegrityGoodsModalOpen]
  );
  const close = useCallback(
    () => setUrlParams({ integrityGoodsCreate: "" }),
    [setUrlParams]
  );

  return {
    integrityGoodsModalOpen: integrityGoodsCreate === "true",
    open,
    close,
  };
};
