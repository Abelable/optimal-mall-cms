import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";

import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";
import type {
  CategoriesResult,
  CategoriesSearchParams,
  Category,
  CategoryOption,
} from "types/category";

export const useCategories = (params: Partial<CategoriesSearchParams>) => {
  const client = useHttp();
  return useQuery<CategoriesResult>(["categories", params], () =>
    client("category/list", { data: params, method: "POST" })
  );
};

export const useCategory = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<Category>>(
    ["category", { id }],
    () => client(`category/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Category>) =>
      client("category/add", {
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
      client("category/edit", {
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
      client("category/edit_sort", {
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
      client("category/edit_status", {
        data: { id, status },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("category/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useCategoryOptions = () => {
  const client = useHttp();
  return useQuery<CategoryOption[]>(["category_options"], () =>
    client("category/options")
  );
};

export const useFilterCategoryOptions = () => {
  const client = useHttp();
  return useQuery<CategoryOption[]>(["filter_category_options"], () =>
    client("category/filteroptions")
  );
};
