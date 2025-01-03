import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";

import type {
  Region,
  RegionListResult,
  RegionListSearchParams,
  RegionOption,
} from "types/region";

export const useRuralRegionList = (params: Partial<RegionListSearchParams>) => {
  const client = useHttp();
  return useQuery<RegionListResult>(["rural_region_list", params], () =>
    client("rural/region/list", { data: params, method: "POST" })
  );
};

export const useRuralRegion = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<Region>>(
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
    (params: Partial<Region>) =>
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
    (params: Partial<Region>) =>
      client("rural/region/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditSort = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, sort }: { id: number; sort: number }) =>
      client("rural/region/edit_sort", {
        data: cleanObject({ id, sort }),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditStatus = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, status }: { id: number; status: number }) =>
      client("rural/region/edit_status", {
        data: cleanObject({ id, status }),
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
  return useQuery<RegionOption[]>(["rural_region_options"], () =>
    client("rural/region/options")
  );
};
