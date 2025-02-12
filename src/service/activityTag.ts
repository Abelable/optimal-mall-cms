import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";

import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";
import type {
  ActivityTagListResult,
  ActivityTagListSearchParams,
  ActivityTag,
  ActivityTagOption,
} from "types/activityTag";

export const useActivityTagList = (
  params: Partial<ActivityTagListSearchParams>
) => {
  const client = useHttp();
  return useQuery<ActivityTagListResult>(["categories", params], () =>
    client("mall/activity/tag/list", { data: params, method: "POST" })
  );
};

export const useActivityTag = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<ActivityTag>>(
    ["activityTag", { id }],
    () => client(`activity/tag/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddActivityTag = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ActivityTag>) =>
      client("mall/activity/tag/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditActivityTag = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ActivityTag>) =>
      client("mall/activity/tag/edit", {
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
      client("mall/activity/tag/edit_sort", {
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
      client("mall/activity/tag/edit_status", {
        data: { id, status },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteActivityTag = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("mall/activity/tag/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useActivityTagOptions = () => {
  const client = useHttp();
  return useQuery<ActivityTagOption[]>(["activityTag_options"], () =>
    client("mall/activity/tag/options")
  );
};

export const useFilterActivityTagOptions = () => {
  const client = useHttp();
  return useQuery<ActivityTagOption[]>(["filter_activityTag_options"], () =>
    client("mall/activity/tag/filteroptions")
  );
};
