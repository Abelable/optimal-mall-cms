import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const usePromoterListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["level", "page", "limit"]);
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

export const usePromoterListQueryKey = () => {
  const [params] = usePromoterListSearchParams();
  return ["promoter_list", params];
};

export const useAddPromoterModal = () => {
  const [{ promoterCreate }, setAddPromoterModalOpen] = useUrlQueryParams([
    "promoterCreate",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setAddPromoterModalOpen({ promoterCreate: true }),
    [setAddPromoterModalOpen]
  );
  const close = useCallback(
    () => setUrlParams({ promoterCreate: "" }),
    [setUrlParams]
  );

  return {
    promoterModalOpen: promoterCreate === "true",
    open,
    close,
  };
};
