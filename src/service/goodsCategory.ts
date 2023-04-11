import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import type {
  Category,
  CategoriesResult,
  CategoriesSearchParams,
  CategoryOption,
} from "types/category";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";

export const useGoodsCategories = (params: Partial<CategoriesSearchParams>) => {
  const client = useHttp();
  return useQuery<CategoriesResult>(["goods_categories", params], () =>
    client("goods/category/list", { data: params, method: "POST" })
  );
};

export const useGoodsCategory = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<Category>>(
    ["goods_category", { id }],
    () => client(`goods/category/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddGoodsCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Category>) =>
      client("goods/category/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditGoodsCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Category>) =>
      client("goods/category/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteGoodsCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("goods/category/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useGoodsCategoryOptions = () => {
  const client = useHttp();
  return useQuery<CategoryOption[]>(["goods_category_options"], () =>
    client("goods/category/options")
  );
};
