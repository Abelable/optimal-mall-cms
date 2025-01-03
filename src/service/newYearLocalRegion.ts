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

export const useRegionList = (params: Partial<RegionListSearchParams>) => {
  const client = useHttp();
  return useQuery<RegionListResult>(["new_year_localregion_list", params], () =>
    client("new_year/region/list", { data: params, method: "POST" })
  );
};

export const useRegion = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<Region>>(
    ["new_year_localregion", { id }],
    () => client("new_year/region/detail", { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddRegion = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Region>) =>
      client("new_year/region/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditRegion = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Region>) =>
      client("new_year/region/edit", {
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
      client("new_year/region/edit_sort", {
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
      client("new_year/region/edit_status", {
        data: cleanObject({ id, status }),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteRegion = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("new_year/region/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useRegionOptions = () => {
  const client = useHttp();
  return useQuery<RegionOption[]>(["new_year_localregion_options"], () =>
    client("new_year/region/options")
  );
};
