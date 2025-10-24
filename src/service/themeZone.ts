import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";

import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";
import type {
  ThemeZoneListResult,
  ThemeZoneListSearchParams,
  ThemeZone,
  ThemeZoneOption,
} from "types/themeZone";

export const useThemeZoneList = (
  params: Partial<ThemeZoneListSearchParams>
) => {
  const client = useHttp();
  return useQuery<ThemeZoneListResult>(["theme_zone_list", params], () =>
    client("mall/theme_zone/list", { data: params, method: "POST" })
  );
};

export const useThemeZone = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<ThemeZone>>(
    ["theme_zone", { id }],
    () => client("mall/theme_zone/detail", { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddThemeZone = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ThemeZone>) =>
      client("mall/theme_zone/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditThemeZone = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ThemeZone>) =>
      client("mall/theme_zone/edit", {
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
      client("mall/theme_zone/edit_sort", {
        data: { id, sort },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditStatus = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, status }: { id: number; status: number }) =>
      client("mall/theme_zone/edit_status", {
        data: { id, status },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteThemeZone = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("mall/theme_zone/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useThemeZoneOptions = () => {
  const client = useHttp();
  return useQuery<ThemeZoneOption[]>(["activity_tag_options"], () =>
    client("mall/theme_zone/options")
  );
};
