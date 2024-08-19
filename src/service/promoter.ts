import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useDeleteConfig } from "./use-optimistic-options";

import type {
  PromoterOption,
  PromoterListResult,
  PromoterListSearchParams,
} from "types/promoter";

export const usePromoterList = (params: Partial<PromoterListSearchParams>) => {
  const client = useHttp();
  return useQuery<PromoterListResult>(["promoter_list", params], () =>
    client("promoter/list", { data: params, method: "POST" })
  );
};

export const useDeletePromoter = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("promoter/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const usePromoterOptions = () => {
  const client = useHttp();
  return useQuery<PromoterOption[]>(["promoter_options"], () =>
    client("promoter/options")
  );
};
