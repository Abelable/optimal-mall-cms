import { useUrlQueryParams } from "utils/url";
import { useMemo } from "react";

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
