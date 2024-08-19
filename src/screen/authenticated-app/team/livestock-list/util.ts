import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";

export const useLivestockListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["page", "limit"]);
  return [
    useMemo(
      () => ({
        type: 1,
        page: Number(params.page) || 1,
        limit: Number(params.limit) || 10,
        ...params,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useLivestockListQueryKey = () => {
  const [params] = useLivestockListSearchParams();
  return ["gift_goods_list", params];
};

export const useLivestockModal = () => {
  const [{ livestockCreate }, setLivestockModalOpen] = useUrlQueryParams([
    "livestockCreate",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setLivestockModalOpen({ livestockCreate: true }),
    [setLivestockModalOpen]
  );
  const close = useCallback(
    () => setUrlParams({ livestockCreate: "" }),
    [setUrlParams]
  );

  return {
    livestockModalOpen: livestockCreate === "true",
    open,
    close,
  };
};
