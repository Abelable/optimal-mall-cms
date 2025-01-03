import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";

import type {
  Category,
  CategoryListResult,
  CategoryListSearchParams,
  CategoryOption,
} from "types/limitedTimeRecruitCategory";

export const useCategoryList = (params: Partial<CategoryListSearchParams>) => {
  const client = useHttp();
  return useQuery<CategoryListResult>(
    ["limited_time_recruit_category_list", params],
    () =>
      client("limited_time_recruit/category/list", {
        data: params,
        method: "POST",
      })
  );
};

export const useCategory = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<Category>>(
    ["limited_time_recruit_category", { id }],
    () => client("limited_time_recruit/category/detail", { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Category>) =>
      client("limited_time_recruit/category/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Category>) =>
      client("limited_time_recruit/category/edit", {
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
      client("limited_time_recruit/category/edit_sort", {
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
      client("limited_time_recruit/category/edit_status", {
        data: cleanObject({ id, status }),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("limited_time_recruit/category/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useCategoryOptions = () => {
  const client = useHttp();
  return useQuery<CategoryOption[]>(
    ["limited_time_recruit_category_options"],
    () => client("limited_time_recruit/category/options")
  );
};
