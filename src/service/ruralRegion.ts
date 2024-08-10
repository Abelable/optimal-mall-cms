import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";

import type {
  RuralRegion,
  RuralRegionListResult,
  RuralRegionListSearchParams,
  RuralRegionOption,
} from "types/ruralRegion";

export const useRuralRegionList = (
  params: Partial<RuralRegionListSearchParams>
) => {
  const client = useHttp();
  return useQuery<RuralRegionListResult>(["rural_region_list", params], () =>
    client("rural/region/list", { data: params, method: "POST" })
  );
};

export const useRuralRegion = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<RuralRegion>>(
    ["rural_region", { id }],
    () => client("rural/region/detail", { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddRuralRegion = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<RuralRegion>) =>
      client("rural/region/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditRuralRegion = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<RuralRegion>) =>
      client("rural/region/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteRuralRegion = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("rural/region/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useRuralRegionOptions = () => {
  const client = useHttp();
  return useQuery<RuralRegionOption[]>(["rural_region_options"], () =>
    client("rural/region/options")
  );
};
